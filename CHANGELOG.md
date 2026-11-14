# Changelog

## 1.0.0 - 2026-11-14

### Features
- **Device Card** (`custom:device-card`): the phones, tablets and computers of the Home Assistant Companion app (`mobile_app`: iOS, iPadOS, macOS, Android, Android Automotive), one row per device with a battery ring (green, blue and animated while charging, red and pulsing when low), its name, a line with the charging state, the Wi-Fi network or the zone and how long ago it was seen once it stops reporting, and the battery level; a status pill (all good, low batteries, offline devices).
- Details unfolded inline by a click on a row: battery (state, charger, Low Power Mode, health, temperature, time to full), last update, location, connection, storage, Focus, Do Not Disturb, ringer, activity, system and Companion app versions, and for a Mac: in use or idle, locked, displays, frontmost app, camera and microphone.
- **Ring device**: a critical notification (iOS / macOS) or an alarm stream notification (Android) through the device's notify service, after a confirmation popup at the top of the card.
- **Device Mini Card** (`custom:device-mini-card`): the battery rings with the device names, with a detail button that switches to the full list and back.
- Devices and sensors discovered through the Home Assistant registries, whatever the language or entity ids; `devices` / `exclude` to choose them, with per-device name, icon, notify service and entities in YAML.
- Visual editor for both cards, sort by name, battery or last update, Sections view sizes, light and dark themes, `prefers-reduced-motion`, keyboard navigation, 22 languages (English in the bundle, the others loaded on demand).
