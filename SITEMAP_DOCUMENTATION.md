# 🗺️ مستندات Sitemap و SEO

## 📊 ساختار Sitemap

Sitemap سایت به صورت **Dynamic** و **خودکار** تولید می‌شود.

### 📁 فایل‌های مربوطه:

```
📦 Project
├── 📄 src/app/sitemap.ts          → تولید dynamic sitemap
├── 📄 public/robots.txt            → راهنمای Crawlers
└── 📄 SITEMAP_DOCUMENTATION.md     → این فایل
```

---

## 🎯 اولویت‌بندی صفحات (Priority)

| Priority | صفحات | دلیل |
|----------|-------|------|
| **1.0** | Homepage (`/`) | مهم‌ترین صفحه |
| **0.9** | Services, Select Car Group | صفحات کلیدی کسب‌وکار |
| **0.8** | About Us, Blog | محتوای مهم |
| **0.7** | Contact, Blog Posts | محتوای ثانویه |
| **0.6** | FAQ | محتوای پشتیبانی |
| **0.5** | Regulations | محتوای قانونی |

---

## 📅 فرکانس به‌روزرسانی (Change Frequency)

| Frequency | صفحات | دلیل |
|-----------|-------|------|
| **daily** | Homepage, Blog List | محتوای روزانه |
| **weekly** | Services, Flow Pages | آپدیت هفتگی |
| **monthly** | About, Contact, FAQ | محتوای نسبتاً ثابت |

---

## 🔧 نحوه کار Sitemap

### 1. تولید خودکار

```typescript
// src/app/sitemap.ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticRoutes = [...];
  
  // Dynamic blog routes (از API)
  const blogRoutes = await fetchBlogCategories();
  
  return [...staticRoutes, ...blogRoutes];
}
```

### 2. صفحات Static

صفحاتی که دستی در sitemap قرار گرفتن:

```javascript
✅ /                                    (Homepage)
✅ /about-us                            (درباره ما)
✅ /services                            (خدمات)
✅ /contact-us                          (تماس)
✅ /blog                                (لیست بلاگ)
✅ /faq                                 (سوالات متداول)
✅ /regulations                         (قوانین)
✅ /car-inspection-flow/select-car-group (شروع فلو)
```

### 3. صفحات Dynamic

صفحاتی که از API خوانده می‌شن:

```javascript
✅ /blog/[id]    → از API: SiteBlog/SearchWithTermsCategory
```

**مثال:**
```
/blog/1
/blog/2
/blog/3
...
```

---

## 🚫 صفحات Excluded (خارج از Sitemap)

این صفحات در sitemap نیستن (و در robots.txt هم Disallow شدن):

```
❌ /car-inspection-flow/inspection-method
❌ /car-inspection-flow/inspection-location
❌ /car-inspection-flow/inspection-time
❌ /car-inspection-flow/insert-information
❌ /car-inspection-flow/final-confirm
❌ /car-inspection-flow/payment-success
❌ /Profile/*
❌ /login
❌ /register
❌ /verify-otp
❌ /new-service
```

**دلیل:** این صفحات private هستن و نباید توسط Google index بشن.

---

## 📍 دسترسی به Sitemap

### URL عمومی:
```
https://carmacheck.com/sitemap.xml
```

### محلی (Development):
```
http://localhost:3000/sitemap.xml
```

---

## 🔍 تست Sitemap

### 1. چک کردن محلی

```bash
npm run build
npm start

# باز کردن در مرورگر:
http://localhost:3000/sitemap.xml
```

### 2. Google Search Console

1. برو به [Google Search Console](https://search.google.com/search-console)
2. کلیک روی "Sitemaps"
3. اضافه کن: `https://carmacheck.com/sitemap.xml`
4. کلیک روی "Submit"

### 3. Bing Webmaster Tools

1. برو به [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. "Sitemaps" → "Submit Sitemap"
3. URL: `https://carmacheck.com/sitemap.xml`

---

## 🤖 robots.txt

فایل `robots.txt` به crawlers می‌گه کجا بگردن و کجا نگردن:

### ساختار:

```txt
User-agent: *

# ✅ Allow
Allow: /
Allow: /blog/

# ❌ Disallow
Disallow: /Profile/
Disallow: /api/

# 🗺️ Sitemap
Sitemap: https://carmacheck.com/sitemap.xml
```

### تست robots.txt:

```bash
# محلی
http://localhost:3000/robots.txt

# Production
https://carmacheck.com/robots.txt
```

---

## 📊 نمونه خروجی Sitemap

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://carmacheck.com/</loc>
    <lastmod>2025-12-05</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://carmacheck.com/about-us</loc>
    <lastmod>2025-12-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://carmacheck.com/blog/1</loc>
    <lastmod>2025-12-05</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <!-- ... more URLs -->
</urlset>
```

---

## 🚀 بهینه‌سازی‌های اعمال شده

### 1. ✅ Cache Strategy

```typescript
next: { revalidate: 3600 } // Cache for 1 hour
```

بلاگ‌ها هر 1 ساعت یکبار از API فچ می‌شن → کاهش بار سرور.

### 2. ✅ Error Handling

```typescript
try {
  const data = await fetchBlogCategories();
} catch (error) {
  console.error('Error:', error);
  return []; // Return empty array
}
```

اگه API مشکل داشت، sitemap همچنان کار می‌کنه (با صفحات static).

### 3. ✅ TypeScript Types

```typescript
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ...
}
```

Type-safe sitemap با استفاده از Next.js types.

### 4. ✅ Crawl-delay

```txt
Crawl-delay: 1
```

به crawlers می‌گیم 1 ثانیه بین هر request صبر کنن → محافظت از سرور.

---

## 📈 مزایای این Sitemap

### 1. **Dynamic & Up-to-date**
- بلاگ‌های جدید خودکار اضافه می‌شن
- نیازی به آپدیت دستی نیست

### 2. **SEO Optimized**
- Priority صحیح برای هر صفحه
- Change Frequency مناسب
- LastModified date

### 3. **Performance**
- Cache برای 1 ساعت
- کاهش API calls
- Error handling

### 4. **Google-Friendly**
- استاندارد XML Sitemap
- robots.txt کامل
- Canonical URLs

---

## 🔄 به‌روزرسانی Sitemap

### خودکار (Recommended)

Sitemap هر بار که rebuild می‌شه، به‌روز می‌شه:

```bash
npm run build
```

### دستی (فقط در Development)

```bash
# Restart dev server
npm run dev
```

### ISR (در Production)

با ISR، sitemap هر 1 ساعت یکبار خودکار به‌روز می‌شه.

---

## 🎓 Best Practices

### ✅ Do:

1. **Priority را منطقی تنظیم کن**
   - Homepage: 1.0
   - صفحات مهم: 0.8-0.9
   - صفحات عادی: 0.5-0.7

2. **Change Frequency را واقعی بذار**
   - محتوای روزانه: `daily`
   - محتوای هفتگی: `weekly`
   - محتوای ماهانه: `monthly`

3. **فقط صفحات public رو شامل شو**
   - صفحات لاگین/پروفایل نباید باشن

4. **LastModified را به‌روز نگه دار**
   - استفاده از `new Date()` برای صفحات dynamic

### ❌ Don't:

1. **صفحات private رو اضافه نکن**
   - `/Profile/*`
   - `/login`, `/register`

2. **Priority رو همه جا 1.0 نذار**
   - فقط Homepage باید 1.0 باشه

3. **صفحات duplicate رو اضافه نکن**
   - یک URL یکبار

4. **Sitemap رو خیلی بزرگ نکن**
   - حداکثر 50,000 URL
   - اگه بیشتر شد، چند sitemap بساز

---

## 📝 Checklist راه‌اندازی

- [x] ساخت `src/app/sitemap.ts`
- [x] آپدیت `public/robots.txt`
- [x] تست محلی (localhost:3000/sitemap.xml)
- [ ] Submit به Google Search Console
- [ ] Submit به Bing Webmaster Tools
- [ ] مانیتور کردن indexing
- [ ] چک کردن Google Search Console Coverage Report

---

## 🔗 لینک‌های مفید

- [Next.js Sitemap Documentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Google Search Console](https://search.google.com/search-console)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)
- [Robots.txt Tester](https://support.google.com/webmasters/answer/6062598)

---

## 🎯 نتیجه

با این Sitemap:

- ✅ Google بهتر سایت رو index می‌کنه
- ✅ بلاگ‌های جدید خودکار اضافه می‌شن
- ✅ SEO بهبود پیدا می‌کنه
- ✅ Crawl budget بهینه استفاده می‌شه
- ✅ صفحات private محافظت شدن

**آماده برای production!** 🚀

---

**تاریخ**: دسامبر 2025  
**وضعیت**: ✅ Production Ready

