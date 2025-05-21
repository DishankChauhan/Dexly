/**
 * E2E test for blockchain connection
 * 
 * This test verifies that:
 * 1. We can connect to the Solana blockchain
 * 2. We have a valid program ID to reference
 * 3. We can setup the test environment properly
 */

import { PublicKey } from '@solana/web3.js';
import { initializeTestEnvironment, logTestInfo } from '../setup';
import config from '../../src/config/index';

describe('Solana Connection', () => {
  const { solanaClient } = initializeTestEnvironment();
  
  beforeAll(() => {
    logTestInfo('Solana Connection E2E Test');
  });
  
  test('should connect to Solana blockchain', async () => {
    // Get the connection object
    const connection = solanaClient.getConnection();
    
    // Verify connection by getting the latest blockhash
    const { blockhash } = await connection.getLatestBlockhash();
    
    // Check that we received a blockhash
    expect(blockhash).toBeDefined();
    expect(typeof blockhash).toBe('string');
    expect(blockhash.length).toBeGreaterThan(0);
    
    console.log(`Successfully connected to Solana and received blockhash: ${blockhash}`);
  });
  
  test('should have a valid program ID', () => {
    // Check that the Program ID is a valid Solana public key
    const programId = new PublicKey(config.PROGRAM_ID);
    
    // Verify it's a valid public key
    expect(programId).toBeDefined();
    expect(programId instanceof PublicKey).toBe(true);
    expect(programId.toBase58()).toBe(config.PROGRAM_ID);
    
    console.log(`Program ID verified: ${programId.toBase58()}`);
  });
  
  test('should have the provider configured', () => {
    // Check that the provider is configured
    const provider = solanaClient.getProvider();
    
    // Verify provider
    expect(provider).toBeDefined();
    expect(provider.connection).toBeDefined();
    expect(provider.wallet).toBeDefined();
    
    console.log(`Provider confirmed with connection endpoint: ${provider.connection.rpcEndpoint}`);
  });
}); 