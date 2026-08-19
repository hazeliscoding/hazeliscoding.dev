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

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" shape-rendering="crispEdges">
  <rect width="16" height="16" fill="#5d4b3c"/>
  <rect x="1" y="1" width="14" height="14" fill="#fff8f0"/>
  <g fill="#c9b6a2">
    <rect x="8" y="3" width="2" height="11"/>
    <rect x="3" y="8" width="11" height="2"/>
    <rect x="7" y="6" width="4" height="6"/>
    <rect x="6" y="7" width="6" height="4"/>
  </g>
  <g fill="#ffaa88">
    <rect x="7" y="2" width="2" height="12"/>
    <rect x="2" y="7" width="12" height="2"/>
    <rect x="6" y="5" width="4" height="6"/>
    <rect x="5" y="6" width="6" height="4"/>
  </g>
  <g fill="#44bbaa">
    <rect x="12" y="2" width="1" height="3"/>
    <rect x="11" y="3" width="3" height="1"/>
  </g>
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
