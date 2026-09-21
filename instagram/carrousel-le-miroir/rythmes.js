// LES RYTHMES — l'intérieur du carrousel.
//
// Le problème n'est pas d'être lisible, c'est d'être quitté.
// Cinq slides construites pareil, c'est cinq fois la même charge de lecture :
// l'œil s'installe, puis décroche. Trois rythmes, alternés, tiennent le pouce.
//
//   pose     lecture normale — on explique
//   claque   une ligne, énorme, presque rien à lire — l'œil souffle, le swipe est gratuit
//   bascule  on explique, puis une phrase retourne tout en capitales rouges
const DA = require('./da');

const label = (s) => `<div class="label"><em>&mdash;</em>${s.label}</div>`;
const body = (s) =>
  (s.body || []).map((p) => `<div class="body">${p.join('<br>')}</div>`).join('');

module.exports = {
  // on pose le mécanisme et on l'explique
  pose: (s) => `
    <div class="wrap">
      ${label(s)}
      <div class="title" style="font-size:${s.size}px">${DA.chipLines(s.lines, s.hi)}</div>
      <div class="hr"></div>
      ${body(s)}
    </div>`,

  // la respiration. Une phrase, rien d'autre. On la lit sans effort, on swipe.
  claque: (s) => `
    <div class="wrap">
      ${label(s)}
      <div class="setup">${s.setup}</div>
      <div class="huge" style="font-size:${s.size}px">${DA.chipLines(s.lines, s.hi)}</div>
      ${s.close ? `<div class="body" style="margin-top:44px">${s.close.join('<br>')}</div>` : ''}
    </div>`,

  // on explique, puis la dernière phrase retourne la situation
  bascule: (s) => `
    <div class="wrap">
      ${label(s)}
      <div class="title" style="font-size:${s.size}px">${DA.chipLines(s.lines, s.hi)}</div>
      <div class="hr"></div>
      ${body(s)}
      <div class="payoff">${s.payoff.join('<br>')}</div>
    </div>`,
};
