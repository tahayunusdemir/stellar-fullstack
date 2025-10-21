# Veri Depolama

Artık temel bir Hello World örnek contract'ı oluşturduğumuza göre, veri depolayan ve geri alan basit bir contract yazacağız. Bu, Soroban'ın depolama sisteminin temellerini görmenize yardımcı olacaktır.

Bu eğitim, dahili bir sayacı artıran ve değeri döndüren tek bir fonksiyona sahip olan [increment örneği](https://github.com/stellar/soroban-examples/tree/v22.0.1/increment) ile birlikte ilerleyecektir. Çalışan bir örnek görmek istiyorsanız, [Devcontainers'da deneyin](https://github.com/codespaces/new?repo=stellar/soroban-examples&editor=web).

Bu eğitim, Başlarken bölümündeki önceki adımları tamamladığınızı varsaymaktadır: [Kurulum](https://developers.stellar.org/docs/build/smart-contracts/getting-started/setup), [Hello World](https://developers.stellar.org/docs/build/smart-contracts/getting-started/hello-world) ve [Testnet'e Dağıtım](https://developers.stellar.org/docs/build/smart-contracts/getting-started/deploy-to-testnet).

---

## Increment Contract'ını Ekleme

Yeni bir proje oluşturmaya ek olarak, `stellar contract init` komutu mevcut bir proje içinde yeni bir contract çalışma alanı başlatmamıza da olanak tanır. Bu örnekte, yeni bir contract başlatacağız ve yeni contract'ımızın adını belirtmek için `--name` flag'ini kullanacağız: `increment`.

Bu komut, açıkça `--overwrite` flag'ini geçirmedikçe mevcut dosyaların üzerine yazmayacaktır. `soroban-hello-world` dizininin içinden şu komutu çalıştırın:

```bash
stellar contract init . --name increment
```

Bu, `src/lib.rs` ve `src/test.rs` içinde yer tutucu kod ile yeni bir `contracts/increment` dizini oluşturur; bunları yeni increment contract'ımız ve ilgili testlerle değiştireceğiz.

```
└── contracts
    ├── increment
        ├── Cargo.toml
        ├── Makefile
        └── src
            ├── lib.rs
            └── test.rs
```

Aşağıda contract kodunu daha ayrıntılı olarak inceleyeceğiz, ancak şimdilik `contracts/increment/src/lib.rs` içindeki yer tutucu kodu aşağıdaki kodla değiştirin.

```rust
#![no_std]
use soroban_sdk::{contract, contractimpl, log, symbol_short, Env, Symbol};

const COUNTER: Symbol = symbol_short!("COUNTER");

#[contract]
pub struct IncrementContract;

#[contractimpl]
impl IncrementContract {
    /// Increment increments an internal counter, and returns the value.
    pub fn increment(env: Env) -> u32 {
        let mut count: u32 = env.storage().instance().get(&COUNTER).unwrap_or(0);
        log!(&env, "count: {}", count);

        count += 1;
        env.storage().instance().set(&COUNTER, &count);
        env.storage().instance().extend_ttl(50, 100);

        count
    }
}

mod test;
```

---

### Import'lar

Bu contract, Hello World contract'ımıza benzer şekilde başlar; Rust standart kütüphanesini hariç tutan bir anotasyon ve `soroban-sdk` crate'inden ihtiyacımız olan tip ve makroların import'u ile.

**contracts/increment/src/lib.rs**

```rust
#![no_std]
use soroban_sdk::{contract, contractimpl, log, symbol_short, Env, Symbol};
```

---

### Contract Veri Anahtarları

```rust
const COUNTER: Symbol = symbol_short!("COUNTER");
```

Contract verisi, daha sonra değeri aramak için kullanılabilecek bir anahtar ile ilişkilendirilir.

`Symbol`, sınırlı karakter alanına sahip (sadece `a-zA-Z0-9_` karakterlerine izin verilir) kısa (32 karaktere kadar) bir string tipidir. Contract fonksiyon isimleri ve contract veri anahtarları gibi tanımlayıcılar `Symbol`'ler ile temsil edilir.

`symbol_short!()` makrosu, derleme zamanında `Symbol::short` kullanarak 9 karaktere kadar olan kısa sembolleri önceden hesaplamanın kullanışlı bir yoludur. Harfler (a-zA-Z), sayılar (0-9) ve alt çizgilerden (_) oluşan geçerli karakter setine uyan bir derleme zamanı sabiti oluşturur. Bir sembol 9 karakterlik sınırı aşarsa, çalışma zamanında sembol oluşturmak için `Symbol::new` kullanılmalıdır.

---

### Contract Veri Erişimi

```rust
let mut count: u32 = env
    .storage()
    .instance()
    .get(&COUNTER)
    .unwrap_or(0); // Eğer değer ayarlanmamışsa, 0 varsay.
```

`Env.storage()` fonksiyonu contract verisine erişmek ve güncellemek için kullanılır. Çalıştırılan contract, depoladığı contract verisini sorgulayabilen veya değiştirebilen tek contract'tır. Depolanan veri, ledger'ın görülebildiği her yerde ledger üzerinde görüntülenebilir, ancak Soroban ortamında çalışan contract'lar kendi verilerine kısıtlıdır.

`get()` fonksiyonu counter anahtarıyla ilişkili mevcut değeri alır.

Şu anda herhangi bir değer depolanmamışsa, `unwrap_or(...)` fonksiyonuna verilen değer bunun yerine döndürülür.

Contract verisi olarak depolanan ve alınan değerler [ortamdan](https://developers.stellar.org/docs/learn/fundamentals/contract-development/environment-concepts) iletilir ve belirtilen tipe genişletilir. Bu durumda bir `u32`. Değer genişletilebilirse, döndürülen tip bir `u32` olacaktır. Aksi takdirde, bir geliştirici onu başka bir tipe dönüştürürse, unwrap sırasında bir panic oluşur.

```rust
env.storage()
    .instance()
    .set(&COUNTER, &count);
```

`set()` fonksiyonu yeni count değerini anahtara karşılık olarak depolar ve mevcut değerin yerine geçer.

---

### `extend_ttl()` ile Contract Veri TTL'lerini Yönetme

```rust
env.storage().instance().extend_ttl(100, 100);
```

Tüm contract verilerinin ledger'lar cinsinden ölçülen ve periyodik olarak uzatılması gereken bir Yaşam Süresi (TTL - Time To Live) vardır. Bir girişin TTL'si periyodik olarak uzatılmazsa, giriş sonunda "arşivlenmiş" hale gelir. Bu konuda daha fazla bilgiyi [State Archival](https://developers.stellar.org/docs/learn/fundamentals/contract-development/storage/state-archival) belgesinde öğrenebilirsiniz.

Şimdilik, üç tür depolama olduğunu bilmekte fayda var: `Persistent`, `Temporary` ve `Instance`. Bu contract yalnızca `Instance` depolamayı kullanır: `env.storage().instance()`. Counter her artırıldığında, bu depolamanın TTL'si 100 [ledger](https://developers.stellar.org/docs/learn/fundamentals/stellar-data-structures/ledgers) veya yaklaşık 500 saniye uzatılır.

---

### Contract'ı Build Etme

`soroban-hello-world` dizininin içinden şu komutu çalıştırın:

```bash
stellar contract build
```

Build edildiğini kontrol edin:

```bash
ls target/wasm32v1-none/release/*.wasm
```

Hem `hello_world.wasm` hem de `increment.wasm` dosyalarını görmelisiniz.

---

## Testler

`contracts/increment/src/test.rs` içindeki yer tutucu kodu aşağıdaki increment test koduyla değiştirin.

**contracts/increment/src/test.rs**

```rust
#![cfg(test)]
use crate::{IncrementContract, IncrementContractClient};
use soroban_sdk::Env;

#[test]
fn test() {
    let env = Env::default();
    let contract_id = env.register(IncrementContract, ());
    let client = IncrementContractClient::new(&env, &contract_id);

    assert_eq!(client.increment(), 1);
    assert_eq!(client.increment(), 2);
    assert_eq!(client.increment(), 3);
}
```

Bu, Hello World örneğinde açıklanan aynı kavramları kullanır.

Testlerin geçtiğinden emin olun:

```bash
cargo test
```

Bunun tüm çalışma alanı için testleri çalıştırdığını göreceksiniz; hem Hello World contract'ı hem de yeni Increment contract'ı.

`log!` çağrısının çıktısını görmek istiyorsanız, testleri `--nocapture` ile çalıştırın:

```bash
cargo test -- --nocapture
```

Çıktıda count verisiyle birlikte tanılama log olaylarını görmelisiniz:

```
running 1 test
[Diagnostic Event] contract:CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD2KM,
    topics:[log],
    data:["count: {}", 1]
[Diagnostic Event] contract:CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD2KM,
    topics:[log],
    data:["count: {}", 2]
[Diagnostic Event] contract:CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD2KM,
    topics:[log],
    data:["count: {}", 3]
test test::test ... ok
```

---

## Daha İleriye Götürün

Contract'a `get_current_value` fonksiyonunu nasıl ekleyeceğinizi çözebilir misiniz? Peki ya `decrement` veya `reset` fonksiyonları?

---

## Özet

Bu bölümde, veri depolamak ve almak için Soroban'ın depolama yeteneklerini kullanan yeni bir contract ekledik. Ayrıca farklı depolama türleri ve bunların TTL'lerini nasıl yöneteceğimizi öğrendik.

Sonraki adımda, contract'ları Soroban'ın Testnet ağına dağıtma hakkında biraz daha fazla şey öğreneceğiz ve CLI kullanarak incrementor contract'ımızla etkileşime gireceğiz.