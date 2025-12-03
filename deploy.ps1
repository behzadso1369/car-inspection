# PowerShell deployment script for IIS
# Run this script on your IIS server to prepare the deployment

param(
    [string]$DeployPath = "C:\inetpub\wwwroot\car-inspection",
    [int]$Port = 3000
)

Write-Host "Starting IIS deployment for Next.js application..." -ForegroundColor Green

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "Error: Node.js is not installed or not in PATH" -ForegroundColor Red
    exit 1
}

# Create deployment directory if it doesn't exist
if (-Not (Test-Path $DeployPath)) {
    Write-Host "Creating deployment directory: $DeployPath" -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $DeployPath -Force | Out-Null
}

Write-Host "Deployment path: $DeployPath" -ForegroundColor Cyan

# Build the application
Write-Host "Building Next.js application..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "Build completed successfully!" -ForegroundColor Green

# Instructions for manual file copy
Write-Host "`n=== Deployment Instructions ===" -ForegroundColor Cyan
Write-Host "1. Copy the following folders to: $DeployPath" -ForegroundColor Yellow
Write-Host "   - .next\standalone\*"
Write-Host "   - .next\static\*"
Write-Host "   - public\*"
Write-Host "   - web.config"
Write-Host ""
Write-Host "2. Install production dependencies:" -ForegroundColor Yellow
Write-Host "   cd $DeployPath\.next\standalone"
Write-Host "   npm install --production"
Write-Host ""
Write-Host "3. Set environment variables (create .env.production file)" -ForegroundColor Yellow
Write-Host "   NODE_ENV=production"
Write-Host "   PORT=$Port"
Write-Host ""
Write-Host "4. Start the server using PM2:" -ForegroundColor Yellow
Write-Host "   pm2 start server.js --name car-inspection --cwd $DeployPath\.next\standalone"
Write-Host ""
Write-Host "5. Save PM2 configuration:" -ForegroundColor Yellow
Write-Host "   pm2 save"
Write-Host ""
Write-Host "6. Configure IIS reverse proxy to http://localhost:$Port" -ForegroundColor Yellow
Write-Host "`n=== End of Instructions ===" -ForegroundColor Cyan

