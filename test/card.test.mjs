import assert from "node:assert/strict";
import { test } from "node:test";
import { devices, entities, lowBattery, NOW, services, states } from "../scripts/mock-states.mjs";
import { load } from "./load.mjs";

const dc = load();
const plain = (v) => JSON.parse(JSON.stringify(v));

// Mock states shifted so that NOW is now: the cards read Date.now().
const shift = Date.now() - NOW;
const move = (s) => ({
  ...s,
  last_changed: new Date(Date.parse(s.last_changed) + shift).toISOString(),
  last_updated: new Date(Date.parse(s.last_updated) + shift).toISOString(),
  last_reported: new Date(Date.parse(s.last_reported ?? s.last_updated) + shift).toISOString(),
});
const moved = (o = {}) =>
  Object.fromEntries(Object.entries({ ...states, ...Object.fromEntries(Object.entries(o).map(([id, v]) => [id, { ...states[id], ...v }])) }).map(([id, s]) => [id, move(s)]));

const makeHass = (st = moved(), extra = {}) => {
  const calls = [];
  return {
    calls,
    entities,
    devices,
    services,
    states: st,
    language: "en",
    callService: async (domain, service, data) => {
      calls.push({ domain, service, data });
    },
    ...extra,
  };
};

const newCard = (config = {}, hass = makeHass(), Card = dc.DeviceCard) => {
  const card = new Card();
  card.setConfig({ type: "custom:device-card", ...config });
  card.hass = hass;
  return card;
};
const html = (card) => card.shadowRoot.innerHTML;
const click = (card, dataset, extra = []) => {
  const el = { dataset };
  return card._onClick({ composedPath: () => [el, ...extra], stopPropagation() {} });
};
const flush = () => new Promise((r) => setTimeout(r, 0));

test("the Companion app devices are found through the registries, other devices are skipped", () => {
  const list = dc.resolveDevices(makeHass());
  assert.deepEqual(plain(list.map((d) => [d.name, d.kind, d.platform])), [
    ["Car", "car", "android"],
    ["Laptop", "laptop", "macos"],
    ["Phone", "phone", "ios"],
    ["Tablet", "tablet", "ios"],
    ["Work phone", "phone", "android"],
  ]);
  const by = Object.fromEntries(list.map((d) => [d.id, d.entities]));
  assert.equal(by.phone.battery, "sensor.phone_battery_level");
  assert.equal(by.phone.ssid, "sensor.phone_ssid", "the BSSID is not the SSID");
  assert.equal(by.phone.carrier, "sensor.phone_sim_1");
  assert.equal(by.phone.focus, "binary_sensor.phone_focus");
  assert.equal(by.phone.focus_name, "sensor.phone_focus_name");
  assert.equal(by.phone.notify, "notify.phone");
  assert.equal(by.work.tracker, "device_tracker.work_phone_2");
  assert.equal(by.work.storage, "sensor.work_phone_internal_storage", "external storage is not the storage");
  assert.equal(by.work.active, "binary_sensor.work_phone_interactive", "music active is not the screen");
  assert.equal(by.work.ssid, "sensor.work_phone_wi_fi_connection");
  assert.equal(by.work.connection, "sensor.work_phone_network_type");
  assert.equal(by.work.app_version, "sensor.work_phone_current_version");
  assert.equal(by.laptop.battery, "sensor.laptop_internal_battery_level");
  assert.equal(by.laptop.battery_state, "sensor.laptop_internal_battery_state");
  assert.equal(by.laptop.mic, "binary_sensor.laptop_audio_input_in_use");
  assert.equal(by.laptop.display_name, "sensor.laptop_primary_display_name");
  assert.equal(by.car.battery, undefined);
});

test("an entity is matched by the end of its id after the device name, its friendly name, or the end of a renamed id", () => {
  const names = ["iPhone de Léa"];
  assert.equal(dc.keyOf("sensor.iphone_de_lea_battery_level", "", names), "battery");
  assert.equal(dc.keyOf("sensor.iphone_de_lea_storage", "", names), "storage");
  // Renamed entity id, name kept: the friendly name tells.
  assert.equal(dc.keyOf("sensor.my_phone_level", "iPhone de Léa Battery Level", names), "battery");
  // Renamed both: the longest sensor id the entity id ends with.
  assert.equal(dc.keyOf("sensor.x_internal_battery_state", "x", names), "battery_state");
  assert.equal(dc.keyOf("sensor.x_external_storage", "x", names), null);
  assert.equal(dc.keyOf("sensor.iphone_de_lea_steps", "", names), undefined);
  assert.equal(dc.keyOf("device_tracker.iphone_de_lea_3", "", names), "tracker");
  assert.equal(dc.slugify("iPhone de Léa"), "iphone_de_lea");
});

test("devices are read as phones, tablets, laptops, computers, cars and watches from their model", () => {
  const k = (manufacturer, model, name = "", battery = true) => dc.kindOf({ manufacturer, model, name }, battery);
  assert.equal(k("Apple", "iPhone19,4"), "phone");
  assert.equal(k("Apple", "iPad14,1"), "tablet");
  assert.equal(k("Apple", "MacBookAir10,1"), "laptop");
  assert.equal(k("Apple", "Mac14,2", "", true), "laptop");
  assert.equal(k("Apple", "Mac14,13", "", false), "desktop");
  assert.equal(k("Apple", "iMac21,1", "", false), "desktop");
  assert.equal(k("samsung", "SM-X710"), "tablet");
  assert.equal(k("samsung", "SM-S928B"), "phone");
  assert.equal(k("Solana Mobile Inc.", "Seeker"), "phone");
  assert.equal(k("LG Electronics", "AIVI2 FULL", "Renault Espace", false), "car");
  assert.equal(k("Google", "Pixel Watch 3"), "watch");
  assert.equal(k("", "", "Thing", false), "other");
  assert.equal(dc.modelName({ manufacturer: "Apple", model: "MacBookPro18,1" }), "MacBook Pro");
  assert.equal(dc.modelName({ manufacturer: "Google", model: "Pixel 9" }), "Google Pixel 9");
  assert.equal(dc.modelName({ manufacturer: "samsung", model: "samsung SM-S928B" }), "samsung SM-S928B");
});

test("battery states, connection types and activities of both apps are understood", () => {
  const b = { Charging: "charging", "Not Charging": "not_charging", Full: "full", charging: "charging", discharging: "discharging", full: "full", not_charging: "not_charging", Unplugged: "discharging", "": "unknown" };
  for (const [raw, key] of Object.entries(b)) assert.equal(dc.batteryState(raw), key, raw);
  const c = { "Wi-Fi": "wifi", Cellular: "cellular", "No Connection": "none", wifi: "wifi", cellular: "cellular", ethernet: "ethernet", unknown: null };
  for (const [raw, key] of Object.entries(c)) assert.equal(dc.connectionType(raw), key, raw);
  const a = { Stationary: "stationary", Walking: "walking", Automotive: "automotive", Cycling: "cycling", still: "stationary", in_vehicle: "automotive", on_bicycle: "cycling", on_foot: "walking", tilting: "stationary", zzz: "unknown" };
  for (const [raw, key] of Object.entries(a)) assert.equal(dc.activityKey(raw), key, raw);
});

test("sizes of the apps are decimal, shown in base 1024; relative times in the card's language", () => {
  assert.equal(dc.parseSize("52.47 GB"), 52.47e9);
  assert.equal(dc.parseSize("1 TB"), 1e12);
  assert.equal(dc.parseSize("980 MB"), 980e6);
  assert.equal(dc.parseSize("12,5 GB"), 12.5e9);
  assert.equal(dc.parseSize("n/a"), null);
  assert.equal(dc.fmtBytes(98.53e9, "en"), "92 GiB");
  assert.equal(dc.fmtBytes(5 * 1024 ** 3, "en"), "5 GiB");
  assert.equal(dc.fmtBytes(1.5 * 1024 ** 2, "en"), "1.5 MiB");
  const now = Date.now();
  assert.equal(dc.fmtAgo(now - 10e3, now, "en"), "now");
  assert.equal(dc.fmtAgo(now - 5 * 60e3, now, "en"), "5 min. ago");
  assert.equal(dc.fmtAgo(now - 50 * 3600e3, now, "en"), "2 days ago");
  assert.equal(dc.fmtSpan(50 * 3600e3, "en"), "2 days");
});

test("the battery, its state and charger, the last update and the stale warning are read per device", () => {
  const hass = makeHass();
  const opts = { low: 20, stale: 12, now: Date.now() };
  const list = dc.resolveDevices(hass);
  const read = (id) => dc.readDevice(hass, list.find((d) => d.id === id), opts);
  const phone = read("phone");
  assert.deepEqual([phone.battery.v, phone.battery.state, phone.battery.charging, phone.battery.cls], [64, "charging", true, "active"]);
  assert.equal(phone.stale, false);
  assert.ok(Math.abs(Date.now() - phone.lastSeen - 2 * 60e3) < 5000, "latest report of any entity");
  const work = read("work");
  assert.deepEqual([work.battery.v, work.battery.state, work.battery.low, work.battery.cls, work.battery.lowPower], [12, "discharging", true, "crit", true]);
  const tablet = read("tablet");
  assert.equal(tablet.stale, true);
  assert.equal(tablet.battery.state, "full");
  const car = read("car");
  assert.equal(car.battery.v, null);
  assert.equal(car.battery.cls, "idle");
  // The level the app sends with the location, when there is no battery sensor.
  const st = moved();
  delete st["sensor.phone_battery_level"];
  assert.equal(dc.readDevice({ ...hass, states: st }, list.find((d) => d.id === "phone"), opts).battery.v, 64);
});

test("the ring goes through the device's legacy notify service, with a critical sound on Apple and the alarm stream on Android", () => {
  const hass = makeHass();
  const list = dc.resolveDevices(hass);
  assert.equal(dc.notifyService(hass, list.find((d) => d.id === "work")), "mobile_app_work_phone");
  assert.equal(dc.notifyService(hass, { ...list[0], notify: "notify.mobile_app_other" }), "mobile_app_other");
  assert.equal(dc.notifyService({ ...hass, services: { notify: {} } }, list[0]), null);
  assert.equal(dc.ringPayload("ios", "Ring", "m").data.push.sound.critical, 1);
  assert.equal(dc.ringPayload("android", "Ring", "m").data.channel, "alarm_stream");
  assert.equal(dc.ringPayload("android", "Ring", "m").data.priority, "high");
});

test("the devices option picks devices by id or name, with their own options; exclude leaves some out", () => {
  const hass = makeHass();
  const names = (config) => plain(dc.findDevices(hass, config).list.map((d) => d.name));
  assert.deepEqual(names({ devices: ["laptop", "Phone"] }), ["Laptop", "Phone"]);
  assert.deepEqual(names({ exclude: ["car", "Tablet"] }), ["Laptop", "Phone", "Work phone"]);
  const [d] = dc.findDevices(hass, { devices: [{ device: "car", name: "Head unit", kind: "desktop", entities: { battery: "sensor.x" } }] }).list;
  assert.deepEqual([d.name, d.kind, d.entities.battery], ["Head unit", "desktop", "sensor.x"]);
  assert.equal(dc.findDevices(hass, { devices: ["nope"] }).error, "unknown_device");
  assert.equal(dc.findDevices({ ...hass, entities: {} }, {}).error, "no_device");
  assert.equal(dc.findDevices({ states: {} }, {}).error, "no_registry");
  assert.throws(() => new dc.DeviceCard().setConfig({ devices: { a: 1 } }), /devices must be a list/);
});

test("the full card lists the devices, sorted by name or by battery, and unfolds a single device", () => {
  const card = newCard();
  const h = html(card);
  assert.match(h, /Devices/);
  assert.match(h, /5 devices/);
  assert.match(h, /1 low/, "the pill counts the low batteries");
  assert.ok(h.indexOf("Car") < h.indexOf("Work phone"));
  assert.match(h, /aria-expanded="false"/);
  const byBattery = html(newCard({ sort: "battery" }));
  assert.ok(byBattery.indexOf(">Work phone<") < byBattery.indexOf(">Phone<"), "lowest first");
  const one = html(newCard({ devices: ["phone"] }));
  assert.match(one, /aria-expanded="true"/);
  assert.match(one, /Charging/);
  assert.match(one, /Home Wi-Fi/);
  assert.match(one, /92 GiB free/);
  assert.match(one, /of 238 GiB/);
  assert.match(one, /iOS 26\.1/);
  assert.match(one, /Springfield/);
  assert.match(one, /class="ring active charging"/);
});

test("a device's details: Android battery, ringer and screen; macOS activity, displays and microphone; stale warning", () => {
  const work = html(newCard({ devices: ["work"] }));
  assert.match(work, /Low battery: 12 %/);
  assert.match(work, /class="ring crit low"/);
  assert.match(work, /Power saving|Low Power Mode/);
  assert.match(work, /Vibrate/);
  assert.match(work, /Walking/);
  assert.match(work, /Android 16/);
  assert.match(work, /Cellular/);
  assert.match(work, /2026\.10\.3</, "the flavor of the Android app is left out");
  assert.match(work, /Riverside/);
  const laptop = html(newCard({ devices: ["laptop"] }));
  assert.match(laptop, /macOS 26\.1/);
  assert.match(laptop, /Studio Display/);
  assert.match(laptop, /Safari/);
  assert.match(laptop, /Microphone<\/span><\/div><div class="v">In use/);
  const tablet = html(newCard({ devices: ["tablet"] }));
  assert.match(tablet, /Not seen for 2 days/);
  assert.match(tablet, /iPadOS 26\.0/);
  assert.doesNotMatch(html(newCard({ devices: ["tablet"], stale_after: 72 })), /Not seen/);
  assert.doesNotMatch(html(newCard({ devices: ["phone"], show_connection: false, show_storage: false })), /Home Wi-Fi|GiB/);
});

test("ring: a confirmation popup at the top of the card, sent only once confirmed, closed by a click elsewhere or by leaving", async () => {
  const hass = makeHass();
  const card = newCard({ devices: ["phone"], ring_message: "Where are you?" }, hass);
  card.connectedCallback();
  click(card, { action: "ring", device: "phone" });
  assert.match(html(card), /class="popup"/);
  assert.match(html(card), /Ring Phone\?/);
  assert.equal(hass.calls.length, 0);
  click(card, { action: "cancel_ring" });
  assert.doesNotMatch(html(card), /class="popup"/);
  click(card, { action: "ring", device: "phone" });
  card._outside.tap({ composedPath: () => [{ tagName: "DIV" }] });
  assert.doesNotMatch(html(card), /class="popup"/, "a click elsewhere closes it");
  click(card, { action: "ring", device: "phone" });
  card.disconnectedCallback();
  card.connectedCallback();
  assert.doesNotMatch(html(card), /class="popup"/, "leaving the page closes it");
  assert.equal(hass.calls.length, 0, "and nothing was sent");
  click(card, { action: "ring", device: "phone" });
  await click(card, { action: "confirm_ring", device: "phone" });
  await flush();
  assert.equal(hass.calls.length, 1);
  assert.deepEqual(plain(hass.calls[0]), { domain: "notify", service: "mobile_app_phone", data: plain(dc.ringPayload("ios", "Ring", "Where are you?")) });
  assert.match(html(card), /Ring sent/);
  card.disconnectedCallback();
  // No notify service: no ring button.
  assert.doesNotMatch(html(newCard({ devices: ["phone"] }, makeHass(moved(), { services: { notify: {} } }))), /data-action="ring"/);
});

test("devices fold and unfold, a click elsewhere brings the defaults back", () => {
  const card = newCard();
  card.connectedCallback();
  click(card, { action: "toggle", device: "laptop" });
  assert.match(html(card), /Safari/);
  card._outside.tap({ composedPath: () => [{ tagName: "HA-MORE-INFO-DIALOG" }] });
  assert.match(html(card), /Safari/, "a click in a dialog keeps it");
  card._outside.tap({ composedPath: () => [{ tagName: "DIV" }] });
  assert.doesNotMatch(html(card), /Safari/);
  assert.match(html(newCard({ details: "expanded" })), /Safari/);
  assert.doesNotMatch(html(newCard({ devices: ["laptop"], details: "collapsed" })), /Safari/);
  card.disconnectedCallback();
});

test("a click on a value opens its more-info dialog", () => {
  const card = newCard({ devices: ["phone"] });
  click(card, { entity: "sensor.phone_battery_level" });
  assert.equal(card.events.at(-1).type, "hass-more-info");
  assert.equal(card.events.at(-1).detail.entityId, "sensor.phone_battery_level");
});

test("the mini card shows a ring per device, its detail button switches to the full card and a click elsewhere back", () => {
  const card = newCard({}, makeHass(moved(lowBattery)), dc.DeviceMiniCard);
  card.connectedCallback();
  const h = html(card);
  assert.equal((h.match(/class="ring /g) || []).length, 5);
  assert.match(h, />8 %</);
  assert.match(h, /class="zoom"/);
  assert.doesNotMatch(h, /class="list"/);
  click(card, { action: "zoom" });
  assert.match(html(card), /class="list"/);
  card._unzoom.tap({ composedPath: () => [{ tagName: "DIV" }] });
  assert.doesNotMatch(html(card), /class="list"/);
  assert.doesNotMatch(html(newCard({ zoom: false }, makeHass(), dc.DeviceMiniCard)), /class="zoom"/);
  assert.doesNotMatch(html(newCard({ show_names: false }, makeHass(), dc.DeviceMiniCard)), /class="n"/);
  click(card, { action: "zoom" });
  card.disconnectedCallback();
  card.connectedCallback();
  assert.doesNotMatch(html(card), /class="list"/, "back to the compact view after leaving the page");
  card.disconnectedCallback();
});

test("no device, an unknown device and an old Home Assistant give a clear message", () => {
  assert.match(html(newCard({}, { ...makeHass(), entities: {} })), /No device of the Home Assistant Companion app found/);
  assert.match(html(newCard({ devices: ["nope"] })), /Device not found: nope/);
  assert.match(html(newCard({}, { ...makeHass(), entities: undefined })), /2024\.8/);
});

test("every clickable element can be reached and used from the keyboard", () => {
  const card = newCard({ details: "expanded" });
  const tags = html(card).match(/<[a-z-]+\b[^>]*\bdata-(?:entity|action)="[^"]*"[^>]*>/g) || [];
  assert.ok(tags.length > 20);
  for (const tag of tags) {
    if (tag.startsWith("<button")) continue;
    assert.match(tag, /\brole="button"/, tag);
    assert.match(tag, /\btabindex="0"/, tag);
  }
});

test("the ring is filled by the battery level and animated only while charging or low", () => {
  const dash = (svg) => Number(svg.match(/class="arc"[^>]*stroke-dasharray="([\d.]+)/)[1]);
  assert.ok(Math.abs(dash(dc.ringSvg("phone", 50)) - Math.PI * 20) < 0.01);
  assert.doesNotMatch(dc.ringSvg("phone", null), /class="arc"/);
  assert.match(dc.ringSvg("phone", 50, { charging: true }), /class="sweep"/);
  assert.match(dc.ringSvg("phone", 50, { charging: true }), /class="bolt"/);
  assert.match(dc.ringSvg("phone", 5, { low: true }), /class="halo"/);
  assert.doesNotMatch(dc.ringSvg("phone", 50), /sweep|halo|bolt/);
});

test("the editors keep the YAML minimal, pick Companion app devices, and the mini editor offers the full card's options", () => {
  assert.deepEqual(plain(dc.cleanConfig({ type: "custom:device-card", devices: [], sort: "name", show_storage: true, low_battery: 20, title: "" }, { sort: "name", show_storage: true, low_battery: 20 })), {
    type: "custom:device-card",
  });
  const ed = new dc.DeviceCardEditor();
  ed.setConfig({ type: "custom:device-card" });
  ed.hass = makeHass();
  const names = (form) => form.schema.flatMap((s) => (s.type === "grid" ? s.schema.map((g) => g.name) : [s.name]));
  const devicesField = ed._form.schema.find((s) => s.name === "devices");
  assert.equal(devicesField.selector.device.filter[0].integration, "mobile_app");
  assert.ok(devicesField.selector.device.multiple);
  for (const n of ["exclude", "sort", "details", "low_battery", "stale_after", "ring_message", "language", "show_storage", "show_computer"]) assert.ok(names(ed._form).includes(n), n);
  // Per-device options in the list are YAML only: no picker that would drop them.
  const yaml = new dc.DeviceCardEditor();
  yaml.setConfig({ type: "custom:device-card", devices: [{ device: "phone", name: "Mine" }] });
  yaml.hass = makeHass();
  assert.ok(!names(yaml._form).includes("devices"));
  assert.ok(!names(yaml._form).includes("exclude"), "exclude only applies to the discovered devices");
  const mini = new dc.DeviceMiniCardEditor();
  mini.setConfig({ type: "custom:device-mini-card" });
  mini.hass = makeHass();
  for (const n of names(ed._form)) assert.ok(names(mini._form).includes(n), n);
  for (const n of ["zoom", "show_names"]) assert.ok(names(mini._form).includes(n), n);
  assert.ok(!names(ed._form).includes("zoom"));
  assert.equal(ed._form.computeLabel({ name: "low_battery" }), "Low battery level");
});

test("every language has every English text with its placeholders, and the card follows the language option", () => {
  const en = Object.keys(dc.STRINGS.en).sort();
  assert.equal(Object.keys(dc.STRINGS).length, 22);
  for (const [l, table] of Object.entries(dc.STRINGS)) {
    assert.deepEqual([...Object.keys(table).sort()], [...en], l);
    for (const k of en) for (const ph of dc.STRINGS.en[k].match(/\{\w+\}/g) || []) assert.ok(table[k].includes(ph), `${l}.${k} ${ph}`);
  }
  assert.match(html(newCard({ language: "fr", devices: ["phone"] })), /En charge/);
  assert.equal(dc.lang({ language: "pt-BR" }, {}), "pt");
  assert.equal(dc.intlLocale({ language: "pt" }, {}), "pt-PT");
  assert.equal(dc.lang({ language: "sr-Latn" }, {}), "sr-Latn");
});

test("every English text is used by the cards", async () => {
  const { readFileSync } = await import("node:fs");
  const src = readFileSync(new URL("../src/device-card.js", import.meta.url), "utf8");
  const code = src.slice(src.indexOf("// Icons"));
  const dynamic = /^(state_|charger_|ringer_|dnd_|act_|kind_|sort_|details_)/;
  for (const k of Object.keys(dc.STRINGS.en)) {
    if (dynamic.test(k)) continue;
    assert.ok(code.includes(`"${k}"`), k);
  }
});

test("the illustrated header: the devices on a desk, night from the sun or the option, the icon in the state's color", () => {
  const h = html(newCard());
  assert.match(h, /class="banner"/);
  assert.match(h, /class="dv-scene"/);
  assert.match(h, /class="ground"/);
  assert.match(h, /class="badge crit"/, "a low battery turns the icon red");
  // The state in a pill right after the title, in the icon's colour; the subtitle does not repeat it.
  assert.match(h, /<div class="trow"><div class="name">Devices<\/div><span class="chip crit" role="img" title="1 low" aria-label="1 low"><span class="dot"><\/span><span class="chip-text">1 low<\/span><\/span><\/div>/);
  assert.match(h, /<div class="sub">5 devices<\/div>/);
  assert.match(html(newCard({ devices: ["phone"] })), /class="chip active"[^>]*><span class="dot"><\/span><span class="chip-text">Charging</);
  assert.match(h, /class="dv-bolt"/, "the charging phone shows a bolt");
  assert.match(h, /class="dv-cable"/);
  assert.match(html(newCard({ devices: ["phone"] })), /class="badge active"/);
  const night = (cfg, sun, dark) => /class="banner night"/.test(html(newCard(cfg, makeHass({ ...moved(), ...(sun ? { "sun.sun": { state: sun } } : {}) }, { themes: { darkMode: dark } }))));
  assert.equal(night({}, "below_horizon", false), true);
  assert.equal(night({}, "above_horizon", true), true, "dark theme while the sun is up: night");
  assert.equal(night({}, "above_horizon", false), false, "light theme while the sun is up: day");
  assert.equal(night({ illustration_theme: "day" }, "above_horizon", true), false);
  assert.equal(night({}, null, true), true);
  assert.equal(night({ illustration_theme: "night" }, "above_horizon", false), true);
  assert.equal(night({ illustration_theme: "day" }, "below_horizon", true), false);
  const a = html(newCard()).match(/id="(dv-win-\d+)"/)[1];
  const b = html(newCard()).match(/id="(dv-win-\d+)"/)[1];
  assert.notEqual(a, b, "each card has its own svg ids");
  const classic = html(newCard({ illustration: false }));
  assert.doesNotMatch(classic, /class="banner|dv-scene/);
  assert.match(classic, /class="header"/);
  assert.match(classic, /class="badge crit"/);
  // The classic header has the state pill right after the title, like the banner.
  assert.match(classic, /<div class="trow"><div class="name">Devices<\/div><span class="chip crit"[^>]*>.*?1 low<\/span><\/span><\/div>\s*<div class="sub">/s);
  assert.match(html(newCard({}, makeHass(), dc.DeviceMiniCard)), /class="banner"/);
});
