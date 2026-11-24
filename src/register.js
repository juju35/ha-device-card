// ---------------------------------------------------------------------------
// Registration
// ---------------------------------------------------------------------------
import { pickerDefine } from "./card-picker.js";
import { VERSION } from "./core.js";
import { DeviceCard, DeviceMiniCard } from "./cards.js";
import { DeviceCardEditor, DeviceMiniCardEditor } from "./visual-editors.js";

export const define = (name, cls) => {
  if (!customElements.get(name)) pickerDefine(name, cls);
};
define("device-card", DeviceCard);
define("device-mini-card", DeviceMiniCard);
define("device-card-editor", DeviceCardEditor);
define("device-mini-card-editor", DeviceMiniCardEditor);

window.customCards = window.customCards || [];
for (const card of [
  {
    type: "device-card",
    name: "Device Card",
    description: "Phones, tablets and computers of the Companion app: battery, last update, location, connection, storage, focus, and a ring button to find them.",
  },
  { type: "device-mini-card", name: "Device Mini Card", description: "Battery rings of the Companion app devices, with a detail button." },
]) {
  if (!window.customCards.some((c) => c.type === card.type)) window.customCards.push({ ...card, preview: true, documentationURL: "https://github.com/juju35/ha-device-card" });
}

console.info(`%c DEVICE-CARD %c v${VERSION} `, "color: white; background: #009688; font-weight: 700;", "color: #009688; background: white; font-weight: 700;");
