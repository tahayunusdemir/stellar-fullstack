# 🌟 Stellar Full Stack Challenge - Vibe Coding Workshop

## Step-by-Step Tutorial Guide

Bu rehber, workshop boyunca adım adım ilerlemenizi sağlayacak şekilde hazırlanmıştır.
Her adımı sırayla tamamlamanız, projeyi sorunsuz şekilde oluşturmanıza yardımcı olur.

**Hazırsanız başlayalım 🚀**

---

## 1. Freighter Wallet Kurulumu ✅ [TAMAMLANDI]

İlk adım olarak Freighter Wallet eklentisini tarayıcınıza ekleyin.
Bu, Stellar ağı üzerinde işlem yapmamızı sağlayan cüzdanımız olacak.

### 🔗 Kurulum Linki:
[Freighter Wallet Chrome Extension](https://chromewebstore.google.com/detail/freighter/bcacfldlkkdogcmkkibnjlakofdplcbk)

### Adımlar:

1. Linke tıklayın
2. **"Add to Chrome"** (Chrome'a ekle) butonuna basın
3. Kurulum tamamlandığında, Freighter simgesi tarayıcınızın üst kısmında belirecek
4. Yeni bir cüzdan oluşturun veya mevcut Stellar hesabınızı bağlayın

---

## 2. PDR (Product Design) Dosyalarını İndirme ✅ [TAMAMLANDI]

Workshop sırasında kullanacağımız proje dokümanlarını indiriyoruz.

### 🔗 İndirme Linki:
[Workshop Dosyaları - Google Drive](https://drive.google.com/drive/folders/1rCfJFC0ATEik9n8WsH42kuCzJ5_ADhNH?usp=sharing)

### Yapılacaklar:

- Linke tıklayıp **3 adet .md uzantılı dosyayı** indirin:
  - `pdr.md`
  - `FreighterWalletDocs.md`
  - `StellarDeploy.md`
- Bu dosyalar proje sürecinde size rehberlik edecek

---

## 3. ChatGPT ile Proje Fikri Bulma ✅ [TAMAMLANDI]

**Seçilen Proje:** ScholarChain - Öğrenci Ödül Platformu

Şimdi ChatGPT'yi açın ve aşağıdaki promptu girin.
Bu prompt, Stellar ekosistemi üzerinde geliştirebileceğiniz mini dApp fikirleri oluşturacak.

### 💬 ChatGPT Promptu:

```
Stellar ekosisteminde geliştirebileceğim 10-15 basit proje fikri ver. 
Örnekler: charity bağış dApp'i, basit cüzdan uygulaması gibi. 
Fikirler farklı meslekler, sanatlar, sporlar gibi alanlara yönelik veya 
günlük problemlere çözüm sunan mini dApp'ler olabilir. 
Her fikrin kısa bir amacı ve Stellar ile nasıl bağlandığı da belirtilsin.
```

**👉 ChatGPT'nin ürettiği fikirlerden hoşunuza giden birini seçin.**

---

## 4. Projenize İsim Belirleme ✅ [TAMAMLANDI]

**Seçilen İsim:** 🎓 **ScholarChain**

Seçtiğiniz proje fikrini kopyalayın ve ChatGPT'ye şunu yazın:

```
"Bu proje fikrine uygun yaratıcı proje isimleri öner."
```

**💡 ChatGPT'den gelen öneriler arasından beğendiğiniz bir ismi seçin.**
Bu isim, klasörünüzün ve projenizin adı olacak.

---

## 5. Proje Klasörünü Hazırlama ✅ [TAMAMLANDI]

1. **Masaüstüne yeni bir klasör oluşturun**
   - Klasör adı: seçtiğiniz proje ismi

2. **İndirdiğiniz .md uzantılı üç dosyayı** bu klasörün içine atın

3. **Visual Studio Code, Cursor, veya kullandığınız AI destekli IDE ile klasörü açın**

---

## 6. PDR Dosyasını Düzenleme ✅ [TAMAMLANDI]

Klasör içindeki `pdr.md` dosyasını açın.

İçeride bulunan şu bölümü bulun:

```
[Bu kısımda projenizi anlatın]
```

✅ **PDR dosyası ScholarChain projesi için özelleştirildi.**

---

## 7. IDE'de AI Agent Modunu Açma ✅ [TAMAMLANDI]

1. Sağ tarafta bulunan **chat panelini** açın
2. **Agent Mode** sekmesini seçin
3. Mevcut en yeni **Claude sürümünü** seçin (Claude 4, 3.7, 3.5 fark etmez)

Bu, kodlama sırasında size yardımcı olacak yapay zekayı etkinleştirecek.

---

## 8. ChatGPT'den Kendi Promptunuzu Oluşturma

ChatGPT'ye kendi proje fikrinizi gönderin.
Ardından aşağıdaki promptu yapıştırın ⬇️

### 🧠 ChatGPT Promptu:

```
Sana yukarıda verdiğim proje fikrine göre aşağıdaki promptu 
Cursor'a-Copilot'a vermem için özelleştirmeni istiyorum.

Bu 2. Pages ve 3. Soroban Contract (Rust) kısımlarını 
benim proje fikrime özel hale getir. Promptun genel akışını bozma, 
sadece donate kısımlarını (yani sana verdiğim fikirdeki projeye ait olan kısımları) 
benim yukarıdaki proje fikrime göre değiştir. 

Genel mantığın ve akışın aynı kalmasını istiyorum, 
başka bir şeyde değişiklik yapma.

---

// Build a minimal donation dApp using Next.js (TypeScript), Tailwind CSS, and Stellar Soroban

Check my pdr.md , FreighterWalletDocs.md , StellarDeploy.md File while Coding Process

// ✅ 1. Freighter Wallet
// - Connect button using window.freighterApi
// - Save publicKey to localStorage or state
// - Disconnect clears state
// - Redirect to /main on success

// ✅ 2. Pages
// - index.tsx: connect page with one button
// - main.tsx: donation UI with:
//   - Input: donation amount (XLM)
//   - Input: recipient wallet address
//   - Button: Donate
//   - Display: total donated + last donor

// ✅ 3. Soroban Contract (Rust)
// - Function: donate(address, amount) → saves state
// - Function: get_total_donated() → returns u32
// - Function: get_last_donor() → returns Address
// - Use `env.storage().persistent()`
// - No external crates or complex logic

// ✅ 4. Frontend Integration
// - Call contract functions via Stellar SDK (testnet)
// - Sign tx with Freighter
// - Use try/catch for errors
// - Console log tx results

// ❌ NO: complex logic, extra styling, fee logic, access control
// ✅ YES: clean code, comments, full flow works in <2 hours

Wait for my new prompt for deployment part
```

---

## 9. IDE'ye Promptu Gönderme

1. **ChatGPT'den aldığınız** size özel yeni promptu kopyalayın
2. **Cursor veya VSCode** içindeki AI chat kısmına yapıştırın

Böylece projeniz için kişisel bir **"AI coding prompt"** oluşturmuş olacaksınız.

---

## 🎯 Artık Hazırsınız!

Bu noktadan sonra **Claude** veya **Cursor Copilot** size projenizi adım adım oluşturmanızda yardımcı olacak.

Workshop'ta rehberliği takip ederek kendi **Stellar mini dApp'inizi** geliştirebilirsiniz.

### 💡 İpucu:
Proje geliştirme sürecinde aldığınız hataları **Agent mode**'u kullanarak Cursor ya da Copilot'a atmaya devam ederek projenizdeki hataları çözebilirsiniz.

---

**🚀 İyi Çalışmalar!**

