// Stellar SDK helpers for contract interactions
import * as StellarSdk from '@stellar/stellar-sdk';
import { signTransaction, signAuthEntry } from '@stellar/freighter-api';
import { validateContractId } from './utils/validation';

const CONTRACT_ID = process.env.NEXT_PUBLIC_CONTRACT_ID || '';
const SOROBAN_RPC_URL = process.env.NEXT_PUBLIC_STELLAR_RPC_URL || 'https://soroban-testnet.stellar.org';
const HORIZON_URL = 'https://horizon-testnet.stellar.org';
const NETWORK_PASSPHRASE = StellarSdk.Networks.TESTNET;

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const validation = validateContractId(CONTRACT_ID);
  if (!validation.valid) {
    console.warn('Contract Configuration:', validation.error);
  }
}  
let sorobanServer: any;
let horizonServer: any;

try {
  sorobanServer = new StellarSdk.rpc.Server(SOROBAN_RPC_URL);
} catch (e) {
  try {
    const SorobanRpcServer = (StellarSdk as any).SorobanRpc?.Server;
    if (SorobanRpcServer) {
      sorobanServer = new SorobanRpcServer(SOROBAN_RPC_URL);
    } else {
      throw new Error('SorobanRpc.Server not available');
    }
  } catch (e2) {
    console.error('All Soroban server initialization methods failed:', e2);
    throw new Error('Cannot initialize Soroban server');
  }
}

try {
  horizonServer = new StellarSdk.Horizon.Server(HORIZON_URL);
} catch (e) {
  console.error('Horizon server initialization failed:', e);
  throw new Error('Cannot initialize Horizon server');
}

/**
 * Build and prepare transaction for contract invocation
 * Uses SDK v13's prepareTransaction for proper auth, footprint, and resources
 */
async function buildAndPrepareTransaction(
  publicKey: string,
  operation: any
): Promise<StellarSdk.Transaction> {
  const sourceAccount = await horizonServer.loadAccount(publicKey);
  
  // Build initial transaction with minimal fee
  const builtTransaction = new StellarSdk.TransactionBuilder(sourceAccount, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(operation)
    .setTimeout(180)
    .build();

  // Use SDK's prepareTransaction which handles:
  // - Simulation
  // - Resource calculation
  // - Footprint generation
  // - Auth entries
  try {
    const preparedTransaction = await sorobanServer.prepareTransaction(builtTransaction);
    return preparedTransaction;
  } catch (error: any) {
    console.error('prepareTransaction failed:', error);
    throw new Error(`Failed to prepare transaction: ${error.message || 'Unknown error'}`);
  }
}

/**
 * Sign transaction with Freighter
 */
async function signWithFreighter(
  transaction: StellarSdk.Transaction,
  publicKey: string
): Promise<StellarSdk.Transaction> {
  try {
    const xdr = transaction.toXDR();
    
    const signedXdr = await signTransaction(xdr, {
      network: 'TESTNET',
      networkPassphrase: NETWORK_PASSPHRASE,
      accountToSign: publicKey,
    });

    
    // Handle different response formats from Freighter
    let xdrString: string;
    if (typeof signedXdr === 'string') {
      xdrString = signedXdr;
    } else if ((signedXdr as any).signedTxXdr) {
      xdrString = (signedXdr as any).signedTxXdr;
    } else {
      xdrString = signedXdr as string;
    }
    
    
    const signedTransaction = StellarSdk.TransactionBuilder.fromXDR(
      xdrString,
      NETWORK_PASSPHRASE
    ) as StellarSdk.Transaction;
    
    return signedTransaction;
    
  } catch (signError: any) {
    console.error('Freighter signing failed:', signError);
    throw new Error(`Transaction signing failed: ${signError?.message || 'Unknown signing error'}`);
  }
}

/**
 * Submit transaction and wait for confirmation
 * Uses Horizon API to avoid XDR parsing issues
 */
async function submitTransaction(transaction: StellarSdk.Transaction) {
  try {
    const sendResponse = await sorobanServer.sendTransaction(transaction);
    
    if (sendResponse.status === 'ERROR') {
      console.error('Transaction submission error:', sendResponse);
      throw new Error(`Transaction submission failed`);
    }

    if (sendResponse.status === 'DUPLICATE') {
      throw new Error('Transaction already submitted (duplicate)');
    }

    if (sendResponse.status === 'TRY_AGAIN_LATER') {
      throw new Error('Network busy, please try again later');
    }

    // Transaction submitted, now wait using Horizon API (more stable)
    const hash = sendResponse.hash;
    
    let attempts = 0;
    const maxAttempts = 30;

    // Wait and check via Horizon (more reliable than Soroban RPC getTransaction)
    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      attempts++;
      
      try {
        // Check transaction on Horizon
        const horizonTx = await horizonServer.transactions()
          .transaction(hash)
          .call();
        
        return null; // We'll fetch the actual result from contract
        
      } catch (horizonError: any) {
        // 404 means not found yet, keep waiting
        if (horizonError.response?.status === 404) {
          continue;
        }
        
        // Other errors might indicate failure
        console.warn('Horizon query error:', horizonError.message);
        
        if (attempts >= maxAttempts) {
          return null;
        }
      }
    }

    // Timeout, but transaction might still succeed
    return null;
    
  } catch (error: any) {
    console.error('submitTransaction error:', error);
    throw error;
  }
}

/**
 * Call contract: mint_reward
 */
export async function mintReward(
  publicKey: string,
  studentAddress: string,
  amount: number
): Promise<number> {
  try {
    // Validate contract ID first
    const validation = validateContractId(CONTRACT_ID);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    try {
      const testBalance = await getBalance(studentAddress);
    } catch (e: any) {
      if (e.message && e.message.includes('Contract ID')) {
        throw e;
      }
      console.error('Contract not accessible:', e);
      throw new Error(`Contract is not accessible or not deployed correctly. Please check your CONTRACT_ID in .env.local file.`);
    }

    try {
      StellarSdk.Address.fromString(publicKey);
      StellarSdk.Address.fromString(studentAddress);
    } catch (addressError) {
      console.error('Invalid address format:', addressError);
      throw new Error('Invalid wallet address format');
    }
    
    const contract = new StellarSdk.Contract(CONTRACT_ID);
    
    const args = [
      StellarSdk.Address.fromString(publicKey).toScVal(),
      StellarSdk.Address.fromString(studentAddress).toScVal(),
      StellarSdk.nativeToScVal(amount, { type: 'u32' })
    ];
    
    const operation = contract.call('mint_reward', ...args);

    const transaction = await buildAndPrepareTransaction(publicKey, operation);
    
    const signedTx = await signWithFreighter(transaction, publicKey);
    
    const result = await submitTransaction(signedTx);

    // If result is available, parse it. Otherwise, fetch balance from contract
    if (result) {
      try {
        return StellarSdk.scValToNative(result);
      } catch (parseError) {
        console.warn('Could not parse result, fetching balance from contract:', parseError);
      }
    }
    
    // Fallback: fetch updated balance from contract
    const updatedBalance = await getBalance(studentAddress);
    return updatedBalance;
  } catch (error) {
    console.error('mintReward error:', error);
    throw error;
  }
}

/**
 * Call contract: get_balance
 */
export async function getBalance(studentAddress: string): Promise<number> {
  try {
    // Validate contract ID first
    const validation = validateContractId(CONTRACT_ID);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    const contract = new StellarSdk.Contract(CONTRACT_ID);
    
    const result = await sorobanServer.simulateTransaction(
      new StellarSdk.TransactionBuilder(
        new StellarSdk.Account(
          'GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF',
          '0'
        ),
        { fee: StellarSdk.BASE_FEE, networkPassphrase: NETWORK_PASSPHRASE }
      )
        .addOperation(
          contract.call(
            'get_balance',
            StellarSdk.Address.fromString(studentAddress).toScVal()
          )
        )
        .setTimeout(30)
        .build()
    );

    if (result.result) {
      return StellarSdk.scValToNative(result.result.retval);
    }

    return 0;
  } catch (error: any) {
    console.error('getBalance error:', error);
    if (error.message && error.message.includes('Contract ID')) {
      throw error;
    }
    return 0;
  }
}

/**
 * Call contract: spend_tokens
 */
export async function spendTokens(
  publicKey: string,
  studentAddress: string,
  amount: number
): Promise<number> {
  try {
    // Validate contract ID first
    const validation = validateContractId(CONTRACT_ID);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    const contract = new StellarSdk.Contract(CONTRACT_ID);
    
    const operation = contract.call(
      'spend_tokens',
      StellarSdk.Address.fromString(studentAddress).toScVal(),
      StellarSdk.nativeToScVal(amount, { type: 'u32' })
    );

    const transaction = await buildAndPrepareTransaction(publicKey, operation);
    const signedTx = await signWithFreighter(transaction, publicKey);
    const result = await submitTransaction(signedTx);

    // If result is available, parse it. Otherwise, fetch balance from contract
    if (result) {
      try {
        return StellarSdk.scValToNative(result);
      } catch (parseError) {
        console.warn('Could not parse result, fetching balance from contract:', parseError);
      }
    }
    
    // Fallback: fetch updated balance from contract
    const updatedBalance = await getBalance(studentAddress);
    return updatedBalance;
  } catch (error) {
    console.error('spendTokens error:', error);
    throw error;
  }
}

/**
 * Call contract: get_total_distributed
 */
export async function getTotalDistributed(): Promise<number> {
  try {
    // Validate contract ID first
    const validation = validateContractId(CONTRACT_ID);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    const contract = new StellarSdk.Contract(CONTRACT_ID);
    
    const result = await sorobanServer.simulateTransaction(
      new StellarSdk.TransactionBuilder(
        new StellarSdk.Account(
          'GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF',
          '0'
        ),
        { fee: StellarSdk.BASE_FEE, networkPassphrase: NETWORK_PASSPHRASE }
      )
        .addOperation(contract.call('get_total_distributed'))
        .setTimeout(30)
        .build()
    );

    if (result.result) {
      return StellarSdk.scValToNative(result.result.retval);
    }

    return 0;
  } catch (error: any) {
    console.error('getTotalDistributed error:', error);
    if (error.message && error.message.includes('Contract ID')) {
      throw error;
    }
    return 0;
  }
}
