// ---------------------------------------------------------------------------
// Sensors of the Companion app
// ---------------------------------------------------------------------------

// [card key, domain, sensor ids]: the end of the entity id (and of the name, slugified) the iOS / macOS and the
// Android apps give each sensor. A key of null swallows a sensor whose id ends like another one (external storage
// is not the storage), so that the fallback match on the end of a renamed entity id never takes it.
export const KEYS = [
  ["battery", "sensor", ["battery_level", "internal_battery_level"]],
  ["battery_state", "sensor", ["battery_state", "internal_battery_state"]],
  ["is_charging", "binary_sensor", ["is_charging"]],
  ["charger_type", "sensor", ["charger_type"]],
  ["battery_health", "sensor", ["battery_health"]],
  ["battery_temp", "sensor", ["battery_temperature"]],
  ["charge_time", "sensor", ["remaining_charge_time"]],
  ["power_save", "binary_sensor", ["power_save"]],
  ["geocoded", "sensor", ["geocoded_location"]],
  ["ssid", "sensor", ["ssid", "wi_fi_connection"]],
  ["connection", "sensor", ["connection_type", "network_type"]],
  ["carrier", "sensor", ["sim_1"]],
  ["storage", "sensor", ["storage", "internal_storage"]],
  ["focus", "binary_sensor", ["focus"]],
  ["focus_name", "sensor", ["focus_name"]],
  ["dnd", "sensor", ["do_not_disturb_sensor", "do_not_disturb"]],
  ["ringer", "sensor", ["ringer_mode"]],
  ["activity", "sensor", ["activity", "detected_activity"]],
  ["os_version", "sensor", ["os_version"]],
  ["app_version", "sensor", ["app_version", "current_version"]],
  ["active", "binary_sensor", ["active", "interactive"]],
  ["locked", "binary_sensor", ["device_locked"]],
  ["displays", "sensor", ["displays"]],
  ["display_name", "sensor", ["primary_display_name"]],
  ["frontmost_app", "sensor", ["frontmost_app"]],
  ["camera", "binary_sensor", ["camera_in_use"]],
  ["mic", "binary_sensor", ["audio_input_in_use"]],
  [null, "sensor", ["external_storage", "car_battery", "car_charging_status", "wi_fi_bssid", "bssid", "signal_strength_sim_1", "data_network_type_sim_1", "last_used_app"]],
  [null, "binary_sensor", ["music_active", "app_inactive", "kiosk_screensaver"]],
];
export const EXACT = new Map(KEYS.flatMap(([key, domain, ids]) => ids.map((id) => [`${domain}:${id}`, key])));
export const BY_LENGTH = KEYS.flatMap(([key, domain, ids]) => ids.map((id) => ({ key, domain, id }))).sort((a, b) => b.id.length - a.id.length);

export const KINDS = ["phone", "tablet", "laptop", "desktop", "car", "watch", "other"];
export const SORTS = ["name", "battery", "last_seen", "none"];
export const DETAILS = ["auto", "expanded", "collapsed"];
export const DEFAULTS = { sort: "name", details: "auto", low_battery: 20, stale_after: 12, illustration_theme: "auto" };
export const THEMES = ["auto", "day", "night"];
export const TOGGLES = ["show_location", "show_connection", "show_storage", "show_status", "show_system", "show_computer", "show_actions"];
