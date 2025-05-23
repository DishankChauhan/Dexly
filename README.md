# Dexly - Decentralized Perpetual Futures Trading on Solana
![Home](https://github.com/user-attachments/assets/5d278f12-b682-425e-8c99-2e90c46a4c68)



Dexly is a high-performance decentralized perpetual futures trading platform built on the Solana blockchain. The platform enables traders to open leveraged long or short positions on crypto assets with up to 100x leverage, all managed through smart contracts deployed on Solana.

Unlike traditional DEXs that rely on orderbooks, Dexly uses an innovative pricing model with a virtual AMM (Automated Market Maker) design to determine entry and exit prices. This approach allows for deep liquidity while maintaining performance and reducing front-running risks.

## How Dexly Works

Dexly implements a complete perpetual futures trading system with these key components:

1. **Position Management**: Users can open long/short positions with collateral in USDC
2. **Leverage Control**: Traders can select leverage up to 100x, amplifying potential gains (and losses)
3. **Oracle Integration**: Real-time price feeds from Switchboard and Pyth oracles ensure accurate pricing
4. **Liquidation Engine**: Automated liquidation processes protect the protocol from undercollateralized positions
5. **Funding Rate Mechanism**: Periodic funding rates balance long and short positions 
6. **Risk Management**: Sophisticated margin requirements maintain system solvency

## Technology Stack

### Frontend
- **Framework**: Next.js 13+ with App Router for server components
- **UI/Styling**: TailwindCSS and Shadcn UI components
- **State Management**: React Context API and SWR for data fetching
- **Charting**: TradingView lightweight charts 
- **Authentication**: Wallet adapter for Solana web3 authentication
- **Language**: TypeScript for type safety

### Backend
- **Language**: Rust for high performance and safety
- **Framework**: Axum web framework for handling HTTP requests
- **Database**: PostgreSQL for persistent storage
- **ORM**: SQLx for type-safe SQL queries
- **API**: RESTful endpoints with JSON responses
- **Real-time Updates**: WebSocket connections for live data
- **Concurrency**: Tokio async runtime
- **Monitoring**: Prometheus metrics collection

### Smart Contracts (On-chain)
- **Framework**: Anchor framework for Solana program development
- **Language**: Rust
- **Design Pattern**: Program Derived Addresses (PDAs) for account management
- **Security**: Comprehensive security checks and validations
- **Oracle Integration**: Switchboard and Pyth price feed integrations

### Infrastructure
- **Hosting**: Cloud-based deployment with containerization
- **CI/CD**: Automated testing and deployment pipelines
- **Monitoring**: Health checks and error reporting
- **Database**: Managed PostgreSQL service

## System Architecture

![Dexly Architecture ](https://github.com/user-attachments/assets/82bd5354-3d1f-4edd-b7e3-b0d0bb1d0ffe)

### Smart Contract Layer
The on-chain Solana programs handle:
- Opening and closing positions with account creation/management
- Collateral deposit and withdrawal
- Leverage calculation and enforcement
- Oracle price feed integration
- Liquidation threshold verification
- Position PnL calculation
- Funding rate adjustments

### Backend Layer
The Rust-based backend provides:
- Database indexing of on-chain events
- REST API endpoints for frontend data
- WebSocket connections for real-time updates
- Liquidation monitoring and execution
- Historical data access and analytics
- User account management and history
- Market statistics calculation

### Frontend Layer
The Next.js frontend delivers:
- Responsive trading interface optimized for desktop and mobile
- Interactive TradingView price charts with indicators
- Position management dashboard
- Wallet integration for Phantom and other Solana wallets
- Real-time price and position updates
- Risk management indicators and warnings
- Trading history and analytics

## Development Setup

### Prerequisites
- Node.js 18+ and npm/yarn
- Rust 1.70+ and Cargo
- Solana CLI tools (1.16+)
- Anchor framework 0.28+
- PostgreSQL 14+
- Docker (optional, for containerized development)

### Database Setup
```bash
cd perps-backend
# Set up the PostgreSQL database
./setup-db.sh
```

### Backend Setup
```bash
cd perps-backend
# Install dependencies and build
cargo build
# Run the server
cargo run
```

### Frontend Setup
```bash
cd frontend
# Install dependencies
npm install
# Run development server
npm run dev
```

### Smart Contract Setup
```bash
cd perps
# Build the program
anchor build
# Deploy to localnet/devnet
anchor deploy
```

## Current Status and Roadmap

Dexly is currently in MVP phase with functional perpetual futures trading. The platform supports:

- SOL/USDC and BTC/USDC markets
- Up to 100x leverage trading
- Real-time position management
- Liquidation engine

### Upcoming Features
- Cross-collateralization between positions
- More trading pairs (ETH, AVAX, etc.)
- Advanced order types (stop-loss, take-profit)
- Portfolio margin
- Mobile application
- Trading competitions
- Referral program
- Institutional API access

## License

MIT 
