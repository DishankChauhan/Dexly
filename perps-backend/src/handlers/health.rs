use actix_web::{get, web, HttpResponse, Responder};
use serde::Serialize;
use crate::database;
use crate::solana::client::get_solana_client;
use crate::models::error::ApiError;
use sqlx::PgPool;

#[derive(Serialize)]
struct HealthResponse {
    status: String,
    version: String,
    solana_connection: bool,
    database_connection: bool,
    uptime: u64,
}

/// Health check endpoint to verify service status
#[get("/health")]
pub async fn health_check(db_pool: web::Data<PgPool>) -> impl Responder {
    let db_connected = match sqlx::query("SELECT 1").execute(db_pool.get_ref()).await {
        Ok(_) => true,
        Err(_) => false,
    };
    
    let solana_client = get_solana_client();
    let solana_connected = solana_client.get_slot().await.is_ok();
    
    // Calculate overall health
    let is_healthy = db_connected && solana_connected;
    
    let status = if is_healthy {
        "healthy"
    } else {
        "unhealthy"
    };
    
    let status_code = if is_healthy {
        200
    } else {
        503
    };
    
    HttpResponse::build(actix_web::http::StatusCode::from_u16(status_code).unwrap())
        .json(serde_json::json!({
            "status": status,
            "database": db_connected,
            "solana": solana_connected,
        }))
}

/// Register health check routes
pub fn register(cfg: &mut web::ServiceConfig) {
    cfg.service(health_check);
} 