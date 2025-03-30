/**
 * Pre-deploy script to ensure GitHub Pages compatibility
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

console.log('🚀 Preparing for GitHub Pages deployment...');

// Ensure the dist directory exists
if (!fs.existsSync(distDir)) {
  console.log('❌ dist directory not found. Did you run the build?');
  process.exit(1);
}

// 1. Check if the built index.html has correct paths
console.log('1️⃣ Checking asset paths in dist/index.html...');
const indexPath = path.join(distDir, 'index.html');
if (fs.existsSync(indexPath)) {
  let indexContent = fs.readFileSync(indexPath, 'utf8');
  
  // Fix any absolute paths
  indexContent = indexContent.replace(/src="\/assets\//g, 'src="./assets/');
  indexContent = indexContent.replace(/href="\/assets\//g, 'href="./assets/');
  
  // Ensure SPA redirect script is present
  if (!indexContent.includes('sessionStorage.redirect')) {
    const headEndPos = indexContent.indexOf('</head>');
    if (headEndPos !== -1) {
      const redirectScript = `
    <script>
      (function() {
        var redirect = sessionStorage.redirect;
        delete sessionStorage.redirect;
        if (redirect && redirect != location.href) {
          history.replaceState(null, null, redirect);
        }
      })();
    </script>`;
      
      indexContent = indexContent.slice(0, headEndPos) + redirectScript + indexContent.slice(headEndPos);
    }
  }
  
  fs.writeFileSync(indexPath, indexContent);
  console.log('✅ Fixed asset paths in dist/index.html');
} else {
  console.log('❌ index.html not found in dist directory');
  process.exit(1);
}

// 2. Create/ensure .nojekyll file
console.log('2️⃣ Ensuring .nojekyll file exists...');
const nojekyllPath = path.join(distDir, '.nojekyll');
fs.writeFileSync(nojekyllPath, '');
console.log('✅ Created .nojekyll file');

// 3. Ensure 404.html has correct redirect
console.log('3️⃣ Checking 404.html...');
const notFoundPath = path.join(distDir, '404.html');
if (!fs.existsSync(notFoundPath)) {
  console.log('   404.html not found, creating it...');
  
  const notFoundContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Redirecting...</title>
  <script>
    // GitHub Pages SPA redirect
    sessionStorage.redirect = location.href;
    window.location.href = "./";
  </script>
</head>
<body>
  <h1>Redirecting...</h1>
  <p>If you are not redirected automatically, <a href="./">click here</a>.</p>
</body>
</html>`;
  
  fs.writeFileSync(notFoundPath, notFoundContent);
  console.log('✅ Created 404.html with proper redirect');
} else {
  let notFoundContent = fs.readFileSync(notFoundPath, 'utf8');
  
  // Fix absolute paths in 404.html
  if (notFoundContent.includes('href="/"') || notFoundContent.includes('window.location.href = "/"')) {
    notFoundContent = notFoundContent.replace(/href="\/"/g, 'href="./"');
    notFoundContent = notFoundContent.replace(/window\.location\.href = "\/"/g, 'window.location.href = "./"');
    fs.writeFileSync(notFoundPath, notFoundContent);
    console.log('✅ Fixed paths in existing 404.html');
  } else {
    console.log('✅ 404.html already has correct paths');
  }
}

// 4. Create a test.html file to verify static serving
console.log('4️⃣ Creating test file...');
const testHtmlPath = path.join(distDir, 'test.html');
const testHtmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Static Test</title>
  <style>
    body { font-family: -apple-system, sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; }
    h1 { color: #0366d6; }
    .success { color: green; }
  </style>
</head>
<body>
  <h1>Static File Test</h1>
  <p class="success">✅ If you can see this, static file serving is working correctly!</p>
  <p>This confirms that GitHub Pages can serve basic HTML files from your repository.</p>
  <p>Try the main app: <a href="./">Go to main application</a></p>
  <p>Build timestamp: ${new Date().toISOString()}</p>
</body>
</html>`;

fs.writeFileSync(testHtmlPath, testHtmlContent);
console.log('✅ Created test.html');

console.log('✅ GitHub Pages deployment preparation complete!');
console.log('🌐 After deployment, check: https://n-alsharafi.github.io/test.html'); 