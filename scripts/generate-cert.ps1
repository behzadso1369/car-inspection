# PowerShell script to generate self-signed certificate for Windows
$certsDir = Join-Path $PSScriptRoot "..\certs"

# Create certs directory if it doesn't exist
if (-not (Test-Path $certsDir)) {
    New-Item -ItemType Directory -Path $certsDir -Force | Out-Null
}

Write-Host "Generating self-signed SSL certificate..." -ForegroundColor Green

# Check if OpenSSL is available
$opensslPath = Get-Command openssl -ErrorAction SilentlyContinue

if ($opensslPath) {
    $keyPath = Join-Path $certsDir "localhost-key.pem"
    $certPath = Join-Path $certsDir "localhost.pem"
    
    # Generate private key
    openssl genrsa -out $keyPath 4096
    
    # Generate certificate
    openssl req -new -x509 -key $keyPath -out $certPath -days 365 -subj "/C=IR/ST=Tehran/L=Tehran/O=Development/CN=localhost"
    
    Write-Host "✓ SSL certificate generated successfully!" -ForegroundColor Green
    Write-Host "✓ Certificate location: $certsDir" -ForegroundColor Green
} else {
    Write-Host "OpenSSL not found. Using PowerShell to generate certificate..." -ForegroundColor Yellow
    
    # Alternative: Use PowerShell's New-SelfSignedCertificate
    $cert = New-SelfSignedCertificate `
        -DnsName "localhost" `
        -CertStoreLocation "cert:\CurrentUser\My" `
        -KeyExportPolicy Exportable `
        -KeySpec Signature `
        -KeyAlgorithm RSA `
        -KeyLength 4096 `
        -NotAfter (Get-Date).AddYears(1)
    
    # Export certificate and key
    $certPath = Join-Path $certsDir "localhost.pfx"
    $password = ConvertTo-SecureString -String "development" -Force -AsPlainText
    
    Export-PfxCertificate -Cert $cert -FilePath $certPath -Password $password | Out-Null
    
    # Convert PFX to PEM format (requires OpenSSL or alternative)
    Write-Host "Certificate created as PFX. To use with Node.js, you need to convert it to PEM format." -ForegroundColor Yellow
    Write-Host "Install OpenSSL and run:" -ForegroundColor Yellow
    Write-Host "  openssl pkcs12 -in $certPath -out $(Join-Path $certsDir 'localhost.pem') -clcerts -nokeys -passin pass:development" -ForegroundColor Yellow
    Write-Host "  openssl pkcs12 -in $certPath -out $(Join-Path $certsDir 'localhost-key.pem') -nocerts -nodes -passin pass:development" -ForegroundColor Yellow
}




