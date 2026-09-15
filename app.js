/* ============================================================
   THREADYPRENEURS CASH SCANNER™ — Interface (funnel + rapport)
   ============================================================ */

const etat = {
  ecranActuel: 0,
  business: { offre: "", prix: 0, resultat: "", cible: "", anciennete: "moins d'1 mois" },
  audience: { abonnes: 0, vuesMois: 0, ventesMois: 0, visitesProfil: 0, clicsOffre: 0 },
  threads: [{}, {}, {}, {}, {}],
  offre: { promesse: "", probleme: "", coutInaction: "", urgence: "", differenciation: "", objections: ["", "", ""], preuves: [] },
};

const TOTAL_ECRANS = 5; // 0 à 4

/* ---------- Génération des blocs Thread ---------- */

function construireBlocsThreads() {
  const conteneur = document.getElementById("conteneur-threads");
  let html = "";
  for (let i = 0; i < 5; i++) {
    html += `
      <div class="bloc-thread">
        <label><span class="num">${i + 1}</span>Thread n°${i + 1}</label>
        <div class="champ" style="margin-top:12px;margin-bottom:8px;">
          <textarea id="thread-texte-${i}" placeholder="Colle le texte de ton Thread ici..."></textarea>
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
  conteneur.innerHTML = html;
}

/* ---------- Sélections pills (préomotion / objections) ---------- */

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

/* ---------- Navigation funnel ---------- */

function majProgression() {
  const segments = document.querySelectorAll("#barre-progression .segment span");
  segments.forEach((seg, i) => {
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
  document.getElementById("btn-suivant").textContent = n === TOTAL_ECRANS - 1 ? "VOIR MON DIAGNOSTIC →" : "Suivant →";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

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

function valeur(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : "";
}
function nombre(id) {
  const el = document.getElementById(id);
  const v = el ? parseFloat(el.value) : 0;
  return isNaN(v) ? 0 : v;
}

function ecranValide(n) {
  if (n === 1) return etat.business.offre.length > 1 && etat.business.cible.length > 1;
  if (n === 4) return true;
  return true;
}

document.getElementById("btn-lancer").addEventListener("click", () => afficherEcran(1));

document.getElementById("btn-suivant").addEventListener("click", () => {
  collecterEcranActuel();
  if (!ecranValide(etat.ecranActuel)) {
    alert("Merci de préciser au moins ce que tu vends et à qui, pour un diagnostic exploitable.");
    return;
  }
  if (etat.ecranActuel === TOTAL_ECRANS - 1) {
    lancerDiagnostic();
  } else {
    afficherEcran(etat.ecranActuel + 1);
  }
});

document.getElementById("btn-precedent").addEventListener("click", () => {
  collecterEcranActuel();
  afficherEcran(Math.max(1, etat.ecranActuel - 1));
});

/* ---------- Lancement du diagnostic ---------- */

function lancerDiagnostic() {
  const scores = window.CashEngine.calculerScores(etat);
  const rapport = window.CashRapport.genererRapport(etat, scores);
  enregistrerHistorique(rapport);
  afficherRapport(rapport);
  document.getElementById("wizard").style.display = "none";
  document.getElementById("nav-boutons").style.display = "none";
  document.getElementById("barre-progression").style.display = "none";
  const r = document.getElementById("rapport");
  r.classList.add("actif");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------- Historique (localStorage) ---------- */

function enregistrerHistorique(rapport) {
  try {
    const cle = "tcs_historique";
    const historique = JSON.parse(localStorage.getItem(cle) || "[]");
    historique.push({ date: new Date().toISOString(), score: rapport.global, fuite: rapport.fuitePrincipale.libelle, scores: rapport.scores });
    localStorage.setItem(cle, JSON.stringify(historique));
  } catch (e) { /* stockage indisponible, on continue sans historique */ }
}

function lireHistorique() {
  try {
    return JSON.parse(localStorage.getItem("tcs_historique") || "[]");
  } catch (e) { return []; }
}

/* ---------- Rendu du rapport ---------- */

function barreScore(nom, valeur) {
  const niv = window.CashEngine.niveauScore(valeur);
  return `
    <div class="barre-score">
      <div class="nom">${nom}</div>
      <div class="piste"><div class="remplissage" style="width:${valeur}%"></div></div>
      <div class="valeur">${niv.emoji} ${valeur}</div>
    </div>`;
}

function afficherRapport(r) {
  const s = r.scores;
  const hist = lireHistorique();

  let html = "";

  // En-tête + Cash Score
  html += `
    <div class="rapport-entete">
      <p class="eyebrow" style="justify-content:center;display:flex;">Ton Cash Report™</p>
      <div class="cash-score-cercle">
        <div class="chiffre">${r.global}</div>
        <div class="sur100">/ 100 — ${r.niveauGlobal.emoji} ${r.niveauGlobal.label}</div>
      </div>
      <p style="color:var(--gris);max-width:480px;margin:0 auto;">Ce score est secondaire. Ce qui compte, c'est où tu perds ton prospect.</p>
      ${r.casParticulier ? blocCasParticulier(r.casParticulier) : ""}
    </div>`;

  // 2. Diagnostic exécutif
  html += section(2, "Diagnostic exécutif", "", `
    <div class="carte">
      ${r.diagnosticExecutif.map(l => `<p style="margin:0 0 12px;line-height:1.6;">${l}</p>`).join("")}
    </div>`);

  // 3-4-5. Money Leak + pourquoi + impact
  html += section(3, "Ta fuite principale — Indice de Fuite", "", `
    <div class="carte-fuite-principale">
      <div class="label">💰 Money Leak Index™ — Score ${r.fuitePrincipale.score}/100</div>
      <h3>${r.fuitePrincipale.libelle}</h3>
      <p>${r.tplPrincipale.pourquoi}</p>
      <p><strong style="color:#fff;">Mécanisme psychologique :</strong> ${r.tplPrincipale.mecanisme}</p>
      <p><strong style="color:#fff;">Ce qu'il faut corriger :</strong> ${r.tplPrincipale.correction}</p>
    </div>
    <p class="intro-section">Fuite secondaire : <strong>${r.deuxiemeFuite.libelle}</strong> (score ${r.deuxiemeFuite.score}/100) — à traiter seulement une fois la première réparée.</p>
  `);

  // 6. Les 7 étapes
  html += section(6, "Analyse des 7 étapes", "Attention → Intérêt → Confiance → Désir → Conviction → Action → Achat.", `
    <div class="carte">
      ${barreScore("Attention", Math.round(s.attention))}
      ${barreScore("Qualification (attraction acheteur)", Math.round(s.attractionAcheteur))}
      ${barreScore("Connexion", Math.round(s.connexion))}
      ${barreScore("Désir", Math.round(s.desir))}
      ${barreScore("Conviction", Math.round(s.conviction))}
      ${barreScore("Offre", Math.round(s.offre))}
      ${barreScore("Conversion", Math.round(s.conversion))}
    </div>
    <div class="grille-scores" style="margin-top:20px;">
      ${["attention","attractionAcheteur","connexion","desir","conviction","offre","conversion"].map(cle => {
        const niv = window.CashEngine.niveauScore(Math.round(s[cle]));
        return `<div class="tuile-score"><div class="emoji">${niv.emoji}</div><div class="chiffre">${Math.round(s[cle])}</div><div class="nom">${window.CashEngine.LIBELLES[cle]}</div></div>`;
      }).join("")}
    </div>
  `);

  // 7. Audience
  html += section(7, "Analyse de l'audience", "", `<div class="carte">${r.audienceAnalyse.map(l => `<p style="margin:0 0 10px;line-height:1.6;">${l}</p>`).join("")}</div>`);

  // 8. Positionnement
  html += section(8, "Analyse du positionnement", "", `<div class="carte"><p style="margin:0;line-height:1.6;">${r.positionnement}</p></div>`);

  // 9. Autopsie de l'offre
  html += section(9, "Autopsie de l'offre™", "", `
    <div class="carte">
      ${barreScore("Promesse", Math.round(r.autopsie.promesse))}
      ${barreScore("Spécificité", Math.round(r.autopsie.specificite))}
      ${barreScore("Désir", Math.round(r.autopsie.desir))}
      ${barreScore("Différenciation", Math.round(r.autopsie.differenciation))}
      ${barreScore("Valeur perçue", Math.round(r.autopsie.valeurPercue))}
      ${barreScore("Confiance", Math.round(r.autopsie.confiance))}
    </div>`);

  // 10. Threads
  html += section(10, "Analyse de tes 5 Threads", "", r.scores.analysesThreads.map((a, i) => `
    <div class="carte">
      <span class="tag-classification">${a.classification}</span>
      <p style="margin:10px 0 4px;font-weight:700;">Thread n°${i + 1} — ${a.total}/100</p>
      <p style="margin:0;color:var(--gris);font-size:13.5px;">Hook ${a.hook}/20 · Pertinence ${a.pertinence}/20 · Connexion ${a.connexion}/20 · Désir ${a.desir}/20 · Conversion ${a.conversion}/20</p>
    </div>`).join(""));

  // 11. Content Gap
  html += section(11, "Écart de contenu™", "Répartition réelle de tes publications par objectif.", `
    <div class="carte">
      ${Object.entries(r.repartition).map(([cat, val]) => barreScore(cat, val)).join("")}
      <p style="margin-top:14px;line-height:1.6;">
        ${r.contentGap.trop.length ? `Tu fais trop de : <strong>${r.contentGap.trop.join(", ")}</strong>.<br>` : ""}
        ${r.contentGap.pasAssez.length ? `Tu ne fais pas assez de : <strong>${r.contentGap.pasAssez.join(", ")}</strong>.` : "Ta répartition couvre déjà toutes les catégories."}
      </p>
    </div>`);

  // 12. Desire Gap
  html += section(12, "Écart de désir™", "", `
    <div class="carte">
      <p style="margin:0 0 10px;">Désir actuel : <strong>${Math.round(s.desir)}</strong> — Seuil recommandé à l'achat : <strong>70</strong> — Écart : <strong style="color:var(--rouge);">-${r.gapDesir}</strong></p>
      <p style="margin:0;line-height:1.6;">Ton travail n'est pas de parler davantage de ton produit. Ton travail est de faire monter le désir de la situation future jusqu'à ce que l'action devienne suffisamment attractive.</p>
    </div>`);

  // 13. Objections
  html += section(13, "Carte des objections", "", r.objectionsMappees.length ? r.objectionsMappees.map(o => `
    <div class="carte">
      <p style="margin:0 0 8px;color:var(--gris);font-size:13px;text-transform:uppercase;letter-spacing:0.05em;">Objection apparente</p>
      <p style="margin:0 0 14px;font-weight:600;">${o.apparente}</p>
      <p style="margin:0 0 8px;color:var(--gris);font-size:13px;text-transform:uppercase;letter-spacing:0.05em;">Résistance psychologique probable</p>
      <p style="margin:0;">${o.reelle}</p>
    </div>`).join("") : `<div class="carte">Aucune objection renseignée pour l'instant.</div>`);

  // 14. CTA
  html += section(14, "Générateur d'appels à l'action™", "Adapté au niveau réel de conscience de ton audience.", r.ctaParNiveau.map(c => `
    <div class="carte">
      <p style="margin:0 0 4px;font-weight:700;">Niveau ${c.niveau} — ${c.nom} <span style="color:var(--gris);font-weight:400;">(${c.type})</span></p>
      <p style="margin:0;color:var(--gris);">${c.exemple}</p>
    </div>`).join(""));

  // 15-16. Stop / Start
  html += section(15, "3 choses à arrêter / à commencer", "", `
    <div class="carte">
      <ul class="liste-puce arreter">
        <li>${r.tplPrincipale.arreter}</li>
        <li>${r.tplSecondaire.arreter}</li>
        <li>Arrête de mesurer la qualité de ton contenu uniquement aux vues.</li>
      </ul>
    </div>
    <div class="carte">
      <ul class="liste-puce commencer">
        <li>${r.tplPrincipale.commencer}</li>
        <li>${r.tplSecondaire.commencer}</li>
        <li>Commence à mesurer ce qui se passe après le clic, pas seulement avant.</li>
      </ul>
    </div>`);

  // 17. Plan 7 jours
  html += section(17, "Plan de réparation 7 jours™", "", `
    <div class="carte">
      ${r.plan7Jours.map(j => `
        <div class="jour-plan">
          <div class="badge-jour">J${j.jour}</div>
          <div><div class="titre-jour">${j.action}</div><div class="detail-jour">${j.detail}</div></div>
        </div>`).join("")}
    </div>`);

  // 18. Angles de désir
  html += section(18, "10 angles de désir™", "", `
    <div class="carte">
      ${window.CashRapport.ANGLES_DESIR.map(a => `
        <div style="margin-bottom:18px;padding-bottom:18px;border-bottom:1px solid var(--gris-clair);">
          <p style="margin:0 0 4px;font-weight:700;">${a.angle} <span style="font-weight:400;color:var(--gris);">— ${a.desirActive}</span></p>
          <p style="margin:0 0 6px;color:var(--gris);font-size:13.5px;">${a.pourquoi}</p>
          <p style="margin:0;font-style:italic;">${window.CashRapport.genererAngleThread(a, etat.business)}</p>
        </div>`).join("")}
    </div>`);

  // 19. Threads prêts à publier
  html += section(19, "3 Threads prêts à publier", "", r.threadsPrets.map(t => `<div class="thread-brouillon">${escapeHtml(t)}</div>`).join(""));

  // Phrases à voler (bonus)
  html += section("Bonus", "Phrases à voler™", "", `<div class="carte">${r.stealPhrases.map(p => `<div class="phrase-a-voler">« ${p} »</div>`).join("")}</div>`);

  // 20. Next Best Action
  html += `
    <div class="mouvement-final">
      <p class="eyebrow">Ton prochain mouvement</p>
      <p>${r.tplPrincipale.prochain}<br><br>${r.tplPrincipale.outil}</p>
      <button class="btn" id="btn-vers-outil">Réparer ma promesse →</button>
    </div>`;

  // Loop commercial
  html += `
    <div class="carte" style="margin-top:30px;">
      <p class="eyebrow">Pour aller plus loin</p>
      <p style="margin:0;line-height:1.6;">Ton problème principal est <strong>${r.fuitePrincipale.libelle.toLowerCase()}</strong>. C'est exactement ce que travaille en profondeur <strong>PSYCHOPERSUASION™</strong>, la suite logique de ce diagnostic.</p>
    </div>`;

  // Carte partageable
  html += `
    <div class="carte-partage" id="carte-partage">
      <div class="titre-marque">Threads Cash Score™</div>
      <div class="score-central">${r.global}<span style="font-size:22px;color:#999;">/100</span></div>
      <div class="ligne-mini"><span>🧲 Attention</span><span>${Math.round(s.attention)}</span></div>
      <div class="ligne-mini"><span>❤️ Connexion</span><span>${Math.round(s.connexion)}</span></div>
      <div class="ligne-mini"><span>🔥 Désir</span><span>${Math.round(s.desir)}</span></div>
      <div class="ligne-mini"><span>🛡️ Conviction</span><span>${Math.round(s.conviction)}</span></div>
      <div class="ligne-mini"><span>💰 Offre</span><span>${Math.round(s.offre)}</span></div>
      <div class="ligne-mini"><span>🚀 Conversion</span><span>${Math.round(s.conversion)}</span></div>
      <p class="citation">Fuite principale : ${r.fuitePrincipale.libelle}<br>« ${citationPartage(r.fuitePrincipale.cle)} »</p>
    </div>`;

  // Historique
  if (hist.length > 1) {
    html += section("Bonus", "Historique de tes scans", "", `
      <div class="carte historique-liste">
        ${hist.map((h, i) => `<div class="historique-item"><span>Scan #${i + 1} — ${new Date(h.date).toLocaleDateString("fr-FR")}</span><strong>${h.score}/100</strong></div>`).join("")}
      </div>`);
  }

  // Pied de page + actions
  html += `
    <div class="pied-rapport">
      <p style="color:var(--gris);font-size:13px;">THREADYPRENEURS CASH SCANNER™ — Diagnostic confidentiel généré pour ton activité.</p>
      <div class="actions-rapport">
        <button class="btn btn-secondaire" id="btn-imprimer">Exporter mon Cash Report™ (PDF)</button>
        <button class="btn btn-noir" id="btn-rescan">Je relance mon scan</button>
      </div>
    </div>`;

  document.getElementById("rapport").innerHTML = html;

  document.getElementById("btn-imprimer").addEventListener("click", () => window.print());
  document.getElementById("btn-rescan").addEventListener("click", relancerScan);
  const btnOutil = document.getElementById("btn-vers-outil");
  if (btnOutil) btnOutil.addEventListener("click", () => {
    document.getElementById("carte-partage").scrollIntoView({ behavior: "smooth" });
  });
}

function citationPartage(cle) {
  const citations = {
    attention: "Mon contenu se perd avant même d'être vu.",
    attractionAcheteur: "J'attire du monde, pas les bonnes personnes.",
    connexion: "On me comprend, mais on ne se sent pas compris.",
    desir: "J'attire l'attention plus vite que je ne crée le désir.",
    conviction: "On veut le résultat, on ne me croit pas encore assez.",
    offre: "Mon offre freine plus qu'elle n'attire.",
    conversion: "L'intérêt existe. Le passage à l'action, non.",
  };
  return citations[cle] || "";
}

function blocCasParticulier(cas) {
  const contenus = {
    VANITY_ALERT: `<div class="carte accent-rouge" style="margin-top:20px;text-align:left;"><strong>🚨 Alerte métriques vanité</strong><br>Tes vues prouvent que tu sais attirer l'attention. Elles ne prouvent pas que tu sais créer de la demande.</div>`,
    ZERO_VENTE: `<div class="carte accent-rouge" style="margin-top:20px;text-align:left;"><strong>Mode zéro vente activé</strong><br>Zéro vente ne signifie pas automatiquement zéro demande. Priorité : offre → désir → confiance → conversion → qualification de l'audience.</div>`,
    PEPITE_CACHEE: `<div class="carte" style="margin-top:20px;text-align:left;border-color:#1a7a3c;"><strong>💎 Pépite cachée</strong><br>Ton système commercial semble fonctionner malgré une faible visibilité. Ne change surtout pas tout. Ton prochain levier est probablement l'attention / la distribution.</div>`,
    CLICS_SANS_VENTES: `<div class="carte accent-rouge" style="margin-top:20px;text-align:left;"><strong>Clics sans ventes</strong><br>Ton contenu arrive à faire cliquer. Le problème apparaît probablement après le clic.</div>`,
    VISITES_SANS_CLICS: `<div class="carte accent-rouge" style="margin-top:20px;text-align:left;"><strong>Visites sans clics</strong><br>Beaucoup de visites de profil, peu de clics. Regarde ton profil, ton positionnement et ton appel à l'action.</div>`,
  };
  return contenus[cas] || "";
}

function section(num, titre, intro, contenu) {
  const estNumerique = /^\d+$/.test(String(num));
  return `
    <div class="section-rapport">
      <h2><span class="numero-section">${estNumerique ? num + "." : num}</span> ${titre}</h2>
      ${intro ? `<p class="intro-section">${intro}</p>` : ""}
      ${contenu}
    </div>`;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function relancerScan() {
  document.getElementById("rapport").classList.remove("actif");
  document.getElementById("rapport").innerHTML = "";
  document.getElementById("wizard").style.display = "block";
  document.getElementById("barre-progression").style.display = "flex";
  afficherEcran(1);
}

/* ---------- Initialisation ---------- */

construireBlocsThreads();
initPreuves();
