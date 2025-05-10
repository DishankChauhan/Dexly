# PerpGo Smart Contract

This is the smart contract for the PerpGo decentralized perpetual futures trading platform on Solana.

## Features

- Perpetual futures trading with leverage (up to 10x)
- User accounts with collateral management
- Opening and closing positions
- Liquidation system
- Real-time price feeds from Pyth oracle
- PnL calculation

## Key Components

1. **Global State**: Stores global configuration including oracle address
2. **User Account**: Stores user information and open positions count
3. **Position Account**: Stores individual position details
4. **Oracle Integration**: Uses Pyth oracle for real-time price data

## Requirements

- Rust and Cargo
- Solana CLI tools
- Anchor framework
- Node.js and npm/yarn (for deployment scripts)

## Setup

1. Install the Solana CLI tools:
   ```bash
   sh -c "$(curl -sSfL https://release.solana.com/v1.16.19/install)"
   ```

2. Install the Anchor Framework:
   ```bash
   cargo install --git https://github.com/coral-xyz/anchor avm --locked
   avm install latest
   avm use latest
   ```

3. Set up a Solana wallet (if you don't already have one):
   ```bash
   solana-keygen new
   ```

## Building the Contract

To build the contract:

```bash
cd contracts/perpgo
anchor build
```

## Deploying to Devnet

We've created a deployment script that handles the entire deployment process:

1. Make sure you have SOL in your devnet wallet:
   ```bash
   solana config set --url devnet
   solana airdrop 2
   ```

2. Run the deployment script:
   ```bash
   ./deploy_devnet.sh
   ```

This script will:
- Switch to devnet if needed
- Check your balance and airdrop SOL if needed
- Build the contract
- Deploy to devnet
- Update the program ID
- Initialize the program with the Pyth oracle

## Test After Deployment

1. Update the backend to use the new program ID:
   ```bash
   node update_backend.js
   ```

2. Verify the deployment:
   ```bash
   solana program show --programs
   ```

3. Check the account info:
   ```bash
   solana account <PROGRAM_ID>
   ```

## Technical Details

### Oracle Integration

The contract uses Pyth oracle for real-time price data. The SOL/USD price feed on devnet is:
```
J83w4HKfqxwcq3BEMMkPFSppX3gqekLyLJBexebFVkix
```

### PDA (Program Derived Address) Structure

- Global State: `["global_state"]`
- User Account: `["user", user_pubkey]`
- Position: Created with unique keypair

### Price Handling

Prices from Pyth are standardized to have 6 decimal places (e.g., $100.00 = 100_000_000). 