import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT_DIR = process.cwd();
const IMAGES_DIR = path.join(ROOT_DIR, 'public', 'img');
const OUTPUT_FILE = path.join(ROOT_DIR, 'src', 'constants', 'images.generated.ts');

const toCamelCase = (value) =>
  value.replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''));

const toConstName = (value) =>
  value
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .toUpperCase();

const getImageFolders = () => {
  if (!fs.existsSync(IMAGES_DIR)) return [];

  return fs
    .readdirSync(IMAGES_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
};

const getImages = (folder) => {
  const folderPath = path.join(IMAGES_DIR, folder);

  if (!fs.existsSync(folderPath)) return [];

  return fs
    .readdirSync(folderPath, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => {
      const extension = path.extname(entry.name);
      const name = path.basename(entry.name, extension);

      return {
        key: toCamelCase(name),
        path: `/img/${folder}/${entry.name}`,
      };
    })
    .sort((a, b) => a.key.localeCompare(b.key));
};

const generateObject = (folder) => {
  const constName = toConstName(folder);
  const pathName = `${constName}_PATH`;
  const images = getImages(folder);

  const entries = images
    .map(({ key, path: imagePath }) => {
      const fileName = path.basename(imagePath);

      return `  ${key}: \`\${${pathName}}/${fileName}\`,`;
    })
    .join('\n');

  return `const ${pathName} = '/img/${folder}';

export const ${constName} = {
${entries}
} as const;`;
};

const folders = getImageFolders();

const content = `// AUTO-GENERATED FILE. DO NOT EDIT.

${folders.map(generateObject).join('\n\n')}
`;

fs.writeFileSync(OUTPUT_FILE, content);

process.stdout.write('✓ Images generated\n');