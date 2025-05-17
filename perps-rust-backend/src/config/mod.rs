use dotenv::dotenv;
use once_cell::sync::Lazy;
use solana_sdk::pubkey::Pubkey;
use solana_sdk::signature::Keypair;
use std::env;
use std::fs;
use std::str::FromStr;

// Application Config structure
pub struct Config {
    // Server config
    pub server_host: String,
    pub server_port: u16,
    
    // Solana connection
    pub solana_rpc_url: String,
    pub perps_program_id: Pubkey,
    pub perps_idl_path: String,
    
    // Admin keypair for signing transactions
    pub admin_keypair: Keypair,
    
    // USDC mint address
    pub usdc_mint: Pubkey,
    
    // Cache settings
    pub cache_duration_secs: u64,
}

// Singleton instance of Config
pub static CONFIG: Lazy<Config> = Lazy::new(|| {
    // Load .env file if it exists
    dotenv().ok();
    
    // Initialize Config
    Config {
        // Server config
        server_host: env::var("SERVER_HOST").unwrap_or_else(|_| "127.0.0.1".to_string()),
        server_port: env::var("SERVER_PORT").unwrap_or_else(|_| "8080".to_string())
            .parse().unwrap_or(8080),
        
        // Solana connection
        solana_rpc_url: env::var("SOLANA_RPC_URL")
            .unwrap_or_else(|_| "http://localhost:8899".to_string()),
        perps_program_id: Pubkey::from_str(
            &env::var("PERPS_PROGRAM_ID").expect("PERPS_PROGRAM_ID must be set in environment")
        ).expect("Invalid PERPS_PROGRAM_ID"),
        perps_idl_path: env::var("PERPS_IDL_PATH")
            .unwrap_or_else(|_| "./perps-idl.json".to_string()),
        
        // Admin keypair from file
        admin_keypair: load_keypair(),
        
        // USDC mint address
        usdc_mint: Pubkey::from_str(
            &env::var("USDC_MINT").expect("USDC_MINT must be set in environment")
        ).expect("Invalid USDC_MINT"),
        
        // Cache settings
        cache_duration_secs: env::var("CACHE_DURATION_SECS")
            .unwrap_or_else(|_| "60".to_string())
            .parse()
            .unwrap_or(60),
    }
});

// Load the admin keypair from environment or file
fn load_keypair() -> Keypair {
    // First check if set via environment variable
    if let Ok(keypair_base58) = env::var("ADMIN_KEYPAIR") {
        return keypair_from_base58(&keypair_base58)
            .expect("Failed to load admin keypair from ADMIN_KEYPAIR environment variable");
    }
    
    // Then check for keypair file path
    let keypair_path = env::var("ADMIN_KEYPAIR_PATH")
        .unwrap_or_else(|_| "./admin-keypair.json".to_string());
    
    // Load from file
    let keypair_bytes = fs::read_to_string(&keypair_path)
        .expect(&format!("Failed to read keypair file at {}", &keypair_path));
    
    // Parse from JSON array
    let keypair_bytes: Vec<u8> = serde_json::from_str(&keypair_bytes)
        .expect("Failed to parse keypair file as JSON array");
    
    Keypair::from_bytes(&keypair_bytes)
        .expect("Failed to create keypair from bytes")
}

// Create a keypair from a base58 encoded string
fn keypair_from_base58(base58_str: &str) -> Result<Keypair, Box<dyn std::error::Error>> {
    let keypair_bytes = bs58::decode(base58_str).into_vec()?;
    Ok(Keypair::from_bytes(&keypair_bytes)?)
} 