// LES VARIABLES — six façons de casser la symétrie sur une couverture.
// Chaque gabarit casse UNE règle du système. C'est de là que vient la tension.
// Pour en ajouter un : réponds à « quelle règle est-ce que je casse ? ».
const DA = require('./da');

module.exports = {
  // tout est droit, sauf le surligneur
  inclinaison: (p) => `
    <div class="wrap mid">
      <div class="title${p.case ? ' case' : ''}" style="font-size:${p.size}px">${DA.chipLines(p.lines, p.hi, 'transform:rotate(-2.6deg)')}</div>
      <div class="hr"></div>
      <div class="ital">${p.ital}</div>
      <div class="why">${p.why}</div>
    </div>`,

  // le mot de chute est trop grand pour la page, il sort par les deux côtés
  debord: (p) => `
    <div class="wrap mid">
      <div class="title${p.case ? ' case' : ''}" style="font-size:${p.size}px">${DA.chipLines(p.lines, p.hi)}</div>
      <div class="ital" style="margin-top:46px">${p.ital}</div>
      <div class="why" style="font-size:${DA.debordSize(p.why)}px; margin:-6px -400px 0; text-align:center">${p.why}</div>
    </div>`,

  // le surligneur ignore les marges et traverse toute la largeur
  bande: (p) => `
    <div class="wrap mid" style="padding:0">
      ${p.lines
        .map((l, i) =>
          i === p.hi
            ? `<div class="title${p.case ? ' case' : ''}" style="font-size:${p.size}px; background:var(--red); color:#fff; padding:10px 0 20px; margin:14px 0"><span class="chip" style="background:none; padding:0">${l}</span></div>`
            : `<div class="title${p.case ? ' case' : ''}" style="font-size:${p.size}px; padding:0 var(--pad)">${l}</div>`
        )
        .join('')}
      <div class="hr"></div>
      <div class="ital">${p.ital}</div>
      <div class="why">${p.why}</div>
    </div>`,

  // fer à gauche, et le surligneur sort du cadre par la gauche
  decalage: (p) => `
    <div class="wrap">
      <div class="title${p.case ? ' case' : ''}" style="font-size:${p.size}px">${DA.chipLines(p.lines, p.hi, 'margin-left:-150px; padding-left:150px')}</div>
      <div class="hr"></div>
      <div class="ital">${p.ital}</div>
      <div class="why">${p.why}</div>
    </div>`,

  // tout tombe en bas, les deux tiers du haut restent vides
  desequilibre: (p) => `
    <div class="wrap low">
      <div class="title${p.case ? ' case' : ''}" style="font-size:${p.size}px">${DA.chipLines(p.lines, p.hi)}</div>
      <div class="ital" style="margin-top:38px">${p.ital}</div>
      <div class="why">${p.why}</div>
    </div>`,

  // le surligneur perd son aplat : il devient un filet. Le plus calme des sept.
  filet: (p) => `
    <div class="wrap">
      <div class="title${p.case ? ' case' : ''}" style="font-size:${p.size}px">${DA.chipLines(p.lines, p.hi, '', -1, 'filet')}</div>
      <div class="hr"></div>
      <div class="ital">${p.ital}</div>
      <div class="why">${p.why}</div>
    </div>`,

  // la couverture n'est plus une affiche, c'est un document : un bulletin,
  // des lignes à points de conduite, et la chute à la place du total.
  // `kick` : l'en-tête du document. `rows` : [[libellé, valeur], …].
  bulletin: (p) => `
    <div class="wrap">
      <div class="kick">${p.kick}</div>
      <div class="title${p.case ? ' case' : ''}" style="font-size:${p.size}px">${DA.chipLines(p.lines, p.hi)}</div>
      ${p.rows
        .map(([l, v], i) => `<div class="ligne"${i ? '' : ' style="margin-top:44px"'}><span>${l}</span><i></i><b>${v}</b></div>`)
        .join('')}
      <div class="total"><span>${p.ital}</span><b>${p.why}</b></div>
    </div>`,

  // interlignage écrasé, plus aucun filet, rien ne respire
  compression: (p) => `
    <div class="wrap">
      <div class="title${p.case ? ' case' : ''}" style="font-size:${p.size + 8}px; line-height:1.04">${DA.chipLines(p.lines, p.hi, 'padding:0 22px 10px')}</div>
      <div class="ital" style="margin-top:34px">${p.ital}</div>
      <div class="why" style="font-size:138px; margin-top:-10px">${p.why}</div>
    </div>`,
};
