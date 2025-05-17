use actix_web::{HttpResponse, ResponseError};
use derive_more::Display;
use serde::Serialize;
use std::fmt;

use crate::solana::error::SolanaError;

#[derive(Debug, Display)]
pub enum ApiError {
    #[display(fmt = "Bad Request: {}", _0)]
    BadRequest(String),
    
    #[display(fmt = "Unauthorized: {}", _0)]
    Unauthorized(String),
    
    #[display(fmt = "Not Found: {}", _0)]
    NotFound(String),
    
    #[display(fmt = "Conflict: {}", _0)]
    Conflict(String),
    
    #[display(fmt = "Internal Server Error: {}", _0)]
    InternalServerError(String),
    
    #[display(fmt = "Blockchain Error: {}", _0)]
    BlockchainError(String),
}

#[derive(Serialize)]
struct ErrorResponse {
    success: bool,
    error: String,
}

impl ResponseError for ApiError {
    fn error_response(&self) -> HttpResponse {
        let error_response = ErrorResponse {
            success: false,
            error: self.to_string(),
        };
        
        match *self {
            ApiError::BadRequest(_) => HttpResponse::BadRequest().json(error_response),
            ApiError::Unauthorized(_) => HttpResponse::Unauthorized().json(error_response),
            ApiError::NotFound(_) => HttpResponse::NotFound().json(error_response),
            ApiError::Conflict(_) => HttpResponse::Conflict().json(error_response),
            ApiError::InternalServerError(_) | ApiError::BlockchainError(_) => {
                HttpResponse::InternalServerError().json(error_response)
            }
        }
    }
}

// Convert Solana errors to API errors
impl From<SolanaError> for ApiError {
    fn from(err: SolanaError) -> Self {
        match err {
            SolanaError::AccountNotFound(_) => ApiError::NotFound(err.to_string()),
            SolanaError::InvalidAddress(_) => ApiError::BadRequest(err.to_string()),
            SolanaError::InsufficientFunds(_) => ApiError::BadRequest(err.to_string()),
            SolanaError::Unauthorized(_) => ApiError::Unauthorized(err.to_string()),
            _ => ApiError::BlockchainError(err.to_string()),
        }
    }
}

// Convert standard errors to API errors
impl From<anyhow::Error> for ApiError {
    fn from(err: anyhow::Error) -> Self {
        ApiError::InternalServerError(err.to_string())
    }
}

// Convert IO errors to API errors
impl From<std::io::Error> for ApiError {
    fn from(err: std::io::Error) -> Self {
        ApiError::InternalServerError(format!("IO Error: {}", err))
    }
} 