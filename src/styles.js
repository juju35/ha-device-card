// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

export const BASE_STYLE = `
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
  /* Banner and classic header: the state pill sits on the title line, right after the title, when the whole title and
     its whole label fit there; otherwise it goes on its own line under the subtitle, and when even that is too tight
     only its dot is left (the label stays in its tooltip and aria-label). Decided by measure (see _fitPill). */
  .trow { display: flex; align-items: center; gap: 8px; min-width: 0; }
  .trow .name { flex: 0 1 auto; min-width: 0; }
  .trow .chip { flex: none; max-width: none; line-height: 16px; }
  .titles.pill-below .trow { display: contents; }
  .titles.pill-below .trow .name { max-width: 100%; }
  .titles.pill-below .trow .chip { order: 3; margin-top: 3px; max-width: 100%; }
  .titles.pill-dot .chip { padding: 4px; } .titles.pill-dot .chip-text { display: none; }
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
  .veil { position: absolute; inset: 0; z-index: 2; background: color-mix(in srgb, var(--card-background-color, #fff) 55%, transparent); -webkit-backdrop-filter: blur(2px); backdrop-filter: blur(2px); }
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

export const FULL_STYLE = `
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

export const MINI_STYLE = `
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
export const DIALOG_TAGS = new Set(["HA-MORE-INFO-DIALOG", "HA-DIALOG", "DIALOG"]);
export const isOutside = (card, ev) => {
  const path = ev.composedPath();
  return !path.includes(card) && !path.some((n) => DIALOG_TAGS.has(n.tagName));
};

// "A click elsewhere" is caught on the pointer, not only on the click event: on iOS (Safari and the companion app)
// a tap on something that is not clickable sends no click to the page. It counts when the press and the release are
// both outside the card, and a scroll does not count (the browser cancels the pointer). Keyboard clicks still go
// through the click event.
export const watchOutside = (card, handler) => {
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
export const morph = (from, to) => {
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

export const sameDeps = (a, b) => !!a && a.length === b.length && a.every((d, i) => d === b[i]);
