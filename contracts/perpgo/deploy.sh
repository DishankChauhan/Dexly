#!/bin/bash

# Deploy script for PerpGo Solana contract

echo "Building and deploying PerpGo contract..."

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

# Check Solana network configuration
NETWORK=$(solana config get | grep "RPC URL" | awk '{print $3}')
echo "Deploying to network: $NETWORK"

# Build the program
echo "Building program..."
anchor build

# Get the program ID from the keypair
PROGRAM_ID=$(solana-keygen pubkey target/deploy/perpgo-keypair.json)
echo "Program ID: $PROGRAM_ID"

# Update the program ID in lib.rs
echo "Updating program ID in lib.rs..."
sed -i '' "s/declare_id!(\"[^\"]*\")/declare_id!(\"$PROGRAM_ID\")/" programs/perpgo/src/lib.rs
sed -i '' "s/declare_id!(\"[^\"]*\")/declare_id!(\"$PROGRAM_ID\")/" tests/perpgo.ts

# Update Anchor.toml
echo "Updating Anchor.toml..."
sed -i '' "s/perpgo = \"[^\"]*\"/perpgo = \"$PROGRAM_ID\"/" Anchor.toml

# Rebuild with updated program ID
echo "Rebuilding with updated program ID..."
anchor build

# Deploy the program
echo "Deploying program..."
anchor deploy

# Generate IDL
echo "Generating IDL file..."
anchor idl init --filepath target/idl/perpgo.json $PROGRAM_ID

echo ""
echo "Deployment completed!"
echo "Program ID: $PROGRAM_ID"
echo ""
echo "Next steps:"
echo "1. Update the PROGRAM_ID constant in backend/src/solana.rs"
echo "2. Update instruction discriminators in backend/src/solana.rs using values from target/idl/perpgo.json"
echo "3. Test interactions on the selected network" 