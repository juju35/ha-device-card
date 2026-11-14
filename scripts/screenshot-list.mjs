// The README screenshots (PNG) and animations (GIF) rendered by scripts/screenshots.mjs.
// Every capture has a twin in the other theme ("-dark" for a light capture, "-light" for a dark one)
// that shows exactly the same state: only the theme differs (checked by test/screenshots.test.mjs).
import { lowBattery } from "./mock-states.mjs";

const pair = (file, type, width, config = {}, extra = {}, first = "light") => {
  const second = first === "light" ? "dark" : "light";
  return [
    { file, type, theme: first, width, config, ...extra },
    { file: `${file}-${second}`, type, theme: second, width, config, ...extra },
  ];
};

const row = (id) => `.row[data-device="${id}"]`;

export const shots = [
  // Every Companion app device, folded: one row each.
  ...pair("card", "device-card", 420),
  // A row unfolded inline: its details, the ring button and more-info.
  ...pair("card-details", "device-card", 420, {}, { clicks: [row("phone")] }, "dark"),
  // A single device is unfolded by default: an Android phone (low battery, ringer, Do Not Disturb, activity)…
  ...pair("card-android", "device-card", 420, { devices: ["work"] }),
  // …and a MacBook (activity, displays, frontmost app, camera and microphone).
  ...pair("card-macos", "device-card", 420, { devices: ["laptop"] }, {}, "dark"),
  // The ring confirmation, at the top of the card.
  ...pair("card-ring", "device-card", 420, {}, { clicks: [row("phone"), '[data-action="ring"]'] }),
  ...pair("mini-card", "device-mini-card", 380),
  ...pair("mini-card-zoom", "device-mini-card", 420, {}, { clicks: [".zoom"] }, "dark"),
  // Narrow cards: the full card at 6 of 12 columns of a phone's Sections view (~170 px wide cards are mini cards).
  ...pair("card-narrow", "device-card", 238),
  ...pair("mini-card-narrow", "device-mini-card", 170, { devices: ["phone", "work", "laptop"] }),
];

// One looping GIF per distinct animation of the battery ring (each one its own keyframes):
//   charging     — a light running round the ring, the bolt badge beating (2 s loop)
//   low-battery  — the red arc blinking and a halo pulsing out of the ring (1.5 s loop)
export const gifs = [
  ...pair("charging", "device-card", 420, { devices: ["phone"], details: "collapsed" }, { seconds: 2 }),
  ...pair("low-battery", "device-card", 420, { devices: ["work"], details: "collapsed" }, { overrides: lowBattery, seconds: 1.5 }, "dark"),
];
