use serde::{Deserialize, Serialize};
use solana_sdk::pubkey::Pubkey;

pub mod global_state;
pub mod market;
pub mod position;
pub mod user;
pub mod oracle;
pub mod error;

// Re-export common models
pub use error::ApiError;
pub use global_state::GlobalStateResponse;
pub use market::{MarketResponse, MarketListResponse};
pub use position::{PositionResponse, PositionListResponse};
pub use user::UserResponse;

// Common API response wrapper
#[derive(Serialize)]
pub struct ApiResponse<T> {
    pub success: bool,
    pub data: Option<T>,
    pub error: Option<String>,
}

impl<T> ApiResponse<T> {
    pub fn success(data: T) -> Self {
        Self {
            success: true,
            data: Some(data),
            error: None,
        }
    }

    pub fn error(message: &str) -> Self {
        Self {
            success: false,
            data: None,
            error: Some(message.to_string()),
        }
    }
}

// Helper function to convert Pubkey to string
pub fn pubkey_to_string(pubkey: &Pubkey) -> String {
    pubkey.to_string()
} 