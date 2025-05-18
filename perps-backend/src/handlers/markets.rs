use actix_web::{get, web, HttpResponse, Responder, post};
use chrono::{DateTime, Utc};
use log::{info, error};
use serde::{Deserialize, Serialize};
use sqlx::PgPool;
use anchor_lang::prelude::Pubkey;
use std::str::FromStr;

use crate::models::error::ApiError;
use crate::models::market::{MarketListResponse, MarketSummary, Market, OracleType, CreateMarketRequest, UpdateFundingRequest};
use crate::solana::market::MarketService;
use crate::database::markets;

/// Get all markets
#[get("/markets")]
pub async fn get_markets(
    pool: web::Data<PgPool>,
) -> Result<impl Responder, ApiError> {
    info!("Getting all markets");
    
    // Retrieve markets from the database
    let db_markets = markets::get_markets(&pool).await?;
    
    // Convert markets to market summaries
    let markets: Vec<MarketSummary> = db_markets.into_iter()
        .map(|market| MarketSummary {
            id: market.id,
            asset_symbol: market.asset_symbol,
            mark_price: market.mark_price,
            price_change_24h: market.price_change_24h,
            volume_24h: market.volume_24h,
            funding_rate: market.funding_rate,
            max_leverage: market.max_leverage,
            open_interest: market.total_long_size + market.total_short_size,
            is_active: market.is_active,
        })
        .collect();
    
    let total = markets.len();
    let response = MarketListResponse {
        markets,
        total,
    };
    
    Ok(HttpResponse::Ok().json(response))
}

/// Get a specific market by ID
#[get("/markets/{market_id}")]
pub async fn get_market(
    pool: web::Data<PgPool>,
    path: web::Path<String>,
) -> Result<impl Responder, ApiError> {
    let market_id = path.into_inner();
    info!("Getting market: {}", market_id);
    
    // Retrieve the market from the database
    let market = markets::get_market(&pool, &market_id).await?;
    
    Ok(HttpResponse::Ok().json(market))
}

/// Get price history for a market
#[get("/markets/{market_id}/prices")]
pub async fn get_market_prices(
    pool: web::Data<PgPool>,
    path: web::Path<String>,
    query: web::Query<PriceHistoryQuery>,
) -> Result<impl Responder, ApiError> {
    let market_id = path.into_inner();
    info!("Getting price history for market: {}", market_id);
    
    // Parse time parameters
    let start_time = query.start_time.map(|ts| {
        DateTime::from_timestamp(ts, 0).unwrap_or_else(|| Utc::now() - chrono::Duration::days(7))
    });
    
    let end_time = query.end_time.map(|ts| {
        DateTime::from_timestamp(ts, 0).unwrap_or_else(|| Utc::now())
    });
    
    let limit = query.limit.unwrap_or(100).min(1000);
    
    // Retrieve price history from the database
    let prices = markets::get_market_price_history(
        &pool,
        &market_id,
        start_time,
        end_time,
        limit,
    ).await?;
    
    let price_history: Vec<PricePoint> = prices
        .into_iter()
        .map(|(timestamp, price)| PricePoint {
            timestamp: timestamp.timestamp(),
            price,
        })
        .collect();
    
    let response = PriceHistoryResponse {
        market_id,
        prices: price_history,
    };
    
    Ok(HttpResponse::Ok().json(response))
}

/// Get funding rate history for a market
#[get("/markets/{market_id}/funding")]
pub async fn get_market_funding(
    pool: web::Data<PgPool>,
    path: web::Path<String>,
    query: web::Query<PriceHistoryQuery>,
) -> Result<impl Responder, ApiError> {
    let market_id = path.into_inner();
    info!("Getting funding rate history for market: {}", market_id);
    
    // Parse time parameters
    let start_time = query.start_time.map(|ts| {
        DateTime::from_timestamp(ts, 0).unwrap_or_else(|| Utc::now() - chrono::Duration::days(7))
    });
    
    let end_time = query.end_time.map(|ts| {
        DateTime::from_timestamp(ts, 0).unwrap_or_else(|| Utc::now())
    });
    
    let limit = query.limit.unwrap_or(100).min(1000);
    
    // Retrieve funding rate history from the database
    let funding_rates = markets::get_market_funding_history(
        &pool,
        &market_id,
        start_time,
        end_time,
        limit,
    ).await?;
    
    let funding_history: Vec<FundingPoint> = funding_rates
        .into_iter()
        .map(|(timestamp, rate)| FundingPoint {
            timestamp: timestamp.timestamp(),
            rate,
        })
        .collect();
    
    let response = FundingHistoryResponse {
        market_id,
        rates: funding_history,
    };
    
    Ok(HttpResponse::Ok().json(response))
}

/// Create a new market (admin only)
#[post("/markets")]
pub async fn create_market(
    pool: web::Data<PgPool>,
    request: web::Json<CreateMarketRequest>,
) -> Result<impl Responder, ApiError> {
    info!("Creating new market");
    
    // Validate admin rights (this should be done in middleware)
    // For now, we'll assume the caller has admin rights
    
    let market_service = MarketService::new();
    
    // Create the market on-chain
    let (market_pubkey, signature) = market_service.create_market(request.into_inner()).await?;
    
    // Retrieve the created market from blockchain
    let market = market_service.get_market(&market_pubkey.to_string()).await?;
    
    // Store the market in the database
    markets::insert_market(&pool, &market).await?;
    
    // Return the created market along with the transaction signature
    let response = MarketResponse {
        market,
        signature: signature.to_string(),
    };
    
    Ok(HttpResponse::Created().json(response))
}

/// Update an existing market (admin only)
#[post("/markets/{market_id}")]
pub async fn update_market(
    pool: web::Data<PgPool>,
    path: web::Path<String>,
    request: web::Json<UpdateMarketParams>,
) -> Result<impl Responder, ApiError> {
    let market_id = path.into_inner();
    info!("Updating market: {}", market_id);
    
    // Validate admin rights (this should be done in middleware)
    // For now, we'll assume the caller has admin rights
    
    let market_service = MarketService::new();
    
    // Convert to internal update request format
    let request_params = request.into_inner();
    let update_req = crate::solana::market::UpdateMarketRequest {
        maintenance_margin_fraction: request_params.maintenance_margin_ratio,
        initial_margin_fraction: request_params.initial_margin_ratio,
        liquidation_fee_fraction: request_params.liquidation_fee_ratio,
        fee_fraction: request_params.fee_ratio,
        max_leverage: request_params.max_leverage,
    };
    
    // Parse market ID to Pubkey
    let market_pubkey = Pubkey::from_str(&market_id)
        .map_err(|_| ApiError::InvalidRequest("Invalid market ID format".to_string()))?;
    
    // Update the market on-chain
    let signature = market_service.update_market(&market_pubkey, update_req).await?;
    
    // Retrieve the updated market from blockchain
    let market = market_service.get_market(&market_id).await?;
    
    // Update the market in the database
    markets::update_market(&pool, &market).await?;
    
    // Return the updated market along with the transaction signature
    let response = MarketResponse {
        market,
        signature: signature.to_string(),
    };
    
    Ok(HttpResponse::Ok().json(response))
}

/// Update market funding rate (admin only)
#[post("/markets/{market_id}/funding")]
pub async fn update_funding_rate(
    pool: web::Data<PgPool>,
    path: web::Path<String>,
    request: web::Json<UpdateFundingRequest>,
) -> Result<impl Responder, ApiError> {
    let market_id = path.into_inner();
    info!("Updating funding rate for market: {}", market_id);
    
    // Validate admin rights (this should be done in middleware)
    // For now, we'll assume the caller has admin rights
    
    let market_service = MarketService::new();
    
    // Parse market ID to Pubkey
    let market_pubkey = Pubkey::from_str(&market_id)
        .map_err(|_| ApiError::InvalidRequest("Invalid market ID format".to_string()))?;
    
    // Get a copy of the funding rate
    let funding_rate = request.into_inner().funding_rate;
    
    // Update the funding rate on-chain
    let update_request = UpdateFundingRequest { funding_rate };
    let signature = market_service.update_funding_rate(&market_pubkey, update_request).await?;
    
    // Get the current market data
    let mut market = markets::get_market(&pool, &market_id).await?;
    
    // Update the market in the database
    market.funding_rate = funding_rate;
    market.last_funding_ts = Utc::now().timestamp();
    markets::update_market(&pool, &market).await?;
    
    // Get oracle prices for history tracking
    let mark_price = market.mark_price;
    let index_price = market.mark_price; // In a real system this would be different
    
    // Store funding rate in history
    markets::update_funding_rate(
        &pool,
        &market_id,
        funding_rate,
        mark_price,
        index_price,
    ).await?;
    
    // Return success response
    let response = FundingUpdateResponse {
        market_id,
        funding_rate: funding_rate as f64,
        signature: signature.to_string(),
    };
    
    Ok(HttpResponse::Ok().json(response))
}

/// Toggle market pause state (admin only)
#[post("/markets/{market_id}/pause")]
pub async fn toggle_market_pause(
    pool: web::Data<PgPool>,
    path: web::Path<String>,
    request: web::Json<PauseMarketRequest>,
) -> Result<impl Responder, ApiError> {
    let market_id = path.into_inner();
    info!("Setting market {} pause state to {}", market_id, request.paused);
    
    // Validate admin rights (this should be done in middleware)
    // For now, we'll assume the caller has admin rights
    
    let market_service = MarketService::new();
    
    // Parse market ID to Pubkey
    let market_pubkey = Pubkey::from_str(&market_id)
        .map_err(|_| ApiError::InvalidRequest("Invalid market ID format".to_string()))?;
    
    // Update the market pause state on-chain
    let signature = market_service.toggle_market_pause(&market_pubkey, request.paused).await?;
    
    // Update the market in the database
    markets::toggle_market_pause(&pool, &market_id, request.paused).await?;
    
    // Return success response
    let response = PauseMarketResponse {
        market_id,
        paused: request.paused,
        signature: signature.to_string(),
    };
    
    Ok(HttpResponse::Ok().json(response))
}

/// Response for market operations
#[derive(Debug, Serialize)]
pub struct MarketResponse {
    pub market: Market,
    pub signature: String,
}

// Use the imported MarketListResponse instead of redefining it here

/// Response for price history
#[derive(Debug, Serialize)]
pub struct PriceHistoryResponse {
    pub market_id: String,
    pub prices: Vec<PricePoint>,
}

/// Price point for history
#[derive(Debug, Serialize)]
pub struct PricePoint {
    pub timestamp: i64,
    pub price: u64,
}

/// Response for funding rate history
#[derive(Debug, Serialize)]
pub struct FundingHistoryResponse {
    pub market_id: String,
    pub rates: Vec<FundingPoint>,
}

/// Funding rate point for history
#[derive(Debug, Serialize)]
pub struct FundingPoint {
    pub timestamp: i64,
    pub rate: f64,
}

/// Response for funding rate update
#[derive(Debug, Serialize)]
pub struct FundingUpdateResponse {
    pub market_id: String,
    pub funding_rate: f64,
    pub signature: String,
}

/// Response for market pause toggle
#[derive(Debug, Serialize)]
pub struct PauseMarketResponse {
    pub market_id: String,
    pub paused: bool,
    pub signature: String,
}

/// Query parameters for price and funding history
#[derive(Debug, Deserialize)]
pub struct PriceHistoryQuery {
    pub start_time: Option<i64>,
    pub end_time: Option<i64>,
    pub limit: Option<usize>,
}

/// Request to update market parameters
#[derive(Debug, Deserialize)]
pub struct UpdateMarketParams {
    pub maintenance_margin_ratio: Option<u64>,
    pub initial_margin_ratio: Option<u64>,
    pub liquidation_fee_ratio: Option<u64>,
    pub fee_ratio: Option<u64>,
    pub max_leverage: Option<u8>,
}

/// Request to pause/unpause a market
#[derive(Debug, Deserialize)]
pub struct PauseMarketRequest {
    pub paused: bool,
}

/// Request to update market parameters
pub struct UpdateMarketRequest {
    pub maintenance_margin_fraction: Option<u64>,
    pub initial_margin_fraction: Option<u64>,
    pub liquidation_fee_fraction: Option<u64>,
    pub fee_fraction: Option<u64>,
    pub max_leverage: Option<u8>,
}

/// Register market routes
pub fn register(cfg: &mut web::ServiceConfig) {
    cfg.service(get_markets)
       .service(get_market)
       .service(get_market_prices)
       .service(get_market_funding)
       .service(create_market)
       .service(update_market)
       .service(update_funding_rate)
       .service(toggle_market_pause);
} 