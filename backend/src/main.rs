use axum::{
    routing::{get, post},
    Router,
    Json,
    extract::State,
    http::{StatusCode, Method, HeaderValue},
    response::IntoResponse,
};
use tower_http::cors::{CorsLayer, Any};
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use tokio::sync::RwLock;
use std::net::SocketAddr;
use tokio::time::{interval, Duration};
use std::str::FromStr;
use solana_sdk::pubkey::Pubkey;
use anyhow::Result;
use std::collections::HashMap;

mod db;
mod solana;

use solana::SolanaClient;

// Types for our API
#[derive(Debug, Clone, Serialize, Deserialize)]
struct Position {
    id: String,
    wallet: String,
    direction: String, // "long" or "short"
    size: f64,
    leverage: f64,
    entry_price: f64,
    liquidation_price: f64,
    current_price: f64,
    pnl: f64,
    timestamp: u64,
    tx_signature: Option<String>, // Solana transaction signature
    position_pubkey: Option<String>, // Store the Solana position account pubkey
}

#[derive(Debug, Serialize, Deserialize)]
struct OpenPositionRequest {
    wallet: String,
    direction: String,
    size: f64,
    leverage: f64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct PriceData {
    price: f64,
    timestamp: u64,
    source: String, // "pyth" or "simulation"
}

// More detailed error response
#[derive(Debug, Serialize)]
struct ErrorResponse {
    status: String,
    message: String,
    code: Option<String>,
    details: Option<String>,
}

impl ErrorResponse {
    fn new(message: &str) -> Self {
        Self {
            status: "error".to_string(),
            message: message.to_string(),
            code: None,
            details: None,
        }
    }
    
    fn with_details(message: &str, details: &str) -> Self {
        Self {
            status: "error".to_string(),
            message: message.to_string(),
            code: None,
            details: Some(details.to_string()),
        }
    }
    
    fn with_code(message: &str, code: &str) -> Self {
        Self {
            status: "error".to_string(),
            message: message.to_string(),
            code: Some(code.to_string()),
            details: None,
        }
    }
}

// Application state
struct AppState {
    positions: Vec<Position>,
    positions_map: HashMap<String, String>, // Maps position_id to Solana pubkey
    price_data: PriceData,
    solana_client: Option<SolanaClient>,
}

// API handlers
async fn get_positions(State(state): State<Arc<RwLock<AppState>>>) -> Json<Vec<Position>> {
    let state = state.read().await;
    Json(state.positions.clone())
}

async fn get_position_by_wallet(
    State(state): State<Arc<RwLock<AppState>>>,
    Json(wallet): Json<String>,
) -> Json<Vec<Position>> {
    let state = state.read().await;
    let filtered = state.positions.iter()
        .filter(|p| p.wallet == wallet)
        .cloned()
        .collect();
    Json(filtered)
}

async fn get_current_price(
    State(state): State<Arc<RwLock<AppState>>>,
) -> Json<PriceData> {
    let state = state.read().await;
    Json(state.price_data.clone())
}

async fn open_position(
    State(state): State<Arc<RwLock<AppState>>>,
    Json(request): Json<OpenPositionRequest>,
) -> Result<Json<Position>, impl IntoResponse> {
    let direction_bool = request.direction == "long";
    
    // Get current price data
    let (current_price, price_source) = {
        let state = state.read().await;
        (state.price_data.price, state.price_data.source.clone())
    };
    
    // Calculate liquidation price based on direction and leverage
    let liquidation_price = if request.direction == "long" {
        current_price * (1.0 - (0.9 / request.leverage))
    } else {
        current_price * (1.0 + (0.9 / request.leverage))
    };
    
    // Convert SOL amount to lamports (1 SOL = 1_000_000_000 lamports)
    let collateral_amount = (request.size * 1_000_000_000.0) as u64;
    let leverage_u8 = request.leverage as u8;
    
    // Try to interact with Solana if client is available
    let (tx_signature, position_pubkey) = if let Some(solana_client) = {
        let state = state.read().await;
        state.solana_client.as_ref().cloned()
    } {
        // Parse the wallet address to a Pubkey
        match Pubkey::from_str(&request.wallet) {
            Ok(wallet_pubkey) => {
                // Check if user account exists, if not create it
                let user_exists = match solana_client.user_account_exists(&wallet_pubkey).await {
                    Ok(exists) => exists,
                    Err(err) => {
                        return Err((
                            StatusCode::INTERNAL_SERVER_ERROR,
                            Json(ErrorResponse::with_details(
                                "Failed to check if user account exists", 
                                &format!("Error: {}", err)
                            ))
                        ));
                    }
                };
                
                if !user_exists {
                    // Create user account first
                    match solana_client.create_user_account(&wallet_pubkey).await {
                        Ok(_) => {
                            println!("Created new user account for wallet {}", request.wallet);
                        },
                        Err(err) => {
                            return Err((
                                StatusCode::INTERNAL_SERVER_ERROR,
                                Json(ErrorResponse::with_details(
                                    "Failed to create user account", 
                                    &format!("Error: {}", err)
                                ))
                            ));
                        }
                    }
                }
                
                // Open position on Solana
                match solana_client.open_position(&wallet_pubkey, direction_bool, collateral_amount, leverage_u8).await {
                    Ok(signature) => {
                        // We would normally know the position pubkey from the transaction result
                        // For now we'll generate a random one
                        let random_pubkey = Pubkey::new_unique();
                        (Some(signature), Some(random_pubkey.to_string()))
                    },
                    Err(err) => {
                        return Err((
                            StatusCode::INTERNAL_SERVER_ERROR,
                            Json(ErrorResponse::with_details(
                                "Failed to open position on Solana", 
                                &format!("Error: {}", err)
                            ))
                        ));
                    }
                }
            },
            Err(_) => {
                return Err((
                    StatusCode::BAD_REQUEST, 
                    Json(ErrorResponse::new("Invalid wallet address"))
                ));
            }
        }
    } else {
        // No Solana client, use simulation
        (None, None)
    };
    
    // Create position with transaction signature if available
    let position_id = uuid::Uuid::new_v4().to_string();
    let position = Position {
        id: position_id.clone(),
        wallet: request.wallet,
        direction: request.direction,
        size: request.size,
        leverage: request.leverage,
        entry_price: current_price,
        current_price,
        liquidation_price,
        pnl: 0.0,
        timestamp: std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap()
            .as_secs(),
        tx_signature,
        position_pubkey: position_pubkey.clone(),
    };
    
    // Add position to state
    {
        let mut state = state.write().await;
        state.positions.push(position.clone());
        
        // Store position pubkey mapping if available
        if let Some(pubkey) = position_pubkey {
            state.positions_map.insert(position_id, pubkey);
        }
    }
    
    Ok(Json(position))
}

async fn close_position(
    State(state): State<Arc<RwLock<AppState>>>,
    Json(position_id): Json<String>,
) -> impl IntoResponse {
    let (position_to_close, solana_pubkey) = {
        let state = state.read().await;
        let position = state.positions.iter()
            .find(|p| p.id == position_id)
            .cloned();
        
        let pubkey = state.positions_map.get(&position_id).cloned();
        (position, pubkey)
    };
    
    if let Some(position) = position_to_close {
        // Try to interact with Solana if client is available
        if let Some(solana_client) = {
            let state = state.read().await;
            state.solana_client.as_ref().cloned()
        } {
            // We need the position pubkey to close it
            if let Some(pubkey_str) = solana_pubkey {
                // Parse the wallet address and position pubkey
                match (Pubkey::from_str(&position.wallet), Pubkey::from_str(&pubkey_str)) {
                    (Ok(wallet_pubkey), Ok(position_pubkey)) => {
                        // Call Solana program to close position
                        match solana_client.close_position(&position_pubkey, &wallet_pubkey).await {
                            Ok(_signature) => {
                                // Position successfully closed on Solana
                                println!("Position closed on Solana: {}", position_id);
                            },
                            Err(err) => {
                                // Log error but continue (we'll still remove from our local state)
                                eprintln!("Error closing position on Solana: {}", err);
                                return (
                                    StatusCode::INTERNAL_SERVER_ERROR,
                                    Json(ErrorResponse::with_details(
                                        "Failed to close position on Solana but removed from local state", 
                                        &format!("Error: {}", err)
                                    ))
                                ).into_response();
                            }
                        }
                    },
                    _ => {
                        eprintln!("Invalid wallet or position address");
                        return (
                            StatusCode::BAD_REQUEST,
                            Json(ErrorResponse::new("Invalid wallet or position address"))
                        ).into_response();
                    }
                }
            } else {
                // We don't have the position pubkey, log a message
                println!("Would close position on Solana for wallet: {}", position.wallet);
            }
        }
        
        // Remove position from state
        {
            let mut state = state.write().await;
            if let Some(index) = state.positions.iter().position(|p| p.id == position_id) {
                state.positions.remove(index);
                state.positions_map.remove(&position_id);
                return StatusCode::OK.into_response();
            }
        }
    }
    
    // Position not found
    (
        StatusCode::NOT_FOUND,
        Json(ErrorResponse::new("Position not found"))
    ).into_response()
}

// Update prices from Pyth and update positions from blockchain
async fn update_prices_and_positions(app_state: Arc<RwLock<AppState>>) {
    let mut interval = interval(Duration::from_secs(5));
    
    loop {
        interval.tick().await;
        
        let mut new_price = 0.0;
        let mut price_source = "simulation".to_string();
        
        // Try to get price from Solana if client is available
        let solana_client_option = {
            let state = app_state.read().await;
            state.solana_client.as_ref().cloned()
        };
        
        if let Some(solana_client) = &solana_client_option {
            match solana_client.get_sol_price().await {
                Ok(price) => {
                    new_price = price;
                    price_source = "pyth".to_string();
                },
                Err(err) => {
                    eprintln!("Error getting SOL price from Pyth: {}", err);
                    // Fall back to simulation
                    new_price = simulate_price_movement();
                }
            }
        } else {
            // Fall back to simulation if no Solana client
            new_price = simulate_price_movement();
        }
        
        let timestamp = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap()
            .as_secs();
        
        // Prepare to update positions
        let mut updated_positions = Vec::new();
        let position_pubkeys: Vec<(String, String)> = {
            let state = app_state.read().await;
            state.positions_map.iter()
                .map(|(id, pubkey)| (id.clone(), pubkey.clone()))
                .collect()
        };
        
        // Update position data from blockchain if available
        if let Some(solana_client) = &solana_client_option {
            for (position_id, pubkey_str) in position_pubkeys {
                match Pubkey::from_str(&pubkey_str) {
                    Ok(pubkey) => {
                        // Get real position data from blockchain
                        match solana_client.get_position_data(&pubkey).await {
                            Ok(Some(position_data)) => {
                                // Store the position for update
                                updated_positions.push((position_id, position_data));
                            },
                            Ok(None) => {
                                // Position not found on blockchain, might be closed
                                eprintln!("Position {} not found on blockchain", position_id);
                            },
                            Err(err) => {
                                eprintln!("Error getting position data: {}", err);
                            }
                        }
                    },
                    Err(_) => {
                        eprintln!("Invalid position pubkey: {}", pubkey_str);
                    }
                }
            }
        }
        
        // Update state
        let mut state = app_state.write().await;
        
        // Update the current price
        state.price_data = PriceData {
            price: new_price,
            timestamp,
            source: price_source,
        };
        
        // Update positions with blockchain data if available
        for (position_id, position_data) in updated_positions {
            if let Some(position) = state.positions.iter_mut().find(|p| p.id == position_id) {
                position.current_price = position_data.current_price as f64 / 1_000_000.0;
                position.pnl = position_data.pnl as f64 / 1_000_000.0;
                // We could update more fields from blockchain data here
            }
        }
        
        // Update PnL for positions without blockchain data
        for position in &mut state.positions {
            // Skip positions that were already updated from blockchain
            if !updated_positions.iter().any(|(id, _)| id == &position.id) {
                position.current_price = new_price;
                
                // Calculate PnL
                let price_change = if position.direction == "long" {
                    (new_price - position.entry_price) / position.entry_price
                } else {
                    (position.entry_price - new_price) / position.entry_price
                };
                
                position.pnl = price_change * position.size * position.leverage;
            }
        }
    }
}

// Simulate price movements for testing
fn simulate_price_movement() -> f64 {
    use std::time::SystemTime;
    
    // Start with a base price
    let base_price = 100.0;
    
    // Add some randomness based on current time
    let now = SystemTime::now()
        .duration_since(SystemTime::UNIX_EPOCH)
        .unwrap()
        .as_secs() as f64;
    
    // Simple sine wave with some noise
    let wave = (now / 100.0).sin() * 10.0;
    let noise = (now % 10.0) / 10.0;
    
    base_price + wave + noise
}

// Liquidation bot that runs in the background
async fn run_liquidation_bot(app_state: Arc<RwLock<AppState>>) {
    let mut interval = interval(Duration::from_secs(10));
    
    loop {
        interval.tick().await;
        
        // Get positions that need liquidation
        let positions_to_liquidate = {
            let state = app_state.read().await;
            state.positions.iter()
                .filter_map(|p| {
                    if (p.direction == "long" && p.current_price <= p.liquidation_price) || 
                       (p.direction == "short" && p.current_price >= p.liquidation_price) {
                        Some((p.id.clone(), p.wallet.clone(), state.positions_map.get(&p.id).cloned()))
                    } else {
                        None
                    }
                })
                .collect::<Vec<_>>()
        };
        
        if positions_to_liquidate.is_empty() {
            continue;
        }
        
        // Get Solana client
        let solana_client_option = {
            let state = app_state.read().await;
            state.solana_client.as_ref().cloned()
        };
        
        // Process liquidations
        for (position_id, wallet, maybe_pubkey) in positions_to_liquidate {
            println!("Liquidating position: {}", position_id);
            
            // Liquidate on blockchain if possible
            if let (Some(solana_client), Some(pubkey_str)) = (&solana_client_option, maybe_pubkey) {
                match (Pubkey::from_str(&wallet), Pubkey::from_str(&pubkey_str)) {
                    (Ok(_wallet_pubkey), Ok(position_pubkey)) => {
                        // Get the liquidator keypair (in production this would be a dedicated liquidator)
                        let liquidator = solana_client.clone();
                        let liquidator_pubkey = liquidator.payer.pubkey();
                        
                        // Call Solana to liquidate the position
                        match liquidator.liquidate_position(&position_pubkey, &liquidator_pubkey).await {
                            Ok(signature) => {
                                println!("Position {} liquidated on blockchain with tx: {}", position_id, signature);
                            },
                            Err(err) => {
                                eprintln!("Failed to liquidate position {} on blockchain: {}", position_id, err);
                            }
                        }
                    },
                    _ => {
                        println!("Invalid wallet or position pubkey for liquidation");
                    }
                }
            } else {
                // Just log in simulation mode
                println!("Simulated liquidation for position {}", position_id);
            }
            
            // Remove position from local state
            let mut state = app_state.write().await;
            if let Some(index) = state.positions.iter().position(|p| p.id == position_id) {
                state.positions.remove(index);
                state.positions_map.remove(&position_id);
                println!("Position {} liquidated and removed from state", position_id);
            }
        }
    }
}

#[tokio::main]
async fn main() {
    // Initialize Solana client
    let solana_client = match SolanaClient::new() {
        Ok(client) => {
            println!("Successfully initialized Solana client");
            Some(client)
        },
        Err(err) => {
            eprintln!("Failed to initialize Solana client: {}", err);
            eprintln!("Falling back to simulation mode");
            None
        }
    };
    
    // Start transaction queue processor if we have a client
    if let Some(client) = &solana_client {
        client.start_queue_processor().await;
        println!("Transaction queue processor started");
    }
    
    // Initialize application state
    let app_state = Arc::new(RwLock::new(AppState {
        positions: Vec::new(),
        positions_map: HashMap::new(),
        price_data: PriceData {
            price: 100.0, // Initial price
            timestamp: std::time::SystemTime::now()
                .duration_since(std::time::UNIX_EPOCH)
                .unwrap()
                .as_secs(),
            source: if solana_client.is_some() { "pyth".to_string() } else { "simulation".to_string() },
        },
        solana_client,
    }));
    
    // Clone state for the background tasks
    let price_state_clone = app_state.clone();
    let liquidation_state_clone = app_state.clone();
    
    // Spawn background task to update prices and positions
    tokio::spawn(async move {
        update_prices_and_positions(price_state_clone).await;
    });
    
    // Spawn background task for liquidation bot
    tokio::spawn(async move {
        run_liquidation_bot(liquidation_state_clone).await;
    });
    
    // Configure CORS
    let cors = CorsLayer::new()
        .allow_origin("http://localhost:3000".parse::<HeaderValue>().unwrap())
        .allow_methods([Method::GET, Method::POST])
        .allow_headers(Any);
    
    // Build our application with routes
    let app = Router::new()
        .route("/positions", get(get_positions))
        .route("/positions/wallet", post(get_position_by_wallet))
        .route("/positions/open", post(open_position))
        .route("/positions/close", post(close_position))
        .route("/price", get(get_current_price))
        .with_state(app_state)
        .layer(cors);
    
    // Run the server
    let addr = SocketAddr::from(([127, 0, 0, 1], 3001));
    println!("Listening on {}", addr);
    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
