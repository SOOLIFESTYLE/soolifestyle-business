// Rend un carrousel entier — couverture, mécanismes, CTA — depuis son JSON.
// Usage : node build-carrousel.js [nom]        (défaut : le-miroir)
const fs = require('fs');
const path = require('path');
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const DA = require('./da');
const COVERS = require('./layouts-couverture');
const RYTHMES = require('./rythmes');

const DIR = __dirname;
const name = process.argv.slice(2).find((a) => !a.startsWith('--')) || 'le-miroir';
// --hd : double définition (2160 × 2700), pour qu'Instagram compresse depuis plus net
const HD = process.argv.includes('--hd');
const c = JSON.parse(fs.readFileSync(path.join(DIR, 'carrousels', `${name}.json`), 'utf8'));
const OUT = path.join(DIR, 'export', c.id, HD ? 'hd' : '');

const TOTAL = 1 + c.slides.length + 1; // couverture + mécanismes + CTA
const N = c.slides.length;

/* ── une slide-mécanisme : son rythme, et la promesse de la suivante ── */
const mechanism = (s, i) => `
  <div class="sl" id="s${i + 2}">
    ${RYTHMES[s.rythme](s)}
    ${DA.furniture({
      tag: s.tag || `<b>${i + 1}</b> / ${N}`,
      fill: DA.fill(i + 2, TOTAL),
      next: s.next,
    })}
  </div>`;

/* ── la slide finale : noir profond, et une raison de s'abonner
      qui n'est pas « abonne-toi » mais ce qu'il y a demain ── */
const outro = (o) => o.rythme ? `
  <div class="sl dark" id="s${TOTAL}">
    ${RYTHMES[o.rythme](o)}
    ${DA.furniture({ tag: c.tag, fill: DA.TOKENS.w, next: false })}
  </div>` : `
  <div class="sl dark" id="s${TOTAL}">
    <div class="wrap bas">
      <div class="title case" style="font-size:${o.size}px">${DA.chipLines(o.lines, o.hi, '', o.caps)}</div>
      <div class="hr"></div>
      ${o.body.map((p) => `<div class="body">${p.join('<br>')}</div>`).join('')}
      <div class="payoff">${o.payoff.join('<br>')}</div>
      <div class="body" style="margin-top:40px">${o.action.join('<br>')}</div>
    </div>
    ${DA.furniture({ tag: c.tag, fill: DA.TOKENS.w, next: false })}
  </div>`;

const cover = (cv) => `
  <div class="sl" id="s1">
    ${COVERS[cv.layout](cv)}
    ${DA.furniture({ tag: c.tag, fill: DA.fill(1, TOTAL) })}
  </div>`;

const html = DA.page(
  c.id,
  [cover(c.cover), ...c.slides.map(mechanism), outro(c.outro)].join('\n')
);

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const file = path.join(DIR, `_${c.id}.html`);
  fs.writeFileSync(file, html);

  const browser = await chromium.launch();
  const tab = await browser.newPage({
    viewport: { width: DA.TOKENS.w, height: DA.TOKENS.h },
    deviceScaleFactor: HD ? 2 : 1,
  });
  await tab.goto('file://' + file);
  await tab.evaluate(() => document.fonts.ready);
  await tab.waitForTimeout(500);

  for (let i = 1; i <= TOTAL; i++) {
    const out = path.join(OUT, `${c.id}-${String(i).padStart(2, '0')}.png`);
    await tab.locator('#s' + i).screenshot({ path: out });
    console.log('ok ->', path.basename(out));
  }

  await browser.close();
  fs.unlinkSync(file);
})();
