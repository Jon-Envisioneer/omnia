#!/usr/bin/env node
// Render a seeded page at many seeds and tile the screenshots into one PNG,
// so a model that cannot see its own output can look at a whole distribution.
//
//   node contact_sheet.mjs <file-or-url> [--seeds a,b,c | --count 9]
//        [--size 480x480] [--cols 3] [--theme light|dark] [--wait 300] [--out sheet.png]
//
// Each seed is passed as a bare URL hash (#seed), which is also the only hash
// form an Artifact page receives.
import { createRequire } from "node:module";
import { existsSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { execSync } from "node:child_process";

const require = createRequire(import.meta.url);
let playwright;
try {
  playwright = require("playwright");
} catch {
  const root = execSync("npm root -g").toString().trim();
  playwright = require(`${root}/playwright`);
}

const argv = process.argv.slice(2);
const opt = (name, dflt) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 ? argv[i + 1] : dflt;
};
const target = argv.find((a, i) => !a.startsWith("--") && !(i > 0 && argv[i - 1].startsWith("--")));
if (!target) {
  console.error("usage: contact_sheet.mjs <file-or-url> [--seeds a,b,c | --count 9] [--size WxH] [--cols N] [--theme light|dark] [--wait ms] [--out sheet.png]");
  process.exit(2);
}
const base = /^https?:/.test(target) ? target.split("#")[0] : pathToFileURL(resolve(target)).href;
const seeds = opt("seeds") ? opt("seeds").split(",") : Array.from({ length: Number(opt("count", 9)) }, (_, i) => String(i + 1));
const [w, h] = opt("size", "480x480").split("x").map(Number);
const cols = Number(opt("cols", Math.min(3, seeds.length)));
const theme = opt("theme", "light");
const wait = Number(opt("wait", 300));
const out = opt("out", "contact-sheet.png");

const exe = ["/opt/pw-browsers/chromium", process.env.CHROMIUM_PATH].find((p) => p && existsSync(p) && !p.endsWith("/"));
const browser = await playwright.chromium.launch(exe ? { executablePath: exe } : {}).catch(() => playwright.chromium.launch());
const page = await browser.newPage({ viewport: { width: w, height: h }, colorScheme: theme });

const shots = [];
for (const s of seeds) {
  await page.goto(`${base}#${encodeURIComponent(s)}`);
  await page.evaluate(() => window.dispatchEvent(new HashChangeEvent("hashchange")));
  await page.waitForTimeout(wait);
  shots.push({ seed: s, png: (await page.screenshot()).toString("base64") });
}

const rows = Math.ceil(shots.length / cols);
const pad = 12;
const cap = 22;
const sheetW = cols * w + (cols + 1) * pad;
const sheetH = rows * (h + cap) + (rows + 1) * pad;
await page.setViewportSize({ width: sheetW, height: sheetH });
await page.setContent(`<body style="margin:0;background:${theme === "dark" ? "#111" : "#eee"};font:13px ui-monospace,monospace;color:${theme === "dark" ? "#ddd" : "#222"}">
  <div style="display:grid;grid-template-columns:repeat(${cols},${w}px);gap:${pad}px;padding:${pad}px">
  ${shots.map((s) => `<figure style="margin:0"><img src="data:image/png;base64,${s.png}" width="${w}" height="${h}" style="display:block;outline:1px solid #8888"><figcaption style="height:${cap}px;line-height:${cap}px">#${s.seed}</figcaption></figure>`).join("")}
  </div></body>`);
writeFileSync(out, await page.screenshot({ fullPage: true }));
await browser.close();
console.log(`wrote ${out}: ${shots.length} seeds, ${cols}×${rows} at ${w}×${h} (${theme})`);
