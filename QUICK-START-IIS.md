# Quick Start Guide: Deploy Next.js to IIS with SSR

## Prerequisites Checklist

- [ ] Windows Server with IIS installed
- [ ] Node.js v20+ installed
- [ ] IIS URL Rewrite Module installed
- [ ] Application Request Routing (ARR) installed
- [ ] PM2 installed globally (`npm install -g pm2 pm2-windows-service`)

## Quick Deployment Steps

### 1. Build Your Application

```bash
npm install
npm run build
```

This creates `.next/standalone/` folder with all necessary files.

### 2. Prepare Files for IIS Server

Copy these to your IIS deployment folder (e.g., `C:\inetpub\wwwroot\car-inspection\`):

```
✓ .next/standalone/*      → All files from standalone folder
✓ .next/static/*          → All static assets
✓ public/*                → Public folder contents
✓ web.config              → IIS configuration file
```

### 3. Install Production Dependencies

On the IIS server:

```bash
cd C:\inetpub\wwwroot\car-inspection\.next\standalone
npm install --production
```

### 4. Configure Environment Variables

Create `.env.production` in the standalone folder:

```env
NODE_ENV=production
PORT=3000
# Add your other environment variables
```

### 5. Start Next.js Server with PM2

```bash
cd C:\inetpub\wwwroot\car-inspection\.next\standalone
pm2 start server.js --name "car-inspection"
pm2 save
pm2 startup
```

### 6. Configure IIS

1. **Create Website in IIS Manager:**
   - Site name: `car-inspection`
   - Physical path: `C:\inetpub\wwwroot\car-inspection`
   - Port: 80 (or your configured port)

2. **Configure Application Pool:**
   - .NET CLR Version: `No Managed Code`
   - Start Mode: `AlwaysRunning`
   - Idle Timeout: `0`

3. **Enable Reverse Proxy:**
   - Open IIS Manager → Your Site → URL Rewrite
   - Add Rule → Reverse Proxy
   - Enter: `http://localhost:3000`
   - Check "Enable SSL Offloading" (if using HTTPS)

### 7. Test

- Local: `http://localhost:3000`
- Through IIS: `http://your-server-ip`

## Troubleshooting

**502 Bad Gateway?**
- Check if Node.js is running: `pm2 list`
- Check port 3000: `netstat -ano | findstr :3000`
- Review PM2 logs: `pm2 logs car-inspection`

**Static files not loading?**
- Verify `.next/static` folder is copied
- Check file permissions

**Application not starting?**
- Check Windows Event Viewer
- Verify Node.js version: `node --version`
- Check environment variables

## Useful Commands

```bash
# PM2 Management
pm2 list                    # List all processes
pm2 logs car-inspection     # View logs
pm2 restart car-inspection  # Restart app
pm2 stop car-inspection     # Stop app
pm2 delete car-inspection   # Remove from PM2

# IIS Management
iisreset                    # Restart IIS
Get-Website                 # List websites (PowerShell)
Get-WebAppPoolState         # Check app pools (PowerShell)
```

## Files Created for Deployment

- `web.config` - IIS configuration for reverse proxy
- `next.config.ts` - Updated with standalone output mode
- `start-server.js` - Alternative startup script
- `deploy.ps1` - PowerShell deployment script
- `IIS-DEPLOYMENT.md` - Detailed deployment guide

## Next Steps

For detailed instructions, see [IIS-DEPLOYMENT.md](./IIS-DEPLOYMENT.md)

