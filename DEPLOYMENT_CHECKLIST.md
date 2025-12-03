# Next.js IIS Deployment Checklist

## Pre-Deployment Checklist

### Server Preparation
- [ ] Windows Server 2012 R2 or higher installed
- [ ] IIS 8.0 or higher installed and running
- [ ] Node.js LTS version installed (v18+ recommended)
- [ ] npm installed and accessible from command line
- [ ] iisnode installed from: https://github.com/azure/iisnode
- [ ] URL Rewrite module installed for IIS
- [ ] Administrator access to the server

### Application Preparation
- [ ] Git clone completed: `git clone <repo-url>`
- [ ] Dependencies installed: `npm install`
- [ ] Application tested locally: `npm run dev`
- [ ] Build successful locally: `npm run build`
- [ ] All environment variables configured in `.env.local`
- [ ] API endpoints verified and accessible from server
- [ ] Database connections tested (if applicable)

## Deployment Steps

### Option 1: Manual Deployment
- [ ] **Step 1**: Copy project files to IIS directory
  ```powershell
  Copy-Item -Path "C:\path\to\car-inspection" -Destination "C:\inetpub\wwwroot\car-inspection" -Recurse
  ```

- [ ] **Step 2**: Install production dependencies on server
  ```powershell
  cd C:\inetpub\wwwroot\car-inspection
  npm install --production
  ```

- [ ] **Step 3**: Build the application on server
  ```powershell
  npm run build
  ```

- [ ] **Step 4**: Create Application Pool in IIS Manager
  - Name: `CarInspection`
  - .NET CLR version: No Managed Code
  - Managed pipeline mode: Integrated

- [ ] **Step 5**: Create Website in IIS Manager
  - Site name: `CarInspection`
  - Physical path: `C:\inetpub\wwwroot\car-inspection`
  - Binding: Choose port and host header
  - Application pool: `CarInspection`

- [ ] **Step 6**: Set folder permissions
  - Application Pool Identity: `IIS AppPool\CarInspection`
  - Permissions: Full Control or Modify

- [ ] **Step 7**: Configure web.config (already included)

- [ ] **Step 8**: Start the website in IIS Manager

### Option 2: Automated Deployment (PowerShell Script)
- [ ] Run PowerShell as Administrator
- [ ] Execute the provided deployment script:
  ```powershell
  .\Deploy-ToIIS.ps1 -TargetPath "C:\inetpub\wwwroot\car-inspection" -SiteName "CarInspection" -Port 80
  ```

## Post-Deployment Verification

### Testing
- [ ] Website accessible via browser at configured URL
- [ ] All pages load without errors
- [ ] No 502 Bad Gateway errors
- [ ] API calls working correctly
- [ ] Static assets loading (CSS, images, JavaScript)
- [ ] Navigation working properly
- [ ] Forms submitting correctly
- [ ] Mobile responsive design working

### Monitoring
- [ ] Check IIS logs: `%SystemRoot%\System32\LogFiles\HTTP`
- [ ] Check iisnode logs: `%SystemDrive%\iisnode`
- [ ] Monitor Application Pool health
- [ ] Check Event Viewer for errors
- [ ] Monitor memory usage
- [ ] Monitor CPU usage

### Security
- [ ] Enable HTTPS/SSL certificate
- [ ] Update web.config binding to HTTPS
- [ ] Configure security headers in web.config
- [ ] Set up backup/restore procedures
- [ ] Configure IP restrictions if needed
- [ ] Enable request filtering

## Troubleshooting

### 502 Bad Gateway
1. Check iisnode logs in `%SystemDrive%\iisnode`
2. Verify Node.js is installed and accessible
3. Check Application Pool is running
4. Verify port is not in use: `netstat -ano | findstr :PORT`

### Module Not Found
1. Run `npm install --production` on server
2. Clear npm cache: `npm cache clean --force`
3. Delete `node_modules` folder and reinstall
4. Check for missing peer dependencies

### Permission Denied
1. Verify Application Pool identity has folder permissions
2. Check NTFS permissions on project folder
3. Grant "Modify" permission to IIS AppPool identity
4. Restart Application Pool after permission changes

### Application Pool Crashes
1. Check event logs for error details
2. Increase recycling settings in Application Pool advanced settings
3. Check available memory on server
4. Review Node.js error logs

### Port Already in Use
1. Check what's using the port: `netstat -ano | findstr :PORT`
2. Kill process: `taskkill /PID <PID> /F`
3. Choose different port in IIS binding
4. Update web.config if necessary

## Performance Optimization

### Application Pool Settings
- [ ] Enable 32-bit applications: False (for x64 systems)
- [ ] Queue length: 1000
- [ ] Enable CPU monitoring
- [ ] Set memory recycling: 256 MB

### Website Settings
- [ ] Enable compression for static/dynamic content
- [ ] Configure caching headers in web.config
- [ ] Use CDN for static assets if available
- [ ] Monitor and optimize database queries

### Server Settings
- [ ] Configure IIS logging
- [ ] Set up log rotation
- [ ] Enable request filtering
- [ ] Configure URL rewrite caching

## Maintenance

### Regular Tasks
- [ ] Monitor application logs daily
- [ ] Check disk space weekly
- [ ] Review Application Pool recycling events
- [ ] Update Node.js packages monthly (test in dev first)
- [ ] Backup application files regularly

### Backups
- [ ] Backup entire project folder
- [ ] Backup .env.local and configuration files
- [ ] Backup IIS configuration
- [ ] Backup database (if applicable)
- [ ] Test restore procedures

## Support and Resources

- Next.js Documentation: https://nextjs.org/docs
- iisnode Documentation: https://github.com/azure/iisnode/wiki
- IIS URL Rewrite: https://www.iis.net/downloads/microsoft/url-rewrite
- Node.js LTS: https://nodejs.org/

## Notes
- Record your actual configuration details below for reference
  - Server IP/Hostname: ___________
  - Website URL: ___________
  - Physical Path: ___________
  - Application Pool Name: ___________
  - Database connection string: ___________ (if applicable)
  - Admin contact: ___________
