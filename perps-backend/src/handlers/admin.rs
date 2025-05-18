use actix_web::{get, post, web, HttpResponse, Responder, HttpRequest};
use chrono::{DateTime, Utc, Duration};
use jsonwebtoken::{decode, DecodingKey, Validation, Algorithm, encode, EncodingKey, Header};
use serde::{Deserialize, Serialize};
use anchor_client::solana_sdk::pubkey::Pubkey;
use std::{env, str::FromStr};
use subtle::ConstantTimeEq;

use crate::models::error::ApiError;
use crate::models::market::{Market, CreateMarketRequest, UpdateFundingRequest};
use crate::solana::market::MarketService;
use crate::config::CONFIG;
use crate::models::admin::{AdminStats, AdminRequest, AdminResponse, AdminCredentials};
use crate::database;
use log::{info, error};

// JWT claims structure
#[derive(Debug, Serialize, Deserialize)]
struct AdminClaims {
    // Subject (admin user identifier)
    sub: String,
    // Issued at timestamp
    iat: i64,
    // Expiration timestamp
    exp: i64,
    // Role (must be "admin")
    role: String,
}

// Environment variable name for admin key
const ADMIN_SECRET_KEY_ENV: &str = "ADMIN_SECRET_KEY";
const ADMIN_API_KEY_ENV: &str = "ADMIN_API_KEY";
const JWT_SECRET_ENV: &str = "ADMIN_JWT_SECRET";

/// Admin authorization middleware that checks for either a valid JWT token or API key
fn require_admin(request: &HttpRequest) -> Result<(), ApiError> {
    // First, try to authenticate with a JWT token in the Authorization header
    if let Some(auth_header) = request.headers().get("Authorization") {
        if let Ok(auth_str) = auth_header.to_str() {
            if auth_str.starts_with("Bearer ") {
                let token = auth_str.trim_start_matches("Bearer ").trim();
                return validate_admin_jwt(token);
            }
        }
    }
    
    // If no JWT token, try to authenticate with an API key
    if let Some(api_key_header) = request.headers().get("X-Admin-Key") {
        if let Ok(api_key) = api_key_header.to_str() {
            return validate_admin_api_key(api_key);
        }
    }
    
    // No valid authentication found
    Err(ApiError::Unauthorized("Admin access required. Provide a valid JWT token or API key.".to_string()))
}

/// Validate an admin JWT token
fn validate_admin_jwt(token: &str) -> Result<(), ApiError> {
    // Get JWT secret from environment or config
    let jwt_secret = match env::var(JWT_SECRET_ENV) {
        Ok(secret) if !secret.is_empty() => secret,
        _ => return Err(ApiError::InternalError("Admin JWT secret not configured".to_string())),
    };
    
    // Decode and validate the JWT token
    let token_data = decode::<AdminClaims>(
        token,
        &DecodingKey::from_secret(jwt_secret.as_bytes()),
        &Validation::new(Algorithm::HS256),
    ).map_err(|e| ApiError::Unauthorized(format!("Invalid admin token: {}", e)))?;
    
    // Verify the claims
    let claims = token_data.claims;
    
    // Check if token is expired (this should be handled by the JWT validation, but we check anyway)
    let now = Utc::now().timestamp();
    if claims.exp < now {
        return Err(ApiError::Unauthorized("Admin token has expired".to_string()));
    }
    
    // Check if the role is admin
    if claims.role != "admin" {
        return Err(ApiError::Unauthorized("Token does not have admin privileges".to_string()));
    }
    
    Ok(())
}

/// Validate an admin API key
fn validate_admin_api_key(api_key: &str) -> Result<(), ApiError> {
    // Get the admin API key from environment
    let admin_key = match env::var(ADMIN_API_KEY_ENV) {
        Ok(key) if !key.is_empty() => key,
        _ => return Err(ApiError::InternalError("Admin API key not configured".to_string())),
    };
    
    // Perform a constant-time comparison to prevent timing attacks
    if subtle::ConstantTimeEq::ct_eq(api_key.as_bytes(), admin_key.as_bytes()).into() {
        Ok(())
    } else {
        Err(ApiError::Unauthorized("Invalid admin API key".to_string()))
    }
}

/// Create an admin JWT token for authentication
fn create_admin_jwt(admin_id: &str) -> Result<String, ApiError> {
    // Get JWT secret from environment
    let jwt_secret = match env::var(JWT_SECRET_ENV) {
        Ok(secret) if !secret.is_empty() => secret,
        _ => return Err(ApiError::InternalError("Admin JWT secret not configured".to_string())),
    };
    
    // Get the admin secret key for authentication
    let admin_secret_key = match env::var(ADMIN_SECRET_KEY_ENV) {
        Ok(key) if !key.is_empty() => key,
        _ => return Err(ApiError::InternalError("Admin secret key not configured".to_string())),
    };
    
    // Create token claims
    let now = Utc::now();
    let expiration = now + Duration::hours(24); // Token valid for 24 hours
    
    let claims = AdminClaims {
        sub: admin_id.to_string(),
        iat: now.timestamp(),
        exp: expiration.timestamp(),
        role: "admin".to_string(),
    };
    
    // Encode the token
    let token = encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(jwt_secret.as_bytes()),
    ).map_err(|e| ApiError::InternalError(format!("Failed to create admin token: {}", e)))?;
    
    Ok(token)
}

/// Admin login endpoint
#[post("/admin/login")]
pub async fn admin_login(
    credentials: web::Json<AdminLoginRequest>,
) -> Result<impl Responder, ApiError> {
    // Get the admin secret key from environment
    let admin_secret_key = match env::var(ADMIN_SECRET_KEY_ENV) {
        Ok(key) if !key.is_empty() => key,
        _ => return Err(ApiError::InternalError("Admin secret key not configured".to_string())),
    };
    
    // Validate credentials
    if subtle::ConstantTimeEq::ct_eq(credentials.secret_key.as_bytes(), admin_secret_key.as_bytes()).into() {
        // Create a JWT token
        let token = create_admin_jwt(&credentials.admin_id)?;
        
        // Return the token
        let response = AdminLoginResponse {
            success: true,
            token,
            expires_in: 24 * 60 * 60, // 24 hours in seconds
        };
        
        Ok(HttpResponse::Ok().json(response))
    } else {
        Err(ApiError::Unauthorized("Invalid admin credentials".to_string()))
    }
}

/// Create a new market
#[post("/admin/markets")]
pub async fn create_market(
    request: HttpRequest,
    market_req: web::Json<CreateMarketRequest>,
) -> Result<impl Responder, ApiError> {
    require_admin(&request)?;
    
    let market_service = MarketService::new();
    
    // Execute the transaction
    let (market_pubkey, signature) = market_service.create_market(market_req.into_inner()).await?;
    
    // Return the transaction signature and market ID
    let response = AdminActionResponse {
        success: true,
        signature: signature.to_string(),
        message: "Market created successfully".to_string(),
        data: Some(serde_json::json!({
            "market_id": market_pubkey.to_string()
        })),
    };
    
    Ok(HttpResponse::Ok().json(response))
}

/// Update market parameters
#[post("/admin/markets/{market_id}")]
pub async fn update_market(
    request: HttpRequest,
    market_id: web::Path<String>,
    update_req: web::Json<UpdateMarketRequest>,
) -> Result<impl Responder, ApiError> {
    require_admin(&request)?;
    
    let market_pubkey = Pubkey::from_str(&market_id)
        .map_err(|_| ApiError::InvalidRequest("Invalid market ID format".to_string()))?;
    
    let market_service = MarketService::new();
    
    // Convert to the expected type
    let params = update_req.into_inner();
    let market_update_req = crate::solana::market::UpdateMarketRequest {
        maintenance_margin_fraction: params.maintenance_margin_fraction,
        initial_margin_fraction: params.initial_margin_fraction,
        liquidation_fee_fraction: params.liquidation_fee_fraction,
        fee_fraction: params.fee_fraction,
        max_leverage: params.max_leverage,
    };
    
    // Execute the transaction
    let signature = market_service.update_market(&market_pubkey, market_update_req).await?;
    
    // Return the transaction signature
    let response = AdminActionResponse {
        success: true,
        signature: signature.to_string(),
        message: "Market updated successfully".to_string(),
        data: None,
    };
    
    Ok(HttpResponse::Ok().json(response))
}

/// Update funding rate for a market
#[post("/admin/markets/{market_id}/funding")]
pub async fn update_funding_rate(
    request: HttpRequest,
    market_id: web::Path<String>,
    funding_req: web::Json<UpdateFundingRequest>,
) -> Result<impl Responder, ApiError> {
    require_admin(&request)?;
    
    let market_pubkey = Pubkey::from_str(&market_id)
        .map_err(|_| ApiError::InvalidRequest("Invalid market ID format".to_string()))?;
    
    let market_service = MarketService::new();
    
    // Execute the transaction
    let signature = market_service.update_funding_rate(&market_pubkey, funding_req.into_inner()).await?;
    
    // Return the transaction signature
    let response = AdminActionResponse {
        success: true,
        signature: signature.to_string(),
        message: "Funding rate updated successfully".to_string(),
        data: None,
    };
    
    Ok(HttpResponse::Ok().json(response))
}

/// Pause/unpause a market for emergency situations
#[post("/admin/markets/{market_id}/pause")]
pub async fn toggle_market_pause(
    request: HttpRequest,
    market_id: web::Path<String>,
    pause_req: web::Json<PauseMarketRequest>,
) -> Result<impl Responder, ApiError> {
    require_admin(&request)?;
    
    let market_pubkey = Pubkey::from_str(&market_id)
        .map_err(|_| ApiError::InvalidRequest("Invalid market ID format".to_string()))?;
    
    let market_service = MarketService::new();
    
    // Execute the transaction
    let signature = market_service.toggle_market_pause(&market_pubkey, pause_req.paused).await?;
    
    // Return the transaction signature
    let response = AdminActionResponse {
        success: true,
        signature: signature.to_string(),
        message: if pause_req.paused {
            "Market paused successfully"
        } else {
            "Market unpaused successfully"
        }.to_string(),
        data: None,
    };
    
    Ok(HttpResponse::Ok().json(response))
}

/// Get protocol statistics
#[get("/admin/stats")]
pub async fn get_protocol_stats(
    request: HttpRequest,
) -> Result<impl Responder, ApiError> {
    require_admin(&request)?;
    
    let market_service = MarketService::new();
    
    // Get protocol statistics
    let stats = market_service.get_protocol_stats().await?;
    
    Ok(HttpResponse::Ok().json(stats))
}

/// Update protocol fees
#[post("/admin/fees")]
pub async fn update_protocol_fees(
    request: HttpRequest,
    fee_req: web::Json<UpdateProtocolFeesRequest>,
) -> Result<impl Responder, ApiError> {
    require_admin(&request)?;
    
    let market_service = MarketService::new();
    
    // Execute the transaction
    let signature = market_service.update_protocol_fees(fee_req.fee_bps).await?;
    
    // Return the transaction signature
    let response = AdminActionResponse {
        success: true,
        signature: signature.to_string(),
        message: format!("Protocol fees updated to {} bps", fee_req.fee_bps),
        data: None,
    };
    
    Ok(HttpResponse::Ok().json(response))
}

#[derive(Debug, Serialize)]
struct AdminActionResponse {
    success: bool,
    signature: String,
    message: String,
    data: Option<serde_json::Value>,
}

#[derive(Debug, Deserialize)]
pub struct UpdateMarketRequest {
    pub maintenance_margin_fraction: Option<u64>,
    pub initial_margin_fraction: Option<u64>,
    pub liquidation_fee_fraction: Option<u64>,
    pub fee_fraction: Option<u64>,
    pub max_leverage: Option<u8>,
}

#[derive(Debug, Deserialize)]
pub struct PauseMarketRequest {
    pub paused: bool,
}

#[derive(Debug, Deserialize)]
pub struct UpdateProtocolFeesRequest {
    pub fee_bps: u16,
}

#[derive(Debug, Deserialize)]
pub struct AdminLoginRequest {
    pub admin_id: String,
    pub secret_key: String,
}

#[derive(Debug, Serialize)]
pub struct AdminLoginResponse {
    pub success: bool,
    pub token: String,
    pub expires_in: i64,
}

/// Register admin routes
pub fn register(cfg: &mut web::ServiceConfig) {
    cfg.service(admin_login)
       .service(create_market)
       .service(update_market)
       .service(update_funding_rate)
       .service(toggle_market_pause)
       .service(get_protocol_stats)
       .service(update_protocol_fees);
} 