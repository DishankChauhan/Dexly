import { 
  Connection, 
  Keypair, 
  PublicKey, 
  Transaction, 
  SystemProgram, 
  TransactionInstruction, 
  sendAndConfirmTransaction
} from '@solana/web3.js';
import * as fs from 'fs';

async function main() {
  try {
    // Connect to devnet
    const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
    
    // Load the wallet keypair
    const keypairData = JSON.parse(fs.readFileSync('./devnet-wallet.json', 'utf8'));
    const wallet = Keypair.fromSecretKey(new Uint8Array(keypairData));
    
    // Program ID
    const programId = new PublicKey('Eu1XQLF5MewmRJ2VeBms2NtU2vkuamX3KtQ9mEhntucP');
    
    // Oracle ID - SOL/USD Pyth price feed on devnet
    const oracle = new PublicKey('J83w4HKfqxwcq3BEMMkPFSppX3gqekLyLJBexebFVkix');
    
    // Find the global state PDA
    const [globalState, bump] = PublicKey.findProgramAddressSync(
      [Buffer.from('global_state')],
      programId
    );
    
    console.log('Wallet public key:', wallet.publicKey.toString());
    console.log('Program ID:', programId.toString());
    console.log('Oracle pubkey:', oracle.toString());
    console.log('Global state PDA:', globalState.toString());
    console.log('Global state bump:', bump);
    
    // Create initialize instruction data
    // The first 8 bytes are the instruction discriminator for 'initialize'
    const data = Buffer.from([175, 175, 109, 31, 13, 152, 155, 237]);
    
    // Create initialize instruction
    // Anchor's #[account(init)] handles account creation, so we just need the initialize instruction
    const initializeIx = new TransactionInstruction({
      keys: [
        { pubkey: globalState, isSigner: false, isWritable: true },
        { pubkey: wallet.publicKey, isSigner: true, isWritable: true },
        { pubkey: oracle, isSigner: false, isWritable: false },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
      ],
      programId,
      data
    });
    
    // Create and send transaction
    const transaction = new Transaction().add(initializeIx);
    
    console.log('Sending transaction...');
    const signature = await sendAndConfirmTransaction(
      connection, 
      transaction,
      [wallet]
    );
    
    console.log('Transaction successful!');
    console.log('Signature:', signature);
    
    // Check if the account was created
    const accountInfo = await connection.getAccountInfo(globalState);
    console.log('Account created:', accountInfo !== null);
    if (accountInfo) {
      console.log('Account data length:', accountInfo.data.length);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

main(); 