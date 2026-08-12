#!/usr/bin/env python3
from playwright.sync_api import sync_playwright
BASE = "http://localhost:4174"
CASES = [("gallery", 1440), ("gallery", 390), ("storyboard", 1440), ("storyboard", 390)]
SWEEP = """
() => {
  const vw = document.documentElement.clientWidth;
  const docOverflow = document.documentElement.scrollWidth - vw;
  const hits = [];
  const seen = new Set();
  for (const el of document.querySelectorAll('*')) {
    const r = el.getBoundingClientRect();
    if (r.right > vw + 0.5 || r.left < -0.5) {
      const owner = el.closest('.bbg-panel, .bbg-stage, section, .hero-diagram, .gallery, .stage-demo, .sb-scene0, .sb-scene2, .sb-scene3, .sb-hospital');
      let cls = el.className?.baseVal ?? el.className ?? '';
      if (typeof cls !== 'string') cls = String(cls);
      const tag = el.tagName.toLowerCase() + (cls ? '.' + cls.split(/\\s+/).slice(0, 2).join('.') : '');
      const key = `${owner ? (owner.className || owner.tagName) : 'root'}::${tag}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const clipped = !!el.closest('.sb-code');
      hits.push({ owner: owner ? (owner.className || owner.tagName) : 'root', el: tag,
        left: Math.round(r.left), right: Math.round(r.right), w: Math.round(r.width), vw: vw,
        clipped: clipped });
    }
  }
  return { docOverflow, hits };
}
"""
with sync_playwright() as p:
    browser = p.chromium.launch()
    for name, w in CASES:
        page = browser.new_page(viewport={"width": w, "height": 900})
        errors = []
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.goto(f"{BASE}/#{name}", wait_until="networkidle")
        page.wait_for_timeout(300)
        report = page.evaluate(SWEEP)
        print(f"\n=== {name} @ {w}px ===")
        if errors: print("PAGE ERRORS:", errors)
        if report["docOverflow"] > 0: print(f"DOCUMENT x-overflow: +{report['docOverflow']}px")
        else: print("document: no x-overflow")
        if not report["hits"]: print("no overflowing elements")
        for h in report["hits"]:
            extra = ""
            if h["clipped"]: extra = "  [clipped: internal scroll]"
            elif h["right"] > h["vw"]: extra = f"  → +{h['right'] - h['vw']}px past edge"
            elif h["left"] < 0: extra = f"  → {h['left']}px off-left"
            print(f"  [{h['owner']}] {h['el']}  x {h['left']}..{h['right']} (w {h['w']}){extra}")
        page.close()
    browser.close()
