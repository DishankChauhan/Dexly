pub mod open_position;
pub mod close_position;
pub mod liquidate;
pub mod update_funding;
pub mod deposit_collateral;
pub mod withdraw_collateral;
pub mod initialize;
pub mod order;

// Export specific items instead of using glob exports to avoid ambiguity
pub use open_position::{handler as open_position_handler, PositionOpenedEvent};
pub use close_position::{handler as close_position_handler, PositionClosedEvent};
pub use liquidate::{handler as liquidate_handler, LiquidateContext, PositionLiquidatedEvent};
pub use update_funding::{handler as update_funding_handler, UpdateFundingContext, FundingUpdatedEvent};
pub use deposit_collateral::{handler as deposit_collateral_handler, DepositCollateralContext, CollateralDepositedEvent};
pub use withdraw_collateral::{handler as withdraw_collateral_handler, WithdrawCollateralContext, CollateralWithdrawnEvent};
pub use initialize::{handler as initialize_handler, GlobalStateInitializedEvent};

// Export order module but wrap handlers to prevent name conflicts
pub use order::{
    Order, OrderType,
    PlaceOrderContext, CancelOrderContext, ExecuteOrderContext
}; 

// Export these functions with unique names to avoid conflict with program handlers
pub mod order_handlers {
    pub use super::order::{place_order, cancel_order, execute_order};
} 