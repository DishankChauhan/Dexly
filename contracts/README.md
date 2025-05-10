# PerpGo Smart Contracts

This directory contains the on-chain smart contract code for the PerpGo decentralized perpetual futures trading platform.

## Current Status

**Note: The contract has not been deployed yet.** 

The current implementation is a work in progress:
- The smart contract code is complete but not yet deployed to Solana devnet/testnet/mainnet
- The backend (`backend/src/solana.rs`) contains mock interactions that simulate how it would communicate with the deployed contract
- Once deployed, we'll need to update the program ID and instruction discriminators in the backend code

## Project Structure

- **contracts/perpgo**: The Anchor-based smart contract implementation that runs on the Solana blockchain.
  - Contains the actual program logic, account structures, and instructions that are deployed on-chain.
  - The program has features for opening positions, closing positions, liquidation, and oracle integration.

## Relationship with Backend Code

The backend server code (in the `backend` directory) contains client-side code that interacts with these smart contracts:

- `backend/src/solana.rs`: Contains the client-side code to connect to Solana, interact with our smart contract, and fetch price data from Pyth oracles.
- This client code is NOT a duplicate implementation of the contract logic, but rather the interface needed to communicate with the deployed contract.
- Currently contains mock/placeholder code since the contract isn't deployed yet.

## Smart Contract Features

The PerpGo contract (`contracts/perpgo/programs/perpgo/src/lib.rs`) implements:

1. Program initialization
2. User account creation
3. Position opening
4. Position closing
5. Liquidation logic
6. Oracle integration for price feeds
7. Proper fund transfers and PDA (Program Derived Address) handling

## Next Steps for Deployment

To build and deploy the smart contract:

```bash
cd contracts/perpgo
anchor build
anchor deploy
```

After deployment:
1. Note the generated program ID
2. Update the `PROGRAM_ID` constant in `backend/src/solana.rs`
3. Generate the IDL file and update instruction discriminators in the backend code
4. Test interactions on devnet before moving to mainnet 