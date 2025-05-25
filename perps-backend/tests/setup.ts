// Test environment setup
import dotenv from 'dotenv';
import * as anchor from '@coral-xyz/anchor';
import { Keypair, Connection } from '@solana/web3.js';
import { SolanaClient } from '../src/services/blockchain/solanaClient';
import { PerpsContractService } from '../src/services/blockchain/perpsContractService';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Get directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the tests directory specifically
const envPath = path.join(__dirname, '.env.test');
dotenv.config({ path: envPath });

// Set the RPC URL globally to ensure correct URL is used
if (process.env.SOLANA_RPC_URL) {
  process.env.SOLANA_RPC_URL = process.env.SOLANA_RPC_URL.trim();
  console.log(`Setting RPC URL to: ${process.env.SOLANA_RPC_URL}`);
}

// Create test wallet for transactions
export const createTestWallet = (): Keypair => {
  // If we have a test private key in env, use it
  if (process.env.TEST_PRIVATE_KEY) {
    const secretKey = Buffer.from(JSON.parse(process.env.TEST_PRIVATE_KEY));
    return Keypair.fromSecretKey(secretKey);
  }
  
  // Otherwise generate a random keypair for read-only tests
  return Keypair.generate();
};

// Initialize Solana client with test wallet
export const initializeSolanaClient = (): SolanaClient => {
  // NOTE: In real tests, you might want to fund this wallet with SOL
  return new SolanaClient();
};

// Initialize perps contract service
export const initializeContractService = (solanaClient: SolanaClient): PerpsContractService => {
  return new PerpsContractService(solanaClient);
};

// Initialize all services for testing
export const initializeTestEnvironment = () => {
  const solanaClient = initializeSolanaClient();
  const contractService = initializeContractService(solanaClient);
  
  return {
    solanaClient,
    contractService,
    testWallet: createTestWallet()
  };
};

// Verify connection to the RPC
export const verifyConnection = async (): Promise<boolean> => {
  try {
    const connection = new Connection(process.env.SOLANA_RPC_URL || 'http://127.0.0.1:8899');
    await connection.getLatestBlockhash();
    return true;
  } catch (error) {
    console.error('Failed to connect to Solana RPC:', error);
    return false;
  }
};

// Log test information
export const logTestInfo = (testName: string) => {
  console.log(`\n-----------------------------------------------------`);
  console.log(`Running test: ${testName}`);
  console.log(`RPC URL: ${process.env.SOLANA_RPC_URL || 'default'}`);
  console.log(`Program ID: ${process.env.PROGRAM_ID || 'default'}`);
  console.log(`-----------------------------------------------------\n`);
}; 