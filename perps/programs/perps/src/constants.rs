/// Maximum leverage allowed (100x)
pub const MAX_LEVERAGE: u8 = 100;

/// Minimum leverage allowed (1x)
pub const MIN_LEVERAGE: u8 = 1;

/// Initial margin requirement in basis points (5%)
pub const INITIAL_MARGIN_RATIO_BPS: u16 = 500;

/// Maintenance margin requirement in basis points (2.5%)
pub const MAINTENANCE_MARGIN_RATIO_BPS: u16 = 250;

/// Liquidation fee in basis points (1%)
pub const LIQUIDATION_FEE_BPS: u16 = 100;

/// Protocol fee in basis points (0.1%)
pub const PROTOCOL_FEE_BPS: u16 = 10;

/// Maximum funding rate in basis points (1%)
pub const MAX_FUNDING_RATE_BPS: i16 = 100;

/// Minimum funding rate in basis points (-1%)
pub const MIN_FUNDING_RATE_BPS: i16 = -100;

/// Funding interval in seconds (1 hour)
pub const FUNDING_INTERVAL_SECONDS: i64 = 3600;

/// Maximum price deviation allowed from oracle in basis points (5%)
pub const MAX_PRICE_DEVIATION_BPS: u16 = 500;

/// Maximum number of positions per user
pub const MAX_POSITIONS_PER_USER: u8 = 10;

/// Maximum slippage tolerance in basis points (1%)
pub const MAX_SLIPPAGE_BPS: u16 = 100;

/// Maximum size of asset symbol
pub const ASSET_SYMBOL_SIZE: usize = 8;

/// Use this literal number in array declarations for IDL compatibility
pub const ASSET_SYMBOL_SIZE_LITERAL: u8 = 8;

/// Seeds for PDA derivation
pub mod seeds {
    pub const MARKET: &[u8] = b"market";
    pub const USER: &[u8] = b"user";
    pub const POSITION: &[u8] = b"position";
    pub const VAULT: &[u8] = b"vault";
    pub const VAULT_AUTHORITY: &[u8] = b"vault_authority";
    pub const FEE_VAULT: &[u8] = b"fee_vault";
    pub const GLOBAL_STATE: &[u8] = b"global_state";
    pub const ORDER: &[u8] = b"order";
}

/// Precision constants
pub mod precision {
    /// Price precision (6 decimals)
    pub const PRICE_PRECISION: u8 = 6;
    
    /// Collateral precision (6 decimals for USDC)
    pub const COLLATERAL_PRECISION: u8 = 6;
    
    /// Funding rate precision (6 decimals)
    pub const FUNDING_PRECISION: u8 = 6;
} 