use anchor_client::Cluster;
use lazy_static::lazy_static;
use log::info;
use anchor_client::solana_sdk::commitment_config::CommitmentConfig;
use anchor_client::solana_sdk::pubkey::Pubkey;
use anchor_client::solana_sdk::signature::{Keypair, read_keypair_file};
use std::env;
use std::str::FromStr;
use std::sync::Arc;

/// Configuration for the application
pub struct Config {
    /// RPC URL for Solana
    pub rpc_url: String,
    
    /// Wallet keypair for transaction signing
    pub keypair: Arc<Keypair>,
    
    /// Program ID for the perps program
    pub program_id: String,
    
    /// Database connection string
    pub database_url: String,
    
    /// HTTP port for the server
    pub port: u16,
    
    /// Commitment level for Solana transactions
    pub commitment: CommitmentConfig,
    
    /// Max concurrent requests
    pub max_connections: u32,
    
    /// WebSocket URL for Solana
    pub ws_url: Option<String>,
    
    /// Perps program ID as string for convenience
    pub perps_program_id: String,
}

lazy_static! {
    /// Global configuration instance
    pub static ref CONFIG: Config = Config::from_env();
}

impl Config {
    /// Load configuration from environment variables
    pub fn from_env() -> Self {
        dotenv::dotenv().ok();
        
        // Load required environment variables
        let rpc_url = env::var("SOLANA_RPC_URL")
            .expect("SOLANA_RPC_URL environment variable is required");
            
        let keypair_path = env::var("KEYPAIR_PATH")
            .expect("KEYPAIR_PATH environment variable is required");
            
        let keypair = read_keypair_file(&keypair_path)
            .expect("Failed to read keypair file");
            
        let program_id_str = env::var("PERPS_PROGRAM_ID")
            .expect("PERPS_PROGRAM_ID environment variable is required");
        
        let program_id = program_id_str.clone();
            
        let database_url = env::var("DATABASE_URL")
            .expect("DATABASE_URL environment variable is required");
            
        // Load optional environment variables with defaults
        let port = env::var("PORT")
            .unwrap_or_else(|_| "8080".to_string())
            .parse::<u16>()
            .expect("PORT must be a valid integer");
            
        let commitment = match env::var("COMMITMENT").unwrap_or_else(|_| "confirmed".to_string()).as_str() {
            "processed" => CommitmentConfig::processed(),
            "confirmed" => CommitmentConfig::confirmed(),
            "finalized" => CommitmentConfig::finalized(),
            _ => CommitmentConfig::confirmed(),
        };
        
        let max_connections = env::var("MAX_CONNECTIONS")
            .unwrap_or_else(|_| "10".to_string())
            .parse::<u32>()
            .expect("MAX_CONNECTIONS must be a valid integer");
            
        let ws_url = env::var("SOLANA_WS_URL").ok();
        
        info!("Configuration loaded - RPC URL: {}, Program ID: {}, Port: {}", 
            rpc_url, program_id, port);
            
        Config {
            rpc_url,
            keypair: Arc::new(keypair),
            program_id: program_id_str.clone(),
            database_url,
            port,
            commitment,
            max_connections,
            ws_url,
            perps_program_id: program_id_str,
        }
    }
    
    /// Get the Solana cluster from RPC URL
    pub fn get_cluster(&self) -> Cluster {
        Cluster::Custom(self.rpc_url.clone(), self.ws_url.clone().unwrap_or_else(|| "".to_string()))
    }
}

/// Constants used throughout the application
pub mod constants {
    use anchor_client::solana_sdk::pubkey::Pubkey;
    use std::str::FromStr;
    
    // Program ID of the perps program
    pub const PERPS_PROGRAM_ID: &str = "DFxJxFuiidqxqWEuewJ4G6oaZxfWGwT7ZKxX4mxe3Pz9";
    
    // Seeds used for PDA derivation
    pub mod seeds {
        pub const MARKET: &[u8] = b"market";
        pub const USER: &[u8] = b"user";
        pub const POSITION: &[u8] = b"position";
        pub const VAULT: &[u8] = b"vault";
        pub const VAULT_AUTHORITY: &[u8] = b"vault_authority";
        pub const FEE_VAULT: &[u8] = b"fee_vault";
        pub const GLOBAL_STATE: &[u8] = b"global_state";
        pub const ORDER: &[u8] = b"order";
    }
    
    // Max number of positions per user
    pub const MAX_POSITIONS_PER_USER: u8 = 10;
    
    // Program ID as Pubkey
    pub fn program_id() -> Pubkey {
        Pubkey::from_str(PERPS_PROGRAM_ID).unwrap()
    }
} 