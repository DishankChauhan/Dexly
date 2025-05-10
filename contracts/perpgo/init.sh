#!/bin/bash
solana config set --url https://api.devnet.solana.com
solana config set -k ./devnet-wallet.json
echo "Current balance: $(solana balance) SOL"
PROGRAM_ID="Eu1XQLF5MewmRJ2VeBms2NtU2vkuamX3KtQ9mEhntucP"
ORACLE="J83w4HKfqxwcq3BEMMkPFSppX3gqekLyLJBexebFVkix"
ADMIN=$(solana address)
echo "Program ID: $PROGRAM_ID"
echo "Admin: $ADMIN"
echo "Oracle: $ORACLE"
echo "Running initialization script..."
npx ts-node scripts/initialize.ts
