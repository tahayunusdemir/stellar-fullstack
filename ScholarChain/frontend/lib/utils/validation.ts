/**
 * Validation utilities for contract and address validation
 */

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validate Stellar contract ID format
 */
export function validateContractId(contractId: string): ValidationResult {
  if (!contractId || contractId.trim() === '') {
    return { 
      valid: false, 
      error: '⚠️ Contract ID is not defined!\n\nPlease follow these steps:\n1. Deploy the smart contract\n2. Open .env.local file\n3. Set NEXT_PUBLIC_CONTRACT_ID with your contract ID\n4. Restart the application (npm run dev)' 
    };
  }
  
  if (contractId === 'your_contract_id_here') {
    return {
      valid: false,
      error: '⚠️ Please replace NEXT_PUBLIC_CONTRACT_ID value in .env.local with your actual contract ID!'
    };
  }
  
  if (contractId.length !== 56) {
    return { 
      valid: false, 
      error: `Contract ID must be 56 characters. Current: ${contractId.length} characters` 
    };
  }
  
  if (!contractId.startsWith('C')) {
    return { 
      valid: false, 
      error: 'Contract ID must start with "C"' 
    };
  }
  
  return { valid: true };
}

/**
 * Validate Stellar address format
 */
export function validateStellarAddress(address: string): ValidationResult {
  if (!address || address.trim() === '') {
    return {
      valid: false,
      error: 'Address is required'
    };
  }

  if (!address.startsWith('G')) {
    return {
      valid: false,
      error: 'Stellar address must start with "G"'
    };
  }

  if (address.length !== 56) {
    return {
      valid: false,
      error: 'Stellar address must be 56 characters'
    };
  }

  return { valid: true };
}

/**
 * Format wallet address for display
 */
export function formatWalletAddress(address: string, startChars = 16, endChars = 16): string {
  if (address.length <= startChars + endChars) {
    return address;
  }
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

