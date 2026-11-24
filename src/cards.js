// ---------------------------------------------------------------------------
// Cards
// ---------------------------------------------------------------------------
import { ICONS } from "./icons.js";
import { DEFAULTS, DETAILS, SORTS } from "./sensors-companion-app.js";
import { clampInt, esc, fmtAgo, fmtBytes, fmtNum, fmtPct, fmtSpan, intlLocale, num, parseSize, svgIcon, t, valid } from "./helpers.js";
import { findDevices, modelName, notifyService, ringPayload } from "./devices-companion-app.js";
import { NO_WIFI, activityKey, connectionType, readDevice } from "./reading-device.js";
import { RING_STYLE, ringSvg } from "./battery-ring.js";
import { MOBILE_APP_LOGO, SCENE_STYLE, deviceSceneSvg, headerState, isNight, textWidth } from "./illustrated-header.js";
import { BASE_STYLE, FULL_STYLE, MINI_STYLE, morph, sameDeps, watchOutside } from "./styles.js";
import { STRINGS } from "./i18n/strings.js";

export let _uid = 0;

export class DeviceBase extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._html = "";
    this._uid = ++_uid;
    this._toggled = new Map();
    this.shadowRoot.addEventListener("click", (ev) => this._onClick(ev));
    // Enter / Space on an element with the button role acts as a click, as on a <button>; Escape closes the popup.
    this.shadowRoot.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape" && this._ring) {
        this._ring = null;
        return this._update();
      }
      if ((ev.key !== "Enter" && ev.key !== " ") || ev.target?.getAttribute?.("role") !== "button") return;
      ev.preventDefault();
      ev.target.click();
    });
  }

  // Home Assistant pushes a new hass on every state change of the whole instance: the card is only drawn again when
  // something it shows changed.
  set hass(hass) {
    this._hass = hass;
    const deps = this._deps();
    if (deps && sameDeps(this._lastDeps, deps)) return;
    this._lastDeps = deps;
    this._update();
  }

  get hass() {
    return this._hass;
  }

  _deps() {
    const h = this._hass;
    if (!h || !this._config) return null;
    const { list } = findDevices(h, this._config);
    if (!list) return null;
    const ids = list.flatMap((d) => Object.values(d.entities));
    return [h.entities, h.devices, h.services, h.language, h.locale, h.themes?.darkMode, this._minute, ...ids.map((id) => h.states[id])];
  }

  connectedCallback() {
    // A click elsewhere on the page folds the devices back to their defaults and closes the popup.
    this._outside ??= watchOutside(this, () => {
      if (!this._toggled.size && !this._ring) return;
      this._toggled = new Map();
      this._ring = null;
      this._update();
    });
    this._outside.on();
    // A new width (or the web font loaded): the status pill is fitted again, in the next frame.
    if (typeof ResizeObserver === "function") {
      this._pillResize ??= new ResizeObserver((entries) => {
        const w = Math.round(entries.at(-1).contentRect.width);
        if (w === this._pillWidth) return;
        this._pillWidth = w;
        cancelAnimationFrame(this._pillFrame);
        this._pillFrame = requestAnimationFrame(() => this._fitPill());
      });
      this._pillResize.observe(this);
    }
    document.fonts?.ready?.then(() => this._fitPill());
    if (this._hass && this._config) this._update();
    // "5 min ago" moves on its own: re-checked every minute while the card is on the page.
    clearInterval(this._tick);
    this._tick = setInterval(() => {
      this._minute = Math.floor(Date.now() / 60000);
      if (this._hass) this.hass = this._hass;
    }, 60000);
  }

  disconnectedCallback() {
    clearInterval(this._tick);
    this._tick = null;
    this._pillResize?.disconnect();
    this._pillWidth = null;
    if (typeof cancelAnimationFrame === "function") cancelAnimationFrame(this._pillFrame);
    clearTimeout(this._sentTimer);
    this._sent = null;
    this._outside?.off();
    // Left (another dashboard view, a conditional card hidden): back to the defaults, the popup closed without ringing.
    this._toggled = new Map();
    this._ring = null;
  }

  setConfig(config) {
    if (!config || typeof config !== "object") throw new Error("Invalid configuration");
    if (config.devices !== undefined && !Array.isArray(config.devices) && typeof config.devices !== "string") {
      throw new Error("devices must be a list of device ids or names");
    }
    this._config = { ...config };
    this.toggleAttribute?.("hide-title", config.show_title === false);
    this.toggleAttribute?.("hide-subtitle", config.show_subtitle === false);
    this._html = "";
    this._lastDeps = null;
    this._update();
  }

  _t(key, vars) {
    return t(this._hass, this._config, key, vars);
  }

  _locale() {
    return intlLocale(this._hass, this._config);
  }

  _opts() {
    const c = this._config;
    return { low: clampInt(c.low_battery, 1, 99, DEFAULTS.low_battery), stale: clampInt(c.stale_after, 1, 720, DEFAULTS.stale_after), now: Date.now() };
  }

  // The devices shown, read and sorted, or { error }.
  _read() {
    const { list, error, ref } = findDevices(this._hass, this._config);
    if (error) return { error, ref };
    const opts = this._opts();
    const items = list.map((d) => readDevice(this._hass, d, opts));
    const sort = SORTS.includes(this._config.sort) ? this._config.sort : DEFAULTS.sort;
    // "none" keeps the order of the `devices` list (or the discovery order, by name).
    if (sort === "name") items.sort((a, b) => a.dev.name.localeCompare(b.dev.name));
    if (sort === "battery") items.sort((a, b) => (a.battery.v ?? 101) - (b.battery.v ?? 101) || a.dev.name.localeCompare(b.dev.name));
    if (sort === "last_seen") items.sort((a, b) => (b.lastSeen ?? 0) - (a.lastSeen ?? 0));
    return { items, opts };
  }

  _update() {
    if (!this._hass || !this._config) return;
    const html = this._render();
    if (html === this._html) return;
    this._html = html;
    const root = this.shadowRoot;
    if (!root.firstChild || typeof document.createElement("template").content === "undefined") {
      root.innerHTML = html;
      this._fitPill();
      return;
    }
    const tpl = document.createElement("template");
    tpl.innerHTML = html;
    morph(root, tpl.content);
    this._fitPill();
  }

  // The status pill goes on the title row, right after the title, only when the whole title and the pill's whole
  // label fit there; otherwise it takes its own line under the subtitle (.pill-below) and the title keeps its row
  // (cut only when it does not fit alone). The subtitle then keeps one line (its whole text in its tooltip), and when
  // the block still runs out of the banner or into its ground strip, or the label does not fit its own line, the pill
  // keeps its dot alone (.pill-dot, the label in its tooltip and aria-label). Measured after each render and on each
  // new width, never by a fixed width, so that every language fits.
  _fitPill() {
    for (const t of this.shadowRoot?.querySelectorAll?.(".titles") || []) {
      const chips = [...t.querySelectorAll(".chip")];
      if (!chips[0]?.getBoundingClientRect) continue;
      t.classList.remove("pill-below", "pill-dot");
      const sub = t.querySelector(".sub");
      sub?.removeAttribute("title");
      if (!chips[0].querySelector(".chip-text")?.getClientRects().length) continue;
      const avail = t.getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(chips[0].parentElement).columnGap) || 0;
      const widths = chips.map((c) => c.getBoundingClientRect().width);
      if (textWidth(t.querySelector(".name")) + widths.reduce((w, c) => w + gap + c, 0) <= avail + 0.01) continue;
      t.classList.add("pill-below");
      if (sub && sub.scrollWidth > sub.clientWidth) sub.title = sub.textContent.trim();
      const banner = t.closest(".banner");
      const box = banner?.getBoundingClientRect();
      const floor = banner?.querySelector(".ground")?.getBoundingClientRect().top ?? box?.bottom;
      const r = t.getBoundingClientRect();
      const out = box && (r.top < box.top - 0.5 || r.bottom > floor + 0.5);
      if (out || widths.some((w) => w > avail + 0.01)) t.classList.add("pill-dot");
    }
  }

  _onClick(ev) {
    const path = ev.composedPath();
    const el = path.find((n) => n.dataset && (n.dataset.entity || n.dataset.action));
    if (!el) return;
    ev.stopPropagation();
    const { action, entity, device } = el.dataset;
    if (action === "zoom") return this._toggleZoom(ev);
    if (action === "toggle") {
      this._toggled = new Map(this._toggled).set(device, !this._isOpen(device));
      return this._update();
    }
    if (action === "ring") {
      this._ring = device;
      return this._update();
    }
    if (action === "cancel_ring") {
      this._ring = null;
      return this._update();
    }
    if (action === "confirm_ring") return this._sendRing(device);
    if (entity) this.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId: entity }, bubbles: true, composed: true }));
  }

  _toggleZoom() {}

  _isOpen(id) {
    if (this._toggled.has(id)) return this._toggled.get(id);
    const d = DETAILS.includes(this._config.details) ? this._config.details : DEFAULTS.details;
    if (d === "auto") return (this._count ?? 0) === 1;
    return d === "expanded";
  }

  async _sendRing(id) {
    this._ring = null;
    const { list } = findDevices(this._hass, this._config);
    const dev = list?.find((d) => d.id === id);
    const service = dev && notifyService(this._hass, dev);
    if (!service) return this._update();
    const message = this._config.ring_message || this._t("ring_default_message");
    this._sent = { id, ok: null };
    this._update();
    try {
      await this._hass.callService("notify", service, ringPayload(dev.platform, this._t("ring"), message));
      this._sent = { id, ok: true };
    } catch (_err) {
      this._sent = { id, ok: false };
    }
    this._update();
    clearTimeout(this._sentTimer);
    this._sentTimer = setTimeout(() => {
      this._sent = null;
      this._update();
    }, 5000);
  }

  // ---- Parts -------------------------------------------------------------

  // The state pill of the header, in the colour of its round icon (headerState): low batteries, devices offline,
  // one device charging, else all good.
  _pill(items) {
    const low = items.filter((i) => i.battery.low).length;
    const stale = items.filter((i) => i.stale).length;
    const cls = headerState(items);
    if (low) return this._chip(cls, this._t("pill_low", { n: low }));
    if (stale) return this._chip(cls, this._t("pill_stale", { n: stale }));
    if (items.length === 1 && items[0].battery.charging) return this._chip(cls, this._t("state_charging"));
    return this._chip(cls, this._t("pill_ok"));
  }

  _chip(cls, text, entity) {
    const click = entity ? ` clickable" role="button" tabindex="0" data-entity="${esc(entity)}"` : `" role="img"`;
    return `<span class="chip ${cls}${click} title="${esc(text)}" aria-label="${esc(text)}"><span class="dot"></span><span class="chip-text">${esc(text)}</span></span>`;
  }

  _system(it) {
    const d = it.dev;
    const os = valid(it.s("os_version")) ? it.s("os_version").state : d.sw;
    if (!os) return "";
    // A bare version number gets its system's name; a version that names its system ("Windows 11", "iPadOS 18") is
    // kept as it is, as is the bare version of another system (Windows, Linux).
    if (!/^\d/.test(String(os).trim())) return os;
    const prefix = { ios: /ipad/i.test(d.model) ? "iPadOS" : "iOS", macos: "macOS", android: "Android" }[d.platform];
    return prefix ? `${prefix} ${os}` : os;
  }

  // The header: the illustration with the title, its state pill and the subtitle on its wall (the state also in the
  // icon's color), or the classic header (illustration: false), its state pill at the same place after the title.
  _header(items) {
    const c = this._config;
    const single = items.length === 1 ? items[0] : null;
    const title = c.title || this._t("title_devices");
    const sub = single
      ? [single.dev.name, modelName(single.dev), this._system(single)].filter(Boolean).join(" · ")
      : this._t("n_devices", { n: items.length });
    const badge = `<span class="badge ${headerState(items)}">${svgIcon(ICONS.devices)}${this._brand()}</span>`;
    if (c.illustration === false) {
      return `
      <div class="header">
        ${badge}
        <div class="titles">
          <div class="trow"><div class="name">${esc(title)}</div>${this._pill(items)}</div>
          ${sub ? `<div class="sub">${esc(sub)}</div>` : ""}
        </div>
        ${this._zoomButton()}
      </div>`;
    }
    // The state in the pill right after the title, the subtitle under them.
    const line = [sub, this._seenText(items, single)].filter(Boolean).join(" · ");
    return `
      <div class="banner${isNight(this._hass, c) ? " night" : ""}">
        ${deviceSceneSvg(this._uid, items)}
        <div class="ground"></div>
        <div class="htext">
          ${badge}
          <div class="titles">
            <div class="trow"><div class="name">${esc(title)}</div>${this._pill(items)}</div>
            ${line ? `<div class="sub">${esc(line)}</div>` : ""}
          </div>
        </div>
        ${this._zoomButton()}
      </div>`;
  }

  // What the subtitle adds to the pill: when one device is offline (and its battery is not low), when it was last seen.
  _seenText(items, single) {
    if (!single || !single.stale || single.battery.low) return "";
    return this._t("seen", { ago: fmtAgo(single.lastSeen, this._opts().now, this._locale()) });
  }

  // The Mobile App logo on the header icon, when the build embedded it.
  _brand() {
    return MOBILE_APP_LOGO.startsWith("data:") ? `<span class="brand" title="Mobile App"><img src="${MOBILE_APP_LOGO}" alt=""></span>` : "";
  }

  // The illustration's styles, only when it is shown.
  _sceneStyle() {
    return this._config.illustration === false ? "" : SCENE_STYLE;
  }

  _zoomButton() {
    return "";
  }

  _ringHtml(it) {
    const b = it.battery;
    return `<div class="rg">${ringSvg(it.dev.kind, b.v, { cls: b.cls, charging: b.charging, low: b.low })}</div>`;
  }

  _popup(items) {
    if (!this._ring) return "";
    const it = items.find((i) => i.dev.id === this._ring);
    if (!it) return "";
    return `<div class="veil" data-action="cancel_ring"></div>
      <div class="popup" role="dialog" aria-modal="true" aria-label="${esc(this._t("ring_title", { name: it.dev.name }))}">
        <div class="p-title">${svgIcon(ICONS.bell)}<span>${esc(this._t("ring_title", { name: it.dev.name }))}</span></div>
        <div class="p-text">${esc(this._t("ring_text"))}</div>
        <div class="p-actions">
          <button class="btn" data-action="cancel_ring">${esc(this._t("cancel"))}</button>
          <button class="btn main danger" data-action="confirm_ring" data-device="${esc(it.dev.id)}">${svgIcon(ICONS.bell)}${esc(this._t("ring"))}</button>
        </div>
      </div>`;
  }

  _errorCard(key, ref) {
    return `<style>${BASE_STYLE}</style><ha-card><div class="warning">${esc(key === "unknown_device" ? `${this._t(key)}: ${ref}` : this._t(key))}</div></ha-card>`;
  }
}

export class DeviceCard extends DeviceBase {
  static getConfigElement() {
    return document.createElement("device-card-editor");
  }

  static getStubConfig() {
    return {};
  }

  getCardSize() {
    return 2 + (this._count || 1) * 1.5;
  }

  getGridOptions() {
    return { columns: 12, min_columns: 6 };
  }

  _render() {
    const { items, error, ref } = this._read();
    if (error) return this._errorCard(error, ref);
    this._count = items.length;
    return `<style>${BASE_STYLE}${RING_STYLE}${FULL_STYLE}${this._sceneStyle()}</style>
      <ha-card>
        ${this._header(items)}
        <div class="list">${items.map((it) => this._device(it)).join("")}</div>
        ${this._popup(items)}
      </ha-card>`;
  }

  // One row per device: its ring, its name, a line (battery state · Wi-Fi network or zone · "seen 2 h ago" when it
  // has not reported for a while) and its battery level; a click unfolds its details under it.
  _device(it) {
    const d = it.dev;
    const b = it.battery;
    const L = this._locale();
    const open = this._isOpen(d.id);
    const state = b.v === null && b.state === "unknown" ? this._t(`kind_${d.kind}`) : b.low ? this._t("low_battery") : b.state === "unknown" ? "" : this._t(`state_${b.state}`);
    const where = this._config.show_location === false ? "" : this._where(it);
    const net = this._config.show_connection === false ? "" : this._wifiName(it);
    const seen = it.stale ? this._t("seen", { ago: fmtAgo(it.lastSeen, this._opts().now, L) }) : "";
    const parts = [state, net || where].filter(Boolean).map((p) => esc(p));
    if (seen) parts.push(`<span class="stale">${esc(seen)}</span>`);
    const pct = b.v === null ? "" : `<span class="pct ${b.low ? "crit" : ""}">${fmtNum(Math.round(b.v), 0, L)}<small>%</small></span>`;
    const label = `${d.name}${b.v === null ? "" : `, ${this._t("battery")} ${Math.round(b.v)} %`}`;
    return `<div class="dev${open ? " open" : ""}">
      <div class="row ${b.cls}" role="button" tabindex="0" data-action="toggle" data-device="${esc(d.id)}" aria-expanded="${open}" aria-label="${esc(label)}">
        ${this._ringHtml(it)}
        <div class="main"><div class="t1">${esc(d.name)}</div><div class="t2">${parts.join(" · ")}</div></div>
        ${pct}
        ${svgIcon(ICONS.chevron_down, "chevron")}
      </div>
      ${open ? this._body(it) : ""}
    </div>`;
  }

  _wifiName(it) {
    const ssid = it.s("ssid");
    return valid(ssid) && !NO_WIFI.test(String(ssid.state).trim()) ? String(ssid.state) : "";
  }

  // Zone of the device tracker, else its geocoded place.
  _where(it) {
    const tr = it.s("tracker");
    if (valid(tr)) {
      if (tr.state === "home") return this._t("home");
      // Another zone: the tracker's state is the zone's name.
      if (tr.state !== "not_home") return tr.state;
    }
    const g = this._geocoded(it);
    if (g) return g;
    return valid(tr) ? this._t("away") : "";
  }

  _geocoded(it) {
    const g = it.s("geocoded");
    if (!valid(g)) return "";
    const a = g.attributes || {};
    const place = a.Locality || a.locality || a.City || a.Name || String(g.state).split(/\n|,/)[0];
    return String(place || "").trim();
  }

  _tile(id, icon, label, value, { cls = "", sub = "", bar = null } = {}) {
    const click = id ? ` clickable" role="button" tabindex="0" data-entity="${esc(id)}"` : '"';
    const barHtml = bar === null ? "" : `<div class="bar"><div style="width:${Math.max(0, Math.min(100, bar))}%"></div></div>`;
    return `<div class="tile ${cls}${click}><div class="k">${svgIcon(icon)}<span>${esc(label)}</span></div><div class="v">${esc(value)}</div>${sub ? `<div class="s">${esc(sub)}</div>` : ""}${barHtml}</div>`;
  }

  _body(it) {
    const c = this._config;
    const L = this._locale();
    const b = it.battery;
    const e = it.dev.entities;
    const now = this._opts().now;
    const alerts = [];
    if (b.low) alerts.push(["crit", this._t("alert_low", { pct: fmtPct(b.v, L) }), b.id]);
    if (it.stale) alerts.push(["warn", this._t("alert_stale", { time: fmtSpan(now - it.lastSeen, L) }), e.tracker || b.id]);
    const tiles = [];
    // Battery
    if (b.v !== null || b.state !== "unknown") {
      const sub = [b.state === "unknown" ? "" : this._t(`state_${b.state}`), b.charger ? this._t(`charger_${b.charger}`) : "", b.lowPower ? this._t("low_power") : ""].filter(Boolean).join(" · ");
      tiles.push(this._tile(b.id, b.charging ? ICONS.bolt : ICONS.battery, this._t("battery"), b.v === null ? "—" : fmtPct(b.v, L), { cls: b.cls, sub, bar: b.v }));
    }
    const health = it.s("battery_health");
    if (valid(health)) tiles.push(this._tile(e.battery_health, ICONS.heart, this._t("battery_health"), this._word(health.state)));
    const temp = it.s("battery_temp");
    if (num(temp) !== null) tiles.push(this._tile(e.battery_temp, ICONS.thermometer, this._t("battery_temp"), `${fmtNum(num(temp), 1, L)} ${temp.attributes?.unit_of_measurement || "°C"}`));
    const ct = it.s("charge_time");
    if (b.charging && num(ct) > 0) tiles.push(this._tile(e.charge_time, ICONS.clock, this._t("charge_time"), fmtSpan(num(ct) * 60000, L), { cls: "active" }));
    // Last update
    tiles.push(
      this._tile(e.tracker || b.id, ICONS.clock, this._t("last_seen"), it.lastSeen === null ? this._t("never") : fmtAgo(it.lastSeen, now, L), {
        cls: it.stale ? "warn" : "",
        sub: it.lastSeen === null ? "" : new Date(it.lastSeen).toLocaleString(L, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      }),
    );
    if (c.show_location !== false) {
      const where = this._where(it);
      const geo = this._geocoded(it);
      if (where || geo) tiles.push(this._tile(e.tracker || e.geocoded, ICONS.pin, this._t("location"), where || geo, { sub: geo && geo !== where ? geo : "" }));
    }
    if (c.show_connection !== false) tiles.push(this._connection(it));
    if (c.show_storage !== false) tiles.push(this._storage(it));
    if (c.show_status !== false) tiles.push(...this._status(it));
    if (c.show_computer !== false) tiles.push(...this._computer(it));
    if (c.show_system !== false) {
      const os = this._system(it);
      if (os || it.dev.model) tiles.push(this._tile(e.os_version, ICONS.info, this._t("system"), os || "—", { sub: modelName(it.dev) }));
      const app = it.s("app_version");
      if (valid(app)) tiles.push(this._tile(e.app_version, ICONS.apps, this._t("app_version"), String(app.state).replace(/-(full|minimal|automotive|quest)$/i, "")));
    }
    return `<div class="body">
      ${alerts.map(([cls, text, id]) => `<div class="alert ${cls}${id ? ` clickable" role="button" tabindex="0" data-entity="${esc(id)}"` : '"'}>${svgIcon(ICONS.alert)}<span>${esc(text)}</span></div>`).join("")}
      <div class="tiles">${tiles.filter(Boolean).join("")}</div>
      ${c.show_actions === false ? "" : this._actions(it)}
    </div>`;
  }

  // A word of the app (good, normal, vibrate…) as a sentence: "Good".
  _word(s) {
    const w = String(s ?? "").replace(/_/g, " ");
    return w.charAt(0).toUpperCase() + w.slice(1);
  }

  _connection(it) {
    const e = it.dev.entities;
    const conn = it.s("connection");
    const carrier = it.s("carrier");
    let type = valid(conn) ? connectionType(conn.state) : null;
    const wifiName = this._wifiName(it);
    if (!type && wifiName) type = "wifi";
    if (!type) return "";
    const tech = conn?.attributes?.["Cellular Technology"] || "";
    const sub =
      type === "wifi"
        ? wifiName
        : type === "cellular"
          ? [String(tech).replace(/^.*?(5G|LTE|4G|3G|2G|Edge|GPRS).*$/i, "$1"), valid(carrier) ? carrier.state : ""].filter(Boolean).join(" · ")
          : "";
    const icon = type === "cellular" ? ICONS.cellular : ICONS.wifi;
    const label = { wifi: "wifi", cellular: "cellular", ethernet: "ethernet", none: "no_connection" }[type];
    return this._tile(type === "wifi" && e.ssid ? e.ssid : e.connection, icon, this._t("connection"), this._t(label), { sub, cls: type === "none" ? "warn" : "" });
  }

  // iOS: state = % available, attributes Available / Total ("52.47 GB"); Android: % free, "Free internal storage" /
  // "Total internal storage".
  _storage(it) {
    const st = it.s("storage");
    const pctFree = num(st);
    if (pctFree === null) return "";
    const L = this._locale();
    const a = st.attributes || {};
    const pick = (re) => Object.entries(a).find(([k]) => re.test(k))?.[1];
    const total = parseSize(pick(/^total/i));
    const free = parseSize(pick(/^(available|free)/i) ?? null) ?? (total !== null ? (total * pctFree) / 100 : null);
    const cls = pctFree < 5 ? "crit" : pctFree < 10 ? "warn" : "";
    const value = free !== null ? this._t("storage_free", { free: fmtBytes(free, L) }) : this._t("storage_free", { free: fmtPct(pctFree, L) });
    return this._tile(it.dev.entities.storage, ICONS.storage, this._t("storage"), value, { cls, sub: total !== null ? this._t("storage_of", { total: fmtBytes(total, L) }) : "", bar: 100 - pctFree });
  }

  _status(it) {
    const e = it.dev.entities;
    const out = [];
    const focus = it.s("focus");
    const fname = it.s("focus_name");
    if (valid(focus) || valid(fname)) {
      const on = focus?.state === "on" || valid(fname);
      out.push(this._tile(e.focus || e.focus_name, ICONS.moon, this._t("focus"), on ? (valid(fname) ? fname.state : this._t("on")) : this._t("off"), { cls: on ? "active" : "" }));
    }
    const dnd = it.s("dnd");
    if (valid(dnd)) {
      const k = String(dnd.state).toLowerCase();
      const v = k === "off" ? this._t("off") : STRINGS.en[`dnd_${k}`] ? this._t(`dnd_${k}`) : this._word(k);
      out.push(this._tile(e.dnd, ICONS.moon, this._t("dnd"), v, { cls: k === "off" ? "" : "active" }));
    }
    const ringer = it.s("ringer");
    if (valid(ringer)) {
      const k = String(ringer.state).toLowerCase();
      out.push(this._tile(e.ringer, ICONS.speaker, this._t("ringer"), STRINGS.en[`ringer_${k}`] ? this._t(`ringer_${k}`) : this._word(k), { cls: k === "silent" ? "warn" : "" }));
    }
    const act = it.s("activity");
    if (valid(act)) out.push(this._tile(e.activity, ICONS.walk, this._t("activity"), this._t(`act_${activityKey(act.state)}`)));
    return out;
  }

  // macOS (and Android's screen): active or idle, locked, displays, frontmost app, camera and microphone in use.
  _computer(it) {
    const e = it.dev.entities;
    const out = [];
    const active = it.s("active");
    if (valid(active)) {
      const on = active.state === "on";
      // Android: the screen on or off; macOS: the Mac in use or idle (screen off, screensaver, locked).
      const label = this._t("screen");
      const value = it.dev.platform === "android" ? this._t(on ? "on" : "off") : this._t(on ? "active" : "idle");
      out.push(this._tile(e.active, it.dev.kind === "laptop" || it.dev.kind === "desktop" ? ICONS.desktop : ICONS[it.dev.kind] || ICONS.other, label, value, { cls: on ? "ok" : "" }));
    }
    const locked = it.s("locked");
    if (valid(locked)) out.push(this._tile(e.locked, ICONS.lock, this._t("locked"), this._t(locked.state === "on" ? "locked" : "unlocked")));
    const displays = it.s("displays");
    if (valid(displays)) {
      const name = it.s("display_name");
      out.push(this._tile(e.displays, ICONS.desktop, this._t("displays"), String(displays.state), { sub: valid(name) ? name.state : "" }));
    }
    const app = it.s("frontmost_app");
    if (valid(app)) out.push(this._tile(e.frontmost_app, ICONS.apps, this._t("frontmost_app"), app.state));
    for (const [k, icon, label] of [
      ["camera", ICONS.camera, "camera"],
      ["mic", ICONS.mic, "microphone"],
    ]) {
      const s = it.s(k);
      if (valid(s)) out.push(this._tile(e[k], icon, this._t(label), this._t(s.state === "on" ? "in_use" : "not_in_use"), { cls: s.state === "on" ? "warn" : "" }));
    }
    return out;
  }

  _actions(it) {
    const e = it.dev.entities;
    const service = notifyService(this._hass, it.dev);
    const info = e.tracker || it.battery.id;
    const sent = this._sent?.id === it.dev.id ? this._sent : null;
    const status = sent && sent.ok !== null ? `<span class="sent" role="status">${esc(this._t(sent.ok ? "ring_sent" : "ring_failed"))}</span>` : "";
    if (!service && !info) return "";
    return `<div class="actions">
      ${service ? `<button class="btn main" data-action="ring" data-device="${esc(it.dev.id)}">${svgIcon(ICONS.bell)}${esc(this._t("ring_device"))}</button>` : ""}
      ${info ? `<button class="btn" data-entity="${esc(info)}">${svgIcon(ICONS.open)}${esc(this._t("more_info"))}</button>` : ""}
      ${status}
    </div>`;
  }
}

export class DeviceMiniCard extends DeviceCard {
  constructor() {
    super();
    this._unzoom = watchOutside(this, () => {
      if (this._zoomed && !this._ring) this._setZoom(false);
    });
  }

  static getConfigElement() {
    return document.createElement("device-mini-card-editor");
  }

  connectedCallback() {
    super.connectedCallback();
    this._unzoom.on();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._unzoom.off();
    // Back to the compact view once off the screen.
    this._zoomed = false;
  }

  getCardSize() {
    return this._zoomed ? super.getCardSize() : 3;
  }

  getGridOptions() {
    return { ...(this._zoomed ? super.getGridOptions() : { columns: 6, min_columns: 3 }), rows: "auto" };
  }

  _zoomButton() {
    if (this._config.zoom === false) return "";
    const z = this._zoomed;
    const label = esc(this._t(z ? "zoom_out" : "zoom_in"));
    return `<button class="zoom" data-action="zoom" title="${label}" aria-label="${label}" aria-pressed="${!!z}">${svgIcon(z ? ICONS.collapse : ICONS.expand)}</button>`;
  }

  _setZoom(on) {
    this._zoomed = on;
    this._update();
    this.dispatchEvent(new CustomEvent("iron-resize", { bubbles: true, composed: true }));
  }

  _toggleZoom(ev) {
    this._setZoom(!this._zoomed);
    if (ev?.detail === 0) this.shadowRoot.querySelector(".zoom")?.focus({ preventScroll: true });
  }

  _render() {
    if (this._zoomed) return super._render();
    const { items, error, ref } = this._read();
    if (error) return this._errorCard(error, ref);
    this._count = items.length;
    const L = this._locale();
    const names = this._config.show_names !== false;
    const rings = items
      .map((it) => {
        const b = it.battery;
        const label = `${it.dev.name}${b.v === null ? "" : `, ${this._t("battery")} ${Math.round(b.v)} %`}`;
        const id = b.id || it.dev.entities.tracker;
        const click = id ? ` clickable" role="button" tabindex="0" data-entity="${esc(id)}"` : `" role="img"`;
        return `<div class="item ${b.cls}${click} aria-label="${esc(label)}" title="${esc(label)}">
          ${this._ringHtml(it)}
          ${names ? `<span class="n">${esc(it.dev.name)}</span>` : ""}
          ${b.v === null ? "" : `<span class="p">${fmtPct(b.v, L)}</span>`}
        </div>`;
      })
      .join("");
    return `<style>${BASE_STYLE}${RING_STYLE}${MINI_STYLE}${this._sceneStyle()}</style>
      <ha-card>
        ${this._header(items)}
        <div class="rings">${rings}</div>
      </ha-card>`;
  }
}
