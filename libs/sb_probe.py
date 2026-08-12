#!/usr/bin/env python3
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 390, "height": 900})
    page.goto("http://localhost:4174/#storyboard", wait_until="networkidle")
    page.wait_for_timeout(300)
    info = page.evaluate("""() => {
      const out = [];
      for (const sel of ['.sb-scene3', '.sb-col-right', '.sb-side-h', '.sb-side-h .sb-arrow-cell',
                         '.sb-side-h .bbg-arrow', '.sb-side-h .bbg-panel', '.sb-col-left']) {
        const el = document.querySelector(sel);
        if (!el) { out.push(sel + ': MISSING'); continue; }
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        out.push(`${sel}: x ${Math.round(r.left)}..${Math.round(r.right)} (w ${Math.round(r.width)}) flex:${cs.flex} wrap:${cs.flexWrap} min-w:${cs.minWidth}`);
      }
      const label = document.querySelector('.sb-side-h .bbg-arrow__label');
      if (label) { const r = label.getBoundingClientRect(); out.push(`label: x ${Math.round(r.left)}..${Math.round(r.right)} w ${Math.round(r.width)}`); }
      return out.join('\\n');
    }""")
    print(info)
    browser.close()
