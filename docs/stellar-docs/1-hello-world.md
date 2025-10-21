# Merhaba Dünya

[Geliştirme ortamınızı kurduktan](https://developers.stellar.org/docs/build/smart-contracts/getting-started/setup) sonra, ilk akıllı sözleşmenizi oluşturmaya hazırsınız.

---

## Yeni Bir Proje Oluşturma

`soroban-hello-world` projesi oluşturmak için `init` komutunu kullanarak yeni bir proje oluşturun.

```bash
stellar contract init soroban-hello-world
```

`init` komutu, Soroban sözleşmelerini dahil etmek için önerilen yapıyı kullanarak bir Rust çalışma alanı projesi oluşturacaktır. Proje yapısına bir göz atalım:

```
.
├── Cargo.lock
├── Cargo.toml
├── README.md
└── contracts
    ├── hello_world
    │   ├── Cargo.toml
    │   ├── Makefile
    │   ├── src
    │   │   ├── lib.rs
    │   │   └── test.rs
```

---

### Cargo.toml

Projenin kök dizinindeki `Cargo.toml` dosyası, bir Rust Çalışma Alanı (Rust Workspace) olarak ayarlanmıştır ve bu, tek bir projede birden fazla akıllı sözleşme eklememize olanak tanır.

### Rust Çalışma Alanı

`Cargo.toml` dosyası, çalışma alanının üyelerini `contracts` dizininin tüm içeriği olarak ayarlar ve çalışma alanının `soroban-sdk` bağımlılık sürümünü `testutils` özelliğini içerecek şekilde ayarlar; bu da testlerde sözleşmeyi çağırmak için test yardımcı programlarının oluşturulmasına olanak tanır.

**Cargo.toml**

```toml
[workspace]
resolver = "2"
members = [
  "contracts/*",
]

[workspace.dependencies]
soroban-sdk = "22"
```

> ℹ️ **Bilgi**
>
> Test yardımcı programları (testutils), sözleşmenizle aynı crate içindeki Rust birim testlerinde otomatik olarak etkinleştirilir. Testlerinizi başka bir crate'ten yazarsanız, bu testler için testutils özelliğini talep etmeniz ve testlerinizi cargo test --features testutils ile çalıştırırken testutils özelliğini etkinleştirmeniz gerekecektir; böylece bu test yardımcı programlarını kullanabilirsiniz.

---

### `release` Profili

Sözleşme derlemesini optimize etmek için `release` profilini yapılandırmak kritik öneme sahiptir. Soroban sözleşmeleri maksimum 64KB boyutuna sahiptir. Rust programları, küçük olanlar bile, bu yapılandırmalar olmadan neredeyse her zaman bu boyutu aşar.

`Cargo.toml` dosyası aşağıdaki release profili ile yapılandırılmıştır.

```toml
[profile.release]
opt-level = "z"
overflow-checks = true
debug = 0
strip = "symbols"
debug-assertions = false
panic = "abort"
codegen-units = 1
lto = true
```

---

### `release-with-logs` Profili

[`stellar-cli`](https://developers.stellar.org/docs/build/smart-contracts/getting-started/setup#install-the-stellar-cli) kullanırken hata ayıklama günlüklerini yazdırmak için günlükleri etkinleştirilmiş bir `.wasm` dosyası oluşturmanız gerekiyorsa, bir `release-with-logs` profili yapılandırmak faydalı olabilir. Bunun testlerde hata ayıklama günlüklerine erişmek veya adım adım hata ayıklayıcı kullanmak için gerekli olmadığını unutmayın.

```toml
[profile.release-with-logs]
inherits = "release"
debug-assertions = true
```

Günlüğe kaydetme hakkında daha fazla bilgi için [günlük kaydı örneğine](https://developers.stellar.org/docs/build/smart-contracts/example-contracts/logging) bakın.

---

### Contracts Dizini

`contracts` dizini, Soroban sözleşmelerinin her birinin kendi dizininde yaşayacağı yerdir. Başlamanız için orada zaten bir `hello_world` sözleşmesi bulunmaktadır.

---

### Sözleşmeye Özgü Cargo.toml Dosyası

Her sözleşmenin, az önce tartıştığımız üst düzey `Cargo.toml` dosyasına dayanan kendi `Cargo.toml` dosyası olmalıdır.

Sözleşmeye özgü paket bilgilerini burada belirtebiliriz.

**contracts/hello_world/Cargo.toml**

```toml
[package]
name = "hello-world"
version = "0.0.0"
edition = "2021"
publish = false
```

`crate-type`, sözleşmeleri derlemek için gerekli olan `cdylib` olarak yapılandırılmıştır.

```toml
[lib]
crate-type = ["cdylib"]
doctest = false
```

Ayrıca, çalışma alanı Cargo.toml'daki sürümü kullanacak şekilde yapılandırılmış soroban-sdk bağımlılığını da ekledik.

```toml
[dependencies]
soroban-sdk = { workspace = true }

[dev-dependencies]
soroban-sdk = { workspace = true, features = ["testutils"] }
```

---

### Sözleşme Kaynak Kodu

Bir Soroban sözleşmesi oluşturmak, projenin `lib.rs` dosyasında Rust kodu yazmayı içerir.

Tüm sözleşmeler, Rust standart kütüphanesinin derlemeye dahil edilmemesini sağlamak için `#![no_std]` ile başlamalıdır. Rust standart kütüphanesi büyüktür ve blok zincirlere dağıtılan programlar gibi küçük programlara dağıtılmak için uygun değildir.

```rust
#![no_std]
```

Sözleşme, ihtiyaç duyduğu türleri ve makroları `soroban-sdk` crate'inden içe aktarır.

```rust
use soroban_sdk::{contract, contractimpl, vec, Env, String, Vec};
```

`std::vec::Vec` gibi tipik Rust programlarında bulunan birçok tür, Soroban sözleşmelerinde tahsis edici ve yığın belleği olmadığı için kullanılamaz. `soroban-sdk`, Soroban ortamının belleğini ve yerel yeteneklerini kullanan `Vec`, `Map`, `Bytes`, `BytesN`, `Symbol` gibi çeşitli türler sağlar. `u128`, `i128`, `u64`, `i64`, `u32`, `i32` ve `bool` gibi ilkel değerler de kullanılabilir. Kayan noktalı sayılar ve kayan noktalı matematik desteklenmez.

Sözleşme girdileri referans olmamalıdır.

`#[contract]` niteliği, sözleşme işlevlerinin ilişkilendirildiği tür olarak `Contract` yapısını belirler. Bu, yapı için sözleşme işlevlerinin uygulanacağı anlamına gelir.

```rust
#[contract]
pub struct Contract;
```

Sözleşme işlevleri, `#[contractimpl]` ile açıklama eklenen yapı için bir `impl` bloğu içinde tanımlanır. Sözleşme işlevlerinin maksimum 32 karakter uzunluğunda isimlere sahip olması gerektiğini not etmek önemlidir. Ek olarak, bir işlevin sözleşme dışından çağrılması amaçlanıyorsa, `pub` görünürlük değiştiricisi ile işaretlenmelidir. Bir sözleşme işlevinin ilk argümanının `Env` türünde olması yaygındır; bu, Soroban ortamının bir kopyasına erişim sağlar ve genellikle sözleşme içindeki çeşitli işlemler için gereklidir.

```rust
#[contractimpl]
impl Contract {
    pub fn hello(env: Env, to: String) -> Vec<String> {
        vec![&env, String::from_str(&env, "Hello"), to]
    }
}
```

Bu parçaları bir araya getirdiğimizde basit bir sözleşme şöyle görünür.

**contracts/hello_world/src/lib.rs**

```rust
#![no_std]
use soroban_sdk::{contract, contractimpl, vec, Env, String, Vec};

#[contract]
pub struct Contract;

#[contractimpl]
impl Contract {
    pub fn hello(env: Env, to: String) -> Vec<String> {
        vec![&env, String::from_str(&env, "Hello"), to]
    }
}

mod test;
```

Alt kısmındaki `mod test` satırına dikkat edin; bu, Rust'a test kodunu derlemesini ve çalıştırmasını söyleyecektir, sırada buna bakacağız.

---

### Sözleşme Birim Testleri

Soroban sözleşmeleri için test yazmak, herhangi bir Rust kodunu test etmek için kullanacağınız test olanaklarını ve araç zincirini kullanarak Rust kodu yazmayı içerir.

`Contract` sözleşmemiz göz önüne alındığında, basit bir test şöyle görünecektir.

**contracts/hello_world/src/test.rs**

```rust
#![cfg(test)]

use super::*;
use soroban_sdk::{vec, Env, String};

#[test]
fn test() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    let words = client.hello(&String::from_str(&env, "Dev"));
    assert_eq!(
        words,
        vec![
            &env,
            String::from_str(&env, "Hello"),
            String::from_str(&env, "Dev"),
        ]
    );
}
```

Her testte her zaman gerekli olan ilk şey, sözleşmenin içinde çalışacağı Soroban ortamı olan bir `Env`'dir.

```rust
let env = Env::default();
```

Sözleşme, sözleşme türü kullanılarak ortama kaydedilir. Sözleşmeler, ilk argüman olarak sabit bir sözleşme kimliği belirtebilir veya `None` sağlayabilir ve bir tane oluşturulur.

```rust
let contract_id = env.register(Contract, ());
```

`#[contractimpl]` niteliği ile açıklama eklenen bir `impl` bloğu içindeki tüm genel işlevler, oluşturulan bir istemci türünde karşılık gelen bir işlev oluşturur. İstemci türü, sözleşme türüyle aynı şekilde adlandırılacak ve sonuna `Client` eklenecektir. Örneğin, sözleşmemizde sözleşme türü `Contract`'tır ve istemci `ContractClient` olarak adlandırılır.

```rust
let client = ContractClient::new(&env, &contract_id);
let words = client.hello(&String::from_str(&env, "Dev"));
```

İşlevler tarafından döndürülen değerler üzerinde iddiada bulunulabilir:

```rust
    assert_eq!(
        words,
        vec![
            &env,
            String::from_str(&env, "Hello"),
            String::from_str(&env, "Dev"),
        ]
    );
```

---

## Testleri Çalıştırma

`cargo test` komutunu çalıştırın ve birim testinin çalıştığını izleyin. Aşağıdaki çıktıyı görmelisiniz:

```bash
cargo test
```

```
running 1 test
test test::test ... ok
```

Nasıl çalıştığını görmek için testteki değerleri değiştirmeyi deneyin.

> ℹ️ **Not**
>
> Testleri ilk kez çalıştırdığınızda, testleri çalıştırmadan önce cargo'nun tüm bağımlılıkları derlediğine dair terminalde çıktı görebilirsiniz.

---

## Sözleşmeyi Derleme

Dağıtmak veya çalıştırmak üzere bir akıllı sözleşme derlemek için `stellar contract build` komutunu kullanın.

```bash
stellar contract build
```

> 💡 **İpucu**
>
> `can't find crate for 'core'` gibi bir hata alırsanız, bu, kurulum adımı sırasında wasm32 hedefini yüklemediğiniz anlamına gelir. Bunu `rustup target add wasm32v1-none` komutunu çalıştırarak yapabilirsiniz (Rust sürümleri v1.85.0'dan eskiyse `rustup target add wasm32v1-none` kullanın).

Bu, hedefi `wasm32v1-none` ve profili `release` olarak ayarlayan `cargo build` etrafında küçük bir sarmalayıcıdır. Bunu aşağıdaki komutun kısayolu olarak düşünebilirsiniz:

```bash
cargo build --target wasm32v1-none --release
```

`target` dizininde, `target/wasm32v1-none/release/hello_world.wasm` konumunda bir `.wasm` dosyası çıktı olarak verilecektir. `.wasm` dosyası, derlenmiş sözleşmedir.

`.wasm` dosyası, sözleşmenin mantığını ve ayrıca sözleşmenin [belirtim / arayüz türlerini](https://developers.stellar.org/docs/learn/fundamentals/contract-development/types/fully-typed-contracts) içerir; bunlar, sözleşmeyi çağırmak isteyen diğer sözleşmelere içe aktarılabilir. Bu, sözleşmeyi dağıtmak, arayüzü başkalarıyla paylaşmak veya sözleşmeye karşı entegrasyon testi yapmak için gereken tek yapıdır.

---

## Derlemeleri Optimize Etme

`.wasm` boyutunu daha da küçültmek için `stellar contract optimize` komutunu kullanın:

```bash
stellar contract optimize --wasm target/wasm32v1-none/release/hello_world.wasm
```

Bu, girdi `.wasm` dosyasıyla aynı konumda yeni bir `hello_world.optimized.wasm` dosyasını optimize edecek ve çıktı olarak verecektir.

> 💡 **İpucu**
>
> Optimize edilmiş sözleşmeler derlemek yalnızca ücretli bir ağa dağıtım yaparken veya bir sözleşmeyi olabildiğince küçük hale getirmek için analiz ederken ve profil oluştururken gereklidir. Bir sözleşme yazmaya yeni başlıyorsanız, bu adımlar gerekli değildir. Geliştirme için nasıl derleme yapılacağına dair ayrıntılar için Build bölümüne bakın.

---

## Özet

Bu bölümde, bir Soroban ağına dağıtılabilecek basit bir sözleşme yazdık.

Daha sonra, HelloWorld sözleşmesini Stellar'ın Testnet ağına dağıtmayı ve CLI kullanarak RPC üzerinden onunla etkileşim kurmayı öğreneceğiz.
