#![cfg(test)]

use super::*;
use soroban_sdk::{testutils::Address as _, Address, Env};

#[test]
fn test_mint_and_get_balance() {
    let env = Env::default();
    let contract_id = env.register(ScholarChain, ());
    let client = ScholarChainClient::new(&env, &contract_id);

    // Create test student address
    let student = Address::generate(&env);

    // Mock the auth so we don't need real signatures in tests
    env.mock_all_auths();

    // Initial balance should be 0
    let initial_balance = client.get_balance(&student);
    assert_eq!(initial_balance, 0);

    // Mint 10 tokens
    let new_balance = client.mint_reward(&student, &10);
    assert_eq!(new_balance, 10);

    // Check balance
    let balance = client.get_balance(&student);
    assert_eq!(balance, 10);

    // Mint 5 more tokens
    let updated_balance = client.mint_reward(&student, &5);
    assert_eq!(updated_balance, 15);

    // Verify final balance
    let final_balance = client.get_balance(&student);
    assert_eq!(final_balance, 15);
}

#[test]
fn test_spend_tokens() {
    let env = Env::default();
    let contract_id = env.register(ScholarChain, ());
    let client = ScholarChainClient::new(&env, &contract_id);

    let student = Address::generate(&env);
    env.mock_all_auths();

    // Mint 20 tokens first
    client.mint_reward(&student, &20);

    // Spend 5 tokens
    let remaining = client.spend_tokens(&student, &5);
    assert_eq!(remaining, 15);

    // Verify balance
    let balance = client.get_balance(&student);
    assert_eq!(balance, 15);

    // Spend 10 more
    let remaining2 = client.spend_tokens(&student, &10);
    assert_eq!(remaining2, 5);
}

#[test]
#[should_panic(expected = "Insufficient balance")]
fn test_spend_insufficient_balance() {
    let env = Env::default();
    let contract_id = env.register(ScholarChain, ());
    let client = ScholarChainClient::new(&env, &contract_id);

    let student = Address::generate(&env);
    env.mock_all_auths();

    // Mint only 5 tokens
    client.mint_reward(&student, &5);

    // Try to spend 10 tokens - should panic
    client.spend_tokens(&student, &10);
}

#[test]
fn test_total_distributed() {
    let env = Env::default();
    let contract_id = env.register(ScholarChain, ());
    let client = ScholarChainClient::new(&env, &contract_id);

    let student1 = Address::generate(&env);
    let student2 = Address::generate(&env);
    env.mock_all_auths();

    // Initial total should be 0
    let initial_total = client.get_total_distributed();
    assert_eq!(initial_total, 0);

    // Mint to student 1
    client.mint_reward(&student1, &10);
    let total1 = client.get_total_distributed();
    assert_eq!(total1, 10);

    // Mint to student 2
    client.mint_reward(&student2, &15);
    let total2 = client.get_total_distributed();
    assert_eq!(total2, 25);

    // Mint more to student 1
    client.mint_reward(&student1, &5);
    let total3 = client.get_total_distributed();
    assert_eq!(total3, 30);

    // Spending tokens should NOT decrease total distributed
    client.spend_tokens(&student1, &3);
    let total4 = client.get_total_distributed();
    assert_eq!(total4, 30); // Still 30, not decreased
}

#[test]
fn test_multiple_students() {
    let env = Env::default();
    let contract_id = env.register(ScholarChain, ());
    let client = ScholarChainClient::new(&env, &contract_id);

    let alice = Address::generate(&env);
    let bob = Address::generate(&env);
    let charlie = Address::generate(&env);
    env.mock_all_auths();

    // Mint different amounts to each student
    client.mint_reward(&alice, &100);
    client.mint_reward(&bob, &50);
    client.mint_reward(&charlie, &75);

    // Verify each balance is independent
    assert_eq!(client.get_balance(&alice), 100);
    assert_eq!(client.get_balance(&bob), 50);
    assert_eq!(client.get_balance(&charlie), 75);

    // Alice spends some
    client.spend_tokens(&alice, &30);
    assert_eq!(client.get_balance(&alice), 70);

    // Bob and Charlie balances unchanged
    assert_eq!(client.get_balance(&bob), 50);
    assert_eq!(client.get_balance(&charlie), 75);

    // Total distributed should be sum of all mints
    assert_eq!(client.get_total_distributed(), 225);
}
