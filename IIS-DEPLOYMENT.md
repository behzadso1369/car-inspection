# Deploying Next.js App to IIS with SSR Mode

This guide will help you deploy your Next.js application on IIS with Server-Side Rendering (SSR) enabled.

## Prerequisites

1. **Windows Server** with IIS installed and configured
2. **Node.js** (v20 or higher recommended) installed on the server
3. **IIS URL Rewrite Module** - Download and install from: https://www.iis.net/downloads/microsoft/url-rewrite
4. **Application Request Routing (ARR)** - Download and install from: https://www.iis.net/downloads/microsoft/application-request-routing

## Step-by-Step Deployment

### Step 1: Build Your Application

On your development machine or build server, run:

```bash
npm install
npm run build
```

This will create a `standalone` folder in `.next` directory with all necessary files.

### Step 2: Prepare Deployment Files

Copy the following to your IIS server:
- `.next/standalone/` folder (entire contents)
- `.next/static/` folder
- `public/` folder
- `web.config` file
- `node_modules/` folder (or install dependencies on server)

**Recommended folder structure on IIS:**
```
C:\inetpub\wwwroot\car-inspection\
├── .next/
│   ├── standalone/
│   └── static/
├── public/
├── node_modules/
└── web.config
```

### Step 3: Configure IIS

#### 3.1 Create a New Website or Application Pool

1. Open **IIS Manager**
2. Right-click **Sites** → **Add Website**
   - **Site name**: `car-inspection`
   - **Application pool**: Create new or use existing
   - **Physical path**: Point to your deployment folder (e.g., `C:\inetpub\wwwroot\car-inspection`)
   - **Binding**: Configure your domain/IP and port

#### 3.2 Configure Application Pool

1. Select your **Application Pool** → **Advanced Settings**
2. Set:
   - **.NET CLR Version**: `No Managed Code`
   - **Start Mode**: `AlwaysRunning`
   - **Idle Time-out**: `0` (for always-on)

#### 3.3 Configure URL Rewrite (Reverse Proxy)

1. Open **IIS Manager** → Select your site
2. Double-click **URL Rewrite**
3. Click **Add Rule** → **Reverse Proxy**
4. Enter: `http://localhost:3000`
5. Check **Enable SSL Offloading** (if using HTTPS)
6. Click **OK**

This will update your `web.config` with the reverse proxy rules.

### Step 4: Install and Run Node.js as Windows Service

You have several options to run Next.js on Windows:

#### Option A: Using PM2 (Recommended)

1. Install PM2 globally:
   ```bash
   npm install -g pm2
   npm install -g pm2-windows-service
   ```

2. Install PM2 as Windows Service:
   ```bash
   pm2-service-install -n "car-inspection-nextjs"
   ```

3. Start your application:
   ```bash
   cd C:\inetpub\wwwroot\car-inspection\.next\standalone
   pm2 start server.js --name "car-inspection"
   pm2 save
   ```

4. Configure PM2 to auto-start:
   ```bash
   pm2 startup
   ```

#### Option B: Using NSSM (Node Service Manager)

1. Download NSSM from: https://nssm.cc/download
2. Extract and open command prompt as Administrator
3. Install service:
   ```bash
   nssm install CarInspectionNextJS
   ```
4. Configure:
   - **Path**: `C:\Program Files\nodejs\node.exe`
   - **Startup directory**: `C:\inetpub\wwwroot\car-inspection\.next\standalone`
   - **Arguments**: `server.js`
5. Start the service from Windows Services

#### Option C: Using Windows Task Scheduler

1. Create a batch file `start-nextjs.bat`:
   ```batch
   @echo off
   cd /d C:\inetpub\wwwroot\car-inspection\.next\standalone
   node server.js
   ```

2. Create a scheduled task that runs on system startup

### Step 5: Configure Environment Variables

1. Create a `.env.production` file in your deployment folder
2. Set necessary environment variables:
   ```
   NODE_ENV=production
   PORT=3000
   # Add your other environment variables here
   ```

### Step 6: Configure Firewall

Ensure Windows Firewall allows traffic on:
- Port **80** (HTTP) or **443** (HTTPS) for IIS
- Port **3000** (or your configured port) for the Node.js application (localhost only)

### Step 7: Test Your Deployment

1. Start your Node.js application
2. Test locally: `http://localhost:3000`
3. Test through IIS: `http://your-domain.com`

## Alternative: Using iisnode (Legacy Method)

If you prefer using iisnode instead of reverse proxy:

1. Install **iisnode** from: https://github.com/Azure/iisnode
2. Update `web.config` to use iisnode:
   ```xml
   <?xml version="1.0" encoding="utf-8"?>
   <configuration>
     <system.webServer>
       <handlers>
         <add name="iisnode" path="server.js" verb="*" modules="iisnode"/>
       </handlers>
       <rewrite>
         <rules>
           <rule name="NodeInspector" patternSyntax="ECMAScript" stopProcessing="true">
             <match url="^server.js\/debug[\/]?" />
           </rule>
           <rule name="StaticContent">
             <action type="Rewrite" url="public{REQUEST_URI}"/>
           </rule>
           <rule name="DynamicContent">
             <conditions>
               <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="True"/>
             </conditions>
             <action type="Rewrite" url="server.js"/>
           </rule>
         </rules>
       </rewrite>
     </system.webServer>
   </configuration>
   ```

## Troubleshooting

### Application Not Starting

- Check Windows Event Viewer for errors
- Verify Node.js is installed: `node --version`
- Check if port 3000 is available: `netstat -ano | findstr :3000`
- Review PM2 logs: `pm2 logs car-inspection`

### 502 Bad Gateway

- Ensure Node.js application is running on port 3000
- Check `web.config` reverse proxy configuration
- Verify Application Request Routing is enabled in IIS

### Static Files Not Loading

- Ensure `.next/static` folder is copied to server
- Check file permissions on static folders
- Verify `web.config` rewrite rules for static files

### Performance Issues

- Enable output caching in IIS
- Configure compression (already enabled in web.config)
- Consider using CDN for static assets

## Monitoring

- Use PM2 monitoring: `pm2 monit`
- Check IIS logs: `C:\inetpub\logs\LogFiles`
- Monitor Windows Performance Monitor

## Maintenance

### Updating the Application

1. Build new version: `npm run build`
2. Stop the service: `pm2 stop car-inspection`
3. Copy new files to server
4. Start the service: `pm2 start car-inspection`
5. Verify deployment

### Logs Location

- PM2 logs: `%USERPROFILE%\.pm2\logs\`
- IIS logs: `C:\inetpub\logs\LogFiles\`
- Application logs: Check your logging configuration

## Security Considerations

1. **HTTPS**: Configure SSL certificate in IIS
2. **Environment Variables**: Never commit sensitive data
3. **Firewall**: Only expose necessary ports
4. **Permissions**: Run Node.js with minimal required permissions
5. **Updates**: Keep Node.js and dependencies updated

## Additional Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [IIS Documentation](https://docs.microsoft.com/en-us/iis/)
- [PM2 Documentation](http://pm2.keymetrics.io/)

