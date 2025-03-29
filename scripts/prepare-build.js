/**
 * This script ensures that the suchedule submodule is properly prepared before building
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🔄 Preparing build with submodules...');

// Check if suchedule exists and is a directory
if (!fs.existsSync('suchedule') || !fs.statSync('suchedule').isDirectory()) {
  console.log('⚠️ Suchedule submodule not found, attempting to initialize it...');
  try {
    execSync('git submodule init', { stdio: 'inherit' });
    execSync('git submodule update', { stdio: 'inherit' });
    console.log('✅ Suchedule submodule initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize suchedule submodule:', error.message);
    process.exit(1);
  }
} else {
  console.log('✅ Suchedule submodule exists');
}

// Make sure .nojekyll file exists to prevent GitHub Pages from using Jekyll
const distDir = path.resolve('dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const nojekyllPath = path.join(distDir, '.nojekyll');
if (!fs.existsSync(nojekyllPath)) {
  fs.writeFileSync(nojekyllPath, '');
  console.log('✅ Created .nojekyll file');
}

console.log('✅ Build preparation complete'); 