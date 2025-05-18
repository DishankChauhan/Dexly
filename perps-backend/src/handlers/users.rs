use actix_web::{web, HttpResponse, Responder, get, post};
use log::{info, error};
use serde::{Deserialize, Serialize};
use sqlx::PgPool;
use std::str::FromStr;

use crate::models::error::ApiError;
use crate::models::user::{User, UserStats, DepositCollateralRequest, WithdrawCollateralRequest};
use crate::database::users;
use crate::solana::user::{UserService, get_user_service};

/// Get a user by ID
#[get("/users/{user_id}")]
pub async fn get_user(
    pool: web::Data<PgPool>,
    path: web::Path<String>,
) -> Result<impl Responder, ApiError> {
    let user_id = path.into_inner();
    info!("Getting user: {}", user_id);
    
    // Check if user exists in database
    let user_result = users::get_user(&pool, &user_id).await;
    
    match user_result {
        Ok(user) => Ok(HttpResponse::Ok().json(user)),
        Err(ApiError::NotFound(_)) => {
            // If user not found in database, check if it exists on-chain
            let user_service = get_user_service();
            match user_service.get_user(&user_id).await {
                Ok(user) => {
                    // User exists on-chain but not in database, create it
                    users::insert_user(&pool, &user_id, &user_id, 0).await?;
                    // Return the on-chain user data
                    Ok(HttpResponse::Ok().json(user))
                },
                Err(_) => Err(ApiError::NotFound(format!("User {} not found", user_id))),
            }
        },
        Err(e) => Err(e),
    }
}

/// Get user statistics
#[get("/users/{user_id}/stats")]
pub async fn get_user_stats(
    pool: web::Data<PgPool>,
    path: web::Path<String>,
) -> Result<impl Responder, ApiError> {
    let user_id = path.into_inner();
    info!("Getting stats for user: {}", user_id);
    
    // Retrieve user stats from the database
    let stats = users::get_user_stats(&pool, &user_id).await?;
    
    Ok(HttpResponse::Ok().json(stats))
}

/// Get user transactions
#[get("/users/{user_id}/transactions")]
pub async fn get_user_transactions(
    pool: web::Data<PgPool>,
    path: web::Path<String>,
    query: web::Query<TransactionQuery>,
) -> Result<impl Responder, ApiError> {
    let user_id = path.into_inner();
    info!("Getting transactions for user: {}", user_id);
    
    let limit = query.limit.unwrap_or(50).min(100);
    let offset = query.offset.unwrap_or(0);
    
    // Import the transactions module
    use crate::database::transactions;
    
    // Retrieve transactions from the database
    let txs = transactions::get_user_transactions(&pool, &user_id, limit, offset).await?;
    let total = txs.len();
    let has_more = total == limit;
    
    let response = TransactionListResponse {
        transactions: txs,
        total,
        has_more,
    };
    
    Ok(HttpResponse::Ok().json(response))
}

/// Create a new user
#[post("/users")]
pub async fn create_user(
    pool: web::Data<PgPool>,
    request: web::Json<CreateUserRequest>,
) -> Result<impl Responder, ApiError> {
    let user_id = &request.pubkey;
    info!("Creating user: {}", user_id);
    
    // Check if user already exists
    let user_exists = match users::get_user(&pool, user_id).await {
        Ok(_) => true,
        Err(ApiError::NotFound(_)) => false,
        Err(e) => return Err(e),
    };
    
    if user_exists {
        return Err(ApiError::InvalidRequest(format!("User {} already exists", user_id)));
    }
    
    // Create user on-chain
    let user_service = get_user_service();
    let signature = user_service.create_user(user_id).await?;
    
    // Create user in database
    users::insert_user(&pool, user_id, user_id, 0).await?;
    
    // Return the created user
    let user = users::get_user(&pool, user_id).await?;
    
    let response = UserResponse {
        user,
        signature: signature.to_string(),
    };
    
    Ok(HttpResponse::Created().json(response))
}

/// Deposit collateral
#[post("/users/{user_id}/deposit")]
pub async fn deposit_collateral(
    pool: web::Data<PgPool>,
    path: web::Path<String>,
    request: web::Json<DepositCollateralRequest>,
) -> Result<impl Responder, ApiError> {
    let user_id = path.into_inner();
    let amount = request.amount; // Extract amount before moving request
    info!("Depositing {} collateral for user: {}", amount, user_id);
    
    // Perform deposit on-chain
    let user_service = get_user_service();
    let signature = user_service.deposit_collateral(&user_id, request.into_inner()).await?;
    
    // Update user in database
    users::update_user_collateral(&pool, &user_id, amount as i64, true).await?;
    
    // Record transaction
    use crate::database::transactions;
    use crate::models::transaction::{UserTransaction, TransactionType, TransactionStatus};
    
    let transaction = UserTransaction {
        signature: signature.to_string(),
        user_id: user_id.clone(),
        transaction_type: TransactionType::Deposit,
        amount,
        fee: 0,  // Assume no fee for deposit
        status: TransactionStatus::Success,
        data: None,
        timestamp: chrono::Utc::now(),
        slot: None,
        block_time: None,
    };
    
    transactions::insert_transaction(&pool, &transaction).await?;
    
    // Retrieve updated user data
    let user = users::get_user(&pool, &user_id).await?;
    
    let response = CollateralResponse {
        user,
        amount,
        transaction_type: "deposit".to_string(),
        signature: signature.to_string(),
    };
    
    Ok(HttpResponse::Ok().json(response))
}

/// Withdraw collateral
#[post("/users/{user_id}/withdraw")]
pub async fn withdraw_collateral(
    pool: web::Data<PgPool>,
    path: web::Path<String>,
    request: web::Json<WithdrawCollateralRequest>,
) -> Result<impl Responder, ApiError> {
    let user_id = path.into_inner();
    let amount = request.amount; // Extract amount before moving request
    info!("Withdrawing {} collateral for user: {}", amount, user_id);
    
    // Check user has sufficient collateral
    let user = users::get_user(&pool, &user_id).await?;
    if user.collateral_balance < amount {
        return Err(ApiError::InvalidRequest(
            format!("Insufficient balance: user has {} but trying to withdraw {}", 
                   user.collateral_balance, amount)
        ));
    }
    
    // Perform withdrawal on-chain
    let user_service = get_user_service();
    let signature = user_service.withdraw_collateral(&user_id, request.into_inner()).await?;
    
    // Update user in database
    users::update_user_collateral(&pool, &user_id, amount as i64, false).await?;
    
    // Record transaction
    use crate::database::transactions;
    use crate::models::transaction::{UserTransaction, TransactionType, TransactionStatus};
    
    let transaction = UserTransaction {
        signature: signature.to_string(),
        user_id: user_id.clone(),
        transaction_type: TransactionType::Withdrawal,
        amount,
        fee: 0,  // Assume no fee for withdrawal
        status: TransactionStatus::Success,
        data: None,
        timestamp: chrono::Utc::now(),
        slot: None,
        block_time: None,
    };
    
    transactions::insert_transaction(&pool, &transaction).await?;
    
    // Retrieve updated user data
    let user = users::get_user(&pool, &user_id).await?;
    
    let response = CollateralResponse {
        user,
        amount,
        transaction_type: "withdraw".to_string(),
        signature: signature.to_string(),
    };
    
    Ok(HttpResponse::Ok().json(response))
}

/// Get top traders by volume
#[get("/users/top/volume")]
pub async fn get_top_traders_by_volume(
    pool: web::Data<PgPool>,
    query: web::Query<TopQuery>,
) -> Result<impl Responder, ApiError> {
    let limit = query.limit.unwrap_or(10).min(100);
    info!("Getting top traders by volume (limit: {})", limit);
    
    // Retrieve top users from the database
    let top_users = users::get_top_users_by_volume(&pool, limit).await?;
    
    let leaderboard: Vec<LeaderboardEntry> = top_users
        .into_iter()
        .map(|(user_id, volume)| LeaderboardEntry {
            user_id,
            value: volume as f64,
        })
        .collect();
    
    let response = LeaderboardResponse {
        metric: "volume".to_string(),
        entries: leaderboard,
    };
    
    Ok(HttpResponse::Ok().json(response))
}

/// Get top traders by profit
#[get("/users/top/profit")]
pub async fn get_top_traders_by_profit(
    pool: web::Data<PgPool>,
    query: web::Query<TopQuery>,
) -> Result<impl Responder, ApiError> {
    let limit = query.limit.unwrap_or(10).min(100);
    info!("Getting top traders by profit (limit: {})", limit);
    
    // Retrieve top users from the database
    let top_users = users::get_top_users_by_profit(&pool, limit).await?;
    
    let leaderboard: Vec<LeaderboardEntry> = top_users
        .into_iter()
        .map(|(user_id, profit)| LeaderboardEntry {
            user_id,
            value: profit as f64,
        })
        .collect();
    
    let response = LeaderboardResponse {
        metric: "profit".to_string(),
        entries: leaderboard,
    };
    
    Ok(HttpResponse::Ok().json(response))
}

/// Get top traders by win rate
#[get("/users/top/win-rate")]
pub async fn get_top_traders_by_win_rate(
    pool: web::Data<PgPool>,
    query: web::Query<TopQuery>,
) -> Result<impl Responder, ApiError> {
    let limit = query.limit.unwrap_or(10).min(100);
    info!("Getting top traders by win rate (limit: {})", limit);
    
    // Retrieve top users from the database
    let top_users = users::get_top_users_by_win_rate(&pool, limit).await?;
    
    let leaderboard: Vec<LeaderboardEntry> = top_users
        .into_iter()
        .map(|(user_id, win_rate)| LeaderboardEntry {
            user_id,
            value: win_rate,
        })
        .collect();
    
    let response = LeaderboardResponse {
        metric: "win_rate".to_string(),
        entries: leaderboard,
    };
    
    Ok(HttpResponse::Ok().json(response))
}

/// Response for user operations
#[derive(Debug, Serialize)]
pub struct UserResponse {
    pub user: User,
    pub signature: String,
}

/// Response for collateral operations
#[derive(Debug, Serialize)]
pub struct CollateralResponse {
    pub user: User,
    pub amount: u64,
    pub transaction_type: String,
    pub signature: String,
}

/// Response for transaction list
#[derive(Debug, Serialize)]
pub struct TransactionListResponse {
    pub transactions: Vec<crate::models::transaction::UserTransaction>,
    pub total: usize,
    pub has_more: bool,
}

/// Response for leaderboard
#[derive(Debug, Serialize)]
pub struct LeaderboardResponse {
    pub metric: String,
    pub entries: Vec<LeaderboardEntry>,
}

/// Leaderboard entry
#[derive(Debug, Serialize)]
pub struct LeaderboardEntry {
    pub user_id: String,
    pub value: f64,
}

/// Query parameters for transactions
#[derive(Debug, Deserialize)]
pub struct TransactionQuery {
    pub limit: Option<usize>,
    pub offset: Option<usize>,
}

/// Query parameters for top users
#[derive(Debug, Deserialize)]
pub struct TopQuery {
    pub limit: Option<usize>,
}

/// Request for creating a user
#[derive(Debug, Deserialize)]
pub struct CreateUserRequest {
    pub pubkey: String,
}

/// Register user routes
pub fn register(cfg: &mut web::ServiceConfig) {
    cfg.service(get_user)
       .service(get_user_stats)
       .service(get_user_transactions)
       .service(create_user)
       .service(deposit_collateral)
       .service(withdraw_collateral)
       .service(get_top_traders_by_volume)
       .service(get_top_traders_by_profit)
       .service(get_top_traders_by_win_rate);
} 