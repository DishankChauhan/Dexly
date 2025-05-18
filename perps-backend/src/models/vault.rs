use serde::{Deserialize, Serialize};
use anchor_client::solana_sdk::pubkey::Pubkey;
use strum_macros::{Display, EnumString};

/// Collateral types supported by the protocol
#[derive(Debug, Serialize, Deserialize, Clone, Copy, PartialEq, EnumString, Display)]
pub enum CollateralType {
    #[strum(serialize = "USDC")]
    USDC = 0,
    
    #[strum(serialize = "SOL")]
    SOL = 1,
}

impl From<u8> for CollateralType {
    fn from(value: u8) -> Self {
        match value {
            0 => CollateralType::USDC,
            1 => CollateralType::SOL,
            _ => CollateralType::USDC,
        }
    }
}

impl From<CollateralType> for u8 {
    fn from(collateral_type: CollateralType) -> Self {
        collateral_type as u8
    }
}

/// Vault data model
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Vault {
    /// Vault ID (Pubkey as string)
    pub id: String,
    
    /// Mint of the token (e.g., USDC mint)
    pub mint: String,
    
    /// Authority of the vault (program PDA)
    pub authority: String,
    
    /// Token account owned by the vault authority
    pub token_account: String,
    
    /// Total deposits in the vault
    pub total_deposits: u64,
    
    /// Type of collateral stored in this vault
    pub collateral_type: CollateralType,
    
    /// Oracle account for price feed (for non-stablecoin collateral)
    pub oracle: String,
    
    /// Oracle type (0 = Pyth, 1 = Switchboard)
    pub oracle_type: u8,
    
    /// Current USD value of collateral (with 6 decimals)
    pub usd_value: u64,
    
    /// Price of the collateral (if non-stablecoin)
    pub collateral_price: Option<u64>,
}

/// Fee vault data model
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct FeeVault {
    /// Fee vault ID (Pubkey as string)
    pub id: String,
    
    /// Mint of the fee token (e.g., USDC mint)
    pub mint: String,
    
    /// Authority that can withdraw fees
    pub authority: String,
    
    /// Token account owned by the vault
    pub token_account: String,
    
    /// Total fees collected
    pub total_fees: u64,
}

/// Oracle price data
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct OraclePrice {
    /// Oracle account pubkey
    pub oracle: String,
    
    /// Oracle type (0 = Pyth, 1 = Switchboard)
    pub oracle_type: u8,
    
    /// Price value (with 6 decimals)
    pub price: u64,
    
    /// Confidence interval
    pub confidence: Option<u64>,
    
    /// Last update timestamp
    pub last_update_ts: i64,
    
    /// Is price valid
    pub is_valid: bool,
}

/// Get vault balance request
#[derive(Debug, Deserialize)]
pub struct GetVaultBalanceRequest {
    /// Mint of the token (as string)
    pub mint: String,
}

/// Vault balance response
#[derive(Debug, Serialize)]
pub struct VaultBalanceResponse {
    /// Vault information
    pub vault: Vault,
    
    /// Current USD balance
    pub usd_balance: u64,
} 