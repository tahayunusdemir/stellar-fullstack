# ScholarChain Environment Setup Script
# This script automatically creates the .env.local file

Write-Host "ScholarChain Environment Setup" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

$envFile = ".env.local"

# Check if .env.local already exists
if (Test-Path $envFile) {
    Write-Host "⚠️  .env.local file already exists!" -ForegroundColor Yellow
    $response = Read-Host "Do you want to overwrite it? (y/N)"
    
    if ($response -ne "y" -and $response -ne "Y") {
        Write-Host "Operation cancelled." -ForegroundColor Red
        exit
    }
}

# Ask for Contract ID
Write-Host ""
Write-Host "Please enter your Stellar Soroban Contract ID:" -ForegroundColor Green
Write-Host "   (If you haven't deployed yet, press Enter - you can edit it later)" -ForegroundColor Gray
$contractId = Read-Host "Contract ID"

if ([string]::IsNullOrWhiteSpace($contractId)) {
    $contractId = ""
    Write-Host "⚠️  Contract ID left empty. Edit .env.local file later." -ForegroundColor Yellow
}

# Ask for RPC URL
Write-Host ""
Write-Host "Select Stellar RPC URL:" -ForegroundColor Green
Write-Host "   1. Testnet (default)" -ForegroundColor Gray
Write-Host "   2. Mainnet" -ForegroundColor Gray
$rpcChoice = Read-Host "Choice (1/2)"

if ($rpcChoice -eq "2") {
    $rpcUrl = "https://soroban-mainnet.stellar.org"
} else {
    $rpcUrl = "https://soroban-testnet.stellar.org"
}

# Create .env.local content
$envContent = @"
# Stellar Soroban Smart Contract Configuration
# ============================================
# This file was automatically generated

# Contract ID - Write here after deployment (56-character ID starting with C)
NEXT_PUBLIC_CONTRACT_ID=$contractId

# Stellar Network Configuration
NEXT_PUBLIC_STELLAR_RPC_URL=$rpcUrl

# Note: If you haven't deployed your Contract ID yet:
# 1. Build the smart contract: 
#    cd ..\contracts\scholar_chain
#    cargo build --target wasm32-unknown-unknown --release
#
# 2. Deploy with Stellar CLI: 
#    stellar contract deploy --wasm target/wasm32-unknown-unknown/release/scholar_chain.wasm --network testnet
#
# 3. Paste the Contract ID you received into the NEXT_PUBLIC_CONTRACT_ID variable above
# 4. Restart the dev server: npm run dev
"@

# Write to file
$envContent | Out-File -FilePath $envFile -Encoding UTF8

Write-Host ""
Write-Host "✅ .env.local file successfully created!" -ForegroundColor Green
Write-Host ""
Write-Host "File contents:" -ForegroundColor Cyan
Write-Host "─────────────────" -ForegroundColor Gray
Write-Host $envContent -ForegroundColor White
Write-Host "─────────────────" -ForegroundColor Gray
Write-Host ""

if ([string]::IsNullOrWhiteSpace($contractId)) {
    Write-Host "⚠️  WARNING: Contract ID is empty!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "   1. Deploy your smart contract" -ForegroundColor White
    Write-Host "   2. Open .env.local file and add the CONTRACT_ID" -ForegroundColor White
    Write-Host "   3. Restart the development server (npm run dev)" -ForegroundColor White
} else {
    Write-Host "✅ You're ready! Start the development server:" -ForegroundColor Green
    Write-Host "   npm run dev" -ForegroundColor White
}

Write-Host ""
Write-Host "For more information, see DEPLOYMENT_GUIDE.md file." -ForegroundColor Gray
Write-Host ""

