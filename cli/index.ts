#!/usr/bin/env node

import { cpSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const [, , command, componentName] = process.argv;

const installComponent = (name: string): void => {
  const cliDirectory = path.dirname(fileURLToPath(import.meta.url));
  const packageRoot = path.resolve(cliDirectory, '../..');

  const sourcePath = path.join(packageRoot, 'src', 'components', name);
  const targetPath = path.join(process.cwd(), 'src', 'components', name);

  if (!existsSync(sourcePath)) {
    console.error(`Component "${name}" not found.`);
    process.exitCode = 1;
    return;
  }

  if (existsSync(targetPath)) {
    console.error(`Component "${name}" already exists.`);
    process.exitCode = 1;
    return;
  }

  mkdirSync(path.dirname(targetPath), { recursive: true });
  cpSync(sourcePath, targetPath, { recursive: true });

  console.log(`Component "${name}" installed to src/components/${name}`);
};

if (command !== 'add' || !componentName) {
  console.log('Usage: shared-components add <component>');
} else {
  installComponent(componentName);
}
