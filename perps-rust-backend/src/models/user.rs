use serde::{Deserialize, Serialize};
use solana_sdk::pubkey::Pubkey;

use crate::models::pubkey_to_string;

// User account structure for on-chain data
#[derive(Debug)]
pub struct User {
    pub authority: Pubkey,
    pub collateral: u64,
    pub cumulative_deposits: u64,
    pub cumulative_borrows: u64,
    pub positions_count: u64,
    pub bump: u8,
}

// Response model for a user
#[derive(Serialize)]
pub struct UserResponse {
    pub address: String,
    pub wallet: String,
    pub collateral: u64,
    pub cumulative_deposits: u64,
    pub cumulative_borrows: u64,
    pub positions_count: u64,
}

impl UserResponse {
    pub fn from_account(address: &Pubkey, user: &User) -> Self {
        Self {
            address: pubkey_to_string(address),
            wallet: pubkey_to_string(&user.authority),
            collateral: user.collateral,
            cumulative_deposits: user.cumulative_deposits,
            cumulative_borrows: user.cumulative_borrows,
            positions_count: user.positions_count,
        }
    }
}

// Request model for creating a user
#[derive(Deserialize)]
pub struct CreateUserRequest {
    pub wallet: String,
}

// Request model for depositing collateral
#[derive(Deserialize)]
pub struct DepositCollateralRequest {
    pub wallet: String,
    pub amount: u64,
}

// Request model for withdrawing collateral
#[derive(Deserialize)]
pub struct WithdrawCollateralRequest {
    pub wallet: String,
    pub amount: u64,
} 