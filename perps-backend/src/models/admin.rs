use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct AdminCredentials {
    pub admin_id: String,
    pub secret_key: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AdminRequest {
    pub admin_id: String,
    pub action: String,
    pub data: Option<serde_json::Value>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AdminResponse {
    pub success: bool,
    pub message: String,
    pub data: Option<serde_json::Value>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AdminStats {
    pub total_users: u64,
    pub total_markets: u64,
    pub total_volume_24h: u64,
    pub total_open_interest: u64,
    pub total_collateral: u64,
    pub protocol_fee_balance: u64,
} 