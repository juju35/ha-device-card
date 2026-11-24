// Evaluates the bundled card source (test/source.mjs) (a classic script, bundled as is by scripts/build.mjs) in a sandbox with
// minimal DOM stand-ins and returns the names the tests need. No dependency, no browser.
import vm from "node:vm";
import { source } from "./source.mjs";


// Shadow root stand-in: keeps the HTML it is given and the listeners it gets.
const fakeRoot = () => ({
  innerHTML: "",
  listeners: {},
  addEventListener(type, fn) {
    this.listeners[type] = fn;
  },
  querySelector() {
    return null;
  },
  querySelectorAll() {
    return [];
  },
});

// Plain element stand-in (an element the card creates): children, listeners and remove() from its parent.
const fakeNode = (tag) => ({
  tagName: String(tag).toUpperCase(),
  style: {},
  dataset: {},
  attributes: {},
  children: [],
  setAttribute(name, value) {
    this.attributes[name] = String(value);
  },
  getAttribute(name) {
    return name in this.attributes ? this.attributes[name] : null;
  },
  hasAttribute(name) {
    return name in this.attributes;
  },
  focus() {
    (this.focused ||= 0);
    this.focused++;
  },
  listeners: {},
  parentNode: null,
  appendChild(child) {
    child.parentNode = this;
    this.children.push(child);
    return child;
  },
  addEventListener(type, fn) {
    this.listeners[type] = fn;
  },
  remove() {
    if (!this.parentNode) return;
    this.parentNode.children = this.parentNode.children.filter((c) => c !== this);
    this.parentNode = null;
  },
});

export const load = () => {
  const registry = new Map();
  class HTMLElement {
    attachShadow() {
      this.shadowRoot = fakeRoot();
      return this.shadowRoot;
    }
    dispatchEvent(ev) {
      (this.events ||= []).push(ev);
    }
    appendChild() {}
  }
  class CustomEvent {
    constructor(type, init = {}) {
      this.type = type;
      this.detail = init.detail;
    }
  }
  const sandbox = {
    HTMLElement,
    CustomEvent,
    Intl,
    console: { info() {}, warn() {} },
    customElements: { get: (t) => registry.get(t), define: (t, c) => registry.set(t, c) },
    document: {
      createElement: (t) => (registry.has(t) ? new (registry.get(t))() : fakeNode(t)),
      addEventListener() {},
      removeEventListener() {},
      body: fakeNode("body"),
    },
    setTimeout,
    clearTimeout,
    // Intervals are not run: kept in `intervals` (id → callback) for the tests to fire by hand.
    intervals: new Map(),
    setInterval(fn) {
      const id = Symbol("interval");
      sandbox.intervals.set(id, fn);
      return id;
    },
    clearInterval(id) {
      sandbox.intervals.delete(id);
    },
  };
  // window-level listeners, fired by hand with fire(type, ev).
  const winListeners = {};
  sandbox.addEventListener = (type, fn) => (winListeners[type] ||= new Set()).add(fn);
  sandbox.removeEventListener = (type, fn) => winListeners[type]?.delete(fn);
  sandbox.fire = (type, ev) => {
    for (const fn of [...(winListeners[type] || [])]) fn(ev);
  };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  return vm.runInContext(
    `${source}
    ({ STRINGS, KEYS, esc, lang, intlLocale, slugify, keyOf, kindOf, platformOf, modelName, resolveDevices, findDevices, notifyService,
       ringPayload, batteryState, connectionType, activityKey, readDevice, parseSize, fmtBytes, fmtAgo, fmtSpan, ringSvg, morph, cleanConfig,
       DeviceCard: customElements.get("device-card"), DeviceMiniCard: customElements.get("device-mini-card"),
       DeviceCardEditor: customElements.get("device-card-editor"), DeviceMiniCardEditor: customElements.get("device-mini-card-editor"), window, document })`,
    sandbox,
    // The file name lets `node --test --experimental-test-coverage` report the card's own coverage.
    { filename: new URL("../src/index.js", import.meta.url).href },
  );
};
