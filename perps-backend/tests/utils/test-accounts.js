/**
 * Test accounts utility
 * 
 * This module:
 * 1. Loads test accounts from the generated JSON file
 * 2. Provides helper functions to access accounts for different test roles
 * 3. Handles account key conversion and formatting
 */

import { Keypair, PublicKey } from '@solana/web3.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { setupTestAccounts } from './fund-accounts.js';

// Get directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Account storage path
const ACCOUNT_STORAGE_PATH = path.join(__dirname, '..', 'test-accounts.json');

// Account role types
const ACCOUNT_ROLES = {
  ADMIN: 'admin',
  TRADER_1: 'trader_1',
  TRADER_2: 'trader_2',
  LIQUIDATOR: 'liquidator',
  ORACLE_OPERATOR: 'oracle_operator'
};

/**
 * Load test accounts from file
 * @returns {Array} Array of account objects
 */
function loadTestAccounts() {
  try {
    if (!fs.existsSync(ACCOUNT_STORAGE_PATH)) {
      console.log('Test accounts file not found. Run npm run test:fund-accounts first.');
      return [];
    }
    
    const accountsData = fs.readFileSync(ACCOUNT_STORAGE_PATH, 'utf8');
    return JSON.parse(accountsData);
  } catch (error) {
    console.error('Error loading test accounts:', error);
    return [];
  }
}

/**
 * Convert account data to Keypair
 * @param {Object} accountData - Account data with secretKey array
 * @returns {Keypair}
 */
function accountToKeypair(accountData) {
  return Keypair.fromSecretKey(Uint8Array.from(accountData.secretKey));
}

/**
 * Test accounts class to manage all test accounts
 */
class TestAccounts {
  constructor() {
    this.accounts = loadTestAccounts();
    this.keypairs = {};
    
    // Initialize keypairs by role
    if (this.accounts.length > 0) {
      this.keypairs[ACCOUNT_ROLES.ADMIN] = accountToKeypair(this.accounts[0]);
      this.keypairs[ACCOUNT_ROLES.TRADER_1] = accountToKeypair(this.accounts[1] || this.accounts[0]);
      this.keypairs[ACCOUNT_ROLES.TRADER_2] = accountToKeypair(this.accounts[2] || this.accounts[0]);
      this.keypairs[ACCOUNT_ROLES.LIQUIDATOR] = accountToKeypair(this.accounts[3] || this.accounts[0]);
      this.keypairs[ACCOUNT_ROLES.ORACLE_OPERATOR] = accountToKeypair(this.accounts[4] || this.accounts[0]);
    }
  }
  
  /**
   * Check if accounts are available
   * @returns {boolean}
   */
  hasAccounts() {
    return this.accounts.length > 0;
  }
  
  /**
   * Initialize accounts if not already available
   * @returns {Promise<boolean>}
   */
  async initializeIfNeeded() {
    if (!this.hasAccounts()) {
      console.log('No test accounts found. Setting up new accounts...');
      const accounts = await setupTestAccounts();
      this.accounts = accounts;
      
      // Reinitialize keypairs
      this.keypairs[ACCOUNT_ROLES.ADMIN] = accountToKeypair(this.accounts[0]);
      this.keypairs[ACCOUNT_ROLES.TRADER_1] = accountToKeypair(this.accounts[1] || this.accounts[0]);
      this.keypairs[ACCOUNT_ROLES.TRADER_2] = accountToKeypair(this.accounts[2] || this.accounts[0]);
      this.keypairs[ACCOUNT_ROLES.LIQUIDATOR] = accountToKeypair(this.accounts[3] || this.accounts[0]);
      this.keypairs[ACCOUNT_ROLES.ORACLE_OPERATOR] = accountToKeypair(this.accounts[4] || this.accounts[0]);
      
      return true;
    }
    
    return this.hasAccounts();
  }
  
  /**
   * Get keypair by role
   * @param {string} role - Account role
   * @returns {Keypair|null}
   */
  getKeypair(role) {
    return this.keypairs[role] || null;
  }
  
  /**
   * Get public key by role
   * @param {string} role - Account role
   * @returns {PublicKey|null}
   */
  getPublicKey(role) {
    const keypair = this.getKeypair(role);
    return keypair ? keypair.publicKey : null;
  }
  
  /**
   * Get all test accounts
   * @returns {Object}
   */
  getAllAccounts() {
    return {
      admin: this.getKeypair(ACCOUNT_ROLES.ADMIN),
      trader1: this.getKeypair(ACCOUNT_ROLES.TRADER_1),
      trader2: this.getKeypair(ACCOUNT_ROLES.TRADER_2),
      liquidator: this.getKeypair(ACCOUNT_ROLES.LIQUIDATOR),
      oracleOperator: this.getKeypair(ACCOUNT_ROLES.ORACLE_OPERATOR)
    };
  }
}

// Export singleton instance
const testAccounts = new TestAccounts();

export { testAccounts, ACCOUNT_ROLES }; 