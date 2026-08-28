import { spawn } from 'node:child_process';
import console from 'node:console';
import { watch } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { clearTimeout, setTimeout } from 'node:timers';

const TYPES_DIR = path.join(process.cwd(), 'src', 'types');

let timeoutId = null;
let isGenerating = false;
let shouldRegenerate = false;

const generate = () => {
  if (isGenerating) {
    shouldRegenerate = true;
    return;
  }

  isGenerating = true;

  const child = spawn(process.execPath, ['scripts/generate-data-interfaces.mjs'], {
    stdio: 'inherit',
  });

  child.on('close', () => {
    isGenerating = false;

    if (!shouldRegenerate) return;

    shouldRegenerate = false;
    generate();
  });
};

const scheduleGenerate = () => {
  if (timeoutId) clearTimeout(timeoutId);

  timeoutId = setTimeout(() => {
    generate();
  }, 150);
};

generate();

watch(TYPES_DIR, { recursive: true }, (_eventType, filename) => {
  if (!filename?.endsWith('.ts')) return;

  console.log(`Types changed: ${filename}`);
  scheduleGenerate();
});

console.log('Watching src/types...');