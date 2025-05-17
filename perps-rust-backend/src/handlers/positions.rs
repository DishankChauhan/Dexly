use actix_web::{get, post, web, HttpResponse, Responder};
use log::info;
use solana_sdk::pubkey::Pubkey;

use crate::models::{ApiResponse, PositionResponse, PositionListResponse};
use crate::models::position::{OpenPositionRequest, ClosePositionRequest, Position};
use crate::models::error::ApiError;
use crate::solana::pda;
use crate::handlers;
use crate::utils;

#[get("/api/positions")]
pub async fn get_positions(
    user: web::Query<Option<String>>
) -> Result<impl Responder, ApiError> {
    let wallet_pubkey = match &user.0 {
        Some(wallet_str) => Some(handlers::extract_wallet(wallet_str)?),
        None => None
    };
    
    if let Some(pubkey) = wallet_pubkey {
        info!("Fetching positions for user: {}", pubkey);
    } else {
        info!("Fetching all positions");
    }
    
    // In a real app, you'd query positions from the blockchain
    // For this example, we'll create mock positions
    let positions = mock_positions(wallet_pubkey);
    
    let position_responses: Vec<PositionResponse> = positions.iter()
        .map(|(address, position)| {
            PositionResponse::from_account(
                address, 
                position, 
                Some(30000000000) // Mock current price
            )
        })
        .collect();
    
    let response = PositionListResponse {
        positions: position_responses,
        count: position_responses.len(),
    };
    
    Ok(HttpResponse::Ok().json(ApiResponse::success(response)))
}

#[post("/api/position/open")]
pub async fn open_position(
    req: web::Json<OpenPositionRequest>,
) -> Result<impl Responder, ApiError> {
    let request = req.into_inner();
    
    info!("Opening position: market_id={}, is_long={}, amount={}, leverage={}x", 
        request.market_id, request.is_long, request.collateral_amount, request.leverage);
    
    // In a real app, you'd validate:
    // 1. User account exists
    // 2. Market exists
    // 3. User has enough collateral
    // 4. Leverage is within allowed range for the market
    
    // Generate a position ID (would be done on-chain)
    let position_id = utils::current_timestamp() as u64;
    
    // For this example, we'll simulate success
    let tx_signature = "5KtPn1LGuxhFM5A7AZZbneK3sUhw5FwRzGAHRKdwRrEegEYSTqpDX1qoE7SuTRnCoFk2TMMQ5spi9eMVs3ynjmrP";
    
    info!("Position opened. Signature: {}", tx_signature);
    
    // Market and entry price simulation
    let (market_pda, _) = pda::find_market_pda(request.market_id);
    let entry_price = 30000000000; // $30,000 with 6 decimals
    let size = request.collateral_amount * request.leverage as u64;
    
    Ok(HttpResponse::Ok().json(ApiResponse::success(
        serde_json::json!({
            "signature": tx_signature,
            "position_id": position_id,
            "market": market_pda.to_string(),
            "is_long": request.is_long,
            "collateral_amount": request.collateral_amount,
            "size": size,
            "entry_price": entry_price,
            "leverage": request.leverage
        })
    )))
}

#[post("/api/position/close")]
pub async fn close_position(
    req: web::Json<ClosePositionRequest>,
) -> Result<impl Responder, ApiError> {
    let position_address = handlers::extract_pubkey(&req.position_address)?;
    
    info!("Closing position: {}", position_address);
    
    // In a real app, you'd validate:
    // 1. Position exists
    // 2. User is the owner of the position
    
    // For this example, we'll simulate success
    let tx_signature = "5KtPn1LGuxhFM5A7AZZbneK3sUhw5FwRzGAHRKdwRrEegEYSTqpDX1qoE7SuTRnCoFk2TMMQ5spi9eMVs3ynjmrP";
    
    // Simulated PnL calculation
    let pnl = 500000000; // $500 profit with 6 decimals
    
    info!("Position closed. Signature: {}", tx_signature);
    
    Ok(HttpResponse::Ok().json(ApiResponse::success(
        serde_json::json!({
            "signature": tx_signature,
            "position": position_address.to_string(),
            "pnl": pnl,
            "exit_price": 31000000000 // $31,000 with 6 decimals
        })
    )))
}

// Helper function to create mock positions
fn mock_positions(user_filter: Option<Pubkey>) -> Vec<(Pubkey, Position)> {
    // Create some mock wallets
    let wallet1 = Pubkey::new_unique();
    let wallet2 = Pubkey::new_unique();
    
    // Use the provided wallet if it exists
    let wallet1 = user_filter.unwrap_or(wallet1);
    
    // Only include positions for the filtered user if provided
    if user_filter.is_some() && wallet1 != wallet2 {
        // Only create positions for the filtered user
        let (position_pda, _) = pda::find_position_pda(&wallet1, 1);
        let (market_pda, _) = pda::find_market_pda(1); // BTC market
        
        vec![
            (
                position_pda,
                Position {
                    user: wallet1,
                    market: market_pda,
                    is_long: true,
                    collateral_amount: 1000000000,
                    size: 5000000000,
                    entry_price: 29000000000,
                    entry_funding_rate: 100,
                    created_at: 1678921234,
                    bump: 255,
                }
            )
        ]
    } else {
        // Create positions for both users
        let (position1_pda, _) = pda::find_position_pda(&wallet1, 1);
        let (position2_pda, _) = pda::find_position_pda(&wallet2, 1);
        let (btc_market_pda, _) = pda::find_market_pda(1); // BTC market
        let (eth_market_pda, _) = pda::find_market_pda(2); // ETH market
        
        vec![
            (
                position1_pda,
                Position {
                    user: wallet1,
                    market: btc_market_pda,
                    is_long: true,
                    collateral_amount: 1000000000,
                    size: 5000000000,
                    entry_price: 29000000000,
                    entry_funding_rate: 100,
                    created_at: 1678921234,
                    bump: 255,
                }
            ),
            (
                position2_pda,
                Position {
                    user: wallet2,
                    market: eth_market_pda,
                    is_long: false,
                    collateral_amount: 500000000,
                    size: 10000000000,
                    entry_price: 2000000000,
                    entry_funding_rate: -50,
                    created_at: 1678921250,
                    bump: 255,
                }
            )
        ]
    }
} 