# Next.js IIS Deployment Guide

## Prerequisites
1. IIS (Internet Information Services) installed on Windows Server
2. Node.js installed on the server
3. iisnode installed (allows Node.js to run on IIS)
4. web.config for IIS routing

## Step-by-Step Deployment Instructions

### 1. Install iisnode
Download and install iisnode from: https://github.com/azure/iisnode/wiki/iisnode-usersguide

### 2. Build the Next.js Application
```powershell
npm run build
```

### 3. Prepare Files for IIS
- Copy the entire project folder (excluding node_modules) to your IIS website directory
- Install dependencies on the server:
  ```powershell
  npm install --production
  ```

### 4. Create/Update web.config
- The `web.config` file in the root directory handles IIS routing to Node.js
- Make sure the file exists and is properly configured

### 5. Create Application Pool in IIS
- Open IIS Manager
- Right-click "Application Pools" → "Add Application Pool"
- Name: `CarInspection` (or your preferred name)
- .NET CLR version: No Managed Code
- Managed pipeline mode: Integrated
- Click OK

### 6. Add Website in IIS
- Right-click "Sites" → "Add Website"
- Site name: `CarInspection` (or your preferred name)
- Physical path: Point to your project folder
- Binding: Set port and hostname as needed
- Application pool: Select the pool created in step 5

### 7. Configure Application Settings
- Right-click the site → "Edit Bindings"
- Add binding for your domain/port
- Click OK

### 8. Start the Website
- Right-click the site → "Start"

## Environment Variables
Create a `.env.local` file in the root directory with necessary variables:
```
NODE_ENV=production
```

## Important Notes
- Make sure the IIS Application Pool identity has read/write permissions to the project folder
- The `.next` folder will be created during build - ensure proper permissions
- Port 5173 (dev) is handled by `next start` which runs the built app

## Troubleshooting
1. **502 Bad Gateway**: Check iisnode logs in `%SystemDrive%\iisnode`
2. **Module not found**: Run `npm install --production` on the server
3. **Permission denied**: Ensure IIS pool identity has folder permissions
4. **Port conflicts**: Configure the port in web.config or IIS binding

## Testing
- Navigate to your website URL in browser
- Check browser console for errors
- Check IIS logs: `%SystemRoot%\System32\LogFiles\HTTP`
- Check iisnode logs: `%SystemDrive%\iisnode`

## Production Optimization
- Set `NODE_ENV=production`
- Use `npm install --production` (excludes dev dependencies)
- Consider using PM2 for process management with iisnode
