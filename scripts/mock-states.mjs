// Mock Home Assistant registries, states and services shaped like the Companion app (mobile_app integration):
// an iPhone, an Android phone, an iPad, a MacBook and an Android Automotive head unit, used to render the
// screenshots and by the tests. The device names are neutral ("Phone", "Laptop"…); the sensor names and ids are the
// ones the apps register. Every time is relative to NOW, which the screenshot script freezes the page clock at.
export const NOW = Date.UTC(2026, 10, 10, 9, 30, 0);
export const states = {};
export const entities = {};
export const devices = {};
export const services = { notify: {} };

const iso = (ms) => new Date(ms).toISOString();
const MIN = 60e3;
const HOUR = 3600e3;

const device = (id, name, manufacturer, model, sw) => {
  devices[id] = { id, name, manufacturer, model, sw_version: sw, name_by_user: null, identifiers: [["mobile_app", id]] };
  services.notify[`mobile_app_${name.toLowerCase().replace(/[^a-z0-9]+/g, "_")}`] = {};
};
const add = (entity_id, device_id, state, attributes = {}, ago = 5 * MIN, platform = "mobile_app") => {
  entities[entity_id] = { entity_id, device_id, platform, translation_key: null };
  const at = iso(NOW - ago);
  states[entity_id] = { entity_id, state: String(state), attributes, last_changed: at, last_updated: at, last_reported: at };
};

// iPhone (iOS)
device("phone", "Phone", "Apple", "iPhone17,1", "26.1");
const ph = (id, state, attributes, domain = "sensor", ago) => add(`${domain}.phone_${id}`, "phone", state, { friendly_name: `Phone ${id.replace(/_/g, " ")}`, ...attributes }, ago);
add("device_tracker.phone", "phone", "home", { friendly_name: "Phone", source_type: "gps", battery_level: 64, latitude: 0, longitude: 0, gps_accuracy: 12 }, 3 * MIN);
ph("battery_level", 64, { unit_of_measurement: "%", device_class: "battery" }, "sensor", 2 * MIN);
ph("battery_state", "Charging", { "Low Power Mode": false }, "sensor", 2 * MIN);
ph("storage", 38.49, { unit_of_measurement: "% available", Available: "98.53 GB", "Available (Important)": "104.2 GB", "Available (Opportunistic)": "97.1 GB", Total: "256 GB" });
ph("ssid", "Home Wi-Fi");
ph("bssid", "aa:bb:cc:dd:ee:ff");
ph("connection_type", "Wi-Fi", { "Cellular Technology": "5G" });
ph("sim_1", "Carrier", { "Carrier Name": "Carrier", "Mobile Country Code": "208" });
ph("focus", "off", {}, "binary_sensor");
ph("focus_name", "");
ph("activity", "Stationary", { Confidence: "High", Types: ["Stationary"] });
ph("app_version", "2026.10.3");
ph("geocoded_location", "12 Example Street\n35000 Springfield\nFrance", { Locality: "Springfield", Country: "France", Name: "12 Example Street" });
add("notify.phone", "phone", "unknown", { friendly_name: "Phone" }, 20 * HOUR);

// Android phone
device("work", "Work phone", "Google", "Pixel 9", "16");
const wp = (id, state, attributes, domain = "sensor") => add(`${domain}.work_phone_${id}`, "work", state, { friendly_name: `Work phone ${id.replace(/_/g, " ")}`, ...attributes }, 9 * MIN);
// The tracker got a suffix when it was registered a second time: matched by its domain all the same.
add("device_tracker.work_phone_2", "work", "not_home", { friendly_name: "Work phone", source_type: "gps", latitude: 0, longitude: 0 }, 9 * MIN);
wp("battery_level", 12, { unit_of_measurement: "%", device_class: "battery" });
wp("battery_state", "discharging", { device_class: "enum", options: ["charging", "discharging", "full", "not_charging"] });
wp("is_charging", "off", {}, "binary_sensor");
wp("charger_type", "none", { device_class: "enum", options: ["ac", "usb", "wireless", "dock", "none"] });
wp("battery_health", "good");
wp("battery_temperature", 31.2, { unit_of_measurement: "°C", device_class: "temperature" });
wp("power_save", "on", {}, "binary_sensor");
wp("network_type", "cellular");
wp("wi_fi_connection", "<not connected>");
wp("sim_1", "Carrier");
wp("ringer_mode", "vibrate");
wp("do_not_disturb_sensor", "off");
wp("detected_activity", "walking");
wp("os_version", "16");
wp("current_version", "2026.10.3-full");
wp("internal_storage", 22, { unit_of_measurement: "%", "Free internal storage": "28.05 GB", "Total internal storage": "128 GB" });
wp("external_storage", 80, { unit_of_measurement: "%" });
wp("interactive", "on", {}, "binary_sensor");
wp("music_active", "off", {}, "binary_sensor");
wp("geocoded_location", "Main Street, Riverside", { locality: "Riverside" });

// iPad, not seen for two days
device("tablet", "Tablet", "Apple", "iPad13,18", "26.0");
const tb = (id, state, attributes) => add(`sensor.tablet_${id}`, "tablet", state, { friendly_name: `Tablet ${id.replace(/_/g, " ")}`, ...attributes }, 50 * HOUR);
add("device_tracker.tablet", "tablet", "home", { friendly_name: "Tablet", source_type: "gps", battery_level: 100 }, 50 * HOUR);
tb("battery_level", 100, { unit_of_measurement: "%", device_class: "battery" });
tb("battery_state", "Full", { "Low Power Mode": false });
tb("app_version", "2026.10.3");

// MacBook (macOS)
device("laptop", "Laptop", "Apple", "MacBookPro18,1", "26.1");
const lt = (id, state, attributes, domain = "sensor") => add(`${domain}.laptop_${id}`, "laptop", state, { friendly_name: `Laptop ${id.replace(/_/g, " ")}`, ...attributes }, MIN);
add("device_tracker.laptop", "laptop", "home", { friendly_name: "Laptop", source_type: "gps", battery_level: 82 }, 14 * MIN);
lt("internal_battery_level", 82, { unit_of_measurement: "%", device_class: "battery" });
lt("internal_battery_state", "Not Charging", { "Low Power Mode": false });
lt("active", "on", { Idle: false, "Screen Off": false, Locked: false }, "binary_sensor");
lt("displays", 2, { "Display IDs": ["1", "2"], "Display Names": ["Built-in Retina Display", "Studio Display"] });
lt("primary_display_name", "Studio Display");
lt("frontmost_app", "Safari");
lt("camera_in_use", "off", {}, "binary_sensor");
lt("audio_input_in_use", "on", {}, "binary_sensor");
lt("ssid", "Home Wi-Fi");
lt("connection_type", "Wi-Fi");
lt("storage", 61.2, { unit_of_measurement: "% available", Available: "612.4 GB", Total: "1 TB" });
lt("app_version", "2026.10.3");

// Android Automotive head unit: no battery, a location and the app version
device("car", "Car", "LG Electronics", "AIVI2 FULL", "14");
add("device_tracker.car", "car", "not_home", { friendly_name: "Car", source_type: "gps" }, 3 * HOUR);
add("sensor.car_current_version", "car", "2026.10.3-automotive", { friendly_name: "Car Current version" }, 3 * HOUR);

// A device of another integration, skipped by the cards.
devices.plug = { id: "plug", name: "Desk plug", manufacturer: "Shelly", model: "Plug S", name_by_user: null };
add("sensor.desk_plug_power", "plug", 42, { unit_of_measurement: "W", device_class: "power" }, MIN, "shelly");

// Overrides of the animated states.
const at = (state, ago = MIN) => ({ state: String(state), last_changed: iso(NOW - ago), last_updated: iso(NOW - ago), last_reported: iso(NOW - ago) });
export const lowBattery = { "sensor.work_phone_battery_level": at(8) };
export const fullBattery = { "sensor.phone_battery_level": at(100), "sensor.phone_battery_state": at("Full") };
