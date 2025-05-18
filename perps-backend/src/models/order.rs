use serde::{Deserialize, Serialize};
use anchor_client::solana_sdk::pubkey::Pubkey;
use chrono::{DateTime, Utc};
use strum_macros::{Display, EnumString};

/// Order type enum
#[derive(Debug, Serialize, Deserialize, Clone, Copy, PartialEq, EnumString, Display)]
pub enum OrderType {
    #[strum(serialize = "market")]
    Market = 0,
    
    #[strum(serialize = "limit")]
    Limit = 1,
    
    #[strum(serialize = "stop_loss")]
    StopLoss = 2,
    
    #[strum(serialize = "take_profit")]
    TakeProfit = 3,
}

impl From<u8> for OrderType {
    fn from(value: u8) -> Self {
        match value {
            0 => OrderType::Market,
            1 => OrderType::Limit,
            2 => OrderType::StopLoss,
            3 => OrderType::TakeProfit,
            _ => OrderType::Market,
        }
    }
}

impl From<OrderType> for u8 {
    fn from(order_type: OrderType) -> Self {
        order_type as u8
    }
}

/// Order status enum
#[derive(Debug, Serialize, Deserialize, Clone, Copy, PartialEq, EnumString, Display)]
pub enum OrderStatus {
    #[strum(serialize = "open")]
    Open,
    
    #[strum(serialize = "filled")]
    Filled,
    
    #[strum(serialize = "canceled")]
    Canceled,
    
    #[strum(serialize = "expired")]
    Expired,
}

/// Order model for API responses
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Order {
    /// Unique order ID (Pubkey as string)
    pub id: String,
    
    /// User who placed the order
    pub user: String,
    
    /// Market this order is for
    pub market: String,
    
    /// Order type
    pub order_type: u8,
    
    /// Direction of the order (true = long, false = short)
    pub is_long: bool,
    
    /// Size of the order in base asset units
    pub size: u64,
    
    /// Target price for limit/stop loss/take profit orders
    pub price: u64,
    
    /// Collateral amount for the position
    pub collateral: u64,
    
    /// Leverage used for this order
    pub leverage: u8,
    
    /// Whether the order is active
    pub is_active: bool,
    
    /// Max slippage in basis points (for market orders)
    pub max_slippage_bps: u16,
    
    /// Timestamp when order was placed
    pub created_at: i64,
    
    /// Position ID to create when filled
    pub position_id: u64,
    
    /// Bump seed for PDA derivation
    pub bump: u8,
    
    /// Current status of the order (derived from is_active)
    pub status: OrderStatus,
    
    /// Current mark price (from oracle, not stored on-chain)
    pub mark_price: Option<u64>,
}

/// Request for placing an order
#[derive(Debug, Deserialize)]
pub struct PlaceOrderRequest {
    /// User public key
    pub user: String,
    
    /// Order ID
    pub order_id: u64,
    
    /// Market ID for this order
    pub market_id: u64,
    
    /// Order type (0 = Market, 1 = Limit, 2 = StopLoss, 3 = TakeProfit)
    pub order_type: u8,
    
    /// Direction of the order (true = long, false = short)
    pub is_long: bool,
    
    /// Size of the order in base asset units
    pub size: u64,
    
    /// Target price for limit/stop loss/take profit orders
    pub price: u64,
    
    /// Collateral amount to use for the position
    pub collateral: u64,
    
    /// Leverage to use
    pub leverage: u8,
    
    /// Maximum allowable slippage in basis points
    pub max_slippage_bps: u16,
    
    /// Position ID to create when filled
    pub position_id: u64,
}

/// Request for canceling an order
#[derive(Debug, Deserialize)]
pub struct CancelOrderRequest {
    /// User public key
    pub user: String,
    
    /// Order ID to cancel
    pub order_id: String,
}

/// Request for executing an order
#[derive(Debug, Deserialize)]
pub struct ExecuteOrderRequest {
    /// Order ID to execute
    pub order_id: String,
    
    /// Market ID for this order
    pub market_id: u64,
}

/// Response for order list
#[derive(Debug, Serialize)]
pub struct OrderListResponse {
    pub orders: Vec<Order>,
    pub total: usize,
}

/// Order history entry
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct OrderHistory {
    /// Order ID
    pub order_id: String,
    
    /// User who placed the order
    pub user: String,
    
    /// Market this order was for
    pub market: String,
    
    /// Order type
    pub order_type: OrderType,
    
    /// Direction of the order (true = long, false = short)
    pub is_long: bool,
    
    /// Size of the order in base asset units
    pub size: u64,
    
    /// Target price for limit/stop loss/take profit orders
    pub price: u64,
    
    /// Collateral amount for the position
    pub collateral: u64,
    
    /// Leverage used for this order
    pub leverage: u8,
    
    /// Final status of the order
    pub status: OrderStatus,
    
    /// Timestamp when order was placed
    pub created_at: DateTime<Utc>,
    
    /// Timestamp when order was filled/canceled
    pub updated_at: DateTime<Utc>,
    
    /// Position ID created when filled (if applicable)
    pub position_id: Option<String>,
    
    /// Fill price (if filled)
    pub fill_price: Option<u64>,
} 