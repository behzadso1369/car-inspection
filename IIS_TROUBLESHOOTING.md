# 🔧 Troubleshooting IIS 404 برای Homepage

## ❌ مشکل

صفحه اصلی (`/`) 404 می‌ده ولی بقیه صفحات کار می‌کنن.

---

## 🔍 مراحل Debug

### Step 1: چک کردن Next.js Server

```powershell
# در PowerShell (Admin)
netstat -ano | findstr :3000

# باید یک process نشون بده
```

**اگه چیزی نشون نداد:**
```powershell
# Start کردن server
cd C:\inetpub\wwwroot\car-inspection
node .next/standalone/server.js
```

---

### Step 2: Test کردن Next.js Server

```powershell
# از Server خودش
Invoke-WebRequest -Uri "http://localhost:3000/" -UseBasicParsing

# یا
curl http://localhost:3000/
```

**اگه 404 داد:**
- مشکل از Next.js server هست
- چک کن که build درست انجام شده

**اگه HTML برگردوند:**
- مشکل از IIS routing هست
- ادامه بده به Step 3

---

### Step 3: چک کردن IIS Application Pool

1. برو به **IIS Manager**
2. **Application Pools** → انتخاب Pool مربوط به سایت
3. مطمئن بشو که:
   - ✅ Status: **Started**
   - ✅ .NET CLR Version: **No Managed Code**
   - ✅ Managed Pipeline Mode: **Integrated**

**اگه Stopped بود:**
- Right-click → **Start**

---

### Step 4: چک کردن URL Rewrite Module

1. **IIS Manager** → **Server** (root)
2. **Modules** → دنبال **UrlRewriteModule** بگرد
3. اگه نبود:
   - Download کن: https://www.iis.net/downloads/microsoft/url-rewrite
   - Install کن
   - IIS رو restart کن

---

### Step 5: چک کردن ARR (Application Request Routing)

1. **IIS Manager** → **Server** (root)
2. **Application Request Routing Cache** → **Server Proxy Settings**
3. مطمئن بشو که:
   - ✅ **Enable proxy** checked هست

**اگه نبود:**
- Download کن: https://www.iis.net/downloads/microsoft/application-request-routing
- Install کن
- IIS رو restart کن

---

### Step 6: چک کردن Server Variables

1. **IIS Manager** → **Server** (root)
2. **URL Rewrite** → **View Server Variables**
3. مطمئن بشو که این variables **Allow** شدن:
   - `HTTP_ACCEPT_ENCODING`
   - `HTTP_X_ORIGINAL_ACCEPT_ENCODING`

**اگه نبودن:**
- **Add** کن
- IIS رو restart کن

---

### Step 7: Test کردن Rule در IIS

1. **IIS Manager** → **Sites** → سایت تو
2. **URL Rewrite**
3. **Next.js Root Path 1** → **Edit Rule**
4. **Test pattern**
5. Pattern: `^/?$`
6. Input: `/`
7. باید **Match** کنه

**اگه match نکرد:**
- Pattern رو تغییر بده به `^$` یا `^index\.html?$`

---

### Step 8: چک کردن IIS Logs

```
C:\inetpub\logs\LogFiles\W3SVC[SiteID]\
```

**دنبال این خطاها بگرد:**
- `404` برای `/`
- `500` برای reverse proxy
- `502` Bad Gateway

**مثال:**
```
2025-12-05 10:00:00 127.0.0.1 GET / 80 - 127.0.0.1 - 404 0 0 0
```

---

### Step 9: چک کردن web.config Location

مطمئن بشو که `web.config` در **root directory** سایت هست:

```
C:\inetpub\wwwroot\car-inspection\web.config
```

**نه:**
```
C:\inetpub\wwwroot\web.config  ❌
C:\inetpub\wwwroot\car-inspection\.next\web.config  ❌
```

---

### Step 10: Restart IIS

```powershell
# در PowerShell (Admin)
iisreset
```

یا از IIS Manager:
- Right-click روی **Server** → **Restart**

---

## 🎯 راه‌حل‌های جایگزین

### راه‌حل 1: استفاده از `index.html` Redirect

اگه مشکل ادامه داشت، می‌تونی یک `index.html` در root بسازی:

```html
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="refresh" content="0; url=/">
</head>
<body>
    <script>window.location.href = '/';</script>
</body>
</html>
```

### راه‌حل 2: تغییر Port

اگه port 3000 مشکل داره:

```xml
<!-- در web.config -->
<action type="Rewrite" url="http://localhost:3001/" />
```

و در server:
```bash
PORT=3001 node .next/standalone/server.js
```

### راه‌حل 3: استفاده از iisnode

اگه از iisnode استفاده می‌کنی:

```xml
<handlers>
  <add name="iisnode" path="server.js" verb="*" modules="iisnode"/>
</handlers>
```

---

## 📋 Checklist کامل

- [ ] ✅ Next.js server روی port 3000 در حال اجراست
- [ ] ✅ `curl http://localhost:3000/` کار می‌کنه
- [ ] ✅ Application Pool **Started** هست
- [ ] ✅ URL Rewrite Module نصب شده
- [ ] ✅ ARR نصب شده و **Enable proxy** checked هست
- [ ] ✅ Server Variables allow شدن
- [ ] ✅ `web.config` در root directory هست
- [ ] ✅ `defaultDocument enabled="false"` هست
- [ ] ✅ Rule برای root path (`^/?$`) اضافه شده
- [ ] ✅ IIS restart شده
- [ ] ✅ Browser cache پاک شده

---

## 🚨 مشکلات رایج

### مشکل 1: "502 Bad Gateway"

**علت:** Next.js server در حال اجرا نیست

**راه‌حل:**
```powershell
# Start server
cd C:\inetpub\wwwroot\car-inspection
node .next/standalone/server.js
```

### مشکل 2: "404 Not Found" فقط برای `/`

**علت:** Rule برای root path match نمی‌کنه

**راه‌حل:**
- Pattern رو تغییر بده به `^/?$`
- یا rule رو به اول لیست ببر

### مشکل 3: "500 Internal Server Error"

**علت:** Server Variables allow نشدن

**راه‌حل:**
- **IIS Manager** → **URL Rewrite** → **View Server Variables**
- `HTTP_ACCEPT_ENCODING` رو **Allow** کن

---

## 📞 اطلاعات برای Debug

اگه هنوز مشکل داری، این اطلاعات رو بده:

1. **IIS Logs** (خطاهای مربوط به `/`)
2. **Next.js Server Logs** (از terminal)
3. **Application Pool Status**
4. **URL Rewrite Rules** (screenshot)
5. **Test Result** از `curl http://localhost:3000/`

---

**تاریخ**: دسامبر 2025  
**وضعیت**: 🔧 Troubleshooting Guide









