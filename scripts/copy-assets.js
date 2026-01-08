import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '../public');
const distDir = path.join(__dirname, '../dist');

// Function to copy files from public to dist
function copyPublicFolder() {
  if (!fs.existsSync(publicDir)) return;

  const copy = (src, dest) => {
    const stat = fs.statSync(src);
    if (stat.isDirectory()) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
      fs.readdirSync(src).forEach(file => {
        copy(path.join(src, file), path.join(dest, file));
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  };

  copy(publicDir, distDir);
}

// Create the script
try {
  console.log('Copying public assets...');
  copyPublicFolder();
  console.log('Public assets copied successfully!');
} catch (error) {
  console.error('Error copying public assets:', error);
  process.exit(1);
}
