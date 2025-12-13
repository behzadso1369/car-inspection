# راه‌اندازی HTTPS برای Development

این پروژه اکنون از HTTPS روی پورت 5173 پشتیبانی می‌کند.

## مراحل راه‌اندازی

### 1. تولید گواهینامه SSL

قبل از اولین اجرا، باید گواهینامه SSL خودامضا تولید کنید:

**روش 1: استفاده از OpenSSL (توصیه می‌شود)**
```bash
npm run generate-cert
```

**روش 2: استفاده از PowerShell (ویندوز)**
```powershell
npm run generate-cert:ps1
```

**روش 3: استفاده از mkcert (توصیه می‌شود برای ویندوز)**
```bash
# نصب mkcert (یکبار)
npm install -g mkcert

# نصب root certificate
mkcert -install

# تولید گواهینامه
mkdir certs
mkcert -key-file certs/localhost-key.pem -cert-file certs/localhost.pem localhost
```

**روش 4: دستی با OpenSSL**
```bash
mkdir certs
openssl req -x509 -newkey rsa:4096 -nodes -keyout certs/localhost-key.pem -out certs/localhost.pem -days 365 -subj "/C=IR/ST=Tehran/L=Tehran/O=Development/CN=localhost"
```

### 2. اجرای سرور با HTTPS

پس از تولید گواهینامه، سرور را با دستور زیر اجرا کنید:

```bash
npm run dev:https
```

سرور روی `https://localhost:5173` در دسترس خواهد بود.

## نکات مهم

- مرورگر ممکن است هشدار امنیتی نشان دهد (چون گواهینامه خودامضا است)
- برای ادامه، روی "Advanced" کلیک کرده و "Proceed to localhost" را انتخاب کنید
- گواهینامه‌ها در پوشه `certs/` ذخیره می‌شوند و در `.gitignore` قرار دارند

## عیب‌یابی

اگر خطای "certificates not found" دریافت کردید:
1. مطمئن شوید که پوشه `certs/` وجود دارد
2. فایل‌های `localhost-key.pem` و `localhost.pem` در پوشه `certs/` موجود باشند
3. دستور تولید گواهینامه را دوباره اجرا کنید

