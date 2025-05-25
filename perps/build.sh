#!/bin/bash
set -e

# Clean build artifacts
cargo clean

# Export env variables to optimize BPF compilation
export RUSTFLAGS="-C target-cpu=native -C link-arg=-s -C overflow-checks=off -C force-frame-pointers=no"

# Set aggressive optimization flags for the BPF compiler
export BPF_OUT_DIR=$(pwd)/target/deploy
export ANCHOR_OPTED_COMPILER=1 

# Use the newest Solana version of Solana's BPF compiler
export SOLANA_VERSION=stable

# Build with anchor
anchor build

echo "Build completed!" 