also install `npm i -D concurrently` for working
and change package.json scripts

scripts for package.json:

```json
"scripts": {
  "dev": "npm run clean && concurrently \"next dev\" \"npm run watch:images\" \"npm run watch:data-interfaces\"",
  "clean": "node -e \"const fs = require('node:fs'); ['.next', 'tsconfig.tsbuildinfo'].forEach((path) => fs.rmSync(path, { recursive: true, force: true }))\"",
  "watch:images": "node scripts/watch-images.mjs",
  "generate:images": "node scripts/generate-images.mjs",
  "generate:data-interfaces": "node scripts/generate-data-interfaces.mjs",
  "watch:data-interfaces": "node scripts/watch-data-interfaces.mjs",
  "prebuild": "npm run clean && npm run generate:images && npm run generate:data-interfaces",
  "build": "npm run build:compile && npm run build:env",
  "build:compile": "cross-env NODE_OPTIONS=--max-old-space-size=1024 next build --webpack --experimental-build-mode=compile",
  "build:env": "next build --webpack --experimental-build-mode=generate-env",
  "start": "next start",
  "lint": "npm run clean && eslint .",
  "lint:fix": "eslint . --fix"
},
```
