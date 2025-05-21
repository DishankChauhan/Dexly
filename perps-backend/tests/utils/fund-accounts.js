/**
 * Test account generator and funding script
 * 
 * This script:
 * 1. Generates multiple test accounts (keypairs)
 * 2. Airdrops SOL to each account
 * 3. Saves the accounts to a local file for use in tests
 */

import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Get directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
const envPath = path.join(__dirname, '..', '.env.test');
dotenv.config({ path: envPath });

// Configuration
const LOCALNET_URL = process.env.SOLANA_RPC_URL || 'http://127.0.0.1:8899';
const NUM_TEST_ACCOUNTS = 5;
const SOL_AMOUNT_PER_ACCOUNT = 10; // SOL
const ACCOUNT_STORAGE_PATH = path.join(__dirname, '..', 'test-accounts.json');

// Initialize Solana connection
const connection = new Connection(LOCALNET_URL, 'confirmed');

/**
 * Generate a test account
 * @returns {Keypair}
 */
function generateAccount() {
  return Keypair.generate();
}

/**
 * Fund an account with SOL
 * @param {Keypair} keypair - The keypair to fund
 * @param {number} solAmount - The amount of SOL to request
 * @returns {Promise<boolean>}
 */
async function fundAccount(keypair, solAmount) {
  try {
    const lamports = solAmount * LAMPORTS_PER_SOL;
    
    // Check current balance
    const initialBalance = await connection.getBalance(keypair.publicKey);
    console.log(`Initial balance for ${keypair.publicKey.toString()}: ${initialBalance / LAMPORTS_PER_SOL} SOL`);
    
    if (initialBalance >= lamports) {
      console.log(`Account ${keypair.publicKey.toString()} already has sufficient SOL.`);
      return true;
    }
    
    // Request airdrop
    console.log(`Requesting airdrop of ${solAmount} SOL to ${keypair.publicKey.toString()}...`);
    const signature = await connection.requestAirdrop(keypair.publicKey, lamports);
    
    // Confirm the transaction
    await connection.confirmTransaction(signature, 'confirmed');
    
    // Verify new balance
    const newBalance = await connection.getBalance(keypair.publicKey);
    console.log(`New balance for ${keypair.publicKey.toString()}: ${newBalance / LAMPORTS_PER_SOL} SOL`);
    
    return newBalance >= lamports;
  } catch (error) {
    console.error(`Failed to fund account ${keypair.publicKey.toString()}:`, error);
    return false;
  }
}

/**
 * Save test accounts to a JSON file
 * @param {Object[]} accounts - Array of account objects with pubkey and secretKey
 */
function saveAccounts(accounts) {
  try {
    fs.writeFileSync(
      ACCOUNT_STORAGE_PATH,
      JSON.stringify(accounts, null, 2),
      'utf8'
    );
    console.log(`Accounts saved to ${ACCOUNT_STORAGE_PATH}`);
  } catch (error) {
    console.error('Error saving accounts:', error);
  }
}

/**
 * Create and fund multiple test accounts
 */
async function setupTestAccounts() {
  console.log(`Setting up ${NUM_TEST_ACCOUNTS} test accounts on ${LOCALNET_URL}...`);
  
  const accounts = [];
  
  for (let i = 0; i < NUM_TEST_ACCOUNTS; i++) {
    const keypair = generateAccount();
    console.log(`Generated account ${i + 1}: ${keypair.publicKey.toString()}`);
    
    // Fund the account
    const funded = await fundAccount(keypair, SOL_AMOUNT_PER_ACCOUNT);
    
    if (funded) {
      // Save account details
      accounts.push({
        name: `account_${i + 1}`,
        pubkey: keypair.publicKey.toString(),
        secretKey: Array.from(keypair.secretKey)
      });
    }
  }
  
  // Save all accounts to file
  saveAccounts(accounts);
  
  console.log(`Successfully set up ${accounts.length} test accounts.`);
  return accounts;
}

// Run the script if invoked directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  setupTestAccounts()
    .then(() => {
      console.log('Account setup complete!');
      process.exit(0);
    })
    .catch(error => {
      console.error('Error setting up accounts:', error);
      process.exit(1);
    });
}

export { setupTestAccounts, fundAccount, generateAccount }; 