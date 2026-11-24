// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
import { STRINGS } from "./i18n/strings.js";

export const esc = (v) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

export const lang = (hass, config) => {
  const l = config?.language || (hass && (hass.locale?.language || hass.language)) || "en";
  return STRINGS[l] ? l : STRINGS[l.split("-")[0]] ? l.split("-")[0] : "en";
};

// Locale for Intl: the card's language, with Home Assistant's region when it is the same language (pt-BR, de-CH);
// a bare "pt" (European Portuguese for Home Assistant) becomes "pt-PT", otherwise Intl formats it the Brazilian way.
export const intlLocale = (hass, config) => {
  const l = lang(hass, config);
  const src = config?.language || (hass && (hass.locale?.language || hass.language)) || "";
  const out = src && src.split("-")[0] === l.split("-")[0] ? src : l;
  return out === "pt" ? "pt-PT" : out;
};

export const t = (hass, config, key, vars = {}) =>
  String(STRINGS[lang(hass, config)][key] ?? STRINGS.en[key] ?? key).replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");

export const valid = (s) => !!s && !["unknown", "unavailable", ""].includes(String(s.state).trim());

export const num = (s) => {
  if (!valid(s)) return null;
  const v = parseFloat(s.state);
  return Number.isFinite(v) ? v : null;
};

export const clampInt = (v, min, max, def) => {
  const n = Math.round(Number(v));
  return Number.isFinite(n) && v !== "" && v !== null && v !== undefined ? Math.min(max, Math.max(min, n)) : def;
};

// Home Assistant's slugify for entity ids and service names: "iPhone de Léa" → "iphone_de_lea".
export const slugify = (s) =>
  String(s ?? "")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

export const fmtNum = (v, digits, locale) =>
  v === null || v === undefined ? "—" : Number(v).toLocaleString(locale, { minimumFractionDigits: 0, maximumFractionDigits: digits });

export const fmtPct = (v, locale) => (v === null || v === undefined ? "—" : `${fmtNum(Math.round(v), 0, locale)} %`);

// A size given by the app ("52.47 GB", "980 MB", "1.2 TB"; decimal units) → bytes, or null.
export const parseSize = (raw) => {
  const m = String(raw ?? "")
    .replace(",", ".")
    .match(/(-?\d+(?:\.\d+)?)\s*([kmgt]i?)?b/i);
  if (!m) return null;
  const unit = (m[2] || "").toLowerCase();
  const pow = { "": 0, k: 1, m: 2, g: 3, t: 4 }[unit[0] || ""] ?? 0;
  return Number(m[1]) * (unit.endsWith("i") ? 1024 : 1000) ** pow;
};

// Bytes in base 1024: "48.9 GiB", "512 MiB".
export const fmtBytes = (bytes, locale) => {
  if (bytes === null || bytes === undefined || !Number.isFinite(bytes)) return "—";
  const units = ["B", "KiB", "MiB", "GiB", "TiB"];
  let v = Math.max(0, bytes);
  let i = 0;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${fmtNum(v, v < 10 && i ? 1 : 0, locale)} ${units[i]}`;
};

export const UNIT_FMT = {};
export const fmtUnit = (v, unit, locale) =>
  (UNIT_FMT[`${locale}|${unit}`] ??= new Intl.NumberFormat(locale, { style: "unit", unit, unitDisplay: "short" })).format(v);

// A length of time in its largest unit: "42 min", "5 hr", "3 days".
export const fmtSpan = (ms, locale) => {
  const min = Math.max(1, Math.round(ms / 60000));
  if (min < 60) return fmtUnit(min, "minute", locale);
  if (min < 48 * 60) return fmtUnit(Math.round(min / 60), "hour", locale);
  return fmtUnit(Math.round(min / 1440), "day", locale);
};

// "now", "5 min ago", "3 hr ago", "2 days ago", in the language of the card.
export const REL_FMT = {};
export const fmtAgo = (ms, now, locale) => {
  const rtf = (REL_FMT[locale] ??= new Intl.RelativeTimeFormat(locale, { numeric: "auto", style: "short" }));
  const s = Math.round((now - ms) / 1000);
  if (s < 60) return rtf.format(0, "second");
  if (s < 3600) return rtf.format(-Math.floor(s / 60), "minute");
  if (s < 86400) return rtf.format(-Math.floor(s / 3600), "hour");
  return rtf.format(-Math.floor(s / 86400), "day");
};

export const svgIcon = (path, cls = "") => `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="${path}"/></svg>`;
