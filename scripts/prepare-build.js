/**
 * This script ensures that the suchedule submodule is properly prepared before building
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🔄 Preparing build with submodules...');

// Check Vite config
if (fs.existsSync('vite.config.ts')) {
  const viteConfig = fs.readFileSync('vite.config.ts', 'utf8');
  console.log('✅ Vite config exists');
  
  // Check base path
  if (viteConfig.includes('base: "./"')) {
    console.log('✅ Vite config has correct base path');
  } else {
    console.log('⚠️ Vite config may have incorrect base path. Consider using base: "./"');
  }
} else {
  console.error('❌ vite.config.ts not found!');
  process.exit(1);
}

// Check if index.html has correct paths
if (fs.existsSync('index.html')) {
  const indexHtml = fs.readFileSync('index.html', 'utf8');
  console.log('✅ index.html exists');
  
  // Check for absolute paths that could cause issues
  if (indexHtml.includes('src="/') || indexHtml.includes('href="/')) {
    console.log('⚠️ index.html may contain absolute paths that could cause issues in production.');
    console.log('   Consider using relative paths (src="./" instead of src="/")');
  } else {
    console.log('✅ index.html uses relative paths');
  }
} else {
  console.error('❌ index.html not found!');
  process.exit(1);
}

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

// Make sure public directory has all required assets
if (!fs.existsSync('public/images/PFP.jpeg')) {
  console.log('⚠️ Profile picture not found in public/images. Copying from sources...');
  try {
    if (!fs.existsSync('public/images')) {
      fs.mkdirSync('public/images', { recursive: true });
    }
    if (fs.existsSync('sources/PFP.jpeg')) {
      fs.copyFileSync('sources/PFP.jpeg', 'public/images/PFP.jpeg');
      console.log('✅ Copied profile picture to public/images/');
    } else {
      console.log('⚠️ Profile picture not found in sources either.');
    }
  } catch (error) {
    console.error('❌ Failed to copy profile picture:', error.message);
  }
}

// Check for resume file
if (!fs.existsSync('public/CV-Jan-29-26 Professional.pdf') && fs.existsSync('sources/CV-Jan-29-26 Professional.pdf')) {
  console.log('⚠️ Resume not found in public directory. Copying from sources...');
  try {
    fs.copyFileSync('sources/CV-Jan-29-26 Professional.pdf', 'public/CV-Jan-29-26 Professional.pdf');
    console.log('✅ Copied resume to public directory');
  } catch (error) {
    console.error('❌ Failed to copy resume:', error.message);
  }
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

// Create redirects file for SPA routing
const redirectsPath = path.join('public', '_redirects');
if (!fs.existsSync(redirectsPath)) {
  fs.writeFileSync(redirectsPath, '/*    /index.html   200');
  console.log('✅ Created _redirects file for SPA routing');
}

console.log('✅ Build preparation complete'); 