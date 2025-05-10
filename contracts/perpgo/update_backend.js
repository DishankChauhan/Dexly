#!/usr/bin/env node

/**
 * This script updates the backend code with information from the IDL file 
 * generated after contract deployment.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths
const idlPath = path.resolve(__dirname, 'target/idl/perpgo.json');
const backendSolanaPath = path.resolve(__dirname, '../../backend/src/solana.rs');

// Check if IDL file exists
if (!fs.existsSync(idlPath)) {
  console.error('Error: IDL file not found.');
  console.error('Make sure to deploy the contract first using deploy.sh');
  process.exit(1);
}

// Read the IDL file
const idl = JSON.parse(fs.readFileSync(idlPath, 'utf8'));
const programId = idl.metadata.address;

// Read the backend solana.rs file
let solanaRs = fs.readFileSync(backendSolanaPath, 'utf8');

// Update the program ID
solanaRs = solanaRs.replace(
  /const PROGRAM_ID: &str = "[^"]*";/,
  `const PROGRAM_ID: &str = "${programId}";`
);

// Find instruction discriminators
const discriminators = {};

// Get all instructions and their accounts from the IDL
idl.instructions.forEach(instruction => {
  const name = instruction.name;
  
  // Use Anchor SDK to compute the discriminator
  // This is a simplified representation - in production you would use @project-serum/anchor
  // to calculate the actual discriminator hash
  const discriminator = Buffer.from(
    // This is a placeholder that mimics how Anchor creates discriminators
    // For actual implementation, you'd use the proper Anchor SDK function
    execSync(`anchor account-discriminator ${name}`).toString().trim(), 
    'hex'
  );
  
  discriminators[name] = discriminator;
});

// Update instruction discriminators in the solana.rs file
Object.entries(discriminators).forEach(([name, discriminator]) => {
  // Convert name to snake_case if it's in camelCase
  const snakeName = name.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  
  // Update the discriminator in the InstructionData impl
  const regex = new RegExp(`// Discriminator for '${snakeName}'[^\\]]*\\]`);
  
  // Format the discriminator as hex bytes array
  const discriminatorHex = Array.from(discriminator)
    .map(b => b.toString(16).padStart(2, '0'))
    .join(', ');
  
  solanaRs = solanaRs.replace(
    regex,
    `// Discriminator for '${snakeName}'\n        [${discriminatorHex}]`
  );
});

// Write back to the file
fs.writeFileSync(backendSolanaPath, solanaRs);

console.log('Backend code updated with new program ID and instruction discriminators.');
console.log('Program ID:', programId);
console.log('Remember to test the interactions between the backend and the deployed contract!'); 