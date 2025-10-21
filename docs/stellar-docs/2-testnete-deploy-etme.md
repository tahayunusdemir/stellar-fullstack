# Testnet'e Deploy Etme

## Özet: Şimdiye Kadar Yaptıklarımız

**Setup** aşamasında:

- Rust akıllı kontratları yazmak için yerel ortamımızı kurduk
- `stellar-cli` aracını yükledik
- `stellar-cli`'yi RPC üzerinden Stellar Testnet ile iletişim kuracak şekilde yapılandırdık
- İşlemleri imzalamak için bir kimlik yapılandırdık

**Hello World** aşamasında bir `hello-world` projesi oluşturduk ve HelloWorld kontratını test edip derlemeyi öğrendik. Şimdi bu kontratı Testnet'e deploy etmeye ve onunla etkileşime girmeye hazırız.

---

## Deploy (Dağıtım)

HelloWorld kontratınızı deploy etmek için aşağıdaki komutu çalıştırın:

### Platformlar

- **macOS/Linux**
- **Windows (PowerShell)**

**Windows (PowerShell):**

```powershell
stellar contract deploy `
  --wasm target/wasm32v1-none/release/hello_world.wasm `
  --source-account alice `
  --network testnet `
  --alias hello_world
```

Bu komut, kontratın ID'sini döndürür ve bu ID **C** ile başlar. Bu örnekte, `CACDYF3CYMJEJTIVFESQYZTN67GO2R5D5IUABTCUG3HXQSRXCSOROBAN` kullanacağız, ancak siz kendi gerçek kontrat ID'nizi kullanmalısınız.

> 💡 **İpucu**
>
> Bu deploy komutunda `--alias` bayrağını kullandık. Bu, `hello_world` takma adını kontrat ID'si ve ağ ile eşleştiren bir `.stellar/contract-ids/hello_world.json` dosyası oluşturur. Bu sayede kontratı ID yerine takma adıyla referans alabiliriz.

---

## Interact (Etkileşim)

**Write a Contract** bölümünde yazdığımız kodu ve **Build** bölümünde oluşturduğumuz `.wasm` dosyasını kullanarak, `hello` fonksiyonunu çağırmak için aşağıdaki komutu çalıştırın.

> ℹ️ **Bilgi**
>
> Arka planda CLI, RPC çağrıları yapıyor. Bu konuda daha fazla bilgi için RPC referans sayfasına göz atın.

### Platformlar

- **macOS/Linux**
- **Windows (PowerShell)**

**Windows (PowerShell):**

```powershell
stellar contract invoke `
  --id CACDYF3CYMJEJTIVFESQYZTN67GO2R5D5IUABTCUG3HXQSRXCSOROBAN `
  --source-account alice `
  --network testnet `
  -- `
  hello `
  --to RPC
```

Aşağıdaki çıktı görünmelidir:

```json
["Hello", "RPC"]
```

> ℹ️ **Bilgi**
>
> **`--` çift tire gereklidir!**
>
> Bu, `cargo run` gibi diğer komutlar tarafından da kullanılan genel bir CLI kalıbıdır. `--` işaretinden sonraki her şey (bazen "slop" olarak adlandırılır) bir alt işleme aktarılır. Bu durumda, `stellar contract invoke` kontratınızdaki `hello` metodu için anında örtük bir CLI oluşturur. Bunu yapabilmesinin nedeni, Soroban SDK'nın kontratınızın şema/arayüz tiplerini doğrudan zincir üzerinde deploy edilen `.wasm` dosyasına gömmesidir.

Şunları da deneyebilirsiniz:

```bash
stellar contract invoke ... -- --help
```

ve

```bash
stellar contract invoke ... -- hello --help
```

---

## Özet

Bu derste şunları öğrendik:

- ✅ Bir kontratı Testnet'e deploy etmek
- ✅ Deploy edilmiş bir kontratla etkileşime girmek

---

## Sırada Ne Var?

Bir sonraki adımda, bu projeye yeni bir kontrat ekleyeceğiz ve çalışma alanımızın çoklu kontrat projesini nasıl barındırabileceğini göreceğiz. Yeni kontrat, Soroban'ın depolama yeteneklerini biraz gösterecek.