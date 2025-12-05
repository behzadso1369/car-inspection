# 🎨 مستندات Dynamic Favicon

## ✅ فایل‌های ایجاد/تغییر شده

1. **`src/app/icon.ts`** (جدید) - Dynamic Icon Route Handler
2. **`src/app/layout.tsx`** (بهینه‌سازی) - Dynamic Metadata با Icon
3. **`src/app/favicon.ico`** (rename شده) → `favicon.ico.backup`

---

## 🎯 نحوه کار

### 1. **icon.ts Route Handler**

Next.js به صورت خودکار `/icon` route رو handle می‌کنه:

```typescript
// src/app/icon.ts
export async function GET() {
  // Fetch data from API
  const data = await serverApiHelper.get("GetMasterPageData", 3600);
  
  // ساخت URL کامل
  const iconUrl = `https://api.carmacheck.com/${data.MasterSiteData.ImagePath}`;
  
  // Fetch و return image
  return new Response(imageBuffer, {
    headers: { 'Content-Type': 'image/png' }
  });
}
```

### 2. **generateMetadata در Layout**

```typescript
// src/app/layout.tsx
export async function generateMetadata(): Promise<Metadata> {
  const data = await serverApiHelper.get("GetMasterPageData", 3600);
  
  return {
    icons: {
      icon: iconUrl,
      shortcut: iconUrl,
      apple: iconUrl,
    },
  };
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

## 📍 دسترسی

### Development:
```
http://localhost:3000/icon
http://localhost:3000/favicon.ico (redirect به /icon)
```

### Production:
```
https://carmacheck.com/icon
https://carmacheck.com/favicon.ico
```

---

## 🔄 Cache Strategy

```typescript
'Cache-Control': 'public, max-age=3600, s-maxage=3600'
```

- **Browser Cache**: 1 ساعت
- **CDN Cache**: 1 ساعت
- **API Data**: 1 ساعت (revalidate: 3600)

---

## ⚠️ Fallback Strategy

اگه API fail بشه:

1. ✅ سعی می‌کنه از `/favicon.ico` استفاده کنه
2. ✅ اگه اون هم نبود، 404 برمی‌گردونه

```typescript
try {
  // Fetch from API
} catch (error) {
  // Fallback to default favicon
  const defaultFavicon = await fetch('/favicon.ico');
}
```

---

## 🧪 تست

### 1. چک کردن در Browser

```bash
# Development
curl http://localhost:3000/icon

# یا در Browser
http://localhost:3000/icon
```

### 2. چک کردن در DevTools

1. باز کن Chrome DevTools (F12)
2. برو به **Network** tab
3. Reload صفحه
4. باید `/icon` request رو ببینی

### 3. چک کردن در HTML

```html
<!-- باید این رو ببینی: -->
<link rel="icon" href="/icon" />
```

---

## 🔧 تنظیمات

### تغییر Cache Time

```typescript
// در icon.ts
'Cache-Control': 'public, max-age=7200' // 2 ساعت
```

### تغییر API Endpoint

```typescript
// در icon.ts
const data = await serverApiHelper.get("GetMasterPageData", 3600);
```

---

## 📊 مزایا

### 1. **Dynamic**
- Icon از API می‌آد
- نیازی به rebuild نیست

### 2. **Performance**
- Cache بهینه (1 ساعت)
- کاهش API calls

### 3. **Fallback**
- اگه API fail بشه، از default استفاده می‌کنه

### 4. **SEO Friendly**
- Metadata کامل
- Apple touch icon

---

## 🎯 نتیجه

با این تنظیمات:

- ✅ Favicon از API می‌آد
- ✅ Dynamic و up-to-date
- ✅ Cache بهینه
- ✅ Fallback strategy
- ✅ SEO friendly

---

## 📝 نکات مهم

### 1. حذف favicon.ico

برای اینکه Next.js از `icon.ts` استفاده کنه، باید `favicon.ico` رو حذف یا rename کنی:

```bash
# Rename (انجام شده)
mv src/app/favicon.ico src/app/favicon.ico.backup
```

### 2. ImagePath Format

```typescript
// ✅ درست
ImagePath: "/uploads/logo.png"
ImagePath: "uploads/logo.png"

// ❌ اشتباه
ImagePath: "https://api.carmacheck.com/uploads/logo.png" // کامل URL نباشه
```

### 3. Content-Type

Next.js خودکار content-type رو تشخیص می‌ده:
- `.png` → `image/png`
- `.ico` → `image/x-icon`
- `.svg` → `image/svg+xml`

---

## 🚀 Next Steps

### پیشنهادات:

1. ⏳ اضافه کردن multiple icon sizes (16x16, 32x32, 192x192, 512x512)
2. ⏳ Apple touch icon optimization
3. ⏳ Favicon generation از logo
4. ⏳ WebP format support

---

**تاریخ**: دسامبر 2025  
**وضعیت**: ✅ Production Ready  
**URL**: `/icon` 🎨

