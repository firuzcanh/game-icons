// Builds src/data/icons.json from the Figma icon list.
//
// The Figma library ("The Ultimate Games Icons Library") is generated from the
// game-icons.net set. The Figma MCP can only return ~20KB per call, so the vector
// data is taken from the same set as shipped in react-icons/gi and scaled from the
// 512 grid to the Figma 24x24 grid (identical to Figma's own SVG export).
// Only the icons that exist in the Figma file (scripts/figma-names.txt) are kept.

import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import svgpath from "svgpath";
import { CATEGORIES, categorize, splitWords } from "./categories.mjs";

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");

const figmaNames = fs.readFileSync(path.join(root, "scripts/figma-names.txt"), "utf8").trim().split("\n");

// Pull the GenIcon trees out of react-icons without rendering anything.
const giSource = fs.readFileSync(path.join(path.dirname(require.resolve("react-icons/gi")), "index.js"), "utf8");
const trees = new Map();
for (const m of giSource.matchAll(/module\.exports\.(\w+) = function \w+ \(props\) \{\n\s+return GenIcon\((\{.*\})\)\(props\);/g)) {
  trees.set(m[1].toLowerCase(), JSON.parse(m[2]));
}

const SCALE = 24 / 512;
const missing = [];
const icons = [];

for (const name of figmaNames) {
  const tree = trees.get(name.toLowerCase());
  if (!tree) {
    missing.push(name);
    continue;
  }
  const paths = tree.child
    .filter((c) => c.tag === "path")
    .map((c) => svgpath(c.attr.d).scale(SCALE).round(3).toString());
  const category = categorize(name);
  icons.push({ n: name, c: category, p: paths, w: splitWords(name).join(" ") });
}

if (missing.length) {
  console.error("Missing vector data for:", missing.join(", "));
  process.exit(1);
}

const counts = Object.fromEntries(CATEGORIES.map((c) => [c.id, 0]));
for (const i of icons) counts[i.c]++;
const categories = CATEGORIES.filter((c) => counts[c.id] > 0).map((c) => ({ ...c, count: counts[c.id] }));

fs.mkdirSync(path.join(root, "src/data"), { recursive: true });
fs.writeFileSync(path.join(root, "src/data/icons.json"), JSON.stringify({ categories, icons }));
console.log(`Wrote ${icons.length} icons in ${categories.length} categories.`);
