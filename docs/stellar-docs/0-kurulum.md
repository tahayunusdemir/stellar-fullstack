# Kurulum

Stellar akıllı sözleşmeleri, [Rust](https://www.rust-lang.org/) programlama dilinde yazılmış küçük programlardır.

Sözleşmeleri oluşturmak ve geliştirmek için aşağıdaki ön koşullara ihtiyacınız vardır:

- Bir [Rust](https://www.rust-lang.org/) araç zinciri (toolchain)
- Rust'ı destekleyen bir editör
- [Stellar CLI](https://developers.stellar.org/docs/build/smart-contracts/getting-started/setup#install-the-stellar-cli)

---

## Rust'ı Yükleme

### Platform Seçenekleri

- macOS/Linux
- Windows
- Diğer

---

### Windows Kurulumu

Windows'ta, [rustup-init.exe](https://static.rust-lang.org/rustup/dist/i686-pc-windows-gnu/rustup-init.exe) dosyasını indirin ve çalıştırın. Enter tuşuna basarak varsayılan ayarlarla devam edebilirsiniz.

> 💡 **İpucu**
>
> Stellar CLI, çıktısında emoji kullanır. Bunları Windows'ta düzgün bir şekilde görüntülemek için [Windows Terminal](https://learn.microsoft.com/en-us/windows/terminal/) kullanılması önerilir. Microsoft Learn'de [Windows Terminal nasıl yüklenir](https://learn.microsoft.com/en-us/windows/terminal/install) sayfasına bakın. CLI, yerleşik Windows Komut İstemi veya Windows PowerShell'de kullanılırsa beklendiği gibi çalışacaktır ancak emojiler soru işareti olarak görünecektir.

Zaten [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) kullanıyorsanız, Linux talimatlarını da takip edebilirsiniz.

---

## Target'ı Yükleme

Akıllı sözleşmenizin derlenebileceği bir "target"a (hedefe) ihtiyacınız olacak. Rust `v1.84.0` veya daha yüksek sürümler için `wasm32v1-none` target'ını yükleyin.

```bash
rustup target add wasm32v1-none
```

Bu target'ın sunduğu özellikler hakkında daha fazla bilgiyi, [Stellar Rust dialect](https://developers.stellar.org/docs/learn/fundamentals/contract-development/rust-dialect#limited-webassembly-features) (Stellar Rust lehçesi) sayfamızda öğrenebilirsiniz. Bu sayfa, Stellar akıllı sözleşme ortamında size sunulan Rust işlevselliğinin alt kümesini açıklar.

---

## Editör Yapılandırma

Birçok editör Rust desteğine sahiptir. Editörünüzü nasıl yapılandıracağınızı öğrenmek için şu bağlantıyı ziyaret edin: https://www.rust-lang.org/tools

Editörünüzü yapılandırmak için ihtiyacınız olan araçlar şunlardır:

1. **[Visual Studio Code](https://code.visualstudio.com/)** - Kod editörü (veya Rust'ı destekleyen başka bir kod editörü)
2. **[Rust Analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)** - Rust dil desteği
3. **[CodeLLDB](https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb)** - Adım adım hata ayıklama (debugging)

---

## Stellar CLI'ı Yükleme

[Stellar CLI](https://github.com/stellar/stellar-cli), akıllı sözleşmeleri futurenet, testnet, mainnet'te ve ayrıca yerel bir sandbox'ta çalıştırabilir.

> ℹ️ **Bilgi**
>
> En son kararlı sürüm [v23.1.4](https://github.com/stellar/stellar-cli/releases/latest)'tür.

### Yükleme

Stellar CLI'ın [en son sürümünü](https://github.com/stellar/stellar-cli/releases) yüklemenin birkaç yolu vardır.

### Platform Seçenekleri

- macOS
- Linux
- Windows

---

### Windows Yükleme Yöntemleri

**Yöntem 1: Yükleyiciyi kullanma**

1. Yükleyiciyi [en son sürümden](https://github.com/stellar/stellar-cli/releases/download/v23.1.4/stellar-cli-installer-23.1.4-x86_64-pc-windows-msvc.exe) indirin.
2. İndirilenler klasörünüze gidin, yükleyiciye çift tıklayın ve sihirbaz talimatlarını izleyin.
3. `stellar` komutunu kullanmak için terminalinizi yeniden başlatın.

**Yöntem 2: [winget](https://learn.microsoft.com/en-us/windows/package-manager/winget/) kullanma**

```powershell
winget install --id Stellar.StellarCLI --version 23.1.4
```

**Yöntem 3: Kaynaktan cargo ile yükleme**

```bash
cargo install --locked stellar-cli@23.1.4
```

> ℹ️ **Bilgi**
>
> Stellar CLI hakkında sorunları bildirin ve geri bildirimlerinizi [buradan](https://github.com/stellar/stellar-cli/issues/new/choose) paylaşın.

---

### Dokümantasyon

Otomatik olarak oluşturulan kapsamlı referans dokümantasyonuna [buradan](https://developers.stellar.org/docs/tools/cli/stellar-cli) ulaşabilirsiniz.

---

### Otomatik Tamamlama

Farklı shell'ler için shell tamamlama oluşturmak üzere `stellar completion` komutunu kullanabilirsiniz. Kesinlikle denemelisiniz. Süper güç gibi hissettirecek!

### Desteklenen Shell'ler

- Bash
- ZSH
- fish
- PowerShell
- Elvish

---

### PowerShell Otomatik Tamamlama

**Mevcut shell oturumunda otomatik tamamlamayı etkinleştirmek için:**

```powershell
stellar completion --shell powershell | Out-String | Invoke-Expression
```

**Otomatik tamamlamayı kalıcı olarak etkinleştirmek için:**

Aşağıdaki komutları çalıştırın, ardından terminalinizi yeniden başlatın:

```powershell
New-Item -ItemType Directory -Path $(Split-Path $PROFILE) -Force
if (-Not (Test-Path $PROFILE)) { New-Item -ItemType File -Path $PROFILE | Out-Null }
Add-Content $PROFILE 'Set-PSReadlineKeyHandler -Key Tab -Function MenuComplete'
Add-Content $PROFILE 'stellar completion --shell powershell | Out-String | Invoke-Expression'
```

> 💡 **İpucu**
>
> `cannot be loaded because running scripts is disabled on this system` (bu sistemde betik çalıştırma devre dışı bırakıldığı için yüklenemiyor) gibi bir hata alırsanız, `Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope CurrentUser` komutuyla [Execution Policy](https://developers.stellar.org/go.microsoft.com/fwlink/?LinkID=135170) (Yürütme İlkesi) ayarınızı değiştirmeniz gerekebilir. **Bu komutu çalıştırmadan önce, bunu yapmanın sonuçlarını anladığınızdan emin olun.**

---

## CLI'ı Testnet için Yapılandırma

### Kimlik Yapılandırma

Bir ağa akıllı sözleşme dağıttığınızda (deploy), işlemleri imzalamak için kullanılacak bir kimlik belirtmeniz gerekir.

`alice` adında bir kimlik yapılandıralım. İstediğiniz herhangi bir ismi kullanabilirsiniz, ancak test için kullanabileceğiniz [`alice`, `bob` ve `carol`](https://en.wikipedia.org/wiki/Alice_and_Bob) gibi bazı adlandırılmış kimliklere sahip olmak güzel olabilir. Hesabın [Friendbot](https://developers.stellar.org/docs/learn/fundamentals/networks#friendbot) kullanılarak finanse edileceğini unutmayın.

**Kimlik oluşturma:**

```bash
stellar keys generate alice --network testnet --fund
```

**Public key'i görüntüleme:**

`alice`'in public key'ini (genel anahtarını) şununla görebilirsiniz:

```bash
stellar keys address alice
```

---

### Depolama Konumu

Network yapılandırmalarında olduğu gibi, `--global` bayrağı kimliğin `~/.config/stellar/identity/alice.toml` konumunda saklandığı anlamına gelir. Kimliği projenizin `.stellar/identity` klasöründe saklamak için `--global` bayrağını atlayabilirsiniz.

> ℹ️ **Bilgi**
>
> Daha önce yapılandırma dizinleri olarak `~/.config/soroban` (global) ve `.soroban` (yerel) kullanıyorduk. Bu dizinler hala desteklenmektedir, ancak tercih edilen isim artık `~/.config/stellar` ve `.stellar` olmuştur.