import process from 'node:process';
import path from 'node:path';
import { spawn } from 'node:child_process';
import chokidar from 'chokidar';

const imagesDir = path.join(process.cwd(), 'public', 'img');

const generateImages = () => {
  const child = spawn(process.execPath, ['scripts/generate-images.mjs'], {
    stdio: 'inherit',
  });

  child.on('error', (error) => {
    process.stderr.write(`${error.message}\n`);
  });
};

generateImages();

chokidar.watch(imagesDir, { ignoreInitial: true }).on('all', generateImages);