const anchor = require("@coral-xyz/anchor");
const { web3, BN, Program, Wallet } = anchor;
const { PublicKey, Keypair, SystemProgram, Connection } = web3;
const { TOKEN_PROGRAM_ID } = require("@solana/spl-token");
const fs = require("fs");
const assert = require("assert");

// Load IDL and wallet
const idl = JSON.parse(fs.readFileSync("./perps.json", "utf8"));
const walletKeypair = Keypair.fromSecretKey(
  Uint8Array.from(JSON.parse(fs.readFileSync("./devnet-wallet.json", "utf8")))
);

// Constants
const PROGRAM_ID = new PublicKey("5YTxWRCWmTsy8JWCncwwKRKQguaigqNXxsDZLAqEJ7LB");

// Global variables for connection, wallet, provider and program
let connection;
let wallet;
let provider;
let program;

async function main() {
  console.log("🚀 Starting Perps Protocol Client...");
  
  // Configure connection and provider
  connection = new Connection("http://localhost:8899", "confirmed");
  wallet = new Wallet(walletKeypair);
  provider = new anchor.AnchorProvider(connection, wallet, {
    commitment: "confirmed",
    preflightCommitment: "confirmed",
  });
  
  // Initialize the program
  program = new Program(idl, PROGRAM_ID, provider);
  console.log("✅ Connected to program:", PROGRAM_ID.toString());
  
  // Test functions
  await queryGlobalState();
  await queryMarkets();
  await queryUsers();
  
  console.log("✅ Client run completed successfully");
}

// Query global state
async function queryGlobalState() {
  try {
    console.log("\n📊 Querying Global State...");
    
    // Find global state PDA
    const [globalStatePDA] = await PublicKey.findProgramAddress(
      [Buffer.from("global_state")],
      program.programId
    );
    
    console.log("Global state PDA:", globalStatePDA.toString());
    
    try {
      const globalState = await program.account.globalState.fetch(globalStatePDA);
      console.log("  Admin:", globalState.admin.toString());
      console.log("  Protocol Fee:", globalState.protocolFeeBps, "bps");
      console.log("  Total Volume:", globalState.totalVolume.toString(), "units");
      console.log("  Total Fees:", globalState.totalFees.toString(), "units");
      console.log("  Emergency Paused:", globalState.emergencyPaused);
    } catch (err) {
      console.log("  Global state not initialized yet:", err.message);
      
      // Try to initialize global state
      console.log("  Initializing global state...");
      try {
        const tx = await program.methods
          .initializeGlobalState()
          .accounts({
            globalState: globalStatePDA,
            admin: wallet.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();
        console.log("  Global state initialized with tx:", tx);
        
        // Fetch again
        const globalState = await program.account.globalState.fetch(globalStatePDA);
        console.log("  Admin:", globalState.admin.toString());
        console.log("  Protocol Fee:", globalState.protocolFeeBps, "bps");
      } catch (initErr) {
        console.log("  Failed to initialize global state:", initErr.message);
      }
    }
  } catch (err) {
    console.error("Error querying global state:", err);
  }
}

// Query markets
async function queryMarkets() {
  try {
    console.log("\n📈 Querying Markets...");
    const markets = await program.account.market.all();
    
    if (markets.length === 0) {
      console.log("  No markets found");
      
      // Try to initialize a market
      console.log("  Attempting to initialize a market...");
      
      const marketId = new BN(1);
      const [marketPDA] = await PublicKey.findProgramAddress(
        [Buffer.from("market"), marketId.toArrayLike(Buffer, "le", 8)],
        program.programId
      );
      
      // Find global state PDA
      const [globalStatePDA] = await PublicKey.findProgramAddress(
        [Buffer.from("global_state")],
        program.programId
      );
      
      // Create a dummy oracle account
      const oracleKeypair = Keypair.generate();
      
      try {
        // Create oracle account
        const rentExemptBalance = await connection.getMinimumBalanceForRentExemption(100);
        const createOracleTx = new web3.Transaction().add(
          SystemProgram.createAccount({
            fromPubkey: wallet.publicKey,
            newAccountPubkey: oracleKeypair.publicKey,
            space: 100,
            lamports: rentExemptBalance,
            programId: SystemProgram.programId,
          })
        );
        
        await provider.sendAndConfirm(createOracleTx, [oracleKeypair]);
        console.log("  Created dummy oracle account:", oracleKeypair.publicKey.toString());
        
        // Initialize market
        const assetSymbol = Array.from(Buffer.from("BTC     ", "utf-8"));
        const maxLeverage = 10;
        const minMarginRatioBps = 500; // 5%
        const feeBps = 10; // 0.1%
        const oracleType = 1; // Mock oracle
        const minPositionSize = new BN(100000);
        
        const tx = await program.methods
          .initializeMarket(
            assetSymbol,
            marketId,
            oracleType,
            maxLeverage,
            minMarginRatioBps,
            feeBps,
            minPositionSize
          )
          .accounts({
            market: marketPDA,
            oracle: oracleKeypair.publicKey,
            authority: wallet.publicKey,
            globalState: globalStatePDA,
            admin: wallet.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();
        
        console.log("  Market initialized with tx:", tx);
        
        // Fetch the newly created market
        const newMarkets = await program.account.market.all();
        for (const market of newMarkets) {
          console.log("  Market:", market.publicKey.toString());
          console.log("    Asset:", Buffer.from(market.account.assetSymbol).toString("utf-8").trim());
          console.log("    Oracle:", market.account.oracle.toString());
          console.log("    Max Leverage:", market.account.maxLeverage, "x");
          console.log("    Fee:", market.account.feeBps, "bps");
          console.log("    Active:", market.account.isActive);
        }
      } catch (err) {
        console.log("  Failed to initialize market:", err.message);
      }
    } else {
      // Print existing markets
      for (const market of markets) {
        console.log("  Market:", market.publicKey.toString());
        console.log("    Asset:", Buffer.from(market.account.assetSymbol).toString("utf-8").trim());
        console.log("    Oracle:", market.account.oracle.toString());
        console.log("    Max Leverage:", market.account.maxLeverage, "x");
        console.log("    Fee:", market.account.feeBps, "bps");
        console.log("    Active:", market.account.isActive);
      }
    }
  } catch (err) {
    console.error("Error querying markets:", err);
  }
}

// Query users
async function queryUsers() {
  try {
    console.log("\n👤 Querying Users...");
    const users = await program.account.user.all();
    
    if (users.length === 0) {
      console.log("  No users found");
      
      // Try to create a user account for our wallet
      console.log("  Attempting to create a user account...");
      
      const [userAccountPDA] = await PublicKey.findProgramAddress(
        [Buffer.from("user"), wallet.publicKey.toBuffer()],
        program.programId
      );
      
      try {
        const tx = await program.methods
          .createUser()
          .accounts({
            userAccount: userAccountPDA,
            user: wallet.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();
        
        console.log("  User account created with tx:", tx);
        
        // Fetch the newly created user
        const newUsers = await program.account.user.all();
        for (const user of newUsers) {
          console.log("  User:", user.publicKey.toString());
          console.log("    Owner:", user.account.user.toString());
          console.log("    Collateral Balance:", user.account.collateralBalance.toString(), "units");
          console.log("    Open Positions:", user.account.openPositions);
        }
      } catch (err) {
        console.log("  Failed to create user account:", err.message);
      }
    } else {
      // Print existing users
      for (const user of users) {
        console.log("  User:", user.publicKey.toString());
        console.log("    Owner:", user.account.user.toString());
        console.log("    Collateral Balance:", user.account.collateralBalance.toString(), "units");
        console.log("    Open Positions:", user.account.openPositions);
      }
    }
  } catch (err) {
    console.error("Error querying users:", err);
  }
}

// Run the main function
main().then(
  () => process.exit(),
  err => {
    console.error("Failed to run client:", err);
    process.exit(-1);
  }
); 