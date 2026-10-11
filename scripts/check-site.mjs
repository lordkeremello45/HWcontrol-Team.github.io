import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const basePrefix = "/HWcontrol-Team.github.io/";
const siteOrigin = "https://lordkeremello45.github.io";
const requiredPages = [
  "index.html",
  "product/index.html",
  "getting-started/index.html",
  "contribute/index.html",
  "privacy/index.html",
  "security/index.html",
  "guides/hardware-monitoring-safety/index.html",
  "guides/linux-fan-control/index.html",
];

function fail(message) {
  console.error(`Site check failed: ${message}`);
  process.exitCode = 1;
}

if (!fs.existsSync(dist)) {
  fail("dist/ does not exist; run the Astro build before checking the site.");
  process.exit(1);
}

for (const relative of requiredPages) {
  const file = path.join(dist, relative);
  if (!fs.existsSync(file)) {
    fail(`Missing expected route: ${relative}`);
    continue;
  }
  const html = fs.readFileSync(file, "utf8");
  if (!/<html\b[^>]*\blang="en"/i.test(html)) fail(`${relative} is missing its English document language.`);
  if (!/<title>[^<]+<\/title>/i.test(html)) fail(`${relative} is missing a page title.`);
  if (!/<meta\s+name="description"\s+content="[^"]+"/i.test(html)) fail(`${relative} is missing a meta description.`);
  const canonical = html.match(/<link\\s+rel="canonical"\\s+href="([^"]+)"/i)?.[1];
  const route = relative === "index.html" ? "" : relative.replace(/index\\.html$/, "");
  const expectedCanonical = `${siteOrigin}${basePrefix}${route}`;
  if (canonical !== expectedCanonical) fail(`${relative} canonical URL mismatch: expected ${expectedCanonical}, got ${canonical || "missing"}.`);
}

const robotsFile = path.join(dist, "robots.txt");
const sitemapFile = path.join(dist, "sitemap.xml");
if (!fs.existsSync(robotsFile)) fail("robots.txt was not copied to the build output.");
if (!fs.existsSync(sitemapFile)) fail("sitemap.xml was not copied to the build output.");

if (fs.existsSync(robotsFile)) {
  const robots = fs.readFileSync(robotsFile, "utf8");
  if (!robots.includes(`${siteOrigin}${basePrefix}sitemap.xml`)) fail("robots.txt does not reference the project sitemap URL.");
}

if (fs.existsSync(sitemapFile)) {
  const xml = fs.readFileSync(sitemapFile, "utf8");
  const locations = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
  if (locations.length < requiredPages.length) fail(`sitemap.xml contains ${locations.length} URLs; expected at least ${requiredPages.length}.`);
  for (const location of locations) {
    let url;
    try { url = new URL(location); }
    catch { fail(`Invalid sitemap URL: ${location}`); continue; }
    if (url.origin !== siteOrigin || !url.pathname.startsWith(basePrefix)) {
      fail(`Sitemap URL is outside the deployed project base path: ${location}`);
      continue;
    }
    const route = url.pathname.slice(basePrefix.length);
    const relative = route === "" ? "index.html" : route.endsWith("/") ? `${route}index.html` : route;
    if (!fs.existsSync(path.join(dist, relative))) fail(`Sitemap points to a route missing from dist/: ${location}`);
  }
}

function resolveInternalHref(href, fromFile) {
  if (!href || href.startsWith("#") || /^(mailto:|tel:|data:|javascript:)/i.test(href)) return null;
  let url;
  try { url = new URL(href, "https://site-check.invalid"); }
  catch { fail(`Invalid href in ${path.relative(dist, fromFile)}: ${href}`); return null; }
  if (url.origin !== "https://site-check.invalid") return null;
  if (url.pathname === "/") return null;
  if (url.pathname === basePrefix.slice(0, -1)) url.pathname = basePrefix;
  if (!url.pathname.startsWith(basePrefix)) {
    fail(`Internal href is missing the GitHub Pages project base path: ${href}`);
    return null;
  }
  const route = decodeURIComponent(url.pathname.slice(basePrefix.length));
  const relative = route === "" ? "index.html" : route.endsWith("/") ? `${route}index.html` : route;
  return path.join(dist, relative);
}

for (const relative of requiredPages) {
  const file = path.join(dist, relative);
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, "utf8");
  for (const match of html.matchAll(/\bhref="([^"]+)"/g)) {
    const target = resolveInternalHref(match[1], file);
    if (target && !fs.existsSync(target)) fail(`Broken internal link in ${relative}: ${match[1]}`);
  }
}

if (process.exitCode) process.exit(process.exitCode);
console.log(`Site checks passed for ${requiredPages.length} routes, canonical metadata, local links, robots.txt and sitemap.xml.`);
