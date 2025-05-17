use actix_web::{get, post, web, HttpResponse, Responder};
use log::info;
use solana_sdk::pubkey::Pubkey;

use crate::models::{ApiResponse, UserResponse};
use crate::models::user::{CreateUserRequest, User};
use crate::models::error::ApiError;
use crate::solana::pda;
use crate::handlers;

#[get("/api/user")]
pub async fn get_user(wallet: web::Query<CreateUserRequest>) -> Result<impl Responder, ApiError> {
    let wallet_pubkey = handlers::extract_wallet(&wallet.wallet)?;
    info!("Fetching user account for wallet: {}", wallet_pubkey);
    
    let (user_pda, _) = pda::find_user_pda(&wallet_pubkey);
    
    // Mock user data
    let user = User {
        authority: wallet_pubkey,
        collateral: 1000000000,
        cumulative_deposits: 1500000000,
        cumulative_borrows: 500000000,
        positions_count: 2,
        bump: 255,
    };
    
    let user_response = UserResponse::from_account(&user_pda, &user);
    Ok(HttpResponse::Ok().json(ApiResponse::success(user_response)))
}

#[post("/api/user/create")]
pub async fn create_user(req: web::Json<CreateUserRequest>) -> Result<impl Responder, ApiError> {
    let wallet_pubkey = handlers::extract_wallet(&req.wallet)?;
    info!("Creating user account for wallet: {}", wallet_pubkey);
    
    let (user_pda, _) = pda::find_user_pda(&wallet_pubkey);
    
    // Mock transaction
    let tx_signature = "5KtPn1LGuxhFM5A7AZZbneK3sUhw5FwRzGAHRKdwRrEegEYSTqpDX1qoE7SuTRnCoFk2TMMQ5spi9eMVs3ynjmrP";
    info!("User account created. Signature: {}", tx_signature);
    
    Ok(HttpResponse::Ok().json(ApiResponse::success(serde_json::json!({
        "signature": tx_signature,
        "user_address": user_pda.to_string()
    }))))
} 