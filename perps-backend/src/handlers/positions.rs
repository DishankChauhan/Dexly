use actix_web::{web, HttpResponse, Responder, get, post, delete};
use log::{info, error};
use serde::{Deserialize, Serialize};
use sqlx::PgPool;
use std::str::FromStr;
use anchor_client::solana_sdk::pubkey::Pubkey;

use crate::models::error::ApiError;
use crate::models::position::{Position, PositionStatus, OpenPositionRequest, ClosePositionRequest};
use crate::solana::position::PositionService;
use crate::database::{positions, users};
use crate::solana::client::get_solana_client;

/// Open a new position
#[post("/positions")]
pub async fn open_position(
    _pool: web::Data<PgPool>,
    request: web::Json<OpenPositionRequest>,
) -> Result<impl Responder, ApiError> {
    info!("Opening new position");
    
    let position_service = PositionService::new();
    
    // Get user pubkey
    let user_pubkey = Pubkey::from_str(&request.user)
        .map_err(|_| ApiError::InvalidRequest("Invalid user pubkey".to_string()))?;
    
    // Submit the position to the blockchain
    let signature = position_service.open_position(request.into_inner(), &user_pubkey).await?;
    
    // For now just return the signature since we'll receive the position via events
    let response = PositionResponse {
        position_id: "pending".to_string(),
        signature: signature.to_string(),
        status: "opening".to_string()
    };
    
    Ok(HttpResponse::Created().json(response))
}

/// Close an existing position
#[delete("/positions/{position_id}")]
pub async fn close_position(
    pool: web::Data<PgPool>,
    path: web::Path<String>,
    request: web::Json<ClosePositionRequest>,
) -> Result<impl Responder, ApiError> {
    let position_id = path.into_inner();
    info!("Closing position: {}", position_id);
    
    // Validate that the position exists and belongs to the user
    let position = positions::get_position(&pool, &position_id).await?;
    
    if position.user != request.user {
        return Err(ApiError::Unauthorized("Not authorized to close this position".to_string()));
    }
    
    // Check if the position can be closed
    if position.is_closed {
        return Err(ApiError::InvalidRequest(format!("Position cannot be closed - it is already closed")));
    }
    
    let position_service = PositionService::new();
    
    // Get user pubkey
    let user_pubkey = Pubkey::from_str(&request.user)
        .map_err(|_| ApiError::InvalidRequest("Invalid user pubkey".to_string()))?;
    
    // Close the position on the blockchain
    let signature = position_service.close_position(request.into_inner(), &user_pubkey).await?;
    
    // Return success response
    let response = ClosePositionResponse {
        position_id,
        signature: signature.to_string(),
        status: "closed".to_string(),
        realized_pnl: 0, // Will be updated via events
        exit_price: 0,   // Will be updated via events
    };
    
    Ok(HttpResponse::Ok().json(response))
}

/// Get a specific position by ID
#[get("/positions/{position_id}")]
pub async fn get_position(
    pool: web::Data<PgPool>,
    path: web::Path<String>,
) -> Result<impl Responder, ApiError> {
    let position_id = path.into_inner();
    info!("Getting position: {}", position_id);
    
    // Retrieve the position from the database
    let position = positions::get_position(&pool, &position_id).await?;
    
    Ok(HttpResponse::Ok().json(position))
}

/// Get all positions for a user
#[get("/users/{user_id}/positions")]
pub async fn get_user_positions(
    pool: web::Data<PgPool>,
    path: web::Path<String>,
) -> Result<impl Responder, ApiError> {
    let user_id = path.into_inner();
    info!("Getting positions for user: {}", user_id);
    
    // Retrieve positions from the database
    let positions = positions::get_user_positions(&pool, &user_id).await?;
    let total = positions.len();
    
    let response = PositionListResponse {
        positions,
        total,
    };
    
    Ok(HttpResponse::Ok().json(response))
}

/// Get active positions for a market
#[get("/markets/{market_id}/positions")]
pub async fn get_market_positions(
    pool: web::Data<PgPool>,
    path: web::Path<String>,
) -> Result<impl Responder, ApiError> {
    let market_id = path.into_inner();
    info!("Getting active positions for market: {}", market_id);
    
    // Retrieve active positions for the market from the database
    let positions = positions::get_market_active_positions(&pool, &market_id).await?;
    let total = positions.len();
    
    let response = PositionListResponse {
        positions,
        total,
    };
    
    Ok(HttpResponse::Ok().json(response))
}

/// Get positions at risk of liquidation
#[get("/positions/liquidation-risk")]
pub async fn get_liquidation_risk_positions(
    pool: web::Data<PgPool>,
    query: web::Query<LiquidationRiskQuery>,
) -> Result<impl Responder, ApiError> {
    let threshold = query.threshold.unwrap_or(95.0);
    info!("Getting positions at liquidation risk (threshold: {}%)", threshold);
    
    // Retrieve positions at risk of liquidation
    let positions = positions::get_liquidation_risk_positions(&pool, threshold).await?;
    let total = positions.len();
    
    let response = PositionListResponse {
        positions,
        total,
    };
    
    Ok(HttpResponse::Ok().json(response))
}

/// Response for position operations
#[derive(Debug, Serialize)]
pub struct PositionResponse {
    pub position_id: String,
    pub signature: String,
    pub status: String,
}

/// Response for closing a position
#[derive(Debug, Serialize)]
pub struct ClosePositionResponse {
    pub position_id: String,
    pub signature: String,
    pub status: String,
    pub realized_pnl: i64,
    pub exit_price: u64,
}

/// Response for position list
#[derive(Debug, Serialize)]
pub struct PositionListResponse {
    pub positions: Vec<Position>,
    pub total: usize,
}

/// Query parameters for liquidation risk endpoint
#[derive(Debug, Deserialize)]
pub struct LiquidationRiskQuery {
    pub threshold: Option<f64>,
}

/// Register position routes
pub fn register(cfg: &mut web::ServiceConfig) {
    cfg.service(open_position)
       .service(close_position)
       .service(get_position)
       .service(get_user_positions)
       .service(get_market_positions)
       .service(get_liquidation_risk_positions);
} 