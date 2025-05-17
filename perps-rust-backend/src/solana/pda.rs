use anchor_lang::prelude::*;
use solana_sdk::pubkey::Pubkey;
use solana_sdk::signature::Keypair;

use crate::config::CONFIG;
use crate::solana::error::SolanaError;

// Find global state PDA
pub fn find_global_state_pda() -> (Pubkey, u8) {
    Pubkey::find_program_address(
        &[b"global_state"],
        &CONFIG.perps_program_id,
    )
}

// Find user account PDA
pub fn find_user_pda(user_key: &Pubkey) -> (Pubkey, u8) {
    Pubkey::find_program_address(
        &[b"user", user_key.as_ref()],
        &CONFIG.perps_program_id,
    )
}

// Find market PDA
pub fn find_market_pda(market_id: u64) -> (Pubkey, u8) {
    Pubkey::find_program_address(
        &[b"market", &market_id.to_le_bytes()],
        &CONFIG.perps_program_id,
    )
}

// Find position PDA
pub fn find_position_pda(user_key: &Pubkey, position_id: u64) -> (Pubkey, u8) {
    Pubkey::find_program_address(
        &[b"position", user_key.as_ref(), &position_id.to_le_bytes()],
        &CONFIG.perps_program_id,
    )
}

// Find order PDA
pub fn find_order_pda(user_key: &Pubkey, order_id: u64) -> (Pubkey, u8) {
    Pubkey::find_program_address(
        &[b"order", user_key.as_ref(), &order_id.to_le_bytes()],
        &CONFIG.perps_program_id,
    )
}

// Find vault PDA
pub fn find_vault_pda(mint: &Pubkey) -> (Pubkey, u8) {
    Pubkey::find_program_address(
        &[b"vault", mint.as_ref()],
        &CONFIG.perps_program_id,
    )
}

// Find vault authority PDA
pub fn find_vault_authority_pda(mint: &Pubkey) -> (Pubkey, u8) {
    Pubkey::find_program_address(
        &[b"vault_authority", mint.as_ref()],
        &CONFIG.perps_program_id,
    )
}

// Find vault token account PDA
pub fn find_vault_token_account_pda(mint: &Pubkey) -> (Pubkey, u8) {
    Pubkey::find_program_address(
        &[b"vault_token_account", mint.as_ref()],
        &CONFIG.perps_program_id,
    )
} 