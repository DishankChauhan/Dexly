use anchor_client::anchor_lang::idl::Idl;
use once_cell::sync::Lazy;
use std::fs;
use std::sync::Arc;

use crate::config::CONFIG;
use crate::solana::error::SolanaError;

// Load IDL once and cache it
pub static PERPS_IDL: Lazy<Arc<Idl>> = Lazy::new(|| {
    Arc::new(load_idl(&CONFIG.perps_idl_path).expect("Failed to load perps IDL"))
});

// Load an IDL from a file
pub fn load_idl(idl_path: &str) -> Result<Idl, SolanaError> {
    let idl_content = fs::read_to_string(idl_path)
        .map_err(|e| SolanaError::IdlError(format!("Failed to read IDL file: {}", e)))?;
        
    let idl: Idl = serde_json::from_str(&idl_content)
        .map_err(|e| SolanaError::IdlError(format!("Failed to parse IDL JSON: {}", e)))?;
        
    Ok(idl)
} 