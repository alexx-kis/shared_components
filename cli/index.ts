#!/usr/bin/env node

import { cpSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

type InstallableItem = {
  source: string[];
  target: string[];
  overwrite?: boolean;
};

const [, , command, itemName] = process.argv;

const items: Record<string, InstallableItem> = {
  abstracts: {
    source: ['src', 'styles', 'abstracts'],
    target: ['src', 'styles', 'abstracts'],
    overwrite: true,
  },
  store: {
    source: ['src', 'store'],
    target: ['src', 'store'],
  },
  services: {
    source: ['src', 'services'],
    target: ['src', 'services'],
  },
  scripts: {
    source: ['/', 'scripts'],
    target: ['/', 'scripts'],
  },
};

const installItem = (name: string) => {
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

  if (existsSync(targetPath) && !item?.overwrite) {
    console.error(`"${targetDisplayPath}" already exists.`);
    process.exitCode = 1;
    return;
  }

  mkdirSync(targetPath, { recursive: true });

  cpSync(sourcePath, targetPath, {
    recursive: true,
    force: true,
  });

  console.log(`"${name}" installed to ${targetDisplayPath}`);
};

if (command !== 'add' || !itemName) {
  console.log('Usage: shared_components add <component|abstracts>');
} else {
  installItem(itemName);
}
