use actix_web::{HttpResponse, ResponseError};
use serde::Serialize;
use thiserror::Error;
use std::fmt;

/// Application error types
#[derive(Error, Debug)]
pub enum ApiError {
    #[error("Internal server error: {0}")]
    InternalError(String),
    
    #[error("Solana client error: {0}")]
    SolanaClientError(String),
    
    #[error("Transaction error: {0}")]
    TransactionError(String),
    
    #[error("Contract error: {0}")]
    ContractError(String),
    
    #[error("Oracle error: {0}")]
    OracleError(String),
    
    #[error("Invalid request: {0}")]
    InvalidRequest(String),
    
    #[error("Resource not found: {0}")]
    NotFound(String),
    
    #[error("Unauthorized: {0}")]
    Unauthorized(String),
    
    #[error("Database error: {0}")]
    DatabaseError(String),
    
    #[error("Slippage error: {0}")]
    SlippageError(String),
    
    // New specific error types
    #[error("Price error: {0}")]
    PriceError(String),
    
    #[error("Order execution error: {0}")]
    OrderExecutionError(String),
    
    #[error("Insufficient collateral: {0}")]
    InsufficientCollateral(String),
    
    #[error("Liquidity error: {0}")]
    LiquidityError(String),
    
    #[error("Market paused: {0}")]
    MarketPaused(String),
    
    #[error("Position limit reached: {0}")]
    PositionLimitReached(String),
    
    #[error("Position not found: {0}")]
    PositionNotFound(String),
    
    #[error("Order not found: {0}")]
    OrderNotFound(String),
    
    #[error("Rate limit exceeded: {0}")]
    RateLimitExceeded(String),
    
    #[error("Event processing error: {0}")]
    EventProcessingError(String),
    
    #[error("Validation error: {0}")]
    ValidationError(String),
    
    #[error("Network error: {0}")]
    NetworkError(String),
}

/// Response structure for errors
#[derive(Serialize)]
pub struct ErrorResponse {
    pub status: String,
    pub message: String,
    pub error_code: Option<String>,
    pub details: Option<serde_json::Value>,
}

impl ResponseError for ApiError {
    fn error_response(&self) -> HttpResponse {
        match self {
            ApiError::InternalError(_) => {
                HttpResponse::InternalServerError().json(ErrorResponse {
                    status: "error".to_string(),
                    message: self.to_string(),
                    error_code: Some("INTERNAL_ERROR".to_string()),
                    details: None,
                })
            }
            ApiError::SolanaClientError(_) => {
                HttpResponse::BadGateway().json(ErrorResponse {
                    status: "error".to_string(),
                    message: self.to_string(),
                    error_code: Some("SOLANA_CLIENT_ERROR".to_string()),
                    details: None,
                })
            }
            ApiError::TransactionError(_) => {
                HttpResponse::BadRequest().json(ErrorResponse {
                    status: "error".to_string(),
                    message: self.to_string(),
                    error_code: Some("TRANSACTION_ERROR".to_string()),
                    details: None,
                })
            }
            ApiError::ContractError(_) => {
                HttpResponse::BadRequest().json(ErrorResponse {
                    status: "error".to_string(),
                    message: self.to_string(),
                    error_code: Some("CONTRACT_ERROR".to_string()),
                    details: None,
                })
            }
            ApiError::OracleError(_) => {
                HttpResponse::BadRequest().json(ErrorResponse {
                    status: "error".to_string(),
                    message: self.to_string(),
                    error_code: Some("ORACLE_ERROR".to_string()),
                    details: None,
                })
            }
            ApiError::InvalidRequest(_) => {
                HttpResponse::BadRequest().json(ErrorResponse {
                    status: "error".to_string(),
                    message: self.to_string(),
                    error_code: Some("INVALID_REQUEST".to_string()),
                    details: None,
                })
            }
            ApiError::NotFound(_) => {
                HttpResponse::NotFound().json(ErrorResponse {
                    status: "error".to_string(),
                    message: self.to_string(),
                    error_code: Some("NOT_FOUND".to_string()),
                    details: None,
                })
            }
            ApiError::Unauthorized(_) => {
                HttpResponse::Unauthorized().json(ErrorResponse {
                    status: "error".to_string(),
                    message: self.to_string(),
                    error_code: Some("UNAUTHORIZED".to_string()),
                    details: None,
                })
            }
            ApiError::DatabaseError(_) => {
                HttpResponse::InternalServerError().json(ErrorResponse {
                    status: "error".to_string(),
                    message: self.to_string(),
                    error_code: Some("DATABASE_ERROR".to_string()),
                    details: None,
                })
            }
            ApiError::SlippageError(_) => {
                HttpResponse::BadRequest().json(ErrorResponse {
                    status: "error".to_string(),
                    message: self.to_string(),
                    error_code: Some("SLIPPAGE_ERROR".to_string()),
                    details: None,
                })
            }
            ApiError::PriceError(_) => {
                HttpResponse::BadRequest().json(ErrorResponse {
                    status: "error".to_string(),
                    message: self.to_string(),
                    error_code: Some("PRICE_ERROR".to_string()),
                    details: None,
                })
            }
            ApiError::OrderExecutionError(_) => {
                HttpResponse::BadRequest().json(ErrorResponse {
                    status: "error".to_string(),
                    message: self.to_string(),
                    error_code: Some("ORDER_EXECUTION_ERROR".to_string()),
                    details: None,
                })
            }
            ApiError::InsufficientCollateral(_) => {
                HttpResponse::BadRequest().json(ErrorResponse {
                    status: "error".to_string(),
                    message: self.to_string(),
                    error_code: Some("INSUFFICIENT_COLLATERAL".to_string()),
                    details: None,
                })
            }
            ApiError::LiquidityError(_) => {
                HttpResponse::BadRequest().json(ErrorResponse {
                    status: "error".to_string(),
                    message: self.to_string(),
                    error_code: Some("LIQUIDITY_ERROR".to_string()),
                    details: None,
                })
            }
            ApiError::MarketPaused(_) => {
                HttpResponse::Forbidden().json(ErrorResponse {
                    status: "error".to_string(),
                    message: self.to_string(),
                    error_code: Some("MARKET_PAUSED".to_string()),
                    details: None,
                })
            }
            ApiError::PositionLimitReached(_) => {
                HttpResponse::BadRequest().json(ErrorResponse {
                    status: "error".to_string(),
                    message: self.to_string(),
                    error_code: Some("POSITION_LIMIT_REACHED".to_string()),
                    details: None,
                })
            }
            ApiError::PositionNotFound(_) => {
                HttpResponse::NotFound().json(ErrorResponse {
                    status: "error".to_string(),
                    message: self.to_string(),
                    error_code: Some("POSITION_NOT_FOUND".to_string()),
                    details: None,
                })
            }
            ApiError::OrderNotFound(_) => {
                HttpResponse::NotFound().json(ErrorResponse {
                    status: "error".to_string(),
                    message: self.to_string(),
                    error_code: Some("ORDER_NOT_FOUND".to_string()),
                    details: None,
                })
            }
            ApiError::RateLimitExceeded(_) => {
                HttpResponse::TooManyRequests().json(ErrorResponse {
                    status: "error".to_string(),
                    message: self.to_string(),
                    error_code: Some("RATE_LIMIT_EXCEEDED".to_string()),
                    details: None,
                })
            }
            ApiError::EventProcessingError(_) => {
                HttpResponse::InternalServerError().json(ErrorResponse {
                    status: "error".to_string(),
                    message: self.to_string(),
                    error_code: Some("EVENT_PROCESSING_ERROR".to_string()),
                    details: None,
                })
            }
            ApiError::ValidationError(_) => {
                HttpResponse::BadRequest().json(ErrorResponse {
                    status: "error".to_string(),
                    message: self.to_string(),
                    error_code: Some("VALIDATION_ERROR".to_string()),
                    details: None,
                })
            }
            ApiError::NetworkError(_) => {
                HttpResponse::ServiceUnavailable().json(ErrorResponse {
                    status: "error".to_string(),
                    message: self.to_string(),
                    error_code: Some("NETWORK_ERROR".to_string()),
                    details: None,
                })
            }
        }
    }
}

// Implement From<T> for various error types
impl From<anchor_client::solana_client::client_error::ClientError> for ApiError {
    fn from(error: anchor_client::solana_client::client_error::ClientError) -> Self {
        ApiError::SolanaClientError(error.to_string())
    }
}

impl From<anchor_client::ClientError> for ApiError {
    fn from(error: anchor_client::ClientError) -> Self {
        ApiError::SolanaClientError(error.to_string())
    }
}

impl From<sqlx::Error> for ApiError {
    fn from(error: sqlx::Error) -> Self {
        match error {
            sqlx::Error::RowNotFound => ApiError::NotFound("Resource not found in database".to_string()),
            _ => ApiError::DatabaseError(error.to_string()),
        }
    }
}

impl From<std::io::Error> for ApiError {
    fn from(error: std::io::Error) -> Self {
        ApiError::InternalError(format!("IO error: {}", error))
    }
}

impl From<serde_json::Error> for ApiError {
    fn from(error: serde_json::Error) -> Self {
        ApiError::InvalidRequest(format!("JSON error: {}", error))
    }
}

impl From<anyhow::Error> for ApiError {
    fn from(error: anyhow::Error) -> Self {
        ApiError::InternalError(error.to_string())
    }
}

impl From<reqwest::Error> for ApiError {
    fn from(error: reqwest::Error) -> Self {
        ApiError::NetworkError(error.to_string())
    }
}

impl From<std::str::Utf8Error> for ApiError {
    fn from(error: std::str::Utf8Error) -> Self {
        ApiError::InvalidRequest(format!("UTF-8 error: {}", error))
    }
}

impl From<bs58::decode::Error> for ApiError {
    fn from(error: bs58::decode::Error) -> Self {
        ApiError::InvalidRequest(format!("Base58 decoding error: {}", error))
    }
}

impl From<anchor_client::solana_sdk::signature::ParseSignatureError> for ApiError {
    fn from(error: anchor_client::solana_sdk::signature::ParseSignatureError) -> Self {
        ApiError::InvalidRequest(format!("Invalid signature: {}", error))
    }
}

impl From<anchor_client::solana_sdk::pubkey::ParsePubkeyError> for ApiError {
    fn from(error: anchor_client::solana_sdk::pubkey::ParsePubkeyError) -> Self {
        ApiError::InvalidRequest(format!("Invalid pubkey: {}", error))
    }
}

// Recovery utilities for error handling
pub mod recovery {
    use super::ApiError;
    use log::{error, warn};
    
    /// Attempt to recover from a database error
    pub async fn attempt_db_recovery<F, Fut, T>(operation: F, max_retries: usize) -> Result<T, ApiError>
    where
        F: Fn() -> Fut,
        Fut: std::future::Future<Output = Result<T, ApiError>>,
    {
        let mut retries = 0;
        loop {
            match operation().await {
                Ok(result) => return Ok(result),
                Err(err) => {
                    if let ApiError::DatabaseError(msg) = &err {
                        if retries < max_retries {
                            retries += 1;
                            warn!("Database operation failed, retrying ({}/{}): {}", retries, max_retries, msg);
                            tokio::time::sleep(tokio::time::Duration::from_millis(500 * retries as u64)).await;
                            continue;
                        }
                    }
                    return Err(err);
                }
            }
        }
    }
    
    /// Log an error with appropriate level and return it for propagation
    pub fn log_and_return<T>(err: ApiError, operation: &str) -> Result<T, ApiError> {
        match &err {
            ApiError::NotFound(_) | ApiError::InvalidRequest(_) => {
                warn!("Operation '{}' failed: {}", operation, err);
            }
            _ => {
                error!("Operation '{}' failed: {}", operation, err);
            }
        }
        Err(err)
    }
} 