use actix_web::{post, web, HttpResponse, Responder};
use log::info;
use solana_sdk::pubkey::Pubkey;

use crate::models::ApiResponse;
use crate::models::oracle::UpdateOracleRequest;
use crate::models::error::ApiError;
use crate::handlers;
use crate::utils;

#[post("/api/oracle/update")]
pub async fn update_oracle(
    req: web::Json<UpdateOracleRequest>,
) -> Result<impl Responder, ApiError> {
    let oracle_address = handlers::extract_pubkey(&req.oracle_address)?;
    let price = req.price;
    
    info!("Updating oracle: {} with price: {}", oracle_address, price);
    
    // In a real app, this would submit a transaction to update the oracle price on-chain
    
    // For this example, we'll simulate success
    let tx_signature = "5KtPn1LGuxhFM5A7AZZbneK3sUhw5FwRzGAHRKdwRrEegEYSTqpDX1qoE7SuTRnCoFk2TMMQ5spi9eMVs3ynjmrP";
    
    // Get current timestamp for response
    let current_time = utils::current_timestamp();
    
    info!("Oracle updated. Signature: {}", tx_signature);
    
    Ok(HttpResponse::Ok().json(ApiResponse::success(
        serde_json::json!({
            "signature": tx_signature,
            "oracle_address": oracle_address.to_string(),
            "price": price,
            "timestamp": current_time,
            "slot": 123456789 // Mock slot number
        })
    )))
} 