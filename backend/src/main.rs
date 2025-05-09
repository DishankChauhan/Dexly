use axum::{
    routing::{get, post},
    Router,
    Json,
    extract::State,
};
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use tokio::sync::RwLock;
use std::net::SocketAddr;

mod db;

// Types for our API
#[derive(Debug, Serialize, Deserialize)]
struct Position {
    id: String,
    wallet: String,
    direction: String, // "long" or "short"
    size: f64,
    leverage: f64,
    entry_price: f64,
    liquidation_price: f64,
    pnl: f64,
    timestamp: u64,
}

#[derive(Debug, Serialize, Deserialize)]
struct OpenPositionRequest {
    wallet: String,
    direction: String,
    size: f64,
    leverage: f64,
}

// Application state
struct AppState {
    positions: Vec<Position>,
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

async fn open_position(
    State(state): State<Arc<RwLock<AppState>>>,
    Json(request): Json<OpenPositionRequest>,
) -> Json<Position> {
    // In a real implementation, this would interact with the Solana program
    let position = Position {
        id: uuid::Uuid::new_v4().to_string(),
        wallet: request.wallet,
        direction: request.direction,
        size: request.size,
        leverage: request.leverage,
        entry_price: 100.0, // Mock price for now
        liquidation_price: if request.direction == "long" { 90.0 } else { 110.0 }, // Mock
        pnl: 0.0,
        timestamp: std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap()
            .as_secs(),
    };
    
    let mut state = state.write().await;
    state.positions.push(position.clone());
    
    Json(position)
}

#[tokio::main]
async fn main() {
    // Initialize database (commented out for now until we have a real database)
    // let db_pool = db::init_db().await.expect("Failed to initialize database");
    
    // Initialize application state
    let app_state = Arc::new(RwLock::new(AppState {
        positions: Vec::new(),
    }));
    
    // Build our application with routes
    let app = Router::new()
        .route("/positions", get(get_positions))
        .route("/positions/wallet", post(get_position_by_wallet))
        .route("/positions/open", post(open_position))
        .with_state(app_state);
    
    // Run the server
    let addr = SocketAddr::from(([127, 0, 0, 1], 3001));
    println!("Listening on {}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
