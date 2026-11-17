// The state pill, on the banner and on the classic header (`illustration: false`), full and mini card: right after the
// title on its line (8 px gap), or on its own line under it when the row runs short; its whole label from 245 to
// 500 px, never more than about half of the title block; only its dot at 200 px or less.
// Rendered in Chromium when Playwright and its browser are installed (or CHROMIUM_PATH); skipped otherwise.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { devices, entities, services, states } from "../scripts/mock-states.mjs";

const source = readFileSync(new URL("../src/device-card.js", import.meta.url), "utf8");
let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {}
const browser = await chromium?.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}).catch(() => null);
test.after(() => browser?.close());

const HA_CARD = `customElements.define("ha-card", class extends HTMLElement { constructor() { super();
  this.attachShadow({ mode: "open" }).innerHTML = "<style>:host{display:block;border:1px solid #ddd;overflow:hidden}</style><slot></slot>"; } });`;

test("the state pill sits right after the title, with its whole label", { skip: !browser && "no Chromium" }, async () => {
  const page = await browser.newPage({ viewport: { width: 1000, height: 800 } });
  try {
    await page.setContent('<!doctype html><body style="margin:0;font-family:Arial,sans-serif"></body>');
    await page.addScriptTag({ content: HA_CARD });
    await page.addScriptTag({ content: source });
    const bad = await page.evaluate(
      async ({ states, entities, devices, services }) => {
        const hass = { states, entities, devices, services, language: "en", locale: { language: "en" }, themes: {}, callService() {} };
        const out = [];
        for (const [type, config] of [["device-card", {}], ["device-card", { devices: ["phone"] }], ["device-mini-card", {}]])
          for (const illustration of [true, false])
            for (const width of [180, 245, 300, 400, 500]) {
              document.body.innerHTML = "";
              const outer = document.body.appendChild(document.createElement("div"));
              outer.style.width = `${width}px`;
              const card = outer.appendChild(document.createElement(type));
              card.setConfig({ type: `custom:${type}`, ...config, illustration });
              card.hass = hass;
              await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
              const sr = card.shadowRoot;
              const where = `${type} ${JSON.stringify(config)} ${illustration ? "banner" : "classic"} ${width}px`;
              const pill = sr.querySelector(".titles .chip");
              const name = sr.querySelector(".titles .name");
              if (!pill || !name) {
                out.push(`${where}: no pill in the titles`);
                continue;
              }
              const p = pill.getBoundingClientRect();
              const n = name.getBoundingClientRect();
              const t = pill.querySelector(".chip-text");
              const sameLine = Math.abs(p.top + p.height / 2 - (n.top + n.height / 2)) < 3;
              if (sameLine && Math.abs(p.left - n.right - 8) > 1) out.push(`${where}: pill ${Math.round(p.left - n.right)} px after the title`);
              if (!sameLine && p.top < n.bottom - 0.5) out.push(`${where}: pill neither after the title nor under it`);
              if (width <= 200 && t.getBoundingClientRect().width > 0) out.push(`${where}: label shown`);
              if (width >= 245 && (!t.getBoundingClientRect().width || t.scrollWidth > t.clientWidth + 0.5)) out.push(`${where}: label cut`);
              const block = sr.querySelector(".titles").getBoundingClientRect().width;
              if (sameLine && p.width > block * 0.51 + 1) out.push(`${where}: pill wider than half the title block`);
              if (n.width < 20) out.push(`${where}: title crushed (${Math.round(n.width)} px)`);
            }
        return out;
      },
      { states, entities, devices, services },
    );
    assert.deepEqual(bad, []);
  } finally {
    await page.close();
  }
});
