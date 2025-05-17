use actix_web::{get, post, web, HttpResponse, Responder};
use log::{info, error};
use solana_sdk::pubkey::Pubkey;

use crate::models::{ApiResponse, GlobalStateResponse};
use crate::models::global_state::{InitGlobalStateRequest, PauseProtocolRequest, UpdateFeesRequest};
use crate::models::error::ApiError;
use crate::solana::client::SOLANA_CLIENT;
use crate::solana::pda;

// Get global state information
#[get("/api/global-state")]
pub async fn get_global_state() -> Result<impl Responder, ApiError> {
    info!("Fetching global state");
    
    // Get the global state PDA
    let (global_state_pda, _) = pda::find_global_state_pda();
    
    // Placeholder for global state data - in a real application, this would be
    // fetched from the blockchain using your Solana client
    // For now, we'll simulate it with fake data
    
    // In a production app, you'd do something like:
    // let global_state = SOLANA_CLIENT.fetch_account::<GlobalState>(&global_state_pda)?;
    
    // For this example, we'll use placeholder data
    let global_state_response = GlobalStateResponse {
        admin: "HXtBm8XZbxaTt41uqaKhwUAa6Z1aPyvJdsZVENiWsetg".to_string(),
        fee_bps: 10,
        is_paused: false,
        total_volume: 1000000,
        total_fees_collected: 1000,
        address: global_state_pda.to_string(),
    };
    
    // Return the response
    Ok(HttpResponse::Ok().json(ApiResponse::success(global_state_response)))
}

// Initialize global state (admin only)
#[post("/api/admin/init-global")]
pub async fn init_global_state(
    _req: web::Json<InitGlobalStateRequest>,
) -> Result<impl Responder, ApiError> {
    info!("Initializing global state");
    
    // In a real application, you would use the SOLANA_CLIENT to initialize the global state
    // let result = SOLANA_CLIENT.init_global_state()?;
    
    // For this example, we'll simulate success
    let tx_signature = "5KtPn1LGuxhFM5A7AZZbneK3sUhw5FwRzGAHRKdwRrEegEYSTqpDX1qoE7SuTRnCoFk2TMMQ5spi9eMVs3ynjmrP".to_string();
    
    info!("Global state initialized. Signature: {}", tx_signature);
    
    // Return success response
    Ok(HttpResponse::Ok().json(ApiResponse::success(tx_signature)))
}

// Pause/unpause the protocol (admin only)
#[post("/api/admin/pause-protocol")]
pub async fn pause_protocol(
    req: web::Json<PauseProtocolRequest>,
) -> Result<impl Responder, ApiError> {
    let paused = req.paused;
    info!("Setting protocol paused state to: {}", paused);
    
    // In a real application, you would use the SOLANA_CLIENT to pause/unpause the protocol
    // let result = SOLANA_CLIENT.pause_protocol(paused)?;
    
    // For this example, we'll simulate success
    let tx_signature = "5KtPn1LGuxhFM5A7AZZbneK3sUhw5FwRzGAHRKdwRrEegEYSTqpDX1qoE7SuTRnCoFk2TMMQ5spi9eMVs3ynjmrP".to_string();
    
    info!("Protocol paused state updated. Signature: {}", tx_signature);
    
    // Return success response
    Ok(HttpResponse::Ok().json(ApiResponse::success(tx_signature)))
}

// Update protocol fees (admin only)
#[post("/api/admin/update-fees")]
pub async fn update_fees(
    req: web::Json<UpdateFeesRequest>,
) -> Result<impl Responder, ApiError> {
    let fee_bps = req.fee_bps;
    info!("Updating protocol fees to: {} bps", fee_bps);
    
    // Validate fee value
    if fee_bps > 1000 {
        return Err(ApiError::BadRequest("Fee cannot exceed 10% (1000 bps)".to_string()));
    }
    
    // In a real application, you would use the SOLANA_CLIENT to update fees
    // let result = SOLANA_CLIENT.update_fees(fee_bps)?;
    
    // For this example, we'll simulate success
    let tx_signature = "5KtPn1LGuxhFM5A7AZZbneK3sUhw5FwRzGAHRKdwRrEegEYSTqpDX1qoE7SuTRnCoFk2TMMQ5spi9eMVs3ynjmrP".to_string();
    
    info!("Protocol fees updated. Signature: {}", tx_signature);
    
    // Return success response
    Ok(HttpResponse::Ok().json(ApiResponse::success(tx_signature)))
} 