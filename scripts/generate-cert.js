const selfsigned = require('selfsigned');
const fs = require('fs');
const path = require('path');

const certsDir = path.join(__dirname, '..', 'certs');

// ایجاد پوشه certs اگر وجود ندارد
if (!fs.existsSync(certsDir)) {
  fs.mkdirSync(certsDir, { recursive: true });
}

console.log('Generating self-signed SSL certificate...');

try {
  // تولید گواهینامه خودامضا با استفاده از selfsigned
  const attrs = [{ name: 'commonName', value: 'localhost' }];
  const pems = selfsigned.generate(attrs, {
    keySize: 4096,
    days: 365,
    algorithm: 'sha256',
    extensions: [
      {
        name: 'basicConstraints',
        cA: true,
      },
      {
        name: 'keyUsage',
        keyCertSign: true,
        digitalSignature: true,
        nonRepudiation: true,
        keyEncipherment: true,
        dataEncipherment: true,
      },
      {
        name: 'subjectAltName',
        altNames: [
          {
            type: 2, // DNS
            value: 'localhost',
          },
          {
            type: 2, // DNS
            value: '127.0.0.1',
          },
          {
            type: 7, // IP
            ip: '127.0.0.1',
          },
        ],
      },
    ],
  });

  // ذخیره گواهینامه و کلید
  const keyPath = path.join(certsDir, 'localhost-key.pem');
  const certPath = path.join(certsDir, 'localhost.pem');

  fs.writeFileSync(keyPath, pems.private);
  fs.writeFileSync(certPath, pems.cert);

  console.log('✓ SSL certificate generated successfully!');
  console.log(`✓ Certificate location: ${certsDir}`);
  console.log(`✓ Key file: ${keyPath}`);
  console.log(`✓ Certificate file: ${certPath}`);
} catch (error) {
  console.error('❌ Error generating certificate:', error.message);
  process.exit(1);
}

