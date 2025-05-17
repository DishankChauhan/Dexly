use std::fmt;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum SolanaError {
    #[error("Solana client error: {0}")]
    ClientError(String),
    
    #[error("Transaction error: {0}")]
    TransactionError(String),
    
    #[error("Account not found: {0}")]
    AccountNotFound(String),
    
    #[error("Invalid address: {0}")]
    InvalidAddress(String),
    
    #[error("Insufficient funds: {0}")]
    InsufficientFunds(String),
    
    #[error("Serialization error: {0}")]
    SerializationError(String),
    
    #[error("IDL error: {0}")]
    IdlError(String),
    
    #[error("Account data deserialization error: {0}")]
    AccountDeserializationError(String),
    
    #[error("Program error: {0}")]
    ProgramError(String),
    
    #[error("Unauthorized: {0}")]
    Unauthorized(String),
    
    #[error("Unknown error: {0}")]
    Other(String),
}

impl From<anchor_client::ClientError> for SolanaError {
    fn from(err: anchor_client::ClientError) -> Self {
        SolanaError::ClientError(err.to_string())
    }
}

impl From<solana_client::client_error::ClientError> for SolanaError {
    fn from(err: solana_client::client_error::ClientError) -> Self {
        SolanaError::ClientError(err.to_string())
    }
}

impl From<solana_sdk::program_error::ProgramError> for SolanaError {
    fn from(err: solana_sdk::program_error::ProgramError) -> Self {
        SolanaError::ProgramError(err.to_string())
    }
} 