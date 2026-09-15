/* ============================================================
   THREADYPRENEURS CASH SCANNER™ — Interface
   ============================================================ */

const etat = {
  ecranActuel: 0,
  business: { offre: "", prix: 0, resultat: "", cible: "", anciennete: "moins d'1 mois" },
  audience: { abonnes: 0, vuesMois: 0, ventesMois: 0, visitesProfil: 0, clicsOffre: 0 },
  threads: [{}, {}, {}, {}, {}],
  offre: { promesse: "", probleme: "", coutInaction: "", urgence: "", differenciation: "", objections: ["", "", ""], preuves: [] },
};

let rapportCourant = null;
const TOTAL_ECRANS = 5;

/* ---------- Blocs Thread ---------- */

function construireBlocsThreads() {
  let html = "";
  for (let i = 0; i < 5; i++) {
    html += `
      <div class="bloc-thread">
        <label><span class="num">${i + 1}</span>Thread n°${i + 1}</label>
        <div class="champ" style="margin-top:12px;margin-bottom:8px;">
          <textarea id="thread-texte-${i}" placeholder="${i === 0 ? "Colle ton Thread ici. Tel quel, avec les fautes s'il y en a." : "Colle-en un autre…"}"></textarea>
        </div>
        <div class="stats-thread">
          <div><span class="mini-label">Vues</span><input type="number" id="thread-vues-${i}" /></div>
          <div><span class="mini-label">Likes</span><input type="number" id="thread-likes-${i}" /></div>
          <div><span class="mini-label">Réponses</span><input type="number" id="thread-reponses-${i}" /></div>
          <div><span class="mini-label">Reposts</span><input type="number" id="thread-reposts-${i}" /></div>
          <div><span class="mini-label">Citations</span><input type="number" id="thread-citations-${i}" /></div>
          <div><span class="mini-label">Clics</span><input type="number" id="thread-clics-${i}" /></div>
        </div>
      </div>`;
  }
  document.getElementById("conteneur-threads").innerHTML = html;
}

function initPreuves() {
  document.querySelectorAll("#options-preuve button").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("selectionne");
      const v = btn.dataset.valeur;
      const idx = etat.offre.preuves.indexOf(v);
      if (idx === -1) etat.offre.preuves.push(v);
      else etat.offre.preuves.splice(idx, 1);
    });
  });
}

/* ---------- Navigation ---------- */

function majProgression() {
  document.querySelectorAll("#barre-progression .segment span").forEach((seg, i) => {
    seg.style.width = i <= etat.ecranActuel ? "100%" : "0%";
  });
}

function afficherEcran(n) {
  document.querySelectorAll(".ecran").forEach(e => e.classList.remove("actif"));
  const cible = document.querySelector(`.ecran[data-ecran="${n}"]`);
  if (cible) cible.classList.add("actif");
  etat.ecranActuel = n;
  majProgression();
  document.getElementById("nav-boutons").style.display = n === 0 ? "none" : "flex";
  document.getElementById("btn-precedent").style.visibility = n <= 1 ? "hidden" : "visible";
  document.getElementById("btn-suivant").textContent = n === TOTAL_ECRANS - 1 ? "SCANNER →" : "Suivant →";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function valeur(id) { const el = document.getElementById(id); return el ? el.value.trim() : ""; }
function nombre(id) { const el = document.getElementById(id); const v = el ? parseFloat(el.value) : 0; return isNaN(v) ? 0 : v; }

function collecterEcranActuel() {
  const n = etat.ecranActuel;
  if (n === 1) {
    etat.business.offre = valeur("q-offre");
    etat.business.prix = nombre("q-prix");
    etat.business.anciennete = valeur("q-anciennete");
    etat.business.resultat = valeur("q-resultat");
    etat.business.cible = valeur("q-cible");
  } else if (n === 2) {
    etat.audience.abonnes = nombre("q-abonnes");
    etat.audience.vuesMois = nombre("q-vues");
    etat.audience.ventesMois = nombre("q-ventes");
    etat.audience.visitesProfil = nombre("q-visitesprofil");
    etat.audience.clicsOffre = nombre("q-clics");
  } else if (n === 3) {
    for (let i = 0; i < 5; i++) {
      etat.threads[i] = {
        texte: valeur(`thread-texte-${i}`),
        vues: nombre(`thread-vues-${i}`),
        likes: nombre(`thread-likes-${i}`),
        reponses: nombre(`thread-reponses-${i}`),
        reposts: nombre(`thread-reposts-${i}`),
        citations: nombre(`thread-citations-${i}`),
        clics: nombre(`thread-clics-${i}`),
      };
    }
  } else if (n === 4) {
    etat.offre.promesse = valeur("q-promesse");
    etat.offre.probleme = valeur("q-probleme");
    etat.offre.coutInaction = valeur("q-cout");
    etat.offre.urgence = valeur("q-urgence");
    etat.offre.differenciation = valeur("q-diff");
    etat.offre.objections = [valeur("q-objection1"), valeur("q-objection2"), valeur("q-objection3")];
  }
}

document.getElementById("btn-lancer").addEventListener("click", () => afficherEcran(1));

document.getElementById("btn-suivant").addEventListener("click", () => {
  collecterEcranActuel();
  if (etat.ecranActuel === 1 && (etat.business.offre.length < 2 || etat.business.cible.length < 2)) {
    alert("Il me faut au moins ce que tu vends et à qui. Sinon je te sors un diagnostic générique, et un diagnostic générique ne sert à rien.");
    return;
  }
  if (etat.ecranActuel === TOTAL_ECRANS - 1) lancerDiagnostic();
  else afficherEcran(etat.ecranActuel + 1);
});

document.getElementById("btn-precedent").addEventListener("click", () => {
  collecterEcranActuel();
  afficherEcran(Math.max(1, etat.ecranActuel - 1));
});

/* ---------- Diagnostic ---------- */

function lancerDiagnostic() {
  const scores = window.CashEngine.calculerScores(etat);
  rapportCourant = window.CashRapport.genererRapport(etat, scores);
  enregistrerHistorique(rapportCourant);
  afficherRapport(rapportCourant);
  document.getElementById("wizard").style.display = "none";
  document.getElementById("nav-boutons").style.display = "none";
  document.getElementById("barre-progression").style.display = "none";
  document.getElementById("rapport").classList.add("actif");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function enregistrerHistorique(r) {
  try {
    const h = JSON.parse(localStorage.getItem("tcs_historique") || "[]");
    h.push({ date: new Date().toISOString(), score: r.global, fuite: r.fuitePrincipale.libelle });
    localStorage.setItem("tcs_historique", JSON.stringify(h));
  } catch (e) { /* stockage bloqué : on continue sans historique */ }
}

function lireHistorique() {
  try { return JSON.parse(localStorage.getItem("tcs_historique") || "[]"); } catch (e) { return []; }
}

/* ---------- Rendu ---------- */

function barre(nom, val) {
  const niv = window.CashEngine.niveauScore(val);
  return `<div class="barre-score">
    <div class="nom">${nom}</div>
    <div class="piste"><div class="remplissage" style="width:${val}%"></div></div>
    <div class="valeur">${niv.emoji} ${val}</div>
  </div>`;
}

function bloc(titre, contenu, id) {
  return `<section class="bloc-rapport"${id ? ` id="${id}"` : ""}>
    ${titre ? `<h2>${titre}</h2>` : ""}
    ${contenu}
  </section>`;
}

function escapeHtml(str) {
  const d = document.createElement("div");
  d.textContent = str == null ? "" : str;
  return d.innerHTML;
}

function soo(texte) {
  return `<p class="texte-soo">${escapeHtml(texte)}</p>`;
}

function afficherRapport(r) {
  const s = r.scores;
  const hist = lireHistorique();
  let h = "";

  // Ouverture
  h += `<div class="rapport-entete">
    <p class="eyebrow">Diagnostic confidentiel</p>
    <div class="cash-score-cercle">
      <div class="chiffre">${r.global}</div>
      <div class="sur100">/100 ${r.niveauGlobal.emoji}</div>
    </div>
    <p class="texte-soo score-note">Ce chiffre ne sert presque à rien.\nCe qui suit, si.</p>
  </div>`;

  h += bloc("", `<div class="carte carte-ouverture">
      <p class="chiffres-bruts">${escapeHtml(r.ouverture[0])}</p>
      ${soo(r.ouverture[1])}
    </div>`);

  // LA FUITE
  h += `<section class="bloc-rapport">
    <div class="carte-fuite-principale">
      <div class="label">Ta fuite principale</div>
      <h3>${r.fuite.titre}</h3>
      <p class="texte-soo">${escapeHtml(r.fuite.constat)}</p>
      <div class="separateur-fin"></div>
      <p class="sous-label">Pourquoi ça bloque la vente</p>
      <p class="texte-soo">${escapeHtml(r.fuite.mecanisme)}</p>
      <div class="separateur-fin"></div>
      <p class="sous-label">Ce qu'il faut changer</p>
      <p class="texte-soo">${escapeHtml(r.fuite.correction)}</p>
    </div>
    <p class="note-regle">${escapeHtml(r.regleAppliquee)}<br>
    Juste derrière : <strong>${r.deuxiemeFuite.libelle}</strong>. On y touchera plus tard — pas maintenant.</p>
  </section>`;

  // Chiffres
  h += bloc("Ce que disent tes chiffres", `<div class="carte">
    ${r.lecture.map(l => `<p class="ligne-chiffre">${escapeHtml(l)}</p>`).join("")}
  </div>`);

  // 7 étapes
  h += bloc("Les 7 marches", `
    <p class="intro-bloc">Attention → intérêt → confiance → désir → conviction → action → achat.<br>Là où la barre s'effondre, l'argent s'arrête.</p>
    <div class="carte">
      ${barre("Attention", s.attention)}
      ${barre("Qualification", s.attractionAcheteur)}
      ${barre("Connexion", s.connexion)}
      ${barre("Désir", s.desir)}
      ${barre("Conviction", s.conviction)}
      ${barre("Offre", s.offre)}
      ${barre("Action", s.conversion)}
    </div>
    <p class="note-profil">Ton profil, aujourd'hui : <strong>${r.profils.join(" + ")}</strong>.</p>`, "b-marches");

  // Threads
  if (s.analysesThreads.length) {
    h += bloc("Tes Threads, un par un", s.analysesThreads.map((a, i) => `
      <div class="carte carte-thread">
        <div class="entete-thread">
          <span class="tag-classification">${a.classification}</span>
          <span class="total-thread">${a.total}/100</span>
        </div>
        <p class="detail-thread">Accroche ${a.hook}/20 · Cible ${a.pertinence}/20 · Connexion ${a.connexion}/20 · Désir ${a.desir}/20 · Sortie ${a.conversion}/20</p>
      </div>`).join(""), "b-threads");

    h += bloc("Ce que tu publies vraiment", `<div class="carte">
      ${Object.entries(r.repartition).map(([c, v]) => barre(c, v)).join("")}
      ${soo(commentaireRepartition(r.repartition))}
    </div>`, "b-repartition");
  }

  // Écart de désir
  h += bloc("L'écart de désir", `<div class="carte">
    <p class="ligne-chiffre">Désir mesuré : <strong>${s.desir}</strong> · Seuil où les gens achètent : <strong>70</strong>${r.gapDesir > 0 ? ` · Manque : <strong class="rouge">${r.gapDesir}</strong>` : ` · <strong>atteint</strong>`}</p>
    ${soo(r.gapDesir > 0
      ? `Ton travail n'est pas de parler davantage de ton offre.\nC'est de faire monter l'envie de la situation d'après, jusqu'à ce que bouger devienne plus confortable que rester.`
      : `Le désir est là. Ne le gâche pas avec une sortie molle ou une preuve absente.`)}
  </div>`, "b-desir");

  // Offre
  h += bloc("Ton offre au scalpel", `<div class="carte">
    ${Object.entries(r.autopsie).map(([k, v]) => `
      ${barre(nomAutopsie(k), Math.round(v.score))}
      <p class="mot-autopsie">${escapeHtml(v.mot)}</p>`).join("")}
  </div>`, "b-offre");

  // Objections
  h += bloc("Derrière leurs objections", r.objections.length ? r.objections.map(o => `
    <div class="carte">
      <p class="objection-apparente">« ${escapeHtml(o.apparente)} »</p>
      <p class="sous-label">Ce que ça veut dire, en vrai</p>
      ${soo(o.reelle)}
    </div>`).join("") : `<div class="carte">${soo(`Tu n'as renseigné aucune objection.\nC'est dommage : ce sont les phrases les plus utiles de ton business.\nNote les trois prochaines, mot pour mot.`)}</div>`, "b-objections");

  // Stop / Start
  h += bloc("À arrêter", `<div class="carte"><ul class="liste-puce arreter">
    ${r.arreter.map(x => `<li>${escapeHtml(x)}</li>`).join("")}
  </ul></div>`, "b-arreter");

  h += bloc("À commencer", `<div class="carte"><ul class="liste-puce commencer">
    ${r.commencer.map(x => `<li>${escapeHtml(x)}</li>`).join("")}
  </ul></div>`, "b-commencer");

  // 7 jours
  h += bloc("Tes 7 prochains jours", `<div class="carte">
    ${r.plan.map(j => `<div class="jour-plan">
      <div class="badge-jour">J${j.jour}</div>
      <div><div class="titre-jour">${escapeHtml(j.action)}</div><div class="detail-jour">${escapeHtml(j.detail)}</div></div>
    </div>`).join("")}
  </div>`, "b-plan");

  // Angles de désir
  h += bloc("10 façons de donner faim", `
    <p class="intro-bloc">Dix ressorts. Un exemple écrit pour chacun — pique la structure, pas les mots.</p>
    ${window.CashRapport.ANGLES_DESIR.map(a => `
      <div class="carte carte-angle">
        <div class="entete-angle"><strong>${a.angle}</strong><span>${a.ressort}</span></div>
        <p class="pourquoi-angle">${escapeHtml(a.pourquoi)}</p>
        <div class="exemple-angle">${escapeHtml(a.exemple)}${boutonCopier(a.exemple)}</div>
      </div>`).join("")}`, "b-angles");

  // Threads prêts
  h += bloc("3 Threads prêts à partir", r.threadsPrets.map(t => `
    <div class="carte carte-thread-pret">
      <span class="objectif-thread">${escapeHtml(t.objectif)}</span>
      <div class="thread-brouillon">${escapeHtml(t.texte)}${boutonCopier(t.texte)}</div>
    </div>`).join(""), "b-threads-prets");

  // Phrases à voler
  h += bloc("À voler", `<div class="carte">
    ${r.phrases.map(p => `<div class="phrase-a-voler">« ${escapeHtml(p)} »</div>`).join("")}
  </div>`, "b-phrases");

  // Prochain mouvement → atelier
  h += `<div class="mouvement-final">
    <p class="eyebrow">Ton prochain mouvement</p>
    <p class="texte-soo">${escapeHtml(r.fuite.prochain)}</p>
    <button class="btn" id="btn-atelier">Ouvrir l'atelier : ${escapeHtml(r.atelier.titre.toLowerCase())} →</button>
    <p class="note-mouvement">5 minutes. Tu repars avec un texte à publier.</p>
  </div>`;

  // Programme
  h += `<div class="carte carte-programme">
    <p class="eyebrow">Quand tu voudras aller au fond</p>
    ${soo(r.programme.pourquoi)}
    <p class="ligne-code">Code <strong>THREADYPRENEURS70</strong> — 70 € de moins sur ${escapeHtml(r.programme.nom)}.</p>
    <a class="btn btn-primaire" href="https://soolifestyle.fr" target="_blank" rel="noopener">${escapeHtml(r.programme.nom)} →</a>
  </div>`;

  // Carte partageable
  h += `<div class="carte-partage">
    <div class="titre-marque">Threads Cash Score™</div>
    <div class="score-central">${r.global}<span>/100</span></div>
    <div class="ligne-mini"><span>Attention</span><span>${s.attention}</span></div>
    <div class="ligne-mini"><span>Qualification</span><span>${s.attractionAcheteur}</span></div>
    <div class="ligne-mini"><span>Connexion</span><span>${s.connexion}</span></div>
    <div class="ligne-mini"><span>Désir</span><span>${s.desir}</span></div>
    <div class="ligne-mini"><span>Conviction</span><span>${s.conviction}</span></div>
    <div class="ligne-mini"><span>Offre</span><span>${s.offre}</span></div>
    <div class="ligne-mini"><span>Action</span><span>${s.conversion}</span></div>
    <p class="citation">Ma fuite : ${r.fuitePrincipale.libelle}<br>« ${escapeHtml(citationPartage(r.fuitePrincipale.cle))} »</p>
    <p class="signature-partage">par SOOLIFESTYLE</p>
  </div>`;

  if (hist.length > 1) {
    h += bloc("Tes scans", `<div class="carte">
      ${hist.slice(-6).map((x, i) => `<div class="historique-item"><span>${new Date(x.date).toLocaleDateString("fr-FR")} — ${escapeHtml(x.fuite)}</span><strong>${x.score}/100</strong></div>`).join("")}
      ${soo(hist[hist.length - 1].score > hist[hist.length - 2].score ? `Ça monte. Continue exactement comme ça.` : `Ça ne monte pas encore. Normal : un scan ne répare rien, c'est ce que tu publies entre deux scans qui compte.`)}
    </div>`);
  }

  h += `<div class="pied-rapport">
    <p>THREADYPRENEURS CASH SCANNER™ — analyse générée pour ton activité.<br>Un outil conçu par <strong>SOOLIFESTYLE</strong>.</p>
    <div class="actions-rapport">
      <button class="btn btn-secondaire" id="btn-imprimer">Exporter en PDF</button>
      <button class="btn btn-noir" id="btn-rescan">Refaire un scan</button>
    </div>
  </div>`;

  document.getElementById("rapport").innerHTML = h;
  document.getElementById("btn-imprimer").addEventListener("click", () => window.print());
  document.getElementById("btn-rescan").addEventListener("click", relancerScan);
  document.getElementById("btn-atelier").addEventListener("click", ouvrirAtelier);
  brancherCopie();
}

function nomAutopsie(k) {
  return { promesse: "Promesse", specificite: "Spécificité", desir: "Désir", differenciation: "Différenciation", valeurPercue: "Valeur perçue", confiance: "Confiance" }[k];
}

function commentaireRepartition(rep) {
  const vides = Object.entries(rep).filter(([, v]) => v === 0).map(([c]) => c.toLowerCase());
  const gros = Object.entries(rep).sort((a, b) => b[1] - a[1])[0];
  if (vides.includes("désirer") && vides.includes("convertir")) {
    return `Tu nourris. Tu ne donnes jamais faim.\n\nRien qui fasse désirer, rien qui fasse agir.\nC'est le profil classique de quelqu'un qu'on adore suivre et à qui on n'achète rien.`;
  }
  if (gros && gros[1] >= 60) {
    return `${gros[1]} % de tes posts font la même chose : ${gros[0].toLowerCase()}.\n\nUne audience qui reçoit toujours le même type de message finit par ne plus rien recevoir du tout.`;
  }
  if (vides.length) {
    return `Il manque complètement : ${vides.join(", ")}.\n\nCe ne sont pas des cases à cocher. Ce sont les étapes que ton lecteur doit franchir pour acheter.`;
  }
  return `Ta répartition couvre toutes les étapes. C'est rare. Regarde plutôt la qualité de chacune.`;
}

function citationPartage(cle) {
  return {
    attention: "J'écris pour des gens qui ne me lisent pas.",
    attractionAcheteur: "J'attire du monde. Pas mon monde.",
    connexion: "On me comprend. Personne ne se sent compris.",
    desir: "J'attire l'attention plus vite que je ne crée l'envie.",
    conviction: "On veut le résultat. On doute que ce soit moi.",
    offre: "Mon offre freine plus qu'elle n'attire.",
    conversion: "Tout est là, sauf la dernière marche.",
  }[cle] || "";
}

/* ---------- Copie ---------- */

let compteurCopie = 0;
const textesACopier = {};

function boutonCopier(texte) {
  const id = `cp${compteurCopie++}`;
  textesACopier[id] = texte;
  return `<button class="copier" data-copie="${id}">copier</button>`;
}

function brancherCopie() {
  document.querySelectorAll("[data-copie]").forEach(btn => {
    btn.addEventListener("click", async () => {
      const texte = textesACopier[btn.dataset.copie];
      let ok = false;
      try {
        await navigator.clipboard.writeText(texte);
        ok = true;
      } catch (e) {
        try {
          const ta = document.createElement("textarea");
          ta.value = texte;
          ta.style.position = "fixed";
          ta.style.opacity = "0";
          document.body.appendChild(ta);
          ta.select();
          ok = document.execCommand("copy");
          document.body.removeChild(ta);
        } catch (e2) { ok = false; }
      }
      btn.textContent = ok ? "copié" : "sélectionne-le";
      setTimeout(() => { btn.textContent = "copier"; }, 1800);
    });
  });
}

/* ---------- L'ATELIER ---------- */

function ouvrirAtelier() {
  const r = rapportCourant;
  const a = r.atelier;
  const conteneur = document.getElementById("atelier");

  conteneur.innerHTML = `
    <div class="atelier-entete">
      <p class="eyebrow">Ta priorité — une seule</p>
      <h1>${escapeHtml(a.titre)}</h1>
      <p class="texte-soo atelier-intro">${escapeHtml(a.intro)}</p>
    </div>
    <div class="carte">
      ${a.questions.map((q, i) => `
        <div class="champ champ-atelier">
          <label for="at-${q.id}"><span class="num-question">${i + 1}</span>${escapeHtml(q.label)}</label>
          <textarea id="at-${q.id}" placeholder="${escapeHtml(q.placeholder)}"></textarea>
        </div>`).join("")}
      <button class="btn btn-primaire btn-large" id="btn-assembler">Assembler mon texte →</button>
    </div>
    <div id="resultat-atelier"></div>
    <div class="actions-rapport" style="margin-top:30px;">
      <button class="btn btn-secondaire" id="btn-retour-rapport">← Revenir au diagnostic</button>
    </div>`;

  document.getElementById("rapport").classList.remove("actif");
  conteneur.classList.add("actif");
  document.getElementById("btn-assembler").addEventListener("click", assemblerAtelier);
  document.getElementById("btn-retour-rapport").addEventListener("click", () => {
    conteneur.classList.remove("actif");
    document.getElementById("rapport").classList.add("actif");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function assemblerAtelier() {
  const a = rapportCourant.atelier;
  const reponses = {};
  let remplies = 0;
  a.questions.forEach(q => {
    reponses[q.id] = valeur(`at-${q.id}`);
    if (reponses[q.id]) remplies++;
  });

  if (remplies === 0) {
    alert("Réponds à au moins une question. Même mal. Surtout mal, en fait — on corrigera après.");
    return;
  }

  const sortie = a.assembler(reponses);
  const zone = document.getElementById("resultat-atelier");
  zone.innerHTML = `
    <div class="separateur-atelier"></div>
    <h2 class="titre-sortie">${escapeHtml(sortie.titre)}</h2>
    ${sortie.blocs.map(b => `
      <div class="carte carte-sortie">
        <span class="objectif-thread">${escapeHtml(b.etiquette)}</span>
        <div class="thread-brouillon">${escapeHtml(b.texte)}${boutonCopier(b.texte)}</div>
      </div>`).join("")}
    <div class="carte carte-conseil">${soo(sortie.conseil)}</div>`;

  brancherCopie();
  zone.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ---------- Rescan ---------- */

function relancerScan() {
  document.getElementById("rapport").classList.remove("actif");
  document.getElementById("rapport").innerHTML = "";
  document.getElementById("atelier").classList.remove("actif");
  document.getElementById("wizard").style.display = "block";
  document.getElementById("barre-progression").style.display = "flex";
  afficherEcran(1);
}

construireBlocsThreads();
initPreuves();
