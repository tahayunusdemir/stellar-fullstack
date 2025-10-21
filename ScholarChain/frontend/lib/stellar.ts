// Stellar SDK helpers for contract interactions
import * as StellarSdk from '@stellar/stellar-sdk';
import { signTransaction } from '@stellar/freighter-api';

const CONTRACT_ID = process.env.NEXT_PUBLIC_CONTRACT_ID || '';
const RPC_URL = process.env.NEXT_PUBLIC_STELLAR_RPC_URL || 'https://soroban-testnet.stellar.org';
const NETWORK_PASSPHRASE = StellarSdk.Networks.TESTNET;

// Initialize Stellar Server
const server = new StellarSdk.SorobanRpc.Server(RPC_URL);

/**
 * Build and sign a contract transaction
 */
async function buildTransaction(
  publicKey: string,
  operation: StellarSdk.xdr.Operation
): Promise<StellarSdk.Transaction> {
  const sourceAccount = await server.getAccount(publicKey);
  
  const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(operation)
    .setTimeout(30)
    .build();

  return transaction;
}

/**
 * Sign transaction with Freighter
 */
async function signWithFreighter(
  transaction: StellarSdk.Transaction,
  publicKey: string
): Promise<StellarSdk.Transaction> {
  const xdr = transaction.toXDR();
  
  const signedXdr = await signTransaction(xdr, {
    network: 'TESTNET',
    networkPassphrase: NETWORK_PASSPHRASE,
    accountToSign: publicKey,
  });

  return StellarSdk.TransactionBuilder.fromXDR(
    signedXdr.signedTxXdr || signedXdr,
    NETWORK_PASSPHRASE
  ) as StellarSdk.Transaction;
}

/**
 * Submit transaction to network
 */
async function submitTransaction(transaction: StellarSdk.Transaction) {
  const response = await server.sendTransaction(transaction);
  
  if (response.status === 'PENDING') {
    let getResponse = await server.getTransaction(response.hash);
    
    // Poll for result
    while (getResponse.status === 'NOT_FOUND') {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      getResponse = await server.getTransaction(response.hash);
    }

    if (getResponse.status === 'SUCCESS') {
      return getResponse.returnValue;
    }
  }

  throw new Error(`Transaction failed: ${response.status}`);
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
    const contract = new StellarSdk.Contract(CONTRACT_ID);
    
    const operation = contract.call(
      'mint_reward',
      StellarSdk.Address.fromString(studentAddress).toScVal(),
      StellarSdk.nativeToScVal(amount, { type: 'u32' })
    );

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
    
    const result = await server.simulateTransaction(
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
    
    const result = await server.simulateTransaction(
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

