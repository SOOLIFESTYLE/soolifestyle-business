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

const label = (s) => (s.label ? `<div class="label"><em>&mdash;</em>${s.label}</div>` : '');
const body = (s) =>
  (s.body || []).map((p) => `<div class="body">${p.join('<br>')}</div>`).join('');

const R = {
  // on pose le mécanisme et on l'explique
  pose: (s) => `
    <div class="wrap bas">
      ${label(s)}
      <div class="title case" style="font-size:${s.size}px">${DA.chipLines(s.lines, s.hi)}</div>
      <div class="hr"></div>
      ${body(s)}
    </div>`,

  // la respiration. Une phrase, rien d'autre. On la lit sans effort, on swipe.
  claque: (s) => `
    <div class="wrap bas">
      ${label(s)}
      <div class="setup">${s.setup}</div>
      <div class="huge case" style="font-size:${s.size}px">${DA.chipLines(s.lines, s.hi)}</div>
      ${s.close ? `<div class="body" style="margin-top:44px">${s.close.join('<br>')}</div>` : ''}
    </div>`,

  // on explique, puis la dernière phrase retourne la situation
  bascule: (s) => `
    <div class="wrap bas">
      ${label(s)}
      <div class="title case" style="font-size:${s.size}px">${DA.chipLines(s.lines, s.hi)}</div>
      ${s.lead ? `<div class="ital" style="margin-top:40px">${s.lead}</div>` : ''}
      <div class="hr"></div>
      ${body(s)}
      <div class="payoff">${s.payoff.join('<br>')}</div>
    </div>`,

  // ── les rythmes du test ──

  // une question, premier temps : la situation, la réplique, les réponses
  question: (s) => `
    <div class="wrap bas">
      ${label(s)}
      ${s.scene ? `<div class="scene">${s.scene.join('<br>')}</div>` : ''}
      <div class="title case" style="font-size:${s.size}px; line-height:1.18">${DA.chipLines(s.lines, s.hi)}</div>
      ${s.apres ? `<div class="scene">${s.apres.join('<br>')}</div>` : ''}
      <div class="ask">${s.ask}</div>
      <div class="opts">${s.opts.map((o, i) => `<div class="opt"><b>${'ABC'[i]}</b><span>${o}</span></div>`).join('')}</div>
    </div>`,

  // une question, second temps : les points, puis ce qu'on teste.
  // Le plus gros chiffre passe en rouge : c'est lui qu'on redoute.
  points: (s) => {
    const max = Math.max(...s.score);
    return `
    <div class="wrap bas">
      ${label(s)}
      <div class="title case" style="font-size:${s.size}px">${DA.chipLines(s.lines, s.hi)}</div>
      <div class="pts">${s.opts
        .map((o, i) => `<div class="pt${s.score[i] === max ? ' max' : ''}"><b>${'ABC'[i]}</b><span>${o}</span><em>${s.score[i]}</em></div>`)
        .join('')}</div>
      <div class="hr"></div>
      ${s.teste.map((p) => `<div class="teste">${p}</div>`).join('')}
    </div>`;
  },

  // le score : le titre, puis les paliers
  score: (s) => `
    <div class="wrap">
      <div class="entete">
        <div class="ital">${s.ital}</div>
        <div class="title case" style="font-size:${s.size}px">${DA.chipLines(s.lines, s.hi)}</div>
      </div>
      <div class="paliers">${s.paliers
        .map((p) => `<div class="palier"><div class="r">${p.r}</div><div><h3>${p.h}</h3><p>${p.p.join('<br>')}</p></div></div>`)
        .join('')}</div>
    </div>`,

  // la slide finale d'un test : la fausse question barrée, la vraie en dessous
  verdict: (s) => `
    <div class="wrap bas">
      <div class="setup">${s.faux}</div>
      <div class="barre">${s.barre}</div>
      <div class="setup" style="margin:44px 0 20px">${s.mais}</div>
      <div class="title case" style="font-size:${s.size}px; line-height:1.18">${DA.chipLines(s.lines, s.hi, '', s.caps)}</div>
      <div class="hr"></div>
      <div class="serie">${s.serie}</div>
      <div class="payoff" style="margin-top:18px">${s.payoff.join('<br>')}</div>
      <div class="body" style="margin-top:36px">${s.action.join('<br>')}</div>
    </div>`,
};

module.exports = R;
