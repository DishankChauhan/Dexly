use serde::{Deserialize, Serialize};
use chrono::{DateTime, Utc};

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub enum TransactionType {
    Deposit,
    Withdrawal,
    OpenPosition,
    ClosePosition,
    LiquidatePosition,
    PlaceOrder,
    CancelOrder,
    ExecuteOrder,
    FundingPayment,
    AdminAction,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub enum TransactionStatus {
    Pending,
    Success,
    Failed,
    Reverted,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UserTransaction {
    pub signature: String,
    pub user_id: String,
    pub transaction_type: TransactionType,
    pub amount: u64,
    pub fee: u64,
    pub status: TransactionStatus,
    pub data: Option<serde_json::Value>,
    pub timestamp: DateTime<Utc>,
    pub slot: Option<u64>,
    pub block_time: Option<i64>,
} 