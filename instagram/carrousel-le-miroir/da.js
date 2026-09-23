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
       background:var(--paper); color:var(--ink); -webkit-font-smoothing:antialiased;
       font-variant-numeric:lining-nums; } /* Playfair : sinon le 0 ressemble à un o */
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

  /* ── la relance : on swipe vers un nom, pas vers du vide ── */
  .m-relance{ bottom:58px; right:var(--pad); display:flex; align-items:baseline; gap:16px;
              font-size:19px; letter-spacing:.26em; }
  .m-relance i{ font-style:normal; color:rgba(12,12,12,.40); font-weight:300; }
  .dark .m-relance i{ color:rgba(247,245,240,.40); }
  .m-relance b{ font-weight:500; color:var(--red); }
  .m-relance s{ text-decoration:none; color:var(--red); font-size:24px; letter-spacing:.1em; }

  /* ── la claque : une ligne, énorme, rien autour ── */
  .setup{ font-family:'Sans',sans-serif; font-weight:300; font-size:36px; line-height:1.4;
          color:rgba(12,12,12,.60); margin-bottom:40px; }
  .dark .setup{ color:rgba(247,245,240,.55); }
  .huge{ font-family:'Display',Georgia,serif; font-weight:600; text-transform:uppercase;
         line-height:1.2; letter-spacing:-.01em; }

  /* ── la bascule : la phrase qui retourne, en capitales rouges ── */
  .payoff{ font-family:'Display',Georgia,serif; font-weight:600; text-transform:uppercase;
           font-size:56px; line-height:1.14; letter-spacing:-.008em;
           color:var(--red); margin-top:44px; }
  /* la bascule pique, donc capitales — comme la ligne surlignée */

  /* ── le contraste de casse ──
        Tout en capitales, c'est un seul poids : rien ne ressort.
        La ligne qui POSE passe en minuscules — grande, parce que la
        hauteur d'x est basse. La ligne qui PIQUE passe en capitales :
        chaque lettre occupe toute la hauteur, le bloc pèse deux fois
        plus à taille égale. On la descend donc à 0,92.
        Même mot, même police, deux textures. ── */
  .case{ text-transform:none; }
  .case .chip, .case .haut{ text-transform:uppercase; font-size:.92em;
                            display:inline-block; line-height:1;
                            letter-spacing:.002em; }
  .case .chip{ padding:10px 24px 16px; }

  /* le surligneur en filet : quand la ligne est longue, l'aplat devient
     un pavé. Le filet dit la même chose sans écraser la page. */
  .chip.filet{ background:none; color:var(--red);
               box-shadow:inset 0 0 0 4px var(--red); }

  /* ── l'horizon : le bloc ne flotte plus, il pose ── */
  .wrap.bas{ top:auto; bottom:196px; transform:none; }

  /* ── le bulletin : la couverture devient un document ── */
  .kick{ font-family:'Sans',sans-serif; font-weight:500; font-size:20px; letter-spacing:.3em;
         text-transform:uppercase; color:var(--red); margin-bottom:34px; }
  .ligne{ display:flex; align-items:baseline; gap:18px; font-family:'Sans',sans-serif;
          font-weight:300; font-size:36px; margin-top:26px; }
  .ligne i{ flex:1; border-bottom:3px dotted rgba(12,12,12,.35); transform:translateY(-10px); }
  .ligne b{ font-family:'Display',Georgia,serif; font-style:italic; font-weight:500; font-size:46px; }
  .total{ display:flex; align-items:baseline; justify-content:space-between;
          border-top:5px solid var(--ink); margin-top:40px; padding-top:26px; }
  .total span{ font-family:'Sans',sans-serif; font-weight:500; font-size:22px;
               letter-spacing:.28em; text-transform:uppercase; }
  .total b{ font-family:'Display',Georgia,serif; font-weight:600; font-size:140px;
            color:var(--red); line-height:.9; text-transform:uppercase; }

  /* ── le QCM : la couverture qui te fait cocher ── */
  .cases{ display:flex; justify-content:center; gap:70px; margin-top:54px;
          font-family:'Sans',sans-serif; font-weight:500; font-size:30px;
          letter-spacing:.24em; text-transform:uppercase; }
  .cases span{ display:flex; align-items:center; gap:20px; }
  .cases b{ display:inline-block; width:52px; height:52px; position:relative;
            box-shadow:inset 0 0 0 4px var(--ink); }
  .cases b.x::before, .cases b.x::after{ content:''; position:absolute; left:-8px; right:-8px;
            top:50%; height:7px; margin-top:-3px; background:var(--red); transform:rotate(45deg); }
  .cases b.x::after{ transform:rotate(-45deg); }
  .tous{ font-family:'Display',Georgia,serif; font-style:italic; font-weight:500;
         font-size:40px; margin-top:26px; }
  .consigne{ font-family:'Sans',sans-serif; font-weight:300; font-size:36px; line-height:1.45;
             color:rgba(12,12,12,.84); }
  .triche{ font-family:'Display',Georgia,serif; font-weight:600; text-transform:uppercase;
           font-size:44px; letter-spacing:.01em; margin-top:34px; line-height:1.1; }
  .mens{ font-family:'Display',Georgia,serif; font-style:italic; font-weight:500;
         font-size:38px; margin-top:10px; color:rgba(12,12,12,.70); }

  /* ── la question : le test, en deux temps ──
        Slide 1 : la situation et les réponses. Slide 2 : les points et
        ce qu'on teste. Une slide = une seule tâche pour l'œil.
        Tout le reste, c'est de l'air. ── */
  .scene{ font-family:'Sans',sans-serif; font-weight:300; font-size:38px; line-height:1.45;
          color:rgba(12,12,12,.80); }
  .scene + .title, .title + .scene{ margin-top:40px; }
  .ask{ font-family:'Display',Georgia,serif; font-style:italic; font-weight:500;
        font-size:52px; margin-top:60px; }
  .opts{ margin-top:26px; }
  .opt{ display:grid; grid-template-columns:64px 1fr; align-items:baseline;
        font-family:'Sans',sans-serif; font-weight:300; font-size:37px; line-height:1.38;
        padding:22px 0; border-top:2px solid rgba(12,12,12,.10); }
  .opt:last-child{ border-bottom:2px solid rgba(12,12,12,.10); }
  .opt b{ font-family:'Display',Georgia,serif; font-weight:600; font-size:42px; color:var(--red); }

  /* les points : la réponse à gauche, en retrait ; le chiffre à droite, énorme */
  .pts{ margin-top:44px; }
  .pt{ display:grid; grid-template-columns:64px 1fr 110px; align-items:center;
       padding:18px 0; border-top:2px solid rgba(12,12,12,.10); }
  .pt:last-child{ border-bottom:2px solid rgba(12,12,12,.10); }
  .pt b{ font-family:'Display',Georgia,serif; font-weight:600; font-size:42px; color:var(--red); }
  .pt span{ font-family:'Sans',sans-serif; font-weight:300; font-size:31px; line-height:1.35;
            color:rgba(12,12,12,.62); padding-right:20px; }
  .pt em{ font-style:normal; text-align:right; font-family:'Display',Georgia,serif;
          font-weight:600; font-size:76px; line-height:1; }
  .pt.max em{ color:var(--red); }
  .teste{ font-family:'Sans',sans-serif; font-weight:300; font-size:38px; line-height:1.5;
          color:rgba(12,12,12,.80); }
  .teste strong{ font-weight:500; color:var(--ink); }

  /* ── le score : quatre paliers, lisibles d'un coup d'œil ── */
  .paliers{ margin-top:34px; }
  .palier{ display:grid; grid-template-columns:180px 1fr; gap:0 24px; padding:17px 0;
           border-top:2px solid rgba(12,12,12,.14); }
  .palier .r{ font-family:'Display',Georgia,serif; font-weight:600; font-size:44px;
              line-height:1.05; color:var(--red); white-space:nowrap; }
  .palier h3{ font-family:'Display',Georgia,serif; font-weight:600; text-transform:uppercase;
              font-size:26px; line-height:1.2; margin-bottom:8px; }
  .palier p{ font-family:'Sans',sans-serif; font-weight:300; font-size:25px; line-height:1.38;
             color:rgba(12,12,12,.80); }
  .entete{ display:flex; align-items:baseline; gap:28px; }

  /* ── la fausse question, barrée ── */
  .barre{ display:inline-block; font-family:'Display',Georgia,serif; font-weight:600;
          text-transform:uppercase; font-size:50px; color:rgba(247,245,240,.55);
          position:relative; margin-top:14px; }
  .barre::after{ content:''; position:absolute; left:-10px; right:-10px; top:52%;
                 height:6px; background:var(--red); transform:rotate(-2deg); }
  .serie{ font-family:'Sans',sans-serif; font-weight:500; font-size:20px; letter-spacing:.3em;
          text-transform:uppercase; color:var(--red); }
  .serie sup{ font-size:.55em; letter-spacing:0; vertical-align:.7em; }

  /* ── le compte : l'arobase surligné, pas un bouton ── */
  .at{ display:inline-block; background:var(--red); color:#fff;
       padding:2px 14px 6px; margin:0 2px 0 4px; }
`;

// Playfair capitales : une lettre avance d'environ 0,60 em.
const debordSize = (mot) => Math.min(340, Math.round(1230 / (0.6 * mot.length)));

// La ligne surlignée. C'est la signature : elle est sur la couverture
// ET sur chaque slide intérieure.
// `hi` : la ligne surlignée. `caps` : une ligne en capitales sans surligneur.
const chipLines = (lines, hi, chipStyle = '', caps = -1, variante = '') =>
  lines
    .map((l, i) => {
      if (i === hi) return `<span class="chip ${variante}" style="${chipStyle}">${l}</span>`;
      if (i === caps) return `<span class="haut">${l}</span>`;
      return l;
    })
    .join('<br>');

// `tag` : ce qui s'affiche en haut à droite. `next` : la flèche, sauf en fin.
// `next` : true pour la flèche seule (couverture),
// une chaîne pour annoncer ce qui vient — c'est ça qui fait swiper,
// false pour la dernière slide, où il n'y a plus rien après.
const furniture = ({ tag, fill, next = true }) => {
  let bas = '';
  if (typeof next === 'string')
    bas = `<div class="m m-relance"><i>Suivant</i><b>${next}</b><s>&rsaquo;&rsaquo;&rsaquo;</s></div>`;
  else if (next) bas = '<div class="m m-next">&rsaquo;&rsaquo;&rsaquo;</div>';
  return `
  <div class="m m-brand">Soolifestyle<sup>&#8482;</sup></div>
  <div class="m m-tag">${tag}</div>
  ${bas}
  <div class="bar"><i style="width:${fill}px"></i></div>`;
};

// La jauge : la part du carrousel déjà parcourue.
const fill = (i, total) => Math.round((i / total) * TOKENS.w);

const page = (title, bodyHtml) =>
  `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8">
<title>${title}</title><style>${CSS}</style></head><body>
${bodyHtml}
</body></html>`;

module.exports = { TOKENS, CSS, debordSize, chipLines, furniture, fill, page };
