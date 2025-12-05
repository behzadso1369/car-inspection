# 🔧 Fix برای 404 در Homepage (IIS)

## ❌ مشکل

وقتی روی IIS deploy می‌کنی:
- ✅ بقیه صفحات کار می‌کنن (`/about-us`, `/services`, ...)
- ❌ صفحه اصلی (`/`) 404 می‌ده

```
This www.carmacheck.com page can't be found
No webpage was found for the web address: https://www.carmacheck.com/
```

---

## 🔍 علت مشکل

### مشکل اصلی:

در `web.config`، rule برای root path (`/`) ممکنه درست match نشه:

```xml
<!-- ❌ مشکل: این rule ممکنه "/" رو درست handle نکنه -->
<rule name="Next.js Proxy">
  <match url=".*" />
  <!-- ... -->
</rule>
```

**چرا مشکل داره؟**

1. **IIS Default Document**
   - IIS به صورت پیش‌فرض دنبال `default.aspx`, `index.html` می‌گرده
   - اگه پیدا نکنه، 404 می‌ده

2. **URL Rewrite برای Root**
   - Rule برای `.*` ممکنه root path رو درست match نکنه
   - نیاز به rule خاص برای `/`

3. **Next.js Server**
   - ممکنه server روی port 3000 در حال اجرا نباشه
   - یا request به server نمی‌رسه

---

## ✅ راه‌حل

### 1. **اضافه کردن Rule خاص برای Root Path**

در `web.config`:

```xml
<!-- Handle root path (/) explicitly -->
<rule name="Next.js Root Path" stopProcessing="true">
  <match url="^$" />
  <serverVariables>
    <set name="HTTP_X_ORIGINAL_ACCEPT_ENCODING" value="{HTTP_ACCEPT_ENCODING}" />
    <set name="HTTP_ACCEPT_ENCODING" value="" />
  </serverVariables>
  <action type="Rewrite" url="http://localhost:3000/" />
</rule>
```

### 2. **چک کردن Next.js Server**

مطمئن بشو که Next.js server روی port 3000 در حال اجراست:

```bash
# چک کردن process
netstat -ano | findstr :3000

# یا
Get-Process -Name node
```

### 3. **چک کردن IIS Application Pool**

1. برو به **IIS Manager**
2. **Application Pools** → انتخاب Pool
3. مطمئن بشو که **Started** هست
4. اگه **Stopped** هست، **Start** کن

---

## 📝 تغییرات در web.config

### قبل:
```xml
<rule name="Next.js Proxy">
  <match url=".*" />
  <!-- ... -->
</rule>
```

### بعد:
```xml
<!-- Handle root path (/) explicitly -->
<rule name="Next.js Root Path" stopProcessing="true">
  <match url="^$" />
  <action type="Rewrite" url="http://localhost:3000/" />
</rule>

<!-- Proxy all other requests -->
<rule name="Next.js Proxy">
  <match url=".*" />
  <!-- ... -->
</rule>
```

---

## 🔧 Troubleshooting

### 1. **چک کردن Next.js Server**

```bash
# در Server
cd C:\inetpub\wwwroot\car-inspection
node .next/standalone/server.js

# یا
npm start
```

### 2. **چک کردن IIS Logs**

```
C:\inetpub\logs\LogFiles\W3SVC1\
```

دنبال error های مربوط به `/` بگرد.

### 3. **چک کردن web.config**

مطمئن بشو که:
- ✅ `defaultDocument enabled="false"` هست
- ✅ Rule برای root path اضافه شده
- ✅ Port 3000 درست تنظیم شده

### 4. **Test کردن Reverse Proxy**

```bash
# از Server خودش
curl http://localhost:3000/

# باید HTML برگردونه
```

---

## 🎯 Checklist

- [ ] ✅ Rule برای root path (`^$`) اضافه شده
- [ ] ✅ `defaultDocument enabled="false"` هست
- [ ] ✅ Next.js server روی port 3000 در حال اجراست
- [ ] ✅ Application Pool **Started** هست
- [ ] ✅ URL Rewrite Module نصب شده
- [ ] ✅ ARR (Application Request Routing) نصب شده
- [ ] ✅ `web.config` در root directory هست

---

## 🚀 مراحل Debug

### Step 1: چک کردن Server

```bash
# Test کردن Next.js server
curl http://localhost:3000/
```

اگه کار کرد، مشکل از IIS routing هست.

### Step 2: چک کردن IIS Rewrite

1. برو به **IIS Manager**
2. **URL Rewrite** → **View Server Variables**
3. مطمئن بشو که `HTTP_ACCEPT_ENCODING` allow شده

### Step 3: Test کردن Rule

1. **IIS Manager** → **URL Rewrite**
2. **Edit Rule** → **Test Pattern**
3. Pattern: `^$`
4. Input: `/`
5. باید match کنه

---

## 📊 web.config کامل

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <!-- Static files -->
        <rule name="Next.js Static Files" stopProcessing="true">
          <match url="^/(_next|static|favicon.ico|icon|manifest.webmanifest|sitemap.xml|robots.txt)" />
          <action type="Rewrite" url="{R:0}" />
        </rule>
        
        <!-- Public assets -->
        <rule name="Public Assets" stopProcessing="true">
          <match url="^/(.*\.(?:jpg|jpeg|gif|png|svg|ico|css|js|woff|woff2|ttf|eot|json|xml|txt))$" />
          <conditions>
            <add input="{REQUEST_FILENAME}" matchType="IsFile" />
          </conditions>
          <action type="Rewrite" url="{R:0}" />
        </rule>
        
        <!-- ✅ Root path (/) -->
        <rule name="Next.js Root Path" stopProcessing="true">
          <match url="^$" />
          <serverVariables>
            <set name="HTTP_X_ORIGINAL_ACCEPT_ENCODING" value="{HTTP_ACCEPT_ENCODING}" />
            <set name="HTTP_ACCEPT_ENCODING" value="" />
          </serverVariables>
          <action type="Rewrite" url="http://localhost:3000/" />
        </rule>
        
        <!-- All other requests -->
        <rule name="Next.js Proxy" stopProcessing="true">
          <match url=".*" />
          <conditions>
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <serverVariables>
            <set name="HTTP_X_ORIGINAL_ACCEPT_ENCODING" value="{HTTP_ACCEPT_ENCODING}" />
            <set name="HTTP_ACCEPT_ENCODING" value="" />
          </serverVariables>
          <action type="Rewrite" url="http://localhost:3000/{R:0}" />
        </rule>
      </rules>
    </rewrite>
    
    <defaultDocument enabled="false" />
  </system.webServer>
</configuration>
```

---

## ⚠️ نکات مهم

### 1. **Order of Rules مهمه**

Rules به ترتیب اجرا می‌شن:
1. Static files (اول)
2. Public assets (دوم)
3. Root path (سوم) ← **مهم!**
4. All other (آخر)

### 2. **stopProcessing="true"**

این باعث می‌شه که اگه rule match کرد، بقیه rules اجرا نشن.

### 3. **Port Configuration**

مطمئن بشو که:
- Next.js server روی **port 3000** اجرا می‌شه
- یا port رو در `web.config` تغییر بده

---

## 🎯 نتیجه

با این تغییرات:

- ✅ Homepage (`/`) کار می‌کنه
- ✅ بقیه صفحات هم کار می‌کنن
- ✅ Static files درست serve می‌شن
- ✅ Reverse proxy درست کار می‌کنه

---

**تاریخ**: دسامبر 2025  
**وضعیت**: ✅ Fixed  
**مشکل**: IIS Routing برای Root Path

