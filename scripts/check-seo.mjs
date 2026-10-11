import fs from "node:fs";
import path from "node:path";

const dist = path.join(process.cwd(), "dist");
const pages = [
  ["index.html", "WebSite"],
  ["product/index.html", "SoftwareApplication"],
  ["getting-started/index.html", "WebSite"],
  ["guides/hardware-monitoring-safety/index.html", "WebSite"],
  ["guides/linux-fan-control/index.html", "WebSite"],
];

function fail(message) {
  console.error(`SEO check failed: ${message}`);
  process.exitCode = 1;
}

for (const [relative, requiredSchema] of pages) {
  const file = path.join(dist, relative);
  if (!fs.existsSync(file)) {
    fail(`Missing built page: ${relative}`);
    continue;
  }

  const html = fs.readFileSync(file, "utf8");
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim();
  const description = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i)?.[1];
  const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1];
  const robots = html.match(/<meta\s+name="robots"\s+content="([^"]+)"/i)?.[1];

  if (!title) fail(`${relative} has no title.`);
  if (!description || description.length < 50) fail(`${relative} has no useful meta description (at least 50 characters).`);
  if (!canonical || !canonical.startsWith("https://lordkeremello45.github.io/HWcontrol-Team.github.io/")) {
    fail(`${relative} has a missing or out-of-scope canonical URL.`);
  }
  if (!robots?.includes("index") || !robots.includes("follow")) fail(`${relative} is not explicitly indexable.`);

  const blocks = [...html.matchAll(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  const schemas = [];
  for (const match of blocks) {
    try {
      schemas.push(JSON.parse(match[1]));
    } catch {
      fail(`${relative} contains invalid JSON-LD.`);
    }
  }
  if (!schemas.some((schema) => schema["@type"] === requiredSchema)) {
    fail(`${relative} is missing its expected ${requiredSchema} structured data.`);
  }
}

if (process.exitCode) process.exit(process.exitCode);
console.log(`SEO checks passed for ${pages.length} pages: titles, descriptions, canonical URLs, robots directives and structured data.`);
