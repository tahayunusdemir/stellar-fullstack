#!/bin/bash

# ScholarChain Environment Setup Script
# This script automatically creates the .env.local file

echo ""
echo "ScholarChain Environment Setup"
echo "================================="
echo ""

ENV_FILE=".env.local"

# Check if .env.local already exists
if [ -f "$ENV_FILE" ]; then
    echo "⚠️  .env.local file already exists!"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo ""
    
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Operation cancelled."
        exit 1
    fi
fi

# Ask for Contract ID
echo ""
echo "Please enter your Stellar Soroban Contract ID:"
echo "   (If you haven't deployed yet, press Enter - you can edit it later)"
read -p "Contract ID: " CONTRACT_ID

if [ -z "$CONTRACT_ID" ]; then
    CONTRACT_ID=""
    echo "⚠️  Contract ID left empty. Edit .env.local file later."
fi

# Ask for RPC URL
echo ""
echo "Select Stellar RPC URL:"
echo "   1. Testnet (default)"
echo "   2. Mainnet"
read -p "Choice (1/2): " RPC_CHOICE

if [ "$RPC_CHOICE" = "2" ]; then
    RPC_URL="https://soroban-mainnet.stellar.org"
else
    RPC_URL="https://soroban-testnet.stellar.org"
fi

# Create .env.local content
cat > "$ENV_FILE" << EOF
# Stellar Soroban Smart Contract Configuration
# ============================================
# This file was automatically generated

# Contract ID - Write here after deployment (56-character ID starting with C)
NEXT_PUBLIC_CONTRACT_ID=$CONTRACT_ID

# Stellar Network Configuration
NEXT_PUBLIC_STELLAR_RPC_URL=$RPC_URL

# Note: If you haven't deployed your Contract ID yet:
# 1. Build the smart contract: 
#    cd ../contracts/scholar_chain
#    cargo build --target wasm32-unknown-unknown --release
#
# 2. Deploy with Stellar CLI: 
#    stellar contract deploy --wasm target/wasm32-unknown-unknown/release/scholar_chain.wasm --network testnet
#
# 3. Paste the Contract ID you received into the NEXT_PUBLIC_CONTRACT_ID variable above
# 4. Restart the dev server: npm run dev
EOF

echo ""
echo "✅ .env.local file successfully created!"
echo ""
echo "File contents:"
echo "─────────────────"
cat "$ENV_FILE"
echo "─────────────────"
echo ""

if [ -z "$CONTRACT_ID" ]; then
    echo "⚠️  WARNING: Contract ID is empty!"
    echo ""
    echo "Next steps:"
    echo "   1. Deploy your smart contract"
    echo "   2. Open .env.local file and add the CONTRACT_ID"
    echo "   3. Restart the development server (npm run dev)"
else
    echo "✅ You're ready! Start the development server:"
    echo "   npm run dev"
fi

echo ""
echo "For more information, see DEPLOYMENT_GUIDE.md file."
echo ""

