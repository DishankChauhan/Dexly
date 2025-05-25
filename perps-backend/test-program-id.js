import { PublicKey } from '@solana/web3.js';

try {
  const programId = new PublicKey('5YTxWRCWmTsy8JWCncwwKRKQguaigqNXxsDZLAqEJ7LB');
  console.log('Program ID is valid:', programId.toString());
} catch (error) {
  console.error('Invalid program ID:', error.message);
} 