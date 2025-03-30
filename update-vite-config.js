// ES Module version for package.json with "type": "module"
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the config file
const config = fs.readFileSync('vite.config.ts', 'utf8');

// Update config with optimizations for GitHub Pages
const updatedConfig = config
  .replace(/base:.*,/, 'base: "./", // GitHub Pages compatible') 
  .replace(/build: {[^}]*}/, `build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsInlineLimit: 0, // Don't inline assets
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        }
      },
      input: {
        main: path.resolve(__dirname, 'index.html')
      }
    }
  }`);

// Write the updated config back to the file
fs.writeFileSync('vite.config.ts', updatedConfig);
console.log('✅ vite.config.ts has been updated with GitHub Pages optimizations');
