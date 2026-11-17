/*
 * Device Card for Home Assistant
 * https://github.com/juju35/ha-device-card
 *
 * Lovelace cards for the phones, tablets and computers of the Home Assistant Companion app (mobile_app integration:
 * iOS, iPadOS, macOS, Android, Android Automotive). The devices and their entities are found through the entity and
 * device registries (platform mobile_app and device), so they work whatever the Home Assistant language; the sensor
 * an entity stands for is read from its entity id or its name, both written by the app in English.
 */

const VERSION = "__VERSION__";

const STRINGS = {
  en: {
    title_devices: "Devices",
    n_devices: "{n} devices",
    pill_ok: "All good",
    pill_low: "{n} low",
    pill_stale: "{n} offline",
    state_charging: "Charging",
    state_full: "Full",
    state_not_charging: "Not charging",
    state_discharging: "On battery",
    state_unknown: "Unknown",
    low_battery: "Low battery",
    alert_low: "Low battery: {pct}",
    alert_stale: "Not seen for {time}",
    seen: "seen {ago}",
    charger_ac: "AC charger",
    charger_usb: "USB",
    charger_wireless: "Wireless",
    charger_dock: "Dock",
    battery: "Battery",
    low_power: "Low Power Mode",
    battery_health: "Battery health",
    battery_temp: "Battery temperature",
    charge_time: "Full in",
    last_seen: "Last update",
    never: "Never",
    location: "Location",
    home: "Home",
    away: "Away",
    connection: "Connection",
    wifi: "Wi-Fi",
    cellular: "Cellular",
    ethernet: "Ethernet",
    no_connection: "No connection",
    storage: "Storage",
    storage_free: "{free} free",
    storage_of: "of {total}",
    focus: "Focus",
    on: "On",
    off: "Off",
    ringer: "Ringer",
    ringer_normal: "Normal",
    ringer_vibrate: "Vibrate",
    ringer_silent: "Silent",
    dnd: "Do Not Disturb",
    dnd_priority_only: "Priority only",
    dnd_total_silence: "Total silence",
    dnd_alarms_only: "Alarms only",
    activity: "Activity",
    act_stationary: "Stationary",
    act_walking: "Walking",
    act_running: "Running",
    act_automotive: "Driving",
    act_cycling: "Cycling",
    act_unknown: "Unknown",
    system: "System",
    app_version: "Companion app",
    screen: "Screen",
    active: "Active",
    idle: "Idle",
    locked: "Locked",
    unlocked: "Unlocked",
    displays: "Displays",
    frontmost_app: "Frontmost app",
    camera: "Camera",
    microphone: "Microphone",
    in_use: "In use",
    not_in_use: "Not in use",
    ring: "Ring",
    ring_device: "Ring device",
    ring_title: "Ring {name}?",
    ring_text: "Sends a critical notification that plays a sound even when the device is silent or in a Focus.",
    ring_sent: "Ring sent",
    ring_failed: "Could not ring",
    ring_default_message: "Home Assistant is looking for this device",
    cancel: "Cancel",
    more_info: "Details",
    kind_phone: "Phone",
    kind_tablet: "Tablet",
    kind_laptop: "Laptop",
    kind_desktop: "Computer",
    kind_car: "Car",
    kind_watch: "Watch",
    kind_other: "Device",
    no_device: "No device of the Home Assistant Companion app found. Install the app on a phone, tablet or computer and sign in to this Home Assistant.",
    unknown_device: "Device not found",
    no_registry: "This card needs Home Assistant 2024.8 or later.",
    devices: "Devices (every Companion app device when empty)",
    exclude: "Devices left out",
    title: "Title (optional)",
    show_title: "Show title",
    show_subtitle: "Show subtitle",
    illustration: "Animated illustration",
    illustration_theme: "Illustration theme",
    theme_auto: "Automatic (sun)",
    theme_day: "Day",
    theme_night: "Night",
    show_location: "Show location",
    show_connection: "Show connection",
    show_storage: "Show storage",
    show_status: "Show focus, ringer and activity",
    show_system: "Show system and app versions",
    show_computer: "Show computer details",
    show_actions: "Show actions (ring, details)",
    show_names: "Show names",
    sort: "Sort by",
    sort_name: "Name",
    sort_battery: "Battery, lowest first",
    sort_last_seen: "Last update, latest first",
    sort_none: "Order of the list",
    details: "Device details",
    details_auto: "Unfolded for a single device",
    details_expanded: "Unfolded",
    details_collapsed: "Folded",
    low_battery_level: "Low battery level",
    stale_after: "Not seen warning after",
    unit_hours: "hours",
    ring_message: "Ring message",
    language: "Language",
    lang_auto: "Automatic",
    zoom: "Detail button",
    zoom_helper: "Button at the top right that switches the mini card to the full card and back",
    zoom_in: "Show the full card",
    zoom_out: "Show the compact card",
  },
  fr: {
    title_devices: "Appareils",
    n_devices: "{n} appareils",
    pill_ok: "Tout va bien",
    pill_low: "{n} faibles",
    pill_stale: "{n} hors ligne",
    state_charging: "En charge",
    state_full: "Pleine",
    state_not_charging: "Pas en charge",
    state_discharging: "Sur batterie",
    state_unknown: "Inconnu",
    low_battery: "Batterie faible",
    alert_low: "Batterie faible : {pct}",
    alert_stale: "Non vu depuis {time}",
    seen: "vu {ago}",
    charger_ac: "Chargeur secteur",
    charger_usb: "USB",
    charger_wireless: "Sans fil",
    charger_dock: "Station d'accueil",
    battery: "Batterie",
    low_power: "Mode économie d'énergie",
    battery_health: "Santé de la batterie",
    battery_temp: "Température de la batterie",
    charge_time: "Pleine dans",
    last_seen: "Dernière mise à jour",
    never: "Jamais",
    location: "Position",
    home: "Maison",
    away: "Absent",
    connection: "Connexion",
    wifi: "Wi-Fi",
    cellular: "Cellulaire",
    ethernet: "Ethernet",
    no_connection: "Pas de connexion",
    storage: "Stockage",
    storage_free: "{free} libres",
    storage_of: "sur {total}",
    focus: "Concentration",
    on: "Activé",
    off: "Désactivé",
    ringer: "Sonnerie",
    ringer_normal: "Normale",
    ringer_vibrate: "Vibreur",
    ringer_silent: "Silencieux",
    dnd: "Ne pas déranger",
    dnd_priority_only: "Prioritaires uniquement",
    dnd_total_silence: "Silence total",
    dnd_alarms_only: "Alarmes uniquement",
    activity: "Activité",
    act_stationary: "Immobile",
    act_walking: "Marche",
    act_running: "Course",
    act_automotive: "En voiture",
    act_cycling: "Vélo",
    act_unknown: "Inconnue",
    system: "Système",
    app_version: "Application Companion",
    screen: "Écran",
    active: "Actif",
    idle: "Inactif",
    locked: "Verrouillé",
    unlocked: "Déverrouillé",
    displays: "Écrans",
    frontmost_app: "Application au premier plan",
    camera: "Caméra",
    microphone: "Microphone",
    in_use: "Utilisé",
    not_in_use: "Non utilisé",
    ring: "Faire sonner",
    ring_device: "Faire sonner l'appareil",
    ring_title: "Faire sonner {name} ?",
    ring_text: "Envoie une notification critique qui joue un son même si l'appareil est en silencieux ou en mode Concentration.",
    ring_sent: "Sonnerie envoyée",
    ring_failed: "Impossible de faire sonner",
    ring_default_message: "Home Assistant cherche cet appareil",
    cancel: "Annuler",
    more_info: "Détails",
    kind_phone: "Téléphone",
    kind_tablet: "Tablette",
    kind_laptop: "Ordinateur portable",
    kind_desktop: "Ordinateur",
    kind_car: "Voiture",
    kind_watch: "Montre",
    kind_other: "Appareil",
    no_device: "Aucun appareil de l'application Home Assistant Companion trouvé. Installez l'application sur un téléphone, une tablette ou un ordinateur et connectez-la à ce Home Assistant.",
    unknown_device: "Appareil introuvable",
    no_registry: "Cette carte nécessite Home Assistant 2024.8 ou plus récent.",
    devices: "Appareils (tous les appareils Companion si vide)",
    exclude: "Appareils exclus",
    title: "Titre (facultatif)",
    show_title: "Afficher le titre",
    show_subtitle: "Afficher le sous-titre",
    illustration: "Illustration animée",
    illustration_theme: "Thème de l’illustration",
    theme_auto: "Automatique (soleil)",
    theme_day: "Jour",
    theme_night: "Nuit",
    show_location: "Afficher la position",
    show_connection: "Afficher la connexion",
    show_storage: "Afficher le stockage",
    show_status: "Afficher concentration, sonnerie et activité",
    show_system: "Afficher les versions du système et de l'application",
    show_computer: "Afficher les détails de l'ordinateur",
    show_actions: "Afficher les actions (sonner, détails)",
    show_names: "Afficher les noms",
    sort: "Trier par",
    sort_name: "Nom",
    sort_battery: "Batterie, la plus faible d'abord",
    sort_last_seen: "Dernière mise à jour, la plus récente d'abord",
    sort_none: "Ordre de la liste",
    details: "Détails des appareils",
    details_auto: "Dépliés pour un seul appareil",
    details_expanded: "Dépliés",
    details_collapsed: "Repliés",
    low_battery_level: "Niveau de batterie faible",
    stale_after: "Alerte « non vu » après",
    unit_hours: "heures",
    ring_message: "Message de sonnerie",
    language: "Langue",
    lang_auto: "Automatique",
    zoom: "Bouton de détail",
    zoom_helper: "Bouton en haut à droite qui passe de la mini carte à la carte complète et inversement",
    zoom_in: "Afficher la carte complète",
    zoom_out: "Afficher la carte compacte",
  },
  de: {
    title_devices: "Geräte",
    n_devices: "{n} Geräte",
    pill_ok: "Alles in Ordnung",
    pill_low: "{n} schwach",
    pill_stale: "{n} offline",
    state_charging: "Lädt",
    state_full: "Voll",
    state_not_charging: "Lädt nicht",
    state_discharging: "Im Akkubetrieb",
    state_unknown: "Unbekannt",
    low_battery: "Akku schwach",
    alert_low: "Akku schwach: {pct}",
    alert_stale: "Seit {time} nicht gesehen",
    seen: "gesehen {ago}",
    charger_ac: "Netzteil",
    charger_usb: "USB",
    charger_wireless: "Kabellos",
    charger_dock: "Dock",
    battery: "Akku",
    low_power: "Stromsparmodus",
    battery_health: "Akkuzustand",
    battery_temp: "Akkutemperatur",
    charge_time: "Voll in",
    last_seen: "Letzte Aktualisierung",
    never: "Nie",
    location: "Standort",
    home: "Zuhause",
    away: "Abwesend",
    connection: "Verbindung",
    wifi: "WLAN",
    cellular: "Mobilfunk",
    ethernet: "Ethernet",
    no_connection: "Keine Verbindung",
    storage: "Speicher",
    storage_free: "{free} frei",
    storage_of: "von {total}",
    focus: "Fokus",
    on: "An",
    off: "Aus",
    ringer: "Klingelton",
    ringer_normal: "Normal",
    ringer_vibrate: "Vibration",
    ringer_silent: "Lautlos",
    dnd: "Nicht stören",
    dnd_priority_only: "Nur Wichtiges",
    dnd_total_silence: "Absolute Ruhe",
    dnd_alarms_only: "Nur Wecker",
    activity: "Aktivität",
    act_stationary: "Stillstand",
    act_walking: "Gehen",
    act_running: "Laufen",
    act_automotive: "Im Auto",
    act_cycling: "Radfahren",
    act_unknown: "Unbekannt",
    system: "System",
    app_version: "Companion-App",
    screen: "Bildschirm",
    active: "Aktiv",
    idle: "Inaktiv",
    locked: "Gesperrt",
    unlocked: "Entsperrt",
    displays: "Bildschirme",
    frontmost_app: "App im Vordergrund",
    camera: "Kamera",
    microphone: "Mikrofon",
    in_use: "In Benutzung",
    not_in_use: "Nicht in Benutzung",
    ring: "Klingeln",
    ring_device: "Gerät klingeln lassen",
    ring_title: "{name} klingeln lassen?",
    ring_text: "Sendet eine kritische Mitteilung, die einen Ton abspielt, auch wenn das Gerät stumm oder im Fokus ist.",
    ring_sent: "Klingeln gesendet",
    ring_failed: "Klingeln fehlgeschlagen",
    ring_default_message: "Home Assistant sucht dieses Gerät",
    cancel: "Abbrechen",
    more_info: "Details",
    kind_phone: "Telefon",
    kind_tablet: "Tablet",
    kind_laptop: "Laptop",
    kind_desktop: "Computer",
    kind_car: "Auto",
    kind_watch: "Uhr",
    kind_other: "Gerät",
    no_device: "Kein Gerät der Home Assistant Companion-App gefunden. Installiere die App auf einem Telefon, Tablet oder Computer und melde dich bei diesem Home Assistant an.",
    unknown_device: "Gerät nicht gefunden",
    no_registry: "Diese Karte benötigt Home Assistant 2024.8 oder neuer.",
    devices: "Geräte (alle Companion-Geräte, wenn leer)",
    exclude: "Ausgeschlossene Geräte",
    title: "Titel (optional)",
    show_title: "Titel anzeigen",
    show_subtitle: "Untertitel anzeigen",
    illustration: "Animierte Illustration",
    illustration_theme: "Thema der Illustration",
    theme_auto: "Automatisch (Sonne)",
    theme_day: "Tag",
    theme_night: "Nacht",
    show_location: "Standort anzeigen",
    show_connection: "Verbindung anzeigen",
    show_storage: "Speicher anzeigen",
    show_status: "Fokus, Klingelton und Aktivität anzeigen",
    show_system: "System- und App-Version anzeigen",
    show_computer: "Computerdetails anzeigen",
    show_actions: "Aktionen anzeigen (Klingeln, Details)",
    show_names: "Namen anzeigen",
    sort: "Sortieren nach",
    sort_name: "Name",
    sort_battery: "Akku, niedrigster zuerst",
    sort_last_seen: "Letzte Aktualisierung, neueste zuerst",
    sort_none: "Reihenfolge der Liste",
    details: "Gerätedetails",
    details_auto: "Aufgeklappt bei einem einzigen Gerät",
    details_expanded: "Aufgeklappt",
    details_collapsed: "Zugeklappt",
    low_battery_level: "Niedriger Akkustand",
    stale_after: "„Nicht gesehen“-Warnung nach",
    unit_hours: "Stunden",
    ring_message: "Klingelnachricht",
    language: "Sprache",
    lang_auto: "Automatisch",
    zoom: "Detail-Schaltfläche",
    zoom_helper: "Schaltfläche oben rechts, die zwischen Mini-Karte und vollständiger Karte wechselt",
    zoom_in: "Vollständige Karte anzeigen",
    zoom_out: "Kompakte Karte anzeigen",
  },
  es: {
    title_devices: "Dispositivos",
    n_devices: "{n} dispositivos",
    pill_ok: "Todo bien",
    pill_low: "{n} con poca batería",
    pill_stale: "{n} sin conexión",
    state_charging: "Cargando",
    state_full: "Llena",
    state_not_charging: "Sin cargar",
    state_discharging: "Con batería",
    state_unknown: "Desconocido",
    low_battery: "Batería baja",
    alert_low: "Batería baja: {pct}",
    alert_stale: "Sin ver desde hace {time}",
    seen: "visto {ago}",
    charger_ac: "Cargador de red",
    charger_usb: "USB",
    charger_wireless: "Inalámbrico",
    charger_dock: "Base",
    battery: "Batería",
    low_power: "Modo de bajo consumo",
    battery_health: "Salud de la batería",
    battery_temp: "Temperatura de la batería",
    charge_time: "Llena en",
    last_seen: "Última actualización",
    never: "Nunca",
    location: "Ubicación",
    home: "Casa",
    away: "Fuera",
    connection: "Conexión",
    wifi: "Wi-Fi",
    cellular: "Datos móviles",
    ethernet: "Ethernet",
    no_connection: "Sin conexión",
    storage: "Almacenamiento",
    storage_free: "{free} libres",
    storage_of: "de {total}",
    focus: "Concentración",
    on: "Activado",
    off: "Desactivado",
    ringer: "Timbre",
    ringer_normal: "Normal",
    ringer_vibrate: "Vibración",
    ringer_silent: "Silencio",
    dnd: "No molestar",
    dnd_priority_only: "Solo prioritarias",
    dnd_total_silence: "Silencio total",
    dnd_alarms_only: "Solo alarmas",
    activity: "Actividad",
    act_stationary: "Quieto",
    act_walking: "Caminando",
    act_running: "Corriendo",
    act_automotive: "Conduciendo",
    act_cycling: "En bicicleta",
    act_unknown: "Desconocida",
    system: "Sistema",
    app_version: "App Companion",
    screen: "Pantalla",
    active: "Activo",
    idle: "Inactivo",
    locked: "Bloqueado",
    unlocked: "Desbloqueado",
    displays: "Pantallas",
    frontmost_app: "App en primer plano",
    camera: "Cámara",
    microphone: "Micrófono",
    in_use: "En uso",
    not_in_use: "Sin uso",
    ring: "Hacer sonar",
    ring_device: "Hacer sonar el dispositivo",
    ring_title: "¿Hacer sonar {name}?",
    ring_text: "Envía una notificación crítica que reproduce un sonido aunque el dispositivo esté en silencio o en un modo de concentración.",
    ring_sent: "Aviso enviado",
    ring_failed: "No se pudo hacer sonar",
    ring_default_message: "Home Assistant está buscando este dispositivo",
    cancel: "Cancelar",
    more_info: "Detalles",
    kind_phone: "Teléfono",
    kind_tablet: "Tableta",
    kind_laptop: "Portátil",
    kind_desktop: "Ordenador",
    kind_car: "Coche",
    kind_watch: "Reloj",
    kind_other: "Dispositivo",
    no_device: "No se encontró ningún dispositivo de la app Home Assistant Companion. Instala la app en un teléfono, tableta u ordenador e inicia sesión en este Home Assistant.",
    unknown_device: "Dispositivo no encontrado",
    no_registry: "Esta tarjeta necesita Home Assistant 2024.8 o posterior.",
    devices: "Dispositivos (todos los de Companion si está vacío)",
    exclude: "Dispositivos excluidos",
    title: "Título (opcional)",
    show_title: "Mostrar título",
    show_subtitle: "Mostrar subtítulo",
    illustration: "Ilustración animada",
    illustration_theme: "Tema de la ilustración",
    theme_auto: "Automático (sol)",
    theme_day: "Día",
    theme_night: "Noche",
    show_location: "Mostrar ubicación",
    show_connection: "Mostrar conexión",
    show_storage: "Mostrar almacenamiento",
    show_status: "Mostrar concentración, timbre y actividad",
    show_system: "Mostrar versiones del sistema y de la app",
    show_computer: "Mostrar detalles del ordenador",
    show_actions: "Mostrar acciones (sonar, detalles)",
    show_names: "Mostrar nombres",
    sort: "Ordenar por",
    sort_name: "Nombre",
    sort_battery: "Batería, la más baja primero",
    sort_last_seen: "Última actualización, la más reciente primero",
    sort_none: "Orden de la lista",
    details: "Detalles de los dispositivos",
    details_auto: "Desplegados con un solo dispositivo",
    details_expanded: "Desplegados",
    details_collapsed: "Plegados",
    low_battery_level: "Nivel de batería baja",
    stale_after: "Aviso «sin ver» tras",
    unit_hours: "horas",
    ring_message: "Mensaje del aviso sonoro",
    language: "Idioma",
    lang_auto: "Automático",
    zoom: "Botón de detalle",
    zoom_helper: "Botón arriba a la derecha que cambia entre la mini tarjeta y la tarjeta completa",
    zoom_in: "Mostrar la tarjeta completa",
    zoom_out: "Mostrar la tarjeta compacta",
  },
  sr: {
    title_devices: "Уређаји",
    n_devices: "Уређаја: {n}",
    pill_ok: "Све је у реду",
    pill_low: "Слаба батерија: {n}",
    pill_stale: "Ван мреже: {n}",
    state_charging: "Пуни се",
    state_full: "Пуна",
    state_not_charging: "Не пуни се",
    state_discharging: "На батерији",
    state_unknown: "Непознато",
    low_battery: "Слаба батерија",
    alert_low: "Слаба батерија: {pct}",
    alert_stale: "Није виђен {time}",
    seen: "виђен {ago}",
    charger_ac: "Мрежни пуњач",
    charger_usb: "USB",
    charger_wireless: "Бежично",
    charger_dock: "Док",
    battery: "Батерија",
    low_power: "Режим уштеде енергије",
    battery_health: "Стање батерије",
    battery_temp: "Температура батерије",
    charge_time: "Пуна за",
    last_seen: "Последње ажурирање",
    never: "Никад",
    location: "Локација",
    home: "Код куће",
    away: "Одсутан",
    connection: "Веза",
    wifi: "Wi-Fi",
    cellular: "Мобилна мрежа",
    ethernet: "Ethernet",
    no_connection: "Нема везе",
    storage: "Складиште",
    storage_free: "Слободно: {free}",
    storage_of: "од {total}",
    focus: "Фокус",
    on: "Укључено",
    off: "Искључено",
    ringer: "Звоно",
    ringer_normal: "Нормално",
    ringer_vibrate: "Вибрација",
    ringer_silent: "Нечујно",
    dnd: "Не узнемиравај",
    dnd_priority_only: "Само приоритетна",
    dnd_total_silence: "Потпуна тишина",
    dnd_alarms_only: "Само аларми",
    activity: "Активност",
    act_stationary: "Мирује",
    act_walking: "Ходање",
    act_running: "Трчање",
    act_automotive: "Вожња",
    act_cycling: "Бицикл",
    act_unknown: "Непозната",
    system: "Систем",
    app_version: "Апликација Companion",
    screen: "Екран",
    active: "Активан",
    idle: "Неактиван",
    locked: "Закључано",
    unlocked: "Откључано",
    displays: "Екрани",
    frontmost_app: "Апликација у првом плану",
    camera: "Камера",
    microphone: "Микрофон",
    in_use: "У употреби",
    not_in_use: "Није у употреби",
    ring: "Позвони",
    ring_device: "Позвони уређај",
    ring_title: "Позвонити {name}?",
    ring_text: "Шаље критично обавештење које пушта звук чак и кад је уређај утишан или у фокусу.",
    ring_sent: "Звоњење послато",
    ring_failed: "Звоњење није успело",
    ring_default_message: "Home Assistant тражи овај уређај",
    cancel: "Откажи",
    more_info: "Детаљи",
    kind_phone: "Телефон",
    kind_tablet: "Таблет",
    kind_laptop: "Лаптоп",
    kind_desktop: "Рачунар",
    kind_car: "Аутомобил",
    kind_watch: "Сат",
    kind_other: "Уређај",
    no_device: "Није пронађен ниједан уређај апликације Home Assistant Companion. Инсталирајте апликацију на телефон, таблет или рачунар и пријавите се на овај Home Assistant.",
    unknown_device: "Уређај није пронађен",
    no_registry: "Ова картица захтева Home Assistant 2024.8 или новији.",
    devices: "Уређаји (сви Companion уређаји ако је празно)",
    exclude: "Изостављени уређаји",
    title: "Наслов (опционо)",
    show_title: "Прикажи наслов",
    show_subtitle: "Прикажи поднаслов",
    illustration: "Анимирана илустрација",
    illustration_theme: "Тема илустрације",
    theme_auto: "Аутоматски (сунце)",
    theme_day: "Дан",
    theme_night: "Ноћ",
    show_location: "Прикажи локацију",
    show_connection: "Прикажи везу",
    show_storage: "Прикажи складиште",
    show_status: "Прикажи фокус, звоно и активност",
    show_system: "Прикажи верзије система и апликације",
    show_computer: "Прикажи детаље рачунара",
    show_actions: "Прикажи радње (позвони, детаљи)",
    show_names: "Прикажи имена",
    sort: "Сортирај по",
    sort_name: "Име",
    sort_battery: "Батерија, најнижа прво",
    sort_last_seen: "Последње ажурирање, најновије прво",
    sort_none: "Редослед листе",
    details: "Детаљи уређаја",
    details_auto: "Расклопљено за један уређај",
    details_expanded: "Расклопљено",
    details_collapsed: "Склопљено",
    low_battery_level: "Ниво слабе батерије",
    stale_after: "Упозорење „није виђен“ после",
    unit_hours: "х",
    ring_message: "Порука звоњења",
    language: "Језик",
    lang_auto: "Аутоматски",
    zoom: "Дугме за детаље",
    zoom_helper: "Дугме горе десно које пребацује између мини картице и пуне картице",
    zoom_in: "Прикажи пуну картицу",
    zoom_out: "Прикажи компактну картицу",
  },
  "sr-Latn": {
    title_devices: "Uređaji",
    n_devices: "Uređaja: {n}",
    pill_ok: "Sve je u redu",
    pill_low: "Slaba baterija: {n}",
    pill_stale: "Van mreže: {n}",
    state_charging: "Puni se",
    state_full: "Puna",
    state_not_charging: "Ne puni se",
    state_discharging: "Na bateriji",
    state_unknown: "Nepoznato",
    low_battery: "Slaba baterija",
    alert_low: "Slaba baterija: {pct}",
    alert_stale: "Nije viđen {time}",
    seen: "viđen {ago}",
    charger_ac: "Mrežni punjač",
    charger_usb: "USB",
    charger_wireless: "Bežično",
    charger_dock: "Dok",
    battery: "Baterija",
    low_power: "Režim uštede energije",
    battery_health: "Stanje baterije",
    battery_temp: "Temperatura baterije",
    charge_time: "Puna za",
    last_seen: "Poslednje ažuriranje",
    never: "Nikad",
    location: "Lokacija",
    home: "Kod kuće",
    away: "Odsutan",
    connection: "Veza",
    wifi: "Wi-Fi",
    cellular: "Mobilna mreža",
    ethernet: "Ethernet",
    no_connection: "Nema veze",
    storage: "Skladište",
    storage_free: "Slobodno: {free}",
    storage_of: "od {total}",
    focus: "Fokus",
    on: "Uključeno",
    off: "Isključeno",
    ringer: "Zvono",
    ringer_normal: "Normalno",
    ringer_vibrate: "Vibracija",
    ringer_silent: "Nečujno",
    dnd: "Ne uznemiravaj",
    dnd_priority_only: "Samo prioritetna",
    dnd_total_silence: "Potpuna tišina",
    dnd_alarms_only: "Samo alarmi",
    activity: "Aktivnost",
    act_stationary: "Miruje",
    act_walking: "Hodanje",
    act_running: "Trčanje",
    act_automotive: "Vožnja",
    act_cycling: "Bicikl",
    act_unknown: "Nepoznata",
    system: "Sistem",
    app_version: "Aplikacija Companion",
    screen: "Ekran",
    active: "Aktivan",
    idle: "Neaktivan",
    locked: "Zaključano",
    unlocked: "Otključano",
    displays: "Ekrani",
    frontmost_app: "Aplikacija u prvom planu",
    camera: "Kamera",
    microphone: "Mikrofon",
    in_use: "U upotrebi",
    not_in_use: "Nije u upotrebi",
    ring: "Pozvoni",
    ring_device: "Pozvoni uređaj",
    ring_title: "Pozvoniti {name}?",
    ring_text: "Šalje kritično obaveštenje koje pušta zvuk čak i kad je uređaj utišan ili u fokusu.",
    ring_sent: "Zvonjenje poslato",
    ring_failed: "Zvonjenje nije uspelo",
    ring_default_message: "Home Assistant traži ovaj uređaj",
    cancel: "Otkaži",
    more_info: "Detalji",
    kind_phone: "Telefon",
    kind_tablet: "Tablet",
    kind_laptop: "Laptop",
    kind_desktop: "Računar",
    kind_car: "Automobil",
    kind_watch: "Sat",
    kind_other: "Uređaj",
    no_device: "Nije pronađen nijedan uređaj aplikacije Home Assistant Companion. Instalirajte aplikaciju na telefon, tablet ili računar i prijavite se na ovaj Home Assistant.",
    unknown_device: "Uređaj nije pronađen",
    no_registry: "Ova kartica zahteva Home Assistant 2024.8 ili noviji.",
    devices: "Uređaji (svi Companion uređaji ako je prazno)",
    exclude: "Izostavljeni uređaji",
    title: "Naslov (opciono)",
    show_title: "Prikaži naslov",
    show_subtitle: "Prikaži podnaslov",
    illustration: "Animirana ilustracija",
    illustration_theme: "Tema ilustracije",
    theme_auto: "Automatski (sunce)",
    theme_day: "Dan",
    theme_night: "Noć",
    show_location: "Prikaži lokaciju",
    show_connection: "Prikaži vezu",
    show_storage: "Prikaži skladište",
    show_status: "Prikaži fokus, zvono i aktivnost",
    show_system: "Prikaži verzije sistema i aplikacije",
    show_computer: "Prikaži detalje računara",
    show_actions: "Prikaži radnje (pozvoni, detalji)",
    show_names: "Prikaži imena",
    sort: "Sortiraj po",
    sort_name: "Ime",
    sort_battery: "Baterija, najniža prvo",
    sort_last_seen: "Poslednje ažuriranje, najnovije prvo",
    sort_none: "Redosled liste",
    details: "Detalji uređaja",
    details_auto: "Rasklopljeno za jedan uređaj",
    details_expanded: "Rasklopljeno",
    details_collapsed: "Sklopljeno",
    low_battery_level: "Nivo slabe baterije",
    stale_after: "Upozorenje „nije viđen“ posle",
    unit_hours: "h",
    ring_message: "Poruka zvonjenja",
    language: "Jezik",
    lang_auto: "Automatski",
    zoom: "Dugme za detalje",
    zoom_helper: "Dugme gore desno koje prebacuje između mini kartice i pune kartice",
    zoom_in: "Prikaži punu karticu",
    zoom_out: "Prikaži kompaktnu karticu",
  },
  it: {
    title_devices: "Dispositivi",
    n_devices: "{n} dispositivi",
    pill_ok: "Tutto a posto",
    pill_low: "{n} scarichi",
    pill_stale: "{n} offline",
    state_charging: "In carica",
    state_full: "Carica",
    state_not_charging: "Non in carica",
    state_discharging: "A batteria",
    state_unknown: "Sconosciuto",
    low_battery: "Batteria scarica",
    alert_low: "Batteria scarica: {pct}",
    alert_stale: "Non visto da {time}",
    seen: "visto {ago}",
    charger_ac: "Caricatore da rete",
    charger_usb: "USB",
    charger_wireless: "Wireless",
    charger_dock: "Base",
    battery: "Batteria",
    low_power: "Modalità risparmio energetico",
    battery_health: "Salute batteria",
    battery_temp: "Temperatura batteria",
    charge_time: "Carica tra",
    last_seen: "Ultimo aggiornamento",
    never: "Mai",
    location: "Posizione",
    home: "Casa",
    away: "Fuori",
    connection: "Connessione",
    wifi: "Wi-Fi",
    cellular: "Rete cellulare",
    ethernet: "Ethernet",
    no_connection: "Nessuna connessione",
    storage: "Archiviazione",
    storage_free: "{free} liberi",
    storage_of: "su {total}",
    focus: "Full immersion",
    on: "Attivo",
    off: "Disattivo",
    ringer: "Suoneria",
    ringer_normal: "Normale",
    ringer_vibrate: "Vibrazione",
    ringer_silent: "Silenzioso",
    dnd: "Non disturbare",
    dnd_priority_only: "Solo priorità",
    dnd_total_silence: "Silenzio totale",
    dnd_alarms_only: "Solo sveglie",
    activity: "Attività",
    act_stationary: "Fermo",
    act_walking: "A piedi",
    act_running: "Corsa",
    act_automotive: "In auto",
    act_cycling: "In bici",
    act_unknown: "Sconosciuta",
    system: "Sistema",
    app_version: "App Companion",
    screen: "Schermo",
    active: "Attivo",
    idle: "Inattivo",
    locked: "Bloccato",
    unlocked: "Sbloccato",
    displays: "Schermi",
    frontmost_app: "App in primo piano",
    camera: "Fotocamera",
    microphone: "Microfono",
    in_use: "In uso",
    not_in_use: "Non in uso",
    ring: "Fai squillare",
    ring_device: "Fai squillare il dispositivo",
    ring_title: "Far squillare {name}?",
    ring_text: "Invia una notifica critica che riproduce un suono anche se il dispositivo è silenzioso o in Full immersion.",
    ring_sent: "Squillo inviato",
    ring_failed: "Impossibile far squillare",
    ring_default_message: "Home Assistant sta cercando questo dispositivo",
    cancel: "Annulla",
    more_info: "Dettagli",
    kind_phone: "Telefono",
    kind_tablet: "Tablet",
    kind_laptop: "Portatile",
    kind_desktop: "Computer",
    kind_car: "Auto",
    kind_watch: "Orologio",
    kind_other: "Dispositivo",
    no_device: "Nessun dispositivo dell'app Home Assistant Companion trovato. Installa l'app su un telefono, un tablet o un computer e accedi a questo Home Assistant.",
    unknown_device: "Dispositivo non trovato",
    no_registry: "Questa scheda richiede Home Assistant 2024.8 o successivo.",
    devices: "Dispositivi (tutti quelli Companion se vuoto)",
    exclude: "Dispositivi esclusi",
    title: "Titolo (facoltativo)",
    show_title: "Mostra titolo",
    show_subtitle: "Mostra sottotitolo",
    illustration: "Illustrazione animata",
    illustration_theme: "Tema dell’illustrazione",
    theme_auto: "Automatico (sole)",
    theme_day: "Giorno",
    theme_night: "Notte",
    show_location: "Mostra posizione",
    show_connection: "Mostra connessione",
    show_storage: "Mostra archiviazione",
    show_status: "Mostra full immersion, suoneria e attività",
    show_system: "Mostra versioni di sistema e app",
    show_computer: "Mostra dettagli del computer",
    show_actions: "Mostra azioni (squillo, dettagli)",
    show_names: "Mostra nomi",
    sort: "Ordina per",
    sort_name: "Nome",
    sort_battery: "Batteria, la più bassa prima",
    sort_last_seen: "Ultimo aggiornamento, il più recente prima",
    sort_none: "Ordine della lista",
    details: "Dettagli dei dispositivi",
    details_auto: "Aperti con un solo dispositivo",
    details_expanded: "Aperti",
    details_collapsed: "Chiusi",
    low_battery_level: "Livello batteria scarica",
    stale_after: "Avviso «non visto» dopo",
    unit_hours: "ore",
    ring_message: "Messaggio dello squillo",
    language: "Lingua",
    lang_auto: "Automatica",
    zoom: "Pulsante dettagli",
    zoom_helper: "Pulsante in alto a destra che passa dalla mini scheda alla scheda completa e viceversa",
    zoom_in: "Mostra la scheda completa",
    zoom_out: "Mostra la scheda compatta",
  },
  nl: {
    title_devices: "Apparaten",
    n_devices: "{n} apparaten",
    pill_ok: "Alles in orde",
    pill_low: "{n} bijna leeg",
    pill_stale: "{n} offline",
    state_charging: "Laadt op",
    state_full: "Vol",
    state_not_charging: "Laadt niet op",
    state_discharging: "Op batterij",
    state_unknown: "Onbekend",
    low_battery: "Batterij bijna leeg",
    alert_low: "Batterij bijna leeg: {pct}",
    alert_stale: "Al {time} niet gezien",
    seen: "gezien {ago}",
    charger_ac: "Netlader",
    charger_usb: "USB",
    charger_wireless: "Draadloos",
    charger_dock: "Dock",
    battery: "Batterij",
    low_power: "Energiebesparingsmodus",
    battery_health: "Batterijconditie",
    battery_temp: "Batterijtemperatuur",
    charge_time: "Vol over",
    last_seen: "Laatste update",
    never: "Nooit",
    location: "Locatie",
    home: "Thuis",
    away: "Afwezig",
    connection: "Verbinding",
    wifi: "Wifi",
    cellular: "Mobiel netwerk",
    ethernet: "Ethernet",
    no_connection: "Geen verbinding",
    storage: "Opslag",
    storage_free: "{free} vrij",
    storage_of: "van {total}",
    focus: "Focus",
    on: "Aan",
    off: "Uit",
    ringer: "Belsignaal",
    ringer_normal: "Normaal",
    ringer_vibrate: "Trillen",
    ringer_silent: "Stil",
    dnd: "Niet storen",
    dnd_priority_only: "Alleen prioriteit",
    dnd_total_silence: "Volledige stilte",
    dnd_alarms_only: "Alleen alarmen",
    activity: "Activiteit",
    act_stationary: "Stilstaand",
    act_walking: "Lopen",
    act_running: "Hardlopen",
    act_automotive: "Autorijden",
    act_cycling: "Fietsen",
    act_unknown: "Onbekend",
    system: "Systeem",
    app_version: "Companion-app",
    screen: "Scherm",
    active: "Actief",
    idle: "Inactief",
    locked: "Vergrendeld",
    unlocked: "Ontgrendeld",
    displays: "Schermen",
    frontmost_app: "App op de voorgrond",
    camera: "Camera",
    microphone: "Microfoon",
    in_use: "In gebruik",
    not_in_use: "Niet in gebruik",
    ring: "Laten rinkelen",
    ring_device: "Apparaat laten rinkelen",
    ring_title: "{name} laten rinkelen?",
    ring_text: "Stuurt een kritieke melding die een geluid afspeelt, ook als het apparaat stil staat of in een focus is.",
    ring_sent: "Rinkelen verstuurd",
    ring_failed: "Rinkelen mislukt",
    ring_default_message: "Home Assistant zoekt dit apparaat",
    cancel: "Annuleren",
    more_info: "Details",
    kind_phone: "Telefoon",
    kind_tablet: "Tablet",
    kind_laptop: "Laptop",
    kind_desktop: "Computer",
    kind_car: "Auto",
    kind_watch: "Horloge",
    kind_other: "Apparaat",
    no_device: "Geen apparaat van de Home Assistant Companion-app gevonden. Installeer de app op een telefoon, tablet of computer en meld je aan bij deze Home Assistant.",
    unknown_device: "Apparaat niet gevonden",
    no_registry: "Deze kaart heeft Home Assistant 2024.8 of nieuwer nodig.",
    devices: "Apparaten (alle Companion-apparaten als leeg)",
    exclude: "Uitgesloten apparaten",
    title: "Titel (optioneel)",
    show_title: "Titel tonen",
    show_subtitle: "Ondertitel tonen",
    illustration: "Geanimeerde illustratie",
    illustration_theme: "Thema van de illustratie",
    theme_auto: "Automatisch (zon)",
    theme_day: "Dag",
    theme_night: "Nacht",
    show_location: "Locatie tonen",
    show_connection: "Verbinding tonen",
    show_storage: "Opslag tonen",
    show_status: "Focus, belsignaal en activiteit tonen",
    show_system: "Systeem- en appversie tonen",
    show_computer: "Computerdetails tonen",
    show_actions: "Acties tonen (rinkelen, details)",
    show_names: "Namen tonen",
    sort: "Sorteren op",
    sort_name: "Naam",
    sort_battery: "Batterij, laagste eerst",
    sort_last_seen: "Laatste update, nieuwste eerst",
    sort_none: "Volgorde van de lijst",
    details: "Apparaatdetails",
    details_auto: "Uitgeklapt bij één apparaat",
    details_expanded: "Uitgeklapt",
    details_collapsed: "Ingeklapt",
    low_battery_level: "Lage batterijniveau",
    stale_after: "'Niet gezien'-waarschuwing na",
    unit_hours: "uur",
    ring_message: "Rinkelbericht",
    language: "Taal",
    lang_auto: "Automatisch",
    zoom: "Detailknop",
    zoom_helper: "Knop rechtsboven die wisselt tussen de minikaart en de volledige kaart",
    zoom_in: "Volledige kaart tonen",
    zoom_out: "Compacte kaart tonen",
  },
  pt: {
    title_devices: "Dispositivos",
    n_devices: "{n} dispositivos",
    pill_ok: "Tudo bem",
    pill_low: "{n} com pouca bateria",
    pill_stale: "{n} offline",
    state_charging: "A carregar",
    state_full: "Cheia",
    state_not_charging: "Não está a carregar",
    state_discharging: "Em bateria",
    state_unknown: "Desconhecido",
    low_battery: "Bateria fraca",
    alert_low: "Bateria fraca: {pct}",
    alert_stale: "Não visto há {time}",
    seen: "visto {ago}",
    charger_ac: "Carregador de corrente",
    charger_usb: "USB",
    charger_wireless: "Sem fios",
    charger_dock: "Base",
    battery: "Bateria",
    low_power: "Modo de poupança de energia",
    battery_health: "Estado da bateria",
    battery_temp: "Temperatura da bateria",
    charge_time: "Cheia dentro de",
    last_seen: "Última atualização",
    never: "Nunca",
    location: "Localização",
    home: "Casa",
    away: "Fora",
    connection: "Ligação",
    wifi: "Wi-Fi",
    cellular: "Rede móvel",
    ethernet: "Ethernet",
    no_connection: "Sem ligação",
    storage: "Armazenamento",
    storage_free: "{free} livres",
    storage_of: "de {total}",
    focus: "Foco",
    on: "Ligado",
    off: "Desligado",
    ringer: "Toque",
    ringer_normal: "Normal",
    ringer_vibrate: "Vibrar",
    ringer_silent: "Silêncio",
    dnd: "Não incomodar",
    dnd_priority_only: "Só prioritárias",
    dnd_total_silence: "Silêncio total",
    dnd_alarms_only: "Só alarmes",
    activity: "Atividade",
    act_stationary: "Parado",
    act_walking: "A andar",
    act_running: "A correr",
    act_automotive: "A conduzir",
    act_cycling: "De bicicleta",
    act_unknown: "Desconhecida",
    system: "Sistema",
    app_version: "App Companion",
    screen: "Ecrã",
    active: "Ativo",
    idle: "Inativo",
    locked: "Bloqueado",
    unlocked: "Desbloqueado",
    displays: "Ecrãs",
    frontmost_app: "App em primeiro plano",
    camera: "Câmara",
    microphone: "Microfone",
    in_use: "Em uso",
    not_in_use: "Sem uso",
    ring: "Fazer tocar",
    ring_device: "Fazer tocar o dispositivo",
    ring_title: "Fazer tocar {name}?",
    ring_text: "Envia uma notificação crítica que reproduz um som mesmo com o dispositivo em silêncio ou num modo Foco.",
    ring_sent: "Toque enviado",
    ring_failed: "Não foi possível fazer tocar",
    ring_default_message: "O Home Assistant está à procura deste dispositivo",
    cancel: "Cancelar",
    more_info: "Detalhes",
    kind_phone: "Telemóvel",
    kind_tablet: "Tablet",
    kind_laptop: "Portátil",
    kind_desktop: "Computador",
    kind_car: "Carro",
    kind_watch: "Relógio",
    kind_other: "Dispositivo",
    no_device: "Nenhum dispositivo da app Home Assistant Companion encontrado. Instale a app num telemóvel, tablet ou computador e inicie sessão neste Home Assistant.",
    unknown_device: "Dispositivo não encontrado",
    no_registry: "Este cartão precisa do Home Assistant 2024.8 ou mais recente.",
    devices: "Dispositivos (todos os da Companion se vazio)",
    exclude: "Dispositivos excluídos",
    title: "Título (opcional)",
    show_title: "Mostrar título",
    show_subtitle: "Mostrar subtítulo",
    illustration: "Ilustração animada",
    illustration_theme: "Tema da ilustração",
    theme_auto: "Automático (sol)",
    theme_day: "Dia",
    theme_night: "Noite",
    show_location: "Mostrar localização",
    show_connection: "Mostrar ligação",
    show_storage: "Mostrar armazenamento",
    show_status: "Mostrar foco, toque e atividade",
    show_system: "Mostrar versões do sistema e da app",
    show_computer: "Mostrar detalhes do computador",
    show_actions: "Mostrar ações (tocar, detalhes)",
    show_names: "Mostrar nomes",
    sort: "Ordenar por",
    sort_name: "Nome",
    sort_battery: "Bateria, a mais baixa primeiro",
    sort_last_seen: "Última atualização, a mais recente primeiro",
    sort_none: "Ordem da lista",
    details: "Detalhes dos dispositivos",
    details_auto: "Abertos com um só dispositivo",
    details_expanded: "Abertos",
    details_collapsed: "Fechados",
    low_battery_level: "Nível de bateria fraca",
    stale_after: "Aviso «não visto» após",
    unit_hours: "horas",
    ring_message: "Mensagem do toque",
    language: "Idioma",
    lang_auto: "Automático",
    zoom: "Botão de detalhe",
    zoom_helper: "Botão no canto superior direito que alterna entre o mini cartão e o cartão completo",
    zoom_in: "Mostrar o cartão completo",
    zoom_out: "Mostrar o cartão compacto",
  },
  pl: {
    title_devices: "Urządzenia",
    n_devices: "Urządzenia: {n}",
    pill_ok: "Wszystko w porządku",
    pill_low: "Słaba bateria: {n}",
    pill_stale: "Offline: {n}",
    state_charging: "Ładowanie",
    state_full: "Pełna",
    state_not_charging: "Nie ładuje",
    state_discharging: "Na baterii",
    state_unknown: "Nieznany",
    low_battery: "Słaba bateria",
    alert_low: "Słaba bateria: {pct}",
    alert_stale: "Niewidziane od {time}",
    seen: "widziane {ago}",
    charger_ac: "Ładowarka sieciowa",
    charger_usb: "USB",
    charger_wireless: "Bezprzewodowo",
    charger_dock: "Stacja dokująca",
    battery: "Bateria",
    low_power: "Tryb niskiego zużycia energii",
    battery_health: "Kondycja baterii",
    battery_temp: "Temperatura baterii",
    charge_time: "Pełna za",
    last_seen: "Ostatnia aktualizacja",
    never: "Nigdy",
    location: "Lokalizacja",
    home: "Dom",
    away: "Poza domem",
    connection: "Połączenie",
    wifi: "Wi-Fi",
    cellular: "Sieć komórkowa",
    ethernet: "Ethernet",
    no_connection: "Brak połączenia",
    storage: "Pamięć",
    storage_free: "Wolne: {free}",
    storage_of: "z {total}",
    focus: "Skupienie",
    on: "Włączone",
    off: "Wyłączone",
    ringer: "Dzwonek",
    ringer_normal: "Normalny",
    ringer_vibrate: "Wibracje",
    ringer_silent: "Wyciszony",
    dnd: "Nie przeszkadzać",
    dnd_priority_only: "Tylko priorytetowe",
    dnd_total_silence: "Całkowita cisza",
    dnd_alarms_only: "Tylko alarmy",
    activity: "Aktywność",
    act_stationary: "Bez ruchu",
    act_walking: "Chód",
    act_running: "Bieg",
    act_automotive: "Jazda samochodem",
    act_cycling: "Jazda na rowerze",
    act_unknown: "Nieznana",
    system: "System",
    app_version: "Aplikacja Companion",
    screen: "Ekran",
    active: "Aktywny",
    idle: "Bezczynny",
    locked: "Zablokowane",
    unlocked: "Odblokowane",
    displays: "Ekrany",
    frontmost_app: "Aplikacja na pierwszym planie",
    camera: "Kamera",
    microphone: "Mikrofon",
    in_use: "W użyciu",
    not_in_use: "Nieużywany",
    ring: "Zadzwoń",
    ring_device: "Zadzwoń na urządzenie",
    ring_title: "Zadzwonić na {name}?",
    ring_text: "Wysyła krytyczne powiadomienie, które odtwarza dźwięk, nawet gdy urządzenie jest wyciszone lub w trybie skupienia.",
    ring_sent: "Wysłano dzwonek",
    ring_failed: "Nie udało się zadzwonić",
    ring_default_message: "Home Assistant szuka tego urządzenia",
    cancel: "Anuluj",
    more_info: "Szczegóły",
    kind_phone: "Telefon",
    kind_tablet: "Tablet",
    kind_laptop: "Laptop",
    kind_desktop: "Komputer",
    kind_car: "Samochód",
    kind_watch: "Zegarek",
    kind_other: "Urządzenie",
    no_device: "Nie znaleziono urządzenia aplikacji Home Assistant Companion. Zainstaluj aplikację na telefonie, tablecie lub komputerze i zaloguj się do tego Home Assistant.",
    unknown_device: "Nie znaleziono urządzenia",
    no_registry: "Ta karta wymaga Home Assistant 2024.8 lub nowszego.",
    devices: "Urządzenia (wszystkie urządzenia Companion, gdy puste)",
    exclude: "Pominięte urządzenia",
    title: "Tytuł (opcjonalny)",
    show_title: "Pokaż tytuł",
    show_subtitle: "Pokaż podtytuł",
    illustration: "Animowana ilustracja",
    illustration_theme: "Motyw ilustracji",
    theme_auto: "Automatycznie (słońce)",
    theme_day: "Dzień",
    theme_night: "Noc",
    show_location: "Pokaż lokalizację",
    show_connection: "Pokaż połączenie",
    show_storage: "Pokaż pamięć",
    show_status: "Pokaż skupienie, dzwonek i aktywność",
    show_system: "Pokaż wersje systemu i aplikacji",
    show_computer: "Pokaż szczegóły komputera",
    show_actions: "Pokaż akcje (dzwonek, szczegóły)",
    show_names: "Pokaż nazwy",
    sort: "Sortuj według",
    sort_name: "Nazwa",
    sort_battery: "Bateria, najniższa najpierw",
    sort_last_seen: "Ostatnia aktualizacja, najnowsza najpierw",
    sort_none: "Kolejność listy",
    details: "Szczegóły urządzeń",
    details_auto: "Rozwinięte dla jednego urządzenia",
    details_expanded: "Rozwinięte",
    details_collapsed: "Zwinięte",
    low_battery_level: "Poziom słabej baterii",
    stale_after: "Ostrzeżenie „niewidziane” po",
    unit_hours: "godz.",
    ring_message: "Wiadomość dzwonka",
    language: "Język",
    lang_auto: "Automatyczny",
    zoom: "Przycisk szczegółów",
    zoom_helper: "Przycisk w prawym górnym rogu przełączający między mini kartą a pełną kartą",
    zoom_in: "Pokaż pełną kartę",
    zoom_out: "Pokaż kompaktową kartę",
  },
  ro: {
    title_devices: "Dispozitive",
    n_devices: "{n} dispozitive",
    pill_ok: "Totul e în regulă",
    pill_low: "{n} descărcate",
    pill_stale: "{n} offline",
    state_charging: "Se încarcă",
    state_full: "Plină",
    state_not_charging: "Nu se încarcă",
    state_discharging: "Pe baterie",
    state_unknown: "Necunoscut",
    low_battery: "Baterie descărcată",
    alert_low: "Baterie descărcată: {pct}",
    alert_stale: "Nevăzut de {time}",
    seen: "văzut {ago}",
    charger_ac: "Încărcător de priză",
    charger_usb: "USB",
    charger_wireless: "Wireless",
    charger_dock: "Stație de andocare",
    battery: "Baterie",
    low_power: "Mod de economisire a energiei",
    battery_health: "Starea bateriei",
    battery_temp: "Temperatura bateriei",
    charge_time: "Plină în",
    last_seen: "Ultima actualizare",
    never: "Niciodată",
    location: "Locație",
    home: "Acasă",
    away: "Plecat",
    connection: "Conexiune",
    wifi: "Wi-Fi",
    cellular: "Rețea mobilă",
    ethernet: "Ethernet",
    no_connection: "Fără conexiune",
    storage: "Stocare",
    storage_free: "{free} libere",
    storage_of: "din {total}",
    focus: "Concentrare",
    on: "Activat",
    off: "Dezactivat",
    ringer: "Sonerie",
    ringer_normal: "Normală",
    ringer_vibrate: "Vibrații",
    ringer_silent: "Silențios",
    dnd: "Nu deranja",
    dnd_priority_only: "Doar prioritare",
    dnd_total_silence: "Liniște totală",
    dnd_alarms_only: "Doar alarme",
    activity: "Activitate",
    act_stationary: "Staționar",
    act_walking: "Mers",
    act_running: "Alergare",
    act_automotive: "La volan",
    act_cycling: "Bicicletă",
    act_unknown: "Necunoscută",
    system: "Sistem",
    app_version: "Aplicația Companion",
    screen: "Ecran",
    active: "Activ",
    idle: "Inactiv",
    locked: "Blocat",
    unlocked: "Deblocat",
    displays: "Ecrane",
    frontmost_app: "Aplicația din prim-plan",
    camera: "Cameră",
    microphone: "Microfon",
    in_use: "În uz",
    not_in_use: "Nefolosit",
    ring: "Sună",
    ring_device: "Sună dispozitivul",
    ring_title: "Suni {name}?",
    ring_text: "Trimite o notificare critică ce redă un sunet chiar dacă dispozitivul este pe silențios sau în modul Concentrare.",
    ring_sent: "Apel trimis",
    ring_failed: "Nu s-a putut suna",
    ring_default_message: "Home Assistant caută acest dispozitiv",
    cancel: "Anulează",
    more_info: "Detalii",
    kind_phone: "Telefon",
    kind_tablet: "Tabletă",
    kind_laptop: "Laptop",
    kind_desktop: "Computer",
    kind_car: "Mașină",
    kind_watch: "Ceas",
    kind_other: "Dispozitiv",
    no_device: "Niciun dispozitiv al aplicației Home Assistant Companion găsit. Instalați aplicația pe un telefon, o tabletă sau un computer și conectați-vă la acest Home Assistant.",
    unknown_device: "Dispozitiv negăsit",
    no_registry: "Acest card necesită Home Assistant 2024.8 sau mai nou.",
    devices: "Dispozitive (toate dispozitivele Companion dacă e gol)",
    exclude: "Dispozitive excluse",
    title: "Titlu (opțional)",
    show_title: "Afișează titlul",
    show_subtitle: "Afișează subtitlul",
    illustration: "Ilustrație animată",
    illustration_theme: "Tema ilustrației",
    theme_auto: "Automat (soare)",
    theme_day: "Zi",
    theme_night: "Noapte",
    show_location: "Afișează locația",
    show_connection: "Afișează conexiunea",
    show_storage: "Afișează stocarea",
    show_status: "Afișează concentrarea, soneria și activitatea",
    show_system: "Afișează versiunile sistemului și aplicației",
    show_computer: "Afișează detaliile computerului",
    show_actions: "Afișează acțiunile (sună, detalii)",
    show_names: "Afișează numele",
    sort: "Sortează după",
    sort_name: "Nume",
    sort_battery: "Baterie, cea mai mică întâi",
    sort_last_seen: "Ultima actualizare, cea mai recentă întâi",
    sort_none: "Ordinea listei",
    details: "Detaliile dispozitivelor",
    details_auto: "Desfăcute pentru un singur dispozitiv",
    details_expanded: "Desfăcute",
    details_collapsed: "Pliate",
    low_battery_level: "Nivel baterie descărcată",
    stale_after: "Avertizare „nevăzut” după",
    unit_hours: "ore",
    ring_message: "Mesajul apelului",
    language: "Limbă",
    lang_auto: "Automat",
    zoom: "Buton de detaliu",
    zoom_helper: "Buton din dreapta sus care comută între mini cardul și cardul complet",
    zoom_in: "Afișează cardul complet",
    zoom_out: "Afișează cardul compact",
  },
  da: {
    title_devices: "Enheder",
    n_devices: "{n} enheder",
    pill_ok: "Alt er fint",
    pill_low: "{n} lave",
    pill_stale: "{n} offline",
    state_charging: "Oplader",
    state_full: "Fuld",
    state_not_charging: "Oplader ikke",
    state_discharging: "På batteri",
    state_unknown: "Ukendt",
    low_battery: "Lavt batteri",
    alert_low: "Lavt batteri: {pct}",
    alert_stale: "Ikke set i {time}",
    seen: "set {ago}",
    charger_ac: "Strømadapter",
    charger_usb: "USB",
    charger_wireless: "Trådløs",
    charger_dock: "Dock",
    battery: "Batteri",
    low_power: "Strømsparetilstand",
    battery_health: "Batteritilstand",
    battery_temp: "Batteritemperatur",
    charge_time: "Fuld om",
    last_seen: "Seneste opdatering",
    never: "Aldrig",
    location: "Placering",
    home: "Hjemme",
    away: "Ude",
    connection: "Forbindelse",
    wifi: "Wi-Fi",
    cellular: "Mobilnetværk",
    ethernet: "Ethernet",
    no_connection: "Ingen forbindelse",
    storage: "Lagerplads",
    storage_free: "{free} ledig",
    storage_of: "af {total}",
    focus: "Fokus",
    on: "Til",
    off: "Fra",
    ringer: "Ringetone",
    ringer_normal: "Normal",
    ringer_vibrate: "Vibrer",
    ringer_silent: "Lydløs",
    dnd: "Forstyr ikke",
    dnd_priority_only: "Kun prioritet",
    dnd_total_silence: "Total stilhed",
    dnd_alarms_only: "Kun alarmer",
    activity: "Aktivitet",
    act_stationary: "Stillestående",
    act_walking: "Går",
    act_running: "Løber",
    act_automotive: "Kører bil",
    act_cycling: "Cykler",
    act_unknown: "Ukendt",
    system: "System",
    app_version: "Companion-app",
    screen: "Skærm",
    active: "Aktiv",
    idle: "Inaktiv",
    locked: "Låst",
    unlocked: "Låst op",
    displays: "Skærme",
    frontmost_app: "App i forgrunden",
    camera: "Kamera",
    microphone: "Mikrofon",
    in_use: "I brug",
    not_in_use: "Ikke i brug",
    ring: "Ring",
    ring_device: "Ring til enheden",
    ring_title: "Ring til {name}?",
    ring_text: "Sender en kritisk notifikation, der afspiller en lyd, selv når enheden er lydløs eller i et fokus.",
    ring_sent: "Ringning sendt",
    ring_failed: "Kunne ikke ringe",
    ring_default_message: "Home Assistant leder efter denne enhed",
    cancel: "Annuller",
    more_info: "Detaljer",
    kind_phone: "Telefon",
    kind_tablet: "Tablet",
    kind_laptop: "Bærbar",
    kind_desktop: "Computer",
    kind_car: "Bil",
    kind_watch: "Ur",
    kind_other: "Enhed",
    no_device: "Ingen enhed fra Home Assistant Companion-appen fundet. Installer appen på en telefon, tablet eller computer, og log ind på denne Home Assistant.",
    unknown_device: "Enhed ikke fundet",
    no_registry: "Dette kort kræver Home Assistant 2024.8 eller nyere.",
    devices: "Enheder (alle Companion-enheder, når tom)",
    exclude: "Udeladte enheder",
    title: "Titel (valgfri)",
    show_title: "Vis titel",
    show_subtitle: "Vis undertitel",
    illustration: "Animeret illustration",
    illustration_theme: "Illustrationens tema",
    theme_auto: "Automatisk (sol)",
    theme_day: "Dag",
    theme_night: "Nat",
    show_location: "Vis placering",
    show_connection: "Vis forbindelse",
    show_storage: "Vis lagerplads",
    show_status: "Vis fokus, ringetone og aktivitet",
    show_system: "Vis system- og appversion",
    show_computer: "Vis computerdetaljer",
    show_actions: "Vis handlinger (ring, detaljer)",
    show_names: "Vis navne",
    sort: "Sorter efter",
    sort_name: "Navn",
    sort_battery: "Batteri, laveste først",
    sort_last_seen: "Seneste opdatering, nyeste først",
    sort_none: "Listens rækkefølge",
    details: "Enhedsdetaljer",
    details_auto: "Foldet ud for én enhed",
    details_expanded: "Foldet ud",
    details_collapsed: "Foldet sammen",
    low_battery_level: "Lavt batteriniveau",
    stale_after: "\"Ikke set\"-advarsel efter",
    unit_hours: "timer",
    ring_message: "Ringebesked",
    language: "Sprog",
    lang_auto: "Automatisk",
    zoom: "Detaljeknap",
    zoom_helper: "Knap øverst til højre, der skifter mellem minikortet og det fulde kort",
    zoom_in: "Vis det fulde kort",
    zoom_out: "Vis det kompakte kort",
  },
  sv: {
    title_devices: "Enheter",
    n_devices: "{n} enheter",
    pill_ok: "Allt är bra",
    pill_low: "{n} låga",
    pill_stale: "{n} offline",
    state_charging: "Laddar",
    state_full: "Fullt",
    state_not_charging: "Laddar inte",
    state_discharging: "På batteri",
    state_unknown: "Okänt",
    low_battery: "Lågt batteri",
    alert_low: "Lågt batteri: {pct}",
    alert_stale: "Inte sedd på {time}",
    seen: "sedd {ago}",
    charger_ac: "Nätladdare",
    charger_usb: "USB",
    charger_wireless: "Trådlös",
    charger_dock: "Docka",
    battery: "Batteri",
    low_power: "Strömsparläge",
    battery_health: "Batterihälsa",
    battery_temp: "Batteritemperatur",
    charge_time: "Fullt om",
    last_seen: "Senaste uppdatering",
    never: "Aldrig",
    location: "Plats",
    home: "Hemma",
    away: "Borta",
    connection: "Anslutning",
    wifi: "Wi-Fi",
    cellular: "Mobilnät",
    ethernet: "Ethernet",
    no_connection: "Ingen anslutning",
    storage: "Lagring",
    storage_free: "{free} ledigt",
    storage_of: "av {total}",
    focus: "Fokus",
    on: "På",
    off: "Av",
    ringer: "Ringsignal",
    ringer_normal: "Normal",
    ringer_vibrate: "Vibration",
    ringer_silent: "Ljudlös",
    dnd: "Stör ej",
    dnd_priority_only: "Endast prioritet",
    dnd_total_silence: "Total tystnad",
    dnd_alarms_only: "Endast alarm",
    activity: "Aktivitet",
    act_stationary: "Stillastående",
    act_walking: "Går",
    act_running: "Springer",
    act_automotive: "Kör bil",
    act_cycling: "Cyklar",
    act_unknown: "Okänd",
    system: "System",
    app_version: "Companion-appen",
    screen: "Skärm",
    active: "Aktiv",
    idle: "Inaktiv",
    locked: "Låst",
    unlocked: "Upplåst",
    displays: "Skärmar",
    frontmost_app: "App i förgrunden",
    camera: "Kamera",
    microphone: "Mikrofon",
    in_use: "Används",
    not_in_use: "Används inte",
    ring: "Ring",
    ring_device: "Ring enheten",
    ring_title: "Ringa {name}?",
    ring_text: "Skickar en kritisk notis som spelar upp ett ljud även när enheten är ljudlös eller i ett fokus.",
    ring_sent: "Ringning skickad",
    ring_failed: "Kunde inte ringa",
    ring_default_message: "Home Assistant letar efter den här enheten",
    cancel: "Avbryt",
    more_info: "Detaljer",
    kind_phone: "Telefon",
    kind_tablet: "Surfplatta",
    kind_laptop: "Bärbar dator",
    kind_desktop: "Dator",
    kind_car: "Bil",
    kind_watch: "Klocka",
    kind_other: "Enhet",
    no_device: "Ingen enhet från Home Assistant Companion-appen hittades. Installera appen på en telefon, surfplatta eller dator och logga in på denna Home Assistant.",
    unknown_device: "Enheten hittades inte",
    no_registry: "Det här kortet kräver Home Assistant 2024.8 eller senare.",
    devices: "Enheter (alla Companion-enheter om tomt)",
    exclude: "Uteslutna enheter",
    title: "Titel (valfri)",
    show_title: "Visa titel",
    show_subtitle: "Visa undertitel",
    illustration: "Animerad illustration",
    illustration_theme: "Illustrationens tema",
    theme_auto: "Automatiskt (sol)",
    theme_day: "Dag",
    theme_night: "Natt",
    show_location: "Visa plats",
    show_connection: "Visa anslutning",
    show_storage: "Visa lagring",
    show_status: "Visa fokus, ringsignal och aktivitet",
    show_system: "Visa system- och appversion",
    show_computer: "Visa datordetaljer",
    show_actions: "Visa åtgärder (ring, detaljer)",
    show_names: "Visa namn",
    sort: "Sortera efter",
    sort_name: "Namn",
    sort_battery: "Batteri, lägst först",
    sort_last_seen: "Senaste uppdatering, nyast först",
    sort_none: "Listans ordning",
    details: "Enhetsdetaljer",
    details_auto: "Utfällda för en enda enhet",
    details_expanded: "Utfällda",
    details_collapsed: "Infällda",
    low_battery_level: "Låg batterinivå",
    stale_after: "Varning \"inte sedd\" efter",
    unit_hours: "timmar",
    ring_message: "Ringmeddelande",
    language: "Språk",
    lang_auto: "Automatiskt",
    zoom: "Detaljknapp",
    zoom_helper: "Knapp uppe till höger som växlar mellan minikortet och hela kortet",
    zoom_in: "Visa hela kortet",
    zoom_out: "Visa det kompakta kortet",
  },
  bg: {
    title_devices: "Устройства",
    n_devices: "Устройства: {n}",
    pill_ok: "Всичко е наред",
    pill_low: "Изтощени: {n}",
    pill_stale: "Офлайн: {n}",
    state_charging: "Зарежда се",
    state_full: "Пълна",
    state_not_charging: "Не се зарежда",
    state_discharging: "На батерия",
    state_unknown: "Неизвестно",
    low_battery: "Слаба батерия",
    alert_low: "Слаба батерия: {pct}",
    alert_stale: "Невидяно от {time}",
    seen: "видяно {ago}",
    charger_ac: "Мрежово зарядно",
    charger_usb: "USB",
    charger_wireless: "Безжично",
    charger_dock: "Докинг станция",
    battery: "Батерия",
    low_power: "Режим за пестене на енергия",
    battery_health: "Състояние на батерията",
    battery_temp: "Температура на батерията",
    charge_time: "Пълна след",
    last_seen: "Последна актуализация",
    never: "Никога",
    location: "Местоположение",
    home: "Вкъщи",
    away: "Навън",
    connection: "Връзка",
    wifi: "Wi-Fi",
    cellular: "Мобилна мрежа",
    ethernet: "Ethernet",
    no_connection: "Няма връзка",
    storage: "Хранилище",
    storage_free: "Свободни {free}",
    storage_of: "от {total}",
    focus: "Фокус",
    on: "Вкл.",
    off: "Изкл.",
    ringer: "Звънене",
    ringer_normal: "Нормално",
    ringer_vibrate: "Вибрация",
    ringer_silent: "Без звук",
    dnd: "Не безпокойте",
    dnd_priority_only: "Само приоритетни",
    dnd_total_silence: "Пълна тишина",
    dnd_alarms_only: "Само аларми",
    activity: "Активност",
    act_stationary: "Неподвижно",
    act_walking: "Ходене",
    act_running: "Бягане",
    act_automotive: "Шофиране",
    act_cycling: "Колоездене",
    act_unknown: "Неизвестна",
    system: "Система",
    app_version: "Приложение Companion",
    screen: "Екран",
    active: "Активен",
    idle: "Неактивен",
    locked: "Заключено",
    unlocked: "Отключено",
    displays: "Дисплеи",
    frontmost_app: "Приложение на преден план",
    camera: "Камера",
    microphone: "Микрофон",
    in_use: "Използва се",
    not_in_use: "Не се използва",
    ring: "Позвъни",
    ring_device: "Позвъни на устройството",
    ring_title: "Да позвъня ли на {name}?",
    ring_text: "Изпраща критично известие, което пуска звук дори когато устройството е без звук или във фокус.",
    ring_sent: "Звъненето е изпратено",
    ring_failed: "Неуспешно позвъняване",
    ring_default_message: "Home Assistant търси това устройство",
    cancel: "Отказ",
    more_info: "Подробности",
    kind_phone: "Телефон",
    kind_tablet: "Таблет",
    kind_laptop: "Лаптоп",
    kind_desktop: "Компютър",
    kind_car: "Автомобил",
    kind_watch: "Часовник",
    kind_other: "Устройство",
    no_device: "Не е намерено устройство на приложението Home Assistant Companion. Инсталирайте приложението на телефон, таблет или компютър и влезте в този Home Assistant.",
    unknown_device: "Устройството не е намерено",
    no_registry: "Тази карта изисква Home Assistant 2024.8 или по-нов.",
    devices: "Устройства (всички устройства Companion, ако е празно)",
    exclude: "Изключени устройства",
    title: "Заглавие (по избор)",
    show_title: "Показване на заглавието",
    show_subtitle: "Показване на подзаглавието",
    illustration: "Анимирана илюстрация",
    illustration_theme: "Тема на илюстрацията",
    theme_auto: "Автоматично (слънце)",
    theme_day: "Ден",
    theme_night: "Нощ",
    show_location: "Показване на местоположението",
    show_connection: "Показване на връзката",
    show_storage: "Показване на хранилището",
    show_status: "Показване на фокус, звънене и активност",
    show_system: "Показване на версиите на системата и приложението",
    show_computer: "Показване на данни за компютъра",
    show_actions: "Показване на действия (позвъни, подробности)",
    show_names: "Показване на имената",
    sort: "Сортиране по",
    sort_name: "Име",
    sort_battery: "Батерия, първо най-ниската",
    sort_last_seen: "Последна актуализация, първо най-новата",
    sort_none: "Ред на списъка",
    details: "Подробности за устройствата",
    details_auto: "Разгънати при едно устройство",
    details_expanded: "Разгънати",
    details_collapsed: "Сгънати",
    low_battery_level: "Ниво на слаба батерия",
    stale_after: "Предупреждение „невидяно“ след",
    unit_hours: "ч",
    ring_message: "Съобщение при звънене",
    language: "Език",
    lang_auto: "Автоматично",
    zoom: "Бутон за подробности",
    zoom_helper: "Бутон горе вдясно, който превключва между мини картата и пълната карта",
    zoom_in: "Показване на пълната карта",
    zoom_out: "Показване на компактната карта",
  },
  ru: {
    title_devices: "Устройства",
    n_devices: "Устройств: {n}",
    pill_ok: "Всё в порядке",
    pill_low: "Разряжены: {n}",
    pill_stale: "Не в сети: {n}",
    state_charging: "Заряжается",
    state_full: "Заряжен",
    state_not_charging: "Не заряжается",
    state_discharging: "От батареи",
    state_unknown: "Неизвестно",
    low_battery: "Низкий заряд",
    alert_low: "Низкий заряд: {pct}",
    alert_stale: "Не на связи {time}",
    seen: "был в сети {ago}",
    charger_ac: "Сетевое зарядное",
    charger_usb: "USB",
    charger_wireless: "Беспроводная",
    charger_dock: "Док-станция",
    battery: "Батарея",
    low_power: "Режим энергосбережения",
    battery_health: "Состояние батареи",
    battery_temp: "Температура батареи",
    charge_time: "Полный заряд через",
    last_seen: "Последнее обновление",
    never: "Никогда",
    location: "Местоположение",
    home: "Дома",
    away: "Не дома",
    connection: "Подключение",
    wifi: "Wi-Fi",
    cellular: "Сотовая сеть",
    ethernet: "Ethernet",
    no_connection: "Нет подключения",
    storage: "Хранилище",
    storage_free: "Свободно {free}",
    storage_of: "из {total}",
    focus: "Фокусирование",
    on: "Вкл.",
    off: "Выкл.",
    ringer: "Звонок",
    ringer_normal: "Обычный",
    ringer_vibrate: "Вибрация",
    ringer_silent: "Без звука",
    dnd: "Не беспокоить",
    dnd_priority_only: "Только важные",
    dnd_total_silence: "Полная тишина",
    dnd_alarms_only: "Только будильники",
    activity: "Активность",
    act_stationary: "Неподвижно",
    act_walking: "Ходьба",
    act_running: "Бег",
    act_automotive: "За рулём",
    act_cycling: "Велосипед",
    act_unknown: "Неизвестно",
    system: "Система",
    app_version: "Приложение Companion",
    screen: "Экран",
    active: "Активен",
    idle: "Бездействует",
    locked: "Заблокировано",
    unlocked: "Разблокировано",
    displays: "Дисплеи",
    frontmost_app: "Активное приложение",
    camera: "Камера",
    microphone: "Микрофон",
    in_use: "Используется",
    not_in_use: "Не используется",
    ring: "Позвонить",
    ring_device: "Позвонить на устройство",
    ring_title: "Позвонить на {name}?",
    ring_text: "Отправляет критическое уведомление со звуком, даже если устройство в беззвучном режиме или в режиме фокусирования.",
    ring_sent: "Сигнал отправлен",
    ring_failed: "Не удалось позвонить",
    ring_default_message: "Home Assistant ищет это устройство",
    cancel: "Отмена",
    more_info: "Подробнее",
    kind_phone: "Телефон",
    kind_tablet: "Планшет",
    kind_laptop: "Ноутбук",
    kind_desktop: "Компьютер",
    kind_car: "Автомобиль",
    kind_watch: "Часы",
    kind_other: "Устройство",
    no_device: "Устройства приложения Home Assistant Companion не найдены. Установите приложение на телефон, планшет или компьютер и войдите в этот Home Assistant.",
    unknown_device: "Устройство не найдено",
    no_registry: "Для этой карточки нужен Home Assistant 2024.8 или новее.",
    devices: "Устройства (все устройства Companion, если пусто)",
    exclude: "Исключённые устройства",
    title: "Заголовок (необязательно)",
    show_title: "Показывать заголовок",
    show_subtitle: "Показывать подзаголовок",
    illustration: "Анимированная иллюстрация",
    illustration_theme: "Тема иллюстрации",
    theme_auto: "Автоматически (солнце)",
    theme_day: "День",
    theme_night: "Ночь",
    show_location: "Показывать местоположение",
    show_connection: "Показывать подключение",
    show_storage: "Показывать хранилище",
    show_status: "Показывать фокусирование, звонок и активность",
    show_system: "Показывать версии системы и приложения",
    show_computer: "Показывать данные компьютера",
    show_actions: "Показывать действия (позвонить, подробнее)",
    show_names: "Показывать имена",
    sort: "Сортировать по",
    sort_name: "Имя",
    sort_battery: "Заряд, сначала низкий",
    sort_last_seen: "Последнее обновление, сначала новое",
    sort_none: "Порядок списка",
    details: "Сведения об устройствах",
    details_auto: "Развёрнуты для одного устройства",
    details_expanded: "Развёрнуты",
    details_collapsed: "Свёрнуты",
    low_battery_level: "Уровень низкого заряда",
    stale_after: "Предупреждение «не на связи» через",
    unit_hours: "ч",
    ring_message: "Текст сигнала",
    language: "Язык",
    lang_auto: "Автоматически",
    zoom: "Кнопка подробностей",
    zoom_helper: "Кнопка в правом верхнем углу, переключающая мини-карточку на полную и обратно",
    zoom_in: "Показать полную карточку",
    zoom_out: "Показать компактную карточку",
  },
  uk: {
    title_devices: "Пристрої",
    n_devices: "Пристроїв: {n}",
    pill_ok: "Усе гаразд",
    pill_low: "Розряджені: {n}",
    pill_stale: "Не в мережі: {n}",
    state_charging: "Заряджається",
    state_full: "Заряджено",
    state_not_charging: "Не заряджається",
    state_discharging: "Від батареї",
    state_unknown: "Невідомо",
    low_battery: "Низький заряд",
    alert_low: "Низький заряд: {pct}",
    alert_stale: "Не на зв'язку {time}",
    seen: "був у мережі {ago}",
    charger_ac: "Мережевий зарядний пристрій",
    charger_usb: "USB",
    charger_wireless: "Бездротова",
    charger_dock: "Док-станція",
    battery: "Батарея",
    low_power: "Режим енергозбереження",
    battery_health: "Стан батареї",
    battery_temp: "Температура батареї",
    charge_time: "Повний заряд через",
    last_seen: "Останнє оновлення",
    never: "Ніколи",
    location: "Розташування",
    home: "Вдома",
    away: "Не вдома",
    connection: "З'єднання",
    wifi: "Wi-Fi",
    cellular: "Мобільна мережа",
    ethernet: "Ethernet",
    no_connection: "Немає з'єднання",
    storage: "Сховище",
    storage_free: "Вільно {free}",
    storage_of: "з {total}",
    focus: "Зосередження",
    on: "Увімк.",
    off: "Вимк.",
    ringer: "Дзвінок",
    ringer_normal: "Звичайний",
    ringer_vibrate: "Вібрація",
    ringer_silent: "Без звуку",
    dnd: "Не турбувати",
    dnd_priority_only: "Лише пріоритетні",
    dnd_total_silence: "Повна тиша",
    dnd_alarms_only: "Лише будильники",
    activity: "Активність",
    act_stationary: "Нерухомо",
    act_walking: "Ходьба",
    act_running: "Біг",
    act_automotive: "За кермом",
    act_cycling: "Велосипед",
    act_unknown: "Невідомо",
    system: "Система",
    app_version: "Застосунок Companion",
    screen: "Екран",
    active: "Активний",
    idle: "Неактивний",
    locked: "Заблоковано",
    unlocked: "Розблоковано",
    displays: "Дисплеї",
    frontmost_app: "Активний застосунок",
    camera: "Камера",
    microphone: "Мікрофон",
    in_use: "Використовується",
    not_in_use: "Не використовується",
    ring: "Подзвонити",
    ring_device: "Подзвонити на пристрій",
    ring_title: "Подзвонити на {name}?",
    ring_text: "Надсилає критичне сповіщення зі звуком, навіть якщо пристрій у беззвучному режимі або в режимі зосередження.",
    ring_sent: "Сигнал надіслано",
    ring_failed: "Не вдалося подзвонити",
    ring_default_message: "Home Assistant шукає цей пристрій",
    cancel: "Скасувати",
    more_info: "Докладніше",
    kind_phone: "Телефон",
    kind_tablet: "Планшет",
    kind_laptop: "Ноутбук",
    kind_desktop: "Комп'ютер",
    kind_car: "Автомобіль",
    kind_watch: "Годинник",
    kind_other: "Пристрій",
    no_device: "Не знайдено жодного пристрою застосунку Home Assistant Companion. Установіть застосунок на телефон, планшет або комп'ютер і увійдіть у цей Home Assistant.",
    unknown_device: "Пристрій не знайдено",
    no_registry: "Для цієї картки потрібен Home Assistant 2024.8 або новіший.",
    devices: "Пристрої (усі пристрої Companion, якщо порожньо)",
    exclude: "Виключені пристрої",
    title: "Заголовок (необов'язково)",
    show_title: "Показувати заголовок",
    show_subtitle: "Показувати підзаголовок",
    illustration: "Анімована ілюстрація",
    illustration_theme: "Тема ілюстрації",
    theme_auto: "Автоматично (сонце)",
    theme_day: "День",
    theme_night: "Ніч",
    show_location: "Показувати розташування",
    show_connection: "Показувати з'єднання",
    show_storage: "Показувати сховище",
    show_status: "Показувати зосередження, дзвінок і активність",
    show_system: "Показувати версії системи й застосунку",
    show_computer: "Показувати дані комп'ютера",
    show_actions: "Показувати дії (подзвонити, докладніше)",
    show_names: "Показувати назви",
    sort: "Сортувати за",
    sort_name: "Назва",
    sort_battery: "Заряд, спершу низький",
    sort_last_seen: "Останнє оновлення, спершу нове",
    sort_none: "Порядок списку",
    details: "Відомості про пристрої",
    details_auto: "Розгорнуто для одного пристрою",
    details_expanded: "Розгорнуто",
    details_collapsed: "Згорнуто",
    low_battery_level: "Рівень низького заряду",
    stale_after: "Попередження «не на зв'язку» через",
    unit_hours: "год",
    ring_message: "Текст сигналу",
    language: "Мова",
    lang_auto: "Автоматично",
    zoom: "Кнопка подробиць",
    zoom_helper: "Кнопка у правому верхньому куті, що перемикає міні-картку на повну й назад",
    zoom_in: "Показати повну картку",
    zoom_out: "Показати компактну картку",
  },
  hu: {
    title_devices: "Eszközök",
    n_devices: "{n} eszköz",
    pill_ok: "Minden rendben",
    pill_low: "{n} lemerülőben",
    pill_stale: "{n} offline",
    state_charging: "Töltődik",
    state_full: "Feltöltve",
    state_not_charging: "Nem töltődik",
    state_discharging: "Akkumulátorról",
    state_unknown: "Ismeretlen",
    low_battery: "Alacsony töltöttség",
    alert_low: "Alacsony töltöttség: {pct}",
    alert_stale: "{time} óta nem látott",
    seen: "utoljára {ago}",
    charger_ac: "Hálózati töltő",
    charger_usb: "USB",
    charger_wireless: "Vezeték nélküli",
    charger_dock: "Dokkoló",
    battery: "Akkumulátor",
    low_power: "Alacsony fogyasztású mód",
    battery_health: "Akkumulátor állapota",
    battery_temp: "Akkumulátor hőmérséklete",
    charge_time: "Feltöltve ennyi idő múlva",
    last_seen: "Utolsó frissítés",
    never: "Soha",
    location: "Hely",
    home: "Otthon",
    away: "Távol",
    connection: "Kapcsolat",
    wifi: "Wi-Fi",
    cellular: "Mobilhálózat",
    ethernet: "Ethernet",
    no_connection: "Nincs kapcsolat",
    storage: "Tárhely",
    storage_free: "{free} szabad",
    storage_of: "összesen {total}",
    focus: "Fókusz",
    on: "Be",
    off: "Ki",
    ringer: "Csengő",
    ringer_normal: "Normál",
    ringer_vibrate: "Rezgés",
    ringer_silent: "Néma",
    dnd: "Ne zavarjanak",
    dnd_priority_only: "Csak prioritás",
    dnd_total_silence: "Teljes csend",
    dnd_alarms_only: "Csak ébresztők",
    activity: "Tevékenység",
    act_stationary: "Áll",
    act_walking: "Gyaloglás",
    act_running: "Futás",
    act_automotive: "Autózás",
    act_cycling: "Kerékpározás",
    act_unknown: "Ismeretlen",
    system: "Rendszer",
    app_version: "Companion alkalmazás",
    screen: "Képernyő",
    active: "Aktív",
    idle: "Tétlen",
    locked: "Zárolva",
    unlocked: "Feloldva",
    displays: "Kijelzők",
    frontmost_app: "Előtérben lévő alkalmazás",
    camera: "Kamera",
    microphone: "Mikrofon",
    in_use: "Használatban",
    not_in_use: "Nincs használatban",
    ring: "Csörgetés",
    ring_device: "Eszköz csörgetése",
    ring_title: "Csörgeted: {name}?",
    ring_text: "Kritikus értesítést küld, amely akkor is hangot játszik le, ha az eszköz néma vagy fókusz módban van.",
    ring_sent: "Csörgetés elküldve",
    ring_failed: "A csörgetés nem sikerült",
    ring_default_message: "A Home Assistant keresi ezt az eszközt",
    cancel: "Mégse",
    more_info: "Részletek",
    kind_phone: "Telefon",
    kind_tablet: "Táblagép",
    kind_laptop: "Laptop",
    kind_desktop: "Számítógép",
    kind_car: "Autó",
    kind_watch: "Óra",
    kind_other: "Eszköz",
    no_device: "Nem található a Home Assistant Companion alkalmazás egyetlen eszköze sem. Telepítsd az alkalmazást egy telefonra, táblagépre vagy számítógépre, és jelentkezz be ebbe a Home Assistantbe.",
    unknown_device: "Az eszköz nem található",
    no_registry: "Ehhez a kártyához Home Assistant 2024.8 vagy újabb szükséges.",
    devices: "Eszközök (üresen az összes Companion eszköz)",
    exclude: "Kihagyott eszközök",
    title: "Cím (nem kötelező)",
    show_title: "Cím megjelenítése",
    show_subtitle: "Alcím megjelenítése",
    illustration: "Animált illusztráció",
    illustration_theme: "Az illusztráció témája",
    theme_auto: "Automatikus (nap)",
    theme_day: "Nappal",
    theme_night: "Éjszaka",
    show_location: "Hely megjelenítése",
    show_connection: "Kapcsolat megjelenítése",
    show_storage: "Tárhely megjelenítése",
    show_status: "Fókusz, csengő és tevékenység megjelenítése",
    show_system: "Rendszer- és alkalmazásverzió megjelenítése",
    show_computer: "Számítógép részleteinek megjelenítése",
    show_actions: "Műveletek megjelenítése (csörgetés, részletek)",
    show_names: "Nevek megjelenítése",
    sort: "Rendezés",
    sort_name: "Név",
    sort_battery: "Akkumulátor, a legalacsonyabb elöl",
    sort_last_seen: "Utolsó frissítés, a legújabb elöl",
    sort_none: "A lista sorrendje",
    details: "Eszközrészletek",
    details_auto: "Kinyitva egyetlen eszköznél",
    details_expanded: "Kinyitva",
    details_collapsed: "Becsukva",
    low_battery_level: "Alacsony töltöttségi szint",
    stale_after: "„Nem látott” figyelmeztetés ennyi után",
    unit_hours: "óra",
    ring_message: "Csörgetési üzenet",
    language: "Nyelv",
    lang_auto: "Automatikus",
    zoom: "Részletek gomb",
    zoom_helper: "A jobb felső sarokban lévő gomb, amely a mini kártya és a teljes kártya között vált",
    zoom_in: "A teljes kártya megjelenítése",
    zoom_out: "A kompakt kártya megjelenítése",
  },
  sk: {
    title_devices: "Zariadenia",
    n_devices: "Zariadenia: {n}",
    pill_ok: "Všetko v poriadku",
    pill_low: "Slabá batéria: {n}",
    pill_stale: "Offline: {n}",
    state_charging: "Nabíja sa",
    state_full: "Nabitá",
    state_not_charging: "Nenabíja sa",
    state_discharging: "Na batérii",
    state_unknown: "Neznámy",
    low_battery: "Slabá batéria",
    alert_low: "Slabá batéria: {pct}",
    alert_stale: "Nevidené {time}",
    seen: "videné {ago}",
    charger_ac: "Sieťová nabíjačka",
    charger_usb: "USB",
    charger_wireless: "Bezdrôtovo",
    charger_dock: "Dok",
    battery: "Batéria",
    low_power: "Režim nízkej spotreby",
    battery_health: "Stav batérie",
    battery_temp: "Teplota batérie",
    charge_time: "Nabitá o",
    last_seen: "Posledná aktualizácia",
    never: "Nikdy",
    location: "Poloha",
    home: "Doma",
    away: "Preč",
    connection: "Pripojenie",
    wifi: "Wi-Fi",
    cellular: "Mobilná sieť",
    ethernet: "Ethernet",
    no_connection: "Bez pripojenia",
    storage: "Úložisko",
    storage_free: "Voľné: {free}",
    storage_of: "z {total}",
    focus: "Sústredenie",
    on: "Zapnuté",
    off: "Vypnuté",
    ringer: "Zvonenie",
    ringer_normal: "Normálne",
    ringer_vibrate: "Vibrovanie",
    ringer_silent: "Tichý režim",
    dnd: "Nerušiť",
    dnd_priority_only: "Len prioritné",
    dnd_total_silence: "Úplné ticho",
    dnd_alarms_only: "Len budíky",
    activity: "Aktivita",
    act_stationary: "Bez pohybu",
    act_walking: "Chôdza",
    act_running: "Beh",
    act_automotive: "Jazda autom",
    act_cycling: "Bicykel",
    act_unknown: "Neznáma",
    system: "Systém",
    app_version: "Aplikácia Companion",
    screen: "Obrazovka",
    active: "Aktívny",
    idle: "Nečinný",
    locked: "Zamknuté",
    unlocked: "Odomknuté",
    displays: "Obrazovky",
    frontmost_app: "Aplikácia v popredí",
    camera: "Kamera",
    microphone: "Mikrofón",
    in_use: "Používa sa",
    not_in_use: "Nepoužíva sa",
    ring: "Zazvoniť",
    ring_device: "Zazvoniť na zariadenie",
    ring_title: "Zazvoniť na {name}?",
    ring_text: "Odošle kritické upozornenie, ktoré prehrá zvuk, aj keď je zariadenie stíšené alebo v režime sústredenia.",
    ring_sent: "Zvonenie odoslané",
    ring_failed: "Nepodarilo sa zazvoniť",
    ring_default_message: "Home Assistant hľadá toto zariadenie",
    cancel: "Zrušiť",
    more_info: "Podrobnosti",
    kind_phone: "Telefón",
    kind_tablet: "Tablet",
    kind_laptop: "Notebook",
    kind_desktop: "Počítač",
    kind_car: "Auto",
    kind_watch: "Hodinky",
    kind_other: "Zariadenie",
    no_device: "Nenašlo sa žiadne zariadenie aplikácie Home Assistant Companion. Nainštalujte aplikáciu do telefónu, tabletu alebo počítača a prihláste sa do tohto Home Assistant.",
    unknown_device: "Zariadenie sa nenašlo",
    no_registry: "Táto karta vyžaduje Home Assistant 2024.8 alebo novší.",
    devices: "Zariadenia (všetky zariadenia Companion, ak je prázdne)",
    exclude: "Vynechané zariadenia",
    title: "Názov (voliteľný)",
    show_title: "Zobraziť názov",
    show_subtitle: "Zobraziť podnázov",
    illustration: "Animovaná ilustrácia",
    illustration_theme: "Téma ilustrácie",
    theme_auto: "Automaticky (slnko)",
    theme_day: "Deň",
    theme_night: "Noc",
    show_location: "Zobraziť polohu",
    show_connection: "Zobraziť pripojenie",
    show_storage: "Zobraziť úložisko",
    show_status: "Zobraziť sústredenie, zvonenie a aktivitu",
    show_system: "Zobraziť verzie systému a aplikácie",
    show_computer: "Zobraziť podrobnosti počítača",
    show_actions: "Zobraziť akcie (zazvoniť, podrobnosti)",
    show_names: "Zobraziť mená",
    sort: "Zoradiť podľa",
    sort_name: "Názov",
    sort_battery: "Batéria, najnižšia prvá",
    sort_last_seen: "Posledná aktualizácia, najnovšia prvá",
    sort_none: "Poradie zoznamu",
    details: "Podrobnosti zariadení",
    details_auto: "Rozbalené pri jednom zariadení",
    details_expanded: "Rozbalené",
    details_collapsed: "Zbalené",
    low_battery_level: "Úroveň slabej batérie",
    stale_after: "Upozornenie „nevidené“ po",
    unit_hours: "hod.",
    ring_message: "Správa zvonenia",
    language: "Jazyk",
    lang_auto: "Automaticky",
    zoom: "Tlačidlo podrobností",
    zoom_helper: "Tlačidlo vpravo hore, ktoré prepína medzi mini kartou a úplnou kartou",
    zoom_in: "Zobraziť úplnú kartu",
    zoom_out: "Zobraziť kompaktnú kartu",
  },
  cs: {
    title_devices: "Zařízení",
    n_devices: "Zařízení: {n}",
    pill_ok: "Vše v pořádku",
    pill_low: "Slabá baterie: {n}",
    pill_stale: "Offline: {n}",
    state_charging: "Nabíjí se",
    state_full: "Nabitá",
    state_not_charging: "Nenabíjí se",
    state_discharging: "Na baterii",
    state_unknown: "Neznámý",
    low_battery: "Slabá baterie",
    alert_low: "Slabá baterie: {pct}",
    alert_stale: "Neviděno {time}",
    seen: "viděno {ago}",
    charger_ac: "Síťová nabíječka",
    charger_usb: "USB",
    charger_wireless: "Bezdrátově",
    charger_dock: "Dok",
    battery: "Baterie",
    low_power: "Úsporný režim",
    battery_health: "Stav baterie",
    battery_temp: "Teplota baterie",
    charge_time: "Nabitá za",
    last_seen: "Poslední aktualizace",
    never: "Nikdy",
    location: "Poloha",
    home: "Doma",
    away: "Pryč",
    connection: "Připojení",
    wifi: "Wi-Fi",
    cellular: "Mobilní síť",
    ethernet: "Ethernet",
    no_connection: "Bez připojení",
    storage: "Úložiště",
    storage_free: "Volné: {free}",
    storage_of: "z {total}",
    focus: "Soustředění",
    on: "Zapnuto",
    off: "Vypnuto",
    ringer: "Vyzvánění",
    ringer_normal: "Normální",
    ringer_vibrate: "Vibrace",
    ringer_silent: "Tichý režim",
    dnd: "Nerušit",
    dnd_priority_only: "Jen prioritní",
    dnd_total_silence: "Úplné ticho",
    dnd_alarms_only: "Jen budíky",
    activity: "Aktivita",
    act_stationary: "Bez pohybu",
    act_walking: "Chůze",
    act_running: "Běh",
    act_automotive: "Jízda autem",
    act_cycling: "Kolo",
    act_unknown: "Neznámá",
    system: "Systém",
    app_version: "Aplikace Companion",
    screen: "Obrazovka",
    active: "Aktivní",
    idle: "Nečinný",
    locked: "Zamčeno",
    unlocked: "Odemčeno",
    displays: "Obrazovky",
    frontmost_app: "Aplikace v popředí",
    camera: "Kamera",
    microphone: "Mikrofon",
    in_use: "Používá se",
    not_in_use: "Nepoužívá se",
    ring: "Prozvonit",
    ring_device: "Prozvonit zařízení",
    ring_title: "Prozvonit {name}?",
    ring_text: "Odešle kritické oznámení, které přehraje zvuk, i když je zařízení ztlumené nebo v režimu soustředění.",
    ring_sent: "Prozvonění odesláno",
    ring_failed: "Prozvonění se nezdařilo",
    ring_default_message: "Home Assistant hledá toto zařízení",
    cancel: "Zrušit",
    more_info: "Podrobnosti",
    kind_phone: "Telefon",
    kind_tablet: "Tablet",
    kind_laptop: "Notebook",
    kind_desktop: "Počítač",
    kind_car: "Auto",
    kind_watch: "Hodinky",
    kind_other: "Zařízení",
    no_device: "Nebylo nalezeno žádné zařízení aplikace Home Assistant Companion. Nainstalujte aplikaci do telefonu, tabletu nebo počítače a přihlaste se do tohoto Home Assistantu.",
    unknown_device: "Zařízení nenalezeno",
    no_registry: "Tato karta vyžaduje Home Assistant 2024.8 nebo novější.",
    devices: "Zařízení (všechna zařízení Companion, když je prázdné)",
    exclude: "Vynechaná zařízení",
    title: "Název (volitelný)",
    show_title: "Zobrazit název",
    show_subtitle: "Zobrazit podnázev",
    illustration: "Animovaná ilustrace",
    illustration_theme: "Motiv ilustrace",
    theme_auto: "Automaticky (slunce)",
    theme_day: "Den",
    theme_night: "Noc",
    show_location: "Zobrazit polohu",
    show_connection: "Zobrazit připojení",
    show_storage: "Zobrazit úložiště",
    show_status: "Zobrazit soustředění, vyzvánění a aktivitu",
    show_system: "Zobrazit verze systému a aplikace",
    show_computer: "Zobrazit podrobnosti počítače",
    show_actions: "Zobrazit akce (prozvonit, podrobnosti)",
    show_names: "Zobrazit jména",
    sort: "Řadit podle",
    sort_name: "Název",
    sort_battery: "Baterie, nejnižší první",
    sort_last_seen: "Poslední aktualizace, nejnovější první",
    sort_none: "Pořadí seznamu",
    details: "Podrobnosti zařízení",
    details_auto: "Rozbalené u jediného zařízení",
    details_expanded: "Rozbalené",
    details_collapsed: "Sbalené",
    low_battery_level: "Úroveň slabé baterie",
    stale_after: "Upozornění „neviděno“ po",
    unit_hours: "hod.",
    ring_message: "Zpráva prozvonění",
    language: "Jazyk",
    lang_auto: "Automaticky",
    zoom: "Tlačítko podrobností",
    zoom_helper: "Tlačítko vpravo nahoře, které přepíná mezi mini kartou a úplnou kartou",
    zoom_in: "Zobrazit úplnou kartu",
    zoom_out: "Zobrazit kompaktní kartu",
  },
  sl: {
    title_devices: "Naprave",
    n_devices: "Naprave: {n}",
    pill_ok: "Vse v redu",
    pill_low: "Prazne: {n}",
    pill_stale: "Brez povezave: {n}",
    state_charging: "Polni se",
    state_full: "Polna",
    state_not_charging: "Se ne polni",
    state_discharging: "Na bateriji",
    state_unknown: "Neznano",
    low_battery: "Prazna baterija",
    alert_low: "Prazna baterija: {pct}",
    alert_stale: "Ni vidna že {time}",
    seen: "videna {ago}",
    charger_ac: "Omrežni polnilnik",
    charger_usb: "USB",
    charger_wireless: "Brezžično",
    charger_dock: "Priklopna postaja",
    battery: "Baterija",
    low_power: "Varčevanje z energijo",
    battery_health: "Stanje baterije",
    battery_temp: "Temperatura baterije",
    charge_time: "Polna čez",
    last_seen: "Zadnja posodobitev",
    never: "Nikoli",
    location: "Lokacija",
    home: "Doma",
    away: "Odsoten",
    connection: "Povezava",
    wifi: "Wi-Fi",
    cellular: "Mobilno omrežje",
    ethernet: "Ethernet",
    no_connection: "Ni povezave",
    storage: "Shramba",
    storage_free: "Prosto: {free}",
    storage_of: "od {total}",
    focus: "Osredotočenost",
    on: "Vklopljeno",
    off: "Izklopljeno",
    ringer: "Zvonjenje",
    ringer_normal: "Običajno",
    ringer_vibrate: "Vibriranje",
    ringer_silent: "Tiho",
    dnd: "Ne moti",
    dnd_priority_only: "Samo prednostna",
    dnd_total_silence: "Popolna tišina",
    dnd_alarms_only: "Samo alarmi",
    activity: "Dejavnost",
    act_stationary: "Pri miru",
    act_walking: "Hoja",
    act_running: "Tek",
    act_automotive: "Vožnja",
    act_cycling: "Kolesarjenje",
    act_unknown: "Neznana",
    system: "Sistem",
    app_version: "Aplikacija Companion",
    screen: "Zaslon",
    active: "Aktiven",
    idle: "Nedejaven",
    locked: "Zaklenjeno",
    unlocked: "Odklenjeno",
    displays: "Zasloni",
    frontmost_app: "Aplikacija v ospredju",
    camera: "Kamera",
    microphone: "Mikrofon",
    in_use: "V uporabi",
    not_in_use: "Ni v uporabi",
    ring: "Pozvoni",
    ring_device: "Pozvoni napravo",
    ring_title: "Pozvonim na {name}?",
    ring_text: "Pošlje kritično obvestilo, ki predvaja zvok, tudi ko je naprava utišana ali v načinu osredotočenosti.",
    ring_sent: "Zvonjenje poslano",
    ring_failed: "Zvonjenje ni uspelo",
    ring_default_message: "Home Assistant išče to napravo",
    cancel: "Prekliči",
    more_info: "Podrobnosti",
    kind_phone: "Telefon",
    kind_tablet: "Tablica",
    kind_laptop: "Prenosnik",
    kind_desktop: "Računalnik",
    kind_car: "Avto",
    kind_watch: "Ura",
    kind_other: "Naprava",
    no_device: "Ni najdene naprave aplikacije Home Assistant Companion. Namestite aplikacijo na telefon, tablico ali računalnik in se prijavite v ta Home Assistant.",
    unknown_device: "Naprave ni mogoče najti",
    no_registry: "Ta kartica potrebuje Home Assistant 2024.8 ali novejši.",
    devices: "Naprave (vse naprave Companion, če je prazno)",
    exclude: "Izpuščene naprave",
    title: "Naslov (neobvezno)",
    show_title: "Prikaži naslov",
    show_subtitle: "Prikaži podnaslov",
    illustration: "Animirana ilustracija",
    illustration_theme: "Tema ilustracije",
    theme_auto: "Samodejno (sonce)",
    theme_day: "Dan",
    theme_night: "Noč",
    show_location: "Prikaži lokacijo",
    show_connection: "Prikaži povezavo",
    show_storage: "Prikaži shrambo",
    show_status: "Prikaži osredotočenost, zvonjenje in dejavnost",
    show_system: "Prikaži različici sistema in aplikacije",
    show_computer: "Prikaži podrobnosti računalnika",
    show_actions: "Prikaži dejanja (pozvoni, podrobnosti)",
    show_names: "Prikaži imena",
    sort: "Razvrsti po",
    sort_name: "Ime",
    sort_battery: "Baterija, najnižja najprej",
    sort_last_seen: "Zadnja posodobitev, najnovejša najprej",
    sort_none: "Vrstni red seznama",
    details: "Podrobnosti naprav",
    details_auto: "Razprto pri eni napravi",
    details_expanded: "Razprto",
    details_collapsed: "Zloženo",
    low_battery_level: "Raven prazne baterije",
    stale_after: "Opozorilo »ni vidna« po",
    unit_hours: "ur",
    ring_message: "Sporočilo zvonjenja",
    language: "Jezik",
    lang_auto: "Samodejno",
    zoom: "Gumb za podrobnosti",
    zoom_helper: "Gumb zgoraj desno, ki preklaplja med mini kartico in celotno kartico",
    zoom_in: "Prikaži celotno kartico",
    zoom_out: "Prikaži kompaktno kartico",
  },
  lv: {
    title_devices: "Ierīces",
    n_devices: "Ierīces: {n}",
    pill_ok: "Viss kārtībā",
    pill_low: "Zema baterija: {n}",
    pill_stale: "Bezsaistē: {n}",
    state_charging: "Lādējas",
    state_full: "Pilna",
    state_not_charging: "Nelādējas",
    state_discharging: "No baterijas",
    state_unknown: "Nezināms",
    low_battery: "Zema baterija",
    alert_low: "Zema baterija: {pct}",
    alert_stale: "Nav redzēta {time}",
    seen: "redzēta {ago}",
    charger_ac: "Tīkla lādētājs",
    charger_usb: "USB",
    charger_wireless: "Bezvadu",
    charger_dock: "Doks",
    battery: "Baterija",
    low_power: "Enerģijas taupīšanas režīms",
    battery_health: "Baterijas stāvoklis",
    battery_temp: "Baterijas temperatūra",
    charge_time: "Pilna pēc",
    last_seen: "Pēdējā atjaunināšana",
    never: "Nekad",
    location: "Atrašanās vieta",
    home: "Mājās",
    away: "Prom",
    connection: "Savienojums",
    wifi: "Wi-Fi",
    cellular: "Mobilais tīkls",
    ethernet: "Ethernet",
    no_connection: "Nav savienojuma",
    storage: "Krātuve",
    storage_free: "Brīvs: {free}",
    storage_of: "no {total}",
    focus: "Fokuss",
    on: "Ieslēgts",
    off: "Izslēgts",
    ringer: "Zvana signāls",
    ringer_normal: "Parasts",
    ringer_vibrate: "Vibrācija",
    ringer_silent: "Kluss",
    dnd: "Netraucēt",
    dnd_priority_only: "Tikai prioritārie",
    dnd_total_silence: "Pilnīgs klusums",
    dnd_alarms_only: "Tikai modinātāji",
    activity: "Aktivitāte",
    act_stationary: "Nekustīgi",
    act_walking: "Iešana",
    act_running: "Skriešana",
    act_automotive: "Braukšana",
    act_cycling: "Riteņbraukšana",
    act_unknown: "Nezināma",
    system: "Sistēma",
    app_version: "Lietotne Companion",
    screen: "Ekrāns",
    active: "Aktīvs",
    idle: "Dīkstāvē",
    locked: "Bloķēts",
    unlocked: "Atbloķēts",
    displays: "Displeji",
    frontmost_app: "Lietotne priekšplānā",
    camera: "Kamera",
    microphone: "Mikrofons",
    in_use: "Tiek lietots",
    not_in_use: "Netiek lietots",
    ring: "Zvanīt",
    ring_device: "Zvanīt uz ierīci",
    ring_title: "Zvanīt uz {name}?",
    ring_text: "Nosūta kritisku paziņojumu, kas atskaņo skaņu pat tad, ja ierīce ir klusumā vai fokusa režīmā.",
    ring_sent: "Zvans nosūtīts",
    ring_failed: "Neizdevās zvanīt",
    ring_default_message: "Home Assistant meklē šo ierīci",
    cancel: "Atcelt",
    more_info: "Sīkāk",
    kind_phone: "Tālrunis",
    kind_tablet: "Planšete",
    kind_laptop: "Klēpjdators",
    kind_desktop: "Dators",
    kind_car: "Auto",
    kind_watch: "Pulkstenis",
    kind_other: "Ierīce",
    no_device: "Netika atrasta neviena Home Assistant Companion lietotnes ierīce. Instalējiet lietotni tālrunī, planšetē vai datorā un pierakstieties šajā Home Assistant.",
    unknown_device: "Ierīce nav atrasta",
    no_registry: "Šai kartītei nepieciešams Home Assistant 2024.8 vai jaunāks.",
    devices: "Ierīces (visas Companion ierīces, ja tukšs)",
    exclude: "Izlaistās ierīces",
    title: "Virsraksts (neobligāts)",
    show_title: "Rādīt virsrakstu",
    show_subtitle: "Rādīt apakšvirsrakstu",
    illustration: "Animēta ilustrācija",
    illustration_theme: "Ilustrācijas motīvs",
    theme_auto: "Automātiski (saule)",
    theme_day: "Diena",
    theme_night: "Nakts",
    show_location: "Rādīt atrašanās vietu",
    show_connection: "Rādīt savienojumu",
    show_storage: "Rādīt krātuvi",
    show_status: "Rādīt fokusu, zvana signālu un aktivitāti",
    show_system: "Rādīt sistēmas un lietotnes versijas",
    show_computer: "Rādīt datora informāciju",
    show_actions: "Rādīt darbības (zvanīt, sīkāk)",
    show_names: "Rādīt nosaukumus",
    sort: "Kārtot pēc",
    sort_name: "Nosaukums",
    sort_battery: "Baterija, zemākā vispirms",
    sort_last_seen: "Pēdējā atjaunināšana, jaunākā vispirms",
    sort_none: "Saraksta secība",
    details: "Ierīču informācija",
    details_auto: "Izvērsta vienai ierīcei",
    details_expanded: "Izvērsta",
    details_collapsed: "Sakļauta",
    low_battery_level: "Zemas baterijas līmenis",
    stale_after: "Brīdinājums “nav redzēta” pēc",
    unit_hours: "st.",
    ring_message: "Zvana ziņojums",
    language: "Valoda",
    lang_auto: "Automātiski",
    zoom: "Detalizācijas poga",
    zoom_helper: "Poga augšējā labajā stūrī, kas pārslēdz starp mini kartīti un pilno kartīti",
    zoom_in: "Rādīt pilno kartīti",
    zoom_out: "Rādīt kompakto kartīti",
  },
  el: {
    title_devices: "Συσκευές",
    n_devices: "{n} συσκευές",
    pill_ok: "Όλα καλά",
    pill_low: "{n} χαμηλές",
    pill_stale: "{n} εκτός σύνδεσης",
    state_charging: "Φορτίζει",
    state_full: "Πλήρης",
    state_not_charging: "Δεν φορτίζει",
    state_discharging: "Σε μπαταρία",
    state_unknown: "Άγνωστο",
    low_battery: "Χαμηλή μπαταρία",
    alert_low: "Χαμηλή μπαταρία: {pct}",
    alert_stale: "Δεν εμφανίστηκε εδώ και {time}",
    seen: "εμφανίστηκε {ago}",
    charger_ac: "Φορτιστής πρίζας",
    charger_usb: "USB",
    charger_wireless: "Ασύρματη",
    charger_dock: "Βάση",
    battery: "Μπαταρία",
    low_power: "Λειτουργία χαμηλής ενέργειας",
    battery_health: "Υγεία μπαταρίας",
    battery_temp: "Θερμοκρασία μπαταρίας",
    charge_time: "Πλήρης σε",
    last_seen: "Τελευταία ενημέρωση",
    never: "Ποτέ",
    location: "Τοποθεσία",
    home: "Σπίτι",
    away: "Εκτός",
    connection: "Σύνδεση",
    wifi: "Wi-Fi",
    cellular: "Δίκτυο κινητής",
    ethernet: "Ethernet",
    no_connection: "Χωρίς σύνδεση",
    storage: "Αποθηκευτικός χώρος",
    storage_free: "{free} ελεύθερα",
    storage_of: "από {total}",
    focus: "Εστίαση",
    on: "Ενεργή",
    off: "Ανενεργή",
    ringer: "Κουδούνισμα",
    ringer_normal: "Κανονικό",
    ringer_vibrate: "Δόνηση",
    ringer_silent: "Σίγαση",
    dnd: "Μην ενοχλείτε",
    dnd_priority_only: "Μόνο προτεραιότητας",
    dnd_total_silence: "Πλήρης σιωπή",
    dnd_alarms_only: "Μόνο ξυπνητήρια",
    activity: "Δραστηριότητα",
    act_stationary: "Ακίνητο",
    act_walking: "Περπάτημα",
    act_running: "Τρέξιμο",
    act_automotive: "Οδήγηση",
    act_cycling: "Ποδήλατο",
    act_unknown: "Άγνωστη",
    system: "Σύστημα",
    app_version: "Εφαρμογή Companion",
    screen: "Οθόνη",
    active: "Ενεργό",
    idle: "Αδρανές",
    locked: "Κλειδωμένο",
    unlocked: "Ξεκλείδωτο",
    displays: "Οθόνες",
    frontmost_app: "Εφαρμογή στο προσκήνιο",
    camera: "Κάμερα",
    microphone: "Μικρόφωνο",
    in_use: "Σε χρήση",
    not_in_use: "Εκτός χρήσης",
    ring: "Κουδούνισμα",
    ring_device: "Κουδούνισμα συσκευής",
    ring_title: "Να κουδουνίσει το {name};",
    ring_text: "Στέλνει μια κρίσιμη ειδοποίηση που παίζει ήχο ακόμη κι όταν η συσκευή είναι σε σίγαση ή σε εστίαση.",
    ring_sent: "Το κουδούνισμα στάλθηκε",
    ring_failed: "Αποτυχία κουδουνίσματος",
    ring_default_message: "Το Home Assistant αναζητά αυτή τη συσκευή",
    cancel: "Ακύρωση",
    more_info: "Λεπτομέρειες",
    kind_phone: "Τηλέφωνο",
    kind_tablet: "Tablet",
    kind_laptop: "Φορητός υπολογιστής",
    kind_desktop: "Υπολογιστής",
    kind_car: "Αυτοκίνητο",
    kind_watch: "Ρολόι",
    kind_other: "Συσκευή",
    no_device: "Δεν βρέθηκε συσκευή της εφαρμογής Home Assistant Companion. Εγκαταστήστε την εφαρμογή σε τηλέφωνο, tablet ή υπολογιστή και συνδεθείτε σε αυτό το Home Assistant.",
    unknown_device: "Η συσκευή δεν βρέθηκε",
    no_registry: "Αυτή η κάρτα χρειάζεται Home Assistant 2024.8 ή νεότερο.",
    devices: "Συσκευές (όλες οι συσκευές Companion αν είναι κενό)",
    exclude: "Εξαιρούμενες συσκευές",
    title: "Τίτλος (προαιρετικός)",
    show_title: "Εμφάνιση τίτλου",
    show_subtitle: "Εμφάνιση υπότιτλου",
    illustration: "Κινούμενη εικονογράφηση",
    illustration_theme: "Θέμα εικονογράφησης",
    theme_auto: "Αυτόματα (ήλιος)",
    theme_day: "Ημέρα",
    theme_night: "Νύχτα",
    show_location: "Εμφάνιση τοποθεσίας",
    show_connection: "Εμφάνιση σύνδεσης",
    show_storage: "Εμφάνιση αποθηκευτικού χώρου",
    show_status: "Εμφάνιση εστίασης, κουδουνίσματος και δραστηριότητας",
    show_system: "Εμφάνιση εκδόσεων συστήματος και εφαρμογής",
    show_computer: "Εμφάνιση στοιχείων υπολογιστή",
    show_actions: "Εμφάνιση ενεργειών (κουδούνισμα, λεπτομέρειες)",
    show_names: "Εμφάνιση ονομάτων",
    sort: "Ταξινόμηση κατά",
    sort_name: "Όνομα",
    sort_battery: "Μπαταρία, η χαμηλότερη πρώτα",
    sort_last_seen: "Τελευταία ενημέρωση, η πιο πρόσφατη πρώτα",
    sort_none: "Σειρά της λίστας",
    details: "Λεπτομέρειες συσκευών",
    details_auto: "Ανοιχτές για μία μόνο συσκευή",
    details_expanded: "Ανοιχτές",
    details_collapsed: "Κλειστές",
    low_battery_level: "Επίπεδο χαμηλής μπαταρίας",
    stale_after: "Προειδοποίηση «εκτός σύνδεσης» μετά από",
    unit_hours: "ώρες",
    ring_message: "Μήνυμα κουδουνίσματος",
    language: "Γλώσσα",
    lang_auto: "Αυτόματη",
    zoom: "Κουμπί λεπτομερειών",
    zoom_helper: "Κουμπί πάνω δεξιά που εναλλάσσει τη μίνι κάρτα με την πλήρη κάρτα",
    zoom_in: "Εμφάνιση της πλήρους κάρτας",
    zoom_out: "Εμφάνιση της συμπαγούς κάρτας",
  },
};

// ---------------------------------------------------------------------------
// Icons (24 × 24, drawn with the even-odd rule)
// ---------------------------------------------------------------------------

const ICONS = {
  devices: "M22,17H18V10H22M23,8H17A1,1 0 0,0 16,9V19A1,1 0 0,0 17,20H23A1,1 0 0,0 24,19V9A1,1 0 0,0 23,8M4,6H22V4H4A2,2 0 0,0 2,6V17H0V20H14V17H4V6Z",
  phone: "M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 3v13h8V5zm3 14.4h2v1.2h-2z",
  tablet: "M5 2h14a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 2v14h14V4zm6 15.2h2v1.2h-2z",
  laptop: "M5 4h14a2 2 0 0 1 2 2v9H3V6a2 2 0 0 1 2-2zm0 2v7h14V6zM1 16h22v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2z",
  desktop: "M3 3h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7v2h3v2H7v-2h3v-2H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 2v10h18V5z",
  car: "M7 5h10l3 6h1a1 1 0 0 1 1 1v5h-2v2h-3v-2H7v2H4v-2H2v-5a1 1 0 0 1 1-1h1zm1.2 2-2 4h11.6l-2-4zM6.5 13a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z",
  watch: "M9 1h6l1 4.2A5 5 0 0 1 18 9v6a5 5 0 0 1-2 3.8L15 23H9l-1-4.2A5 5 0 0 1 6 15V9a5 5 0 0 1 2-3.8zm.5 6A1.5 1.5 0 0 0 8 8.5v7A1.5 1.5 0 0 0 9.5 17h5a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 14.5 7z",
  other: "M4 4h16v12H4zm2 2v8h12V6zM2 18h20v2H2z",
  battery: "M9.5 2h5v2H16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h1.5z",
  bolt: "M7 2v11h3v9l7-12h-4l4-8z",
  clock: "M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm-.75 3h1.5v5.3l4.4 2.6-.75 1.3-5.15-3.05z",
  wifi: "M12 21l-3.2-3.9a5 5 0 0 1 6.4 0zm0-11.5c3.1 0 6 1.1 8.2 3l-1.7 2a9.8 9.8 0 0 0-13 0l-1.7-2c2.2-1.9 5.1-3 8.2-3zM12 3c4.7 0 9 1.7 12.3 4.6l-1.7 2A16 16 0 0 0 12 5.6 16 16 0 0 0 1.4 9.6L-.3 7.6C3 4.7 7.3 3 12 3z",
  cellular: "M3 17h3v4H3zm5-4h3v8H8zm5-4h3v12h-3zm5-5h3v17h-3z",
  pin: "M12 2a7 7 0 0 1 7 7c0 5.2-7 13-7 13S5 14.2 5 9a7 7 0 0 1 7-7zm0 4.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z",
  storage: "M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 2v9h12V5zm9 11a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z",
  bell: "M12 2a1.5 1.5 0 0 1 1.5 1.5v.7A6 6 0 0 1 18 10v5l2 2v1H4v-1l2-2v-5a6 6 0 0 1 4.5-5.8v-.7A1.5 1.5 0 0 1 12 2zm-2 17h4a2 2 0 0 1-4 0z",
  moon: "M12.5 2A8.5 8.5 0 1 0 22 13.4 7 7 0 0 1 12.5 2z",
  walk: "M13.5 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM10 7.4l3-1 2.4 3.6 3.6 1-.5 2-4.4-1.2-1.3-1.7-1 4.3 2.7 2.6V23h-2v-5.2l-2.5-2.3L9.8 21l-2 .5L9 13l-.4-3.2L7 11.6V15H5v-4.3z",
  speaker: "M3 9h4l5-5v16l-5-5H3zm13.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z",
  info: "M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm-1 8v7h2v-7zm0-3v2h2V7z",
  apps: "M4 4h7v7H4zm9 0h7v7h-7zM4 13h7v7H4zm9 0h7v7h-7z",
  camera: "M4 6h11a2 2 0 0 1 2 2v2.5l4-2.5v8l-4-2.5V16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z",
  mic: "M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3zm-7 9h2a5 5 0 0 0 10 0h2a7 7 0 0 1-6 6.9V21h-2v-3.1A7 7 0 0 1 5 11z",
  lock: "M12 2a5 5 0 0 1 5 5v3h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1h1V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3z",
  thermometer: "M12 2a3 3 0 0 1 3 3v8a5 5 0 1 1-6 0V5a3 3 0 0 1 3-3zm0 2a1 1 0 0 0-1 1v9.1a3 3 0 1 0 2 0V5a1 1 0 0 0-1-1z",
  heart: "M12 21 3.5 12.6A5 5 0 0 1 12 6a5 5 0 0 1 8.5 6.6z",
  open: "M14 3h7v7h-2V6.4l-9.3 9.3-1.4-1.4L17.6 5H14zM5 5h6v2H5v12h12v-6h2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z",
  alert: "M12 2 1 21h22zm-1 7h2v5h-2zm0 7h2v2h-2z",
  chevron_down: "M7.41 8.58 12 13.17l4.59-4.59L18 10l-6 6-6-6z",
  expand: "M10 21v-2H6.41l4.5-4.5-1.41-1.41-4.5 4.5V14H3v7zm4.5-10.09 4.5-4.5V10h2V3h-7v2h3.59l-4.5 4.5z",
  collapse: "M19.5 3.09 15 7.59V4h-2v7h7V9h-3.59l4.5-4.5zM4 13v2h3.59l-4.5 4.5 1.41 1.41L9 16.41V20h2v-7z",
};

// ---------------------------------------------------------------------------
// Sensors of the Companion app
// ---------------------------------------------------------------------------

// [card key, domain, sensor ids]: the end of the entity id (and of the name, slugified) the iOS / macOS and the
// Android apps give each sensor. A key of null swallows a sensor whose id ends like another one (external storage
// is not the storage), so that the fallback match on the end of a renamed entity id never takes it.
const KEYS = [
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
const EXACT = new Map(KEYS.flatMap(([key, domain, ids]) => ids.map((id) => [`${domain}:${id}`, key])));
const BY_LENGTH = KEYS.flatMap(([key, domain, ids]) => ids.map((id) => ({ key, domain, id }))).sort((a, b) => b.id.length - a.id.length);

const KINDS = ["phone", "tablet", "laptop", "desktop", "car", "watch", "other"];
const SORTS = ["name", "battery", "last_seen", "none"];
const DETAILS = ["auto", "expanded", "collapsed"];
const DEFAULTS = { sort: "name", details: "auto", low_battery: 20, stale_after: 12, illustration_theme: "auto" };
const THEMES = ["auto", "day", "night"];
const TOGGLES = ["show_location", "show_connection", "show_storage", "show_status", "show_system", "show_computer", "show_actions"];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const esc = (v) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const lang = (hass, config) => {
  const l = config?.language || (hass && (hass.locale?.language || hass.language)) || "en";
  return STRINGS[l] ? l : STRINGS[l.split("-")[0]] ? l.split("-")[0] : "en";
};

// Locale for Intl: the card's language, with Home Assistant's region when it is the same language (pt-BR, de-CH);
// a bare "pt" (European Portuguese for Home Assistant) becomes "pt-PT", otherwise Intl formats it the Brazilian way.
const intlLocale = (hass, config) => {
  const l = lang(hass, config);
  const src = config?.language || (hass && (hass.locale?.language || hass.language)) || "";
  const out = src && src.split("-")[0] === l.split("-")[0] ? src : l;
  return out === "pt" ? "pt-PT" : out;
};

const t = (hass, config, key, vars = {}) =>
  String(STRINGS[lang(hass, config)][key] ?? STRINGS.en[key] ?? key).replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");

const valid = (s) => !!s && !["unknown", "unavailable", ""].includes(String(s.state).trim());

const num = (s) => {
  if (!valid(s)) return null;
  const v = parseFloat(s.state);
  return Number.isFinite(v) ? v : null;
};

const clampInt = (v, min, max, def) => {
  const n = Math.round(Number(v));
  return Number.isFinite(n) && v !== "" && v !== null && v !== undefined ? Math.min(max, Math.max(min, n)) : def;
};

// Home Assistant's slugify for entity ids and service names: "iPhone de Léa" → "iphone_de_lea".
const slugify = (s) =>
  String(s ?? "")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

const fmtNum = (v, digits, locale) =>
  v === null || v === undefined ? "—" : Number(v).toLocaleString(locale, { minimumFractionDigits: 0, maximumFractionDigits: digits });

const fmtPct = (v, locale) => (v === null || v === undefined ? "—" : `${fmtNum(Math.round(v), 0, locale)} %`);

// A size given by the app ("52.47 GB", "980 MB", "1.2 TB"; decimal units) → bytes, or null.
const parseSize = (raw) => {
  const m = String(raw ?? "")
    .replace(",", ".")
    .match(/(-?\d+(?:\.\d+)?)\s*([kmgt]i?)?b/i);
  if (!m) return null;
  const unit = (m[2] || "").toLowerCase();
  const pow = { "": 0, k: 1, m: 2, g: 3, t: 4 }[unit[0] || ""] ?? 0;
  return Number(m[1]) * (unit.endsWith("i") ? 1024 : 1000) ** pow;
};

// Bytes in base 1024: "48.9 GiB", "512 MiB".
const fmtBytes = (bytes, locale) => {
  if (bytes === null || bytes === undefined || !Number.isFinite(bytes)) return "—";
  const units = ["B", "KiB", "MiB", "GiB", "TiB"];
  let v = Math.max(0, bytes);
  let i = 0;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${fmtNum(v, v < 10 && i ? 1 : 0, locale)} ${units[i]}`;
};

const UNIT_FMT = {};
const fmtUnit = (v, unit, locale) =>
  (UNIT_FMT[`${locale}|${unit}`] ??= new Intl.NumberFormat(locale, { style: "unit", unit, unitDisplay: "short" })).format(v);

// A length of time in its largest unit: "42 min", "5 hr", "3 days".
const fmtSpan = (ms, locale) => {
  const min = Math.max(1, Math.round(ms / 60000));
  if (min < 60) return fmtUnit(min, "minute", locale);
  if (min < 48 * 60) return fmtUnit(Math.round(min / 60), "hour", locale);
  return fmtUnit(Math.round(min / 1440), "day", locale);
};

// "now", "5 min ago", "3 hr ago", "2 days ago", in the language of the card.
const REL_FMT = {};
const fmtAgo = (ms, now, locale) => {
  const rtf = (REL_FMT[locale] ??= new Intl.RelativeTimeFormat(locale, { numeric: "auto", style: "short" }));
  const s = Math.round((now - ms) / 1000);
  if (s < 60) return rtf.format(0, "second");
  if (s < 3600) return rtf.format(-Math.floor(s / 60), "minute");
  if (s < 86400) return rtf.format(-Math.floor(s / 3600), "hour");
  return rtf.format(-Math.floor(s / 86400), "day");
};

const svgIcon = (path, cls = "") => `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="${path}"/></svg>`;

// ---------------------------------------------------------------------------
// Devices of the Companion app, from the registries
// ---------------------------------------------------------------------------

// The card key of an entity of a device: from the end of its entity id after the device's name ("iphone_x_battery_level"
// → battery_level), else the end of its friendly name, else the longest sensor id its entity id ends with (renamed).
const keyOf = (entityId, friendly, names) => {
  const [domain, objectId] = entityId.split(".");
  if (domain === "device_tracker") return "tracker";
  if (domain === "notify") return "notify";
  const rests = [];
  for (const n of names) {
    const slug = slugify(n);
    if (!slug) continue;
    if (objectId.startsWith(`${slug}_`)) rests.push(objectId.slice(slug.length + 1));
    const f = slugify(friendly);
    if (f.startsWith(`${slug}_`)) rests.push(f.slice(slug.length + 1));
  }
  for (const r of rests) {
    const k = EXACT.get(`${domain}:${r}`);
    if (k !== undefined) return k;
  }
  const hit = BY_LENGTH.find((e) => e.domain === domain && (objectId === e.id || objectId.endsWith(`_${e.id}`)));
  return hit ? hit.key : undefined;
};

// What a device is, from its model, brand and name (and whether it has a battery): its icon and the words the card uses.
const kindOf = (dev, hasBattery) => {
  const m = `${dev.model || ""} ${dev.manufacturer || ""} ${dev.name || ""}`.toLowerCase();
  if (/ipad|tablet|\btab\b|galaxy tab|\bsm-[tx]\d|lenovo tb|kindle|fire hd|\bpad\b/.test(m)) return "tablet";
  if (/macbook|laptop|notebook|chromebook|thinkpad/.test(m)) return "laptop";
  if (/^mac\d/.test(String(dev.model || "").toLowerCase())) return hasBattery ? "laptop" : "desktop";
  if (/imac|mac ?mini|mac ?pro|mac ?studio|desktop|\bpc\b|windows|linux/.test(m)) return "desktop";
  if (/watch|\bwear\b/.test(m)) return "watch";
  if (/automotive|aivi|\bcar\b|vehicle|polestar|renault|volvo|harman|head unit/.test(m)) return "car";
  if (/iphone|phone|pixel|galaxy|\bsm-|redmi|xiaomi|oneplus|seeker|motorola|nokia|fairphone|android/.test(m) || hasBattery) return "phone";
  return "other";
};

// ios, macos or android: the notification payload and the system name depend on it.
const platformOf = (dev, kind) => {
  if (!/apple/i.test(dev.manufacturer || "") && !/^(iphone|ipad|mac|imac)/i.test(dev.model || "")) return "android";
  return kind === "laptop" || kind === "desktop" ? "macos" : "ios";
};

// Apple model identifiers read as their product: "iPhone17,1" → "iPhone", "MacBookPro18,1" → "MacBook Pro".
const APPLE_MODELS = [
  [/^iphone/i, "iPhone"],
  [/^ipad/i, "iPad"],
  [/^macbookpro/i, "MacBook Pro"],
  [/^macbookair/i, "MacBook Air"],
  [/^macbook/i, "MacBook"],
  [/^imac/i, "iMac"],
  [/^macmini/i, "Mac mini"],
  [/^macpro/i, "Mac Pro"],
  [/^mac\d/i, "Mac"],
];
const modelName = (dev) => {
  const model = String(dev.model || "");
  for (const [re, name] of APPLE_MODELS) if (re.test(model) && /\d+,\d+$/.test(model)) return name;
  const brand = dev.manufacturer && !model.toLowerCase().startsWith(String(dev.manufacturer).toLowerCase()) ? `${dev.manufacturer} ` : "";
  return `${brand}${model}`.trim();
};

const _cache = new WeakMap();

/**
 * Devices of the Companion app, from hass.entities / hass.devices, in the order of their names:
 * [{ id, name, manufacturer, model, sw, kind, platform, entities: { key: entity_id } }].
 */
const resolveDevices = (hass) => {
  if (!hass?.entities || !hass.devices) return null;
  const cached = _cache.get(hass.entities);
  if (cached && cached.devices === hass.devices) return cached.list;
  const byDevice = new Map();
  for (const e of Object.values(hass.entities)) {
    if (e.platform !== "mobile_app" || !e.device_id) continue;
    const d = hass.devices[e.device_id];
    if (!d) continue;
    const item = byDevice.get(e.device_id) || {};
    const friendly = hass.states?.[e.entity_id]?.attributes?.friendly_name || "";
    const key = keyOf(e.entity_id, friendly, [d.name, d.name_by_user]);
    if (key) item[key] ??= e.entity_id;
    byDevice.set(e.device_id, item);
  }
  const list = [];
  for (const [id, entities] of byDevice) {
    const d = hass.devices[id];
    const kind = kindOf(d, !!entities.battery);
    list.push({
      id,
      name: d.name_by_user || d.name || id,
      // The name the app registered with, which its entity ids and notify service are made of.
      appName: d.name || d.name_by_user || id,
      manufacturer: d.manufacturer || "",
      model: d.model || "",
      sw: d.sw_version || "",
      kind,
      platform: platformOf(d, kind),
      entities,
    });
  }
  list.sort((a, b) => a.name.localeCompare(b.name));
  _cache.set(hass.entities, { devices: hass.devices, list });
  return list;
};

// The `devices` option as a list of { device, ...options }: a string is a device id or name.
const deviceRefs = (config) =>
  (Array.isArray(config?.devices) ? config.devices : config?.devices ? [config.devices] : [])
    .map((d) => (typeof d === "string" ? { device: d } : d && typeof d === "object" ? d : null))
    .filter((d) => d?.device);

// The devices to show, with the options of each one applied: { list } or { error }.
const findDevices = (hass, config) => {
  const all = resolveDevices(hass);
  if (!all) return { error: "no_registry" };
  const match = (ref) => all.find((d) => d.id === ref || d.name === ref || d.appName === ref);
  const refs = deviceRefs(config);
  let list;
  if (refs.length) {
    list = [];
    for (const r of refs) {
      const d = match(r.device);
      if (!d) return { error: "unknown_device", ref: r.device };
      const own = Object.fromEntries(Object.entries(r.entities || {}).filter(([, v]) => typeof v === "string" && v));
      list.push({
        ...d,
        name: r.name || d.name,
        kind: KINDS.includes(r.kind) ? r.kind : d.kind,
        notify: r.notify,
        entities: { ...d.entities, ...own },
      });
    }
  } else {
    const out = new Set((Array.isArray(config?.exclude) ? config.exclude : config?.exclude ? [config.exclude] : []).map(String));
    list = all.filter((d) => !out.has(d.id) && !out.has(d.name));
  }
  if (!list.length) return { error: "no_device" };
  return { list };
};

// The legacy notify service of a device ("mobile_app_iphone_x"), the one that takes the app's payload (sounds,
// channels): the `notify` option, else the service named after the device, else none.
const notifyService = (hass, dev) => {
  if (dev.notify) return String(dev.notify).replace(/^notify\./, "");
  const services = hass?.services?.notify;
  if (!services) return null;
  for (const n of [dev.appName, dev.name]) {
    const s = `mobile_app_${slugify(n)}`;
    if (services[s]) return s;
  }
  return null;
};

// The data of a "ring" notification: iOS and macOS play a critical alert (heard in silent mode and through a
// Focus, once critical alerts are allowed for the app); Android sends it on the alarm stream, at high priority.
const ringPayload = (platform, title, message) =>
  platform === "android"
    ? { title, message, data: { ttl: 0, priority: "high", importance: "high", channel: "alarm_stream", vibrationPattern: "100, 1000, 100, 1000, 100", tag: "device-card-ring" } }
    : { title, message, data: { push: { sound: { name: "default", critical: 1, volume: 1 }, "interruption-level": "critical" } } };

// ---------------------------------------------------------------------------
// Reading a device
// ---------------------------------------------------------------------------

// The battery state of the app ("Charging", "Not Charging", "Full" on iOS; charging, discharging, full, not_charging
// on Android) as one of charging, full, not_charging, discharging, unknown.
const batteryState = (raw) => {
  const s = String(raw ?? "")
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_");
  if (s === "charging") return "charging";
  if (s === "full" || s === "fully_charged" || s === "charged") return "full";
  if (s === "not_charging") return "not_charging";
  if (s === "discharging" || s === "unplugged" || s === "on_battery") return "discharging";
  return "unknown";
};

// iOS "Wi-Fi" / "Cellular" / "No Connection", Android wifi / cellular / ethernet / unavailable.
const connectionType = (raw) => {
  const s = String(raw ?? "").toLowerCase();
  if (!s || s === "unknown") return null;
  if (/wi-?fi|wlan/.test(s)) return "wifi";
  if (/cell|mobile|lte|5g|4g|3g/.test(s)) return "cellular";
  if (/ethernet|wired/.test(s)) return "ethernet";
  if (/no.?connection|none|unavailable|disconnected|offline/.test(s)) return "none";
  return null;
};

// iOS Stationary / Walking / Running / Automotive / Cycling / Unknown, Android still / walking / running / on_foot /
// in_vehicle / on_bicycle / tilting / unknown.
const activityKey = (raw) => {
  const s = String(raw ?? "").toLowerCase();
  if (/stationary|still|tilting/.test(s)) return "stationary";
  if (/walk|on_foot/.test(s)) return "walking";
  if (/run/.test(s)) return "running";
  if (/automotive|vehicle|driving/.test(s)) return "automotive";
  if (/cycl|bicycle/.test(s)) return "cycling";
  return "unknown";
};

const NO_WIFI = /^(not connected|<not connected>|no wi-?fi|none|disconnected)$/i;

const lastSeenOf = (hass, dev) => {
  let best = null;
  for (const [key, id] of Object.entries(dev.entities)) {
    if (key === "notify") continue;
    const s = hass.states[id];
    if (!s) continue;
    const ms = Date.parse(s.last_reported || s.last_updated || s.last_changed);
    if (Number.isFinite(ms) && (best === null || ms > best)) best = ms;
  }
  return best;
};

// Everything the cards show about a device, read once per render.
const readDevice = (hass, dev, opts) => {
  const e = dev.entities;
  const s = (k) => (e[k] ? hass.states[e[k]] : undefined);
  const tracker = s("tracker");
  // Battery: the level sensor, else the level the app reports with the location.
  let level = num(s("battery"));
  let levelId = e.battery;
  if (level === null && Number.isFinite(Number(tracker?.attributes?.battery_level)) && tracker.attributes.battery_level !== null) {
    level = Number(tracker.attributes.battery_level);
    levelId = e.tracker;
  }
  const bs = s("battery_state");
  let state = valid(bs) ? batteryState(bs.state) : "unknown";
  if (state === "unknown" && valid(s("is_charging"))) state = s("is_charging").state === "on" ? "charging" : "discharging";
  const charger = valid(s("charger_type")) && !/^none$/i.test(s("charger_type").state) ? String(s("charger_type").state).toLowerCase() : null;
  if (state === "unknown" && charger) state = level !== null && level >= 100 ? "full" : "charging";
  const lowPower = bs?.attributes?.["Low Power Mode"] === true || s("power_save")?.state === "on";
  const charging = state === "charging";
  const low = level !== null && !charging && state !== "full" && level <= opts.low;
  const cls = level === null ? "idle" : low ? "crit" : charging ? "active" : "ok";
  const lastSeen = lastSeenOf(hass, dev);
  const stale = lastSeen !== null && opts.now - lastSeen > opts.stale * 3600e3;
  return {
    dev,
    battery: { v: level, id: levelId || e.battery_state, state, stateId: e.battery_state || e.is_charging, charger, chargerId: e.charger_type, lowPower, charging, low, cls },
    lastSeen,
    stale,
    s,
  };
};

// ---------------------------------------------------------------------------
// Battery ring
// ---------------------------------------------------------------------------

// The device's icon in a ring that the battery level fills, in the color of its state. While charging a light runs
// round the ring and a bolt badge sits at the bottom right; a low battery pulses in red. Still with reduced motion.
const ringSvg = (kind, pct, { cls = "ok", charging = false, low = false } = {}) => {
  const r = 20;
  const c = 2 * Math.PI * r;
  const p = pct === null || pct === undefined ? 0 : Math.max(0, Math.min(100, pct));
  const dash = `${((p / 100) * c).toFixed(2)} ${c.toFixed(2)}`;
  const icon = ICONS[kind] || ICONS.other;
  return `<svg class="ring ${cls}${charging ? " charging" : ""}${low ? " low" : ""}" viewBox="0 0 48 48" aria-hidden="true">
    ${low ? `<circle class="halo" cx="24" cy="24" r="${r}"/>` : ""}
    <circle class="track" cx="24" cy="24" r="${r}"/>
    ${pct === null || pct === undefined ? "" : `<circle class="arc" cx="24" cy="24" r="${r}" stroke-dasharray="${dash}" transform="rotate(-90 24 24)"/>`}
    ${charging ? `<circle class="sweep" cx="24" cy="24" r="${r}" stroke-dasharray="6 ${(c - 6).toFixed(2)}" transform="rotate(-90 24 24)"/>` : ""}
    <path class="glyph" transform="translate(14 14) scale(.8333)" d="${icon}"/>
    ${charging ? `<g class="bolt"><circle cx="38" cy="38" r="7.5"/><path transform="translate(32.6 32.6) scale(.45)" d="${ICONS.bolt}"/></g>` : ""}
  </svg>`;
};

const RING_STYLE = `
  .ring { width: 100%; height: 100%; overflow: visible; --rc: var(--c, var(--dc-ok)); }
  .ring .track { fill: none; stroke: color-mix(in srgb, var(--rc) 16%, transparent); stroke-width: 4; }
  .ring .arc { fill: none; stroke: var(--rc); stroke-width: 4; stroke-linecap: round; transition: stroke-dasharray .6s ease; }
  .ring .sweep { fill: none; stroke: #fff; stroke-opacity: .85; stroke-width: 4; stroke-linecap: round; }
  .ring .glyph { fill: color-mix(in srgb, var(--rc) 55%, var(--primary-text-color)); fill-rule: evenodd; }
  .ring.idle .glyph { fill: var(--secondary-text-color); }
  .ring .halo { fill: none; stroke: var(--rc); stroke-width: 4; transform-box: fill-box; transform-origin: center; opacity: 0; }
  .ring .bolt circle { fill: var(--dc-active); stroke: var(--card-background-color, #fff); stroke-width: 2; }
  .ring .bolt path { fill: #fff; }
  @keyframes dc-sweep { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -125.66; } }
  @keyframes dc-bolt { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.18); } }
  @keyframes dc-halo { 0% { transform: scale(1); opacity: .7; } 100% { transform: scale(1.35); opacity: 0; } }
  @keyframes dc-blink { 0%, 100% { opacity: 1; } 50% { opacity: .35; } }
  .ring.charging .sweep { animation: dc-sweep 2s linear infinite; }
  .ring.charging .bolt { transform-box: fill-box; transform-origin: center; animation: dc-bolt 1s ease-in-out infinite; }
  .ring.low .halo { animation: dc-halo 1.5s ease-out infinite; }
  .ring.low .arc { animation: dc-blink 1.5s ease-in-out infinite; }
`;

// ---------------------------------------------------------------------------
// Illustrated header
// ---------------------------------------------------------------------------

// The header's picture: a desk at the right of a 200 × 80 scene, the card's own devices standing on it (laptop,
// computer, tablet, phone, watch, car, by their kind) with their state on their screen: a beating green bolt and a
// cable while charging, a blinking red battery when low, a dark screen when not seen for a while, else a lit
// screen with the battery level. A window at the left shows the sun and a cloud by day, the moon and stars by
// night. The left of the banner is open wall: the card's text sits there. A 10 px desk strip runs under the
// whole banner, edge to edge.

// The Mobile App integration's logo, embedded by the build from images/mobile_app.png (a badge on the header icon).
const MOBILE_APP_LOGO = "__MOBILE_APP_LOGO__";

// Width of each device on the desk, in scene units (the scene is 80 high, the desk at its bottom).
const DV_WIDTH = { laptop: 58, desktop: 44, car: 30, tablet: 26, other: 24, phone: 12, watch: 12 };
const DV_AREA = 146;
const DV_GAP = 7;

// The devices drawn: the low and charging ones first, then the others, as many as fit on the desk (four at
// most), drawn from the largest at the left to the smallest at the right.
const sceneDevices = (items) => {
  const rank = (it) => (it.battery.low ? 0 : it.battery.charging ? 1 : 2);
  const picked = [];
  let used = -DV_GAP;
  for (const it of [...items].sort((a, b) => rank(a) - rank(b))) {
    const w = DV_WIDTH[it.dev.kind] || DV_WIDTH.other;
    if (picked.length >= 4 || used + DV_GAP + w > DV_AREA) continue;
    picked.push(it);
    used += DV_GAP + w;
  }
  return picked.sort((a, b) => (DV_WIDTH[b.dev.kind] || DV_WIDTH.other) - (DV_WIDTH[a.dev.kind] || DV_WIDTH.other));
};

// What a device's screen shows, inside the screen box (x, y, w, h).
const dvScreen = (it, x, y, w, h, rx = 1) => {
  const b = it.battery;
  const on = !it.stale;
  let inner = "";
  if (on) {
    const cx = x + w / 2;
    const cy = y + h / 2;
    const s = Math.min(w, h) * 0.55;
    if (b.charging) inner += `<g class="dv-bolt"><path transform="translate(${(cx - s / 2).toFixed(2)} ${(cy - s / 2 - 1).toFixed(2)}) scale(${(s / 24).toFixed(3)})" d="${ICONS.bolt}"/></g>`;
    else if (b.low) {
      const bw = Math.min(w * 0.6, 14);
      const bh = Math.min(h * 0.32, 7);
      const bx = cx - bw / 2;
      const by = cy - bh / 2 - 1;
      inner += `<g class="dv-low"><rect x="${bx.toFixed(2)}" y="${by.toFixed(2)}" width="${bw.toFixed(2)}" height="${bh.toFixed(2)}" rx=".8"/><rect class="tip" x="${(bx + bw).toFixed(2)}" y="${(cy - 2).toFixed(2)}" width="1.2" height="2" rx=".3"/><rect class="lvl" x="${(bx + 1).toFixed(2)}" y="${(by + 1).toFixed(2)}" width="${Math.max(1, (bw - 2) * Math.min(1, (b.v ?? 0) / 100) + 1).toFixed(2)}" height="${(bh - 2).toFixed(2)}" rx=".4"/></g>`;
    } else if (it.dev.kind === "laptop" || it.dev.kind === "desktop") {
      // A few lines of text and a blinking caret.
      const lx = x + 3;
      inner += `<g class="dv-text"><rect x="${lx}" y="${y + 3}" width="${(w * 0.5).toFixed(1)}" height="1.4" rx=".7"/><rect x="${lx}" y="${y + 6.5}" width="${(w * 0.7).toFixed(1)}" height="1.4" rx=".7"/><rect x="${lx}" y="${y + 10}" width="${(w * 0.35).toFixed(1)}" height="1.4" rx=".7"/></g><rect class="dv-caret" x="${(lx + w * 0.35 + 1.5).toFixed(1)}" y="${y + 9.4}" width="1" height="2.6"/>`;
    }
    // The battery level, as a thin bar at the bottom of the screen.
    if (b.v !== null && w >= 8) {
      const bw = w - 4;
      inner += `<rect class="dv-bar" x="${x + 2}" y="${(y + h - 2.6).toFixed(2)}" width="${bw}" height="1.2" rx=".6"/><rect class="dv-bar-v ${b.cls}" x="${x + 2}" y="${(y + h - 2.6).toFixed(2)}" width="${((bw * Math.max(0, Math.min(100, b.v))) / 100).toFixed(2)}" height="1.2" rx=".6"/>`;
    }
  }
  return `<rect class="dv-scr${on ? " on" : ""}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"/>${inner}`;
};

// One device at x (its left edge), standing on the desk (y 80).
const dvDevice = (it, x) => {
  const k = KINDS.includes(it.dev.kind) ? it.dev.kind : "other";
  let g;
  if (k === "laptop")
    g = `<rect class="dv-body" x="${x + 6}" y="47" width="46" height="30" rx="2"/>${dvScreen(it, x + 8.5, 49.5, 41, 25)}<rect class="dv-base" x="${x}" y="77" width="58" height="3" rx="1"/>`;
  else if (k === "desktop")
    g = `<rect class="dv-body" x="${x}" y="42" width="44" height="28" rx="2"/>${dvScreen(it, x + 2.5, 44.5, 39, 23)}<rect class="dv-base" x="${x + 19.5}" y="70" width="5" height="7.5"/><rect class="dv-base" x="${x + 12}" y="77" width="20" height="3" rx="1"/>`;
  else if (k === "tablet")
    g = `<g transform="rotate(-7 ${x + 13} 80)"><rect class="dv-body" x="${x + 1}" y="48" width="24" height="32" rx="2.5"/>${dvScreen(it, x + 3, 50, 20, 28)}</g>`;
  else if (k === "phone") g = `<rect class="dv-body" x="${x}" y="57" width="12" height="23" rx="2.5"/>${dvScreen(it, x + 1.5, 59, 9, 18.5)}`;
  else if (k === "watch")
    g = `<rect class="dv-band" x="${x + 3.5}" y="60" width="5" height="17"/><rect class="dv-body" x="${x + 1}" y="63" width="10" height="11" rx="3"/>${dvScreen(it, x + 2.3, 64.3, 7.4, 8.4, 2)}<rect class="dv-base" x="${x}" y="77" width="12" height="3" rx="1.5"/>`;
  else if (k === "car")
    g = `<path class="dv-car" d="M${x + 2} 76V70.5Q${x + 2} 68 ${x + 5} 67.6L${x + 8.5} 62.2Q${x + 9.5} 61 ${x + 11} 61H${x + 20}Q${x + 21.6} 61 ${x + 22.6} 62.4L${x + 25.6} 67.4Q${x + 28} 68 ${x + 28} 70.5V76Z"/>${dvScreen(it, x + 10, 62.6, 11, 5, 0.6)}<circle class="dv-wheel" cx="${x + 8}" cy="76.5" r="3.5"/><circle class="dv-wheel" cx="${x + 22}" cy="76.5" r="3.5"/>`;
  else g = `<rect class="dv-body" x="${x}" y="50" width="24" height="27" rx="2"/>${dvScreen(it, x + 2, 52, 20, 23)}<rect class="dv-base" x="${x + 4}" y="77" width="16" height="3" rx="1"/>`;
  // A charging device: its cable runs along the desk to the right edge.
  const cable = it.battery.charging && !it.stale ? `<path class="dv-cable" d="M${x + (DV_WIDTH[k] || 24) - 3} 79.4H200"/>` : "";
  return `${cable}<g class="dv-dev ${k}">${g}</g>`;
};

const STARS = [
  [19, 15, 0.6],
  [25, 27, 0.5],
  [31, 13, 0.45],
  [40, 30, 0.5],
];

// The whole picture. `uid` keeps each card's clip path apart on a page with several cards.
const deviceSceneSvg = (uid, items) => {
  const list = sceneDevices(items);
  const total = list.reduce((s, it) => s + (DV_WIDTH[it.dev.kind] || DV_WIDTH.other), 0) + DV_GAP * Math.max(0, list.length - 1);
  let x = 196 - total;
  const devs = list
    .map((it) => {
      const svg = dvDevice(it, x);
      x += (DV_WIDTH[it.dev.kind] || DV_WIDTH.other) + DV_GAP;
      return svg;
    })
    .join("");
  // A short row (one or two small devices) is drawn larger, from the desk's right corner.
  const k = total ? Math.min(1.6, (DV_AREA * 0.75) / total) : 1;
  const group = k > 1 ? `<g transform="translate(196 80) scale(${k.toFixed(3)}) translate(-196 -80)">${devs}</g>` : devs;
  const stars = STARS.map(([sx, sy, r], i) => `<circle class="dv-star${i % 2 ? " tw" : ""}" cx="${sx}" cy="${sy}" r="${r}"/>`).join("");
  return `<svg class="dv-scene" viewBox="0 0 200 80" preserveAspectRatio="xMaxYMax meet" aria-hidden="true" focusable="false">
    <defs><clipPath id="dv-win-${uid}"><rect x="14" y="10" width="30" height="26" rx="1.5"/></clipPath></defs>
    <rect class="dv-pane" x="14" y="10" width="30" height="26" rx="1.5"/>
    <g clip-path="url(#dv-win-${uid})">
      <g class="dv-day"><circle class="dv-sun" cx="36" cy="17" r="4"/><path class="dv-cloud" d="M12 28a3.4 3.4 0 0 1 5-2.8 4.2 4.2 0 0 1 8 1.2 2.6 2.6 0 0 1 .4 5.2H14a2.6 2.6 0 0 1-2-3.6Z"/></g>
      <g class="dv-night">${stars}<path class="dv-moon" d="M35 13.6a4.6 4.6 0 1 0 4 6.9 3.8 3.8 0 1 1-4-6.9Z"/></g>
    </g>
    <path class="dv-frame" d="M14.8 10.8h28.4v24.4H14.8ZM29 10.8v24.4M14.8 23h28.4"/>
    ${group}
  </svg>`;
};

// The illustration's colours and animations, day and night (all still with reduced motion, see BASE_STYLE).
const SCENE_STYLE = `
  .banner { position: relative; overflow: hidden; height: 90px; --g: 10px; --sw: min(200px, 62%); background: #eef1f6; color: #0d2a45; }
  .banner.night { background: #262c3a; color: #fff; }
  .dv-scene { position: absolute; right: 0; bottom: var(--g); width: var(--sw); height: calc(100% - var(--g)); overflow: visible; }
  .ground { position: absolute; left: 0; right: 0; bottom: 0; height: var(--g); background: #b98a5c; box-shadow: inset 0 2px 0 #d4a878; }
  .night .ground { background: #4a3a2c; box-shadow: inset 0 2px 0 #5c4836; }
  .dv-night, .night .dv-day { display: none; }
  .night .dv-night { display: inline; }
  .dv-pane { fill: #bfe0f7; } .night .dv-pane { fill: #1b2f52; }
  .dv-frame { fill: none; stroke: #fff; stroke-width: 1.6; stroke-linejoin: round; } .night .dv-frame { stroke: #4a5568; }
  .dv-sun { fill: #ffd65a; }
  .dv-cloud { fill: #fff; opacity: .92; animation: dv-drift 7s ease-in-out infinite alternate; }
  .dv-moon { fill: #f4f1dc; }
  .dv-star { fill: #fff; } .dv-star.tw { animation: dv-twinkle 2.6s ease-in-out infinite alternate; }
  .dv-body { fill: #2a3038; } .dv-band { fill: #4a5260; }
  .night .dv-body { fill: #13171e; stroke: #5d6878; stroke-width: .6; } .night .dv-band { fill: #5d6878; } .dv-base { fill: #9aa3ae; } .night .dv-base { fill: #6b7482; }
  .dv-car { fill: #5a8fc9; } .night .dv-car { fill: #4a77a8; } .dv-wheel { fill: #2a3038; } .night .dv-wheel { fill: #13171e; stroke: #5d6878; stroke-width: .6; }
  .dv-scr { fill: #3a4250; } .night .dv-scr { fill: #1d222b; }
  .dv-scr.on { fill: #a9d1ef; } .night .dv-scr.on { fill: #3d5a8a; }
  .laptop .dv-scr.on, .desktop .dv-scr.on { fill: #86b9de; } .night .laptop .dv-scr.on, .night .desktop .dv-scr.on { fill: #35507e; }
  .dv-text rect { fill: #fff; opacity: .7; } .night .dv-text rect { opacity: .45; }
  .dv-caret { fill: #fff; animation: dv-caret 1.1s steps(1) infinite; }
  .dv-bar { fill: rgba(255,255,255,.55); } .night .dv-bar { fill: rgba(255,255,255,.2); }
  .dv-bar-v { fill: var(--c); }
  .dv-bolt path { fill: #2fb556; } .night .dv-bolt path { fill: #5fe08a; }
  .dv-bolt { transform-box: fill-box; transform-origin: center; animation: dv-beat 1s ease-in-out infinite; }
  .dv-low rect { fill: none; stroke: #d93a3a; stroke-width: .8; } .dv-low .tip, .dv-low .lvl { fill: #d93a3a; stroke: none; }
  .night .dv-low rect { stroke: #ff6b6b; } .night .dv-low .tip, .night .dv-low .lvl { fill: #ff6b6b; }
  .dv-low { animation: dv-blink 1.5s ease-in-out infinite; }
  .dv-cable { fill: none; stroke: #5f6b7a; stroke-width: .8; } .night .dv-cable { stroke: #8a95a5; }
  @keyframes dv-drift { from { transform: translateX(0); } to { transform: translateX(7px); } }
  @keyframes dv-twinkle { from { opacity: .3; } to { opacity: 1; } }
  @keyframes dv-caret { 0% { opacity: 1; } 50% { opacity: 0; } }
  @keyframes dv-beat { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.2); } }
  @keyframes dv-blink { 0%, 100% { opacity: 1; } 50% { opacity: .3; } }
  /* The round icon (40 px, in the color of the devices' state, the Mobile App badge at its bottom right), then the
     title and the subtitle, on the wall at the left. */
  .htext { position: absolute; z-index: 1; left: 0; top: 0; bottom: var(--g); right: var(--sw); display: flex; align-items: center; gap: 10px;
           padding: 8px 8px 8px 12px; min-width: 0; }
  .htext .titles { flex: 1 1 auto; min-width: 0; container: dc-titles / inline-size; display: flex; flex-direction: column; align-items: flex-start; }
  .htext .titles > * { max-width: 100%; }
  .banner .chip { background: color-mix(in srgb, var(--c) 18%, rgba(255,255,255,.78)); color: color-mix(in srgb, var(--c) 45%, #0d2a45); }
  .banner.night .chip { background: color-mix(in srgb, var(--c) 30%, rgba(8,18,38,.55)); color: color-mix(in srgb, var(--c) 35%, #ffffff); }
  .banner .name { font-size: 16px; font-weight: 500; }
  .banner .sub { font-size: 13px; color: #3b5b78; }
  .banner.night .sub { color: rgba(255,255,255,.78); }
  .banner .badge { background: rgba(255,255,255,.62); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--c) 22%, transparent); }
  .banner .badge .icon { fill: color-mix(in srgb, var(--c) 82%, #0d2a45); }
  .banner.night .badge { background: rgba(255,255,255,.12); box-shadow: inset 0 0 0 1px rgba(255,255,255,.14); }
  .banner.night .badge .icon { fill: color-mix(in srgb, var(--c) 72%, #fff); }
  .banner .zoom { position: absolute; z-index: 2; top: 5px; right: 5px; margin: 0; width: 24px; height: 24px; box-sizing: border-box; border: none; color: #33506b;
                  background: rgba(255,255,255,.55); box-shadow: inset 0 0 0 1px rgba(255,255,255,.7); backdrop-filter: blur(4px); }
  .banner .zoom .icon { width: 16px; height: 16px; }
  .banner .zoom:hover { background: rgba(255,255,255,.75); color: #33506b; }
  .banner.night .zoom { color: #fff; background: rgba(255,255,255,.12); box-shadow: inset 0 0 0 1px rgba(255,255,255,.2); }
  .banner.night .zoom:hover { background: rgba(255,255,255,.22); color: #fff; }
  /* Narrow card: no room for the desk beside the text, the wall and the desk strip alone stay. */
  /* Mid-width card: the text takes the window's place (the window goes), the devices keep theirs. */
  @container dc-card (max-width: 360px) {
    .htext { right: calc(var(--sw) - 46px); }
    .dv-pane, .dv-frame, .dv-scene > g[clip-path] { display: none; }
  }
  @container dc-card (max-width: 260px) { .dv-scene { display: none; } .htext { right: 0; padding-right: 34px; } }
`;

// Night picture: forced by illustration_theme, else the sun below the horizon, else Home Assistant's dark mode.
const isNight = (hass, config) => {
  if (config.illustration_theme === "night") return true;
  if (config.illustration_theme === "day") return false;
  const sun = hass?.states?.["sun.sun"];
  if (valid(sun)) return sun.state === "below_horizon";
  return !!hass?.themes?.darkMode;
};

// The state of the devices together, the color of the header icon: a low battery (red), a device not seen for a
// while (amber), one charging (blue), else all good (green), grey when no device reports a battery.
const headerState = (items) => {
  if (items.some((i) => i.battery.low)) return "crit";
  if (items.some((i) => i.stale)) return "warn";
  if (items.some((i) => i.battery.charging)) return "active";
  return items.some((i) => i.battery.v !== null) ? "ok" : "idle";
};

let _uid = 0;

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const BASE_STYLE = `
  :host { --dc-accent: #009688; --dc-ok: var(--success-color, #43a047); --dc-warn: var(--warning-color, #ffa600);
          --dc-crit: var(--error-color, #db4437); --dc-idle: var(--disabled-text-color, #9e9e9e); --dc-active: var(--info-color, #039be5); }
  ha-card { overflow: hidden; container: dc-card / inline-size; position: relative; }
  /* A size container has no width of its own: this zero-height grid gives the card a natural width without a minimum. */
  :host { display: block; min-width: 0; --dc-natural-width: 380px; }
  :host::before { content: ""; display: grid; grid-template-columns: minmax(0, var(--dc-natural-width)); height: 0; }
  .icon { width: 18px; height: 18px; fill: currentColor; fill-rule: evenodd; flex: none; }
  .clickable { cursor: pointer; }
  [role="button"]:focus-visible, button:focus-visible { outline: 2px solid var(--primary-color, var(--dc-accent)); outline-offset: 2px; border-radius: 6px; }
  @media (prefers-reduced-motion: reduce) { *, *::before, *::after { transition: none !important; animation: none !important; } }
  .ok { --c: var(--dc-ok); } .warn { --c: var(--dc-warn); } .crit { --c: var(--dc-crit); } .idle { --c: var(--dc-idle); } .active { --c: var(--dc-active); }
  .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--c, var(--dc-ok)); flex: none; display: inline-block; }
  .chip { display: inline-flex; align-items: center; gap: 4px; padding: 1px 8px; border-radius: 12px; font-size: 11px; font-weight: 500; white-space: nowrap;
          background: color-mix(in srgb, var(--c, var(--dc-ok)) 15%, transparent); color: color-mix(in srgb, var(--c, var(--dc-ok)) 50%, var(--primary-text-color));
          flex: 0 1 auto; min-width: 0; max-width: 50%; overflow: hidden; box-sizing: border-box; }
  .chip-text { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .header { display: flex; align-items: center; gap: 10px; padding: 12px 12px 0; }
  .titles { flex: 1 1 0; min-width: 5ch; container: dc-titles / inline-size; display: flex; flex-direction: column; align-items: flex-start; }
  .titles > * { max-width: 100%; }
  /* Banner and classic header: the state pill sits on the title line, right after the title: the title ellipsises first (never under 4
     characters), the pill keeps its whole label. Without room for both, the pill goes on its own line under the
     subtitle; on a very narrow card only its dot is left (the label stays in its tooltip and aria-label). */
  .trow { display: flex; align-items: center; gap: 8px; min-width: 0; }
  .trow .name { flex: 0 1 auto; min-width: 4ch; }
  .trow .chip { flex: none; max-width: calc(100% - 4ch - 8px); line-height: 16px; }
  @container dc-titles (max-width: 170px) {
    .trow { display: contents; }
    .trow .name, .trow .chip { max-width: 100%; }
    .trow .chip { order: 3; margin-top: 3px; }
  }
  :host([hide-title]) .titles .name, :host([hide-subtitle]) .titles > .sub { display: none; }
  .name { font-size: 16px; font-weight: 500; line-height: 1.25; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .sub { font-size: 12px; color: var(--secondary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .badge { position: relative; display: flex; flex: none; width: 40px; height: 40px; border-radius: 50%; align-items: center; justify-content: center;
           background: color-mix(in srgb, var(--c, var(--dc-accent)) 16%, transparent); }
  .badge .icon { width: 24px; height: 24px; fill: color-mix(in srgb, var(--c, var(--dc-accent)) 70%, var(--primary-text-color)); fill-rule: nonzero; }
  /* The Mobile App logo on the header icon: on a white tile, readable on any theme. */
  .brand { position: absolute; right: -4px; bottom: -4px; width: 18px; height: 18px; border-radius: 5px; padding: 2px; box-sizing: border-box;
           display: grid; place-items: center; background: #fff;
           box-shadow: 0 0 0 1px var(--divider-color, rgba(0,0,0,.12)), 0 0 0 2px var(--card-background-color, #fff); }
  .brand img { width: 100%; height: 100%; object-fit: contain; }
  .warning { padding: 16px; color: color-mix(in srgb, var(--dc-warn) 50%, var(--primary-text-color)); }
  .zoom { all: unset; flex: none; cursor: pointer; width: 24px; height: 24px; margin: -2px -4px 0 0; border-radius: 50%;
          display: grid; place-items: center; color: var(--secondary-text-color);
          background: color-mix(in srgb, var(--dc-idle) 10%, transparent); border: 1px solid color-mix(in srgb, var(--dc-idle) 25%, transparent); }
  .zoom .icon { width: 14px; height: 14px; }
  .zoom:hover { background: color-mix(in srgb, var(--dc-idle) 18%, transparent); color: var(--primary-text-color); }
  /* Outline buttons: smoked glass, the accent for the main action; never filled. */
  .btn { all: unset; box-sizing: border-box; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 6px; min-height: 32px;
         padding: 4px 12px; border-radius: 16px; font-size: 13px; font-weight: 500; color: var(--primary-text-color);
         background: color-mix(in srgb, var(--dc-idle) 10%, transparent); border: 1px solid color-mix(in srgb, var(--dc-idle) 30%, transparent); }
  .btn:hover { background: color-mix(in srgb, var(--dc-idle) 18%, transparent); }
  .btn .icon { width: 16px; height: 16px; }
  .btn.main { color: color-mix(in srgb, var(--b, var(--dc-accent)) 60%, var(--primary-text-color)); border-color: color-mix(in srgb, var(--b, var(--dc-accent)) 55%, transparent);
              background: color-mix(in srgb, var(--b, var(--dc-accent)) 10%, transparent); }
  .btn.main:hover { background: color-mix(in srgb, var(--b, var(--dc-accent)) 18%, transparent); }
  .btn.danger { --b: var(--dc-crit); }
  /* Ring confirmation: at the top of the card, over a veil of the card. */
  .veil { position: absolute; inset: 0; z-index: 2; background: color-mix(in srgb, var(--card-background-color, #fff) 55%, transparent); backdrop-filter: blur(2px); }
  .popup { position: absolute; z-index: 3; top: 8px; left: 8px; right: 8px; padding: 14px; border-radius: 14px; display: flex; flex-direction: column; gap: 8px;
           background: var(--card-background-color, #fff); border: 1px solid color-mix(in srgb, var(--dc-crit) 40%, var(--divider-color, transparent));
           box-shadow: 0 6px 24px rgba(0,0,0,.25); }
  .popup .p-title { display: flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 500; }
  .popup .p-title .icon { color: var(--dc-crit); width: 20px; height: 20px; }
  .popup .p-text { font-size: 13px; color: var(--secondary-text-color); }
  .popup .p-actions { display: flex; justify-content: flex-end; gap: 8px; flex-wrap: wrap; margin-top: 4px; }
  @container dc-card (max-width: 230px) { .header { gap: 6px; } }
  /* At 200 px or less, only the pill's dot: its label stays in its tooltip and for screen readers. */
  @container dc-card (max-width: 200px) { .chip { padding: 4px; flex: none; } .chip-text { display: none; } }
`;

const FULL_STYLE = `
  .list { padding: 6px 0 4px; display: flex; flex-direction: column; }
  /* One row per device, separated by hairlines. */
  .dev + .dev { border-top: 1px solid var(--divider-color, rgba(127,127,127,.2)); }
  .dev.open { background: color-mix(in srgb, var(--secondary-background-color, rgba(127,127,127,.08)) 45%, transparent); }
  .row { display: flex; align-items: center; gap: 12px; padding: 8px 12px; cursor: pointer; user-select: none; min-width: 0; }
  .row:hover { background: color-mix(in srgb, var(--dc-idle) 7%, transparent); }
  .row .rg { width: 36px; height: 36px; flex: none; }
  .row .main { flex: 1; min-width: 0; }
  .row .t1 { font-size: 14px; font-weight: 500; line-height: 1.3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .row .t2 { font-size: 12px; line-height: 1.35; color: var(--secondary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .row .t2 .stale { color: color-mix(in srgb, var(--dc-warn) 60%, var(--primary-text-color)); }
  .row .pct { font-size: 17px; font-weight: 400; white-space: nowrap; }
  .row .pct small { font-size: 12px; margin-left: 1px; color: var(--secondary-text-color); }
  .row .pct.crit { color: color-mix(in srgb, var(--dc-crit) 70%, var(--primary-text-color)); font-weight: 500; }
  .row .chevron { width: 18px; height: 18px; color: var(--secondary-text-color); transition: transform .2s ease; transform: rotate(-90deg); }
  .row[aria-expanded="true"] .chevron { transform: none; }
  .body { padding: 0 12px 12px 60px; display: flex; flex-direction: column; gap: 8px; }
  .alert { display: flex; align-items: center; gap: 8px; font-size: 13px; padding: 7px 10px; border-radius: 10px;
           background: color-mix(in srgb, var(--c, var(--dc-crit)) 12%, transparent); border: 1px solid color-mix(in srgb, var(--c, var(--dc-crit)) 35%, transparent);
           color: color-mix(in srgb, var(--c, var(--dc-crit)) 50%, var(--primary-text-color)); }
  .alert .icon { width: 18px; height: 18px; color: var(--c, var(--dc-crit)); }
  .tiles { display: grid; grid-template-columns: repeat(auto-fill, minmax(124px, 1fr)); gap: 6px; }
  .tile { display: flex; flex-direction: column; gap: 2px; padding: 6px 10px; border-radius: 10px; min-width: 0; background: var(--secondary-background-color, rgba(127,127,127,.08)); }
  .dev.open .tile { background: var(--card-background-color, #fff); }
  .tile .k { display: flex; align-items: center; gap: 4px; font-size: 11px; color: var(--secondary-text-color); white-space: nowrap; overflow: hidden; }
  .tile .k span { min-width: 0; overflow: hidden; text-overflow: ellipsis; }
  .tile .k .icon { width: 14px; height: 14px; color: var(--c, var(--secondary-text-color)); }
  .tile .v { font-size: 14px; font-weight: 500; line-height: 1.3; overflow-wrap: anywhere; }
  .tile .s { font-size: 11px; color: var(--secondary-text-color); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .tile.warn .v, .tile.crit .v { color: color-mix(in srgb, var(--c) 50%, var(--primary-text-color)); }
  .tile .bar { height: 4px; border-radius: 3px; margin-top: 3px; background: color-mix(in srgb, var(--c, var(--dc-ok)) 18%, transparent); overflow: hidden; }
  .tile .bar > div { height: 100%; border-radius: 3px; background: var(--c, var(--dc-ok)); transition: width .6s ease; }
  .actions { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
  .sent { font-size: 12px; color: var(--secondary-text-color); }
  @container dc-card (max-width: 300px) {
    .tiles { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .body { padding-left: 12px; }
  }
  @container dc-card (max-width: 200px) {
    .tiles { grid-template-columns: minmax(0, 1fr); }
    .row .chevron { display: none; }
  }
`;

const MINI_STYLE = `
  :host { --dc-natural-width: 300px; }
  .rings { display: grid; grid-template-columns: repeat(auto-fill, minmax(64px, 1fr)); gap: 6px 4px; padding: 10px 10px 12px; }
  .item { display: flex; flex-direction: column; align-items: center; gap: 2px; min-width: 0; padding: 4px 2px; border-radius: 10px; }
  .item:hover { background: color-mix(in srgb, var(--dc-idle) 8%, transparent); }
  .item .rg { width: 48px; height: 48px; }
  .item .n { font-size: 11px; color: var(--secondary-text-color); max-width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .item .p { font-size: 13px; font-weight: 500; line-height: 1.2; }
  .item.crit .p { color: color-mix(in srgb, var(--dc-crit) 70%, var(--primary-text-color)); }
`;

// Element names of Home Assistant dialogs (more-info opened from the card, among others).
const DIALOG_TAGS = new Set(["HA-MORE-INFO-DIALOG", "HA-DIALOG", "DIALOG"]);
const isOutside = (card, ev) => {
  const path = ev.composedPath();
  return !path.includes(card) && !path.some((n) => DIALOG_TAGS.has(n.tagName));
};

// "A click elsewhere" is caught on the pointer, not only on the click event: on iOS (Safari and the companion app)
// a tap on something that is not clickable sends no click to the page. It counts when the press and the release are
// both outside the card, and a scroll does not count (the browser cancels the pointer). Keyboard clicks still go
// through the click event.
const watchOutside = (card, handler) => {
  let downOutside = false;
  const onDown = (ev) => {
    downOutside = isOutside(card, ev);
  };
  const onUp = (ev) => {
    if (downOutside && isOutside(card, ev)) handler(ev);
    downOutside = false;
  };
  const onClick = (ev) => {
    if (ev.detail === 0 && isOutside(card, ev)) handler(ev);
  };
  return {
    on() {
      document.addEventListener("pointerdown", onDown, true);
      document.addEventListener("pointerup", onUp, true);
      document.addEventListener("click", onClick, true);
    },
    // A tap (press and release at the same spot), for the tests.
    tap(ev) {
      onDown(ev);
      onUp(ev);
    },
    off() {
      document.removeEventListener("pointerdown", onDown, true);
      document.removeEventListener("pointerup", onUp, true);
      document.removeEventListener("click", onClick, true);
    },
  };
};

// Brings `from`'s children in line with `to`'s, position by position: nodes of the same kind are kept and updated
// (text, attributes, then their own children), the others replaced, added or removed. The rings keep running while
// the battery level moves, and the focus stays where it was.
const morph = (from, to) => {
  const a = Array.from(from.childNodes);
  const b = Array.from(to.childNodes);
  for (let i = 0; i < b.length; i++) {
    const na = a[i];
    const nb = b[i];
    if (!na) from.appendChild(nb);
    else if (na.nodeType !== nb.nodeType || na.nodeName !== nb.nodeName) from.replaceChild(nb, na);
    else if (nb.nodeType !== 1) {
      if (na.nodeValue !== nb.nodeValue) na.nodeValue = nb.nodeValue;
    } else {
      for (const at of Array.from(na.attributes)) if (!nb.hasAttribute(at.name)) na.removeAttribute(at.name);
      for (const at of Array.from(nb.attributes)) if (na.getAttribute(at.name) !== at.value) na.setAttribute(at.name, at.value);
      morph(na, nb);
    }
  }
  for (let i = a.length - 1; i >= b.length; i--) from.removeChild(a[i]);
};

const sameDeps = (a, b) => !!a && a.length === b.length && a.every((d, i) => d === b[i]);

// ---------------------------------------------------------------------------
// Cards
// ---------------------------------------------------------------------------

class DeviceBase extends HTMLElement {
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
    return [h.entities, h.devices, h.services, h.language, h.locale, h.themes?.darkMode, h.states["sun.sun"]?.state, this._minute, ...ids.map((id) => h.states[id])];
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
      return;
    }
    const tpl = document.createElement("template");
    tpl.innerHTML = html;
    morph(root, tpl.content);
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
    const prefix = { ios: /ipad/i.test(d.model) ? "iPadOS" : "iOS", macos: "macOS", android: "Android" }[d.platform];
    return new RegExp(`^${prefix}`, "i").test(os) ? os : `${prefix} ${os}`;
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

class DeviceCard extends DeviceBase {
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

class DeviceMiniCard extends DeviceCard {
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

// ---------------------------------------------------------------------------
// Visual editors (ha-form)
// ---------------------------------------------------------------------------

const LANGUAGES = [
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
const cleanConfig = (value, defaults) => {
  const config = { ...value };
  for (const [k, v] of Object.entries(config)) {
    const empty = v === "" || v === undefined || v === null || (Array.isArray(v) && !v.length);
    if (empty || (k in defaults && JSON.stringify(v) === JSON.stringify(defaults[k]))) delete config[k];
  }
  return config;
};

class DeviceCardEditor extends HTMLElement {
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
class DeviceMiniCardEditor extends DeviceCardEditor {
  static get toggles() {
    return [...DeviceCardEditor.toggles, ["show_names", true], ["zoom", true]];
  }
}

// ---------------------------------------------------------------------------
// Registration
// ---------------------------------------------------------------------------

const define = (name, cls) => {
  if (!customElements.get(name)) customElements.define(name, cls);
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
