# Increment Kontratını Dağıtma

## İki aşamalı dağıtım

`deploy` komutunun aslında iki aşamalı bir süreç olduğunu bilmekte fayda var.

1. **Kontrat byte'larını ağa yükleme.** Soroban şu anda buna kontratı *kurma* (installing) olarak atıfta bulunuyor—blokzincirinin kendi perspektifinden bakıldığında, bu makul bir metafordur. Bu işlem kontratın byte'larını ağa yükler ve hash değerine göre indeksler. Bu kontrat kodu artık birden fazla kontrat tarafından referans alınabilir, bu da bu kontratların tamamen aynı *davranışa* sahip olacağı ancak ayrı depolama durumlarına sahip olacağı anlamına gelir.
2. **Kontratı örnekleme.** Bu işlem aslında sizin bir Akıllı Kontrat olarak düşündüğünüz şeyi oluşturur. Yeni bir kontrat ID'si oluşturur ve bunu önceki adımda yüklenen kontrat byte'ları ile ilişkilendirir.

Bu iki adımı ayrı ayrı çalıştırabilirsiniz. Hadi bunu Increment kontratı ile deneyelim:

> ℹ️ **Bilgi**
>
> Eğer kontrat henüz derlenmediyse, kontratın kök dizininden `stellar contract build` derleme komutunu çalıştırın.

---

### macOS/Linux

```bash
stellar contract upload \
  --network testnet \
  --source-account alice \
  --wasm target/wasm32v1-none/release/soroban_increment_contract.wasm
```

### Windows (PowerShell)

```powershell
stellar contract upload `
  --network testnet `
  --source-account alice `
  --wasm target/wasm32v1-none/release/soroban_increment_contract.wasm
```

Bu komut Wasm byte'larının hash değerini döndürür, örneğin `6ddb28e0980f643bb97350f7e3bacb0ff1fe74d846c6d4f2c625e766210fbb5b` gibi. Artık `deploy` komutu ile `--wasm` yerine `--wasm-hash` parametresini kullanabilirsiniz. Örnek wasm hash değerini kendinizinkiyle değiştirdiğinizden emin olun.

---

### macOS/Linux

```bash
stellar contract deploy \
  --wasm-hash 6ddb28e0980f643bb97350f7e3bacb0ff1fe74d846c6d4f2c625e766210fbb5b \
  --source-account alice \
  --network testnet \
  --alias increment
```

### Windows (PowerShell)

```powershell
stellar contract deploy `
  --wasm-hash 6ddb28e0980f643bb97350f7e3bacb0ff1fe74d846c6d4f2c625e766210fbb5b `
  --source-account alice `
  --network testnet `
  --alias increment
```

Bu komut kontrat id'sini döndürecektir (örn. `CACDYF3CYMJEJTIVFESQYZTN67GO2R5D5IUABTCUG3HXQSRXCSOROBAN`) ve önceki örneklerde yaptığımız gibi kontratı çağırmak için bu id'yi kullanabilirsiniz.

---

### macOS/Linux

```bash
stellar contract invoke \
  --id CACDYF3CYMJEJTIVFESQYZTN67GO2R5D5IUABTCUG3HXQSRXCSOROBAN \
  --source-account alice \
  --network testnet \
  -- \
  increment
```

### Windows (PowerShell)

```powershell
stellar contract invoke `
  --id CACDYF3CYMJEJTIVFESQYZTN67GO2R5D5IUABTCUG3HXQSRXCSOROBAN `
  --source-account alice `
  --network testnet `
  -- `
  increment
```

Aşağıdaki çıktıyı görmelisiniz:

```bash
1
```

Sayının değiştiğini görmek için komutu birkaç kez daha çalıştırın.

---

## Kendi ağınızı/düğümünüzü çalıştırma

Bazen kendi düğümünüzü çalıştırmanız gerekebilir:

- **Üretim uygulamaları!** Stellar, Testnet ve Futurenet için genel test RPC düğümleri sağlar, ancak Mainnet için sağlamaz. Bunun yerine, kendi düğümünüzü çalıştırmanız ve uygulamanızı ona yönlendirmeniz gerekecektir. Bunun için bir hizmet olarak yazılım (software-as-a-service) platformu kullanmak isterseniz, [çeşitli sağlayıcılar](https://developers.stellar.org/docs/data/apis/api-providers) mevcuttur.
- **Testnet'e dağıtılan sürümden farklı bir ağa ihtiyaç duyduğunuzda.**

RPC ekibi bunu mümkün olduğunca basit hale getiren Docker konteynerlerini sürdürmektedir. Ayrıntılar için [RPC Yönetici Kılavuzu](https://developers.stellar.org/docs/data/apis/rpc/admin-guide) referansına bakın.

---

## Sırada ne var

Dağıtılmış bu kontratları basit bir web uygulamasına dönüştürmeye hazır mısınız? [Dapp Frontend Oluşturma bölümüne](https://developers.stellar.org/docs/build/apps/dapp-frontend) gidin.