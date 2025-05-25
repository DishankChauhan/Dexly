/**
 * Setup script for test environment
 * 
 * This script:
 * 1. Creates a .env.test file if it doesn't exist
 * 2. Validates the RPC endpoint and program ID
 * 3. Ensures everything is configured properly for tests
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Connection } from '@solana/web3.js';

// Get directory name (for ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Constants
const LOCALNET_RPC_URL = 'http://127.0.0.1:8899';

// Paths
const envTestPath = path.join(__dirname, '.env.test');
const envExampleContent = `# Test environment configuration
# Using localnet for test environment
SOLANA_RPC_URL=${LOCALNET_RPC_URL}
PROGRAM_ID=5YTxWRCWmTsy8JWCncwwKRKQguaigqNXxsDZLAqEJ7LBc

# Database for testing
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/perps_test?schema=public"

# Optional: Test wallet private key (JSON string of bytes array) 
# TEST_PRIVATE_KEY="[1,2,3,...]"

# Test configuration
LOG_LEVEL=debug
`;

// Check if .env.test exists
if (!fs.existsSync(envTestPath)) {
  console.log('Creating .env.test file...');
  fs.writeFileSync(envTestPath, envExampleContent);
  console.log('Created .env.test file. Please update it with your settings before running tests.');
} else {
  console.log('.env.test file already exists.');
}

// Read environment file to check configuration
const envContent = fs.readFileSync(envTestPath, 'utf8');
const programIdMatch = envContent.match(/PROGRAM_ID=(.*)/);
const rpcUrlMatch = envContent.match(/SOLANA_RPC_URL=(.*)/);

// Validate important settings
if (!programIdMatch || programIdMatch[1] === 'YourProgramIdHere') {
  console.warn('⚠️  WARNING: Program ID not configured in .env.test');
  console.warn('Please set a valid PROGRAM_ID for the perps contract.');
}

if (!rpcUrlMatch || !rpcUrlMatch[1].includes('127.0.0.1')) {
  console.warn('⚠️  WARNING: Solana RPC URL not properly configured for localnet in .env.test');
  console.warn(`Please set SOLANA_RPC_URL to ${LOCALNET_RPC_URL} for localnet testing.`);
  
  // Update the file with correct localnet URL
  const updatedContent = envContent.replace(/SOLANA_RPC_URL=.*/, `SOLANA_RPC_URL=${LOCALNET_RPC_URL}`);
  fs.writeFileSync(envTestPath, updatedContent);
  console.log(`Updated .env.test with localnet RPC URL: ${LOCALNET_RPC_URL}`);
}

// Verify localnet connection
async function verifyLocalnetConnection() {
  try {
    console.log(`Attempting to connect to localnet at ${LOCALNET_RPC_URL}...`);
    const connection = new Connection(LOCALNET_RPC_URL, 'confirmed');
    const { blockhash } = await connection.getLatestBlockhash();
    console.log(`✅ Successfully connected to localnet! Blockhash: ${blockhash}`);
    return true;
  } catch (error) {
    console.error('❌ Failed to connect to localnet!');
    console.error('Make sure you have started the Solana validator with:');
    console.error('  solana-test-validator');
    return false;
  }
}

// Run verification
await verifyLocalnetConnection();

console.log('\nTest environment setup complete.');
console.log('To run tests, use:');
console.log('  npm run test:e2e\n'); 