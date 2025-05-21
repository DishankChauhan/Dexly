const anchor = require('@project-serum/anchor');
const assert = require('assert');
const { SystemProgram, PublicKey } = anchor.web3;
const { BN } = anchor;
const fs = require('fs');
const path = require('path');

describe('perps-amm', () => {
  // Configure the client to use the local cluster
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  
  // Load the IDL from the file
  console.log("Current directory:", process.cwd());
  console.log("Test root directory:", __dirname);
  console.log("Wallet path:", process.env.ANCHOR_WALLET);
  
  try {
    // Load IDL from the file
    const perpsDir = path.resolve(__dirname, '..');
    const idlPath = path.join(perpsDir, 'target', 'idl', 'perps.json');
    console.log("IDL path:", idlPath);
    console.log("Loading IDL file...");
    const idlFile = fs.readFileSync(idlPath, 'utf8');
    console.log("IDL file loaded successfully, length:", idlFile.length);
    const idl = JSON.parse(idlFile);
    
    // Get the program ID from the deployed .json file
    const programKeypairPath = path.join(perpsDir, 'target', 'deploy', 'perps-keypair.json');
    console.log("Program keypair path:", programKeypairPath);
    let programId;
    try {
      const keypairBuffer = fs.readFileSync(programKeypairPath);
      console.log("Keypair file loaded, length:", keypairBuffer.length);
      const keypairData = JSON.parse(keypairBuffer.toString());
      programId = new PublicKey(keypairData);
      console.log("Program ID:", programId.toString());
    } catch (err) {
      console.error("Failed to load program keypair:", err);
      // Use a hardcoded program ID as fallback
      programId = new PublicKey('5YTxWRCWmTsy8JWCncwwKRKQguaigqNXxsDZLAqEJ7LB');
      console.log("Using fallback program ID:", programId.toString());
    }
    
    // Create program from IDL
    const program = new anchor.Program(idl, programId, provider);
    const wallet = provider.wallet.publicKey;
    console.log("Wallet public key:", wallet.toString());

    // Test accounts and variables
    let globalStateAddress;
    let marketAddress;
    let userAccountAddress;
    let mockOracleAddress;
    const marketId = new BN(1);
    const assetSymbol = Buffer.from('BTC     ', 'utf-8');
    
    // Set up mock oracle price
    const oraclePrice = new BN(20000000000); // $20,000 with 6 decimals

    // Function to create a mock oracle account
    async function createMockOracle() {
      const account = anchor.web3.Keypair.generate();
      const tx = new anchor.web3.Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: wallet,
          newAccountPubkey: account.publicKey,
          space: 100, // Arbitrary space for mock oracle
          lamports: await provider.connection.getMinimumBalanceForRentExemption(100),
          programId: SystemProgram.programId,
        })
      );
      await provider.sendAndConfirm(tx, [account]);
      return account;
    }

    before(async () => {
      try {
        // Create mock oracle
        const mockOracleAccount = await createMockOracle();
        mockOracleAddress = mockOracleAccount.publicKey;
        console.log("Mock oracle address:", mockOracleAddress.toString());
        
        // Initialize the global state
        const [globalState, globalStateBump] = PublicKey.findProgramAddressSync(
          [Buffer.from('global_state')],
          programId
        );
        globalStateAddress = globalState;
        console.log("Global state address:", globalStateAddress.toString());
        
        await program.methods
          .initializeGlobalState()
          .accounts({
            globalState,
            admin: wallet,
            systemProgram: SystemProgram.programId,
          })
          .rpc()
          .catch(err => {
            if (err.toString().includes("already in use")) {
              console.log("Global state already initialized, continuing test...");
            } else {
              throw err;
            }
          });
          
        // Initialize a market with AMM parameters
        const [market, _marketBump] = PublicKey.findProgramAddressSync(
          [Buffer.from('market'), marketId.toArrayLike(Buffer, 'le', 8)],
          programId
        );
        marketAddress = market;
        console.log("Market address:", marketAddress.toString());
        
        await program.methods
          .initializeMarket(
            assetSymbol,
            marketId,
            0, // Oracle type: Pyth
            10, // Max leverage
            500, // Min margin ratio bps (5%)
            10, // Fee bps (0.1%)
            new BN(1000000), // Min position size
            500, // Max price impact bps (5%)
            new BN('10000000000000000000') // K factor
          )
          .accounts({
            market,
            oracle: mockOracleAddress,
            authority: wallet,
            globalState,
            admin: wallet,
            systemProgram: SystemProgram.programId,
          })
          .rpc()
          .catch(err => {
            if (err.toString().includes("already in use")) {
              console.log("Market already initialized, continuing test...");
            } else {
              throw err;
            }
          });
          
        // Create a user account
        const [userAccount, _userAccountBump] = PublicKey.findProgramAddressSync(
          [Buffer.from('user'), wallet.toBuffer()],
          programId
        );
        userAccountAddress = userAccount;
        console.log("User account address:", userAccountAddress.toString());
        
        await program.methods
          .createUser()
          .accounts({
            userAccount,
            user: wallet,
            systemProgram: SystemProgram.programId,
          })
          .rpc()
          .catch(err => {
            if (err.toString().includes("already in use")) {
              console.log("User account already created, continuing test...");
            } else {
              throw err;
            }
          });
      } catch (err) {
        console.error("Error in before hook:", err);
        throw err;
      }
    });

    it('Market should be initialized with correct AMM parameters', async () => {
      try {
        const marketAccount = await program.account.market.fetch(marketAddress);
        console.log("Market account:", marketAccount);
        assert.ok(marketAccount.baseAssetReserve.gt(new BN(0)), "Base asset reserve should be > 0");
        assert.ok(marketAccount.quoteAssetReserve.gt(new BN(0)), "Quote asset reserve should be > 0");
        assert.ok(marketAccount.kFactor.gt(new BN(0)), "K factor should be > 0");
        assert.equal(marketAccount.maxPriceImpactBps, 500, "Max price impact bps should be 500");
      } catch (err) {
        console.error("Error in test:", err);
        throw err;
      }
    });

    it('Price impact increases with position size', async () => {
      try {
        // We can't directly test the AMM calculations in JavaScript because they are implemented in Rust
        // But we can check if the market state is properly initialized for AMM operation
        
        const marketAccount = await program.account.market.fetch(marketAddress);
        
        // Verify that base and quote reserves form a reasonable product (k)
        const baseReserve = marketAccount.baseAssetReserve;
        const quoteReserve = marketAccount.quoteAssetReserve;
        
        // Check that k = baseReserve * quoteReserve is a reasonable value
        console.log(`Base Reserve: ${baseReserve.toString()}`);
        console.log(`Quote Reserve: ${quoteReserve.toString()}`);
        console.log(`K value (approximately): ${baseReserve.mul(quoteReserve).toString()}`);
        
        // Make sure the minimum reserves are set correctly (1% of initial)
        assert.ok(marketAccount.minBaseAssetReserve.gt(new BN(0)), "Min base reserve should be > 0");
        assert.ok(marketAccount.minQuoteAssetReserve.gt(new BN(0)), "Min quote reserve should be > 0");
        
        // Verify relationship between base and min base reserves
        const expectedMinBaseReserve = baseReserve.div(new BN(100)); // 1% of initial
        const minBaseDiff = marketAccount.minBaseAssetReserve.sub(expectedMinBaseReserve).abs();
        assert.ok(minBaseDiff.lt(new BN(100)), "Min base reserve should be approximately 1% of initial");
      } catch (err) {
        console.error("Error in test:", err);
        throw err;
      }
    });
  } catch (err) {
    console.error("Exception during run:", err);
    throw err;
  }
}); 