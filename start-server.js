#!/usr/bin/env node
/**
 * Startup script for Next.js standalone server on IIS
 * This script can be used with PM2 or as a Windows service
 */

const { spawn } = require('child_process');
const path = require('path');

// Path to the standalone server
const serverPath = path.join(__dirname, '.next', 'standalone', 'server.js');

// Port configuration (default 3000, can be overridden via PORT env variable)
const port = process.env.PORT || 3000;

console.log(`Starting Next.js server on port ${port}...`);
console.log(`Server path: ${serverPath}`);

// Set environment variables
process.env.NODE_ENV = process.env.NODE_ENV || 'production';
process.env.PORT = port.toString();

// Start the Next.js server
const server = spawn('node', [serverPath], {
  stdio: 'inherit',
  cwd: __dirname,
  env: {
    ...process.env,
    NODE_ENV: 'production',
    PORT: port.toString(),
  },
});

server.on('error', (error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

server.on('exit', (code) => {
  console.log(`Server exited with code ${code}`);
  process.exit(code);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.kill('SIGTERM');
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully...');
  server.kill('SIGINT');
});

