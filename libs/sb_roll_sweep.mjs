// Post-roll geometry sweep: gallery + storyboard at desktop & mobile.
// Reports x-overflows with owner attribution (nearest panel/section).
import { chromium } from 'playwright';

const BASE = 'http://localhost:4174';
const VIEWPORTS = [
  { name: 'desktop', w: 1440, h: 900 },
  { name: 'mobile', w: 390, h: 844 },
];

const browser = await chromium.launch();
for (const pageName of ['gallery', 'storyboard']) {
  for (const vp of VIEWPORTS) {
    const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(`${BASE}/#${pageName}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);

    const report = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const docOverflow = document.documentElement.scrollWidth - vw;
      const hits = [];
      const seen = new Set();
      for (const el of document.querySelectorAll('*')) {
        const r = el.getBoundingClientRect();
        if (r.right > vw + 0.5 || r.left < -0.5) {
          // attribute to nearest owning panel / scene / section
          let owner = el.closest('.bbg-panel, .bbg-stage, section, .hero-diagram, .gallery, .stage-demo, .sb-scene0, .sb-scene2, .sb-scene3, .sb-hospital');
          let cls = el.className?.baseVal ?? el.className ?? '';
          if (typeof cls !== 'string') cls = String(cls);
          const tag = el.tagName.toLowerCase() + (cls ? '.' + cls.split(/\s+/).slice(0, 2).join('.') : '');
          const key = `${owner ? owner.className || owner.tagName : 'root'}::${tag}`;
          if (seen.has(key)) continue;
          seen.add(key);
          hits.push({
            owner: owner ? (owner.className || owner.tagName) : 'root',
            el: tag,
            left: Math.round(r.left),
            right: Math.round(r.right),
            w: Math.round(r.width),
            vw,
          });
        }
      }
      return { docOverflow, hits };
    });

    console.log(`\n=== ${pageName} @ ${vp.name} (${vp.w}px) ===`);
    if (errors.length) console.log('PAGE ERRORS:', errors);
    if (report.docOverflow > 0) console.log(`DOCUMENT x-overflow: +${report.docOverflow}px`);
    else console.log('document: no x-overflow');
    if (report.hits.length === 0) console.log('no overflowing elements');
    for (const h of report.hits) {
      console.log(`  [${h.owner}] ${h.el}  x ${h.left}..${h.right} (w ${h.w}, vw ${h.vw})${h.right > h.vw ? `  → +${h.right - h.vw}px past edge` : ''}${h.left < 0 ? `  → ${h.left}px off-left` : ''}`);
    }
    await page.close();
  }
}
await browser.close();
