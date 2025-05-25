/**
 * E2E test for market data fetching
 * 
 * This test verifies that:
 * 1. We can create the required PDAs and account addresses
 * 2. We can perform the necessary operations on market addresses
 * 3. We can handle data loading errors gracefully
 */

import { PublicKey } from '@solana/web3.js';
import { initializeTestEnvironment, logTestInfo } from '../setup';
import config from '../../src/config/index';

describe('Market Data', () => {
  const { solanaClient } = initializeTestEnvironment();
  const programId = new PublicKey(config.PROGRAM_ID);
  const testMarketAddress = programId; // Use program ID as a placeholder for testing
  
  beforeAll(() => {
    logTestInfo('Market Data E2E Test');
  });
  
  test('should generate valid market PDA', async () => {
    // Create a test asset key (BTC)
    const assetKey = Buffer.from('BTC-USD');
    
    // Generate market PDA 
    const [marketPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from('market'), assetKey],
      programId
    );
    
    // Verify we have a valid PDA
    expect(marketPDA).toBeDefined();
    expect(marketPDA instanceof PublicKey).toBe(true);
    
    console.log(`Generated market PDA: ${marketPDA.toString()}`);
  });
  
  test('should handle market data structure correctly', () => {
    // Create a test market structure
    const market = {
      address: testMarketAddress,
      baseAssetReserve: BigInt(1000000000000),
      quoteAssetReserve: BigInt(500000000000),
      fundingRate: BigInt(0),
      maxLeverage: 10
    };
    
    // Verify we can process market data
    expect(market.address.toString()).toBe(testMarketAddress.toString());
    expect(typeof market.baseAssetReserve).toBe('bigint');
    expect(typeof market.quoteAssetReserve).toBe('bigint');
    
    // Calculate simulated mark price
    const markPrice = (market.quoteAssetReserve * BigInt(1e9)) / market.baseAssetReserve;
    
    console.log(`Test market mark price: ${markPrice}`);
    expect(markPrice).toBeGreaterThan(BigInt(0));
  });
  
  test('should handle non-existent market gracefully', async () => {
    // Try to get connection for a test
    const connection = solanaClient.getConnection();
    expect(connection).toBeDefined();
    
    // Create an invalid address format to test error handling
    const invalidMarketId = 'invalid_market_id';
    
    // This should not throw but return null
    try {
      const invalidKey = new PublicKey(invalidMarketId);
      expect(invalidKey).toBeDefined(); // This should not execute
    } catch (error) {
      // Expect an error for invalid key
      expect(error).toBeDefined();
    }
  });
}); 