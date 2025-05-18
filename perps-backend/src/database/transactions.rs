use crate::models::error::ApiError;
use crate::models::transaction::{UserTransaction as Transaction, TransactionType, TransactionStatus};
use chrono::{DateTime, Utc};
use log::{info, error};
use sqlx::{PgPool, postgres::PgQueryResult, Postgres};
use anchor_client::solana_sdk::signature::Signature;
use std::str::FromStr;
use std::time::Duration;

/// Insert a new transaction record into the database
pub async fn insert_transaction(
    pool: &PgPool,
    transaction: &Transaction,
) -> Result<PgQueryResult, ApiError> {
    info!("Inserting transaction {} into database", transaction.signature);
    
    let transaction_type = serde_json::to_string(&transaction.transaction_type)?;
    let status = serde_json::to_string(&transaction.status)?;
    
    let result = sqlx::query(
        "INSERT INTO transactions (
            signature, user_id, transaction_type, amount, fee, status, 
            data, timestamp
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)"
    )
    .bind(&transaction.signature)
    .bind(&transaction.user_id)
    .bind(transaction_type)
    .bind(transaction.amount as i64)
    .bind(transaction.fee as i64)
    .bind(status)
    .bind(&transaction.data)
    .bind(Utc::now())
    .execute(pool)
    .await?;
    
    Ok(result)
}

/// Insert a transaction within an existing database transaction
pub async fn insert_transaction_in_tx(
    tx: &mut sqlx::Transaction<'_, Postgres>,
    transaction: &Transaction,
) -> Result<(), ApiError> {
    info!("Inserting transaction {} in active database transaction", transaction.signature);
    
    let transaction_type = serde_json::to_string(&transaction.transaction_type)?;
    let status = serde_json::to_string(&transaction.status)?;
    
    sqlx::query(
        "INSERT INTO transactions (
            signature, user_id, transaction_type, amount, fee, status, 
            data, timestamp
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)"
    )
    .bind(&transaction.signature)
    .bind(&transaction.user_id)
    .bind(transaction_type)
    .bind(transaction.amount as i64)
    .bind(transaction.fee as i64)
    .bind(status)
    .bind(&transaction.data)
    .bind(Utc::now())
    .execute(tx)
    .await?;
    
    Ok(())
}

/// Update transaction status
pub async fn update_transaction_status(
    pool: &PgPool,
    signature: &str,
    status: TransactionStatus,
    block_time: Option<i64>,
    slot: Option<u64>,
) -> Result<PgQueryResult, ApiError> {
    info!("Updating status for transaction {} to {:?}", signature, status);
    
    let status_str = serde_json::to_string(&status)?;
    
    let result = sqlx::query(
        "UPDATE transactions SET 
            status = $1,
            block_time = $2,
            slot = $3
         WHERE signature = $4"
    )
    .bind(status_str)
    .bind(block_time)
    .bind(slot.map(|s| s as i64))
    .bind(signature)
    .execute(pool)
    .await?;
    
    Ok(result)
}

/// Get a transaction by signature
pub async fn get_transaction(
    pool: &PgPool,
    signature: &str,
) -> Result<Transaction, ApiError> {
    info!("Getting transaction {} from database", signature);
    
    let record = sqlx::query!(
        r#"
        SELECT 
            signature, user_id, transaction_type, amount, fee, status, 
            timestamp, data
        FROM transactions
        WHERE signature = $1
        "#,
        signature
    )
    .fetch_one(pool)
    .await?;
    
    let transaction = Transaction {
        signature: record.signature,
        user_id: record.user_id,
        transaction_type: serde_json::from_str(&record.transaction_type)?,
        amount: record.amount as u64,
        fee: record.fee.unwrap_or(0) as u64,
        status: serde_json::from_str(&record.status)?,
        data: record.data,
        timestamp: record.timestamp.unwrap_or_else(|| Utc::now()),
        slot: None,
        block_time: None,
    };
    
    Ok(transaction)
}

/// Get all transactions for a user with pagination
pub async fn get_user_transactions(
    pool: &PgPool,
    user_id: &str,
    limit: usize,
    offset: usize,
) -> Result<Vec<Transaction>, ApiError> {
    info!("Getting transactions for user {} (limit: {}, offset: {})", user_id, limit, offset);
    
    let records = sqlx::query!(
        r#"
        SELECT 
            signature, user_id, transaction_type, amount, fee, status, 
            timestamp, data
        FROM transactions
        WHERE user_id = $1
        ORDER BY timestamp DESC
        LIMIT $2
        OFFSET $3
        "#,
        user_id,
        limit as i64,
        offset as i64
    )
    .fetch_all(pool)
    .await?;
    
    let transactions = records.into_iter()
        .map(|record| Transaction {
            signature: record.signature,
            user_id: record.user_id,
            transaction_type: serde_json::from_str(&record.transaction_type).unwrap_or(TransactionType::Deposit),
            amount: record.amount as u64,
            fee: record.fee.unwrap_or(0) as u64,
            status: serde_json::from_str(&record.status).unwrap_or(TransactionStatus::Pending),
            data: record.data,
            timestamp: record.timestamp.unwrap_or_else(|| Utc::now()),
            slot: None,
            block_time: None,
        })
        .collect();
    
    Ok(transactions)
}

/// Get all deposits for a user
pub async fn get_user_deposits(
    pool: &PgPool,
    user_id: &str,
    limit: usize,
) -> Result<Vec<Transaction>, ApiError> {
    info!("Getting deposits for user {} (limit: {})", user_id, limit);
    
    let records = sqlx::query!(
        r#"
        SELECT 
            signature, user_id, transaction_type, amount, fee, status, 
            timestamp, data
        FROM transactions
        WHERE user_id = $1 AND transaction_type = 'Deposit'
        ORDER BY timestamp DESC
        LIMIT $2
        "#,
        user_id,
        limit as i64
    )
    .fetch_all(pool)
    .await?;
    
    let transactions = records.into_iter()
        .map(|record| Transaction {
            signature: record.signature,
            user_id: record.user_id,
            transaction_type: TransactionType::Deposit,
            amount: record.amount as u64,
            fee: record.fee.unwrap_or(0) as u64,
            status: serde_json::from_str(&record.status).unwrap_or(TransactionStatus::Pending),
            data: record.data,
            timestamp: record.timestamp.unwrap_or_else(|| Utc::now()),
            slot: None,
            block_time: None,
        })
        .collect();
    
    Ok(transactions)
}

/// Get all withdrawals for a user
pub async fn get_user_withdrawals(
    pool: &PgPool,
    user_id: &str,
    limit: usize,
) -> Result<Vec<Transaction>, ApiError> {
    info!("Getting withdrawals for user {} (limit: {})", user_id, limit);
    
    let records = sqlx::query!(
        r#"
        SELECT 
            signature, user_id, transaction_type, amount, fee, status, 
            timestamp, data
        FROM transactions
        WHERE user_id = $1 AND transaction_type = 'Withdrawal'
        ORDER BY timestamp DESC
        LIMIT $2
        "#,
        user_id,
        limit as i64
    )
    .fetch_all(pool)
    .await?;
    
    let transactions = records.into_iter()
        .map(|record| Transaction {
            signature: record.signature,
            user_id: record.user_id,
            transaction_type: TransactionType::Withdrawal,
            amount: record.amount as u64,
            fee: record.fee.unwrap_or(0) as u64,
            status: serde_json::from_str(&record.status).unwrap_or(TransactionStatus::Pending),
            data: record.data,
            timestamp: record.timestamp.unwrap_or_else(|| Utc::now()),
            slot: None,
            block_time: None,
        })
        .collect();
    
    Ok(transactions)
}

/// Get transactions by type for a user
pub async fn get_user_transactions_by_type(
    pool: &PgPool,
    user_id: &str,
    transaction_type: TransactionType,
    limit: usize,
) -> Result<Vec<Transaction>, ApiError> {
    info!("Getting transactions of type {:?} for user {}", transaction_type, user_id);
    
    let transaction_type_str = serde_json::to_string(&transaction_type)?;
    
    let records = sqlx::query!(
        r#"
        SELECT 
            signature, user_id, transaction_type, amount, fee, status, 
            timestamp, data
        FROM transactions
        WHERE user_id = $1 AND transaction_type = $2
        ORDER BY timestamp DESC
        LIMIT $3
        "#,
        user_id,
        transaction_type_str,
        limit as i64
    )
    .fetch_all(pool)
    .await?;
    
    let transactions = records.into_iter()
        .map(|record| Transaction {
            signature: record.signature,
            user_id: record.user_id,
            transaction_type: serde_json::from_str(&record.transaction_type).unwrap_or(transaction_type.clone()),
            amount: record.amount as u64,
            fee: record.fee.unwrap_or(0) as u64,
            status: serde_json::from_str(&record.status).unwrap_or(TransactionStatus::Pending),
            data: record.data,
            timestamp: record.timestamp.unwrap_or_else(|| Utc::now()),
            slot: None,
            block_time: None,
        })
        .collect();
    
    Ok(transactions)
}

/// Get pending transactions
pub async fn get_pending_transactions(
    pool: &PgPool,
    limit: usize,
) -> Result<Vec<Transaction>, ApiError> {
    info!("Getting pending transactions");
    
    let status_str = serde_json::to_string(&TransactionStatus::Pending)?;
    
    let records = sqlx::query!(
        r#"
        SELECT 
            signature, user_id, transaction_type, amount, fee, status, 
            timestamp, data
        FROM transactions
        WHERE status = $1
        ORDER BY timestamp ASC
        LIMIT $2
        "#,
        status_str,
        limit as i64
    )
    .fetch_all(pool)
    .await?;
    
    let transactions = records.into_iter()
        .map(|record| Transaction {
            signature: record.signature,
            user_id: record.user_id,
            transaction_type: serde_json::from_str(&record.transaction_type).unwrap_or(TransactionType::Deposit),
            amount: record.amount as u64,
            fee: record.fee.unwrap_or(0) as u64,
            status: serde_json::from_str(&record.status).unwrap_or(TransactionStatus::Pending),
            data: record.data,
            timestamp: record.timestamp.unwrap_or_else(|| Utc::now()),
            slot: None,
            block_time: None,
        })
        .collect();
    
    Ok(transactions)
}

/// Clean up old pending transactions (mark as failed after a timeout)
pub async fn clean_old_pending_transactions(
    pool: &PgPool,
    timeout_minutes: i64,
) -> Result<u64, ApiError> {
    info!("Cleaning up old pending transactions (timeout: {} minutes)", timeout_minutes);
    
    let pending_status = serde_json::to_string(&TransactionStatus::Pending)?;
    let failed_status = serde_json::to_string(&TransactionStatus::Failed)?;
    
    let now = Utc::now();
    let cutoff = now - chrono::Duration::minutes(timeout_minutes);
    
    let result = sqlx::query(
        "UPDATE transactions SET 
            status = $1
         WHERE status = $2 
         AND timestamp < $3"
    )
    .bind(failed_status)
    .bind(pending_status)
    .bind(cutoff)
    .execute(pool)
    .await?;
    
    Ok(result.rows_affected())
}

/// Execute database operation with retry support
async fn with_retry<F, T>(
    pool: &PgPool,
    operation: F,
    max_retries: usize,
) -> Result<T, ApiError>
where
    F: for<'a> FnOnce(&'a mut sqlx::Transaction<'_, sqlx::Postgres>) -> futures::future::BoxFuture<'a, Result<T, ApiError>> + Clone,
{
    let mut attempts = 0;
    let mut last_error = None;
    
    while attempts <= max_retries {
        match crate::database::transact(pool, operation.clone()).await {
            Ok(result) => return Ok(result),
            Err(e) => {
                attempts += 1;
                last_error = Some(e);
                
                if attempts <= max_retries {
                    let backoff = std::time::Duration::from_millis(100 * (2_u64.pow(attempts as u32)));
                    tokio::time::sleep(backoff).await;
                }
            }
        }
    }
    
    Err(last_error.unwrap_or_else(|| ApiError::DatabaseError("Operation failed after all retries".to_string())))
} 