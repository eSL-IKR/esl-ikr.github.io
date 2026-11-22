#!/usr/bin/env node
'use strict';

/**
 * Extracts the literal component catalog and the existing F600 OpenDB record
 * from the self-contained Three.js builder. The extracted section contains
 * only local catalog declarations and deterministic visual-variant creation.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const builderPath = path.join(root, 'public', 'pclab', 'pembina.html');
const outputPath = path.join(root, 'public', 'pclab', 'catalog-builtin.json');
const html = fs.readFileSync(builderPath, 'utf8');

const start = html.indexOf('var CATS=');
const end = html.indexOf('function specs(cat,p)', start);
if (start < 0 || end < 0 || end <= start) {
  throw new Error('Blok katalog DB dalam pembina.html tidak ditemui.');
}

const f600Match = html.match(/<script id="buildcoresOpenDbF600" type="application\/json">([\s\S]*?)<\/script>/);
if (!f600Match) throw new Error('Rekod OpenDB FOIFKIN F600 tidak ditemui.');
const f600 = JSON.parse(f600Match[1]);
const catalogSource = html.slice(start, end);

// This evaluates only the local catalog declaration block, not the builder UI.
const createCatalog = new Function('document', `${catalogSource}\nreturn DB;`); // eslint-disable-line no-new-func
const db = createCatalog({
  getElementById(id) {
    return id === 'buildcoresOpenDbF600' ? { textContent: JSON.stringify(f600) } : null;
  }
});

const items = Object.entries(db).flatMap(([category, products]) =>
  products.map((product) => ({ category, ...product }))
);
const baseCount = items.filter((item) => !item.modelTag).length;
const variantCount = items.length - baseCount;
const payload = {
  meta: {
    name: 'eModul IKR built-in component catalog',
    source: 'Data komponen asas dalam public/pclab/pembina.html',
    count: items.length,
    baseProductCount: baseCount,
    generatedVisualVariantCount: variantCount,
    note: 'Varian warna yang dijana untuk visual 3D dilabel Model 3D rekaan; bukan SKU produk berasingan yang disahkan.'
  },
  db
};

fs.writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
console.log(`Katalog asas diekstrak: ${items.length} pilihan (${baseCount} rekod asas + ${variantCount} varian visual).`);
console.log(`Ditulis: ${path.relative(root, outputPath)}`);
