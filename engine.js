/* ============================================================
   THREADYPRENEURS CASH SCANNER™ — Moteur
   On cherche une seule chose : où ça fuit entre l'attention
   qu'on te donne et l'argent que tu ne reçois pas.
   ============================================================ */

const Dico = {
  desir: ["enfin","libre","libéré","libérée","transformation","rêve","rêves","peur","risque","honte","fierté",
    "gagner","perdre","argent","temps","liberté","sécurité","contrôle","reconnaissance","statut","confort",
    "envie","besoin","obsédé","obsession","urgent","jamais","toujours","imagine","imagines","imaginer",
    "avant","après","fini","finies","assez","marre","épuisé","épuisée","soulagement","paix","vide","gouffre",
    "coûte","coûté","perdu","perdue","rate","raté","ratée","stagne","bloqué","bloquée"],
  preuve: ["témoignage","témoignages","client","clients","résultat","résultats","étude de cas","%","€","euros",
    "preuve","preuves","avis","capture","screenshot","chiffre","chiffres","données","statistique","mois",
    "semaines","jours"],
  urgence: ["aujourd'hui","maintenant","vite","dernier","dernière","bientôt","limité","limitée","places",
    "expire","demain","ce soir","dépêche","plus que","dernières","ce mois"],
  cta: ["clique","cliquez","réserve","réserves","achète","achètes","télécharge","télécharges","inscris",
    "inscris-toi","rejoins","rejoins-moi","commande","commandes","découvre","découvres","lien en bio",
    "lien ci-dessous","👇","👇🏼","dm","écris-moi","réponds","commentaire","commente","mets un"],
  connexion: ["tu ","toi","ton ","ta ","tes ","j'ai eu peur","j'ai douté","je me suis senti","je me suis sentie",
    "vulnérab","j'avoue","honnêtement","je te confie","entre nous","je te promets","je sais ce que c'est",
    "moi aussi","comme toi","tu connais","tu vis","je te jure","j'ai honte","je me souviens"],
  education: ["voici comment","étape","étapes","méthode","astuce","astuces","technique","stratégie","process",
    "framework","conseil","conseils","comment faire","tuto","règle","règles","liste","points"],
  autorite: ["des années","expérience","expert","experte","clients accompagnés","résultats obtenus","depuis",
    "formé","formée","certifié","certifiée","des centaines","des milliers","j'ai testé","j'ai construit",
    "j'ai accompagné","mon parcours"],
  differenciation: ["contrairement","pas comme","seul","seule","unique","personne ne","au contraire",
    "à l'inverse","different","différent","différente","alors que les autres","la plupart"],
  projection: ["imagine","imagines","dans 6 mois","dans un an","le jour où","tu te réveilles","tu ouvres",
    "visualise","projette"],
};

function occ(texte, liste) {
  if (!texte) return 0;
  const t = texte.toLowerCase();
  let n = 0;
  for (const mot of liste) {
    const re = new RegExp(mot.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
    const m = t.match(re);
    if (m) n += m.length;
  }
  return n;
}

function clamp(n, min = 0, max = 100) {
  return Math.max(min, Math.min(max, Math.round(n)));
}

// Montée rapide sur les premières occurrences : la 1re compte beaucoup plus que la 8e.
function signal(n, seuilFort) {
  if (n <= 0) return 0;
  return Math.min(1, Math.sqrt(n / seuilFort));
}

function mapRatio(valeur, bas, haut) {
  if (haut === bas) return 50;
  return clamp(((valeur - bas) / (haut - bas)) * 100);
}

/* L'échelle de vues propre à Threads, sur 30 jours.
   Un même volume ne vaut pas la même chose ici et ailleurs. */
const ECHELLE_VUES = [
  { max: 10000, label: "médiocre", bas: 0, haut: 20 },
  { max: 25000, label: "faible", bas: 20, haut: 35 },
  { max: 50000, label: "bof", bas: 35, haut: 50 },
  { max: 75000, label: "moyen", bas: 50, haut: 65 },
  { max: 100000, label: "bon", bas: 65, haut: 78 },
  { max: 150000, label: "très bon", bas: 78, haut: 90 },
  { max: Infinity, label: "excellent", bas: 90, haut: 100 },
];

function paliersVues(vuesMois) {
  const v = vuesMois || 0;
  let plancher = 0;
  for (const p of ECHELLE_VUES) {
    if (v < p.max) {
      const etendue = p.max === Infinity ? 150000 : p.max - plancher;
      const avancee = Math.min(1, (v - plancher) / etendue);
      return { label: p.label, score: clamp(p.bas + avancee * (p.haut - p.bas)) };
    }
    plancher = p.max;
  }
  return { label: "excellent", score: 100 };
}

// Moyenne pondérée qui ignore les signaux absents (stats non fournies).
function melange(parts) {
  let total = 0, poids = 0;
  for (const p of parts) {
    if (p.valeur === null || p.valeur === undefined || isNaN(p.valeur)) continue;
    total += p.valeur * p.poids;
    poids += p.poids;
  }
  return poids === 0 ? 40 : total / poids;
}

// Nombre de mots de fond partagés. Le compte absolu est plus fiable
// qu'un ratio : une cible bien écrite est courte, un Thread ne l'est pas.
function motsCommuns(a, b) {
  const vides = ["pour","avec","dans","sans","plus","tout","tous","cette","leur","être","fait","vous","nous",
    "mais","donc","alors","quand","comme","même","elle","cela","ceux","celui","très","bien","chose","faire"];
  const nettoyer = (s) => new Set((s || "").toLowerCase()
    .split(/[^a-zàâäéèêëïîôöùûüç0-9']+/)
    .map(w => w.replace(/s$/, ""))
    .filter(w => w.length > 3 && !vides.includes(w)));
  const wa = nettoyer(a), wb = nettoyer(b);
  if (wa.size === 0 || wb.size === 0) return 0;
  let commun = 0;
  wa.forEach(w => { if (wb.has(w)) commun++; });
  return commun;
}

function empreinte(texte) {
  let h = 7;
  const t = (texte || "").toLowerCase();
  for (let i = 0; i < t.length; i++) h = (h * 31 + t.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/* ---------- Analyse d'un Thread ---------- */

function analyserThread(thread, ctx) {
  const texte = thread.texte || "";
  const longueur = texte.length || 1;
  const lignes = texte.split("\n").filter(l => l.trim());
  const premiereLigne = lignes[0] || texte.slice(0, 90);
  const lp = premiereLigne.length;

  // HOOK /20 — ce que la première ligne promet (ou pas)
  let hook = 2;
  if (/\d/.test(premiereLigne)) hook += 3;
  if (/\?/.test(premiereLigne)) hook += 3;
  if (/\.\.\.|…/.test(premiereLigne)) hook += 2;
  if (/\b(mais|pourtant|jamais|personne|rien|sauf|au lieu)\b/i.test(premiereLigne)) hook += 4;
  if (/\b(je|j'|mon|ma)\b/i.test(premiereLigne)) hook += 2;
  if (lp >= 15 && lp <= 80) hook += 4;
  else if (lp > 150) hook -= 2;
  if (lignes.length >= 3 && lignes.filter(l => l.length < 60).length >= 2) hook += 2; // rythme court
  hook = clamp(hook, 0, 20);

  // PERTINENCE /20 — est-ce que ce post parle du terrain de ton offre
  const ancrageCible = motsCommuns(texte, ctx.cible);
  const ancrageOffre = motsCommuns(texte, (ctx.resultat || "") + " " + (ctx.offre || "") + " " + (ctx.probleme || ""));
  let pertinence = Math.round(signal(ancrageCible, 2) * 9 + signal(ancrageOffre, 3) * 11);
  pertinence = clamp(pertinence, 0, 20);

  // CONNEXION /20 — est-ce qu'on se reconnaît dedans
  const nConnexion = occ(texte, Dico.connexion);
  const nTu = (texte.match(/\b(tu|toi|ton|ta|tes)\b/gi) || []).length;
  let connexion = Math.round(signal(nConnexion, 6) * 12 + signal(nTu, 5) * 8);
  connexion = clamp(connexion, 0, 20);

  // DÉSIR /20 — est-ce que ça donne faim
  const nDesir = occ(texte, Dico.desir);
  const nProjection = occ(texte, Dico.projection);
  const contraste = /avant/i.test(texte) && /après/i.test(texte);
  let desir = Math.round(signal(nDesir, 7) * 11 + signal(nProjection, 2) * 5 + (contraste ? 4 : 0));
  desir = clamp(desir, 0, 20);

  // CONVERSION /20 — est-ce qu'on sait quoi faire en sortant
  const nCta = occ(texte, Dico.cta);
  const nUrgence = occ(texte, Dico.urgence);
  let conversion = Math.round(signal(nCta, 2) * 13 + signal(nUrgence, 2) * 7);
  conversion = clamp(conversion, 0, 20);

  const total = hook + pertinence + connexion + desir + conversion;

  const nEducation = occ(texte, Dico.education);
  const nAutorite = occ(texte, Dico.autorite);
  const categories = {
    ATTIRER: hook,
    CONNECTER: connexion,
    ÉDUQUER: Math.round(signal(nEducation, 4) * 20),
    DÉSIRER: desir,
    CONVERTIR: conversion,
    AUTORITÉ: Math.round(signal(nAutorite, 3) * 20),
  };
  let classification = "ATTIRER", max = -1;
  for (const cat in categories) {
    if (categories[cat] > max) { max = categories[cat]; classification = cat; }
  }

  // Signaux terrain (null si l'utilisateur n'a pas fourni les stats)
  const vues = thread.vues || 0;
  const tauxReponse = vues > 0 ? (thread.reponses || 0) / vues : null;
  const tauxClic = vues > 0 && thread.clics ? thread.clics / vues : null;

  return {
    hook, pertinence, connexion, desir, conversion, total, classification,
    vues, tauxReponse, tauxClic,
    premiereLigne: premiereLigne.trim(),
    nbLignes: lignes.length,
  };
}

/* ---------- Les 7 scores ---------- */

function calculerScores(state) {
  const { business, audience, offre } = state;
  const threads = state.threads.filter(t => t.texte && t.texte.trim().length > 10);
  const ctx = { cible: business.cible, resultat: business.resultat, offre: business.offre, probleme: offre.probleme };

  const analyses = threads.map(t => analyserThread(t, ctx));
  const aDesThreads = analyses.length > 0;
  // Sans texte collé, un seul ratio ne doit pas suffire à produire un score extrême.
  const amorti = aDesThreads ? [] : [{ valeur: 45, poids: 3 }];
  const moy = (f) => aDesThreads ? analyses.reduce((a, b) => a + f(b), 0) / analyses.length : null;
  const moyDefinie = (f) => {
    const vals = analyses.map(f).filter(v => v !== null && v !== undefined && !isNaN(v));
    return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null;
  };

  const vuesMois = audience.vuesMois || 0;
  const abonnes = audience.abonnes || 0;
  const ventes = audience.ventesMois || 0;
  const visites = audience.visitesProfil || 0;
  const clics = audience.clicsOffre || 0;

  // ATTENTION — le volume se juge sur l'échelle Threads, pas sur un ratio maison
  const volume = vuesMois > 0 ? paliersVues(vuesMois).score : null;
  const portee = abonnes > 0 && vuesMois > 0 ? mapRatio(vuesMois / abonnes, 0.5, 6) : null;
  const meilleurThread = aDesThreads ? Math.max(...analyses.map(a => a.vues || 0)) : 0;
  const picViral = meilleurThread > 0 && vuesMois > 0 ? mapRatio(meilleurThread / (vuesMois / 12), 0.5, 4) : null;
  const attention = clamp(melange([
    { valeur: aDesThreads ? moy(a => a.hook) * 5 : null, poids: 3 },
    { valeur: volume, poids: 3 },
    { valeur: portee, poids: 1 },
    { valeur: picViral, poids: 1 },
    ...amorti,
  ]));

  // QUALIFICATION (attraction acheteur)
  const tauxVisite = vuesMois > 0 && visites > 0 ? mapRatio(visites / vuesMois, 0.005, 0.12) : null;
  const tauxClicProfil = visites > 0 && clics > 0 ? mapRatio(clics / visites, 0.01, 0.25) : null;
  const attractionAcheteur = clamp(melange([
    { valeur: aDesThreads ? moy(a => a.pertinence) * 5 : null, poids: 3 },
    { valeur: tauxVisite, poids: 2 },
    { valeur: tauxClicProfil, poids: 2 },
    ...amorti,
  ]));

  // CONNEXION
  const tauxReponseMoyen = moyDefinie(a => a.tauxReponse);
  const connexion = clamp(melange([
    { valeur: aDesThreads ? moy(a => a.connexion) * 5 : null, poids: 3 },
    { valeur: tauxReponseMoyen !== null ? mapRatio(tauxReponseMoyen, 0.0005, 0.008) : null, poids: 2 },
    ...amorti,
  ]));

  // DÉSIR
  const coutVisible = (offre.coutInaction || "").length;
  const urgenceVisible = (offre.urgence || "").length;
  const tauxClicThread = moyDefinie(a => a.tauxClic);
  const desir = clamp(melange([
    { valeur: aDesThreads ? moy(a => a.desir) * 5 : null, poids: 4 },
    { valeur: mapRatio(coutVisible, 10, 140), poids: 2 },
    { valeur: mapRatio(urgenceVisible, 10, 110), poids: 1 },
    { valeur: tauxClicThread !== null ? mapRatio(tauxClicThread, 0.0005, 0.015) : null, poids: 2 },
    ...amorti,
  ]));

  // CONVICTION
  const preuves = (offre.preuves || []).filter(p => p !== "aucune");
  const objectionsRemplies = (offre.objections || []).filter(o => o && o.trim().length > 3).length;
  const ancienneteScore = { "moins d'1 mois": 20, "1 à 3 mois": 40, "3 à 6 mois": 58, "6 à 12 mois": 72, "plus d'un an": 85 }[business.anciennete] ?? 40;
  const specifique = (/\d/.test(offre.promesse || "") ? 55 : 0) + (/\d/.test(business.resultat || "") ? 45 : 0);
  const conviction = clamp(melange([
    { valeur: mapRatio(preuves.length, 0, 4), poids: 3 },
    { valeur: mapRatio(objectionsRemplies, 0, 3), poids: 2 },
    { valeur: specifique, poids: 2 },
    { valeur: ancienneteScore, poids: 1 },
  ]));

  // OFFRE
  const promesseLg = (offre.promesse || "").length;
  const clarte = promesseLg === 0 ? 5 : (promesseLg < 25 ? 30 : mapRatio(promesseLg, 25, 110));
  const nDiff = occ(offre.differenciation || "", Dico.differenciation);
  const diffLg = (offre.differenciation || "").length;
  const differenciation = clamp(signal(nDiff, 2) * 55 + mapRatio(diffLg, 10, 120) * 0.45);
  const resultatConcret = /\d/.test(business.resultat || "") ? 80 : mapRatio((business.resultat || "").length, 10, 90);
  const coherencePrix = business.prix > 0 ? (business.prix >= 200 && preuves.length < 2 ? 35 : 70) : null;
  const offreScore = clamp(melange([
    { valeur: clarte, poids: 3 },
    { valeur: differenciation, poids: 3 },
    { valeur: resultatConcret, poids: 2 },
    { valeur: coherencePrix, poids: 1 },
  ]));

  // CONVERSION
  const tauxVente = clics > 0 ? mapRatio(ventes / clics, 0, 0.12) : (visites > 0 ? mapRatio(ventes / visites, 0, 0.03) : null);
  const threadsAvecCta = aDesThreads ? analyses.filter(a => a.conversion >= 8).length / analyses.length : null;
  const conversion = clamp(melange([
    { valeur: aDesThreads ? moy(a => a.conversion) * 5 : null, poids: 3 },
    { valeur: threadsAvecCta !== null ? threadsAvecCta * 100 : null, poids: 2 },
    { valeur: tauxVente, poids: 3 },
    ...amorti,
  ]));

  return {
    attention, attractionAcheteur, connexion, desir, conviction,
    offre: offreScore, conversion,
    analysesThreads: analyses,
  };
}

const POIDS = {
  attention: 0.10,
  attractionAcheteur: 0.15,
  connexion: 0.10,
  desir: 0.25,
  conviction: 0.15,
  offre: 0.15,
  conversion: 0.10,
};

const FACILITE = {
  attention: 60,
  attractionAcheteur: 40,
  connexion: 65,
  desir: 70,
  conviction: 55,
  offre: 50,
  conversion: 75,
};

const LIBELLES = {
  attention: "ATTENTION",
  attractionAcheteur: "QUALIFICATION",
  connexion: "CONNEXION",
  desir: "DÉSIR",
  conviction: "CONVICTION",
  offre: "OFFRE",
  conversion: "ACTION",
};

function scoreGlobal(scores) {
  let s = 0;
  for (const k in POIDS) s += scores[k] * POIDS[k];
  return clamp(s);
}

function indiceDeFuite(scores) {
  const fuites = [];
  for (const k in POIDS) {
    const gravite = 100 - scores[k];
    const impact = Math.min(100, Math.round(POIDS[k] * 400));
    const facilite = FACILITE[k];
    const score = clamp(gravite * 0.55 + impact * 0.25 + facilite * 0.20);
    fuites.push({ cle: k, libelle: LIBELLES[k], gravite, impact, facilite, score, scoreBrut: scores[k] });
  }
  fuites.sort((a, b) => b.score - a.score);
  return fuites;
}

/* ---------- Règles de diagnostic (priment sur le simple classement) ----------
   Une fuite en amont rend les suivantes illisibles : inutile de parler désir
   à quelqu'un que personne ne lit.                                          */

function fuitePrioritaire(scores, fuites, state) {
  const s = scores;
  const trouver = (cle) => fuites.find(f => f.cle === cle);
  let regle = null, cle = null;

  if (s.offre < 30) {
    cle = "offre";
    regle = "Ta promesse est trop vague pour que le reste puisse se juger — et c'est aussi ce qui se répare le plus vite.";
  } else if (s.attractionAcheteur < 30) {
    cle = "attractionAcheteur";
    regle = "Presque rien dans ce que tu publies ne touche au terrain de ton offre. Tout le reste est faussé par ça.";
  } else if (s.attention < 45) {
    cle = "attention";
    regle = "Peu de portée, accroches faibles : tant que personne ne s'arrête, le reste ne peut pas se juger.";
  } else if (s.attractionAcheteur < 38) {
    cle = "attractionAcheteur";
    regle = "Bonne visibilité, mauvaise proximité avec ton offre : tu remplis la salle avec les mauvaises personnes.";
  } else if (s.connexion < 40) {
    cle = "connexion";
    regle = "Les bonnes personnes passent, mais rien ne les accroche personnellement.";
  } else if (s.desir < 55) {
    cle = "desir";
    regle = "Audience correcte, lien correct, envie absente : c'est là que l'argent s'arrête.";
  } else if (s.desir >= 55 && s.conviction < 50) {
    cle = "conviction";
    regle = "On veut le résultat, on doute que tu sois celui qui le livre.";
  } else if (s.desir >= 50 && s.conviction >= 50 && s.offre < 50) {
    cle = "offre";
    regle = "Le terrain est prêt, c'est l'offre elle-même qui ne tient pas debout.";
  } else if (s.desir >= 55 && s.conviction >= 55 && s.conversion < 50) {
    cle = "conversion";
    regle = "Tout est réuni sauf la dernière marche : personne ne sait quoi faire en sortant.";
  }

  if (!cle) {
    const top = fuites[0];
    return { fuite: top, regle: "Aucune étape ne s'effondre seule : c'est la marche la plus coûteuse qui passe en premier." };
  }
  return { fuite: trouver(cle), regle };
}

function niveauScore(s) {
  if (s <= 30) return { emoji: "🔴", label: "critique" };
  if (s <= 50) return { emoji: "🟠", label: "faible" };
  if (s <= 70) return { emoji: "🟡", label: "correct" };
  if (s <= 85) return { emoji: "🟢", label: "fort" };
  return { emoji: "🔥", label: "excellent" };
}

/* ---------- Cas particuliers ---------- */

function detecterCasParticulier(state) {
  const a = state.audience;
  const abonnes = a.abonnes || 0, vues = a.vuesMois || 0, ventes = a.ventesMois || 0;
  const visites = a.visitesProfil || 0, clics = a.clicsOffre || 0;

  if (abonnes > 500 && ventes === 0) {
    // « beaucoup de vues » sur Threads commence au palier moyen : 50 000 sur 30 jours.
    if (vues >= 50000) return "VANITY_ALERT";
    return "ZERO_VENTE";
  }
  // Palier médiocre (< 10 000 vues) et pourtant des ventes : le système marche dans une pièce vide.
  if (vues > 0 && vues < 10000 && ventes > 0) return "PEPITE_CACHEE";
  if (clics > 50 && (ventes / clics) < 0.02) return "CLICS_SANS_VENTES";
  if (visites > 100 && clics > 0 && (clics / visites) < 0.05) return "VISITES_SANS_CLICS";
  return null;
}

/* ---------- Profil de vente ---------- */

function profilDeVente(scores) {
  const profils = [];
  if (scores.attention >= 55) profils.push("ATTRACTEUR");
  if (scores.attractionAcheteur >= 50) profils.push("ÉDUCATEUR");
  if (scores.connexion >= 55) profils.push("CONNECTEUR");
  if (scores.desir >= 60 && scores.conversion >= 50) profils.push("VENDEUR");
  if (profils.length === 0) profils.push("DÉBUTANT");
  return profils;
}

const CashEngineAPI = {
  analyserThread, calculerScores, scoreGlobal, indiceDeFuite, fuitePrioritaire, niveauScore,
  detecterCasParticulier, profilDeVente, paliersVues, ECHELLE_VUES,
  POIDS, FACILITE, LIBELLES, Dico, occ, clamp, empreinte,
};

if (typeof module !== "undefined") module.exports = CashEngineAPI;
if (typeof window !== "undefined") window.CashEngine = CashEngineAPI;
