// Bundles src/device-card.js into the single file dist/device-card.js, version and Mobile App logo included.
// Usage: node scripts/build.mjs  (dist/ is not committed: CI and the release workflow build it)
import { mkdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { splitDist } from "./i18n-split.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const pkg = JSON.parse(readFileSync(`${root}package.json`, "utf8"));

// The Mobile App logo, shown as a badge on the header icon, is embedded as a data URI.
const logo = `data:image/png;base64,${readFileSync(`${root}images/mobile_app.png`).toString("base64")}`;
const out = readFileSync(`${root}src/device-card.js`, "utf8").replace("__VERSION__", pkg.version).replace("__MOBILE_APP_LOGO__", logo);

mkdirSync(`${root}dist`, { recursive: true });
writeFileSync(`${root}dist/device-card.js`, out);
console.log(`Built dist/device-card.js (${(out.length / 1024).toFixed(1)} KB)`);

// Translations: English stays in the bundle, each other language goes to dist/device-card.i18n.<lang>.js,
// fetched when a card needs it (scripts/i18n-split.mjs).
if (process.argv[1] && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) splitDist(`${root}dist`, "device-card.js", { version: pkg.version });
