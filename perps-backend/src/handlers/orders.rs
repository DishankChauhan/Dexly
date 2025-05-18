use actix_web::{get, post, web, HttpResponse, Responder, delete};
use chrono::{DateTime, Utc};
use log::{info, error};
use serde::{Deserialize, Serialize};
use sqlx::PgPool;
use std::str::FromStr;
use anchor_lang::prelude::Pubkey;

use crate::models::error::ApiError;
use crate::models::order::{Order, OrderType, OrderStatus, PlaceOrderRequest, CancelOrderRequest, ExecuteOrderRequest as ModelExecuteOrderRequest};
use crate::database::{orders, positions};
use crate::solana::order::{OrderService, get_order_service};
use crate::solana::client::get_solana_client;

/// Get all orders for a user
#[get("/orders")]
pub async fn get_orders(
    user_pubkey: web::Query<UserPubkeyQuery>,
) -> Result<impl Responder, ApiError> {
    let user_pubkey_str = &user_pubkey.pubkey;
    let _user = Pubkey::from_str(user_pubkey_str)
        .map_err(|_| ApiError::InvalidRequest("Invalid user public key".to_string()))?;

    let order_service = get_order_service();
    
    let orders = order_service.get_user_orders(user_pubkey_str).await?;
    let total = orders.len();
    
    let response = OrderListResponse {
        orders,
        total,
    };
    
    Ok(HttpResponse::Ok().json(response))
}

/// Get a specific order by ID
#[get("/orders/{order_id}")]
pub async fn get_order(
    pool: web::Data<PgPool>,
    path: web::Path<String>,
) -> Result<impl Responder, ApiError> {
    let order_id = path.into_inner();
    info!("Getting order: {}", order_id);
    
    // Retrieve the order from the database
    let order = orders::get_order(&pool, &order_id).await?;
    
    Ok(HttpResponse::Ok().json(order))
}

/// Place a new order
#[post("/orders")]
pub async fn place_order(
    pool: web::Data<PgPool>,
    request: web::Json<PlaceOrderRequest>,
) -> Result<impl Responder, ApiError> {
    info!("Placing new order");
    
    let order_service = get_order_service();
    
    // Clone values we need before moving the request
    let user_id = request.user.clone();
    let market_id = request.market_id.clone();
    let order_type = request.order_type;
    let is_long = request.is_long;
    let size = request.size;
    let price = request.price;
    let collateral = request.collateral;
    let leverage = request.leverage;
    let max_slippage_bps = request.max_slippage_bps;
    let position_id = request.position_id;
    
    // Submit the order to the blockchain
    let (order_pubkey, signature) = order_service.place_order(request.into_inner()).await?;
    
    // Create the order object for database insertion
    let order = Order {
        id: order_pubkey.to_string(),
        user: user_id,
        market: market_id.to_string(),
        order_type,
        is_long,
        size,
        price,
        collateral,
        leverage,
        is_active: true,
        max_slippage_bps,
        created_at: Utc::now().timestamp(),
        position_id,
        bump: 0, // Will be set by on-chain program
        status: OrderStatus::Open,
        mark_price: None,
    };
    
    // Store the order in the database
    orders::insert_order(&pool, &order).await?;
    
    // Return the created order along with the transaction signature
    let response = OrderResponse {
        order,
        signature: signature.to_string(),
    };
    
    Ok(HttpResponse::Created().json(response))
}

/// Cancel an existing order
#[delete("/orders/{order_id}")]
pub async fn cancel_order(
    pool: web::Data<PgPool>,
    path: web::Path<String>,
    request: web::Json<CancelOrderRequest>,
) -> Result<impl Responder, ApiError> {
    let order_id = path.into_inner();
    info!("Cancelling order: {}", order_id);
    
    // Validate that the order exists and belongs to the user
    let order = orders::get_order(&pool, &order_id).await?;
    
    if order.user != request.user {
        return Err(ApiError::Unauthorized("Not authorized to cancel this order".to_string()));
    }
    
    // Check if the order can be cancelled
    if order.status != OrderStatus::Open {
        return Err(ApiError::InvalidRequest(format!("Order cannot be cancelled - current status: {:?}", order.status)));
    }
    
    let order_service = get_order_service();
    
    // Cancel the order on the blockchain
    let signature = order_service.cancel_order(request.into_inner()).await?;
    
    // Update the order status in the database
    orders::cancel_order(&pool, &order_id).await?;
    
    // Return success response
    let response = CancelOrderResponse {
        order_id,
        signature: signature.to_string(),
        status: "cancelled".to_string(),
    };
    
    Ok(HttpResponse::Ok().json(response))
}

/// Get all orders for a user
#[get("/users/{user_id}/orders")]
pub async fn get_user_orders(
    pool: web::Data<PgPool>,
    path: web::Path<String>,
) -> Result<impl Responder, ApiError> {
    let user_id = path.into_inner();
    info!("Getting orders for user: {}", user_id);
    
    // Retrieve orders from the database
    let orders = orders::get_user_orders(&pool, &user_id).await?;
    let total = orders.len();
    
    let response = OrderListResponse {
        orders,
        total,
    };
    
    Ok(HttpResponse::Ok().json(response))
}

/// Get active orders for a market
#[get("/markets/{market_id}/orders")]
pub async fn get_market_orders(
    pool: web::Data<PgPool>,
    path: web::Path<String>,
) -> Result<impl Responder, ApiError> {
    let market_id = path.into_inner();
    info!("Getting active orders for market: {}", market_id);
    
    // Retrieve active orders for the market from the database
    let orders = orders::get_market_orders(&pool, &market_id).await?;
    let total = orders.len();
    
    let response = OrderListResponse {
        orders,
        total,
    };
    
    Ok(HttpResponse::Ok().json(response))
}

/// Execute order (primarily for testing/admin purposes)
#[post("/orders/{order_id}/execute")]
pub async fn execute_order(
    _pool: web::Data<PgPool>,
    path: web::Path<String>,
    request: web::Json<ExecuteOrderRequest>,
) -> Result<impl Responder, ApiError> {
    let order_id = path.into_inner();
    info!("Executing order: {}", order_id);
    
    let order_service = get_order_service();
    
    // Execute the order on the blockchain
    let signature = order_service.execute_order(&order_id, &request.executor_id).await?;
    
    // The order will be updated via event indexing, but we can retrieve it now
    let order = order_service.get_order(&order_id).await?;
    
    // Return success response
    let response = OrderResponse {
        order,
        signature: signature.to_string(),
    };
    
    Ok(HttpResponse::Ok().json(response))
}

/// Request to execute an order
#[derive(Debug, Deserialize)]
pub struct ExecuteOrderRequest {
    pub executor_id: String,
}

/// Response for order operations
#[derive(Debug, Serialize)]
pub struct OrderResponse {
    pub order: Order,
    pub signature: String,
}

/// Response for cancelling an order
#[derive(Debug, Serialize)]
pub struct CancelOrderResponse {
    pub order_id: String,
    pub signature: String,
    pub status: String,
}

/// Response for order list
#[derive(Debug, Serialize)]
pub struct OrderListResponse {
    pub orders: Vec<Order>,
    pub total: usize,
}

#[derive(Debug, Deserialize)]
pub struct UserPubkeyQuery {
    pubkey: String,
}

/// Register order routes
pub fn register(cfg: &mut web::ServiceConfig) {
    cfg.service(get_orders)
       .service(get_order)
       .service(place_order)
       .service(cancel_order)
       .service(get_user_orders)
       .service(get_market_orders)
       .service(execute_order);
} 