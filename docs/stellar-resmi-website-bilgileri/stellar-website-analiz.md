# Stellar Website Teknik Analiz Raporu

> **Detaylı teknik analiz:** Stellar.org web sitesinin mimari, tasarım sistemi, animasyonlar ve performans optimizasyonları hakkında kapsamlı inceleme.

## 🎨 Hızlı Referans Tablosu

| Kategori | Özellik | Değer/Detay |
|----------|---------|-------------|
| **Framework** | Next.js | React 18+ with App Router, SSG |
| **Styling** | styled-components | v3854+ with theme system |
| **Animation** | Framer Motion | v78504, duration: 0.2s |
| **CMS** | Sanity.io | Headless CMS + Image CDN |
| **Fonts** | Custom WOFF2 | Lora, Inter, Schabo, IBM Plex Mono |
| **Colors (Light)** | bg/fg/primary | `#FFFFFF` / `#000000` / `#FFB800` |
| **Colors (Dark)** | bg/fg/primary | `#0A0A0A` / `#FFFFFF` / `#FFB800` |
| **Breakpoints** | mobile/tablet/desktop/wide | 0px / 768px / 1024px / 1440px+ |
| **Grid** | Columns | 12-column responsive system |
| **Accessibility** | WCAG | AA compliant, ARIA, keyboard nav |
| **Performance** | Optimization | Code splitting, lazy loading, WOFF2 |

---

## 📋 İçindekiler
1. [Framework & Mimari](#-framework--mimari)
2. [Stil Sistemi](#-stil-sistemi)
3. [Tipografi & Fontlar](#-tipografi--fontlar)
4. [Tema ve Renk Sistemi](#-tema-ve-renk-sistemi)
5. [Performans Optimizasyonları](#-performans-optimizasyonları)
6. [Analytics & Tracking](#-analytics--tracking)
7. [Uluslararasılaşma (i18n)](#-uluslararasılaşma-i18n)
8. [Önemli Teknik Özellikler](#-önemli-teknik-özellikler)
9. [Meta Tags & SEO](#-meta-tags--seo)
10. [Sonuç ve Öneriler](#-sonuç-ve-öneriler)
11. [Proje Başlangıç Rehberi](#-benzer-tema-için-proje-başlangıç-rehberi)
12. [Best Practices](#-best-practices-özeti)

---

## 🏗️ Framework & Mimari

### Next.js Framework
Stellar website, **Next.js** framework'ü kullanılarak geliştirilmiştir.

**Kanıtlar:**
- `__BUILD_MANIFEST` ve `__SSG_MANIFEST` varlığı
- Next.js özel routing pattern'leri
- Static Site Generation (SSG) kullanımı

**Routing Yapısı:**
```javascript
// SSG ile oluşturulan sayfalar
["/404", "/500", "/[[...segments]]"]

// Dinamik route'lar
"/collections/[...routeId]"
"/preview/[id]"

// Özel sayfalar
"/rss.xml"
"/sitemap.xml"
```

**Rewrites (URL Yönlendirmeleri):**
```javascript
// İngilizce için
"/en/resources" → "/collections/0b0d6c15-a315-4794-b7a8-c954415d1362"
"/en/blog" → "/collections/59c95156-d8d7-450a-93dc-f93fcb2976c1"

// İspanyolca için
"/es/blog" → "/collections/jwy2iBBepIeuO67QYFWbZz"
"/es/ecosistema" → "/collections/jwy2iBBepIeuO67QYFVvyx"
```

---

## 🎨 Stil Sistemi

### styled-components
Site, **styled-components** kütüphanesini kullanmaktadır.

**Özellikler:**
- Template literal syntax (`.vJ`)
- Component-based styling
- Dynamic theming desteği
- Server-side rendering uyumlu

**Örnek Kullanım:**
```javascript
// Global stil tanımlamaları
const GlobalStyle = styled.vJ`
  body {
    background-color: ${({theme}) => theme.colors.background.toString()};
    color: ${({theme}) => theme.colors.foreground.toString()};
  }
`;

// Modal stilleri
const ModalStyle = styled.ZP`
  background-color: ${({theme}) => theme.colors.background.toString()};
  color: ${({theme}) => theme.colors.foreground.toString()};
  border-radius: ${({theme}) => theme.border.radius};
  padding: 1.5rem;
`;
```

### CSS Reset
Kapsamlı bir CSS reset uygulanmış:
- `box-sizing: border-box` tüm elementlere uygulanır
- Tüm margin ve padding sıfırlanır
- List stilleri kaldırılır
- Font smoothing optimizasyonları

```css
html {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -khtml-font-smoothing: antialiased;
  -apple-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}
```

---

## ✍️ Tipografi & Fontlar

Site 4 özel font ailesi kullanmaktadır:

### 1. **Lora** (Serif - Başlıklar için)
```css
@font-face {
  font-family: __lora_06f760;
  src: url(../images/228f42325bf402fb-s.p.woff2) format("woff2");
  font-display: swap;
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: __lora_06f760;
  src: url(../images/fd18e0bc729b0822-s.p.woff2) format("woff2");
  font-display: swap;
  font-weight: 600;
  font-style: italic;
}
```
- **Font Ağırlıkları:** 400 (normal), 600 (italic)
- **Kullanım Alanı:** Başlıklar ve vurgu metinleri
- **Fallback:** `__lora_Fallback_06f760, serif`

### 2. **Inter** (Sans-serif - Ana Metin)
```css
@font-face {
  font-family: __inter_2ff36d;
  src: url(../images/f1f0c35b32161446-s.p.woff2) format("woff2");
  font-display: swap;
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: __inter_2ff36d;
  src: url(../images/fcb100c7607696fd-s.p.woff2) format("woff2");
  font-display: swap;
  font-weight: 600;
}
```
- **Font Ağırlıkları:** 400, 600
- **Kullanım Alanı:** Body text, paragraflar
- **Fallback:** `__inter_Fallback_2ff36d, sans-serif`

### 3. **Schabo** (Display Font)
```css
@font-face {
  font-family: __schabo_854c7e;
  src: url(../images/a3da5eae6f08b9cf-s.p.woff2) format("woff2");
  font-display: swap;
}
```
- **Kullanım Alanı:** Özel başlıklar ve marka elementleri
- **Fallback:** `__schabo_Fallback_854c7e, sans-serif`

### 4. **IBM Plex Mono** (Monospace - Kod)
```css
@font-face {
  font-family: __ibmPlexMono_fde9af;
  src: url(../images/6e3aea9f3a99634d-s.p.woff2) format("woff2");
  font-display: swap;
}
```
- **Kullanım Alanı:** Kod blokları ve teknik içerik
- **Fallback:** `__ibmPlexMono_Fallback_fde9af, sans-serif`

### Font Optimizasyonları
- ✅ **WOFF2 formatı** - En küçük dosya boyutu
- ✅ **font-display: swap** - FOUT (Flash of Unstyled Text) önleme
- ✅ **Fallback metrik ayarları** - Layout shift önleme
- ✅ **Preload** - Kritik fontlar önceden yüklenir

---

## 🌗 Tema ve Renk Sistemi

### Theme Provider Yapısı
Stellar, dinamik tema değiştirme özelliğine sahiptir.

**Theme Object Yapısı:**
```javascript
theme = {
  colors: {
    background: Color,      // Ana arka plan rengi
    foreground: Color,      // Ana metin rengi
    primaryText: Color,     // Vurgu metni rengi
    iconButton: { color: Color }
  },
  border: { radius: string },
  breakpoints: { mobileFirst: function }
}
```

**Color Object Methods:**
```javascript
color.toString()          // Rengi string'e çevirir
color.isDark()           // Dark mode kontrolü
color.alpha(value)       // Opacity ayarı
```

### Renk Paleti

#### Ana Marka Rengi
- **generousGold (#FFB800)** - Stellar'ın signature altın rengi
  - CTA butonlar, vurgular, marka elementleri

#### Tema Renkleri
| Özellik | Light Mode | Dark Mode |
|---------|------------|-----------|
| Background | `#FFFFFF` | `#0A0A0A` |
| Foreground | `#000000` | `#FFFFFF` |
| Primary | `#FFB800` | `#FFB800` |
| Overlay | `rgba(0,0,0,0.2)` | `rgba(255,255,255,0.1)` |

### Dark Theme Implementasyonu

**Otomatik Dark Mode Algılama:**
```javascript
// Theme-aware styling
body {
  background-color: ${({theme}) => theme.colors.background.toString()};
  color: ${({theme}) => theme.colors.foreground.toString()};
}

// Conditional overlay colors
background-color: ${({theme}) => 
  theme.colors.background.isDark()
    ? "rgba(255, 255, 255, 0.1)"
    : "rgba(0, 0, 0, 0.2)"
};
```

**Özellikler:**
- ✅ Theme state yönetimi
- ✅ `isDark()` metodu ile dark mode tespiti
- ✅ Tüm componentlerde tema context'i kullanımı
- ✅ Smooth transition animasyonları (0.2s ease)
- ✅ LocalStorage + System preference detection

---

## ⚡ Performans Optimizasyonları

### 1. Font Loading Stratejileri
```html
<!-- Critical fonts preload -->
<link rel="preload" href="/_next/static/media/f1f0c35b32161446-s.p.woff2" 
      as="font" type="font/woff2" crossorigin="anonymous">
<link rel="preload" href="/_next/static/media/fcb100c7607696fd-s.p.woff2" 
      as="font" type="font/woff2" crossorigin="anonymous">
```

- ✅ Preload critical fonts
- ✅ WOFF2 format (en iyi sıkıştırma)
- ✅ font-display: swap
- ✅ Fallback font metrics

### 2. Code Splitting
```javascript
// Route-based code splitting
"/[[...segments]]" → "pages/[[...segments]]-71b1123d8255f998.js"
"/collections/[...routeId]" → "pages/collections/[...routeId]-225f85fdb333a2c4.js"

// Dynamic chunks
"82186-185cf65e69334f94.js"
"26793-806445b2536cdc30.js"
```

### 3. Asset Optimization
- **Preconnect** external domains:
  ```html
  <link rel="preconnect" href="https://cdn.sanity.io">
  <link rel="preconnect" href="https://dev.visualwebsiteoptimizer.com">
  ```
- **Deferred JavaScript** loading
- **Lazy loading** for images

### 4. Image Optimization (Sanity.io)
```
https://cdn.sanity.io/images/e2r40yh6/production-i18n/
  99d61fd48d3faa071cb72003fc7aa33847faf457-3840x2160.png
  ?rect=0%2C72%2C3840%2C2016&w=1200&h=630&v=2
```
- Dinamik resim boyutlandırma
- Format optimizasyonu
- Crop ve rect parametreleri
- Cache versioning

---

## 📊 Analytics & Tracking

### Google Tag Manager
```javascript
// GTM Implementation
dataLayer = dataLayer || [];
dataLayer.push({
  'gtm.start': new Date().getTime(),
  event: 'gtm.js'
});

// Container ID
GTM-PZKFMZMV
```

**Özellikler:**
- Event tracking
- Custom dimensions
- E-commerce tracking
- User interaction analytics

### VWO (Visual Website Optimizer)
- A/B testing platform
- Conversion rate optimization
- Heatmaps ve user behavior tracking

### Custom Click Tracking
```javascript
// Built-in analytics tracking
const {trackClick} = useAnalytics();

onClick = (e) => {
  trackClick(e);
  // Custom handler
}
```

### reCAPTCHA Enterprise
```html
<script src="./scripts/recaptcha__tr.js" 
        crossorigin="anonymous" 
        integrity="sha384-..."></script>
```
- Form koruması
- Bot detection
- Newsletter signup güvenliği

---

## 🌍 Uluslararasılaşma (i18n)

### Desteklenen Diller
- 🇬🇧 **English (en)** - Varsayılan
- 🇪🇸 **Spanish (es)**

### URL Yapısı
```javascript
// nextInternalLocale pattern
/:nextInternalLocale(en|es)/...

// Örnekler
/en/blog          → English blog
/es/blog          → Spanish blog
/en/developers    → English developers
/es/desarrolladores → Spanish developers
```

### Hreflang Tags
```html
<link rel="canonical" href="https://stellar.org">
<link rel="alternate" hreflang="es" href="https://stellar.org/es">
<link rel="alternate" hreflang="en" href="https://stellar.org">
```

### Locale-Specific Routes
```javascript
// İngilizce
"/en/resources" → "/collections/0b0d6c15-a315-4794-b7a8-c954415d1362"
"/en/case-studies" → "/collections/19e0f38a-9f54-4841-b9ca-52ec9e7e30e6"

// İspanyolca
"/es/estudios-de-caso" → "/collections/1SV0nEaKnhaFBrimtIhXGy"
"/es/ecosistema" → "/collections/jwy2iBBepIeuO67QYFVvyx"
```

---

## 🔧 Önemli Teknik Özellikler

### 1. Content Management System
**Sanity.io Integration**
- Headless CMS
- Real-time content updates
- Image CDN (`cdn.sanity.io`)
- Multi-language support
- Responsive image optimization
  - Dynamic resizing (`w=1200&h=630`)
  - Crop ve rect parametreleri
  - Format optimization
  - Cache versioning (`v=2`)

**Sanity Image URL Pattern:**
```
https://cdn.sanity.io/images/e2r40yh6/production-i18n/
  {imageId}-{width}x{height}.{format}
  ?rect=0,72,3840,2016&w=1200&h=630&v=2
```

### 2. Animation System
**Framer Motion (v78504)**
```javascript
// Modal animations
motion = {
  initial: {y: "1.5rem"},
  animate: {y: "0rem"},
  exit: {y: "1.5rem"},
  transition: {duration: 0.2}
}

// Collapse/Expand animations
{
  initial: {height: 0},
  animate: {height: "auto"},
  transition: {duration: 0.2}
}

// Fade animations
{
  initial: {opacity: 0},
  animate: {opacity: 1},
  exit: {opacity: 0},
  transition: {duration: 0.2}
}

// Scroll-based animations
- useMotionValue() hook ile scroll tracking
- translateY animasyonları
- Threshold ve factor kontrolü
```

**Animation Hooks:**
- `useRef()` - Animation element referansları
- `useEffect()` - Animation lifecycle
- `useMemo()` - Performance optimizasyonu
- `trackEnter()` / `trackExit()` - Analytics tracking

### 3. Responsive Design
**Mobile-First Approach**
```javascript
// Breakpoint system - mobileFirst stratejisi
theme.breakpoints.mobileFirst({
  padding: spacing({
    small: "20px 32px",
    medium: "24px 40px",
    large: "32px 48px"
  })
})

// Responsive grid system
theme.breakpoints.mobileFirst({
  gridTemplateColumns: 'repeat(12, 1fr)',
  gridColumnGap: '1rem',
  gridRowGap: '1rem'
})

// Media query sistemi
breakpoints.get(size).start  // Breakpoint başlangıç değeri
// Örnek: (min-width: 768px) and (max-width: 1023px)

// orLower metodu - belirli breakpoint ve altı
breakpoint.orLower(property)  // Mobile-first yaklaşımı
```

**Breakpoint Mekanizması:**
- Dinamik media query oluşturma
- `exact()` metodu ile hassas breakpoint kontrolü
- Grid system responsive değerleri
- Object position ve fit değerleri responsive

### 4. Viewport Handling
```css
html, body {
  height: 100%;
  height: 100dvh;  /* Dynamic viewport height - mobil için */
}
```

### 5. Code Syntax Highlighting
**Prism.js Implementation**
```css
div.code-toolbar {
  position: relative;
}

div.code-toolbar > .toolbar {
  position: absolute;
  z-index: 10;
  top: 0.3em;
  right: 0.2em;
  transition: opacity 0.3s ease-in-out;
  opacity: 0;
}

div.code-toolbar:hover > .toolbar {
  opacity: 1;
}
```

### 6. Icon System
- SVG-based icons
- `aria-hidden` accessibility
- Dynamic sizing
- Theme-aware colors

### 7. Modal System
```javascript
// Modal component features
- Scrim overlay (backdrop) - rgba overlay ile
- Motion animations - Framer Motion entegrasyonu
- Focus trap - autoFocus desteği
- ESC key handling
- Accessibility (ARIA)
- Portal rendering - DOM'da farklı yere render
- Scroll lock - Modal açıkken body scroll engelleme

// Modal motion config
{
  initial: {y: "1.5rem", opacity: 0},
  animate: {y: "0rem", opacity: 1},
  exit: {y: "1.5rem", opacity: 0},
  transition: {duration: 0.2}
}

// Scrim (backdrop) motion
{
  initial: {opacity: 0},
  animate: {opacity: 1},
  exit: {opacity: 0},
  transition: {duration: 0.2}
}

// Scroll lock implementasyonu
body {
  overflowY: "hidden",
  paddingRight: `${paddingRight + scrollbarWidth}px`
}
```

**Modal Özellikleri:**
- Min/max genişlik ve yükseklik kontrolü
- Center alignment (mainAxisAlignment, crossAxisAlignment)
- Border radius theme entegrasyonu (`theme.border.radius`)
- Background ve foreground renkler theme'den gelir
- AnimatePresence ile enter/exit animasyonları

### 8. Form Handling
- reCAPTCHA Enterprise protection
- Custom validation
- Error handling
- Success states
- Newsletter integration

### 9. Grid System
**Responsive Grid Layout**
```javascript
// Grid container
styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: ${spacing};
  grid-row-gap: ${spacing};
`

// Grid item
styled.div`
  grid-column-start: ${start};
  grid-row-start: ${start};
  grid-column-end: span ${columns};
  grid-row-end: span ${rows};
`

// Responsive grid with breakpoints
theme.breakpoints.mobileFirst({
  gridTemplateColumns: exact => 
    exact(columns) ? `repeat(${exact(columns)}, 1fr)` : undefined
})
```

**Grid Özellikleri:**
- 12 column sistemi (standart)
- Responsive column/row span
- Dynamic gap (column ve row için ayrı)
- Start position kontrolü
- Nested grid desteği

### 10. Header Behavior System
**Scroll-based Header**
```javascript
// Header davranış modları
headerBehavior = {
  position: "fixed" | "static",  // Header konumu
  reserveSpace: true | false,     // Space rezervasyonu
  initialHeight: "80px",          // Başlangıç yüksekliği
  threshold: 0,                   // Scroll threshold
  factor: 1                       // Hide/show faktörü
}

// Scroll tracking
const {position: {y}} = useScroll()
const translateY = calculateTranslate(y, threshold, factor)

// Hide/Show logic
scrollDown && scrollY > threshold 
  ? translateY = -headerHeight  // Hide
  : translateY = 0               // Show
```

**Header Features:**
- Scroll position tracking
- Auto-hide on scroll down
- Auto-show on scroll up
- Smooth transitions
- Height measurement ve tracking
- `isOpen` state management

### 11. Typography System
**Text Components**
```javascript
// Text alignment
textAlign: exact(align)  // Responsive alignment

// Line clamping (overflow ellipsis)
{
  display: "-webkit-box",
  "-webkit-box-orient": "vertical",
  "-webkit-line-clamp": lineClamp,
  overflow: "hidden"
}

// No wrap
{
  maxWidth: "100%",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis"
}
```

**Typography Özellikleri:**
- Responsive text alignment
- Multi-line ellipsis (line clamp)
- Single-line ellipsis (no wrap)
- Font family inheritance
- Dynamic line height

### 12. Image System
**Responsive Images**
```javascript
// Picture element with multiple sources
<picture>
  <source media="(min-width: 1024px)" srcSet={desktop} />
  <source media="(min-width: 768px)" srcSet={tablet} />
  <img src={mobile} alt="" />
</picture>

// Object fit styling
styled.img`
  object-position: ${position};  // center, top, bottom
  object-fit: ${fit};            // cover, contain, fill
`
```

**Image Özellikleri:**
- Art direction support (farklı breakpoint'lerde farklı görseller)
- Lazy loading
- Aspect ratio preservation
- Object-fit ve object-position kontrolü
- Multiple format support (WOFF2 için fontlar, PNG/JPG/WebP görsel için)

### 13. Direction Support (RTL/LTR)
**Bi-directional Text Support**
```javascript
// Direction context
const DirectionContext = createContext({
  direction: LeftToRight | RightToLeft,
  setDirection: () => {}
})

// Direction provider
<DirectionProvider direction={LeftToRight}>
  {children}
</DirectionProvider>

// Hook kullanımı
const {direction, setDirection} = useDirection()
```

**Direction Features:**
- Left-to-Right (LTR) - Default
- Right-to-Left (RTL) - Arabic, Hebrew vb.
- Global direction control
- Dynamic direction switching

---

## 📱 Meta Tags & SEO

### Open Graph
```html
<meta property="og:title" content="Stellar | Blockchain Network...">
<meta property="og:description" content="Stellar Network: Discover...">
<meta property="og:image" content="https://cdn.sanity.io/images/...">
<meta property="og:type" content="website">
```

### Twitter Cards
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="Stellar">
<meta name="twitter:title" content="Stellar | Blockchain Network...">
```

### Favicons
Multiple sizes için optimize edilmiş:
- 32x32, 57x57, 76x76, 96x96
- 128x128, 192x192, 228x228
- PNG format
- Sanity.io CDN'den servis

---

## 🎯 Sonuç ve Öneriler

### Güçlü Yönler
✅ Modern Next.js architecture  
✅ Performans optimizasyonları (SSG, code splitting)  
✅ Kapsamlı dark theme desteği (`isDark()` metodu ile)  
✅ Accessible design patterns (ARIA, focus management)  
✅ Multi-language support (en/es)  
✅ Professional typography system (4 custom font ailesi)  
✅ Comprehensive analytics (GTM, VWO)  
✅ Advanced animation system (Framer Motion)  
✅ Mobile-first responsive design  
✅ Component-based architecture  
✅ Theme-aware color system  
✅ Bi-directional text support (RTL/LTR)  

### Kullanılan Teknolojiler Stack
- **Framework:** Next.js (React 18+)
- **Styling:** styled-components (v3854+)
- **CMS:** Sanity.io (Headless CMS)
- **Animation:** Framer Motion (v78504)
- **Analytics:** Google Tag Manager (GTM-PZKFMZMV), VWO
- **Security:** reCAPTCHA Enterprise
- **Fonts:** WOFF2 custom fonts (Lora, Inter, Schabo, IBM Plex Mono)
- **Code Highlighting:** Prism.js
- **i18n:** Next.js built-in (nextInternalLocale)
- **State Management:** React Context API
- **Hooks:** useState, useEffect, useContext, useRef, useMemo, useCallback

### React Hooks Kullanımı
```javascript
// State management
const [state, setState] = useState(initialValue)

// Side effects
useEffect(() => {
  // Effect logic
  return () => cleanup()
}, [dependencies])

// Ref management
const ref = useRef(null)

// Memoization
const memoizedValue = useMemo(() => compute(), [deps])

// Context
const theme = useContext(ThemeContext)
const {direction} = useContext(DirectionContext)
```

### Öğrenilecek Noktalar
1. **Theme & Styling:**
   - Dynamic theme switching ve `isDark()` metodu
   - styled-components ile theme integration
   - Responsive breakpoint system
   - Global styles ve CSS reset

2. **Next.js & Performance:**
   - Static Site Generation (SSG)
   - Route-based code splitting
   - Font/image preloading ve optimization
   - CDN kullanımı

3. **Animation & Interaction:**
   - Framer Motion enter/exit/scroll animations
   - AnimatePresence pattern
   - GPU-accelerated transforms

4. **Component Architecture:**
   - Modal system (portal, scroll lock, focus trap)
   - Header scroll behavior
   - 12-column grid layout
   - Responsive image system

5. **Accessibility & UX:**
   - ARIA attributes ve keyboard navigation
   - Focus management
   - Screen reader support
   - WCAG color contrast

---

## 🚀 Benzer Tema İçin Proje Başlangıç Rehberi

### Önerilen Proje Yapısı
```
stellar-fullstack/
├── frontend/
│   ├── app/                    # Next.js App Router
│   ├── components/
│   │   ├── layout/            # Header, Footer, Layout
│   │   ├── ui/                # Button, Modal, Card vb.
│   │   ├── sections/          # Hero, Features, CTA
│   │   └── animations/        # Framer Motion wrappers
│   ├── styles/
│   │   ├── theme.ts           # Theme configuration
│   │   ├── GlobalStyles.tsx   # Global CSS
│   │   └── colors.ts          # Color system
│   ├── hooks/
│   │   ├── useTheme.ts        # Theme hook
│   │   ├── useBreakpoint.ts   # Responsive hook
│   │   └── useScroll.ts       # Scroll tracking
│   ├── lib/
│   │   ├── sanity.ts          # Sanity client
│   │   └── analytics.ts       # Analytics wrapper
│   └── public/
│       └── fonts/             # Custom fonts (WOFF2)
└── backend/                    # Stellar smart contracts
```

### Kurulum Adımları

#### 1. Next.js Projesi Oluşturma
```bash
npx create-next-app@latest stellar-frontend --typescript --app --tailwind
cd stellar-frontend
```

#### 2. Gerekli Paketler
```bash
# Styling
npm install styled-components
npm install -D @types/styled-components

# Animation
npm install framer-motion

# CMS (Opsiyonel - Sanity.io yerine başka CMS kullanılabilir)
npm install next-sanity @sanity/image-url

# Analytics
npm install @next/third-parties

# Forms & Validation
npm install react-hook-form zod @hookform/resolvers

# Icons
npm install lucide-react

# Utilities
npm install clsx tailwind-merge
```

#### 3. styled-components Konfigürasyonu
```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig
```

#### 4. Theme, Font ve Dark Mode Setup
```typescript
// styles/theme.ts
export const lightTheme = {
  colors: {
    background: '#FFFFFF',
    foreground: '#000000',
    primary: '#FFB800',
    secondary: '#667085',
  },
  fonts: {
    heading: 'var(--font-lora)',
    body: 'var(--font-inter)',
    mono: 'var(--font-mono)',
  },
  breakpoints: {
    mobile: '0px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1440px',
  },
  border: { radius: '0.5rem' },
}

export const darkTheme = {
  ...lightTheme,
  colors: {
    background: '#0A0A0A',
    foreground: '#FFFFFF',
    primary: '#FFB800',
    secondary: '#94A3B8',
  },
}

// app/layout.tsx - Font Configuration
import { Inter, Lora, IBM_Plex_Mono } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'], variable: '--font-inter', display: 'swap',
})
const lora = Lora({ 
  subsets: ['latin'], variable: '--font-lora', 
  weight: ['400', '600'], style: ['normal', 'italic'], display: 'swap',
})
const ibmPlexMono = IBM_Plex_Mono({ 
  subsets: ['latin'], variable: '--font-mono', 
  weight: ['400', '600'], display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable} ${ibmPlexMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}

// hooks/useTheme.tsx - Dark Mode Implementation
'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '@/styles/theme'

type Theme = 'light' | 'dark'

const ThemeContext = createContext<{
  theme: Theme
  toggleTheme: () => void
}>({ theme: 'light', toggleTheme: () => {} })

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const saved = localStorage.getItem('theme') as Theme
    setTheme(saved || (isDark ? 'dark' : 'light'))
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light')

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
```

#### 5. Global Styles
```typescript
// styles/GlobalStyles.tsx
'use client'

import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  html, body {
    height: 100%;
    height: 100dvh; /* Dynamic viewport height */
  }

  body {
    font-family: var(--font-inter), sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.foreground};
    transition: background-color 0.2s ease, color 0.2s ease;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-lora), serif;
  }

  code, pre {
    font-family: var(--font-mono), monospace;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`

export default GlobalStyles
```

#### 6. Animation Components
```typescript
// components/animations/FadeIn.tsx
'use client'

import { motion } from 'framer-motion'

export function FadeIn({ 
  children, 
  delay = 0 
}: { 
  children: React.ReactNode
  delay?: number 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      {children}
    </motion.div>
  )
}
```

#### 7. Modal Component
```typescript
// components/ui/Modal.tsx
'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`

const Content = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.border.radius};
  padding: 2rem;
  max-width: 30rem;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
`

export function Modal({ 
  isOpen, 
  onClose, 
  children 
}: { 
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode 
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <Content
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </Content>
        </Overlay>
      )}
    </AnimatePresence>
  )
}
```

### Design System Constants

```typescript
// Stellar-inspired design tokens
export const designTokens = {
  colors: {
    gold: {
      50: '#FFFBEB', 100: '#FFF3C6', 500: '#FFB800',
      600: '#E5A500', 900: '#664900',
    },
    gray: {
      50: '#F9FAFB', 100: '#F3F4F6', 500: '#6B7280', 900: '#111827',
    },
    dark: { bg: '#0A0A0A', surface: '#1A1A1A', border: '#2A2A2A' }
  },
  fontSize: {
    xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem',
    xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem',
    '4xl': '2.25rem', '5xl': '3rem',
  },
  lineHeight: { tight: 1.25, normal: 1.5, relaxed: 1.75 },
  spacing: {
    0: '0', 1: '0.25rem', 2: '0.5rem', 3: '0.75rem',
    4: '1rem', 6: '1.5rem', 8: '2rem', 12: '3rem',
    16: '4rem', 24: '6rem',
  }
}
```

### Performance Checklist
- ✅ Font preloading
- ✅ Image optimization (Next.js Image)
- ✅ Code splitting (automatic with Next.js)
- ✅ Lazy loading components
- ✅ CSS-in-JS with styled-components
- ✅ Dynamic imports for modals
- ✅ Analytics lazy loading
- ✅ SEO meta tags
- ✅ Sitemap ve robots.txt

### Accessibility Checklist
- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Focus indicators
- ✅ Color contrast (WCAG AA minimum)
- ✅ Screen reader support
- ✅ Skip to content link
- ✅ Alt text for images

---

**Analiz Tarihi:** 2025-10-21  
**Analiz Edilen Site:** https://stellar.org  
**Framework Version:** Next.js (SSG/SSR)

---

## 📚 Ek Kaynaklar

### Dokumentasyon
- [Next.js Documentation](https://nextjs.org/docs)
- [styled-components Docs](https://styled-components.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Sanity.io Docs](https://www.sanity.io/docs)
- [React Docs](https://react.dev)

### Öğrenme Kaynakları
- Next.js App Router patterns
- styled-components theming
- Framer Motion animations
- Responsive design patterns
- Web accessibility (a11y)
- Performance optimization

### Tools & Libraries
- **Linting:** ESLint, Prettier
- **Type Safety:** TypeScript
- **Testing:** Jest, React Testing Library
- **Dev Tools:** React Developer Tools, Lighthouse
- **Analytics:** Google Analytics 4, Vercel Analytics

---

## 💡 Best Practices Özeti

### Dark Mode
```typescript
// isDark() check + smooth transitions
background.isDark() ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.2)"
transition: background-color 0.2s ease, color 0.2s ease
// LocalStorage + System preference detection
```

### Responsive Design
```typescript
// Mobile-first breakpoints
theme.breakpoints.mobileFirst({ padding: exact => exact(spacing) })
height: 100dvh  // Dynamic viewport height
gridTemplateColumns: exact(cols) ? `repeat(${exact(cols)}, 1fr)` : '1fr'
```

### Animation Performance
```typescript
// ✅ GPU-accelerated transforms
translateY: -headerHeight  // ✅ DOĞRU
top: -headerHeight         // ❌ Reflow tetikler

// Hooks optimization
const ref = useRef(null)
const value = useMemo(() => compute(), [deps])
```

### Font Loading
```typescript
// Preload + swap + fallback metrics
<link rel="preload" href="/fonts/inter.woff2" as="font" />
font-display: swap  // FOUT önleme
ascent-override, descent-override  // CLS önleme
```

### Component Patterns
```typescript
// Theme provider + AnimatePresence + Portal
<ThemeProvider theme={theme}>
  <GlobalStyles />
  <AnimatePresence>
    {isOpen && createPortal(<Modal />, document.body)}
  </AnimatePresence>
</ThemeProvider>
```

---

**Son Güncelleme:** 2025-10-21  
**Analiz Kapsamı:** Stellar.org (stellar-website-resmi/)  
**Optimize Edildi:** Tekrar eden içerikler birleştirildi, daha kompakt ve okunabilir hale getirildi

