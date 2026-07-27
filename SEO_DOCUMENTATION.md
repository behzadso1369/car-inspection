# 📊 مستندات کامل SEO پروژه کارماچک

این سند شامل تمام جزئیات پیاده‌سازی SEO در پروژه کارشناسی خودرو کارماچک است.

---

## 📚 فهرست مطالب

1. [استانداردهای SEO](#استانداردهای-seo)
2. [معماری SEO پروژه](#معماری-seo-پروژه)
3. [تنظیمات پیش‌فرض](#تنظیمات-پیشفرض)
4. [SEO هر صفحه](#seo-هر-صفحه)
5. [Meta Tags و Schema](#meta-tags-و-schema)
6. [Canonical URLs](#canonical-urls)
7. [چک‌لیست تست SEO](#چکلیست-تست-seo)
8. [بهینه‌سازی‌های پیشرفته](#بهینهسازیهای-پیشرفته)

---

## 🎯 استانداردهای SEO

### طول بهینه محتوا

| عنصر | حداقل | بهینه | حداکثر |
|------|-------|-------|--------|
| **Title** | 30 کاراکتر | 50-60 کاراکتر | 70 کاراکتر |
| **Description** | 120 کاراکتر | 150-160 کاراکتر | 165 کاراکتر |
| **Keywords** | 5 کلمه | 8-10 کلمه | 15 کلمه |
| **URL** | - | 3-5 کلمه | 100 کاراکتر |

### اصول طلایی SEO

✅ **Title باید شامل باشد:**
- برند در انتها (مثل "... | کارماچک")
- کلمه کلیدی اصلی در ابتدا
- جذاب و کلیک‌پذیر
- یکتا برای هر صفحه

✅ **Description باید شامل باشد:**
- خلاصه محتوای صفحه
- Call-to-action
- کلمات کلیدی طبیعی
- ارزش پیشنهادی (Value Proposition)

✅ **Keywords باید:**
- مرتبط با محتوا باشند
- شامل long-tail keywords
- به ترتیب اهمیت
- بدون تکرار زیاد

---

## 🏗 معماری SEO پروژه

### ساختار فایل‌ها

```
project/
├── next-seo.config.ts          # تنظیمات پیش‌فرض SEO
├── src/
│   ├── lib/
│   │   └── seo.ts              # SEO Utilities و Helpers
│   └── app/
│       ├── layout.tsx          # Root Layout با DefaultSeo
│       ├── page.tsx            # Homepage (ISR + Metadata)
│       ├── about-us/
│       │   └── page.tsx        # About (ISR + Metadata)
│       ├── services/
│       │   └── page.tsx        # Services (ISR + Metadata)
│       ├── contact-us/
│       │   └── page.tsx        # Contact (SSG + Metadata)
│       ├── blog/
│       │   ├── page.tsx        # Blog List (CSR + NextSeo)
│       │   └── [id]/
│       │       └── page.tsx    # Blog Detail (ISR + generateMetadata)
│       ├── faq/
│       │   └── page.tsx        # FAQ (CSR + NextSeo)
│       └── regulations/
│           └── page.tsx        # Regulations (ISR + Metadata)
```

---

## ⚙️ تنظیمات پیش‌فرض

### next-seo.config.ts

```typescript
export const DEFAULT_SEO = {
  titleTemplate: "%s | کارماچک",
  defaultTitle: "کارماچک | کارشناسی تخصصی خودرو",
  description: "کارشناسی تخصصی خودرو با ۹۰٪ دقت...",
  canonical: "https://carmacheck.com",
  
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: "کارماچک - کارشناسی خودرو",
  },
  
  twitter: {
    cardType: "summary_large_image",
  },
};
```

### متغیرهای محیطی

```env
# .env.local
NEXT_PUBLIC_SITE_URL=https://carmacheck.com
NEXT_PUBLIC_API_BASE_URL=https://api.carmacheck.com
```

---

## 📄 SEO هر صفحه

### 1. صفحه اصلی (/)

**نوع رندرینگ:** ISR (revalidate: 10 دقیقه)

**SEO Metadata:**
```typescript
{
  title: "کارماچک | کارشناسی تخصصی خودرو با کارشناسان مجرب",
  description: "کارشناسی تخصصی خودرو با ۹۰٪ دقت | بیش از ۲۵ هزار کارشناسی موفق | کارشناسی در محل یا مرکز | دریافت گزارش فوری | تهران",
  keywords: [
    "کارشناسی خودرو",
    "کارشناسی ماشین",
    "خرید خودرو",
    "کارماچک",
    "کارشناسی در محل",
    // ...
  ],
  canonical: "https://carmacheck.com"
}
```

**دلیل استراتژی:**
- صفحه اصلی ورودگاه اصلی سایت است
- SEO بسیار حیاتی برای جذب ترافیک ارگانیک
- محتوای دینامیک اما نیاز به سرعت بالا
- ISR برای تعادل بین سرعت و به‌روز بودن

---

### 2. درباره ما (/about-us)

**نوع رندرینگ:** ISR (revalidate: 1 ساعت)

**SEO Metadata:**
```typescript
{
  title: "درباره کارماچک | ۲۵ سال تجربه در کارشناسی خودرو",
  description: "کارماچک با بیش از ۲۵ سال تجربه و ۹۰٪ دقت در کارشناسی، بیش از ۲۵ هزار کارشناسی موفق انجام داده است. کارشناسان حرفه‌ای و مجرب.",
  keywords: [
    "درباره کارماچک",
    "تاریخچه کارماچک",
    "کارشناسان کارماچک",
    "تجربه کارشناسی"
  ],
  canonical: "https://carmacheck.com/about-us"
}
```

**استراتژی محتوا:**
- تأکید بر تجربه و اعتماد
- نمایش آمار و دستاوردها
- معرفی تیم و کارشناسان
- برندینگ و اعتماد‌سازی

---

### 3. خدمات (/services)

**نوع رندرینگ:** ISR (revalidate: 1 ساعت)

**SEO Metadata:**
```typescript
{
  title: "خدمات کارشناسی خودرو | استاندارد و VIP",
  description: "انواع خدمات کارشناسی: استاندارد از ۲۵۰ هزار تومان | VIP از ۴۵۰ هزار تومان | بررسی موتور، برق، تایر، ترمز و سیستم سوخت | گزارش فوری",
  keywords: [
    "قیمت کارشناسی",
    "کارشناسی استاندارد",
    "کارشناسی VIP",
    "هزینه کارشناسی خودرو"
  ],
  canonical: "https://carmacheck.com/services"
}
```

**نکات مهم:**
- ذکر قیمت در description برای جذب کلیک
- توضیح کامل هر سرویس
- مقایسه پکیج‌ها
- CTA واضح برای رزرو

---

### 4. تماس با ما (/contact-us)

**نوع رندرینگ:** SSG

**SEO Metadata:**
```typescript
{
  title: "تماس با کارماچک | ۰۲۱-۹۱۰۰۱۷۴۰",
  description: "تماس با کارماچک: ۰۲۱-۹۱۰۰۱۷۴۰ | آدرس: میدان رسالت,خیابان هنگام,نبش خیابان دوازدهم,پلاک497(نمایندگی زارعی) کاری: شنبه تا چهارشنبه ۹-۱۸",
  keywords: [
    "تماس با کارماچک",
    "شماره تماس کارشناسی",
    "آدرس کارماچک",
    "ساعات کاری"
  ],
  canonical: "https://carmacheck.com/contact-us"
}
```

**Schema.org:**
```json
{
  "@type": "Organization",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+98-21-91001740",
    "contactType": "customer service"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "میدان رسالت,خیابان هنگام,نبش خیابان دوازدهم,پلاک497(نمایندگی زارعی)"
  }
}
```

---

### 5. بلاگ (/blog)

**نوع رندرینگ:** CSR (با NextSeo)

**SEO Implementation:**
```typescript
<NextSeo
  title="مقالات کارشناسی خودرو | مجله کارماچک"
  description="مقالات تخصصی درباره کارشناسی خودرو، نکات خرید ماشین، بررسی عیوب رایج..."
  canonical="https://carmacheck.com/blog"
/>
```

**دلیل CSR:**
- تعامل زیاد (search, filter, tabs)
- State management پیچیده
- نیاز به UX روان

---

### 6. جزئیات بلاگ (/blog/[id])

**نوع رندرینگ:** ISR (revalidate: 30 دقیقه)

**Dynamic Metadata:**
```typescript
export async function generateMetadata({ params }) {
  const post = await fetchPost(params.id);
  
  return {
    title: `${post.title} | مقالات کارشناسی`,
    description: post.excerpt.slice(0, 160),
    canonical: `https://carmacheck.com/blog/${params.id}`,
    
    openGraph: {
      type: "article",
      images: [{ url: post.image }],
      article: {
        publishedTime: post.date,
        authors: [post.author],
      }
    }
  };
}
```

**استراتژی:**
- Pre-render کردن 10 مقاله محبوب
- generateStaticParams برای SEO بهتر
- Dynamic metadata برای هر مقاله
- Schema.org Article

---

### 7. سوالات متداول (/faq)

**نوع رندرینگ:** CSR (با NextSeo)

**SEO Implementation:**
```typescript
<NextSeo
  title="سوالات متداول | پاسخ به سوالات کارشناسی خودرو"
  description="پاسخ به سوالات متداول درباره فرآیند کارشناسی، هزینه‌ها، مدت زمان..."
/>
```

**Schema.org FAQPage:**
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "هزینه کارشناسی چقدر است؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "..."
      }
    }
  ]
}
```

---

### 8. قوانین و مقررات (/regulations)

**نوع رندرینگ:** ISR (revalidate: 1 ساعت)

**SEO Metadata:**
```typescript
{
  title: "قوانین و مقررات | شرایط استفاده از خدمات کارماچک",
  description: "قوانین و مقررات استفاده از خدمات کارشناسی کارماچک، حریم خصوصی، شرایط پرداخت...",
  canonical: "https://carmacheck.com/regulations"
}
```

---

## 🔗 Canonical URLs - نکات مهم

### چرا Canonical مهم است؟

1. **جلوگیری از Duplicate Content**
   - Google صفحات تکراری را جریمه می‌کند
   - Canonical به Google می‌گوید کدام نسخه اصلی است

2. **تمرکز Link Juice**
   - تمام SEO power به یک URL می‌رسد
   - رتبه بهتر در نتایج جستجو

3. **مدیریت پارامترها**
   - `?page=1` vs بدون پارامتر
   - UTM parameters

### استاندارد پیاده‌سازی

```typescript
// ✅ صحیح
canonical: "https://carmacheck.com/about-us"

// ❌ غلط
canonical: "https://carmacheck.com/about-us/"  // اسلش پایانی
canonical: "http://carmacheck.com/about-us"    // بدون HTTPS
canonical: "/about-us"                          // Relative URL
canonical: "https://www.carmacheck.com"         // با www (اگر اصلی بدون www است)
```

### قوانین Canonical

1. **همیشه absolute URL**
   ```typescript
   const canonical = `${process.env.NEXT_PUBLIC_SITE_URL}/path`;
   ```

2. **بدون اسلش پایانی** (به جز root)
   ```typescript
   // ✅ صحیح
   "https://carmacheck.com"           // Root
   "https://carmacheck.com/services"  // بدون /
   
   // ❌ غلط
   "https://carmacheck.com/services/" // با /
   ```

3. **همیشه HTTPS**

4. **Lowercase URLs**
   ```typescript
   // ✅ صحیح
   "/about-us"
   
   // ❌ غلط
   "/About-Us"
   ```

### تست Canonical

```bash
# بررسی با curl
curl -I https://carmacheck.com/about-us | grep -i canonical

# بررسی در Chrome DevTools
# Elements tab > <head> > <link rel="canonical">
```

---

## 📊 Meta Tags و Schema

### Open Graph (Facebook, LinkedIn)

```typescript
openGraph: {
  type: "website",           // یا "article" برای بلاگ
  locale: "fa_IR",
  url: "https://...",
  siteName: "کارماچک",
  title: "...",
  description: "...",
  images: [
    {
      url: "https://.../og-image.jpg",
      width: 1200,
      height: 630,          // نسبت 1.91:1
      alt: "...",
      type: "image/jpeg"
    }
  ]
}
```

**سایز بهینه تصاویر:**
- Facebook: 1200×630 px
- Twitter: 1200×628 px  
- LinkedIn: 1200×627 px

### Twitter Card

```typescript
twitter: {
  card: "summary_large_image",
  site: "@carmacheck",
  creator: "@carmacheck",
  title: "...",
  description: "...",
  images: ["https://.../twitter-image.jpg"]
}
```

### JSON-LD Schema

**Organization Schema:**
```typescript
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "کارماچک",
  "url": "https://carmacheck.com",
  "logo": "https://carmacheck.com/logo.svg",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+98-21-91001740",
    "contactType": "customer service",
    "availableLanguage": "Persian"
  }
}
```

**Service Schema:**
```typescript
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "کارشناسی خودرو",
  "provider": {
    "@type": "Organization",
    "name": "کارماچک"
  },
  "areaServed": "تهران"
}
```

---

## ✅ چک‌لیست تست SEO

### تست‌های اولیه

- [ ] **Title تمام صفحات یکتا است**
- [ ] **Description تمام صفحات یکتا است**
- [ ] **Canonical URLs صحیح هستند**
- [ ] **Keywords مرتبط و بدون spam**
- [ ] **Images دارای alt text**
- [ ] **Heading hierarchy صحیح (H1 > H2 > H3)**

### تست‌های فنی

```bash
# 1. بررسی robots.txt
curl https://carmacheck.com/robots.txt

# 2. بررسی sitemap.xml
curl https://carmacheck.com/sitemap.xml

# 3. بررسی response headers
curl -I https://carmacheck.com

# 4. بررسی canonical
curl https://carmacheck.com | grep -i canonical
```

### ابزارهای تست

1. **Google Search Console**
   - URL Inspection
   - Coverage Report
   - Core Web Vitals

2. **Lighthouse (Chrome DevTools)**
   ```bash
   # CLI
   npm install -g lighthouse
   lighthouse https://carmacheck.com --view
   ```

3. **Rich Results Test**
   - https://search.google.com/test/rich-results

4. **Facebook Sharing Debugger**
   - https://developers.facebook.com/tools/debug/

5. **Twitter Card Validator**
   - https://cards-dev.twitter.com/validator

### چک‌لیست صفحه به صفحه

#### Homepage (/)
- [x] Title شامل کلمات کلیدی اصلی
- [x] Description جذاب و واضح
- [x] Canonical به root
- [x] Schema Organization
- [x] OG image 1200×630

#### About Us (/about-us)
- [x] Title شامل تجربه/آمار
- [x] Description شامل USP
- [x] Team photos با alt text
- [x] Schema Organization

#### Services (/services)
- [x] Title شامل انواع سرویس
- [x] Description شامل قیمت
- [x] Schema Service
- [x] FAQ Schema (اگر سوال دارد)

#### Blog (/blog/[id])
- [x] Dynamic Metadata
- [x] Schema Article
- [x] OG type: "article"
- [x] publishedTime, modifiedTime
- [x] Author attribution

---

## 🚀 بهینه‌سازی‌های پیشرفته

### 1. Core Web Vitals

**LCP (Largest Contentful Paint)**
- تصاویر بهینه با next/image
- Font optimization
- Critical CSS inline

**FID (First Input Delay)**
- Code splitting
- Lazy loading
- Reduce JavaScript

**CLS (Cumulative Layout Shift)**
- Width/height برای images
- Font loading strategy
- Reserve space for ads

### 2. Image Optimization

```typescript
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="توضیح دقیق تصویر"
  width={1200}
  height={630}
  priority={isAboveFold}
  loading={isAboveFold ? "eager" : "lazy"}
  quality={85}
/>
```

### 3. Font Optimization

```typescript
// app/layout.tsx
import localFont from 'next/font/local';

const iranSans = localFont({
  src: '../fonts/IranSans.woff2',
  display: 'swap',
  preload: true,
});
```

### 4. Structured Data

همه Schema ها در `src/lib/seo.ts` آماده هستند:

```typescript
import { 
  generateOrganizationSchema,
  generateServiceSchema,
  generateArticleSchema,
  generateFAQSchema 
} from '@/lib/seo';
```

### 5. Sitemap و Robots

**robots.txt:**
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /Profile/

Sitemap: https://carmacheck.com/sitemap.xml
```

**sitemap.xml** (Next.js 13+):
```typescript
// app/sitemap.ts
export default function sitemap() {
  return [
    {
      url: 'https://carmacheck.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://carmacheck.com/about-us',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // ...
  ];
}
```

---

## 📈 نظارت و Tracking

### Google Analytics 4

```typescript
// app/layout.tsx
import Script from 'next/script';

<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
  strategy="afterInteractive"
/>
```

### Google Tag Manager

```typescript
<Script
  id="gtm"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      (function(w,d,s,l,i){...})(window,document,'script','dataLayer','GTM-XXXXXX');
    `,
  }}
/>
```

### Schema Validation

```bash
# نصب validator
npm install schema-dts

# تست schema
npm run validate-schema
```

---

## 🔍 Keywords Strategy

### Primary Keywords
1. کارشناسی خودرو (Volume: بالا)
2. کارشناسی ماشین (Volume: بالا)
3. خرید خودرو (Volume: خیلی بالا)
4. کارماچک (Brand)

### Secondary Keywords
1. کارشناسی خودرو در محل
2. کارشناسی خودرو تهران
3. قیمت کارشناسی خودرو
4. کارشناس خودرو
5. بهترین کارشناس

### Long-tail Keywords
1. هزینه کارشناسی خودرو در تهران
2. کارشناسی خودرو قبل از خرید
3. چک لیست کارشناسی خودرو
4. نکات خرید ماشین دست دوم

---

## 🎯 نتیجه‌گیری

✅ **تمام صفحات دارای SEO کامل هستند**
✅ **Canonical URLs استاندارد و صحیح**
✅ **Meta Tags بهینه و در محدوده استاندارد**
✅ **Schema.org برای صفحات کلیدی**
✅ **Open Graph و Twitter Cards**
✅ **Dynamic Metadata برای صفحات دینامیک**
✅ **ISR برای بهترین عملکرد SEO**

### مزایای پیاده‌سازی:

1. **Ranking بهتر در Google** 📈
2. **CTR بالاتر در نتایج جستجو** 🎯
3. **Share زیبا در شبکه‌های اجتماعی** 🌐
4. **User Experience بهتر** ✨
5. **کاهش Bounce Rate** 📉
6. **افزایش Organic Traffic** 🚀

---

**نسخه:** 1.0  
**تاریخ:** دسامبر 2025  
**نویسنده:** تیم توسعه کارماچک  
**وضعیت:** ✅ Production Ready

