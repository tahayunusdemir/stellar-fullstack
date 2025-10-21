# Hello World Frontend Oluşturma

Önceki örneklerde, Stellar CLI kullanarak contract'ları çağırdık ve rehberin bu son bölümünde TypeScript bağlantıları (bindings) aracılığıyla Hello World contract'ı ile etkileşime geçen bir web uygulaması oluşturacağız.

> ℹ️ **Bilgi**
>
> Bu örnek, bir contract ile frontend arasında bağlantı oluşturmanın bir yolunu göstermektedir. Daha kapsamlı bir rehber için [Dapp Frontend Oluşturma](https://developers.stellar.org/docs/build/apps/dapp-frontend) belgelerine bakınız.

---

## Frontend araç zincirini başlatma

Herhangi bir frontend araç zinciri ile Stellar dapp oluşturabilir veya mevcut herhangi bir full-stack uygulamaya entegre edebilirsiniz. Bu eğitimde [Astro](https://astro.build/) kullanacağız. Astro; React, Vue, Svelte, diğer UI kütüphaneleri ile çalışır veya hiçbir UI kütüphanesi olmadan da kullanılabilir. Bu eğitimde bir UI kütüphanesi kullanmıyoruz. Bu eğitimin akıllı contract'a özgü kısımları, hangi frontend araç zincirini kullanırsanız kullanın benzer olacaktır.

Frontend'de yeniyseniz endişelenmeyin. Çok derine inmeyeceğiz. Ancak akıllı contract uygulamaları tarafından kullanılan frontend geliştirme sürecini görmeniz ve deneyimlemeniz sizin için faydalı olacaktır. JavaScript ve Astro'nun ilgili kısımlarını ele alacağız, ancak tüm frontend geliştirme ve Astro'yu öğretmek bu eğitimin kapsamı dışındadır.

Hadi başlayalım.

[Node.js](https://nodejs.org/en/download/package-manager/) v20 veya daha yüksek bir sürüme ihtiyacınız olacak. Henüz yüklemediyseniz şimdi yükleyin.

Önceki derslerdeki Hello World contract'ının entegre edildiği bir Astro projesi oluşturmak istiyoruz. Bunu yapmak için varsayılan Astro projesini yüklüyoruz:

```bash
npm create astro@latest
```

Bu proje aşağıdaki dizin yapısına sahiptir.

```bash
extra-escape
├── astro.config.mjs
├── package-lock.json
├── package.json
├── packages
├── public
├── README.md
├── src
│   ├── assets
│   │   ├── astro.svg
│   │   └── background.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── tsconfig.json
```

Bu contract'ları zaten takma adlarla (aliases) deploy ettiğimiz için, `soroban-hello-world/.stellar` dizininden bu projeye kopyalayarak oluşturulan contract ID dosyalarını yeniden kullanabiliriz:

```bash
cp -R ../.stellar/ .stellar
```

---

## Hello World contract için bir NPM paketi oluşturma

Yeni frontend dosyalarını açmadan önce Hello World contract için bir NPM paketi oluşturalım. Bu, frontend'lerden contract'larla etkileşim kurmanın önerdiğimiz yoludur. Bu oluşturulan kütüphaneler herhangi bir JavaScript projesi ile çalışır (React gibi belirli bir UI ile değil) ve [XDR](https://developers.stellar.org/docs/learn/fundamentals/contract-development/types/fully-typed-contracts) kodlaması gibi Stellar üzerindeki akıllı contract'ların en karmaşık kısımlarıyla çalışmayı kolaylaştırır.

Bu, `stellar contract bindings typescript` CLI komutunu kullanacaktır:

```bash
stellar contract bindings typescript \
  --network testnet \
  --contract-id hello_world \
  --output-dir packages/hello_world
```

> 💡 **İpucu**
>
> Contract ID yerine contract takma adı `hello_world`'ü kullanabildiğimize dikkat edin!

Bağlantı (binding), CLI komutunda belirtildiği gibi `packages/hello_world` dizininde bir NPM paketi olarak oluşturulacaktır. Binding paketini oluşturmamız gerekecek, çünkü (başlangıç durumunda) paket çoğunlukla TypeScript tipleri ve çeşitli contract fonksiyonları için stub'lardan oluşur.

```bash
cd packages/hello_world
npm install
npm run build
cd ../..
```

Bu oluşturulan kütüphanelerdeki kodu okunabilir tutmaya çalışıyoruz, bu yüzden etrafına bir göz atın. Editörünüzde yeni `packages/hello_world` dizinini açın. Daha önce Node projelerinde çalıştıysanız veya katkıda bulunduysanız, her şey tanıdık gelecektir. Bir `package.json` dosyası, bir `src` dizini, bir `tsconfig.json` ve hatta bir README göreceksiniz.

---

## Frontend'den contract'ı çağırma

Şimdi `src/pages/index.astro` dosyasını açalım ve bir argüman ile `hello` contract fonksiyonunu çağırmak için binding'i kullanalım.

Varsayılan Astro projesi bir sayfa (`pages/index.astro`) ve bir hoş geldiniz bileşeninden (`component/Welcome.astro`) oluşur ve bu kodların hiçbirine ihtiyacımız yok. `pages/index.astro` kodunu şu kodla değiştirin (hoş geldiniz bileşenine ihtiyaç olmayacak):

**src/pages/index.astro**

```tsx
---
import * as Client from './packages/hello_world';

const contract = new Client.Client({
   ...Client.networks.testnet,
   rpcUrl: '<https://soroban-testnet.stellar.org:443>'
});

const { result } = await contract.hello({to: "Devs!"});
const greeting = result.join(" ");
---

<h1>{greeting}</h1>
```

İlk olarak binding kütüphanesini import ediyoruz, ardından önceki bir adımda testnet'e deploy ettiğimiz contract fonksiyonunu çağırmak için kullanabileceğimiz bir contract client tanımlamamız gerekiyor.

`hello()` contract fonksiyonu `{to: "Devs!"}` argümanı ile senkron olarak çağrılır ve beklenen yanıt "Hello" ve "Devs!"den oluşan bir dizidir. Sonuç dizisini birleştiriyoruz ve `greeting` sabiti artık `Hello Devs!` metnini tutmalıdır.

HTML bölümüne geçerek artık `greeting` metnini tarayıcıda görüntülemek istiyoruz. Hadi çalışırken görelim! Dev sunucusunu başlatın:

```bash
npm run dev
```

Ve tarayıcınızda [localhost:4321](http://localhost:4321/) adresini açın. Contract'tan gelen selamlamayı görmelisiniz!

Argümanı `{ to: 'Stellar' }` olarak güncellemeyi deneyebilirsiniz. Dosyayı kaydettiğinizde sayfa otomatik olarak güncellenecektir.

> ℹ️ **Bilgi**
>
> Dev sunucusunu `npm run dev` ile başlattığınızda, terminalinizde `npm run init` çalıştırdığınızda gördüğünüze benzer bir çıktı göreceksiniz. Bunun nedeni, package.json'daki `dev` script'inin `npm run init` ve `astro dev` çalıştıracak şekilde ayarlanmış olmasıdır, böylece deploy edilmiş contract'ınızın ve oluşturulan NPM paketinizin her zaman senkronize olduğundan emin olabilirsiniz. initialize.js script'i olmadan sadece dev sunucusunu başlatmak isterseniz `npm run astro dev` çalıştırabilirsiniz.