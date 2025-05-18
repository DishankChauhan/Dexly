use crate::config::CONFIG;
use crate::models::error::ApiError;
use deadpool_postgres::{Config, Pool, Runtime};
use log::{info, error};
use sqlx::postgres::{PgPoolOptions};
use std::time::Duration;
use tokio::sync::OnceCell;
use actix_web::web::Data;
use sqlx::{PgPool, Postgres, Transaction};
use tokio_postgres::NoTls;
use std::sync::Arc;

pub mod schema;
pub mod events;
pub mod positions;
pub mod orders;
pub mod markets;
pub mod users;
pub mod transactions;

static DB_POOL: OnceCell<PgPool> = OnceCell::const_new();

// Pool singleton instance
static mut PG_POOL: Option<PgPool> = None;

/// Initialize the database connection pool
pub async fn init_db_pool() -> Result<PgPool, sqlx::Error> {
    let pool = DB_POOL.get_or_init(|| async {
        info!("Initializing database connection pool");
        
        let pool = PgPoolOptions::new()
            .max_connections(10)
            .connect_timeout(Duration::from_secs(3))
            .connect(&CONFIG.database_url)
            .await
            .expect("Failed to create database pool");
        
        info!("Database connection pool initialized");
        pool
    }).await;
    
    Ok(pool.clone())
}

/// Get a reference to the database pool
pub async fn get_pool() -> Result<PgPool, ApiError> {
    unsafe {
        if PG_POOL.is_none() {
            // Initialize the pool
            let pool = PgPool::connect(&CONFIG.database_url)
                .await
                .map_err(|e| ApiError::DatabaseError(format!("Failed to create database pool: {}", e)))?;
            
            PG_POOL = Some(pool);
        }
        
        Ok(PG_POOL.as_ref().unwrap().clone())
    }
}

/// Initialize the database schema
pub async fn init_database_schema() -> Result<(), ApiError> {
    info!("Initializing database schema");
    
    let pool = get_pool().await?;
    
    // Create schema tables
    schema::create_tables(&pool).await
        .map_err(|e| ApiError::DatabaseError(format!("Failed to create database schema: {}", e)))?;
    
    info!("Database schema initialized successfully");
    Ok(())
}

/// Start a database transaction
pub async fn begin_transaction() -> Result<sqlx::Transaction<'static, sqlx::Postgres>, ApiError> {
    let pool = get_pool().await?;
    
    match pool.begin().await {
        Ok(tx) => {
            info!("Started database transaction");
            Ok(tx)
        },
        Err(e) => {
            error!("Failed to start database transaction: {}", e);
            Err(ApiError::DatabaseError(format!("Failed to start transaction: {}", e)))
        }
    }
}

/// Execute operations in a transaction with automatic commit/rollback
pub async fn transaction<F, R>(operation: F) -> Result<R, ApiError>
where
    F: for<'a> FnOnce(&'a mut sqlx::Transaction<'_, sqlx::Postgres>) -> futures::future::BoxFuture<'a, Result<R, ApiError>>,
{
    let pool = get_pool().await?;
    let mut tx = pool.begin().await?;
    
    let result = match operation(&mut tx).await {
        Ok(result) => result,
        Err(e) => {
            // Attempt to roll back the transaction on error
            if let Err(rollback_err) = tx.rollback().await {
                error!("Failed to roll back transaction: {}", rollback_err);
            }
            return Err(e);
        }
    };
    
    // Attempt to commit the transaction
    match tx.commit().await {
        Ok(_) => Ok(result),
        Err(e) => Err(ApiError::DatabaseError(format!("Transaction commit failed: {}", e)))
    }
}

/// Execute database operations with retry logic for transient failures
pub async fn with_retry<F, R>(operation: F, max_retries: usize) -> Result<R, ApiError>
where
    F: Fn() -> futures::future::BoxFuture<'static, Result<R, ApiError>> + Send + Sync,
{
    let mut retries = 0;
    
    loop {
        match operation().await {
            Ok(result) => return Ok(result),
            Err(err) => {
                // Determine if error is retryable
                let is_retryable = match &err {
                    ApiError::DatabaseError(msg) => {
                        // Check for common transient database errors
                        msg.contains("deadlock detected") || 
                        msg.contains("connection reset") ||
                        msg.contains("connection timed out") ||
                        msg.contains("too many clients") ||
                        msg.contains("serialization failure")
                    },
                    _ => false
                };
                
                if is_retryable && retries < max_retries {
                    retries += 1;
                    let backoff_ms = 2u64.pow(retries as u32) * 100; // Exponential backoff
                    
                    info!("Retryable database error, retrying ({}/{}) after {}ms: {}", 
                         retries, max_retries, backoff_ms, err);
                    
                    tokio::time::sleep(Duration::from_millis(backoff_ms)).await;
                    continue;
                }
                
                return Err(err);
            }
        }
    }
}

/// Execute a query that requires atomicity with another operation
pub async fn atomic_batch<F, R>(operations: F) -> Result<R, ApiError>
where
    F: for<'a> FnOnce(&'a mut sqlx::Transaction<'_, sqlx::Postgres>) -> futures::future::BoxFuture<'a, Result<R, ApiError>>,
{
    // Get pool directly to avoid lifetime issues
    let pool = get_pool().await?;
    transact(&pool, operations).await
}

/// Execute operation with transaction
pub async fn transact<F, R>(pool: &PgPool, operation: F) -> Result<R, ApiError>
where
    F: for<'a> FnOnce(&'a mut sqlx::Transaction<'_, sqlx::Postgres>) -> futures::future::BoxFuture<'a, Result<R, ApiError>>,
{
    let mut tx = pool.begin().await
        .map_err(|e| ApiError::DatabaseError(format!("Failed to begin transaction: {}", e)))?;
    
    let result = match operation(&mut tx).await {
        Ok(result) => result,
        Err(e) => {
            // Attempt to roll back the transaction on error
            if let Err(rollback_err) = tx.rollback().await {
                error!("Failed to roll back transaction: {}", rollback_err);
            }
            return Err(e);
        }
    };
    
    // Commit the transaction
    tx.commit().await
        .map_err(|e| ApiError::DatabaseError(format!("Failed to commit transaction: {}", e)))?;
    
    Ok(result)
} 