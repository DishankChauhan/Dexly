use actix_cors::Cors;
use actix_web::{middleware, App, HttpServer};
use env_logger::Env;
use log::info;

use perps_backend::config::CONFIG;
use perps_backend::handlers;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Initialize environment logger
    env_logger::init_from_env(Env::default().default_filter_or("info"));
    
    info!("Starting Perps Backend Server");
    info!("Connecting to Solana RPC at: {}", CONFIG.solana_rpc_url);
    info!("Program ID: {}", CONFIG.perps_program_id);
    
    // Start HTTP server
    let server = HttpServer::new(|| {
        // Create Cors middleware
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header()
            .max_age(3600);
            
        App::new()
            // Enable logger middleware
            .wrap(middleware::Logger::default())
            // Enable CORS
            .wrap(cors)
            // Global state endpoints
            .service(handlers::global_state::get_global_state)
            .service(handlers::global_state::init_global_state)
            // Market endpoints
            .service(handlers::markets::get_markets)
            .service(handlers::markets::init_market)
            // User endpoints
            .service(handlers::users::get_user)
            .service(handlers::users::create_user)
            // Collateral endpoints
            .service(handlers::collateral::deposit_collateral)
            .service(handlers::collateral::withdraw_collateral)
            // Position endpoints
            .service(handlers::positions::get_positions)
            .service(handlers::positions::open_position)
            .service(handlers::positions::close_position)
            // Oracle endpoints
            .service(handlers::oracle::update_oracle)
            // Admin endpoints
            .service(handlers::global_state::pause_protocol)
            .service(handlers::global_state::update_fees)
    })
    .bind((CONFIG.server_host.as_str(), CONFIG.server_port))?
    .run();
    
    info!("Server running at http://{}:{}", CONFIG.server_host, CONFIG.server_port);
    
    server.await
} 