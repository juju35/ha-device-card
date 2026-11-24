// ---------------------------------------------------------------------------
// Reading a device
// ---------------------------------------------------------------------------
import { num, valid } from "./helpers.js";

// The battery state of the app ("Charging", "Not Charging", "Full" on iOS; charging, discharging, full, not_charging
// on Android) as one of charging, full, not_charging, discharging, unknown.
export const batteryState = (raw) => {
  const s = String(raw ?? "")
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_");
  if (s === "charging") return "charging";
  if (s === "full" || s === "fully_charged" || s === "charged") return "full";
  if (s === "not_charging") return "not_charging";
  if (s === "discharging" || s === "unplugged" || s === "on_battery") return "discharging";
  return "unknown";
};

// iOS "Wi-Fi" / "Cellular" / "No Connection", Android wifi / cellular / ethernet / unavailable.
export const connectionType = (raw) => {
  const s = String(raw ?? "").toLowerCase();
  if (!s || s === "unknown") return null;
  if (/wi-?fi|wlan/.test(s)) return "wifi";
  if (/cell|mobile|lte|5g|4g|3g/.test(s)) return "cellular";
  if (/ethernet|wired/.test(s)) return "ethernet";
  if (/no.?connection|none|unavailable|disconnected|offline/.test(s)) return "none";
  return null;
};

// iOS Stationary / Walking / Running / Automotive / Cycling / Unknown, Android still / walking / running / on_foot /
// in_vehicle / on_bicycle / tilting / unknown.
export const activityKey = (raw) => {
  const s = String(raw ?? "").toLowerCase();
  if (/stationary|still|tilting/.test(s)) return "stationary";
  if (/walk|on_foot/.test(s)) return "walking";
  if (/run/.test(s)) return "running";
  if (/automotive|vehicle|driving/.test(s)) return "automotive";
  if (/cycl|bicycle/.test(s)) return "cycling";
  return "unknown";
};

export const NO_WIFI = /^(not connected|<not connected>|no wi-?fi|none|disconnected)$/i;

export const lastSeenOf = (hass, dev) => {
  let best = null;
  for (const [key, id] of Object.entries(dev.entities)) {
    if (key === "notify") continue;
    const s = hass.states[id];
    if (!s) continue;
    const ms = Date.parse(s.last_reported || s.last_updated || s.last_changed);
    if (Number.isFinite(ms) && (best === null || ms > best)) best = ms;
  }
  return best;
};

// Everything the cards show about a device, read once per render.
export const readDevice = (hass, dev, opts) => {
  const e = dev.entities;
  const s = (k) => (e[k] ? hass.states[e[k]] : undefined);
  const tracker = s("tracker");
  // Battery: the level sensor, else the level the app reports with the location.
  let level = num(s("battery"));
  let levelId = e.battery;
  if (level === null && Number.isFinite(Number(tracker?.attributes?.battery_level)) && tracker.attributes.battery_level !== null) {
    level = Number(tracker.attributes.battery_level);
    levelId = e.tracker;
  }
  const bs = s("battery_state");
  let state = valid(bs) ? batteryState(bs.state) : "unknown";
  if (state === "unknown" && valid(s("is_charging"))) state = s("is_charging").state === "on" ? "charging" : "discharging";
  const charger = valid(s("charger_type")) && !/^none$/i.test(s("charger_type").state) ? String(s("charger_type").state).toLowerCase() : null;
  if (state === "unknown" && charger) state = level !== null && level >= 100 ? "full" : "charging";
  const lowPower = bs?.attributes?.["Low Power Mode"] === true || s("power_save")?.state === "on";
  const charging = state === "charging";
  const low = level !== null && !charging && state !== "full" && level <= opts.low;
  const cls = level === null ? "idle" : low ? "crit" : charging ? "active" : "ok";
  const lastSeen = lastSeenOf(hass, dev);
  const stale = lastSeen !== null && opts.now - lastSeen > opts.stale * 3600e3;
  return {
    dev,
    battery: { v: level, id: levelId || e.battery_state, state, stateId: e.battery_state || e.is_charging, charger, chargerId: e.charger_type, lowPower, charging, low, cls },
    lastSeen,
    stale,
    s,
  };
};
