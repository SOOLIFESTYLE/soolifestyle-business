/* ============================================================
   THREADYPRENEURS CASH SCANNER™ — Moteur de diagnostic
   Analyse psychologique et commerciale du parcours
   ATTENTION → INTÉRÊT → CONFIANCE → DÉSIR → CONVICTION → ACTION → ACHAT
   ============================================================ */

const Dico = {
  desir: ["enfin","libre","libéré","libérée","transformation","rêve","rêves","peur","risque","honte","fierté",
    "gagner","perdre","argent","temps","liberté","sécurité","contrôle","reconnaissance","statut","confort",
    "envie","besoin","obsédé","obsession","urgent","jamais","toujours","imagine","imagines","imaginer",
    "avant","après","fini","finies","assez","marre","épuisé","épuisée","soulagement","paix"],
  preuve: ["témoignage","témoignages","client","clients","résultat","résultats","étude de cas","%","€","euros",
    "preuve","preuves","avis","capture","screenshot","chiffre","chiffres","données","statistique"],
  urgence: ["aujourd'hui","maintenant","vite","dernier","dernière","bientôt","limité","limitée","places",
    "expire","demain","ce soir","dépêche","plus que","dernières"],
  cta: ["clique","cliquez","réserve","réserves","achète","achètes","télécharge","télécharges","inscris",
    "inscris-toi","rejoins","rejoins-moi","commande","commandes","découvre","découvres","lien en bio",
    "lien ci-dessous","👇","👇🏼","dm","écris-moi","réponds"],
  connexion: ["tu ","toi","ton ","ta ","tes ","j'ai eu peur","j'ai douté","je me suis senti","je me suis sentie",
    "vulnérab","j'avoue","honnêtement","je te confie","entre nous","je te promets","je sais ce que c'est",
    "moi aussi","comme toi","tu connais","tu vis"],
  education: ["voici comment","étape","étapes","méthode","astuce","astuces","technique","stratégie","process",
    "framework","conseil","conseils","comment faire","tuto","règle","règles"],
  autorite: ["des années","expérience","expert","experte","clients accompagnés","résultats obtenus","depuis",
    "formé","formée","certifié","certifiée","des centaines","des milliers","j'ai testé","j'ai construit"],
  differenciation: ["contrairement","pas comme","seul","seule","unique","personne ne","au contraire",
    "à l'inverse","different","différent","différente"],
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

function densite(n, longueur) {
  // occurrences ramenées à une base de 100 caractères, plafonné
  if (!longueur) return 0;
  return Math.min(1, (n / (longueur / 100)) / 4);
}

function motsCommuns(a, b) {
  const wa = new Set((a || "").toLowerCase().split(/[^a-zàâäéèêëïîôöùûüç0-9']+/).filter(w => w.length > 3));
  const wb = new Set((b || "").toLowerCase().split(/[^a-zàâäéèêëïîôöùûüç0-9']+/).filter(w => w.length > 3));
  if (wa.size === 0 || wb.size === 0) return 0;
  let commun = 0;
  wa.forEach(w => { if (wb.has(w)) commun++; });
  return commun / Math.min(wa.size, wb.size);
}

/* ---------- Analyse d'un Thread ---------- */

function analyserThread(thread, ctx) {
  const texte = thread.texte || "";
  const longueur = texte.length || 1;
  const premiereLigne = texte.split("\n")[0] || texte.slice(0, 90);

  // HOOK /20
  let hook = 6;
  if (/\d/.test(premiereLigne)) hook += 3;
  if (/\?/.test(premiereLigne)) hook += 3;
  if (/\.\.\./.test(premiereLigne)) hook += 2;
  if (/\b(mais|pourtant|jamais|personne)\b/i.test(premiereLigne)) hook += 3;
  const lp = premiereLigne.length;
  if (lp >= 20 && lp <= 95) hook += 3;
  hook = Math.min(20, hook);

  // PERTINENCE CIBLE /20
  const overlapCible = motsCommuns(texte, ctx.cible);
  const overlapOffre = motsCommuns(texte, (ctx.resultat || "") + " " + (ctx.offre || ""));
  let pertinence = Math.round((overlapCible * 0.5 + overlapOffre * 0.5) * 20);
  pertinence = clamp(pertinence, 4, 20);

  // CONNEXION /20
  const nConnexion = occ(texte, Dico.connexion);
  let connexion = Math.round(4 + densite(nConnexion, longueur) * 16);
  connexion = clamp(connexion, 0, 20);

  // DÉSIR /20
  const nDesir = occ(texte, Dico.desir);
  const contrasteAvantApres = /avant/i.test(texte) && /après/i.test(texte);
  let desir = Math.round(3 + densite(nDesir, longueur) * 14 + (contrasteAvantApres ? 3 : 0));
  desir = clamp(desir, 0, 20);

  // CONVERSION /20
  const nCta = occ(texte, Dico.cta);
  const nUrgence = occ(texte, Dico.urgence);
  let conversion = Math.round(2 + Math.min(1, nCta) * 10 + Math.min(1, nCta > 1 ? 1 : 0) * 4 + densite(nUrgence, longueur) * 4);
  conversion = clamp(conversion, 0, 20);

  const total = hook + pertinence + connexion + desir + conversion;

  // Classification dominante
  const nEducation = occ(texte, Dico.education);
  const nAutorite = occ(texte, Dico.autorite);
  const scoresCategories = {
    ATTIRER: hook,
    RELIER: connexion,
    ÉDUQUER: Math.round(densite(nEducation, longueur) * 20) + 4,
    DÉSIRER: desir,
    CONVERTIR: conversion,
    AUTORITÉ: Math.round(densite(nAutorite, longueur) * 20) + 2,
  };
  let classification = "ATTIRER";
  let max = -1;
  for (const cat in scoresCategories) {
    if (scoresCategories[cat] > max) { max = scoresCategories[cat]; classification = cat; }
  }

  return { hook, pertinence, connexion, desir, conversion, total, classification };
}

/* ---------- Calcul des 7 scores ---------- */

function mapRatio(valeur, seuilBas, seuilHaut) {
  if (seuilHaut === seuilBas) return 50;
  const r = (valeur - seuilBas) / (seuilHaut - seuilBas);
  return clamp(r * 100);
}

function calculerScores(state) {
  const { business, audience, offre } = state;
  const threads = state.threads.filter(t => t.texte && t.texte.trim().length > 0);
  const ctx = { cible: business.cible, resultat: business.resultat, offre: business.offre };

  const analysesThreads = threads.map(t => analyserThread(t, ctx));
  const moy = (arr) => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 10;

  const avgHook = moy(analysesThreads.map(a => a.hook));
  const avgPertinence = moy(analysesThreads.map(a => a.pertinence));
  const avgConnexion = moy(analysesThreads.map(a => a.connexion));
  const avgDesirThread = moy(analysesThreads.map(a => a.desir));
  const avgConversionThread = moy(analysesThreads.map(a => a.conversion));

  // ATTENTION
  const tauxVuePourAbonne = audience.abonnes ? (audience.vuesMois / audience.abonnes) : 1;
  const reachScore = mapRatio(tauxVuePourAbonne, 0.3, 4);
  const attention = clamp(avgHook * 5 * 0.6 + reachScore * 0.4);

  // ATTRACTION ACHETEUR (Buyer Attract)
  const tauxVisiteProfil = audience.vuesMois ? (audience.visitesProfil / audience.vuesMois) : 0;
  const tauxClicOffre = audience.visitesProfil ? (audience.clicsOffre / audience.visitesProfil) : 0;
  const visiteScore = mapRatio(tauxVisiteProfil, 0.01, 0.15);
  const clicScore = mapRatio(tauxClicOffre, 0.02, 0.3);
  const attractionAcheteur = clamp(avgPertinence * 5 * 0.4 + visiteScore * 0.3 + clicScore * 0.3);

  // CONNEXION
  const connexionScore = clamp(avgConnexion * 5);

  // DÉSIR
  const specifCoutInaction = (offre.coutInaction || "").length > 40 ? 15 : 0;
  const specifUrgence = (offre.urgence || "").length > 30 ? 10 : 0;
  const desirScore = clamp(avgDesirThread * 4 + specifCoutInaction + specifUrgence);

  // CONVICTION
  const nbPreuves = (offre.preuves || []).filter(p => p !== "aucune").length;
  const preuveScore = mapRatio(nbPreuves, 0, 5);
  const objectionsRemplies = (offre.objections || []).filter(o => o && o.trim().length > 3).length;
  const objectionScore = mapRatio(objectionsRemplies, 0, 3);
  const specificitePromesse = /\d/.test(offre.promesse || "") ? 20 : 0;
  const convictionScore = clamp(preuveScore * 0.45 + objectionScore * 0.35 + specificitePromesse);

  // OFFRE
  const longueurPromesse = (offre.promesse || "").length;
  const clartePromesse = mapRatio(longueurPromesse, 15, 120);
  const diffCount = occ(offre.differenciation || "", Dico.differenciation);
  const diffScore = mapRatio(diffCount, 0, 2);
  const resultatConcret = /\d/.test(business.resultat || "") ? 20 : 0;
  const offreScore = clamp(clartePromesse * 0.4 + diffScore * 0.35 + resultatConcret);

  // CONVERSION
  const tauxConversionVentes = audience.clicsOffre ? (audience.ventesMois / audience.clicsOffre) : (audience.visitesProfil ? audience.ventesMois / Math.max(1, audience.visitesProfil) : 0);
  const conversionRatioScore = mapRatio(tauxConversionVentes, 0, 0.15);
  const conversionScore = clamp(avgConversionThread * 4 + conversionRatioScore * 0.2 * 5);

  return {
    attention,
    attractionAcheteur,
    connexion: connexionScore,
    desir: desirScore,
    conviction: convictionScore,
    offre: offreScore,
    conversion: conversionScore,
    analysesThreads,
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
  conversion: "ACTION / CONVERSION",
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
    const score = clamp(gravite * 0.45 + impact * 0.35 + facilite * 0.20);
    fuites.push({ cle: k, libelle: LIBELLES[k], gravite, impact, facilite, score, scoreBrut: scores[k] });
  }
  fuites.sort((a, b) => b.score - a.score);
  return fuites;
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
  const { audience } = state;
  const abonnes = audience.abonnes || 0;
  const vuesMois = audience.vuesMois || 0;
  const ventesMois = audience.ventesMois || 0;
  const visitesProfil = audience.visitesProfil || 0;
  const clicsOffre = audience.clicsOffre || 0;

  if (abonnes > 500 && ventesMois === 0) {
    if (vuesMois > abonnes * 5 && vuesMois > 2000) return "VANITY_ALERT";
    return "ZERO_VENTE";
  }
  if (vuesMois > 0 && vuesMois < 1000 && ventesMois > 0) return "PEPITE_CACHEE";
  if (clicsOffre > 50 && ventesMois > 0 && (ventesMois / clicsOffre) < 0.02) return "CLICS_SANS_VENTES";
  if (visitesProfil > 100 && clicsOffre > 0 && (clicsOffre / visitesProfil) < 0.05) return "VISITES_SANS_CLICS";
  return null;
}

/* ---------- Profil de vente ---------- */

function profilDeVente(scores) {
  const profils = [];
  if (scores.attention >= 55) profils.push("ATTRACTEUR");
  if (scores.connexion >= 55 && scores.attractionAcheteur >= 40) profils.push("ÉDUCATEUR");
  if (scores.connexion >= 60) profils.push("CONNECTEUR");
  if (scores.desir >= 60 && scores.conversion >= 55) profils.push("VENDEUR");
  if (profils.length === 0) profils.push("EXPLORATEUR");
  return profils;
}

const CashEngineAPI = {
  analyserThread, calculerScores, scoreGlobal, indiceDeFuite, niveauScore,
  detecterCasParticulier, profilDeVente, POIDS, FACILITE, LIBELLES, Dico, occ, clamp,
};

if (typeof module !== "undefined") {
  module.exports = CashEngineAPI;
}
if (typeof window !== "undefined") {
  window.CashEngine = CashEngineAPI;
}
