// Stellar SDK helpers for contract interactions
import * as StellarSdk from '@stellar/stellar-sdk';
import { signTransaction } from '@stellar/freighter-api';

const CONTRACT_ID = process.env.NEXT_PUBLIC_CONTRACT_ID || '';
const SOROBAN_RPC_URL = process.env.NEXT_PUBLIC_STELLAR_RPC_URL || 'https://soroban-testnet.stellar.org';
const HORIZON_URL = 'https://horizon-testnet.stellar.org';
const NETWORK_PASSPHRASE = StellarSdk.Networks.TESTNET;


// Validate contract ID format
if (CONTRACT_ID && CONTRACT_ID.length !== 56) {
  throw new Error('Contract ID should be 56 characters long');
}

if (CONTRACT_ID && !CONTRACT_ID.startsWith('C')) {
  throw new Error('Contract ID should start with "C"');
}

// Initialize Stellar Servers  
let sorobanServer: any;
let horizonServer: any;

try {
  // For SDK v13+, use the correct RPC server initialization
  sorobanServer = new StellarSdk.rpc.Server(SOROBAN_RPC_URL);
} catch (e) {
  try {
    // Try alternative server initialization
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
 * Build transaction for contract invocation
 */
async function buildTransaction(
  publicKey: string,
  operation: any
): Promise<StellarSdk.Transaction> {
  
  
  // Use Horizon server to get account info
  const sourceAccount = await horizonServer.loadAccount(publicKey);
  
  // Build initial transaction
  const builtTransaction = new StellarSdk.TransactionBuilder(sourceAccount, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(operation)
    .setTimeout(180)
    .build();

  try {
    // Simulate the transaction
    const simulateResponse = await sorobanServer.simulateTransaction(builtTransaction);
    
    
    // Check for simulation errors
    if (simulateResponse.error) {
      console.error('Simulation error:', simulateResponse.error);
      throw new Error(`Simulation failed: ${simulateResponse.error}`);
    }

    if (simulateResponse.result?.error) {
      console.error('Simulation result error:', simulateResponse.result.error);
      throw new Error(`Contract simulation failed: ${simulateResponse.result.error}`);
    }

    // Properly handle simulation results for transaction assembly
    if (simulateResponse && simulateResponse.result) {
      
      // Get the latest account info for accurate sequence number
      const sourceAccount2 = await horizonServer.loadAccount(publicKey);
      
      // Calculate proper fee from simulation
      const baseFee = parseInt(StellarSdk.BASE_FEE);
      const minResourceFee = simulateResponse.minResourceFee ? parseInt(simulateResponse.minResourceFee) : 0;
      const totalFee = baseFee + minResourceFee;
      
      
      // Build transaction builder
      const txBuilder = new StellarSdk.TransactionBuilder(sourceAccount2, {
        fee: totalFee.toString(),
        networkPassphrase: NETWORK_PASSPHRASE,
      });
      
      // Add operation
      txBuilder.addOperation(operation);
      
      // Add Soroban data if available
      if (simulateResponse.footprint) {
        try {
          const sorobanData = new StellarSdk.SorobanDataBuilder();
          
          if (simulateResponse.footprint.readWrite?.length > 0) {
            sorobanData.setReadWrite(simulateResponse.footprint.readWrite);
          }
          
          if (simulateResponse.footprint.readOnly?.length > 0) {
            sorobanData.setReadOnly(simulateResponse.footprint.readOnly);
          }
            
          if (simulateResponse.resourceFee) {
            sorobanData.setResourceFee(simulateResponse.resourceFee);
          }
          
          txBuilder.setSorobanData(sorobanData.build());
        } catch (sorobanError) {
          console.warn('Failed to add Soroban data, continuing without it:', sorobanError);
        }
      }
      
      const rebuiltTransaction = txBuilder.setTimeout(180).build();
      return rebuiltTransaction;
    }

    return builtTransaction;
  } catch (simulationError) {
    console.warn('Simulation failed, using original transaction:', simulationError);
    return builtTransaction;
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
 * Submit transaction to network
 */
async function submitTransaction(transaction: StellarSdk.Transaction) {
  const response = await sorobanServer.sendTransaction(transaction);
  
  if (response.status === 'PENDING') {
    let getResponse = await sorobanServer.getTransaction(response.hash);
    
    // Poll for result
    while (getResponse.status === 'NOT_FOUND') {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      getResponse = await sorobanServer.getTransaction(response.hash);
    }


    if (getResponse.status === 'SUCCESS') {
      return getResponse.returnValue;
    } else if (getResponse.status === 'FAILED') {
      const resultXdr = getResponse.resultXdr;
      console.error('Transaction failed with result:', resultXdr);
      throw new Error(`Transaction failed: ${resultXdr || 'Unknown error'}`);
    }
  } else if (response.status === 'ERROR') {
    console.error('Transaction error response:', response);
    throw new Error(`Transaction error: ${JSON.stringify(response)}`);
  }

  throw new Error(`Transaction failed with status: ${response.status}`);
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
    if (!CONTRACT_ID) {
      throw new Error('Contract ID is not set. Please check your environment variables.');
    }

    // First test if contract is accessible with a simple read call
    try {
      const testBalance = await getBalance(studentAddress);
    } catch (e) {
      console.error('Contract not accessible:', e);
      throw new Error(`Contract ${CONTRACT_ID} is not accessible or deployed incorrectly. Check your CONTRACT_ID in .env.local`);
    }

    // Validate addresses first
    try {
      StellarSdk.Address.fromString(publicKey);
      StellarSdk.Address.fromString(studentAddress);
    } catch (addressError) {
      console.error('Invalid address format:', addressError);
      throw new Error('Invalid wallet address format');
    }
    
    // Create contract operation
    
    const contract = new StellarSdk.Contract(CONTRACT_ID);
    
    // Build the function arguments - teacher, student, amount
    const args = [
      StellarSdk.Address.fromString(publicKey).toScVal(), // teacher address
      StellarSdk.Address.fromString(studentAddress).toScVal(), // student address  
      StellarSdk.nativeToScVal(amount, { type: 'u32' }) // amount
    ];
    
    
    // Create the operation
    const operation = contract.call('mint_reward', ...args);

    const transaction = await buildTransaction(publicKey, operation);
    
    const signedTx = await signWithFreighter(transaction, publicKey);
    
    const result = await submitTransaction(signedTx);

    return StellarSdk.scValToNative(result);
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
  } catch (error) {
    console.error('getBalance error:', error);
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
    if (!CONTRACT_ID) {
      throw new Error('Contract ID is not set. Please check your environment variables.');
    }

    const contract = new StellarSdk.Contract(CONTRACT_ID);
    
    const operation = contract.call(
      'spend_tokens',
      StellarSdk.Address.fromString(studentAddress).toScVal(),
      StellarSdk.nativeToScVal(amount, { type: 'u32' })
    );

    const transaction = await buildTransaction(publicKey, operation);
    const signedTx = await signWithFreighter(transaction, publicKey);
    const result = await submitTransaction(signedTx);

    return StellarSdk.scValToNative(result);
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
  } catch (error) {
    console.error('getTotalDistributed error:', error);
    return 0;
  }
}

