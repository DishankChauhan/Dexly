use actix_web::{post, web, HttpResponse, Responder};
use log::info;

use crate::models::ApiResponse;
use crate::models::global_state::{PauseProtocolRequest, UpdateFeesRequest};
use crate::models::error::ApiError;

// These admin functions are implemented in global_state.rs:
// - init_global_state (POST /api/admin/init-global)
// - pause_protocol (POST /api/admin/pause-protocol)
// - update_fees (POST /api/admin/update-fees)

// And in markets.rs:
// - init_market (POST /api/admin/init-market)

// Dummy endpoint to redirect to actual implementations
pub fn pause_protocol(
    req: web::Json<PauseProtocolRequest>,
) -> Result<impl Responder, ApiError> {
    // This function is implemented in global_state.rs
    crate::handlers::global_state::pause_protocol(req)
}

// Dummy endpoint to redirect to actual implementations
pub fn update_fees(
    req: web::Json<UpdateFeesRequest>,
) -> Result<impl Responder, ApiError> {
    // This function is implemented in global_state.rs
    crate::handlers::global_state::update_fees(req)
} 