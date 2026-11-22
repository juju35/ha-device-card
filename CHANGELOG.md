# Changelog

## 1.1.4 - 2026-11-22

### Performance
- Card picker: the previews are back (`preview: true`), and light. Each card's preview is drawn only once it scrolls into view of Home Assistant's card picker, which otherwise builds the preview of every card at once: until then it holds Home Assistant's state (no render, no history request, no animation). On a dashboard or in the card editor the card is drawn as before.

## 1.1.3 - 2026-11-22

### Performance
- Card picker: the cards no longer ask Home Assistant for a live preview (`preview: false` in `window.customCards`). The picker drew every card at once (history requests, animations), which made the list slow to open; it now shows each card's description instead.

## 1.1.2 - 2026-11-20

### Fixes
- System line: a version that already names its system (a computer whose app reports "Microsoft Windows 11") is shown as it is, no longer as "Android Microsoft Windows 11"; a bare version still gets its system's name ("iOS 18.1", "Android 16").
- A third-party Companion app on Windows or Linux is no longer read as Android: its ring is a plain notification (no Android alarm-stream payload) and its version is shown as it is.
- Safari before 18: the frosted buttons and the veil get their blur too (`-webkit-backdrop-filter`).
- Leaving the page also cancels a pending header measurement and the "sent" note of a ring.

### Maintenance
- The unit tests report the card's own coverage.

## 1.1.1 - 2026-11-18

### Fixes
- Illustrated header: `auto` now follows the Home Assistant theme alone — a light theme keeps the day picture after sunset, a dark theme still shows the night one.

## 1.1.0 - 2026-11-17

### Features
- **Animated illustrated header** on the full and the mini card (90 px): the card's own devices (laptop, computer, tablet, phone, watch, car, by their kind) standing on a desk, each showing its state on its screen — a beating green bolt and a cable while charging, a blinking red battery when low, a dark screen when offline, else its battery level — with a window showing the sun and a drifting cloud by day, the moon and twinkling stars by night, and a 10 px desk strip under the whole banner.
- Night picture after sunset (`sun.sun`) or with the dark theme, forced with `illustration_theme: day | night`; `illustration: false` keeps the classic header with its status pill. Both options are in the visual editors of both cards.
- The header icon takes the color of the devices' state (red: a low battery, amber: offline, blue: charging, green: all good, grey: no battery reported), in the illustrated and the classic header, with the Mobile App logo as a badge.
- **State pill on the title line** of the illustrated header (full and mini cards): right after the title, in the round icon's colour (*Charging* for a single charging device), only when the whole title and its whole label fit there; otherwise on its own line under the subtitle (then kept to one line), and only its dot when even that does not fit in the banner or the card is 200 px wide or less. Measured on the rendered card, so that it fits in every language; the subtitle no longer repeats it. On a mid-width card the text takes the window's place and the devices are drawn smaller (only the desk strip at 280 px or less), so that the pill keeps its whole label in every language. The mini card's expand/collapse button is a 24 px frosted round button in the banner's top-right corner.
- The classic header (`illustration: false`) puts its state pill in the same place, right after the title (under the subtitle when the whole title and label do not fit side by side, only its dot at 200 px or less), instead of at the far right.
- Night picture with the dark theme even while the sun is up

## 1.0.0 - 2026-11-14

### Features
- **Device Card** (`custom:device-card`): the phones, tablets and computers of the Home Assistant Companion app (`mobile_app`: iOS, iPadOS, macOS, Android, Android Automotive), one row per device with a battery ring (green, blue and animated while charging, red and pulsing when low), its name, a line with the charging state, the Wi-Fi network or the zone and how long ago it was seen once it stops reporting, and the battery level; a status pill (all good, low batteries, offline devices).
- Details unfolded inline by a click on a row: battery (state, charger, Low Power Mode, health, temperature, time to full), last update, location, connection, storage, Focus, Do Not Disturb, ringer, activity, system and Companion app versions, and for a Mac: in use or idle, locked, displays, frontmost app, camera and microphone.
- **Ring device**: a critical notification (iOS / macOS) or an alarm stream notification (Android) through the device's notify service, after a confirmation popup at the top of the card.
- **Device Mini Card** (`custom:device-mini-card`): the battery rings with the device names, with a detail button that switches to the full list and back.
- Devices and sensors discovered through the Home Assistant registries, whatever the language or entity ids; `devices` / `exclude` to choose them, with per-device name, icon, notify service and entities in YAML.
- Visual editor for both cards, sort by name, battery or last update, Sections view sizes, light and dark themes, `prefers-reduced-motion`, keyboard navigation, 22 languages (English in the bundle, the others loaded on demand).
