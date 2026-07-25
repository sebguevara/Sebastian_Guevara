/**
 * Generates all favicon / PWA icons from the brand mark.
 * Run: bun scripts/generate-icons.mjs
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { BODY_PATH, BRAND, TAIL_PATH } from "./brand.mjs";

const { bg, body, tail } = BRAND;

function iconSvg(size, { rounded = true } = {}) {
  const padX = Math.round(size * 0.2);
  const padY = Math.round(size * 0.08);
  const innerW = size - padX * 2;
  const innerH = Math.round(innerW * (1353 / 1162));
  const y = Math.round((size - innerH) / 2);
  const rx = rounded ? Math.round(size * 0.22) : 0;

  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" rx="${rx}" fill="${bg}"/>
  <svg x="${padX}" y="${Math.max(padY, y)}" width="${innerW}" height="${innerH}" viewBox="0 0 1162 1353" preserveAspectRatio="xMidYMid meet">
    <path fill="${body}" fill-rule="evenodd" d="${BODY_PATH}"/>
    <path fill="${tail}" d="${TAIL_PATH}"/>
  </svg>
</svg>`;
}

async function writePng(name, size, opts) {
  const out = fileURLToPath(new URL(`../public/${name}`, import.meta.url));
  await sharp(Buffer.from(iconSvg(size, opts))).png().toFile(out);
  console.log(`public/${name} (${size}×${size})`);
}

async function writeIco() {
  const out = fileURLToPath(new URL("../public/favicon.ico", import.meta.url));
  // Multi-size ICO via sharp: encode 32px PNG and rename — browsers accept PNG-in-ICO poorly,
  // so we write a real ICO from 16 + 32 buffers using sharp's png then a simple ICO packer.
  const png16 = await sharp(Buffer.from(iconSvg(16))).png().toBuffer();
  const png32 = await sharp(Buffer.from(iconSvg(32))).png().toBuffer();
  const ico = encodeIco([
    { size: 16, png: png16 },
    { size: 32, png: png32 },
  ]);
  writeFileSync(out, ico);
  console.log("public/favicon.ico");
}

/** Minimal ICO container for PNG-compressed images (Vista+). */
function encodeIco(images) {
  const headerSize = 6;
  const dirEntrySize = 16;
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  const entries = [];
  let offset = headerSize + dirEntrySize * images.length;
  const payloads = [];

  for (const img of images) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(img.size >= 256 ? 0 : img.size, 0);
    entry.writeUInt8(img.size >= 256 ? 0 : img.size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(img.png.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    payloads.push(img.png);
    offset += img.png.length;
  }

  return Buffer.concat([header, ...entries, ...payloads]);
}

// Browser favicon (SVG is source of truth for modern tabs)
const faviconSvg = iconSvg(128);
writeFileSync(
  fileURLToPath(new URL("../public/favicon.svg", import.meta.url)),
  faviconSvg,
);
writeFileSync(
  fileURLToPath(new URL("../public/logo.svg", import.meta.url)),
  faviconSvg,
);
console.log("public/favicon.svg");
console.log("public/logo.svg");

await writePng("favicon-32x32.png", 32);
await writePng("apple-touch-icon.png", 180);
await writePng("icon-192.png", 192);
await writePng("icon-512.png", 512);
await writePng("logo.png", 512);
await writeIco();

console.log("brand icons ready");
