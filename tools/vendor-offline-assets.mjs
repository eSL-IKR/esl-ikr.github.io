import { mkdir, copyFile, access, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const jobs = [
  ['node_modules/three-legacy/build/three.min.js', 'public/pclab/vendor/three-r128.min.js'],
  ['node_modules/three-legacy/examples/js/loaders/GLTFLoader.js', 'public/pclab/vendor/GLTFLoader-r128.js'],
  ['node_modules/three-legacy/examples/js/loaders/DRACOLoader.js', 'public/pclab/vendor/DRACOLoader-r128.js'],
  ['node_modules/bootstrap/dist/css/bootstrap.min.css', 'public/libs/bootstrap.min.css'],
  ['node_modules/bootstrap/dist/js/bootstrap.bundle.min.js', 'public/libs/bootstrap.bundle.min.js'],
  ['node_modules/@fontsource/nunito/files/nunito-latin-400-normal.woff2', 'public/libs/fonts/nunito-latin-400-normal.woff2'],
  ['node_modules/@fontsource/nunito/files/nunito-latin-600-normal.woff2', 'public/libs/fonts/nunito-latin-600-normal.woff2'],
  ['node_modules/@fontsource/nunito/files/nunito-latin-700-normal.woff2', 'public/libs/fonts/nunito-latin-700-normal.woff2'],
  ['node_modules/@fontsource/nunito/files/nunito-latin-800-normal.woff2', 'public/libs/fonts/nunito-latin-800-normal.woff2'],
  ['node_modules/@fontsource/pixelify-sans/files/pixelify-sans-latin-400-normal.woff2', 'public/libs/fonts/pixelify-sans-latin-400-normal.woff2'],
];
let copied = 0, missing = [];
const required = new Set(jobs.slice(0, 8).map(([from]) => from));
for (const [from, to] of jobs) {
  const src = path.join(root, from), dest = path.join(root, to);
  try {
    await access(src);
    await mkdir(path.dirname(dest), { recursive: true });
    await copyFile(src, dest);
    copied++;
    console.log(`OK  ${from} -> ${to}`);
  } catch {
    missing.push(from);
    console.warn(`SKIP ${from} (dependency/file not installed)`);
  }
}
await mkdir(path.join(root, 'public/libs'), { recursive: true });
const css = `@font-face{font-family:Nunito;src:url('./fonts/nunito-latin-400-normal.woff2') format('woff2');font-weight:400;font-style:normal;font-display:swap}
@font-face{font-family:Nunito;src:url('./fonts/nunito-latin-600-normal.woff2') format('woff2');font-weight:600;font-style:normal;font-display:swap}
@font-face{font-family:Nunito;src:url('./fonts/nunito-latin-700-normal.woff2') format('woff2');font-weight:700;font-style:normal;font-display:swap}
@font-face{font-family:Nunito;src:url('./fonts/nunito-latin-800-normal.woff2') format('woff2');font-weight:800;font-style:normal;font-display:swap}
@font-face{font-family:Pixelify Sans;src:url('./fonts/pixelify-sans-latin-400-normal.woff2') format('woff2');font-weight:400;font-style:normal;font-display:swap}
`;
await writeFile(path.join(root, 'public/libs/offline-fonts.css'), css, 'utf8');
console.log(`\nVendor selesai: ${copied}/${jobs.length} fail disalin.`);
if (missing.length) console.warn('Aset belum tersedia. Jalankan semula `npm run assets:vendor` selepas pemasangan dependency lengkap.');
if (missing.some((name) => required.has(name))) process.exitCode = 1;
