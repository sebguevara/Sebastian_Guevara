/**
 * Generates public/og.png (1200×630) with brand mark + name from cv.json.
 * Run: bun run og
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { BODY_PATH, BRAND, TAIL_PATH } from "./brand.mjs";

const cv = JSON.parse(readFileSync(new URL("../cv.json", import.meta.url)));

const name = cv.basics.name;
const label =
  typeof cv.basics.label === "string" ? cv.basics.label : cv.basics.label.en;
const location = `${cv.basics.location.city}, ${cv.basics.location.region}`;

const escape = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const { bg, surface, line, ink, muted, faint, accentSoft, body, tail } = BRAND;

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="78%" cy="18%" r="55%">
      <stop offset="0%" stop-color="${accentSoft}" stop-opacity="0.18"/>
      <stop offset="70%" stop-color="${accentSoft}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="nameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${ink}"/>
      <stop offset="100%" stop-color="${muted}"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="${bg}"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="48" y="48" width="1104" height="534" rx="28" fill="${surface}" fill-opacity="0.55" stroke="${line}" stroke-width="2"/>

  <svg x="112" y="140" width="92" height="107" viewBox="0 0 1162 1353">
    <path fill="${body}" fill-rule="evenodd" d="${BODY_PATH}"/>
    <path fill="${tail}" d="${TAIL_PATH}"/>
  </svg>

  <text x="232" y="188" font-family="Segoe UI, Arial, sans-serif" font-size="26" letter-spacing="5" fill="${accentSoft}">${escape(label.toUpperCase())}</text>
  <text x="228" y="300" font-family="Segoe UI, Arial, sans-serif" font-size="78" font-weight="800" fill="url(#nameGrad)">${escape(name)}</text>
  <text x="232" y="368" font-family="Segoe UI, Arial, sans-serif" font-size="28" fill="${muted}">Portfolio · Open to opportunities</text>

  <circle cx="240" cy="496" r="6" fill="${accentSoft}"/>
  <text x="260" y="504" font-family="Consolas, Menlo, monospace" font-size="24" fill="${faint}">${escape(location)}</text>
</svg>`;

const out = fileURLToPath(new URL("../public/og.png", import.meta.url));
await sharp(Buffer.from(svg)).png().toFile(out);
console.log("public/og.png generated");
