// Rend les couvertures de posts.json — sert à tester le feed, pas à publier.
// Pour un carrousel complet : node build-carrousel.js <nom>
// Usage : node build-covers.js
const fs = require('fs');
const path = require('path');
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const DA = require('./da');
const LAYOUTS = require('./layouts-couverture');

const DIR = __dirname;
const OUT = path.join(DIR, 'export', 'couvertures');
const posts = JSON.parse(fs.readFileSync(path.join(DIR, 'posts.json'), 'utf8'));

const html = DA.page(
  'Couvertures',
  posts
    .map(
      (p) => `<div class="sl" id="${p.id}">
  ${LAYOUTS[p.layout](p)}
  ${DA.furniture({ tag: 'Psychologie &middot; Influence', fill: DA.fill(1, 7) })}
</div>`
    )
    .join('\n')
);

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(DIR, 'covers.html'), html);

  const browser = await chromium.launch();
  const tab = await browser.newPage({
    viewport: { width: DA.TOKENS.w, height: DA.TOKENS.h },
    deviceScaleFactor: 1,
  });
  await tab.goto('file://' + path.join(DIR, 'covers.html'));
  await tab.evaluate(() => document.fonts.ready);
  await tab.waitForTimeout(500);

  for (const p of posts) {
    const file = path.join(OUT, `${p.id}-${p.layout}.png`);
    await tab.locator('#' + p.id).screenshot({ path: file });
    console.log('ok ->', path.basename(file));
  }

  await browser.close();
})();
