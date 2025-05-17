use anchor_lang::prelude::*;

#[error_code]
pub enum PerpsError {
    #[msg("Math operation overflow")]
    Overflow,
    #[msg("Insufficient funds")]
    InsufficientFunds,
    #[msg("Unauthorized access")]
    Unauthorized,
    #[msg("Oracle error")]
    OracleError,
    #[msg("Invalid leverage")]
    InvalidLeverage,
    #[msg("Invalid margin ratio")]
    InvalidMarginRatio,
    #[msg("Invalid fee")]
    InvalidFee,
    
    #[msg("Position is already closed")]
    PositionClosed,
    
    #[msg("Position cannot be liquidated at current price")]
    CannotLiquidate,
    
    #[msg("Invalid price from oracle")]
    InvalidPrice,
    
    #[msg("Bump seed not found")]
    BumpNotFound,
    
    #[msg("Invalid signature")]
    InvalidSignature,
    
    #[msg("Price deviation from oracle is too large")]
    PriceDeviationTooLarge,
    
    #[msg("Invalid funding rate")]
    InvalidFundingRate,
    
    #[msg("Invalid mint")]
    InvalidMint,
    
    #[msg("Invalid admin key")]
    InvalidAdminKey,
    
    #[msg("Insufficient collateral for margin requirements")]
    InsufficientCollateral,
    
    #[msg("Protocol is paused")]
    ProtocolPaused,
    
    #[msg("Maximum positions per user reached")]
    MaxPositionsReached,
    
    #[msg("Position size too small")]
    PositionTooSmall,
    
    #[msg("Market not found")]
    MarketNotFound,
    
    #[msg("User account not found")]
    UserNotFound,
    
    #[msg("Invalid slippage tolerance")]
    InvalidSlippage,
    
    #[msg("Price slippage too high")]
    SlippageTooHigh,
    
    #[msg("Market is not active")]
    MarketInactive,
    
    #[msg("Invalid oracle account")]
    InvalidOracle,
    
    #[msg("Funding rate update too soon")]
    FundingUpdateTooSoon,
    
    #[msg("Invalid position direction")]
    InvalidDirection,
    
    #[msg("Invalid price")]
    InvalidPriceInput,
    
    #[msg("Oracle price is stale")]
    StaleOraclePrice,
    
    #[msg("Invalid oracle price")]
    InvalidOraclePrice,
    
    #[msg("Insufficient liquidity")]
    InsufficientLiquidity,
    
    #[msg("Unsupported collateral type")]
    UnsupportedCollateral,
    
    #[msg("Invalid order type")]
    InvalidOrderType,
} 