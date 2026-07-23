/**
 * Generates public/og.png (1200×630) from cv.json using sharp.
 * Run: bun run og  (or: bun scripts/generate-og.mjs)
 */
import { readFileSync } from "node:fs";
import sharp from "sharp";

const cv = JSON.parse(readFileSync(new URL("../cv.json", import.meta.url)));

const name = cv.basics.name;
const label =
  typeof cv.basics.label === "string" ? cv.basics.label : cv.basics.label.en;
const roles = label.split("|").map((s) => s.trim());
const location = `${cv.basics.location.city}, ${cv.basics.location.region}`;

// Palette — keep in sync with src/styles/tokens.css (dark theme).
const bg = "#0a0a0b";
const surface = "#131315";
const line = "#26262a";
const ink = "#f4f4f5";
const muted = "#a1a1aa";
const faint = "#6b6b74";
const accent = "#d05c76";

const escape = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="50%" cy="-10%" r="80%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.16"/>
      <stop offset="60%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="nameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${ink}"/>
      <stop offset="100%" stop-color="${muted}"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="${bg}"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <rect x="48" y="48" width="1104" height="534" rx="28" fill="${surface}" fill-opacity="0.55" stroke="${line}" stroke-width="2"/>

  <rect x="112" y="150" width="56" height="6" rx="3" fill="${accent}"/>

  <text x="112" y="216" font-family="Segoe UI, Arial, sans-serif" font-size="30" letter-spacing="6" fill="${accent}">${escape(roles[0].toUpperCase())}</text>

  <text x="108" y="330" font-family="Segoe UI, Arial, sans-serif" font-size="92" font-weight="800" fill="url(#nameGrad)">${escape(name)}</text>

  <text x="112" y="404" font-family="Segoe UI, Arial, sans-serif" font-size="30" fill="${muted}">${escape(roles.slice(1).join("  ·  "))}</text>

  <circle cx="120" cy="496" r="6" fill="${accent}"/>
  <text x="140" y="504" font-family="Consolas, Menlo, monospace" font-size="24" fill="${faint}">${escape(location)}</text>
</svg>`;

await sharp(Buffer.from(svg))
  .png()
  .toFile(new URL("../public/og.png", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));

console.log("public/og.png generated");
