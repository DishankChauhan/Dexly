/**
 * E2E test for complete position lifecycle
 * 
 * This test verifies that:
 * 1. A position can be opened
 * 2. A position's details can be queried
 * 3. A position can be closed
 * 4. All events are properly recorded
 */

import { PublicKey, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
import BN from 'bn.js';
import { initializeTestEnvironment, logTestInfo } from '../setup';
import { testAccounts, ACCOUNT_ROLES } from '../utils/test-accounts.js';
import { TradeDirection } from '../../src/models/perps';
import config from '../../src/config/index';

describe('Position Lifecycle', () => {
  // Set a larger timeout since we're doing actual blockchain transactions
  jest.setTimeout(60000);
  
  const { solanaClient, contractService } = initializeTestEnvironment();
  const programId = new PublicKey(config.PROGRAM_ID);
  
  let positionId: string | null = null;
  let marketId: string | null = null;
  
  beforeAll(async () => {
    logTestInfo('Position Lifecycle E2E Test');
    
    // Initialize test accounts if needed
    for (const account of testAccounts) {
      await account.initializeIfNeeded();
    }
    
    // Verify accounts were initialized
    expect(testAccounts.length).toBeGreaterThan(0);
    expect(testAccounts[0].hasAccounts()).toBe(true);
    
    // Get available markets
    const markets = await contractService.getMarkets();
    if (markets.length > 0) {
      marketId = markets[0].market.toString();
      console.log(`Using market: ${marketId}`);
    } else {
      console.warn('No markets available, tests will be skipped');
    }
  });
  
  test('should open a long position', async () => {
    // Skip if no market available
    if (!marketId) {
      console.warn('No market available, skipping test');
      return;
    }
    
    // Find trader account
    const traderAccount = testAccounts.find(account => account.role === ACCOUNT_ROLES.TRADER_1);
    expect(traderAccount).toBeDefined();
    
    const traderKeypair = traderAccount!.getKeypair(ACCOUNT_ROLES.TRADER_1);
    expect(traderKeypair).not.toBeNull();
    
    // Check trader balance
    const connection = solanaClient.getConnection();
    const balance = await connection.getBalance(traderKeypair!.publicKey);
    console.log(`Trader balance: ${balance / 1e9} SOL`);
    expect(balance).toBeGreaterThan(0);
    
    // Prepare position parameters
    const openParams = {
      marketId: marketId,
      userKey: traderKeypair!.publicKey.toString(),
      direction: TradeDirection.Long,
      size: BigInt(1000000000), // 1 unit of base asset
      collateral: BigInt(100000000), // 0.1 SOL as collateral
      leverage: 5 // 5x leverage
    };
    
    // Create instruction for opening position
    const instruction = await contractService.prepareOpenPosition(openParams);
    expect(instruction).toBeDefined();
    
    // Create and send transaction
    const transaction = new Transaction().add(instruction);
    transaction.feePayer = traderKeypair!.publicKey;
    
    // Get recent blockhash
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    
    try {
      // Sign and send transaction
      const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [traderKeypair!]
      );
      
      console.log(`Position opened with signature: ${signature}`);
      expect(signature).toBeDefined();
      
      // Get user positions
      const positions = await contractService.getUserPositions(traderKeypair!.publicKey.toString());
      expect(positions.length).toBeGreaterThan(0);
      
      // Store position ID for later tests
      positionId = positions[0].id;
      console.log(`New position created with ID: ${positionId}`);
    } catch (error) {
      console.error('Failed to open position:', error);
      // This will fail the test if the transaction fails
      throw error;
    }
  });
  
  test('should get position details', async () => {
    // Skip if no position was created
    if (!positionId) {
      console.warn('No position created, skipping test');
      return;
    }
    
    // Get position details
    const position = await contractService.getPosition(positionId);
    
    // Verify position details
    expect(position).not.toBeNull();
    expect(position!.market.toString()).toBe(marketId);
    expect(position!.isLong).toBe(true); // We opened a long position
    expect(position!.leverage).toBe(5);
    expect(position!.isClosed).toBe(false);
    
    // Log position details
    console.log('Position Details:');
    console.log(`ID: ${position!.id}`);
    console.log(`User: ${position!.user.toString()}`);
    console.log(`Market: ${position!.market.toString()}`);
    console.log(`Direction: ${position!.isLong ? 'Long' : 'Short'}`);
    console.log(`Size: ${position!.size.toString()}`);
    console.log(`Collateral: ${position!.collateral.toString()}`);
    console.log(`Entry Price: ${position!.entryPrice.toString()}`);
    console.log(`Leverage: ${position!.leverage}`);
  });
  
  test('should close the position', async () => {
    // Skip if no position was created
    if (!positionId) {
      console.warn('No position created, skipping test');
      return;
    }
    
    // Find trader account
    const traderAccount = testAccounts.find(account => account.role === ACCOUNT_ROLES.TRADER_1);
    expect(traderAccount).toBeDefined();
    
    const traderKeypair = traderAccount!.getKeypair(ACCOUNT_ROLES.TRADER_1);
    expect(traderKeypair).not.toBeNull();
    
    // Prepare closing parameters
    const closeParams = {
      positionId: positionId,
      userKey: traderKeypair!.publicKey.toString()
    };
    
    // Create instruction for closing position
    const instruction = await contractService.prepareClosePosition(closeParams);
    expect(instruction).toBeDefined();
    
    // Create and send transaction
    const connection = solanaClient.getConnection();
    const transaction = new Transaction().add(instruction);
    transaction.feePayer = traderKeypair!.publicKey;
    
    // Get recent blockhash
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    
    try {
      // Sign and send transaction
      const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [traderKeypair!]
      );
      
      console.log(`Position closed with signature: ${signature}`);
      expect(signature).toBeDefined();
      
      // Verify position is closed
      const position = await contractService.getPosition(positionId);
      expect(position).not.toBeNull();
      expect(position!.isClosed).toBe(true);
      
      console.log('Position successfully closed');
    } catch (error) {
      console.error('Failed to close position:', error);
      // This will fail the test if the transaction fails
      throw error;
    }
  });
  
  test('should verify position history after closing', async () => {
    // Skip if no position was created
    if (!positionId) {
      console.warn('No position created, skipping test');
      return;
    }
    
    // Find trader account
    const traderAccount = testAccounts.find(account => account.role === ACCOUNT_ROLES.TRADER_1);
    expect(traderAccount).toBeDefined();
    
    const traderKeypair = traderAccount!.getKeypair(ACCOUNT_ROLES.TRADER_1);
    expect(traderKeypair).not.toBeNull();
    
    // Get user positions
    const positions = await contractService.getUserPositions(traderKeypair!.publicKey.toString());
    
    // Find our closed position
    const closedPosition = positions.find(p => p.id === positionId);
    expect(closedPosition).toBeDefined();
    expect(closedPosition!.isClosed).toBe(true);
    expect(closedPosition!.closedAt).not.toEqual(BigInt(0));
    
    console.log(`Position ${positionId} verified as closed at: ${closedPosition!.closedAt}`);
  });
}); 