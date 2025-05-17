import { Connection, PublicKey, Transaction, VersionedTransaction } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';

// Solana connection to devnet
const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

// This client is intended to be used with the React useWallet hook
export const solanaClient = {
  /**
   * Get the Solana connection
   */
  getConnection() {
    return connection;
  },
  
  /**
   * Sign and send a transaction using the connected wallet
   * @param wallet wallet object from useWallet hook
   * @param transaction The transaction to sign and send
   * @returns Transaction signature
   */
  async signAndSendTransaction(
    wallet: ReturnType<typeof useWallet>,
    transaction: Transaction | VersionedTransaction
  ): Promise<string> {
    if (!wallet.publicKey || !wallet.signTransaction) {
      throw new Error('Wallet not connected or cannot sign transactions');
    }
    
    // Sign the transaction
    const signedTx = await wallet.signTransaction(transaction);
    
    // Send the signed transaction
    const signature = await connection.sendRawTransaction(signedTx.serialize());
    
    // Wait for confirmation
    await connection.confirmTransaction(signature, 'confirmed');
    
    return signature;
  },
  
  /**
   * Get transaction details from a signature
   * @param signature Transaction signature
   * @returns Transaction details
   */
  async getTransaction(signature: string) {
    return await connection.getTransaction(signature, {
      commitment: 'confirmed',
      maxSupportedTransactionVersion: 0,
    });
  },
  
  /**
   * Get balance of a wallet in SOL
   * @param publicKey Wallet public key
   * @returns Balance in SOL
   */
  async getBalance(publicKey: PublicKey): Promise<number> {
    const lamports = await connection.getBalance(publicKey);
    return lamports / 1_000_000_000; // Convert lamports to SOL
  },
  
  /**
   * Get explorer URL for a transaction
   * @param signature Transaction signature
   * @returns Solana Explorer URL
   */
  getExplorerUrl(signature: string): string {
    return `https://explorer.solana.com/tx/${signature}?cluster=devnet`;
  },
}; 