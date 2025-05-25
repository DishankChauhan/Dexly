# End-to-End Tests for Perps Backend

This directory contains end-to-end tests for the perpetual futures trading backend. These tests verify that the backend can properly connect to and interact with the Solana blockchain and the deployed perps contract.

## Test Structure

### End-to-End Tests
- `connection.e2e.ts`: Tests basic connectivity to the Solana blockchain and program
- `markets.e2e.ts`: Tests fetching of market data from the blockchain
- `trade.e2e.ts`: Tests trade simulation and position management functionality

## Running Tests

### Prerequisites
1. Set up environment variables in `.env.test`
2. Ensure you have access to a Solana RPC endpoint (devnet is recommended for testing)
3. Make sure the program ID in the config points to a deployed perps contract

### Running All Tests
```bash
npm run test:e2e
```

### Running Specific Tests
```bash
npm run test:e2e -- -t "should connect to Solana blockchain"
```

## Test Environment

The tests use a `.env.test` file for configuration. By default, the tests connect to Solana devnet, but you can configure them to use any RPC endpoint.

Important configurations:
- `SOLANA_RPC_URL`: Solana RPC endpoint URL
- `PROGRAM_ID`: The deployed perps program ID
- `TEST_PRIVATE_KEY`: (Optional) A wallet private key for transaction tests

## What These Tests Verify

These E2E tests verify:

1. **Blockchain Connectivity**
   - Connection to Solana blockchain
   - Access to the correct program ID
   - Proper IDL loading

2. **Market Data**
   - Fetching of all markets
   - Fetching individual market details
   - Market data structure and validation

3. **Trade Simulation & Position Management**
   - Accurate trade simulations (long & short)
   - Price impact calculations
   - Liquidation price calculations
   - Transaction instruction generation

## Adding New Tests

When adding new tests:
1. Create a new file in the `e2e` directory with the `.e2e.ts` extension
2. Import the test helpers from `setup.ts`
3. Use the `initializeTestEnvironment()` function to set up test services
4. Add descriptive test cases that verify real functionality

## Notes on Real vs. Mock Testing

These tests use real connections to the Solana blockchain instead of mocks. This ensures that:
1. The connection logic works correctly
2. The contract interface is compatible with the deployed program
3. The serialization/deserialization of data works correctly
4. The transaction building logic creates valid instructions

However, some tests (especially those involving real transactions) may be configured to skip actual transaction submission to avoid spending SOL on testing. 