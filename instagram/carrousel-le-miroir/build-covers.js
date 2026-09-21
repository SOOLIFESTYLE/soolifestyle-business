// Génère les couvertures à partir de posts.json.
// Une couverture = un texte + un gabarit de tension. La DA ne bouge jamais.
// Usage : node build-covers.js
const fs = require('fs');
const path = require('path');
const { chromium } = require('/opt/node22/lib/node_modules/playwright');

const DIR = __dirname;
const OUT = path.join(DIR, 'export', 'couvertures');
const posts = JSON.parse(fs.readFileSync(path.join(DIR, 'posts.json'), 'utf8'));

/* ─────────────── les invariants : on n'y touche pas ─────────────── */
const CSS = `
  @font-face { font-family:'Display'; src:url('fonts/playfairdisplay-600.ttf')  format('truetype'); font-weight:600; font-style:normal; }
  @font-face { font-family:'Display'; src:url('fonts/playfairdisplay-500i.ttf') format('truetype'); font-weight:500; font-style:italic; }
  @font-face { font-family:'Sans'; src:url('fonts/jost-300.ttf') format('truetype'); font-weight:300; }
  @font-face { font-family:'Sans'; src:url('fonts/jost-400.ttf') format('truetype'); font-weight:400; }
  @font-face { font-family:'Sans'; src:url('fonts/jost-500.ttf') format('truetype'); font-weight:500; }

  :root{ --red:#db0000; --ink:#0c0c0c; --paper:#f7f5f0; --pad:72px; }
  *{ margin:0; padding:0; box-sizing:border-box; }
  body{ background:#3a3a3a; display:flex; flex-direction:column; align-items:center; gap:44px; padding:44px; }

  .cv{ position:relative; width:1080px; height:1350px; overflow:hidden;
       background:var(--paper); color:var(--ink); -webkit-font-smoothing:antialiased; }

  .m{ position:absolute; z-index:3; font-family:'Sans',sans-serif;
      font-size:19px; font-weight:400; letter-spacing:.3em; text-transform:uppercase; }
  .m-brand{ top:62px; left:var(--pad); font-weight:500; }
  .m-tag  { top:62px; right:var(--pad); font-weight:300; color:rgba(12,12,12,.45); letter-spacing:.24em; }
  .m-next { bottom:62px; right:var(--pad); color:var(--red); font-weight:500;
            font-size:24px; letter-spacing:.1em; }
  .m sup{ font-size:.55em; letter-spacing:0; vertical-align:.7em; }

  .bar{ position:absolute; z-index:3; left:0; bottom:0; height:6px; width:100%;
        background:rgba(12,12,12,.09); }
  .bar i{ display:block; height:100%; width:154px; background:var(--red); }

  .wrap{ position:absolute; z-index:1; left:0; right:0; top:50%;
         transform:translateY(-50%); padding:0 var(--pad); }
  .wrap.mid{ text-align:center; }
  .wrap.low{ top:auto; bottom:150px; transform:none; }

  .title{ font-family:'Display',Georgia,serif; font-weight:600; text-transform:uppercase;
          line-height:1.26; letter-spacing:-.008em; }
  .chip{ display:inline-block; padding:4px 26px 14px; background:var(--red); color:#fff; }
  .hr{ width:84px; height:3px; background:var(--red); margin:44px 0; }
  .mid .hr{ margin:44px auto; }
  .ital{ font-family:'Display',Georgia,serif; font-weight:500; font-style:italic;
         font-size:54px; line-height:1.1; }
  .why{ font-family:'Display',Georgia,serif; font-weight:600; text-transform:uppercase;
        font-size:116px; line-height:1.02; letter-spacing:-.01em; color:var(--red);
        margin-top:10px; white-space:nowrap; }
`;

const furniture = `
  <div class="m m-brand">Soolifestyle<sup>&#8482;</sup></div>
  <div class="m m-tag">Psychologie &middot; Influence</div>
  <div class="m m-next">&rsaquo;&rsaquo;&rsaquo;</div>
  <div class="bar"><i></i></div>`;

/* ─────────────── les variables : six gabarits de tension ─────────────── */
const lines = (p, chipStyle = '') =>
  p.lines
    .map((l, i) => (i === p.hi ? `<span class="chip" style="${chipStyle}">${l}</span>` : l))
    .join('<br>');

// Playfair capitales : une lettre avance d'environ 0,60 em.
// Le gabarit "débord" en déduit la taille qui fait sortir le mot du cadre.
const DEBORD_CIBLE = 1230;   // largeur visée, pour 1080 de page
const debordSize = (mot) => Math.min(268, Math.round(DEBORD_CIBLE / (0.6 * mot.length)));

const LAYOUTS = {
  // tout est droit, sauf le surligneur
  inclinaison: (p) => `
    <div class="wrap mid">
      <div class="title" style="font-size:${p.size}px">${lines(p, 'transform:rotate(-2.6deg)')}</div>
      <div class="hr"></div>
      <div class="ital">${p.ital}</div>
      <div class="why">${p.why}</div>
    </div>`,

  // le dernier mot est trop grand pour la page
  debord: (p) => `
    <div class="wrap mid">
      <div class="title" style="font-size:${p.size}px">${lines(p)}</div>
      <div class="ital" style="margin-top:46px">${p.ital}</div>
      <div class="why" style="font-size:${debordSize(p.why)}px; margin:-6px -400px 0; text-align:center">${p.why}</div>
    </div>`,

  // le surligneur ignore les marges
  bande: (p) => `
    <div class="wrap mid" style="padding:0">
      ${p.lines
        .map((l, i) =>
          i === p.hi
            ? `<div class="title" style="font-size:${p.size}px; background:var(--red); color:#fff; padding:10px 0 20px; margin:14px 0">${l}</div>`
            : `<div class="title" style="font-size:${p.size}px; padding:0 var(--pad)">${l}</div>`
        )
        .join('')}
      <div class="hr"></div>
      <div class="ital">${p.ital}</div>
      <div class="why">${p.why}</div>
    </div>`,

  // fer à gauche, le surligneur sort par la gauche
  decalage: (p) => `
    <div class="wrap">
      <div class="title" style="font-size:${p.size}px">${lines(p, 'margin-left:-150px; padding-left:150px')}</div>
      <div class="hr"></div>
      <div class="ital">${p.ital}</div>
      <div class="why">${p.why}</div>
    </div>`,

  // tout tombe en bas, le haut reste vide
  desequilibre: (p) => `
    <div class="wrap low">
      <div class="title" style="font-size:${p.size}px">${lines(p)}</div>
      <div class="ital" style="margin-top:38px">${p.ital}</div>
      <div class="why">${p.why}</div>
    </div>`,

  // interlignage écrasé, aucun filet
  compression: (p) => `
    <div class="wrap">
      <div class="title" style="font-size:${p.size + 8}px; line-height:1.04">${lines(p, 'padding:0 22px 10px')}</div>
      <div class="ital" style="margin-top:34px">${p.ital}</div>
      <div class="why" style="font-size:138px; margin-top:-10px">${p.why}</div>
    </div>`,
};

const page = `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8">
<title>Couvertures</title><style>${CSS}</style></head><body>
${posts
  .map((p) => `<div class="cv" id="${p.id}">${LAYOUTS[p.layout](p)}${furniture}</div>`)
  .join('\n')}
</body></html>`;

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(DIR, 'covers.html'), page);

  const browser = await chromium.launch();
  const tab = await browser.newPage({
    viewport: { width: 1080, height: 1350 },
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
