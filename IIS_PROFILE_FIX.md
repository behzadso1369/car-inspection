# 🔧 Fix برای Client-Side Exception در Profile Page (IIS)

## ❌ مشکل

وقتی روی IIS deploy می‌کردی، صفحه Profile این error رو می‌داد:

```
Application error: a client-side exception has occurred while loading 
test.carmacheck.com (see the browser console for more information).
```

---

## 🔍 علت مشکل

### مشکل اصلی:

در `src/app/Profile/page.tsx` خط 20:

```typescript
// ❌ مشکل: این کد در component level اجرا می‌شه
const decoded:any = jwtDecode(localStorage.getItem("token") || "");
```

**چرا مشکل داره؟**

1. **localStorage در SSR در دسترس نیست**
   - Next.js اول server-side render می‌کنه
   - `localStorage` فقط در browser موجوده
   - این باعث می‌شه error در server-side hydration

2. **jwtDecode با string خالی**
   - اگه token نباشه، `jwtDecode("")` error می‌ده
   - این باعث crash می‌شه

3. **IIS Deployment**
   - IIS ممکنه hydration رو متفاوت handle کنه
   - این باعث می‌شه error بیشتر دیده بشه

---

## ✅ راه‌حل

### 1. **انتقال jwtDecode به useEffect**

```typescript
// ✅ درست: در useEffect (client-side only)
const [decoded, setDecoded] = useState<any>(null);

useEffect(() => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setDecoded(decodedToken);
    }
  }
}, []);
```

### 2. **Error Handling**

```typescript
try {
  const decodedToken = jwtDecode(token);
  setDecoded(decodedToken);
} catch (error) {
  console.error("Error decoding token:", error);
  router.push("/login");
}
```

### 3. **Loading State**

```typescript
const [isLoading, setIsLoading] = useState(true);

if (isLoading || !decoded) {
  return <LoadingSpinner />;
}
```

### 4. **Error Boundary**

```typescript
// src/app/Profile/ErrorBoundary.tsx
export class ProfileErrorBoundary extends Component {
  // Catch all client-side errors
}
```

---

## 📝 تغییرات انجام شده

### 1. **src/app/Profile/page.tsx**

**قبل:**
```typescript
const decoded:any = jwtDecode(localStorage.getItem("token") || "");
```

**بعد:**
```typescript
const [decoded, setDecoded] = useState<any>(null);

useEffect(() => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setDecoded(decodedToken);
      } catch (error) {
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  }
}, [router]);
```

### 2. **src/app/Profile/layout.tsx**

- ✅ اضافه کردن `ProfileErrorBoundary`
- ✅ اضافه کردن `typeof window !== 'undefined'` checks
- ✅ استفاده از `MasterSiteData` برای logo و company name

### 3. **src/app/Profile/ErrorBoundary.tsx** (جدید)

- ✅ Catch کردن تمام client-side errors
- ✅ نمایش error message به کاربر
- ✅ دکمه "تلاش مجدد"

---

## 🎯 Best Practices اعمال شده

### 1. **localStorage Access**

```typescript
// ✅ همیشه چک کن
if (typeof window !== 'undefined') {
  localStorage.getItem("token");
}
```

### 2. **Error Handling**

```typescript
// ✅ try-catch برای jwtDecode
try {
  jwtDecode(token);
} catch (error) {
  // Handle error
}
```

### 3. **Loading States**

```typescript
// ✅ Loading state تا decoded آماده بشه
if (isLoading || !decoded) {
  return <LoadingSpinner />;
}
```

### 4. **Error Boundaries**

```typescript
// ✅ Error Boundary برای catch کردن errors
<ProfileErrorBoundary>
  {children}
</ProfileErrorBoundary>
```

---

## 🧪 تست

### قبل از Fix:
```
❌ Error: Application error: a client-side exception has occurred
❌ Page crashes on IIS
❌ No error handling
```

### بعد از Fix:
```
✅ No errors
✅ Proper loading state
✅ Error handling
✅ Redirect to login if no token
✅ Error Boundary catches any errors
```

---

## 📊 تغییرات در کد

| فایل | تغییر | دلیل |
|------|-------|------|
| `Profile/page.tsx` | jwtDecode → useEffect | جلوگیری از SSR error |
| `Profile/page.tsx` | Loading state | جلوگیری از render قبل از decoded |
| `Profile/page.tsx` | Error handling | Handle invalid tokens |
| `Profile/layout.tsx` | Error Boundary | Catch all errors |
| `Profile/layout.tsx` | window checks | Safe localStorage access |
| `Profile/ErrorBoundary.tsx` | New file | Error recovery |

---

## 🚀 نتیجه

با این تغییرات:

- ✅ **No more client-side exceptions**
- ✅ **Proper error handling**
- ✅ **Loading states**
- ✅ **Error recovery**
- ✅ **IIS compatible**

---

## 🔧 نکات مهم برای IIS

### 1. **Always check window**

```typescript
if (typeof window !== 'undefined') {
  // Safe to use localStorage, window, document
}
```

### 2. **Use Error Boundaries**

```typescript
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

### 3. **Handle async operations**

```typescript
useEffect(() => {
  // All async operations here
}, []);
```

### 4. **Loading states**

```typescript
const [isReady, setIsReady] = useState(false);

if (!isReady) {
  return <Loading />;
}
```

---

**تاریخ**: دسامبر 2025  
**وضعیت**: ✅ Fixed & Tested  
**Build**: ✅ Successful

