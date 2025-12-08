# 📱 مستندات Manifest.json

## ✅ فایل ایجاد شده

**`src/app/manifest.ts`** - Dynamic Manifest Generator

---

## 🎯 ویژگی‌ها

### 1. **Dynamic Data از API**

Manifest به صورت خودکار از API data می‌خوانه:

```typescript
const data = await serverApiHelper.get("GetMasterPageData", 3600);

// استفاده از ImagePath
iconUrl = `${API_BASE_URL}/${data.MasterSiteData.ImagePath}`;
```

### 2. **خودکار در Next.js**

Next.js به صورت خودکار:
- ✅ `manifest.json` رو در `/manifest.json` می‌سازه
- ✅ `<link rel="manifest">` رو در `<head>` اضافه می‌کنه
- ✅ Cache می‌کنه (revalidate: 3600 = 1 ساعت)

---

## 📋 محتوای Manifest

### اطلاعات از API:

| فیلد | منبع | Fallback |
|------|------|----------|
| **name** | `MasterSiteData.CompanyName` | "کارماچک" |
| **short_name** | `MasterSiteData.CompanyName` | "کارماچک" |
| **description** | `MasterSiteData.Description` | "کارشناسی تخصصی خودرو..." |
| **icons[].src** | `MasterSiteData.ImagePath` | "/favicon.ico" |

### اطلاعات ثابت:

```json
{
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#416CEA",
  "orientation": "portrait-primary",
  "categories": ["automotive", "business", "productivity"],
  "lang": "fa",
  "dir": "rtl"
}
```

---

## 🔗 URL Icon

Icon URL به این صورت ساخته می‌شه:

```typescript
// اگه ImagePath = "/uploads/logo.png"
iconUrl = "https://api.carmacheck.com/uploads/logo.png"

// اگه ImagePath = "uploads/logo.png" (بدون /)
iconUrl = "https://api.carmacheck.com/uploads/logo.png"
```

---

## 📊 Icons Array

Manifest شامل 3 icon entry هست:

1. **Icon 1**: `sizes: 'any'`, `purpose: 'any'`
2. **Icon 2**: `sizes: '192x192'`, `purpose: 'maskable'`
3. **Icon 3**: `sizes: '512x512'`, `purpose: 'any'`

---

## 🚀 نحوه استفاده

### 1. دسترسی به Manifest

**Development:**
```
http://localhost:3000/manifest.json
```

**Production:**
```
https://carmacheck.com/manifest.json
```

### 2. خودکار در HTML

Next.js خودکار این رو اضافه می‌کنه:

```html
<link rel="manifest" href="/manifest.json" />
```

### 3. Cache Strategy

```typescript
revalidate: 3600 // 1 ساعت
```

Manifest هر 1 ساعت یکبار از API refresh می‌شه.

---

## 🧪 تست Manifest

### 1. چک کردن در Browser

```bash
# Development
curl http://localhost:3000/manifest.json

# Production
curl https://carmacheck.com/manifest.json
```

### 2. Chrome DevTools

1. باز کن Chrome DevTools (F12)
2. برو به **Application** tab
3. کلیک روی **Manifest**
4. باید manifest رو ببینی

### 3. PWA Testing

```bash
# Chrome Lighthouse
# برو به Lighthouse → Progressive Web App
# باید PWA score بالا باشه
```

---

## 📝 نمونه خروجی

```json
{
  "name": "کارماچک",
  "short_name": "کارماچک",
  "description": "کارشناسی تخصصی خودرو با کارشناسان مجرب",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#416CEA",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "https://api.carmacheck.com/uploads/logo.png",
      "sizes": "any",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "https://api.carmacheck.com/uploads/logo.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "https://api.carmacheck.com/uploads/logo.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    }
  ],
  "categories": ["automotive", "business", "productivity"],
  "lang": "fa",
  "dir": "rtl",
  "scope": "/",
  "id": "/"
}
```

---

## 🔧 تنظیمات

### تغییر Theme Color

```typescript
theme_color: '#416CEA', // رنگ اصلی سایت
```

### تغییر Background Color

```typescript
background_color: '#ffffff', // رنگ پس‌زمینه
```

### اضافه کردن Icon Sizes بیشتر

```typescript
icons: [
  // ... existing icons
  {
    src: iconUrl,
    sizes: '384x384',
    type: 'image/png',
    purpose: 'any',
  },
]
```

---

## ⚠️ نکات مهم

### 1. ImagePath باید Valid باشه

```typescript
// ✅ درست
ImagePath: "/uploads/logo.png"

// ✅ درست
ImagePath: "uploads/logo.png"

// ❌ اشتباه
ImagePath: "https://api.carmacheck.com/uploads/logo.png" // کامل URL نباشه
```

### 2. Cache

Manifest هر 1 ساعت یکبار refresh می‌شه. اگه می‌خوای بیشتر refresh بشه:

```typescript
const data = await serverApiHelper.get("GetMasterPageData", 600); // 10 دقیقه
```

### 3. Error Handling

اگه API fail بشه، از fallback values استفاده می‌کنه:

```typescript
let iconUrl = '/favicon.ico'; // fallback
let siteName = 'کارماچک'; // fallback
```

---

## 🎯 مزایا

### 1. **Dynamic & Up-to-date**
- Icon و اطلاعات از API می‌آد
- نیازی به rebuild نیست

### 2. **PWA Ready**
- Manifest کامل برای PWA
- Installable on mobile

### 3. **SEO Friendly**
- Metadata کامل
- RTL support

### 4. **Performance**
- Cache برای 1 ساعت
- کاهش API calls

---

## 📈 نتیجه

با این Manifest:

- ✅ PWA installable
- ✅ Icon از API می‌آد
- ✅ اطلاعات dynamic
- ✅ Cache بهینه
- ✅ RTL support
- ✅ Mobile optimized

---

**تاریخ**: دسامبر 2025  
**وضعیت**: ✅ Production Ready  
**URL**: `/manifest.json` 🚀

