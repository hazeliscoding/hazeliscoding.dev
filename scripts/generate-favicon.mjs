// Generates the GlitterNet favicon set: a pixel sparkle (peach, sticker
// shadow, teal glint) on cream with a hard brown border — 16x16 pixel art
// scaled up losslessly (shape-rendering: crispEdges).
//
// Outputs: favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png,
// android-chrome-192x192.png, android-chrome-512x512.png, favicon.ico
// (ICO wraps 16/32/48 PNG entries). Run: node scripts/generate-favicon.mjs
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const publicDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');

// A single ✧ — the wordmark's sparkle, peach outline on cream, brown frame.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
  <rect width="16" height="16" fill="#5d4b3c" shape-rendering="crispEdges"/>
  <rect x="1" y="1" width="14" height="14" fill="#fff8f0" shape-rendering="crispEdges"/>
  <path d="M8 2 C8.6 5.4 10.6 7.4 14 8 C10.6 8.6 8.6 10.6 8 14 C7.4 10.6 5.4 8.6 2 8 C5.4 7.4 7.4 5.4 8 2 Z"
    fill="none" stroke="#f28d63" stroke-width="1.4" stroke-linejoin="round"/>
</svg>`;

const render = (size) =>
  sharp(Buffer.from(svg)).resize(size, size, { kernel: 'nearest' }).png().toBuffer();

const outputs = {
  'favicon-16x16.png': 16,
  'favicon-32x32.png': 32,
  'apple-touch-icon.png': 180,
  'android-chrome-192x192.png': 192,
  'android-chrome-512x512.png': 512,
};

for (const [name, size] of Object.entries(outputs)) {
  await writeFile(join(publicDir, name), await render(size));
  console.log(`wrote ${name} (${size}x${size})`);
}

// ICO container with PNG-compressed entries (supported since Windows Vista).
const icoSizes = [16, 32, 48];
const pngs = await Promise.all(icoSizes.map(render));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(pngs.length, 4);

const entries = [];
let offset = 6 + 16 * pngs.length;
pngs.forEach((png, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(icoSizes[i] === 256 ? 0 : icoSizes[i], 0); // width
  e.writeUInt8(icoSizes[i] === 256 ? 0 : icoSizes[i], 1); // height
  e.writeUInt8(0, 2); // palette colors
  e.writeUInt8(0, 3); // reserved
  e.writeUInt16LE(1, 4); // color planes
  e.writeUInt16LE(32, 6); // bits per pixel
  e.writeUInt32LE(png.length, 8);
  e.writeUInt32LE(offset, 12);
  offset += png.length;
  entries.push(e);
});

await writeFile(join(publicDir, 'favicon.ico'), Buffer.concat([header, ...entries, ...pngs]));
console.log('wrote favicon.ico (16+32+48)');
