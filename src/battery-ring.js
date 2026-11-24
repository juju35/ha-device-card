// ---------------------------------------------------------------------------
// Battery ring
// ---------------------------------------------------------------------------
import { ICONS } from "./icons.js";

// The device's icon in a ring that the battery level fills, in the color of its state. While charging a light runs
// round the ring and a bolt badge sits at the bottom right; a low battery pulses in red. Still with reduced motion.
export const ringSvg = (kind, pct, { cls = "ok", charging = false, low = false } = {}) => {
  const r = 20;
  const c = 2 * Math.PI * r;
  const p = pct === null || pct === undefined ? 0 : Math.max(0, Math.min(100, pct));
  const dash = `${((p / 100) * c).toFixed(2)} ${c.toFixed(2)}`;
  const icon = ICONS[kind] || ICONS.other;
  return `<svg class="ring ${cls}${charging ? " charging" : ""}${low ? " low" : ""}" viewBox="0 0 48 48" aria-hidden="true">
    ${low ? `<circle class="halo" cx="24" cy="24" r="${r}"/>` : ""}
    <circle class="track" cx="24" cy="24" r="${r}"/>
    ${pct === null || pct === undefined ? "" : `<circle class="arc" cx="24" cy="24" r="${r}" stroke-dasharray="${dash}" transform="rotate(-90 24 24)"/>`}
    ${charging ? `<circle class="sweep" cx="24" cy="24" r="${r}" stroke-dasharray="6 ${(c - 6).toFixed(2)}" transform="rotate(-90 24 24)"/>` : ""}
    <path class="glyph" transform="translate(14 14) scale(.8333)" d="${icon}"/>
    ${charging ? `<g class="bolt"><circle cx="38" cy="38" r="7.5"/><path transform="translate(32.6 32.6) scale(.45)" d="${ICONS.bolt}"/></g>` : ""}
  </svg>`;
};

export const RING_STYLE = `
  .ring { width: 100%; height: 100%; overflow: visible; --rc: var(--c, var(--dc-ok)); }
  .ring .track { fill: none; stroke: color-mix(in srgb, var(--rc) 16%, transparent); stroke-width: 4; }
  .ring .arc { fill: none; stroke: var(--rc); stroke-width: 4; stroke-linecap: round; transition: stroke-dasharray .6s ease; }
  .ring .sweep { fill: none; stroke: #fff; stroke-opacity: .85; stroke-width: 4; stroke-linecap: round; }
  .ring .glyph { fill: color-mix(in srgb, var(--rc) 55%, var(--primary-text-color)); fill-rule: evenodd; }
  .ring.idle .glyph { fill: var(--secondary-text-color); }
  .ring .halo { fill: none; stroke: var(--rc); stroke-width: 4; transform-box: fill-box; transform-origin: center; opacity: 0; }
  .ring .bolt circle { fill: var(--dc-active); stroke: var(--card-background-color, #fff); stroke-width: 2; }
  .ring .bolt path { fill: #fff; }
  @keyframes dc-sweep { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -125.66; } }
  @keyframes dc-bolt { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.18); } }
  @keyframes dc-halo { 0% { transform: scale(1); opacity: .7; } 100% { transform: scale(1.35); opacity: 0; } }
  @keyframes dc-blink { 0%, 100% { opacity: 1; } 50% { opacity: .35; } }
  .ring.charging .sweep { animation: dc-sweep 2s linear infinite; }
  .ring.charging .bolt { transform-box: fill-box; transform-origin: center; animation: dc-bolt 1s ease-in-out infinite; }
  .ring.low .halo { animation: dc-halo 1.5s ease-out infinite; }
  .ring.low .arc { animation: dc-blink 1.5s ease-in-out infinite; }
`;
