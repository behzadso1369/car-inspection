# Next.js IIS Deployment Script
# Run this script as Administrator on your IIS server

param(
    [Parameter(Mandatory=$true)]
    [string]$TargetPath,
    
    [Parameter(Mandatory=$true)]
    [string]$SiteName,
    
    [string]$Port = 3002,
    [string]$HostHeader = "",
    [string]$AppPoolName = "",
    [switch]$UseHttps
)

# Validate paths and prerequisites
if (!(Test-Path $TargetPath)) {
    Write-Error "Target path does not exist: $TargetPath"
    exit 1
}

if (!(Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Error "Node.js/npm is not installed or not in PATH"
    exit 1
}

# Check if running as Administrator
$isAdmin = [bool]([System.Security.Principal.WindowsIdentity]::GetCurrent().Groups -match "S-1-5-32-544")
if (!$isAdmin) {
    Write-Error "This script must be run as Administrator"
    exit 1
}

# Import IIS module
Import-Module WebAdministration -ErrorAction Stop

# Set default app pool name
if ([string]::IsNullOrEmpty($AppPoolName)) {
    $AppPoolName = $SiteName + "AppPool"
}

Write-Host "Starting Next.js IIS Deployment..." -ForegroundColor Green
Write-Host "Site Name: $SiteName"
Write-Host "Target Path: $TargetPath"
Write-Host "App Pool: $AppPoolName"
Write-Host "Port: $Port"

# Step 1: Install npm dependencies
Write-Host "`n[1/7] Installing npm dependencies..." -ForegroundColor Cyan
Push-Location $TargetPath
npm install --production
if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to install npm dependencies"
    exit 1
}

# Step 2: Build the Next.js application
Write-Host "`n[2/7] Building Next.js application..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to build Next.js application"
    exit 1
}
Pop-Location

# Step 3: Stop existing site if it exists
Write-Host "`n[3/7] Checking for existing site..." -ForegroundColor Cyan
$existingSite = Get-WebSite -Name $SiteName -ErrorAction SilentlyContinue
if ($existingSite) {
    Write-Host "Stopping existing site: $SiteName" -ForegroundColor Yellow
    Stop-WebSite -Name $SiteName -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 2
}

# Step 4: Create or update Application Pool
Write-Host "`n[4/7] Setting up Application Pool: $AppPoolName" -ForegroundColor Cyan

# Use ServerManager (Microsoft.Web.Administration) to create/configure the pool safely
try {
    $sm = New-Object Microsoft.Web.Administration.ServerManager
} catch {
    Write-Error "Failed to create ServerManager object. Ensure the WebAdministration module is available and you're running as Administrator. $_"
    exit 1
}

$pool = $sm.ApplicationPools[$AppPoolName]
if (-not $pool) {
    Write-Host "Creating new Application Pool: $AppPoolName"
    $pool = $sm.ApplicationPools.Add($AppPoolName)
}

# Configure app pool settings
# Set identity to ApplicationPoolIdentity
try {
    $pool.processModel.identityType = [Microsoft.Web.Administration.ProcessModelIdentityType]::ApplicationPoolIdentity
} catch {
    # fallback to string if enum not available
    $pool.processModel.identityType = "ApplicationPoolIdentity"
}

$pool.managedRuntimeVersion = ""
$pool.managedPipelineMode = [Microsoft.Web.Administration.ManagedPipelineMode]::Integrated

# Set recycling settings
$pool.recycling.periodicRestart.privateMemory = 524288

# Commit changes to apply updates
try {
    $sm.CommitChanges()
} catch {
    Write-Error "Failed to commit Application Pool changes: $_"
    exit 1
}

Write-Host "Application Pool configured successfully"

# Step 5: Create or update Website
Write-Host "`n[5/7] Setting up Website..." -ForegroundColor Cyan
$site = Get-WebSite -Name $SiteName -ErrorAction SilentlyContinue

$binding = "*:$Port"
if (![string]::IsNullOrEmpty($HostHeader)) {
    $binding += ":$HostHeader"
}

if (!$site) {
    Write-Host "Creating new Website: $SiteName"
    $site = New-WebSite -Name $SiteName -PhysicalPath $TargetPath -ApplicationPool $AppPoolName -Binding @{protocol="http";bindingInformation=$binding}
} else {
    Write-Host "Website already exists, updating configuration..."
    Set-ItemProperty "IIS:\Sites\$SiteName" -Name physicalPath -Value $TargetPath
    Set-ItemProperty "IIS:\Sites\$SiteName" -Name applicationPool -Value $AppPoolName
}

Write-Host "Website configured successfully"

# Step 6: Set folder permissions
Write-Host "`n[6/7] Setting folder permissions..." -ForegroundColor Cyan
$appPoolIdentity = "IIS AppPool\$AppPoolName"
$acl = Get-Acl $TargetPath

# Grant permissions to app pool identity
$rule = New-Object System.Security.AccessControl.FileSystemAccessRule(
    $appPoolIdentity,
    "Modify",
    "ContainerInherit,ObjectInherit",
    "None",
    "Allow"
)
$acl.SetAccessRule($rule)
Set-Acl -Path $TargetPath -AclObject $acl

Write-Host "Permissions set successfully"

# Step 7: Start the website
Write-Host "`n[7/7] Starting website..." -ForegroundColor Cyan
Start-WebSite -Name $SiteName

$siteState = (Get-WebSite -Name $SiteName).State
if ($siteState -eq "Started") {
    Write-Host "Website started successfully!" -ForegroundColor Green
} else {
    Write-Host "Warning: Website may not have started properly. Current state: $siteState" -ForegroundColor Yellow
}

Write-Host "`n" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host "Deployment completed successfully!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host "Website URL: http://localhost:$Port"
if (![string]::IsNullOrEmpty($HostHeader)) {
    Write-Host "Hostname: $HostHeader"
}
Write-Host "Application Pool: $AppPoolName"
Write-Host "Physical Path: $TargetPath"
Write-Host "`nNext Steps:"
Write-Host "1. Open IIS Manager to verify the site configuration"
Write-Host "2. Check iisnode logs if there are any issues: %SystemDrive%\iisnode"
Write-Host "3. Test the application by accessing the URL in your browser"
