# Perps Trading Platform Backend

A TypeScript Express backend for a vAMM-based decentralized perps trading platform built on Solana.

## Features

- Trade simulation and execution
- Position management (open/close)
- Market data and analytics
- Funding rate calculation
- Liquidation monitoring
- Event indexing

## Tech Stack

- TypeScript and Node.js
- Express.js for API
- Prisma with PostgreSQL for database
- Solana Web3.js and Anchor for blockchain interaction
- Zod for validation

## Getting Started

### Prerequisites

- Node.js 16+
- PostgreSQL
- Solana CLI (recommended)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Copy the environment example and modify values:
   ```
   cp src/config/env.example .env
   ```
4. Set up the database:
   ```
   npx prisma migrate dev
   ```
5. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

- Trade
  - `POST /api/trade/simulate` - Simulate a trade
- Market
  - `GET /api/market` - Get all markets
  - `GET /api/market/:id` - Get market by ID
- Position
  - `GET /api/position/user/:userKey` - Get positions for a user
  - `GET /api/position/:id` - Get position by ID
  - `POST /api/position/open` - Open a new position
  - `POST /api/position/:id/close` - Close an existing position

## Development

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations 