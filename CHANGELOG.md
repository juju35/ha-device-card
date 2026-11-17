# Changelog

## 1.1.0 - 2026-11-17

### Features
- **Animated illustrated header** on the full and the mini card (90 px): the card's own devices (laptop, computer, tablet, phone, watch, car, by their kind) standing on a desk, each showing its state on its screen — a beating green bolt and a cable while charging, a blinking red battery when low, a dark screen when offline, else its battery level — with a window showing the sun and a drifting cloud by day, the moon and twinkling stars by night, and a 10 px desk strip under the whole banner.
- Night picture from `sun.sun` (else the dark theme), forced with `illustration_theme: day | night`; `illustration: false` keeps the classic header with its status pill. Both options are in the visual editors of both cards.
- The header icon takes the color of the devices' state (red: a low battery, amber: offline, blue: charging, green: all good, grey: no battery reported), in the illustrated and the classic header, with the Mobile App logo as a badge.
- **State pill on the title line** of the illustrated header (full and mini cards): right after the title, in the round icon's colour (*Charging* for a single charging device), dropping under the subtitle on a narrow header and keeping only its dot on a very narrow card; the subtitle no longer repeats it. On a mid-width card the text takes the window's place. The mini card's expand/collapse button is a 24 px frosted round button in the banner's top-right corner.
- The classic header (`illustration: false`) puts its state pill in the same place, right after the title (under the subtitle when narrow, only its dot at 200 px or less), instead of at the far right.

## 1.0.0 - 2026-11-14

### Features
- **Device Card** (`custom:device-card`): the phones, tablets and computers of the Home Assistant Companion app (`mobile_app`: iOS, iPadOS, macOS, Android, Android Automotive), one row per device with a battery ring (green, blue and animated while charging, red and pulsing when low), its name, a line with the charging state, the Wi-Fi network or the zone and how long ago it was seen once it stops reporting, and the battery level; a status pill (all good, low batteries, offline devices).
- Details unfolded inline by a click on a row: battery (state, charger, Low Power Mode, health, temperature, time to full), last update, location, connection, storage, Focus, Do Not Disturb, ringer, activity, system and Companion app versions, and for a Mac: in use or idle, locked, displays, frontmost app, camera and microphone.
- **Ring device**: a critical notification (iOS / macOS) or an alarm stream notification (Android) through the device's notify service, after a confirmation popup at the top of the card.
- **Device Mini Card** (`custom:device-mini-card`): the battery rings with the device names, with a detail button that switches to the full list and back.
- Devices and sensors discovered through the Home Assistant registries, whatever the language or entity ids; `devices` / `exclude` to choose them, with per-device name, icon, notify service and entities in YAML.
- Visual editor for both cards, sort by name, battery or last update, Sections view sizes, light and dark themes, `prefers-reduced-motion`, keyboard navigation, 22 languages (English in the bundle, the others loaded on demand).
