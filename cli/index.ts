#!/usr/bin/env node

import { appendFileSync, cpSync, existsSync, mkdirSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

type InstallableItem = {
  source: string[];
  target: string[];
  overwrite?: boolean;
};

const [, , command, itemName] = process.argv;

const cliDirectory = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(cliDirectory, '../..');
const utilitiesDirectory = path.join(packageRoot, 'src', 'utils');

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

// %------------------------ utilities ------------------------% //

const getExportedUtilityName = (source: string) => {
  const match = source.match(/export\s+const\s+([A-Za-z_$][\w$]*)\s*=/);

  return match?.[1] ?? null;
};

const getUtilityFiles = () => {
  if (!existsSync(utilitiesDirectory)) return new Map<string, string>();

  return readdirSync(utilitiesDirectory, { withFileTypes: true }).reduce((utilities, entry) => {
    if (!entry.isFile()) return utilities;
    if (!entry.name.endsWith('.ts')) return utilities;
    if (entry.name === 'utils.ts') return utilities;

    const filePath = path.join(utilitiesDirectory, entry.name);
    const source = readFileSync(filePath, 'utf8');
    const utilityName = getExportedUtilityName(source);

    if (!utilityName) return utilities;

    utilities.set(utilityName, filePath);

    return utilities;
  }, new Map<string, string>());
};

const getUtilityDependencies = (filePath: string) => {
  const source = readFileSync(filePath, 'utf8');
  const dependencies: string[] = [];
  const importPattern = /from\s+['"](\.[^'"]+)['"]/g;

  for (const match of source.matchAll(importPattern)) {
    const importPath = match[1];
    const resolvedPath = path.resolve(path.dirname(filePath), importPath);
    const dependencyPath = path.extname(resolvedPath) ? resolvedPath : `${resolvedPath}.ts`;

    if (!existsSync(dependencyPath)) continue;
    if (!dependencyPath.startsWith(utilitiesDirectory)) continue;

    dependencies.push(dependencyPath);
  }

  return dependencies;
};

const getUtilityInstallOrder = (filePath: string, visited = new Set<string>(), result: string[] = []) => {
  if (visited.has(filePath)) return result;

  visited.add(filePath);

  const dependencies = getUtilityDependencies(filePath);

  dependencies.forEach((dependency) => {
    getUtilityInstallOrder(dependency, visited, result);
  });

  result.push(filePath);

  return result;
};

const removeImports = (source: string) => {
  const lines = source.split(/\r?\n/);
  const result: string[] = [];
  let insideImport = false;

  lines.forEach((line) => {
    const trimmedLine = line.trimStart();

    if (!insideImport && trimmedLine.startsWith('import ')) {
      insideImport = !line.includes(';');
      return;
    }

    if (insideImport) {
      if (line.includes(';')) insideImport = false;
      return;
    }

    result.push(line);
  });

  return result.join('\n').trim();
};

const hasUtility = (source: string, utilityName: string) => {
  const pattern = new RegExp(`export\\s+const\\s+${utilityName}\\s*=`);

  return pattern.test(source);
};

const installUtility = (name: string, filePath: string) => {
  const targetPath = path.join(process.cwd(), 'src', 'utils', 'utils.ts');
  const targetDirectory = path.dirname(targetPath);

  mkdirSync(targetDirectory, { recursive: true });

  if (!existsSync(targetPath)) {
    appendFileSync(targetPath, '');
  }

  let targetSource = readFileSync(targetPath, 'utf8');
  const installOrder = getUtilityInstallOrder(filePath);
  const installedUtilities: string[] = [];

  installOrder.forEach((utilityPath) => {
    const source = readFileSync(utilityPath, 'utf8');
    const utilityName = getExportedUtilityName(source);

    if (!utilityName) return;
    if (hasUtility(targetSource, utilityName)) return;

    const utilitySource = removeImports(source);
    const separator = targetSource.trim() ? '\n\n' : '';

    appendFileSync(targetPath, `${separator}${utilitySource}\n`);

    targetSource += `${separator}${utilitySource}\n`;
    installedUtilities.push(utilityName);
  });

  if (!installedUtilities.length) {
    console.log(`"${name}" is already installed.`);
    return;
  }

  console.log(`Installed: ${installedUtilities.join(', ')}`);
};

// %------------------------ items ------------------------% //

const installItem = (name: string) => {
  const utilities = getUtilityFiles();
  const utilityPath = utilities.get(name);

  if (utilityPath) {
    installUtility(name, utilityPath);
    return;
  }

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
  console.log('Usage: shared_components add <component|utility|abstracts>');
} else {
  installItem(itemName);
}
