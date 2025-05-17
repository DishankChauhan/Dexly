use actix_web::{post, web, HttpResponse, Responder};
use log::info;
use solana_sdk::pubkey::Pubkey;

use crate::models::ApiResponse;
use crate::models::user::{DepositCollateralRequest, WithdrawCollateralRequest};
use crate::models::error::ApiError;
use crate::solana::pda;
use crate::handlers;

#[post("/api/user/deposit")]
pub async fn deposit_collateral(
    req: web::Json<DepositCollateralRequest>,
) -> Result<impl Responder, ApiError> {
    let wallet_pubkey = handlers::extract_wallet(&req.wallet)?;
    let amount = req.amount;
    
    info!("Depositing {} collateral for wallet: {}", amount, wallet_pubkey);
    
    // In a real app, you'd validate that:
    // 1. User account exists
    // 2. User has enough tokens in their token account
    
    // For this example, we'll simulate success
    let tx_signature = "5KtPn1LGuxhFM5A7AZZbneK3sUhw5FwRzGAHRKdwRrEegEYSTqpDX1qoE7SuTRnCoFk2TMMQ5spi9eMVs3ynjmrP";
    
    info!("Collateral deposited. Signature: {}", tx_signature);
    
    Ok(HttpResponse::Ok().json(ApiResponse::success(
        serde_json::json!({
            "signature": tx_signature,
            "amount": amount,
            "wallet": wallet_pubkey.to_string()
        })
    )))
}

#[post("/api/user/withdraw")]
pub async fn withdraw_collateral(
    req: web::Json<WithdrawCollateralRequest>,
) -> Result<impl Responder, ApiError> {
    let wallet_pubkey = handlers::extract_wallet(&req.wallet)?;
    let amount = req.amount;
    
    info!("Withdrawing {} collateral for wallet: {}", amount, wallet_pubkey);
    
    // In a real app, you'd validate that:
    // 1. User account exists
    // 2. User has enough collateral (not in open positions)
    // 3. Withdrawal doesn't violate margin requirements
    
    // For this example, we'll simulate success
    let tx_signature = "5KtPn1LGuxhFM5A7AZZbneK3sUhw5FwRzGAHRKdwRrEegEYSTqpDX1qoE7SuTRnCoFk2TMMQ5spi9eMVs3ynjmrP";
    
    info!("Collateral withdrawn. Signature: {}", tx_signature);
    
    Ok(HttpResponse::Ok().json(ApiResponse::success(
        serde_json::json!({
            "signature": tx_signature,
            "amount": amount,
            "wallet": wallet_pubkey.to_string()
        })
    )))
} 