// Rend les 6 pistes de couverture en PNG 1080x1350.
// Usage : node build-covers.js
const fs = require('fs');
const path = require('path');
const { chromium } = require('/opt/node22/lib/node_modules/playwright');

const DIR = __dirname;
const OUT = path.join(DIR, 'export', 'couvertures');
const IDS = [
  ['va', 'cadre-rentre'],
  ['vb', 'sans-cadre'],
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1080, height: 1350 },
    deviceScaleFactor: 1,
  });

  await page.goto('file://' + path.join(DIR, 'covers.html'));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);

  for (const [id, name] of IDS) {
    const file = path.join(OUT, `couverture-${name}.png`);
    await page.locator('#' + id).screenshot({ path: file });
    console.log('ok ->', path.basename(file));
  }

  await browser.close();
})();
