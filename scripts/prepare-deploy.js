/**
 * Post-build checks for GitHub Pages. GitHub Pages serves the built ./ paths
 * directly, so this only verifies what Vite copied out of public/ is present.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(rootDir, 'dist');

console.log('Preparing GitHub Pages output...');

if (!fs.existsSync(path.join(distDir, 'index.html'))) {
  console.error('dist/index.html not found — run the build first.');
  process.exit(1);
}

const index = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
if (/["'(]\/assets\//.test(index)) {
  console.error('dist/index.html references absolute /assets paths; base must stay "./".');
  process.exit(1);
}

fs.writeFileSync(path.join(distDir, '.nojekyll'), '');

for (const required of ['404.html', 'favicon.svg', 'images/PFP.jpeg', 'Nuh-Al-Sharafi-CV-Oct-21-26-Professional.pdf']) {
  if (!fs.existsSync(path.join(distDir, required))) {
    console.error(`Missing dist/${required}`);
    process.exit(1);
  }
}

console.log('dist/ is ready to deploy.');
