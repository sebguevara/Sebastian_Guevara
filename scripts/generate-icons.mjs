/**
 * Generates PNG icons from the brand mark for apple-touch / fallback favicon.
 * Run: bun scripts/generate-icons.mjs
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { BODY_PATH, BRAND, TAIL_PATH } from "./brand.mjs";

const { bg, body, tail } = BRAND;

function iconSvg(size) {
  const pad = Math.round(size * 0.2);
  const inner = size - pad * 2;
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" rx="${Math.round(size * 0.22)}" fill="${bg}"/>
  <svg x="${pad}" y="${Math.round(pad * 0.55)}" width="${inner}" height="${Math.round(inner * (1353 / 1162))}" viewBox="0 0 1162 1353">
    <path fill="${body}" fill-rule="evenodd" d="${BODY_PATH}"/>
    <path fill="${tail}" d="${TAIL_PATH}"/>
  </svg>
</svg>`;
}

async function write(name, size) {
  const out = fileURLToPath(new URL(`../public/${name}`, import.meta.url));
  await sharp(Buffer.from(iconSvg(size))).png().toFile(out);
  console.log(`public/${name} generated (${size}×${size})`);
}

await write("apple-touch-icon.png", 180);
await write("favicon-32x32.png", 32);
await write("icon-192.png", 192);
await write("icon-512.png", 512);

// Keep SVG favicon as source of truth for modern browsers.
readFileSync(new URL("../public/favicon.svg", import.meta.url));
console.log("icons ready");
