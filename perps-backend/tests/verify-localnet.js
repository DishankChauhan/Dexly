// Verify localnet connection
// This script ensures that we can connect to the local Solana validator
// before running the tests

import { Connection } from '@solana/web3.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
const envPath = path.join(__dirname, '.env.test');
dotenv.config({ path: envPath });

const LOCAL_RPC_URL = 'http://127.0.0.1:8899';

async function verifyLocalnetConnection() {
  console.log('Verifying connection to Solana localnet...');
  
  // First check the configured RPC URL
  if (process.env.SOLANA_RPC_URL !== LOCAL_RPC_URL) {
    console.warn(`Warning: SOLANA_RPC_URL is not set to localnet (${LOCAL_RPC_URL})`);
    console.warn(`Current value: ${process.env.SOLANA_RPC_URL}`);
    console.warn('Updating to use localnet');
    process.env.SOLANA_RPC_URL = LOCAL_RPC_URL;
  }
  
  // Try to connect to localnet
  try {
    const connection = new Connection(LOCAL_RPC_URL, 'confirmed');
    const { blockhash } = await connection.getLatestBlockhash();
    
    console.log('✅ Successfully connected to localnet!');
    console.log(`Latest blockhash: ${blockhash}`);
    console.log('Solana validator is running properly');
    return true;
  } catch (error) {
    console.error('❌ Failed to connect to localnet!');
    console.error('Make sure you have started the Solana validator with:');
    console.error('  solana-test-validator');
    console.error('\nError details:', error);
    return false;
  }
}

// Run verification
verifyLocalnetConnection().then(success => {
  if (!success) {
    process.exit(1);
  }
}); 