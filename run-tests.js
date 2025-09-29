#!/usr/bin/env node

/**
 * Simple test runner for local development
 * Run with: node run-tests.js
 */

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🧪 Portfolio Test Suite\n');

// Check if package.json exists
if (!fs.existsSync('package.json')) {
  console.error('❌ package.json not found. Please run: npm init');
  process.exit(1);
}

try {
  // Check if dependencies are installed
  if (!fs.existsSync('node_modules')) {
    console.log('📦 Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });
  }

  // Run tests
  console.log('🚀 Running unit tests...\n');
  execSync('npm test', { stdio: 'inherit' });

  console.log('\n✅ All tests completed successfully!');
  
} catch (error) {
  console.error('\n❌ Tests failed:', error.message);
  process.exit(1);
}
