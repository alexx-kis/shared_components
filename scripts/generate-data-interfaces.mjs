import console from 'node:console';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import ts from 'typescript';

const ROOT_DIR = process.cwd();
const TYPES_DIR = path.join(ROOT_DIR, 'src', 'types');
const PAGES_DIR = path.join(TYPES_DIR, 'pages');
const OUTPUT_DIR = path.join(ROOT_DIR, 'data-interfaces');

const configPath = ts.findConfigFile(ROOT_DIR, ts.sys.fileExists, 'tsconfig.json');

if (!configPath) {
  throw new Error('tsconfig.json not found');
}

const configFile = ts.readConfigFile(configPath, ts.sys.readFile);

if (configFile.error) {
  throw new Error(ts.flattenDiagnosticMessageText(configFile.error.messageText, '\n'));
}

const parsedConfig = ts.parseJsonConfigFileContent(configFile.config, ts.sys, ROOT_DIR);

const program = ts.createProgram({
  rootNames: parsedConfig.fileNames,
  options: parsedConfig.options,
});

const checker = program.getTypeChecker();

const toSnakeCase = (value) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/[-\s]+/g, '_')
    .toLowerCase();

const renderType = (type, node, indent = 0, stripUndefined = false) => {
  if (type.flags & ts.TypeFlags.StringLike) return checker.typeToString(type, node);
  if (type.flags & ts.TypeFlags.NumberLike) return checker.typeToString(type, node);
  if (type.flags & ts.TypeFlags.BooleanLike) return checker.typeToString(type, node);
  if (type.flags & ts.TypeFlags.Null) return 'null';
  if (type.flags & ts.TypeFlags.Undefined) return 'undefined';

  if (type.isUnion()) {
    let types = stripUndefined
      ? type.types.filter((item) => !(item.flags & ts.TypeFlags.Undefined))
      : type.types;

    const hasTrue = types.some((item) => checker.typeToString(item, node) === 'true');
    const hasFalse = types.some((item) => checker.typeToString(item, node) === 'false');

    const values = [];

    if (hasTrue && hasFalse) {
      types = types.filter((item) => !(item.flags & ts.TypeFlags.BooleanLiteral));
      values.push('boolean');
    }

    values.push(...types.map((item) => renderType(item, node, indent)));

    return [...new Set(values)].join(' | ');
  }

  if (checker.isArrayType(type)) {
    const [elementType] = type.typeArguments ?? [];

    if (!elementType) return 'unknown[]';

    const rendered = renderType(elementType, node, indent);

    return `${rendered}[]`;
  }

  const properties = checker.getPropertiesOfType(type);

  if (!properties.length) {
    return checker.typeToString(type, node);
  }

  const spacing = '  '.repeat(indent);
  const innerSpacing = '  '.repeat(indent + 1);

  const lines = properties.map((property) => {
    const declaration = property.valueDeclaration ?? property.declarations?.[0];

    if (!declaration) return '';

    const propertyType = checker.getTypeOfSymbolAtLocation(property, declaration);
    const isOptional = Boolean(property.flags & ts.SymbolFlags.Optional);
    const optional = isOptional ? '?' : '';
    const value = renderType(propertyType, declaration, indent + 1, isOptional);

    const propertyName = toSnakeCase(property.name);

    return `${innerSpacing}${propertyName}${optional}: ${value};`;
  });

  return `{\n${lines.filter(Boolean).join('\n')}\n${spacing}}`;
};


fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const pageFiles = program
  .getSourceFiles()
  .filter((sourceFile) => path.resolve(sourceFile.fileName).startsWith(path.resolve(PAGES_DIR)))
  .filter((sourceFile) => !sourceFile.isDeclarationFile);

for (const sourceFile of pageFiles) {
  for (const statement of sourceFile.statements) {
    if (!ts.isInterfaceDeclaration(statement) && !ts.isTypeAliasDeclaration(statement)) continue;

    const name = statement.name.text;

    if (!name.endsWith('PageData')) continue;

    const type = checker.getTypeAtLocation(statement);
    const rendered = renderType(type, statement);

    const outputPath = path.join(OUTPUT_DIR, path.basename(sourceFile.fileName));
    const content = `export type ${name} = ${rendered};\n`;

    fs.writeFileSync(outputPath, content);
    console.log(`Generated: ${path.relative(ROOT_DIR, outputPath)}`);
  }
}