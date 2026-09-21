// LES INVARIANTS.
// Un seul endroit. La couverture et l'intérieur du carrousel lisent d'ici.
// Si quelque chose change ici, ça change partout — c'est le but.

const TOKENS = {
  red: '#db0000',
  ink: '#0c0c0c',
  paper: '#f7f5f0',
  black: '#080808', // fond de la slide finale
  pad: 72,
  w: 1080,
  h: 1350,
};

const FONTS = `
  @font-face { font-family:'Display'; src:url('fonts/playfairdisplay-600.ttf')  format('truetype'); font-weight:600; font-style:normal; }
  @font-face { font-family:'Display'; src:url('fonts/playfairdisplay-500i.ttf') format('truetype'); font-weight:500; font-style:italic; }
  @font-face { font-family:'Sans'; src:url('fonts/jost-300.ttf') format('truetype'); font-weight:300; }
  @font-face { font-family:'Sans'; src:url('fonts/jost-400.ttf') format('truetype'); font-weight:400; }
  @font-face { font-family:'Sans'; src:url('fonts/jost-500.ttf') format('truetype'); font-weight:500; }`;

const CSS = `${FONTS}

  :root{ --red:${TOKENS.red}; --ink:${TOKENS.ink}; --paper:${TOKENS.paper};
         --black:${TOKENS.black}; --pad:${TOKENS.pad}px; }
  *{ margin:0; padding:0; box-sizing:border-box; }
  body{ background:#3a3a3a; display:flex; flex-direction:column;
        align-items:center; gap:44px; padding:44px; }

  .sl{ position:relative; width:${TOKENS.w}px; height:${TOKENS.h}px; overflow:hidden;
       background:var(--paper); color:var(--ink); -webkit-font-smoothing:antialiased; }
  .sl.dark{ background:var(--black); color:var(--paper); }

  /* ── habillage : les quatre coins, identiques partout ── */
  .m{ position:absolute; z-index:3; font-family:'Sans',sans-serif;
      font-size:19px; font-weight:400; letter-spacing:.3em; text-transform:uppercase; }
  .m-brand{ top:62px; left:var(--pad); font-weight:500; }
  .m-tag  { top:62px; right:var(--pad); font-weight:300;
            color:rgba(12,12,12,.45); letter-spacing:.24em; }
  .dark .m-tag{ color:rgba(247,245,240,.45); }
  .m-tag b{ font-weight:500; color:var(--red); }
  .m-next { bottom:62px; right:var(--pad); color:var(--red); font-weight:500;
            font-size:24px; letter-spacing:.1em; }
  .m sup{ font-size:.55em; letter-spacing:0; vertical-align:.7em; }

  .bar{ position:absolute; z-index:3; left:0; bottom:0; height:6px; width:100%;
        background:rgba(12,12,12,.09); }
  .dark .bar{ background:rgba(247,245,240,.12); }
  .bar i{ display:block; height:100%; background:var(--red); }

  /* ── blocs ── */
  .wrap{ position:absolute; z-index:1; left:0; right:0; top:50%;
         transform:translateY(-50%); padding:0 var(--pad); }
  .wrap.mid{ text-align:center; }
  .wrap.low{ top:auto; bottom:150px; transform:none; }

  /* ── typographie ── */
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

  /* ── intérieur du carrousel ── */
  .label{ font-family:'Sans',sans-serif; font-weight:400; font-size:20px;
          letter-spacing:.26em; text-transform:uppercase; margin-bottom:42px; }
  .label em{ font-style:normal; color:var(--red); letter-spacing:0; margin-right:18px; }
  .body{ font-family:'Sans',sans-serif; font-weight:300; font-size:39px; line-height:1.5;
         color:rgba(12,12,12,.84); }
  .dark .body{ color:rgba(247,245,240,.80); }
  .body + .body{ margin-top:28px; }

  .cta{ display:inline-flex; align-items:center; gap:22px; background:var(--red);
        color:#fff; padding:26px 44px; margin-top:52px;
        font-family:'Sans',sans-serif; font-weight:500; font-size:24px;
        letter-spacing:.24em; text-transform:uppercase; }
  .cta span{ font-size:26px; letter-spacing:0; }
`;

// Playfair capitales : une lettre avance d'environ 0,60 em.
const debordSize = (mot) => Math.min(268, Math.round(1230 / (0.6 * mot.length)));

// La ligne surlignée. C'est la signature : elle est sur la couverture
// ET sur chaque slide intérieure.
const chipLines = (lines, hi, chipStyle = '') =>
  lines
    .map((l, i) => (i === hi ? `<span class="chip" style="${chipStyle}">${l}</span>` : l))
    .join('<br>');

// `tag` : ce qui s'affiche en haut à droite. `next` : la flèche, sauf en fin.
const furniture = ({ tag, fill, next = true }) => `
  <div class="m m-brand">Soolifestyle<sup>&#8482;</sup></div>
  <div class="m m-tag">${tag}</div>
  ${next ? '<div class="m m-next">&rsaquo;&rsaquo;&rsaquo;</div>' : ''}
  <div class="bar"><i style="width:${fill}px"></i></div>`;

// La jauge : la part du carrousel déjà parcourue.
const fill = (i, total) => Math.round((i / total) * TOKENS.w);

const page = (title, bodyHtml) =>
  `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8">
<title>${title}</title><style>${CSS}</style></head><body>
${bodyHtml}
</body></html>`;

module.exports = { TOKENS, CSS, debordSize, chipLines, furniture, fill, page };
