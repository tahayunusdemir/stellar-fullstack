# ScholarChain 🎓

<div align="center">
  <img src="stellar-fullstack/ScholarChain/frontend/public/stellar-logo.svg" alt="Stellar Logo" height="60" />
  
  ### Blockchain-based Student Reward Platform
  
  [![Powered by Stellar](https://img.shields.io/badge/Powered%20by-Stellar-000000?style=flat&logo=stellar)](https://stellar.org)
  [![Built with Soroban](https://img.shields.io/badge/Built%20with-Soroban-7B42BC?style=flat)](https://soroban.stellar.org)
  [![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org)
  [![Rust](https://img.shields.io/badge/Rust-1.79+-orange?style=flat&logo=rust)](https://www.rust-lang.org)
  
  ---
  
  ### 📜 Deployed Contract
  
  **Contract ID (Testnet):**
  ```
  CCVCKTQGFE3F7TGJKDYE5DRITSGLQCL275ZSHMOIJNMRA7GKXWJPAMAN
  ```
  
  **Network:** Stellar Testnet  
  **Explorer:** [View on Stellar Expert](https://stellar.expert/explorer/testnet/contract/CCVCKTQGFE3F7TGJKDYE5DRITSGLQCL275ZSHMOIJNMRA7GKXWJPAMAN)
  
</div>

## 📖 Project Description

ScholarChain revolutionizes academic rewards by leveraging Stellar blockchain technology. This platform enables teachers to mint token rewards for student achievements while students can view and spend their earned tokens. Built with Soroban smart contracts, it ensures transparent, tamper-proof record-keeping of all transactions. The system features separate dashboards for teachers and students, providing an intuitive interface for reward distribution and balance management. By decentralizing academic incentives, ScholarChain creates a trustless, efficient ecosystem where achievements are permanently recorded and instantly verifiable on the blockchain.

## 🎯 Vision

ScholarChain envisions transforming education through blockchain technology, creating a global standard for academic recognition. By tokenizing achievements, we empower students worldwide with portable, verifiable credentials that transcend institutional boundaries. This platform democratizes educational rewards, making them accessible and transparent. As adoption grows, ScholarChain will enable students to build comprehensive achievement portfolios, recognized globally by educational institutions and employers. We're creating a future where every academic success is permanently recorded, fairly rewarded, and universally acknowledged, fostering motivation and excellence in education worldwide.

## 👨‍💻 About Me

I'm passionate about merging blockchain technology with education to solve real-world problems. Through my journey in blockchain development, I've witnessed how decentralized systems can create transparency and trust. ScholarChain represents my vision of making education more rewarding and transparent. By building on Stellar's fast and low-cost infrastructure, I aim to demonstrate how blockchain can revolutionize traditional systems. This project combines my interest in both technology and education, creating meaningful impact for students and teachers alike.

## 🛠️ Software Development Plan

### Phase 1: Smart Contract Foundation
- Define core data structures (balances, transactions, admin mappings)
- Implement state management using Soroban storage patterns
- Create admin authorization system with access control

### Phase 2: Token Management Functions
- Develop `initialize()` function for contract setup
- Implement `mint()` function with admin-only restrictions
- Create `spend()` function for token deduction
- Add `get_balance()` and `get_total_distributed()` query functions

### Phase 3: Security & Validation
- Add input validation for all functions
- Implement overflow protection for token amounts
- Create comprehensive error handling system
- Write unit tests for all contract functions

### Phase 4: Frontend Development
- Build Next.js application with TypeScript
- Integrate Freighter wallet connectivity
- Create teacher and student dashboard interfaces
- Implement transaction signing and submission

### Phase 5: Testing & Optimization
- Deploy contract to Stellar testnet
- Perform end-to-end testing with real wallets
- Optimize gas consumption and contract size
- Conduct security audit

### Phase 6: Deployment & Documentation
- Deploy final version to Stellar mainnet
- Create comprehensive user guides
- Document API endpoints and contract methods
- Set up monitoring and analytics

## ✨ Key Features

- 🔐 **Secure & Transparent**: All reward records are stored immutably on the Stellar blockchain
- ⚡ **Fast Transactions**: Instant transaction confirmation with Soroban smart contracts
- 👨‍🏫 **Teacher Dashboard**: Distribute token rewards to successful students
- 👨‍🎓 **Student Dashboard**: View token balance and spend rewards
- 🌐 **Decentralized**: No central authority controls the reward system
- 💰 **Token-Based**: Native token system for student rewards

## 🏗️ Architecture

### Smart Contract (Rust + Soroban)

The ScholarChain smart contract is written in Rust and deployed on Stellar's Soroban platform.

**Key Functions:**
- `initialize(admin)`: Initialize the contract with an admin address
- `mint(student, amount, reason)`: Mint tokens to a student (admin only)
- `spend(student, amount, category)`: Spend tokens from a student's balance
- `get_balance(student)`: Get the token balance of a student
- `get_total_distributed()`: Get the total tokens distributed

### Frontend (Next.js 15 + TypeScript)

Modern web application built with:
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Styled Components** - CSS-in-JS styling
- **Framer Motion** - Smooth animations
- **Freighter Wallet** - Stellar wallet integration

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Rust 1.79+
- Stellar CLI
- Freighter Wallet browser extension

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd stellar-fullstack/ScholarChain
```

2. **Install Rust dependencies and build the contract**
```bash
cargo build --release --target wasm32-unknown-unknown
```

3. **Install frontend dependencies**
```bash
cd frontend
npm install
```

4. **Set up environment variables**
```bash
# On Linux/Mac
chmod +x setup-env.sh
./setup-env.sh

# On Windows (PowerShell)
.\setup-env.ps1
```

Create a `.env.local` file in the `frontend` directory:
```env
NEXT_PUBLIC_CONTRACT_ID=your_contract_id_here
NEXT_PUBLIC_NETWORK=testnet
NEXT_PUBLIC_RPC_URL=https://soroban-testnet.stellar.org
```

5. **Run the development server**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📱 Usage

### For Teachers

1. Connect your Freighter Wallet in **Testnet** mode
2. Select "Teacher Login"
3. Enter student wallet address
4. Select reward category
5. Enter amount and reason
6. Click "Mint Tokens" to distribute rewards

### For Students

1. Connect your Freighter Wallet in **Testnet** mode
2. Select "Student Login"
3. View your token balance
4. Select spending category
5. Enter amount to spend
6. Confirm transaction

## 🔧 Smart Contract Deployment

### Deploy to Stellar Testnet

```bash
# Build the contract
cd contracts/scholar_chain
make build

# Deploy to testnet
stellar contract deploy \
  --wasm target/wasm32-unknown-unknown/release/scholar_chain.wasm \
  --source <your-secret-key> \
  --network testnet

# Initialize the contract
stellar contract invoke \
  --id <contract-id> \
  --source <admin-secret-key> \
  --network testnet \
  -- initialize \
  --admin <admin-public-key>
```

## 🧪 Testing

### Smart Contract Tests

```bash
cd contracts/scholar_chain
cargo test
```

### Frontend Tests

```bash
cd frontend
npm test
```

## 📂 Project Structure

```
GitHub/
└── stellar-fullstack/
    └── ScholarChain/
        ├── contracts/
        │   └── scholar_chain/          # Soroban smart contract
        │       ├── src/
        │       │   ├── lib.rs          # Main contract logic
        │       │   └── test.rs         # Contract tests
        │       ├── Cargo.toml
        │       └── Makefile
        ├── frontend/
        │   ├── app/                    # Next.js app router
        │   │   ├── page.tsx           # Home page
        │   │   ├── student/           # Student dashboard
        │   │   └── teacher/           # Teacher dashboard
        │   ├── components/            # React components
        │   ├── lib/                   # Utilities and helpers
        │   ├── styles/                # Global styles and theme
        │   ├── public/                # Static assets
        │   │   ├── stellar-logo.svg   # Stellar logo (SVG)
        │   │   └── stellar-logo2.avif # Stellar logo (AVIF)
        │   └── package.json
        ├── Cargo.toml
        └── README.md
```

## 🛠️ Technologies

<div align="center">

| Category | Technology |
|----------|-----------|
| **Blockchain** | ![Stellar](https://img.shields.io/badge/-Stellar-000000?style=flat&logo=stellar) ![Soroban](https://img.shields.io/badge/-Soroban-7B42BC?style=flat) |
| **Smart Contract** | ![Rust](https://img.shields.io/badge/-Rust-orange?style=flat&logo=rust) |
| **Frontend** | ![Next.js](https://img.shields.io/badge/-Next.js-black?style=flat&logo=next.js) ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat&logo=typescript&logoColor=white) |
| **Styling** | ![Styled Components](https://img.shields.io/badge/-Styled%20Components-DB7093?style=flat&logo=styled-components&logoColor=white) |
| **Animation** | ![Framer Motion](https://img.shields.io/badge/-Framer%20Motion-0055FF?style=flat&logo=framer) |
| **Wallet** | ![Freighter](https://img.shields.io/badge/-Freighter%20Wallet-000000?style=flat) |

</div>

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🔗 Links

- [Stellar Network](https://stellar.org)
- [Soroban Documentation](https://soroban.stellar.org)
- [Freighter Wallet](https://www.freighter.app/)
- [Next.js Documentation](https://nextjs.org/docs)

---

<div align="center">
  <p>Built with ❤️ using</p>
  <img src="stellar-fullstack/ScholarChain/frontend/public/stellar-logo.svg" alt="Stellar" height="50" />
  <p><strong>Stellar & Soroban</strong></p>
</div>
