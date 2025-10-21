#![no_std]
use soroban_sdk::{contract, contractimpl, log, symbol_short, Address, Env, Map, Symbol};

const BALANCES: Symbol = symbol_short!("BALANCES");
const TOTAL: Symbol = symbol_short!("TOTAL");

#[contract]
pub struct ScholarChain;

#[contractimpl]
impl ScholarChain {
    /// Mint reward tokens to a student
    /// Öğrenciye ödül tokenları ekler ve toplam dağıtılanı günceller
    pub fn mint_reward(env: Env, student: Address, amount: u32) -> u32 {
        // Auth check - caller must be authorized
        student.require_auth();

        // Get current balance (default to 0 if not exists)
        let mut balances: Map<Address, u32> = env
            .storage()
            .instance()
            .get(&BALANCES)
            .unwrap_or(Map::new(&env));

        let current_balance = balances.get(student.clone()).unwrap_or(0);
        let new_balance = current_balance + amount;

        // Update student balance
        balances.set(student.clone(), new_balance);
        env.storage().instance().set(&BALANCES, &balances);

        // Update total distributed
        let total_distributed: u32 = env.storage().instance().get(&TOTAL).unwrap_or(0);
        let new_total = total_distributed + amount;
        env.storage().instance().set(&TOTAL, &new_total);

        // Extend storage TTL
        env.storage().instance().extend_ttl(100, 100);

        log!(&env, "Minted {} tokens to student. New balance: {}", amount, new_balance);

        new_balance
    }

    /// Get balance of a student
    /// Öğrencinin token bakiyesini sorgular
    pub fn get_balance(env: Env, student: Address) -> u32 {
        let balances: Map<Address, u32> = env
            .storage()
            .instance()
            .get(&BALANCES)
            .unwrap_or(Map::new(&env));

        balances.get(student).unwrap_or(0)
    }

    /// Spend tokens (burn)
    /// Öğrenci tokenlarını harcamak için kullanır
    pub fn spend_tokens(env: Env, student: Address, amount: u32) -> u32 {
        // Auth check - student must authorize the spending
        student.require_auth();

        // Get current balance
        let mut balances: Map<Address, u32> = env
            .storage()
            .instance()
            .get(&BALANCES)
            .unwrap_or(Map::new(&env));

        let current_balance = balances.get(student.clone()).unwrap_or(0);

        // Check sufficient balance
        if current_balance < amount {
            log!(&env, "Insufficient balance! Current: {}, Requested: {}", current_balance, amount);
            panic!("Insufficient balance");
        }

        let new_balance = current_balance - amount;

        // Update balance
        balances.set(student.clone(), new_balance);
        env.storage().instance().set(&BALANCES, &balances);

        // Extend storage TTL
        env.storage().instance().extend_ttl(100, 100);

        log!(&env, "Spent {} tokens. Remaining balance: {}", amount, new_balance);

        new_balance
    }

    /// Get total distributed tokens
    /// Toplam dağıtılan token miktarını döndürür
    pub fn get_total_distributed(env: Env) -> u32 {
        env.storage().instance().get(&TOTAL).unwrap_or(0)
    }
}

mod test;
