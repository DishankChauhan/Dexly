use serde::{Deserialize, Serialize};
use anchor_client::solana_sdk::pubkey::Pubkey;

/// User data model
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct User {
    /// User public key (as string)
    pub user: String,
    
    /// Collateral balance in quote asset units (e.g., USDC)
    pub collateral_balance: u64,
    
    /// Number of open positions
    pub open_positions: u8,
    
    /// Total realized PnL
    pub realized_pnl: i64,
    
    /// Array of position pubkeys (as strings)
    pub positions: Vec<String>,
    
    /// Bump seed for PDA derivation
    pub bump: u8,
    
    /// Total USD value of collateral (including unrealized PnL)
    pub total_account_value: u64,
    
    /// Total unrealized PnL across all positions
    pub unrealized_pnl: Option<i64>,
    
    /// Account equity percentage change (24h)
    pub account_equity_change_24h: Option<f64>,
}

/// User account statistics
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct UserStats {
    /// User public key (as string)
    pub user: String,
    
    /// Total USD volume traded
    pub total_volume: u64,
    
    /// Total fees paid
    pub total_fees_paid: u64,
    
    /// Total number of trades
    pub total_trades: u64,
    
    /// Profit and loss metrics
    pub pnl_metrics: PnLMetrics,
    
    /// Trading performance metrics
    pub trading_metrics: TradingMetrics,
}

/// Profit and loss metrics
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct PnLMetrics {
    /// Total realized PnL
    pub total_realized_pnl: i64,
    
    /// Total unrealized PnL
    pub total_unrealized_pnl: i64,
    
    /// Total funding payments
    pub total_funding_payments: i64,
    
    /// Total deposits
    pub total_deposits: u64,
    
    /// Total withdrawals
    pub total_withdrawals: u64,
}

/// Trading performance metrics
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct TradingMetrics {
    /// Win rate (percentage of profitable trades)
    pub win_rate: f64,
    
    /// Average profit per winning trade
    pub avg_profit: f64,
    
    /// Average loss per losing trade
    pub avg_loss: f64,
    
    /// Risk-reward ratio
    pub risk_reward_ratio: f64,
    
    /// Longest winning streak
    pub longest_win_streak: u32,
    
    /// Longest losing streak
    pub longest_lose_streak: u32,
}

/// Request for creating a user account
#[derive(Debug, Deserialize)]
pub struct CreateUserRequest {
    /// User public key (as string)
    pub pubkey: String,
}

/// Collateral deposit request
#[derive(Debug, Deserialize)]
pub struct DepositCollateralRequest {
    /// Amount to deposit
    pub amount: u64,
}

/// Collateral withdrawal request
#[derive(Debug, Deserialize)]
pub struct WithdrawCollateralRequest {
    /// Amount to withdraw
    pub amount: u64,
}

/// User transaction history entry
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct UserTransaction {
    /// Transaction signature
    pub signature: String,
    
    /// User ID associated with this transaction
    pub user_id: String,
    
    /// Transaction type
    pub transaction_type: TransactionType,
    
    /// Amount involved
    pub amount: u64,
    
    /// Fee paid
    pub fee: u64,
    
    /// Timestamp of the transaction
    pub timestamp: i64,
    
    /// Status of the transaction
    pub status: TransactionStatus,
    
    /// Additional data specific to the transaction type
    pub data: Option<serde_json::Value>,
    
    /// Solana slot number when the transaction was processed
    pub slot: Option<u64>,
    
    /// Solana block time when the transaction was processed
    pub block_time: Option<i64>,
}

/// Transaction type enum
#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
pub enum TransactionType {
    Deposit,
    Withdrawal,
    OpenPosition,
    ClosePosition,
    PlaceOrder,
    CancelOrder,
    Liquidation,
    FundingPayment,
}

/// Transaction status enum
#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
pub enum TransactionStatus {
    Success,
    Failed,
    Pending,
} 