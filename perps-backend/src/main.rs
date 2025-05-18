use actix_web::{web, App, HttpServer, middleware, middleware::Logger};
use actix_cors::Cors;
use log::{info, error, warn};
use std::sync::Arc;
use tokio::signal;

mod config;
mod models;
mod handlers;
mod solana;
mod utils;
mod database;

use crate::config::CONFIG;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Initialize environment
    dotenv::dotenv().ok();
    
    // Initialize logger
    env_logger::init_from_env(env_logger::Env::default().default_filter_or("info"));
    
    info!("Starting Perps Protocol Backend");
    
    // Initialize Solana client
    match solana::client::init_solana_client().await {
        Ok(_) => info!("Solana client initialized successfully"),
        Err(e) => {
            error!("Failed to initialize Solana client: {}", e);
            return Err(std::io::Error::new(std::io::ErrorKind::Other, format!("Solana client initialization failed: {}", e)));
        }
    }
    
    // Initialize database
    match database::init_database_schema().await {
        Ok(_) => info!("Database initialized successfully"),
        Err(e) => {
            error!("Failed to initialize database: {}", e);
            return Err(std::io::Error::new(std::io::ErrorKind::Other, format!("Database initialization failed: {}", e)));
        }
    }
    
    // Get database pool
    let db_pool = match database::get_pool().await {
        Ok(pool) => pool,
        Err(e) => {
            error!("Failed to get database pool: {}", e);
            return Err(std::io::Error::new(std::io::ErrorKind::Other, format!("Database pool error: {}", e)));
        }
    };
    
    // Start WebSocket event indexer
    tokio::spawn(async {
        match database::events::subscribe_to_program_events().await {
            Ok(_) => info!("WebSocket event subscription completed"),
            Err(e) => {
                error!("WebSocket event subscription error: {}", e);
                error!("Event indexing may not be fully operational");
            }
        }
    });
    
    info!("Starting server on port {}", CONFIG.port);
    
    // Create a function to handle graceful shutdown
    let server = HttpServer::new(move || {
        // Initialize CORS
        let cors = Cors::default()
            .allow_any_origin()
            .allowed_methods(vec!["GET", "POST", "PUT", "DELETE"])
            .allowed_headers(vec![
                "Authorization",
                "Content-Type",
                "X-Requested-With",
                "User-Agent",
                "X-Admin-Key", // Allow admin key header
            ])
            .supports_credentials()
            .max_age(3600);
        
        // Configure default JSON extractor with 5MB size limit
        let json_config = web::JsonConfig::default()
            .limit(5 * 1024 * 1024)
            .error_handler(|err, _req| {
                let error_message = format!("JSON error: {}", err);
                actix_web::error::InternalError::from_response(
                    err, 
                    web::HttpResponse::BadRequest().json(models::error::ErrorResponse {
                        status: "error".to_string(),
                        message: error_message,
                        error_code: Some("INVALID_JSON".to_string()),
                        details: None,
                    })
                ).into()
            });

        // Configure rate limiting middleware
        let rate_limit = middleware::DefaultHeaders::default()
            .header("X-Rate-Limit-Limit", "100")
            .header("X-Rate-Limit-Remaining", "99")
            .header("X-Rate-Limit-Reset", "60");
            
        App::new()
            // Middlewares
            .wrap(middleware::Compress::default())
            .wrap(Logger::new("%a %r %s %b %{Referer}i %{User-Agent}i %T"))
            .wrap(cors)
            .wrap(rate_limit)
            
            // Data and configurations
            .app_data(json_config)
            .app_data(web::Data::new(Arc::new(&config::CONFIG)))
            .app_data(web::Data::new(db_pool.clone()))
            
            // Register API routes
            .service(
                web::scope("/api")
                    .configure(handlers::health::register)
                    .configure(handlers::markets::register)
                    .configure(handlers::positions::register)
                    .configure(handlers::orders::register)
                    .configure(handlers::users::register)
                    .configure(handlers::admin::register)
            )
            
            // Default route handler
            .default_service(web::route().to(|| async {
                web::HttpResponse::NotFound().json(models::error::ErrorResponse {
                    status: "error".to_string(),
                    message: "Resource not found".to_string(),
                    error_code: Some("NOT_FOUND".to_string()),
                    details: None,
                })
            }))
    })
    .bind(format!("0.0.0.0:{}", CONFIG.port))?
    .workers(CONFIG.max_connections as usize);
    
    // Create and start the server
    let server_task = server.run();
    
    // Create a shutdown signal handler
    let (tx, rx) = tokio::sync::oneshot::channel();
    
    // Handle CTRL+C
    tokio::spawn(async move {
        tokio::signal::ctrl_c().await.expect("Failed to listen for ctrl+c event");
        info!("Received shutdown signal");
        let _ = tx.send(());
    });
    
    // Wait for either the server to exit or a shutdown signal
    tokio::select! {
        _ = server_task => {
            info!("Server exited");
        }
        _ = rx => {
            info!("Shutting down server");
            // Server will be dropped and shutdown automatically
        }
    }
    
    Ok(())
} 