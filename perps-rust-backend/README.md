# Perpetual Futures Protocol Backend

This is a Rust backend for the Solana-based perpetual futures trading protocol. It provides a HTTP API to interact with the on-chain protocol.

## Features

- Wallet and user management
- Global state interaction
- Market management
- User collateral management
- Position management (open/close trades)
- Oracle price updates
- Admin tools

## Requirements

- Rust and Cargo (latest stable version)
- Solana CLI tools
- Access to a Solana RPC endpoint (local validator or testnet/devnet/mainnet)

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/perps-rust-backend.git
   cd perps-rust-backend
   ```

2. Create a `.env` file with the following configuration:
   ```
   # Server configuration
   SERVER_HOST=127.0.0.1
   SERVER_PORT=8080
   
   # Solana connection
   SOLANA_RPC_URL=http://localhost:8899
   PERPS_PROGRAM_ID=DFxJxFuiidqxqWEuewJ4G6oaZxfWGwT7ZKxX4mxe3Pz9
   PERPS_IDL_PATH=../perps/target/idl/perps.json
   
   # Token configuration (these are devnet addresses)
   USDC_MINT=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
   
   # Admin configuration (use admin-keypair.json)
   ADMIN_KEYPAIR_PATH=./admin-keypair.json
   
   # Cache settings
   CACHE_DURATION_SECS=60
   ```

3. Create or copy your admin keypair:
   ```
   solana-keygen new -o admin-keypair.json
   ```

4. Build the project:
   ```
   cargo build --release
   ```

## Running the Backend

```
cargo run --release
```

The server will start on the configured host and port (default: `http://127.0.0.1:8080`).

## API Endpoints

### Global State

- `GET /api/global-state` - Get global state information
- `POST /api/admin/init-global` - Initialize global state (admin only)
- `POST /api/admin/pause-protocol` - Pause/unpause the protocol (admin only)
- `POST /api/admin/update-fees` - Update protocol fees (admin only)

### Markets

- `GET /api/markets` - Get all markets
- `POST /api/admin/init-market` - Initialize a new market (admin only)

### Users

- `GET /api/user?wallet={wallet_address}` - Get user account information
- `POST /api/user/create` - Create a new user account

### Collateral

- `POST /api/user/deposit` - Deposit collateral
- `POST /api/user/withdraw` - Withdraw collateral

### Positions

- `GET /api/positions?user={wallet_address}` - Get positions (all or for specific user)
- `POST /api/position/open` - Open a new position
- `POST /api/position/close` - Close an existing position

### Oracle

- `POST /api/oracle/update` - Update oracle price

## Development

### Adding New Features

1. Define models in `src/models/`
2. Implement handlers in `src/handlers/`
3. Add routes in `src/main.rs`

### Testing

```
cargo test
```

## License

MIT 