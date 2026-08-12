#!/usr/bin/env python3
from playwright.sync_api import sync_playwright
BASE = "http://localhost:4174"
with sync_playwright() as p:
    browser = p.chromium.launch()
    # lakehouse: viewport shots (horizontal deck, scene 0 = hero)
    for name, w, h in [("lh-desktop", 1440, 900), ("lh-mobile", 390, 844)]:
        page = browser.new_page(viewport={"width": w, "height": h})
        page.goto(f"{BASE}/#lakehouse", wait_until="networkidle")
        page.wait_for_timeout(500)
        page.screenshot(path=f"/tmp/lh_finish/{name}-scene0.png")
        # scene 1 of the deck
        page.evaluate("""() => {
          const scroller = [...document.querySelectorAll('*')].find(e => e.scrollWidth > e.clientWidth + 2 &&
            ['auto','scroll'].includes(getComputedStyle(e).overflowX));
          if (scroller) scroller.scrollLeft = window.innerWidth;
        }""")
        page.wait_for_timeout(200)
        page.screenshot(path=f"/tmp/lh_finish/{name}-scene1.png")
        page.close()
    # gallery + storyboard: full-page
    for name, w, h in [("gallery-desktop", 1440, 900), ("gallery-mobile", 390, 844),
                       ("storyboard-desktop", 1440, 900), ("storyboard-mobile", 390, 844)]:
        page = browser.new_page(viewport={"width": w, "height": h})
        page.goto(f"{BASE}/#{name.split('-')[0]}", wait_until="networkidle")
        page.wait_for_timeout(500)
        page.screenshot(path=f"/tmp/lh_finish/{name}-full.png", full_page=True)
        page.close()
    browser.close()
print("done")
