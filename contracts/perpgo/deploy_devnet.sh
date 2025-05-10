#!/bin/bash

# Deploy script for PerpGo Solana contract to devnet

echo "Building and deploying PerpGo contract to Solana devnet..."

# Make sure Anchor is installed
if ! command -v anchor &> /dev/null; then
    echo "Anchor not found. Please install it with: 'cargo install anchor-cli'"
    exit 1
fi

# Make sure Solana CLI is installed
if ! command -v solana &> /dev/null; then
    echo "Solana CLI not found. Please install it."
    exit 1
fi

# Check if we're on devnet, if not switch to it
CURRENT_NETWORK=$(solana config get | grep "RPC URL" | awk '{print $3}')
if [[ "$CURRENT_NETWORK" != *"devnet"* ]]; then
    echo "Switching to devnet..."
    solana config set --url https://api.devnet.solana.com
fi

# Check account balance
BALANCE=$(solana balance | awk '{print $1}')
echo "Current account balance: $BALANCE SOL"

if (( $(echo "$BALANCE < 1" | bc -l) )); then
    echo "Low balance, requesting airdrop..."
    solana airdrop 2
    sleep 2
    echo "New balance: $(solana balance | awk '{print $1}') SOL"
fi

# Define Pyth price feed for SOL/USD on devnet
SOL_USD_DEVNET="J83w4HKfqxwcq3BEMMkPFSppX3gqekLyLJBexebFVkix"

# Update the Anchor.toml file to use devnet
echo "Updating Anchor.toml for devnet deployment..."
cat > Anchor.toml << EOF
[features]
seeds = false
skip-lint = false

[programs.devnet]
perpgo = "Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS"

[registry]
url = "https://api.apr.dev"

[provider]
cluster = "devnet"
wallet = "$(solana config get | grep "Keypair Path" | awk '{print $3}')"

[scripts]
test = "yarn run ts-mocha -p ./tsconfig.json -t 1000000 tests/**/*.ts"
EOF

# Build the program
echo "Building program..."
anchor build

# Get the program ID from the keypair
PROGRAM_ID=$(solana-keygen pubkey target/deploy/perpgo-keypair.json)
echo "Program ID: $PROGRAM_ID"

# Update the program ID in lib.rs
echo "Updating program ID in lib.rs..."
sed -i '' "s/declare_id!(\"[^\"]*\")/declare_id!(\"$PROGRAM_ID\")/" programs/perpgo/src/lib.rs

# Update any test files if they exist
if [ -f tests/perpgo.ts ]; then
    sed -i '' "s/declare_id!(\"[^\"]*\")/declare_id!(\"$PROGRAM_ID\")/" tests/perpgo.ts
fi

# Update Anchor.toml again with the correct program ID
sed -i '' "s/perpgo = \"[^\"]*\"/perpgo = \"$PROGRAM_ID\"/" Anchor.toml

# Rebuild with updated program ID
echo "Rebuilding with updated program ID..."
anchor build

# Deploy the program to devnet
echo "Deploying program to devnet..."
anchor deploy

# Generate IDL
echo "Generating IDL file..."
anchor idl init --filepath target/idl/perpgo.json $PROGRAM_ID

# Initialize the program
echo "Initializing program with SOL/USD Pyth oracle..."
ts-node scripts/initialize.ts $PROGRAM_ID $SOL_USD_DEVNET

echo ""
echo "Deployment to devnet completed!"
echo "Program ID: $PROGRAM_ID"
echo "Pyth Oracle (SOL/USD): $SOL_USD_DEVNET"
echo ""
echo "Next steps:"
echo "1. Update the PROGRAM_ID constant in backend/src/solana.rs"
echo "2. Run the update_backend.js script to update all backend code"
echo "3. Test the full integration on devnet" 