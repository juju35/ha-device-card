// ---------------------------------------------------------------------------
// Illustrated header
// ---------------------------------------------------------------------------
import { ICONS } from "./icons.js";
import { KINDS } from "./sensors-companion-app.js";

// The header's picture: a desk at the right of a 200 × 80 scene, the card's own devices standing on it (laptop,
// computer, tablet, phone, watch, car, by their kind) with their state on their screen: a beating green bolt and a
// cable while charging, a blinking red battery when low, a dark screen when not seen for a while, else a lit
// screen with the battery level. A window at the left shows the sun and a cloud by day, the moon and stars by
// night. The left of the banner is open wall: the card's text sits there. A 10 px desk strip runs under the
// whole banner, edge to edge.

// The Mobile App integration's logo, embedded by the build from images/mobile_app.png (a badge on the header icon).
export const MOBILE_APP_LOGO = "__MOBILE_APP_LOGO__";

// Width of each device on the desk, in scene units (the scene is 80 high, the desk at its bottom).
export const DV_WIDTH = { laptop: 58, desktop: 44, car: 30, tablet: 26, other: 24, phone: 12, watch: 12 };
export const DV_AREA = 146;
export const DV_GAP = 7;

// The devices drawn: the low and charging ones first, then the others, as many as fit on the desk (four at
// most), drawn from the largest at the left to the smallest at the right.
export const sceneDevices = (items) => {
  const rank = (it) => (it.battery.low ? 0 : it.battery.charging ? 1 : 2);
  const picked = [];
  let used = -DV_GAP;
  for (const it of [...items].sort((a, b) => rank(a) - rank(b))) {
    const w = DV_WIDTH[it.dev.kind] || DV_WIDTH.other;
    if (picked.length >= 4 || used + DV_GAP + w > DV_AREA) continue;
    picked.push(it);
    used += DV_GAP + w;
  }
  return picked.sort((a, b) => (DV_WIDTH[b.dev.kind] || DV_WIDTH.other) - (DV_WIDTH[a.dev.kind] || DV_WIDTH.other));
};

// What a device's screen shows, inside the screen box (x, y, w, h).
export const dvScreen = (it, x, y, w, h, rx = 1) => {
  const b = it.battery;
  const on = !it.stale;
  let inner = "";
  if (on) {
    const cx = x + w / 2;
    const cy = y + h / 2;
    const s = Math.min(w, h) * 0.55;
    if (b.charging) inner += `<g class="dv-bolt"><path transform="translate(${(cx - s / 2).toFixed(2)} ${(cy - s / 2 - 1).toFixed(2)}) scale(${(s / 24).toFixed(3)})" d="${ICONS.bolt}"/></g>`;
    else if (b.low) {
      const bw = Math.min(w * 0.6, 14);
      const bh = Math.min(h * 0.32, 7);
      const bx = cx - bw / 2;
      const by = cy - bh / 2 - 1;
      inner += `<g class="dv-low"><rect x="${bx.toFixed(2)}" y="${by.toFixed(2)}" width="${bw.toFixed(2)}" height="${bh.toFixed(2)}" rx=".8"/><rect class="tip" x="${(bx + bw).toFixed(2)}" y="${(cy - 2).toFixed(2)}" width="1.2" height="2" rx=".3"/><rect class="lvl" x="${(bx + 1).toFixed(2)}" y="${(by + 1).toFixed(2)}" width="${Math.max(1, (bw - 2) * Math.min(1, (b.v ?? 0) / 100) + 1).toFixed(2)}" height="${(bh - 2).toFixed(2)}" rx=".4"/></g>`;
    } else if (it.dev.kind === "laptop" || it.dev.kind === "desktop") {
      // A few lines of text and a blinking caret.
      const lx = x + 3;
      inner += `<g class="dv-text"><rect x="${lx}" y="${y + 3}" width="${(w * 0.5).toFixed(1)}" height="1.4" rx=".7"/><rect x="${lx}" y="${y + 6.5}" width="${(w * 0.7).toFixed(1)}" height="1.4" rx=".7"/><rect x="${lx}" y="${y + 10}" width="${(w * 0.35).toFixed(1)}" height="1.4" rx=".7"/></g><rect class="dv-caret" x="${(lx + w * 0.35 + 1.5).toFixed(1)}" y="${y + 9.4}" width="1" height="2.6"/>`;
    }
    // The battery level, as a thin bar at the bottom of the screen.
    if (b.v !== null && w >= 8) {
      const bw = w - 4;
      inner += `<rect class="dv-bar" x="${x + 2}" y="${(y + h - 2.6).toFixed(2)}" width="${bw}" height="1.2" rx=".6"/><rect class="dv-bar-v ${b.cls}" x="${x + 2}" y="${(y + h - 2.6).toFixed(2)}" width="${((bw * Math.max(0, Math.min(100, b.v))) / 100).toFixed(2)}" height="1.2" rx=".6"/>`;
    }
  }
  return `<rect class="dv-scr${on ? " on" : ""}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"/>${inner}`;
};

// One device at x (its left edge), standing on the desk (y 80).
export const dvDevice = (it, x) => {
  const k = KINDS.includes(it.dev.kind) ? it.dev.kind : "other";
  let g;
  if (k === "laptop")
    g = `<rect class="dv-body" x="${x + 6}" y="47" width="46" height="30" rx="2"/>${dvScreen(it, x + 8.5, 49.5, 41, 25)}<rect class="dv-base" x="${x}" y="77" width="58" height="3" rx="1"/>`;
  else if (k === "desktop")
    g = `<rect class="dv-body" x="${x}" y="42" width="44" height="28" rx="2"/>${dvScreen(it, x + 2.5, 44.5, 39, 23)}<rect class="dv-base" x="${x + 19.5}" y="70" width="5" height="7.5"/><rect class="dv-base" x="${x + 12}" y="77" width="20" height="3" rx="1"/>`;
  else if (k === "tablet")
    g = `<g transform="rotate(-7 ${x + 13} 80)"><rect class="dv-body" x="${x + 1}" y="48" width="24" height="32" rx="2.5"/>${dvScreen(it, x + 3, 50, 20, 28)}</g>`;
  else if (k === "phone") g = `<rect class="dv-body" x="${x}" y="57" width="12" height="23" rx="2.5"/>${dvScreen(it, x + 1.5, 59, 9, 18.5)}`;
  else if (k === "watch")
    g = `<rect class="dv-band" x="${x + 3.5}" y="60" width="5" height="17"/><rect class="dv-body" x="${x + 1}" y="63" width="10" height="11" rx="3"/>${dvScreen(it, x + 2.3, 64.3, 7.4, 8.4, 2)}<rect class="dv-base" x="${x}" y="77" width="12" height="3" rx="1.5"/>`;
  else if (k === "car")
    g = `<path class="dv-car" d="M${x + 2} 76V70.5Q${x + 2} 68 ${x + 5} 67.6L${x + 8.5} 62.2Q${x + 9.5} 61 ${x + 11} 61H${x + 20}Q${x + 21.6} 61 ${x + 22.6} 62.4L${x + 25.6} 67.4Q${x + 28} 68 ${x + 28} 70.5V76Z"/>${dvScreen(it, x + 10, 62.6, 11, 5, 0.6)}<circle class="dv-wheel" cx="${x + 8}" cy="76.5" r="3.5"/><circle class="dv-wheel" cx="${x + 22}" cy="76.5" r="3.5"/>`;
  else g = `<rect class="dv-body" x="${x}" y="50" width="24" height="27" rx="2"/>${dvScreen(it, x + 2, 52, 20, 23)}<rect class="dv-base" x="${x + 4}" y="77" width="16" height="3" rx="1"/>`;
  // A charging device: its cable runs along the desk to the right edge.
  const cable = it.battery.charging && !it.stale ? `<path class="dv-cable" d="M${x + (DV_WIDTH[k] || 24) - 3} 79.4H200"/>` : "";
  return `${cable}<g class="dv-dev ${k}">${g}</g>`;
};

export const STARS = [
  [19, 15, 0.6],
  [25, 27, 0.5],
  [31, 13, 0.45],
  [40, 30, 0.5],
];

// The whole picture. `uid` keeps each card's clip path apart on a page with several cards.
export const deviceSceneSvg = (uid, items) => {
  const list = sceneDevices(items);
  const total = list.reduce((s, it) => s + (DV_WIDTH[it.dev.kind] || DV_WIDTH.other), 0) + DV_GAP * Math.max(0, list.length - 1);
  let x = 196 - total;
  const devs = list
    .map((it) => {
      const svg = dvDevice(it, x);
      x += (DV_WIDTH[it.dev.kind] || DV_WIDTH.other) + DV_GAP;
      return svg;
    })
    .join("");
  // A short row (one or two small devices) is drawn larger, from the desk's right corner.
  const k = total ? Math.min(1.6, (DV_AREA * 0.75) / total) : 1;
  const group = k > 1 ? `<g transform="translate(196 80) scale(${k.toFixed(3)}) translate(-196 -80)">${devs}</g>` : devs;
  const stars = STARS.map(([sx, sy, r], i) => `<circle class="dv-star${i % 2 ? " tw" : ""}" cx="${sx}" cy="${sy}" r="${r}"/>`).join("");
  return `<svg class="dv-scene" viewBox="0 0 200 80" preserveAspectRatio="xMaxYMax meet" aria-hidden="true" focusable="false">
    <defs><clipPath id="dv-win-${uid}"><rect x="14" y="10" width="30" height="26" rx="1.5"/></clipPath></defs>
    <rect class="dv-pane" x="14" y="10" width="30" height="26" rx="1.5"/>
    <g clip-path="url(#dv-win-${uid})">
      <g class="dv-day"><circle class="dv-sun" cx="36" cy="17" r="4"/><path class="dv-cloud" d="M12 28a3.4 3.4 0 0 1 5-2.8 4.2 4.2 0 0 1 8 1.2 2.6 2.6 0 0 1 .4 5.2H14a2.6 2.6 0 0 1-2-3.6Z"/></g>
      <g class="dv-night">${stars}<path class="dv-moon" d="M35 13.6a4.6 4.6 0 1 0 4 6.9 3.8 3.8 0 1 1-4-6.9Z"/></g>
    </g>
    <path class="dv-frame" d="M14.8 10.8h28.4v24.4H14.8ZM29 10.8v24.4M14.8 23h28.4"/>
    ${group}
  </svg>`;
};

// The illustration's colours and animations, day and night (all still with reduced motion, see BASE_STYLE).
export const SCENE_STYLE = `
  .banner { position: relative; overflow: hidden; height: 90px; --g: 10px; --sw: min(200px, 62%); background: #eef1f6; color: #0d2a45; }
  .banner.night { background: #262c3a; color: #fff; }
  .dv-scene { position: absolute; right: 0; bottom: var(--g); width: var(--sw); height: calc(100% - var(--g)); overflow: visible; }
  .ground { position: absolute; left: 0; right: 0; bottom: 0; height: var(--g); background: #b98a5c; box-shadow: inset 0 2px 0 #d4a878; }
  .night .ground { background: #4a3a2c; box-shadow: inset 0 2px 0 #5c4836; }
  .dv-night, .night .dv-day { display: none; }
  .night .dv-night { display: inline; }
  .dv-pane { fill: #bfe0f7; } .night .dv-pane { fill: #1b2f52; }
  .dv-frame { fill: none; stroke: #fff; stroke-width: 1.6; stroke-linejoin: round; } .night .dv-frame { stroke: #4a5568; }
  .dv-sun { fill: #ffd65a; }
  .dv-cloud { fill: #fff; opacity: .92; animation: dv-drift 7s ease-in-out infinite alternate; }
  .dv-moon { fill: #f4f1dc; }
  .dv-star { fill: #fff; } .dv-star.tw { animation: dv-twinkle 2.6s ease-in-out infinite alternate; }
  .dv-body { fill: #2a3038; } .dv-band { fill: #4a5260; }
  .night .dv-body { fill: #13171e; stroke: #5d6878; stroke-width: .6; } .night .dv-band { fill: #5d6878; } .dv-base { fill: #9aa3ae; } .night .dv-base { fill: #6b7482; }
  .dv-car { fill: #5a8fc9; } .night .dv-car { fill: #4a77a8; } .dv-wheel { fill: #2a3038; } .night .dv-wheel { fill: #13171e; stroke: #5d6878; stroke-width: .6; }
  .dv-scr { fill: #3a4250; } .night .dv-scr { fill: #1d222b; }
  .dv-scr.on { fill: #a9d1ef; } .night .dv-scr.on { fill: #3d5a8a; }
  .laptop .dv-scr.on, .desktop .dv-scr.on { fill: #86b9de; } .night .laptop .dv-scr.on, .night .desktop .dv-scr.on { fill: #35507e; }
  .dv-text rect { fill: #fff; opacity: .7; } .night .dv-text rect { opacity: .45; }
  .dv-caret { fill: #fff; animation: dv-caret 1.1s steps(1) infinite; }
  .dv-bar { fill: rgba(255,255,255,.55); } .night .dv-bar { fill: rgba(255,255,255,.2); }
  .dv-bar-v { fill: var(--c); }
  .dv-bolt path { fill: #2fb556; } .night .dv-bolt path { fill: #5fe08a; }
  .dv-bolt { transform-box: fill-box; transform-origin: center; animation: dv-beat 1s ease-in-out infinite; }
  .dv-low rect { fill: none; stroke: #d93a3a; stroke-width: .8; } .dv-low .tip, .dv-low .lvl { fill: #d93a3a; stroke: none; }
  .night .dv-low rect { stroke: #ff6b6b; } .night .dv-low .tip, .night .dv-low .lvl { fill: #ff6b6b; }
  .dv-low { animation: dv-blink 1.5s ease-in-out infinite; }
  .dv-cable { fill: none; stroke: #5f6b7a; stroke-width: .8; } .night .dv-cable { stroke: #8a95a5; }
  @keyframes dv-drift { from { transform: translateX(0); } to { transform: translateX(7px); } }
  @keyframes dv-twinkle { from { opacity: .3; } to { opacity: 1; } }
  @keyframes dv-caret { 0% { opacity: 1; } 50% { opacity: 0; } }
  @keyframes dv-beat { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.2); } }
  @keyframes dv-blink { 0%, 100% { opacity: 1; } 50% { opacity: .3; } }
  /* The round icon (40 px, in the color of the devices' state, the Mobile App badge at its bottom right), then the
     title and the subtitle, on the wall at the left. */
  .htext { position: absolute; z-index: 1; left: 0; top: 0; bottom: var(--g); right: var(--sw); display: flex; align-items: center; gap: 10px;
           padding: 8px 8px 8px 12px; min-width: 0; }
  .htext .titles { flex: 1 1 auto; min-width: 0; container: dc-titles / inline-size; display: flex; flex-direction: column; align-items: flex-start; }
  .htext .titles > * { max-width: 100%; }
  .banner .chip { background: color-mix(in srgb, var(--c) 18%, rgba(255,255,255,.78)); color: color-mix(in srgb, var(--c) 45%, #0d2a45); }
  .banner.night .chip { background: color-mix(in srgb, var(--c) 30%, rgba(8,18,38,.55)); color: color-mix(in srgb, var(--c) 35%, #ffffff); }
  .banner .name { font-size: 16px; font-weight: 500; }
  .banner .sub { font-size: 13px; color: #3b5b78; }
  .banner.night .sub { color: rgba(255,255,255,.78); }
  .banner .badge { background: rgba(255,255,255,.62); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--c) 22%, transparent); }
  .banner .badge .icon { fill: color-mix(in srgb, var(--c) 82%, #0d2a45); }
  .banner.night .badge { background: rgba(255,255,255,.12); box-shadow: inset 0 0 0 1px rgba(255,255,255,.14); }
  .banner.night .badge .icon { fill: color-mix(in srgb, var(--c) 72%, #fff); }
  .banner .zoom { position: absolute; z-index: 2; top: 5px; right: 5px; margin: 0; width: 24px; height: 24px; box-sizing: border-box; border: none; color: #33506b;
                  background: rgba(255,255,255,.55); box-shadow: inset 0 0 0 1px rgba(255,255,255,.7); -webkit-backdrop-filter: blur(4px); backdrop-filter: blur(4px); }
  .banner .zoom .icon { width: 16px; height: 16px; }
  .banner .zoom:hover { background: rgba(255,255,255,.75); color: #33506b; }
  .banner.night .zoom { color: #fff; background: rgba(255,255,255,.12); box-shadow: inset 0 0 0 1px rgba(255,255,255,.2); }
  .banner.night .zoom:hover { background: rgba(255,255,255,.22); color: #fff; }
  /* Narrow card: no room for the desk beside the text, the wall and the desk strip alone stay. */
  /* Mid-width card: the text takes the window's place (the window goes); up to 360 px the devices are drawn at 70 %
     (140 px wide, 56 px high, their area about 105 px from the right edge), up to 300 px at 60 %, and at 280 px or less
     only the desk strip stays, so that the title block keeps room for a whole status pill in every language. */
  @container dc-card (max-width: 420px) {
    .htext { right: calc(var(--sw) - 46px); }
    .dv-pane, .dv-frame, .dv-scene > g[clip-path] { display: none; }
  }
  @container dc-card (max-width: 360px) { .banner { --sw: 140px; } .htext { right: 108px; } }
  @container dc-card (max-width: 300px) { .banner { --sw: 120px; } .htext { right: 92px; } }
  @container dc-card (max-width: 280px) { .dv-scene { display: none; } .htext { right: 0; padding-right: 34px; } }
`;

// Night picture: forced by illustration_theme, else Home Assistant's dark theme alone (a light theme keeps the day
// picture after sunset).
export const isNight = (hass, config) => {
  if (config.illustration_theme === "night") return true;
  if (config.illustration_theme === "day") return false;
  return !!hass?.themes?.darkMode;
};

// The state of the devices together, the color of the header icon: a low battery (red), a device not seen for a
// while (amber), one charging (blue), else all good (green), grey when no device reports a battery.
export const headerState = (items) => {
  if (items.some((i) => i.battery.low)) return "crit";
  if (items.some((i) => i.stale)) return "warn";
  if (items.some((i) => i.battery.charging)) return "active";
  return items.some((i) => i.battery.v !== null) ? "ok" : "idle";
};

// The width of an element's whole text in fractional pixels, even while it is cut with an ellipsis (0 when hidden).
export const textWidth = (el) => {
  if (!el?.getClientRects?.().length || typeof document.createRange !== "function") return 0;
  const range = document.createRange();
  range.selectNodeContents(el);
  return range.getBoundingClientRect().width;
};
