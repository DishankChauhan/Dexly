use anchor_client::anchor_lang::prelude::*;
use anchor_client::solana_sdk::pubkey::Pubkey;
use crate::config::constants::{self, seeds};
use crate::models::error::ApiError;
use crate::solana::idl::{PROGRAM_ID, PerpAccount as IdlPerpAccount};
use std::str::FromStr;

/// PerpAccount enum for PDA derivation
pub enum PerpAccount {
    GlobalState,
    User,
    Market,
    Position,
    Order,
    Vault,
    Oracle,
}

impl PerpAccount {
    pub fn seeds(&self) -> &[u8] {
        match self {
            PerpAccount::GlobalState => b"global-state",
            PerpAccount::User => b"user",
            PerpAccount::Market => b"market",
            PerpAccount::Position => b"position",
            PerpAccount::Order => b"order",
            PerpAccount::Vault => b"vault",
            PerpAccount::Oracle => b"oracle",
        }
    }
}

/// Find a program-derived address for a given account type and seeds
pub fn find_pda(account_type: &PerpAccount, seeds: &[&[u8]], program_id: &Pubkey) -> (Pubkey, u8) {
    // Combine the account type seed with the provided seeds
    let mut all_seeds = vec![account_type.seeds()];
    all_seeds.extend_from_slice(seeds);
    
    // Find the PDA
    Pubkey::find_program_address(&all_seeds, program_id)
}

/// Find user account PDA
pub fn find_user_pda(user_pubkey: &Pubkey, program_id: &Pubkey) -> (Pubkey, u8) {
    find_pda(&PerpAccount::User, &[user_pubkey.as_ref()], program_id)
}

/// Find market account PDA
pub fn find_market_pda(market_seed: &Pubkey, program_id: &Pubkey) -> (Pubkey, u8) {
    find_pda(&PerpAccount::Market, &[market_seed.as_ref()], program_id)
}

/// Find position account PDA
pub fn find_position_pda(user_pubkey: &Pubkey, market_pubkey: &Pubkey, position_seed: &Pubkey, program_id: &Pubkey) -> (Pubkey, u8) {
    find_pda(
        &PerpAccount::Position, 
        &[user_pubkey.as_ref(), market_pubkey.as_ref(), position_seed.as_ref()],
        program_id
    )
}

/// Find order account PDA
pub fn find_order_pda(user_pubkey: &Pubkey, order_seed: &Pubkey, program_id: &Pubkey) -> (Pubkey, u8) {
    find_pda(&PerpAccount::Order, &[user_pubkey.as_ref(), order_seed.as_ref()], program_id)
}

/// Find vault account PDA
pub fn find_vault_pda(program_id: &Pubkey) -> (Pubkey, u8) {
    find_pda(&PerpAccount::Vault, &[], program_id)
}

/// Find oracle account PDA
pub fn find_oracle_pda(market_pubkey: &Pubkey, program_id: &Pubkey) -> (Pubkey, u8) {
    find_pda(&PerpAccount::Oracle, &[market_pubkey.as_ref()], program_id)
}

/// Parse a pubkey from a string, with error handling
pub fn parse_pubkey(pubkey_str: &str) -> std::result::Result<Pubkey, String> {
    Pubkey::from_str(pubkey_str)
        .map_err(|e| format!("Invalid pubkey: {}", e))
}

/// Get the global state address
pub fn get_global_state_address(program_id: &Pubkey) -> Pubkey {
    let (address, _) = find_pda(&PerpAccount::GlobalState, &[], program_id);
    address
}

/// Get the user account address for a specific user
pub fn get_user_address(user: &Pubkey, program_id: &Pubkey) -> Pubkey {
    let (address, _) = find_user_pda(user, program_id);
    address
}

/// Get the position address for a specific user and position ID
pub fn get_position_address(user: &Pubkey, position_id: u64, program_id: &Pubkey) -> Pubkey {
    let position_id_bytes = position_id.to_le_bytes();
    let (address, _) = find_position_pda(user, program_id, &Pubkey::default(), program_id);
    address
}

/// Get the market address for a specific market ID
pub fn get_market_address(market_id: u64, program_id: &Pubkey) -> Pubkey {
    let market_id_bytes = market_id.to_le_bytes();
    let (address, _) = find_market_pda(&Pubkey::default(), program_id);
    address
}

/// Get the order address for a specific user and order ID
pub fn get_order_address(user: &Pubkey, order_id: u64, program_id: &Pubkey) -> Pubkey {
    let order_id_bytes = order_id.to_le_bytes();
    let (address, _) = find_order_pda(user, &Pubkey::default(), program_id);
    address
}

/// Get the vault address for a specific mint
pub fn get_vault_address(mint: &Pubkey, program_id: &Pubkey) -> Pubkey {
    let (address, _) = find_vault_pda(program_id);
    address
}

/// Get the vault authority address for a specific mint
pub fn get_vault_authority_address(mint: &Pubkey, program_id: &Pubkey) -> Pubkey {
    let (address, _) = find_vault_pda(program_id);
    address
}

/// Get the fee vault address for a specific mint
pub fn get_fee_vault_address(mint: &Pubkey, program_id: &Pubkey) -> Pubkey {
    let (address, _) = find_vault_pda(program_id);
    address
}

/// Get the vault token account address for a specific mint
pub fn get_vault_token_account_address(mint: &Pubkey, program_id: &Pubkey) -> Pubkey {
    let (address, _) = find_vault_pda(program_id);
    address
}

/// Get the fee vault token account address for a specific mint
pub fn get_fee_token_account_address(mint: &Pubkey, program_id: &Pubkey) -> Pubkey {
    let (address, _) = find_vault_pda(program_id);
    address
} 