// Rend les 7 slides du carrousel "Le miroir" en PNG 1080x1350.
// Usage : node build.js
const path = require('path');
const { chromium } = require('/opt/node22/lib/node_modules/playwright');

const DIR = __dirname;
const IDS = ['s1', 's2', 's3', 's4', 's5', 's6', 's7'];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1080, height: 1350 },
    deviceScaleFactor: 1,
  });

  await page.goto('file://' + path.join(DIR, 'slides.html'));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);

  for (let i = 0; i < IDS.length; i++) {
    const file = path.join(DIR, 'export', `le-miroir-${String(i + 1).padStart(2, '0')}.png`);
    await page.locator('#' + IDS[i]).screenshot({ path: file });
    console.log('ok ->', path.basename(file));
  }

  await browser.close();
})();
