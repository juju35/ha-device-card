// ---------------------------------------------------------------------------
// Devices of the Companion app, from the registries
// ---------------------------------------------------------------------------
import { BY_LENGTH, EXACT, KINDS } from "./sensors-companion-app.js";
import { slugify } from "./helpers.js";

// The card key of an entity of a device: from the end of its entity id after the device's name ("iphone_x_battery_level"
// → battery_level), else the end of its friendly name, else the longest sensor id its entity id ends with (renamed).
export const keyOf = (entityId, friendly, names) => {
  const [domain, objectId] = entityId.split(".");
  if (domain === "device_tracker") return "tracker";
  if (domain === "notify") return "notify";
  const rests = [];
  for (const n of names) {
    const slug = slugify(n);
    if (!slug) continue;
    if (objectId.startsWith(`${slug}_`)) rests.push(objectId.slice(slug.length + 1));
    const f = slugify(friendly);
    if (f.startsWith(`${slug}_`)) rests.push(f.slice(slug.length + 1));
  }
  for (const r of rests) {
    const k = EXACT.get(`${domain}:${r}`);
    if (k !== undefined) return k;
  }
  const hit = BY_LENGTH.find((e) => e.domain === domain && (objectId === e.id || objectId.endsWith(`_${e.id}`)));
  return hit ? hit.key : undefined;
};

// What a device is, from its model, brand and name (and whether it has a battery): its icon and the words the card uses.
export const kindOf = (dev, hasBattery) => {
  const m = `${dev.model || ""} ${dev.manufacturer || ""} ${dev.name || ""}`.toLowerCase();
  if (/ipad|tablet|\btab\b|galaxy tab|\bsm-[tx]\d|lenovo tb|kindle|fire hd|\bpad\b/.test(m)) return "tablet";
  if (/macbook|laptop|notebook|chromebook|thinkpad/.test(m)) return "laptop";
  if (/^mac\d/.test(String(dev.model || "").toLowerCase())) return hasBattery ? "laptop" : "desktop";
  if (/imac|mac ?mini|mac ?pro|mac ?studio|desktop|\bpc\b|windows|linux/.test(m)) return "desktop";
  if (/watch|\bwear\b/.test(m)) return "watch";
  if (/automotive|aivi|\bcar\b|vehicle|polestar|renault|volvo|harman|head unit/.test(m)) return "car";
  if (/iphone|phone|pixel|galaxy|\bsm-|redmi|xiaomi|oneplus|seeker|motorola|nokia|fairphone|android/.test(m) || hasBattery) return "phone";
  return "other";
};

// ios, macos, android or other (a third-party Companion app on Windows or Linux): the notification payload and the
// system name depend on it.
export const OTHER_SYSTEM = /windows|microsoft|linux|ubuntu|debian|fedora|gnome|\bkde\b/i;
export const platformOf = (dev, kind) => {
  if (!/apple/i.test(dev.manufacturer || "") && !/^(iphone|ipad|mac|imac)/i.test(dev.model || "")) {
    const text = `${dev.manufacturer || ""} ${dev.model || ""} ${dev.sw || ""}`;
    return OTHER_SYSTEM.test(text) && !/android/i.test(text) ? "other" : "android";
  }
  return kind === "laptop" || kind === "desktop" ? "macos" : "ios";
};

// Apple model identifiers read as their product: "iPhone17,1" → "iPhone", "MacBookPro18,1" → "MacBook Pro".
export const APPLE_MODELS = [
  [/^iphone/i, "iPhone"],
  [/^ipad/i, "iPad"],
  [/^macbookpro/i, "MacBook Pro"],
  [/^macbookair/i, "MacBook Air"],
  [/^macbook/i, "MacBook"],
  [/^imac/i, "iMac"],
  [/^macmini/i, "Mac mini"],
  [/^macpro/i, "Mac Pro"],
  [/^mac\d/i, "Mac"],
];
export const modelName = (dev) => {
  const model = String(dev.model || "");
  for (const [re, name] of APPLE_MODELS) if (re.test(model) && /\d+,\d+$/.test(model)) return name;
  const brand = dev.manufacturer && !model.toLowerCase().startsWith(String(dev.manufacturer).toLowerCase()) ? `${dev.manufacturer} ` : "";
  return `${brand}${model}`.trim();
};

export const _cache = new WeakMap();

/**
 * Devices of the Companion app, from hass.entities / hass.devices, in the order of their names:
 * [{ id, name, manufacturer, model, sw, kind, platform, entities: { key: entity_id } }].
 */
export const resolveDevices = (hass) => {
  if (!hass?.entities || !hass.devices) return null;
  const cached = _cache.get(hass.entities);
  if (cached && cached.devices === hass.devices) return cached.list;
  const byDevice = new Map();
  for (const e of Object.values(hass.entities)) {
    if (e.platform !== "mobile_app" || !e.device_id) continue;
    const d = hass.devices[e.device_id];
    if (!d) continue;
    const item = byDevice.get(e.device_id) || {};
    const friendly = hass.states?.[e.entity_id]?.attributes?.friendly_name || "";
    const key = keyOf(e.entity_id, friendly, [d.name, d.name_by_user]);
    if (key) item[key] ??= e.entity_id;
    byDevice.set(e.device_id, item);
  }
  const list = [];
  for (const [id, entities] of byDevice) {
    const d = hass.devices[id];
    const kind = kindOf(d, !!entities.battery);
    list.push({
      id,
      name: d.name_by_user || d.name || id,
      // The name the app registered with, which its entity ids and notify service are made of.
      appName: d.name || d.name_by_user || id,
      manufacturer: d.manufacturer || "",
      model: d.model || "",
      sw: d.sw_version || "",
      kind,
      platform: platformOf(d, kind),
      entities,
    });
  }
  list.sort((a, b) => a.name.localeCompare(b.name));
  _cache.set(hass.entities, { devices: hass.devices, list });
  return list;
};

// The `devices` option as a list of { device, ...options }: a string is a device id or name.
export const deviceRefs = (config) =>
  (Array.isArray(config?.devices) ? config.devices : config?.devices ? [config.devices] : [])
    .map((d) => (typeof d === "string" ? { device: d } : d && typeof d === "object" ? d : null))
    .filter((d) => d?.device);

// The devices to show, with the options of each one applied: { list } or { error }.
export const findDevices = (hass, config) => {
  const all = resolveDevices(hass);
  if (!all) return { error: "no_registry" };
  const match = (ref) => all.find((d) => d.id === ref || d.name === ref || d.appName === ref);
  const refs = deviceRefs(config);
  let list;
  if (refs.length) {
    list = [];
    for (const r of refs) {
      const d = match(r.device);
      if (!d) return { error: "unknown_device", ref: r.device };
      const own = Object.fromEntries(Object.entries(r.entities || {}).filter(([, v]) => typeof v === "string" && v));
      list.push({
        ...d,
        name: r.name || d.name,
        kind: KINDS.includes(r.kind) ? r.kind : d.kind,
        notify: r.notify,
        entities: { ...d.entities, ...own },
      });
    }
  } else {
    const out = new Set((Array.isArray(config?.exclude) ? config.exclude : config?.exclude ? [config.exclude] : []).map(String));
    list = all.filter((d) => !out.has(d.id) && !out.has(d.name));
  }
  if (!list.length) return { error: "no_device" };
  return { list };
};

// The legacy notify service of a device ("mobile_app_iphone_x"), the one that takes the app's payload (sounds,
// channels): the `notify` option, else the service named after the device, else none.
export const notifyService = (hass, dev) => {
  if (dev.notify) return String(dev.notify).replace(/^notify\./, "");
  const services = hass?.services?.notify;
  if (!services) return null;
  for (const n of [dev.appName, dev.name]) {
    const s = `mobile_app_${slugify(n)}`;
    if (services[s]) return s;
  }
  return null;
};

// The data of a "ring" notification: iOS and macOS play a critical alert (heard in silent mode and through a
// Focus, once critical alerts are allowed for the app); Android sends it on the alarm stream, at high priority.
// Any other app gets a plain notification (no payload of another system).
export const ringPayload = (platform, title, message) => {
  if (platform === "other") return { title, message };
  return platform === "android"
    ? { title, message, data: { ttl: 0, priority: "high", importance: "high", channel: "alarm_stream", vibrationPattern: "100, 1000, 100, 1000, 100", tag: "device-card-ring" } }
    : { title, message, data: { push: { sound: { name: "default", critical: 1, volume: 1 }, "interruption-level": "critical" } } };
};
