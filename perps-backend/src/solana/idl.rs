use serde::{Deserialize, Serialize};
use anchor_client::solana_sdk::pubkey::Pubkey;
use std::collections::HashMap;
use std::str::FromStr;

/// Program IDL structure matching the Anchor-generated IDL
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PerpsProgramIdl {
    pub version: String,
    pub name: String,
    pub instructions: Vec<IdlInstruction>,
    pub accounts: Vec<IdlAccount>,
    pub types: Vec<IdlType>,
    pub events: Vec<IdlEvent>,
    pub errors: Vec<IdlError>,
    pub constants: Vec<IdlConst>,
    pub metadata: Option<HashMap<String, String>>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct IdlInstruction {
    pub name: String,
    pub accounts: Vec<IdlAccountItem>,
    pub args: Vec<IdlField>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct IdlAccountItem {
    pub name: String,
    pub isMut: bool,
    pub isSigner: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct IdlField {
    pub name: String,
    pub type_: IdlType,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum IdlType {
    Primitive(String),
    Defined(IdlDefinedType),
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct IdlDefinedType {
    pub defined: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct IdlAccount {
    pub name: String,
    pub type_: IdlAccountType,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct IdlAccountType {
    pub kind: String,
    pub fields: Vec<IdlField>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct IdlEvent {
    pub name: String,
    pub fields: Vec<IdlField>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct IdlError {
    pub code: u32,
    pub name: String,
    pub msg: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct IdlConst {
    pub name: String,
    pub type_: String,
    pub value: String,
}

/// Perpetual Futures Program Accounts
#[derive(Debug, Clone)]
pub enum PerpAccount {
    User,
    Market,
    Position,
    Order,
    Vault,
    Oracle,
    GlobalState,
}

/// Program account name to seed mapping
impl PerpAccount {
    pub fn seeds(&self) -> &[u8] {
        match self {
            PerpAccount::User => b"user",
            PerpAccount::Market => b"market",
            PerpAccount::Position => b"position",
            PerpAccount::Order => b"order",
            PerpAccount::Vault => b"vault",
            PerpAccount::Oracle => b"oracle",
            PerpAccount::GlobalState => b"global_state",
        }
    }
}

/// The different order types in the perps protocol
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum OrderType {
    Market = 0,
    Limit = 1,
    StopMarket = 2,
    StopLimit = 3,
}

impl From<u8> for OrderType {
    fn from(value: u8) -> Self {
        match value {
            0 => OrderType::Market,
            1 => OrderType::Limit,
            2 => OrderType::StopMarket,
            3 => OrderType::StopLimit,
            _ => OrderType::Market,
        }
    }
}

/// The different oracle sources supported
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum OracleSource {
    Pyth = 0,
    Switchboard = 1,
}

impl From<u8> for OracleSource {
    fn from(value: u8) -> Self {
        match value {
            0 => OracleSource::Pyth,
            1 => OracleSource::Switchboard,
            _ => OracleSource::Pyth,
        }
    }
}

/// Function to load the program IDL from a JSON file or embed it directly
pub fn load_idl() -> PerpsProgramIdl {
    // In a production environment, this would load from a file or be embedded
    // For now, we'll return a simplified version of the IDL
    
    serde_json::from_str(include_str!("../../../perps/perps.json"))
        .expect("Failed to parse embedded IDL")
}

// Static reference to the program ID
lazy_static::lazy_static! {
    pub static ref PROGRAM_ID: Pubkey = Pubkey::from_str(
        &std::env::var("PERPS_PROGRAM_ID")
        .unwrap_or_else(|_| "perpXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX".to_string())
    ).expect("Invalid program ID");
} 