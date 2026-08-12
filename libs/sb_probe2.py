#!/usr/bin/env python3
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 390, "height": 900})
    page.goto("http://localhost:4174/#storyboard", wait_until="networkidle")
    page.wait_for_timeout(500)
    info = page.evaluate("""() => {
      const out = [];
      for (const sel of ['.sb-scene3 .sb-side-h .bbg-arrow__label', '.sb-scene3 .sb-side-v .bbg-arrow__label',
                         '.sb-scene3 .sb-side-h', '.sb-scene3 .sb-col-right']) {
        const el = document.querySelector(sel);
        if (!el) { out.push(sel + ': MISSING'); continue; }
        const r = el.getBoundingClientRect();
        out.push(`${sel}: x ${Math.round(r.left)}..${Math.round(r.right)} (w ${Math.round(r.width)})`);
      }
      // all labels in scene 3
      document.querySelectorAll('#scene-3 .bbg-arrow__label').forEach(l => {
        const r = l.getBoundingClientRect();
        out.push(`label "${l.textContent}": x ${Math.round(r.left)}..${Math.round(r.right)} (w ${Math.round(r.width)})`);
      });
      return out.join('\\n');
    }""")
    print(info)
    browser.close()
