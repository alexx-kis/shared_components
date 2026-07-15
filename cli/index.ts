#!/usr/bin/env node

import { cpSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

type InstallableItem = {
  source: string[];
  target: string[];
};

const [, , command, itemName] = process.argv;

const items: Record<string, InstallableItem> = {
  abstracts: {
    source: ['src', 'styles', 'abstracts'],
    target: ['src', 'styles', 'abstracts'],
  },
};

const installItem = (name: string): void => {
  const cliDirectory = path.dirname(fileURLToPath(import.meta.url));
  const packageRoot = path.resolve(cliDirectory, '../..');

  const item = items[name];

  const sourceParts = item?.source ?? ['src', 'components', name];
  const targetParts = item?.target ?? ['src', 'components', name];

  const sourcePath = path.join(packageRoot, ...sourceParts);
  const targetPath = path.join(process.cwd(), ...targetParts);
  const targetDisplayPath = targetParts.join('/');

  if (!existsSync(sourcePath)) {
    console.error(`"${name}" not found.`);
    process.exitCode = 1;
    return;
  }

  if (existsSync(targetPath)) {
    console.error(`"${targetDisplayPath}" already exists.`);
    process.exitCode = 1;
    return;
  }

  mkdirSync(path.dirname(targetPath), { recursive: true });
  cpSync(sourcePath, targetPath, { recursive: true });

  console.log(`"${name}" installed to ${targetDisplayPath}`);
};

if (command !== 'add' || !itemName) {
  console.log('Usage: shared-components add <component|abstracts>');
} else {
  installItem(itemName);
}
