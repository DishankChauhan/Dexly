use serde::{Deserialize, Serialize};

// Request model for updating an oracle price
#[derive(Deserialize)]
pub struct UpdateOracleRequest {
    pub oracle_address: String,
    pub price: u64,
}

// Response model for oracle price
#[derive(Serialize)]
pub struct OraclePriceResponse {
    pub oracle_address: String,
    pub price: u64,
    pub last_updated_slot: u64,
    pub last_updated_time: i64,
} 