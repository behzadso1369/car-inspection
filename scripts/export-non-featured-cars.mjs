import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const carsDataPath = path.join(
  ROOT,
  "src/app/car-inspection-most-popular/carsData.ts",
);
const file = fs.readFileSync(carsDataPath, "utf8");

const FEATURED = new Set([
  "peugeot-206",
  "peugeot-207",
  "jac-s5",
  "tiggo-8-pro-max",
  "shahin",
  "renault-l90",
]);

const re =
  /\{\s*slug:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*brand:\s*"([^"]+)"/g;
const all = [];
let m;
while ((m = re.exec(file)) !== null) {
  all.push({ slug: m[1], name: m[2], brand: m[3] });
}

const notFeatured = all.filter((c) => !FEATURED.has(c.slug));
const base =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://carmacheck.com";

function csvEscape(cell) {
  return `"${String(cell).replace(/"/g, '""')}"`;
}

const rows = [
  ["ردیف", "نام خودرو", "برند", "اسلاگ", "لینک"],
  ...notFeatured.map((c, i) => [
    String(i + 1),
    c.name,
    c.brand,
    c.slug,
    `${base}/car-inspection-most-popular/${c.slug}`,
  ]),
];

const csv = rows.map((r) => r.map(csvEscape).join(",")).join("\r\n");
const outDir = path.join(ROOT, "exports");
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(
  outDir,
  "car-inspection-most-popular-not-on-landing.csv",
);
fs.writeFileSync(outPath, `\uFEFF${csv}`, "utf8");

console.log(`Total in CARS: ${all.length}`);
console.log(`On landing (featured): ${FEATURED.size}`);
console.log(`Not on landing: ${notFeatured.length}`);
console.log(`Written: ${outPath}`);
