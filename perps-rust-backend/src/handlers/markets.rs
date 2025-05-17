use actix_web::{get, post, web, HttpResponse, Responder};
use log::{info, error};
use solana_sdk::pubkey::Pubkey;
use std::str::FromStr;

use crate::models::{ApiResponse, MarketResponse, MarketListResponse};
use crate::models::market::InitMarketRequest;
use crate::models::error::ApiError;
use crate::solana::client::{SOLANA_CLIENT, Market};
use crate::solana::pda;
use crate::handlers;

// Get all markets
#[get("/api/markets")]
pub async fn get_markets() -> Result<impl Responder, ApiError> {
    info!("Fetching all markets");
    
    // In a real application, you would query the chain for all markets
    // Here we'll create some mock data
    let markets = vec![
        MarketResponse {
            address: "5KtPn1LGuxhFM5A7AZZbneK3sUhw5FwRzGAHRKdwRrEe".to_string(),
            asset_symbol: "BTC".to_string(),
            oracle: "GVXRSBjFk6e6J3NbVPXohDJetcTjaeeuykUpbQF8UoMU".to_string(),
            oracle_type: 1,
            max_leverage: 20,
            fee_bps: 10,
            min_margin_ratio_bps: 500,
            min_position_size: 10000000,
            base_asset_reserve: 1000000000,
            quote_asset_reserve: 30000000000,
            total_long_size: 500000000,
            total_short_size: 300000000,
            funding_rate: 100,
            last_funding_ts: 1678921234,
            is_active: true,
        },
        MarketResponse {
            address: "7Z2nL71K5MBZ8bo6B1kQUhHPdfCJpNxgztd5NB8kRWaF".to_string(),
            asset_symbol: "ETH".to_string(),
            oracle: "JBu1AL4obBcCMqKBBxhpWCNUt136ijcuMZLFvTP7iWdB".to_string(),
            oracle_type: 1,
            max_leverage: 25,
            fee_bps: 10,
            min_margin_ratio_bps: 400,
            min_position_size: 10000000,
            base_asset_reserve: 5000000000,
            quote_asset_reserve: 10000000000,
            total_long_size: 2000000000,
            total_short_size: 1800000000,
            funding_rate: -50,
            last_funding_ts: 1678921234,
            is_active: true,
        },
    ];
    
    let response = MarketListResponse {
        markets,
        count: 2,
    };
    
    Ok(HttpResponse::Ok().json(ApiResponse::success(response)))
}

// Initialize a new market (admin only)
#[post("/api/admin/init-market")]
pub async fn init_market(
    req: web::Json<InitMarketRequest>,
) -> Result<impl Responder, ApiError> {
    let market_req = req.into_inner();
    
    info!("Initializing market for asset: {}", market_req.asset_symbol);
    
    // Validate market parameters
    if market_req.max_leverage == 0 || market_req.max_leverage > 100 {
        return Err(ApiError::BadRequest("Max leverage must be between 1 and 100".to_string()));
    }
    
    if market_req.fee_bps > 1000 {
        return Err(ApiError::BadRequest("Fee cannot exceed 10% (1000 bps)".to_string()));
    }
    
    // Convert oracle string to pubkey
    let oracle = handlers::extract_pubkey(&market_req.oracle)?;
    
    // Convert asset symbol to u8 array
    let mut asset_symbol_bytes = [0u8; 8];
    let symbol_bytes = market_req.asset_symbol.as_bytes();
    let copy_len = std::cmp::min(symbol_bytes.len(), 8);
    asset_symbol_bytes[..copy_len].copy_from_slice(&symbol_bytes[..copy_len]);
    
    // In a real application, you would use the SOLANA_CLIENT to initialize a new market
    // let result = SOLANA_CLIENT.init_market(
    //    market_req.market_id,
    //    asset_symbol_bytes,
    //    oracle,
    //    market_req.oracle_type,
    //    market_req.max_leverage,
    //    market_req.min_margin_ratio_bps,
    //    market_req.fee_bps,
    //    market_req.min_position_size,
    // )?;
    
    // For this example, we'll simulate success
    let tx_signature = "5KtPn1LGuxhFM5A7AZZbneK3sUhw5FwRzGAHRKdwRrEegEYSTqpDX1qoE7SuTRnCoFk2TMMQ5spi9eMVs3ynjmrP".to_string();
    
    info!("Market initialized. Signature: {}", tx_signature);
    
    // Market address for the response
    let (market_pda, _) = pda::find_market_pda(market_req.market_id);
    
    // Return success response with market address
    Ok(HttpResponse::Ok().json(ApiResponse::success(
        serde_json::json!({
            "signature": tx_signature,
            "market_address": market_pda.to_string()
        })
    )))
} 