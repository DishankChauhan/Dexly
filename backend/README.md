# PerpGo Backend

The backend server for the PerpGo decentralized perpetual futures trading platform on Solana.

## Implementation Status

This backend contains a mix of real and mock implementations as we prepare for full blockchain integration:

### Real Implementations:

1. **Transaction Queue System**:
   - Properly sequences blockchain transactions to prevent race conditions
   - Handles transaction ordering and dependencies
   - Provides async waiting for transaction completion

2. **Error Handling**:
   - Detailed error responses with specific messages and codes
   - Appropriate HTTP status codes
   - Error propagation from blockchain interactions

3. **Account Creation**:
   - Automatically checks if a user account exists on the blockchain
   - Creates user accounts if they don't exist on first trade

4. **Position Management**:
   - Maps frontend position IDs to blockchain position public keys
   - Stores blockchain transaction signatures
   - Handles position closing with proper blockchain account references

5. **Liquidation Bot**:
   - Monitors position health and liquidation thresholds
   - Calls blockchain liquidation functions
   - Updates local state after liquidation

### Mock Implementations (to be replaced with real code after contract deployment):

1. **Price Feeds**:
   - Currently tries to fetch from Pyth but falls back to simulation
   - Will be fully integrated with Pyth oracle after deployment

2. **Position Data**:
   - `get_position_data()` currently returns mock position data
   - Will deserialize real account data after deployment

3. **Instruction Discriminators**:
   - Currently uses placeholder values
   - Will be updated with real values from the IDL after deployment

4. **Contract Interactions**:
   - Real client code structure but connects to non-deployed contract
   - Transaction signatures are validated but operations don't affect real state

## Next Steps

1. **Deploy Smart Contract**:
   - Use the `deploy.sh` script in the contracts directory
   - Update backend with real program ID and instruction discriminators

2. **Replace Mock Data**:
   - Update `get_position_data()` to properly deserialize account data
   - Implement proper position account lookup

3. **Connect Price Oracle**:
   - Finalize Pyth integration
   - Add fallback mechanisms and price validation

4. **Improve Error Handling**:
   - Add more specific error codes
   - Implement retry mechanisms

## Running the Backend

```bash
cd backend
cargo run
```

The server will start on `http://localhost:3001`. 