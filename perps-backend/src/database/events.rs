use crate::config::CONFIG;
use crate::models::error::ApiError;
use log::{info, error, warn, debug};
use serde::{Deserialize, Serialize};
use anchor_client::{
    solana_sdk::{
        pubkey::Pubkey,
        commitment_config::CommitmentConfig,
        signature::Signature,
    },
    solana_client::{
        rpc_client::RpcClient,
        rpc_config::{RpcProgramAccountsConfig, RpcAccountInfoConfig, RpcTransactionConfig},
        rpc_filter::{RpcFilterType, Memcmp, MemcmpEncodedBytes},
        pubsub_client::{PubsubClient, ProgramSubscription, LogsSubscription},
    },
};
use sqlx::{PgPool, postgres::PgQueryResult};
use std::{str::FromStr, sync::Arc, time::Duration};
use tokio::{sync::mpsc, time};
use futures::{StreamExt, stream::FuturesUnordered};

// Creating a simple struct to represent transaction status until we can fix the import
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct EncodedConfirmedTransactionWithStatusMeta {
    pub slot: u64,
    pub block_time: Option<i64>,
    pub transaction: EncodedTransaction,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct EncodedTransaction {
    pub signatures: Vec<String>,
    pub meta: Option<TransactionMeta>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TransactionMeta {
    pub log_messages: Option<Vec<String>>,
}

// Custom enum for UI account data
#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum UiAccountData {
    Binary(String, String),
    Json(serde_json::Value),
    LegacyBinary(String),
}

// Enum to specify transaction encoding
#[derive(Debug, Clone, Copy, Serialize, Deserialize)]
pub enum UiTransactionEncoding {
    Base58,
    Base64,
    Json,
    JsonParsed,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum TransactionStatus {
    Confirmed,
    Processed,
    Failed,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum EventType {
    PositionOpened,
    PositionClosed,
    PositionLiquidated,
    OrderPlaced,
    OrderFilled,
    OrderCancelled,
    UserCreated,
    CollateralDeposited,
    CollateralWithdrawn,
    FundingRateUpdated,
    MarketCreated,
    MarketUpdated,
    MarketPaused,
    ProtocolFeesUpdated,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct EventData {
    pub event_type: EventType,
    pub signature: Option<String>,
    pub user_id: Option<String>,
    pub market_id: Option<String>,
    pub position_id: Option<String>,
    pub order_id: Option<String>,
    pub data: Option<serde_json::Value>,
    pub created_at: chrono::DateTime<chrono::Utc>,
    pub slot: Option<u64>,
    pub block_time: Option<i64>,
}

/// Start the event indexer service
pub async fn start_event_indexer(pool: PgPool) -> Result<(), ApiError> {
    info!("Starting event indexer service");
    
    // Create channels for event processing
    let (tx, mut rx) = mpsc::channel::<EventData>(100);
    
    // Spawn event processor task
    let processor_pool = pool.clone();
    tokio::spawn(async move {
        info!("Event processor started");
        
        while let Some(event) = rx.recv().await {
            match store_event(&processor_pool, &event).await {
                Ok(_) => info!("Event stored: {:?}", event.event_type),
                Err(e) => error!("Failed to store event: {}", e),
            }
        }
        
        warn!("Event processor stopped");
    });
    
    // Spawn event subscription tasks
    if let Some(ws_url) = &CONFIG.ws_url {
        // Spawn WebSocket subscription task for live events
        let ws_tx = tx.clone();
        tokio::spawn(async move {
            // Continuously attempt to reconnect WebSocket if it fails
            loop {
                match subscribe_to_program_events().await {
                    Ok(_) => break, // This should never happen as the function is designed to run indefinitely
                    Err(e) => {
                        error!("WebSocket subscription error: {}", e);
                        // Wait before reconnecting
                        time::sleep(Duration::from_secs(5)).await;
                    }
                }
            }
        });
    } else {
        warn!("No WebSocket URL provided, live event indexing disabled");
    }
    
    // Spawn task to periodically scan for missed events
    let scan_tx = tx.clone();
    let scan_pool = pool.clone();
    tokio::spawn(async move {
        // Initial delay to allow the system to start up
        time::sleep(Duration::from_secs(10)).await;
        
        info!("Starting periodic event scanner");
        
        // Run periodic scanner every 5 minutes
        let mut interval = time::interval(Duration::from_secs(300));
        loop {
            interval.tick().await;
            
            match scan_for_missed_events(&scan_pool, scan_tx.clone()).await {
                Ok(_) => info!("Completed scan for missed events"),
                Err(e) => error!("Failed to scan for missed events: {}", e),
            }
        }
    });
    
    Ok(())
}

/// Store an event in the database
pub async fn store_event(pool: &PgPool, event: &EventData) -> Result<PgQueryResult, ApiError> {
    let event_type = serde_json::to_string(&event.event_type)?;
    
    let result = sqlx::query(
        "INSERT INTO events (
            event_type, signature, user_id, market_id, position_id, order_id, 
            data, created_at, slot, block_time
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)"
    )
    .bind(event_type)
    .bind(&event.signature)
    .bind(&event.user_id)
    .bind(&event.market_id)
    .bind(&event.position_id)
    .bind(&event.order_id)
    .bind(&event.data)
    .bind(event.created_at)
    .bind(event.slot.map(|s| s as i64))
    .bind(event.block_time)
    .execute(pool)
    .await?;
    
    Ok(result)
}

/// Subscribe to events from the program and update database
pub async fn subscribe_to_program_events() -> Result<(), ApiError> {
    // Log start of subscription
    info!("Starting program event subscription");
    
    // Create a channel for event processing
    let (tx, mut rx) = mpsc::channel::<EventData>(100);
    let pool = crate::database::get_pool().await?;
    
    // Get the configured program ID
    let program_id = Pubkey::from_str(&CONFIG.program_id)
        .map_err(|_| ApiError::InvalidRequest("Invalid program ID".to_string()))?;
    
    // NOTE: WebSocket subscriptions are currently disabled due to compatibility issues
    // In a production setup, we would initialize PubsubClient and subscribe to logs/accounts
    info!("WebSocket subscriptions are disabled in this version");

    /*
    // Create a pubsub client using the WebSocket URL
    let pubsub_client = PubsubClient::new(CONFIG.ws_url.as_ref().unwrap())
        .map_err(|e| ApiError::NetworkError(format!("Failed to create WebSocket client: {}", e)))?;
        
    // Subscribe to program logs and account updates
    // This is commented out due to compatibility issues with our Solana client version
    */
    
    // Populate the event processor channel
    let processor_pool = pool.clone(); // Clone the pool for the event processor
    let event_processor = tokio::spawn(async move {
        info!("Starting event processor");
        
        while let Some(event) = rx.recv().await {
            match process_event(&processor_pool, &event).await {
                Ok(_) => {
                    info!("Processed event: {:?}", event.event_type);
                    match store_event(&processor_pool, &event).await {
                        Ok(_) => (),
                        Err(e) => error!("Failed to store event: {}", e),
                    }
                },
                Err(e) => error!("Failed to process event: {}", e),
            }
        }
        
        warn!("Event processor channel closed");
    });
    
    // Spawn task to periodically scan for missed events
    let scan_tx = tx.clone();
    let scan_pool = pool.clone(); // Clone the pool for the scanner
    tokio::spawn(async move {
        // Initial delay to allow the system to start up
        time::sleep(Duration::from_secs(10)).await;
        
        info!("Starting periodic event scanner");
        
        // Run periodic scanner every 1 minute instead of 5 minutes since we're not using WebSockets
        let mut interval = time::interval(Duration::from_secs(60));
        loop {
            interval.tick().await;
            
            match scan_for_missed_events(&scan_pool, scan_tx.clone()).await {
                Ok(_) => info!("Completed scan for missed events"),
                Err(e) => error!("Failed to scan for missed events: {}", e),
            }
        }
    });
    
    // This function is intended to run indefinitely, but we'll return OK so the caller knows we've set up successfully
    Ok(())
}

/// Process an event to update relevant database tables
async fn process_event(pool: &PgPool, event: &EventData) -> Result<(), ApiError> {
    match event.event_type {
        EventType::PositionOpened => {
            if let Some(position_id) = &event.position_id {
                if let Some(user_id) = &event.user_id {
                    // Update user's open positions count
                    crate::database::users::update_user_open_positions(pool, user_id, 1).await?;
                }
            }
        },
        EventType::PositionClosed => {
            if let Some(position_id) = &event.position_id {
                if let Some(user_id) = &event.user_id {
                    // Update user's open positions count
                    crate::database::users::update_user_open_positions(pool, user_id, -1).await?;
                    
                    // Get realized PnL from event data
                    if let Some(data) = &event.data {
                        if let Some(realized_pnl) = data.get("realized_pnl").and_then(|v| v.as_i64()) {
                            // Update user's realized PnL
                            crate::database::users::update_user_realized_pnl(pool, user_id, realized_pnl).await?;
                            
                            // Get trade stats
                            if let (Some(size), Some(price)) = (
                                data.get("size").and_then(|v| v.as_u64()),
                                data.get("exit_price").and_then(|v| v.as_u64()),
                            ) {
                                let volume = size.saturating_mul(price) / 1_000_000_000; // Adjust based on precision
                                let fees = volume.saturating_mul(5) / 10000; // 0.05% fee, adjust as needed
                                
                                // Update user's trade stats
                                crate::database::users::update_user_trade_stats(
                                    pool, 
                                    user_id, 
                                    volume, 
                                    fees, 
                                    realized_pnl > 0
                                ).await?;
                            }
                        }
                    }
                }
            }
        },
        EventType::PositionLiquidated => {
            if let Some(position_id) = &event.position_id {
                if let Some(user_id) = &event.user_id {
                    // Update user's open positions count
                    crate::database::users::update_user_open_positions(pool, user_id, -1).await?;
                    
                    // Update user's liquidation stats
                    crate::database::users::update_user_liquidation_stats(pool, user_id).await?;
                    
                    // Get realized PnL from event data
                    if let Some(data) = &event.data {
                        if let Some(realized_pnl) = data.get("realized_pnl").and_then(|v| v.as_i64()) {
                            // Update user's realized PnL
                            crate::database::users::update_user_realized_pnl(pool, user_id, realized_pnl).await?;
                        }
                    }
                }
            }
        },
        EventType::FundingRateUpdated => {
            if let Some(market_id) = &event.market_id {
                if let Some(data) = &event.data {
                    if let (Some(funding_rate), Some(mark_price), Some(index_price)) = (
                        data.get("funding_rate").and_then(|v| v.as_f64()),
                        data.get("mark_price").and_then(|v| v.as_u64()),
                        data.get("index_price").and_then(|v| v.as_u64()),
                    ) {
                        // Update funding rate history
                        crate::database::markets::update_funding_rate(
                            pool,
                            market_id,
                            funding_rate as i64,
                            mark_price,
                            index_price,
                        ).await?;
                    }
                }
            }
        },
        EventType::CollateralDeposited => {
            if let Some(user_id) = &event.user_id {
                if let Some(data) = &event.data {
                    if let Some(amount) = data.get("amount").and_then(|v| v.as_u64()) {
                        // Update user's collateral balance
                        crate::database::users::update_user_collateral(
                            pool,
                            user_id,
                            amount as i64,
                            true, // Addition
                        ).await?;
                    }
                }
            }
        },
        EventType::CollateralWithdrawn => {
            if let Some(user_id) = &event.user_id {
                if let Some(data) = &event.data {
                    if let Some(amount) = data.get("amount").and_then(|v| v.as_u64()) {
                        // Update user's collateral balance
                        crate::database::users::update_user_collateral(
                            pool,
                            user_id,
                            amount as i64,
                            false, // Subtraction
                        ).await?;
                    }
                }
            }
        },
        // Handle other event types as needed
        _ => {}, // No specific database updates needed for other event types
    }
    
    Ok(())
}

/// Scan for missed events by querying recent transactions
async fn scan_for_missed_events(pool: &PgPool, tx: mpsc::Sender<EventData>) -> Result<(), ApiError> {
    info!("Scanning for missed events");
    
    // Get last scanned signature from database
    let last_signature = get_last_scanned_signature(pool).await?;
    
    // Setup RPC client
    let rpc_client = anchor_client::solana_client::rpc_client::RpcClient::new(CONFIG.rpc_url.clone());
    
    // Get recent signatures for our program
    let program_id = Pubkey::from_str(&CONFIG.program_id)?;
    let signatures = match last_signature {
        Some(sig) => {
            rpc_client.get_signatures_for_address(&program_id)?
        },
        None => {
            rpc_client.get_signatures_for_address(&program_id)?
        }
    };
    
    // Process each signature
    for sig_info in signatures {
        let signature = sig_info.signature;
        let signature_obj = Signature::from_str(&signature)?;
        
        // Check if we've already processed this signature
        if is_signature_processed(pool, &signature).await? {
            continue;
        }
        
        // Get transaction details
        let tx_details = rpc_client.get_transaction_with_config(
            &signature_obj,
            anchor_client::solana_client::rpc_config::RpcTransactionConfig {
                encoding: None,
                commitment: Some(CommitmentConfig::confirmed()),
            },
        )?;
        
        // Create our internal transaction representation
        let meta = tx_details.transaction.meta.as_ref().ok_or_else(|| {
            ApiError::InternalError("Transaction metadata not available".to_string())
        })?;
        
        let internal_tx = EncodedConfirmedTransactionWithStatusMeta {
            slot: tx_details.slot,
            block_time: tx_details.block_time,
            transaction: EncodedTransaction {
                signatures: vec![signature.clone()],
                meta: Some(TransactionMeta {
                    log_messages: meta.log_messages.clone(),
                }),
            },
        };
        
        // Process transaction and extract events
        process_transaction_for_events(tx.clone(), &internal_tx, pool).await?;
    }
    
    Ok(())
}

/// Check if a signature has been processed already
async fn is_signature_processed(pool: &PgPool, signature: &str) -> Result<bool, ApiError> {
    let result = sqlx::query!(
        "SELECT COUNT(*) AS count FROM events WHERE signature = $1",
        signature
    )
    .fetch_one(pool)
    .await?;
    
    Ok(result.count.unwrap_or(0) > 0)
}

/// Get the last scanned signature from the database
async fn get_last_scanned_signature(pool: &PgPool) -> Result<Option<String>, ApiError> {
    let result = sqlx::query!(
        "SELECT signature FROM events 
         WHERE signature IS NOT NULL 
         ORDER BY created_at DESC 
         LIMIT 1"
    )
    .fetch_optional(pool)
    .await?;
    
    Ok(result.map(|r| r.signature).flatten())
}

/// Process a transaction and extract events
async fn process_transaction_for_events(
    tx: mpsc::Sender<EventData>,
    transaction: &EncodedConfirmedTransactionWithStatusMeta,
    pool: &PgPool,
) -> Result<(), ApiError> {
    // Extract metadata
    let meta = transaction.transaction.meta.as_ref().ok_or_else(|| {
        ApiError::InternalError("Transaction metadata not available".to_string())
    })?;
    
    // Extract log messages
    let log_messages = meta.log_messages.as_ref().ok_or_else(|| {
        ApiError::InternalError("Transaction log messages not available".to_string())
    })?;
    
    // Parse log messages to extract events
    for log in log_messages {
        // Skip non-program logs
        if !log.contains(&format!("Program {} invoke", CONFIG.program_id)) 
           && !log.contains("Program log:") {
            continue;
        }
        
        // Parse program logs to extract events
        if log.contains("Event:") {
            let event_str = log.split("Event:").nth(1).unwrap_or("").trim();
            
            // Parse and process different event types
            match event_str {
                "PositionOpened" => {
                    // Send position opened event
                    tx.send(EventData {
                        event_type: EventType::PositionOpened,
                        signature: Some(transaction.transaction.signatures[0].clone()),
                        user_id: extract_pubkey_from_log(&log, "user"),
                        market_id: extract_pubkey_from_log(&log, "market"),
                        position_id: extract_pubkey_from_log(&log, "position"),
                        order_id: None,
                        data: extract_event_data_from_log(&log),
                        created_at: chrono::Utc::now(),
                        slot: Some(transaction.slot),
                        block_time: transaction.block_time,
                    }).await.map_err(|e| {
                        ApiError::InternalError(format!("Failed to send event: {}", e))
                    })?;
                },
                "PositionClosed" => {
                    // Send position closed event
                    tx.send(EventData {
                        event_type: EventType::PositionClosed,
                        signature: Some(transaction.transaction.signatures[0].clone()),
                        user_id: extract_pubkey_from_log(&log, "user"),
                        market_id: extract_pubkey_from_log(&log, "market"),
                        position_id: extract_pubkey_from_log(&log, "position"),
                        order_id: None,
                        data: extract_event_data_from_log(&log),
                        created_at: chrono::Utc::now(),
                        slot: Some(transaction.slot),
                        block_time: transaction.block_time,
                    }).await.map_err(|e| {
                        ApiError::InternalError(format!("Failed to send event: {}", e))
                    })?;
                },
                "PositionLiquidated" => {
                    // Send position liquidated event
                    tx.send(EventData {
                        event_type: EventType::PositionLiquidated,
                        signature: Some(transaction.transaction.signatures[0].clone()),
                        user_id: extract_pubkey_from_log(&log, "user"),
                        market_id: extract_pubkey_from_log(&log, "market"),
                        position_id: extract_pubkey_from_log(&log, "position"),
                        order_id: None,
                        data: extract_event_data_from_log(&log),
                        created_at: chrono::Utc::now(),
                        slot: Some(transaction.slot),
                        block_time: transaction.block_time,
                    }).await.map_err(|e| {
                        ApiError::InternalError(format!("Failed to send event: {}", e))
                    })?;
                },
                "OrderPlaced" => {
                    // Send order placed event
                    tx.send(EventData {
                        event_type: EventType::OrderPlaced,
                        signature: Some(transaction.transaction.signatures[0].clone()),
                        user_id: extract_pubkey_from_log(&log, "user"),
                        market_id: extract_pubkey_from_log(&log, "market"),
                        position_id: None,
                        order_id: extract_pubkey_from_log(&log, "order"),
                        data: extract_event_data_from_log(&log),
                        created_at: chrono::Utc::now(),
                        slot: Some(transaction.slot),
                        block_time: transaction.block_time,
                    }).await.map_err(|e| {
                        ApiError::InternalError(format!("Failed to send event: {}", e))
                    })?;
                },
                "OrderFilled" => {
                    // Send order filled event
                    tx.send(EventData {
                        event_type: EventType::OrderFilled,
                        signature: Some(transaction.transaction.signatures[0].clone()),
                        user_id: extract_pubkey_from_log(&log, "user"),
                        market_id: extract_pubkey_from_log(&log, "market"),
                        position_id: extract_pubkey_from_log(&log, "position"),
                        order_id: extract_pubkey_from_log(&log, "order"),
                        data: extract_event_data_from_log(&log),
                        created_at: chrono::Utc::now(),
                        slot: Some(transaction.slot),
                        block_time: transaction.block_time,
                    }).await.map_err(|e| {
                        ApiError::InternalError(format!("Failed to send event: {}", e))
                    })?;
                },
                "OrderCancelled" => {
                    // Send order cancelled event
                    tx.send(EventData {
                        event_type: EventType::OrderCancelled,
                        signature: Some(transaction.transaction.signatures[0].clone()),
                        user_id: extract_pubkey_from_log(&log, "user"),
                        market_id: extract_pubkey_from_log(&log, "market"),
                        position_id: None,
                        order_id: extract_pubkey_from_log(&log, "order"),
                        data: extract_event_data_from_log(&log),
                        created_at: chrono::Utc::now(),
                        slot: Some(transaction.slot),
                        block_time: transaction.block_time,
                    }).await.map_err(|e| {
                        ApiError::InternalError(format!("Failed to send event: {}", e))
                    })?;
                },
                "UserCreated" => {
                    // Send user created event
                    tx.send(EventData {
                        event_type: EventType::UserCreated,
                        signature: Some(transaction.transaction.signatures[0].clone()),
                        user_id: extract_pubkey_from_log(&log, "user"),
                        market_id: None,
                        position_id: None,
                        order_id: None,
                        data: extract_event_data_from_log(&log),
                        created_at: chrono::Utc::now(),
                        slot: Some(transaction.slot),
                        block_time: transaction.block_time,
                    }).await.map_err(|e| {
                        ApiError::InternalError(format!("Failed to send event: {}", e))
                    })?;
                },
                "CollateralDeposited" => {
                    // Send collateral deposited event
                    tx.send(EventData {
                        event_type: EventType::CollateralDeposited,
                        signature: Some(transaction.transaction.signatures[0].clone()),
                        user_id: extract_pubkey_from_log(&log, "user"),
                        market_id: None,
                        position_id: None,
                        order_id: None,
                        data: extract_event_data_from_log(&log),
                        created_at: chrono::Utc::now(),
                        slot: Some(transaction.slot),
                        block_time: transaction.block_time,
                    }).await.map_err(|e| {
                        ApiError::InternalError(format!("Failed to send event: {}", e))
                    })?;
                },
                "CollateralWithdrawn" => {
                    // Send collateral withdrawn event
                    tx.send(EventData {
                        event_type: EventType::CollateralWithdrawn,
                        signature: Some(transaction.transaction.signatures[0].clone()),
                        user_id: extract_pubkey_from_log(&log, "user"),
                        market_id: None,
                        position_id: None,
                        order_id: None,
                        data: extract_event_data_from_log(&log),
                        created_at: chrono::Utc::now(),
                        slot: Some(transaction.slot),
                        block_time: transaction.block_time,
                    }).await.map_err(|e| {
                        ApiError::InternalError(format!("Failed to send event: {}", e))
                    })?;
                },
                "FundingRateUpdated" => {
                    // Send funding rate updated event
                    tx.send(EventData {
                        event_type: EventType::FundingRateUpdated,
                        signature: Some(transaction.transaction.signatures[0].clone()),
                        user_id: None,
                        market_id: extract_pubkey_from_log(&log, "market"),
                        position_id: None,
                        order_id: None,
                        data: extract_event_data_from_log(&log),
                        created_at: chrono::Utc::now(),
                        slot: Some(transaction.slot),
                        block_time: transaction.block_time,
                    }).await.map_err(|e| {
                        ApiError::InternalError(format!("Failed to send event: {}", e))
                    })?;
                },
                "MarketCreated" => {
                    // Send market created event
                    tx.send(EventData {
                        event_type: EventType::MarketCreated,
                        signature: Some(transaction.transaction.signatures[0].clone()),
                        user_id: extract_pubkey_from_log(&log, "admin"),
                        market_id: extract_pubkey_from_log(&log, "market"),
                        position_id: None,
                        order_id: None,
                        data: extract_event_data_from_log(&log),
                        created_at: chrono::Utc::now(),
                        slot: Some(transaction.slot),
                        block_time: transaction.block_time,
                    }).await.map_err(|e| {
                        ApiError::InternalError(format!("Failed to send event: {}", e))
                    })?;
                },
                "MarketUpdated" => {
                    // Send market updated event
                    tx.send(EventData {
                        event_type: EventType::MarketUpdated,
                        signature: Some(transaction.transaction.signatures[0].clone()),
                        user_id: extract_pubkey_from_log(&log, "admin"),
                        market_id: extract_pubkey_from_log(&log, "market"),
                        position_id: None,
                        order_id: None,
                        data: extract_event_data_from_log(&log),
                        created_at: chrono::Utc::now(),
                        slot: Some(transaction.slot),
                        block_time: transaction.block_time,
                    }).await.map_err(|e| {
                        ApiError::InternalError(format!("Failed to send event: {}", e))
                    })?;
                },
                "MarketPaused" => {
                    // Send market paused event
                    tx.send(EventData {
                        event_type: EventType::MarketPaused,
                        signature: Some(transaction.transaction.signatures[0].clone()),
                        user_id: extract_pubkey_from_log(&log, "admin"),
                        market_id: extract_pubkey_from_log(&log, "market"),
                        position_id: None,
                        order_id: None,
                        data: extract_event_data_from_log(&log),
                        created_at: chrono::Utc::now(),
                        slot: Some(transaction.slot),
                        block_time: transaction.block_time,
                    }).await.map_err(|e| {
                        ApiError::InternalError(format!("Failed to send event: {}", e))
                    })?;
                },
                "ProtocolFeesUpdated" => {
                    // Send protocol fees updated event
                    tx.send(EventData {
                        event_type: EventType::ProtocolFeesUpdated,
                        signature: Some(transaction.transaction.signatures[0].clone()),
                        user_id: extract_pubkey_from_log(&log, "admin"),
                        market_id: None,
                        position_id: None,
                        order_id: None,
                        data: extract_event_data_from_log(&log),
                        created_at: chrono::Utc::now(),
                        slot: Some(transaction.slot),
                        block_time: transaction.block_time,
                    }).await.map_err(|e| {
                        ApiError::InternalError(format!("Failed to send event: {}", e))
                    })?;
                },
                _ => {
                    // Unknown event type
                    warn!("Unknown event type: {}", event_str);
                }
            }
        }
    }
    
    Ok(())
}

/// Helper function to extract pubkey from log message
fn extract_pubkey_from_log(log: &str, key_name: &str) -> Option<String> {
    if let Some(start_idx) = log.find(&format!("{}:", key_name)) {
        let start = start_idx + key_name.len() + 1;
        let end = log[start..].find(' ').map_or(log.len(), |i| start + i);
        let pubkey_str = log[start..end].trim();
        
        if !pubkey_str.is_empty() {
            return Some(pubkey_str.to_string());
        }
    }
    None
}

/// Helper function to extract event data as JSON
fn extract_event_data_from_log(log: &str) -> Option<serde_json::Value> {
    if let Some(start_idx) = log.find("data:") {
        let start = start_idx + 5;
        let data_str = log[start..].trim();
        
        if !data_str.is_empty() {
            return serde_json::from_str(data_str).ok();
        }
    }
    None
} 