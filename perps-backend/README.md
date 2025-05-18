# Perps Protocol Backend

Backend service for the Solana-based perpetual futures trading protocol.

## Architecture

The backend is structured into the following components:

1. **API Layer** - REST endpoints for frontend and integrations
2. **Database Layer** - PostgreSQL for event indexing and historical data
3. **Solana Integration** - Client, PDAs, and instructions for on-chain interactions
4. **Event Indexing** - Subscribe to and process on-chain events

## Features

- **Account Tracking**: Monitor user accounts, positions, and orders
- **Market Data**: Track market state and parameters
- **Event Indexing**: Index on-chain events (position opens/closes, liquidations)
- **API Endpoints**: REST APIs for querying positions, orders, market data
- **PnL Calculation**: Real-time collateral balance and PnL calculation
- **Transaction Building**: Helper functions to build and send transactions
- **Security Features**: Oracle price verification, slippage protection, comprehensive error handling

## Setup

### Prerequisites

- Rust toolchain (1.70+)
- Solana CLI tools
- PostgreSQL database
- Solana wallet keypair file

### Environment Variables

Create a `.env` file with the following variables:

```
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
SOLANA_WS_URL=wss://api.mainnet-beta.solana.com
KEYPAIR_PATH=/path/to/your/keypair.json
PERPS_PROGRAM_ID=DFxJxFuiidqxqWEuewJ4G6oaZxfWGwT7ZKxX4mxe3Pz9
DATABASE_URL=postgres://username:password@localhost/perps_db
PORT=8080
COMMITMENT=confirmed
MAX_CONNECTIONS=10
```

### Database Setup

1. Create a PostgreSQL database:

```sql
CREATE DATABASE perps_db;
```

2. The application will initialize all required tables on startup.

### Building

```bash
cargo build --release
```

### Running

```bash
cargo run --release
```

## API Endpoints

The service exposes the following API endpoints:

### Health Check

- `GET /api/health`: Check service health status

### Markets

- `GET /api/markets`: List all available markets
- `GET /api/markets/{market_id}`: Get details for a specific market
- `GET /api/markets/{market_id}/price`: Get current oracle price for a market
- `GET /api/markets/{market_id}/update-funding`: Update funding rate for a market

### Positions

- `GET /api/positions`: List all positions for a user
- `GET /api/positions/{position_id}`: Get details for a specific position
- `POST /api/positions`: Open a new position
- `POST /api/positions/{position_id}/close`: Close an existing position

### Orders

- `GET /api/orders`: List all orders for a user
- `GET /api/orders/{order_id}`: Get details for a specific order
- `POST /api/orders`: Place a new order
- `POST /api/orders/{order_id}/cancel`: Cancel an existing order
- `POST /api/orders/{order_id}/execute`: Execute an order

### Users

- `GET /api/users/{user_pubkey}`: Get user account details
- `GET /api/users/{user_pubkey}/stats`: Get user statistics
- `POST /api/users`: Create a new user account
- `POST /api/users/{user_pubkey}/deposit`: Deposit collateral
- `POST /api/users/{user_pubkey}/withdraw`: Withdraw collateral
- `GET /api/users/{user_pubkey}/transactions`: Get user transaction history

### Admin (Requires Authentication)

- `POST /api/admin/markets`: Create a new market
- `POST /api/admin/markets/{market_id}`: Update market parameters
- `POST /api/admin/markets/{market_id}/funding`: Update funding rate
- `POST /api/admin/markets/{market_id}/pause`: Pause/unpause a market
- `GET /api/admin/stats`: Get protocol statistics
- `POST /api/admin/fees`: Update protocol fees

## Database Schema

The backend uses PostgreSQL for storing historical data and indexing events:

- `positions`: Position data (open, closed, PnL)
- `orders`: Order data (pending, filled, cancelled)
- `markets`: Market parameters and state
- `users`: User account information
- `events`: Indexed on-chain events
- `funding_rate_history`: Historical funding rates
- `price_history`: Oracle price history
- `transactions`: Transaction records

## Event Indexing

The backend includes an event indexing system that:

1. Subscribes to on-chain events via WebSockets
2. Processes event logs to extract relevant data
3. Stores events in the database for querying
4. Periodically scans for missed events

## Error Handling

The application uses a comprehensive error handling system with specific error types for different scenarios, including:

- Solana client errors
- Transaction errors
- Contract errors
- Oracle errors
- Database errors
- Validation errors
- Network errors

Each error type maps to an appropriate HTTP status code and includes detailed information for debugging.

## Development

### Adding New Features

When adding new features:

1. Define models in `src/models/`
2. Add Solana integration in `src/solana/`
3. Create database functions in `src/database/`
4. Add API handlers in `src/handlers/`
5. Register new routes in the handlers' `register` function

### Running Tests

```bash
cargo test
```

## License

Copyright (c) 2023 Perps Protocol Team. 