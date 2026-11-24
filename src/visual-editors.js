// ---------------------------------------------------------------------------
// Visual editors (ha-form)
// ---------------------------------------------------------------------------
import { DEFAULTS, DETAILS, SORTS, THEMES, TOGGLES } from "./sensors-companion-app.js";
import { lang, t } from "./helpers.js";
import { deviceRefs } from "./devices-companion-app.js";
import { sameDeps } from "./styles.js";

export const LANGUAGES = [
  ["en", "English"],
  ["fr", "Français"],
  ["de", "Deutsch"],
  ["es", "Español"],
  ["it", "Italiano"],
  ["nl", "Nederlands"],
  ["pt", "Português (Portugal)"],
  ["pl", "Polski"],
  ["sr", "Српски"],
  ["sr-Latn", "Srpski (latinica)"],
  ["ro", "Română"],
  ["da", "Dansk"],
  ["sv", "Svenska"],
  ["bg", "Български"],
  ["ru", "Русский"],
  ["uk", "Українська"],
  ["hu", "Magyar"],
  ["sk", "Slovenčina"],
  ["cs", "Čeština"],
  ["sl", "Slovenščina"],
  ["lv", "Latviešu"],
  ["el", "Ελληνικά"],
];

// Keeps the YAML minimal: drops empty values, empty lists and options left at their default.
export const cleanConfig = (value, defaults) => {
  const config = { ...value };
  for (const [k, v] of Object.entries(config)) {
    const empty = v === "" || v === undefined || v === null || (Array.isArray(v) && !v.length);
    if (empty || (k in defaults && JSON.stringify(v) === JSON.stringify(defaults[k]))) delete config[k];
  }
  return config;
};

export class DeviceCardEditor extends HTMLElement {
  // [name, default]
  static get toggles() {
    return [["illustration", true], ["show_title", true], ["show_subtitle", true], ...TOGGLES.map((n) => [n, true])];
  }

  setConfig(config) {
    this._config = { ...config };
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  _schema() {
    const tr = (k) => t(this._hass, this._config, k);
    const select = (name, values, prefix) => ({ name, selector: { select: { mode: "dropdown", options: values.map((value) => ({ value, label: tr(`${prefix}_${value}`) })) } } });
    const devicePicker = { device: { multiple: true, filter: [{ integration: "mobile_app" }] } };
    // A list holding per-device options (name, kind, entities, notify) is YAML only: the picker would drop them.
    const yamlDevices = (Array.isArray(this._config.devices) ? this._config.devices : []).some((d) => d && typeof d === "object");
    return [
      ...(yamlDevices ? [] : [{ name: "devices", selector: devicePicker }]),
      ...(deviceRefs(this._config).length ? [] : [{ name: "exclude", selector: devicePicker }]),
      { name: "title", selector: { text: {} } },
      { type: "grid", name: "", schema: this.constructor.toggles.map(([name]) => ({ name, selector: { boolean: {} } })) },
      {
        name: "illustration_theme",
        selector: { select: { mode: "dropdown", options: THEMES.map((value) => ({ value, label: tr({ auto: "theme_auto", day: "theme_day", night: "theme_night" }[value]) })) } },
      },
      select("sort", SORTS, "sort"),
      select("details", DETAILS, "details"),
      { name: "low_battery", selector: { number: { min: 1, max: 99, mode: "box", unit_of_measurement: "%" } } },
      { name: "stale_after", selector: { number: { min: 1, max: 720, mode: "box", unit_of_measurement: tr("unit_hours") } } },
      { name: "ring_message", selector: { text: {} } },
      {
        name: "language",
        selector: { select: { mode: "dropdown", options: [{ value: "", label: tr("lang_auto") }, ...LANGUAGES.map(([value, label]) => ({ value, label }))] } },
      },
    ];
  }

  _label(name) {
    const k = { low_battery: "low_battery_level" }[name] || name;
    return t(this._hass, this._config, k);
  }

  _render() {
    if (!this._hass || !this._config) return;
    const toggles = this.constructor.toggles;
    const defaults = { ...Object.fromEntries(toggles), ...DEFAULTS };
    if (!this._form) {
      this._form = document.createElement("ha-form");
      this._form.computeLabel = (s) => this._label(s.name);
      this._form.computeHelper = (s) => (s.name === "zoom" ? t(this._hass, this._config, "zoom_helper") : undefined);
      this._form.addEventListener("value-changed", (ev) => {
        ev.stopPropagation();
        this._config = cleanConfig(ev.detail.value, defaults);
        this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config }, bubbles: true, composed: true }));
      });
      this.appendChild(this._form);
    }
    const data = { ...defaults, ...this._config };
    this._form.hass = this._hass;
    const h = this._hass;
    if (!sameDeps(this._dataDeps, [this._config])) {
      this._dataDeps = [this._config];
      this._form.data = data;
    }
    const deps = [lang(h, this._config), this._config.devices];
    if (!sameDeps(this._schemaDeps, deps)) {
      this._schemaDeps = deps;
      this._form.schema = this._schema();
    }
  }
}

// The options of the full card, which its detailed view shows, plus the names under the rings and the zoom button.
export class DeviceMiniCardEditor extends DeviceCardEditor {
  static get toggles() {
    return [...DeviceCardEditor.toggles, ["show_names", true], ["zoom", true]];
  }
}
