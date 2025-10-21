# 🚀 ScholarChain Deployment Guide

Bu rehber, ScholarChain projesini Stellar Testnet'e deploy etmek için adım adım talimatlar içerir.

---

## 📋 Ön Gereksinimler

### 1. Gerekli Araçlar
- ✅ Rust (v1.84.0+)
- ✅ Stellar CLI (v23.1.4+)
- ✅ Node.js (v20+)
- ✅ Freighter Wallet (Browser Extension)

### 2. Stellar CLI Kimlik Yapılandırması

Alice kimliğini oluşturun ve testnet'te fonlayın:

```bash
stellar keys generate alice --network testnet --fund
```

Public key'i görüntüleyin:

```bash
stellar keys address alice
```

---

## 🔨 Adım 1: Contract Build

Contract dizinine gidin ve build yapın:

```bash
cd ScholarChain
stellar contract build
```

Build başarılı olursa şu çıktıyı göreceksiniz:
```
✅ Build Complete
Wasm File: target\wasm32v1-none\release\scholar_chain.wasm
```

---

## 📤 Adım 2: Contract Deploy

### Windows (PowerShell):

```powershell
stellar contract deploy `
  --wasm target/wasm32v1-none/release/scholar_chain.wasm `
  --source-account alice `
  --network testnet `
  --alias scholar_chain
```

### macOS/Linux:

```bash
stellar contract deploy \
  --wasm target/wasm32v1-none/release/scholar_chain.wasm \
  --source-account alice \
  --network testnet \
  --alias scholar_chain
```

**Çıktı:** Contract ID alacaksınız (örnek: `CABC...SOROBAN`)

Bu ID'yi kopyalayın! 📝

---

## ⚙️ Adım 3: Frontend Yapılandırması

### Contract ID'yi .env dosyasına ekleyin:

`frontend/.env.local` dosyasını açın ve Contract ID'yi ekleyin:

```bash
NEXT_PUBLIC_STELLAR_NETWORK=TESTNET
NEXT_PUBLIC_STELLAR_RPC_URL=https://soroban-testnet.stellar.org
NEXT_PUBLIC_CONTRACT_ID=CABC...SOROBAN  # Buraya kendi Contract ID'nizi yazın
```

---

## 🧪 Adım 4: Contract Test

Contract fonksiyonlarını test edin:

### 1. Öğrenciye Token Mint Et

```powershell
stellar contract invoke `
  --id scholar_chain `
  --source-account alice `
  --network testnet `
  -- `
  mint_reward `
  --student GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX `
  --amount 50
```

### 2. Bakiye Sorgula

```powershell
stellar contract invoke `
  --id scholar_chain `
  --source-account alice `
  --network testnet `
  -- `
  get_balance `
  --student GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### 3. Toplam Dağıtılanı Sorgula

```powershell
stellar contract invoke `
  --id scholar_chain `
  --source-account alice `
  --network testnet `
  -- `
  get_total_distributed
```

---

## 🌐 Adım 5: Frontend Başlatma

Frontend dizinine gidin ve dev server'ı başlatın:

```bash
cd frontend
npm run dev
```

Tarayıcınızda açın: **http://localhost:3000**

---

## ✅ Deployment Checklist

- [ ] Contract başarıyla build edildi
- [ ] Contract Testnet'e deploy edildi
- [ ] Contract ID alındı
- [ ] Contract ID `.env.local` dosyasına eklendi
- [ ] Contract fonksiyonları CLI ile test edildi
- [ ] Frontend dev server başlatıldı
- [ ] Freighter Wallet Testnet moduna alındı
- [ ] Öğrenci ve Öğretmen akışları test edildi

---

## 🔍 Deployment Doğrulama

### Contract Explorer

Deploy edilen contract'ı Stellar Explorer'da görüntüleyin:

```
https://stellar.expert/explorer/testnet/contract/CONTRACT_ID_BURAYA
```

### Contract Fonksiyonları

✅ `mint_reward` - Token ekle
✅ `get_balance` - Bakiye sorgula  
✅ `spend_tokens` - Token harca
✅ `get_total_distributed` - Toplam dağıtılan

---

## ⚠️ Önemli Notlar

1. **Testnet Token**: Freighter Wallet'ınızı Testnet moduna alın
2. **Contract ID**: Doğru Contract ID'yi kullandığınızdan emin olun
3. **Network**: Her zaman `TESTNET` kullanın (mainnet değil!)
4. **Wallet Adresleri**: Stellar adresleri `G` harfi ile başlar

---

## 🐛 Sorun Giderme

### "Contract not found" hatası
- Contract ID'yi kontrol edin
- Network'ün TESTNET olduğundan emin olun

### "Insufficient balance" hatası
- Alice kimliğinin testnet fonuna sahip olduğunu kontrol edin
- `stellar keys generate alice --network testnet --fund` tekrar çalıştırın

### Frontend bağlanamıyor
- `.env.local` dosyasındaki Contract ID'yi kontrol edin
- Freighter Wallet'ın Testnet modunda olduğundan emin olun

---

## 📞 Destek

Sorun yaşarsanız:
- GitHub Issues açın
- Stellar Discord'a katılın: https://discord.gg/stellar
- Dokümantasyonu inceleyin: https://developers.stellar.org/

---

**🎉 Deployment Başarılı! ScholarChain artık Testnet'te çalışıyor!**

