import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import * as anchor from '@coral-xyz/anchor';
import { Program, Idl } from '@coral-xyz/anchor';
import config from '../../config/index.js';

/**
 * Solana client service for interacting with the blockchain
 */
export class SolanaClient {
  private connection: Connection;
  private provider: anchor.AnchorProvider;
  private program: Program<Idl> | null = null;
  private adminKeypair: Keypair | null = null;

  constructor() {
    // Initialize Solana connection
    this.connection = new Connection(config.SOLANA_RPC_URL, 'confirmed');
    
    // Set up admin keypair if provided
    if (config.ADMIN_PRIVATE_KEY) {
      try {
        const secretKey = Buffer.from(JSON.parse(config.ADMIN_PRIVATE_KEY));
        this.adminKeypair = Keypair.fromSecretKey(secretKey);
      } catch (error) {
        console.warn('Invalid ADMIN_PRIVATE_KEY format, using generated keypair for tests');
        this.adminKeypair = Keypair.generate();
      }
    }
    
    // Create provider with optional wallet
    const wallet = this.adminKeypair 
      ? new anchor.Wallet(this.adminKeypair)
      : new anchor.Wallet(Keypair.generate()); // Dummy wallet if no admin key
      
    this.provider = new anchor.AnchorProvider(
      this.connection,
      wallet,
      { commitment: 'confirmed' }
    );
  }

  /**
   * Initialize the program with the IDL
   * @param idlJson - The IDL JSON for the program
   */
  async initializeProgram(idlJson: Idl): Promise<void> {
    try {
      const programId = new PublicKey(config.PROGRAM_ID);
      console.log(`Initializing program with ID: ${programId.toString()}`);
      console.log(`Using RPC URL: ${config.SOLANA_RPC_URL}`);
      
      // Standard initialization for Anchor 0.26.0
      this.program = new anchor.Program(
        idlJson,
        programId,
        this.provider
      );
      
      console.log(`Program initialized successfully: ${programId.toString()}`);
    } catch (error) {
      console.error('Failed to initialize program:', error);
      throw error;
    }
  }

  /**
   * Get the initialized program instance
   */
  getProgram(): Program<Idl> {
    if (!this.program) {
      throw new Error('Program not initialized. Call initializeProgram first.');
    }
    return this.program;
  }

  /**
   * Get the Solana connection
   */
  getConnection(): Connection {
    return this.connection;
  }

  /**
   * Get the provider
   */
  getProvider(): anchor.AnchorProvider {
    return this.provider;
  }

  /**
   * Check if admin keypair is available
   */
  hasAdminKey(): boolean {
    return this.adminKeypair !== null;
  }

  /**
   * Get the admin public key if available
   */
  getAdminPublicKey(): PublicKey | null {
    return this.adminKeypair?.publicKey || null;
  }

  /**
   * Get the admin keypair for transaction signing
   * This should only be used by trusted internal services
   */
  getAdminKeypair(): Keypair | null {
    return this.adminKeypair;
  }
} 