/* ============================================================
   THREADYPRENEURS CASH SCANNER™ — Générateur de rapport
   Construit les 20 sections du diagnostic à partir des scores.
   Règle d'or : jamais de certitude affirmée, toujours une hypothèse
   argumentée par les données fournies.
   ============================================================ */

const TEMPLATES_FUITE = {
  attention: {
    titre: "ATTENTION",
    pourquoi: "Tes données suggèrent que ton contenu ne capte pas suffisamment l'attention des bonnes personnes avant même d'arriver au reste du parcours.",
    mecanisme: "Le cerveau ignore par défaut tout ce qui ne lui promet pas une information incomplète ou un contraste immédiat. Sans accroche, le reste de ton message n'est jamais lu.",
    correction: "Resserre tes premières lignes autour d'une tension concrète : un chiffre, une contradiction, une promesse d'information manquante.",
    arreter: "Arrête de commencer tes Threads par une généralité ou une mise en contexte.",
    commencer: "Commence chaque Thread par une phrase qui crée un manque d'information.",
    prochain: "Ne publie rien avant d'avoir retravaillé tes 3 prochaines accroches.",
    outil: "Générateur de Désir™ n'est pas la priorité ici — commence par un travail sur le Hook.",
    cibleId: "section-threads",
    boutonLabel: "Revoir mes accroches →",
  },
  attractionAcheteur: {
    titre: "QUALIFICATION",
    pourquoi: "Le signal le plus probable est que ton contenu attire une audience large, mais éloignée de ceux qui peuvent réellement acheter ton offre.",
    mecanisme: "Un contenu trop généraliste plaît à tout le monde et ne parle vraiment à personne. Ton audience grandit, mais sa proximité avec ton offre diminue.",
    correction: "Resserre tes sujets autour du problème précis que ton offre résout, même si cela réduit ta portée apparente.",
    arreter: "Arrête de parler à tout le monde pour plaire à tout le monde.",
    commencer: "Commence à nommer explicitement qui tu n'aides pas.",
    prochain: "Ne change rien à ton offre. Resserre d'abord qui tu adresses dans tes 5 prochains Threads.",
    outil: "Écart de Contenu™ t'aidera à voir ce que tu publies vraiment.",
    cibleId: "section-content-gap",
    boutonLabel: "Resserrer mon audience →",
  },
  connexion: {
    titre: "CONNEXION",
    pourquoi: "Ton audience comprend probablement ce que tu racontes, mais elle semble ne pas se sentir suffisamment comprise en retour.",
    mecanisme: "L'identification précède la confiance. Sans un miroir émotionnel, ton expertise reste une information parmi d'autres, jamais une raison de t'écouter toi plutôt qu'un autre.",
    correction: "Ajoute plus de vécu, de doute assumé, de détails concrets qui montrent que tu as traversé ce que ton audience traverse.",
    arreter: "Arrête de rester uniquement dans la posture experte.",
    commencer: "Commence à raconter un moment précis, daté, avec un ressenti physique.",
    prochain: "Ne publie pas de conseil aujourd'hui. Publie un souvenir.",
    outil: "Atelier de Réparation de Threads™ pour retravailler ton prochain post.",
    cibleId: "section-stop-start",
    boutonLabel: "Voir ce qui bloque ma connexion →",
  },
  desir: {
    titre: "DÉSIR",
    pourquoi: "Ton audience comprend probablement ton sujet et te fait confiance, mais ton contenu ne crée pas un écart suffisant entre \"c'est intéressant\" et \"j'en ai besoin\".",
    mecanisme: "Le cerveau agit sur l'émotion, pas sur l'information. Un bénéfice rationnel n'active jamais le même niveau de décision qu'une transformation désirée avec intensité.",
    correction: "Montre le contraste avant/après, rends visible le coût de l'inaction, fais projeter ton prospect dans la version de lui-même qui a déjà résolu le problème.",
    arreter: "Arrête de décrire ton offre uniquement par ses caractéristiques.",
    commencer: "Commence à décrire la vie de ton prospect si rien ne change, puis si tout change.",
    prochain: "Ne publie pas un nouveau Thread aujourd'hui. Réécris d'abord ta promesse.",
    outil: "Test de Résistance de la Promesse™ et Générateur de Désir™.",
    cibleId: "section-desir-gap",
    boutonLabel: "Réparer ma promesse →",
  },
  conviction: {
    titre: "CONVICTION",
    pourquoi: "Ton audience semble vouloir le résultat que tu proposes, mais elle ne semble pas encore convaincue que ton offre spécifique peut le lui apporter.",
    mecanisme: "Le désir sans preuve reste une envie prudente. Le cerveau a besoin de réduire son incertitude avant d'engager de l'argent.",
    correction: "Ajoute de la spécificité, un mécanisme nommé, des preuves concrètes, et traite tes objections avant qu'on te les pose.",
    arreter: "Arrête de laisser tes objections principales sans réponse publique.",
    commencer: "Commence à publier une preuve concrète, même petite, plutôt qu'une affirmation.",
    prochain: "Ne vends pas plus fort. Prouve davantage.",
    outil: "Extracteur d'Objections™.",
    cibleId: "section-objections",
    boutonLabel: "Renforcer mes preuves →",
  },
  offre: {
    titre: "OFFRE",
    pourquoi: "Le point de friction semble se situer dans l'offre elle-même : une promesse encore trop large ou une transformation difficile à se représenter.",
    mecanisme: "Une offre floue est difficile à désirer, même pour une audience qualifiée et convaincue par toi. Le cerveau n'achète pas un concept, il achète un résultat qu'il visualise.",
    correction: "Resserre la promesse autour d'un résultat unique, mesurable, et différencie-la clairement de ce qui existe déjà.",
    arreter: "Arrête de vouloir que ton offre convienne à tout le monde.",
    commencer: "Commence par une seule promesse, la plus spécifique possible.",
    prochain: "Ne touche à rien d'autre avant d'avoir clarifié ta promesse.",
    outil: "Autopsie de l'Offre™ et Test de Résistance de la Promesse™.",
    cibleId: "section-autopsie",
    boutonLabel: "Clarifier mon offre →",
  },
  conversion: {
    titre: "ACTION / CONVERSION",
    pourquoi: "Ton audience semble intéressée, mais quelque chose freine le passage à l'étape suivante concrète.",
    mecanisme: "Sans direction claire au bon moment, même un prospect convaincu remet sa décision à plus tard — et plus tard n'arrive jamais.",
    correction: "Clarifie ton appel à l'action, réduis la friction, et adapte-le au niveau de conscience réel de ton audience.",
    arreter: "Arrête de terminer tes Threads sans direction claire.",
    commencer: "Commence à indiquer une seule action possible, adaptée à la maturité du lecteur.",
    prochain: "Ne complique pas ton funnel. Simplifie ta prochaine étape.",
    outil: "Générateur d'Appels à l'Action™.",
    cibleId: "section-cta",
    boutonLabel: "Corriger mon appel à l'action →",
  },
};

const OBJECTIONS_CONNUES = [
  { cle: "prix", motifs: ["cher", "prix", "budget", "coûte"], apparente: "\"C'est trop cher.\"", reelle: "Le prix n'est pas le problème : la valeur perçue de la transformation n'a pas encore dépassé le prix affiché." },
  { cle: "autonomie", motifs: ["moi-même", "seul", "seule", "gratuit", "youtube"], apparente: "\"Je peux le faire moi-même.\"", reelle: "Ton prospect ne doute pas de la méthode. Il doute d'avoir le temps ou la discipline de l'appliquer seul." },
  { cle: "specificite", motifs: ["marchera pas", "pas pour moi", "different", "différent", "mon cas"], apparente: "\"Ça ne marchera pas pour moi.\"", reelle: "Il ne se reconnaît pas suffisamment dans tes exemples ou tes preuves. Le manque, c'est l'identification, pas la méthode." },
  { cle: "reflexion", motifs: ["réfléchir", "reflechir", "temps", "plus tard"], apparente: "\"Je dois réfléchir.\"", reelle: "Le désir n'a probablement pas encore dépassé le confort de l'inaction. Le coût de ne rien faire reste invisible." },
  { cle: "urgence", motifs: ["besoin maintenant", "pas urgent", "plus tard", "un jour"], apparente: "\"Je n'en ai pas besoin maintenant.\"", reelle: "Le problème n'est probablement pas encore ressenti comme suffisamment douloureux aujourd'hui." },
  { cle: "confiance", motifs: ["connais pas", "sais pas qui", "confiance"], apparente: "\"Je ne te connais pas suffisamment.\"", reelle: "La preuve sociale ou la crédibilité affichée n'a probablement pas encore atteint le seuil nécessaire." },
  { cle: "deja_essaye", motifs: ["déjà essayé", "deja essaye", "jamais marché"], apparente: "\"J'ai déjà essayé.\"", reelle: "Ton offre n'est probablement pas encore assez différenciée des tentatives précédentes de ton prospect." },
];

function mapperObjection(texteObjection) {
  const t = (texteObjection || "").toLowerCase();
  for (const o of OBJECTIONS_CONNUES) {
    if (o.motifs.some(m => t.includes(m))) return o;
  }
  return { apparente: texteObjection ? `"${texteObjection}"` : "Objection non précisée.", reelle: "Sans plus de détail, le signal le plus probable reste la conviction : la preuve disponible n'a peut-être pas encore atteint le seuil nécessaire." };
}

const ANGLES_DESIR = [
  { angle: "Argent", desirActive: "Gain financier", pourquoi: "Le cerveau réagit fortement à une perspective de gain ou de perte concrète en euros." },
  { angle: "Temps", desirActive: "Liberté de temps", pourquoi: "Le temps perdu est une des douleurs les plus universelles chez les indépendants." },
  { angle: "Liberté", desirActive: "Autonomie", pourquoi: "La liberté de décider sans dépendre d'un patron ou d'un client active un désir d'indépendance profond." },
  { angle: "Statut", desirActive: "Reconnaissance sociale", pourquoi: "Être perçu différemment par les autres est un moteur puissant, rarement avoué." },
  { angle: "Sécurité", desirActive: "Stabilité", pourquoi: "La peur de l'instabilité financière pousse à l'action plus vite que l'envie de gagner davantage." },
  { angle: "Confort", desirActive: "Simplicité", pourquoi: "Réduire l'effort perçu rend une solution plus désirable qu'une solution simplement plus performante." },
  { angle: "Contrôle", desirActive: "Reprise de contrôle", pourquoi: "Sentir qu'on reprend la main sur sa situation réduit l'anxiété et augmente la motivation à agir." },
  { angle: "Reconnaissance", desirActive: "Validation", pourquoi: "Être vu et validé par ses pairs renforce l'engagement envers une décision." },
  { angle: "Transformation", desirActive: "Identité future", pourquoi: "Se projeter dans une nouvelle version de soi-même est plus motivant que la simple description d'un résultat." },
  { angle: "Évitement de douleur", desirActive: "Fuite de la situation actuelle", pourquoi: "Éviter une perte ou une douleur motive généralement plus fort que la perspective d'un gain équivalent." },
];

function genererAngleThread(angle, business) {
  const offre = business.offre || "ton offre";
  const cible = business.cible || "ton audience";
  return `Ce que ${cible} ne dit pas toujours à voix haute : ${angle.desirActive.toLowerCase()} pèse plus lourd que la raison qu'on donne en façade. ${offre} n'est jamais qu'un moyen d'accéder à ça.`;
}

function repartitionClassifications(analysesThreads) {
  const total = analysesThreads.length || 1;
  const compte = {};
  analysesThreads.forEach(a => { compte[a.classification] = (compte[a.classification] || 0) + 1; });
  const repartition = {};
  ["ATTIRER", "RELIER", "ÉDUQUER", "DÉSIRER", "CONVERTIR", "AUTORITÉ"].forEach(c => {
    repartition[c] = Math.round(((compte[c] || 0) / total) * 100);
  });
  return repartition;
}

function genererRapport(state, scores) {
  const fuites = window.CashEngine.indiceDeFuite(scores);
  const fuitePrincipale = fuites[0];
  const deuxiemeFuite = fuites[1];
  const global = window.CashEngine.scoreGlobal(scores);
  const casParticulier = window.CashEngine.detecterCasParticulier(state);
  const profils = window.CashEngine.profilDeVente(scores);
  const repartition = repartitionClassifications(scores.analysesThreads);
  const tplPrincipale = TEMPLATES_FUITE[fuitePrincipale.cle];
  const tplSecondaire = TEMPLATES_FUITE[deuxiemeFuite.cle];

  const objectionsMappees = (state.offre.objections || []).filter(o => o && o.trim()).map(mapperObjection);

  const gapDesir = Math.max(0, 70 - scores.desir);

  // Autopsie de l'offre — 6 dimensions
  const nDiff = window.CashEngine.occ(state.offre.differenciation || "", window.CashEngine.Dico.differenciation);
  const autopsie = {
    promesse: window.CashEngine.clamp(((state.offre.promesse || "").length / 120) * 100, 10, 95),
    specificite: /\d/.test(state.offre.promesse || "") || /\d/.test(state.business.resultat || "") ? 68 : 32,
    desir: scores.desir,
    differenciation: window.CashEngine.clamp(nDiff * 35 + 20, 15, 90),
    valeurPercue: window.CashEngine.clamp(scores.offre * 0.6 + scores.conviction * 0.4),
    confiance: scores.conviction,
  };

  const plan7Jours = construirePlan7Jours(fuitePrincipale, deuxiemeFuite, state);
  const threadsPrets = construireThreadsPrets(fuitePrincipale, state);
  const ctaParNiveau = construireCTA(state);

  return {
    global,
    niveauGlobal: window.CashEngine.niveauScore(global),
    scores,
    fuites,
    fuitePrincipale,
    deuxiemeFuite,
    tplPrincipale,
    tplSecondaire,
    casParticulier,
    profils,
    repartition,
    objectionsMappees,
    gapDesir,
    autopsie,
    plan7Jours,
    threadsPrets,
    ctaParNiveau,
    diagnosticExecutif: construireDiagnosticExecutif(state, scores, fuitePrincipale, profils, global),
    positionnement: construirePositionnement(state),
    audienceAnalyse: construireAnalyseAudience(state, casParticulier),
    contentGap: construireContentGap(repartition),
    stealPhrases: construireStealPhrases(fuitePrincipale, state),
  };
}

function construireDiagnosticExecutif(state, scores, fuitePrincipale, profils, global) {
  const tpl = TEMPLATES_FUITE[fuitePrincipale.cle];
  return [
    `Ton Cash Score est de ${global}/100, mais ce chiffre est secondaire.`,
    `Ce qui compte, c'est où tu perds ton prospect entre l'attention qu'il te donne et l'achat qu'il ne fait pas encore.`,
    `Ton profil actuel semble être : ${profils.join(" + ")}.`,
    tpl.pourquoi,
    `Ton prospect peut donc penser "c'est intéressant", sans jamais arriver jusqu'à "je veux ça".`,
  ];
}

function construirePositionnement(state) {
  const overlap = window.CashEngine.occ(state.business.cible || "", (state.business.offre || "").toLowerCase().split(/\s+/));
  const coherent = (state.business.cible || "").length > 10 && (state.business.resultat || "").length > 10;
  return coherent
    ? "Ta cible et le résultat promis sont formulés de façon suffisamment concrète pour être exploitables — le travail se situe probablement plus loin dans le parcours."
    : "Ta cible ou ton résultat restent formulés de façon assez large. Cela peut diluer l'impact de tout ce qui suit, même si ce n'est probablement pas ta fuite principale.";
}

function construireAnalyseAudience(state, casParticulier) {
  const a = state.audience;
  const lignes = [];
  lignes.push(`${a.abonnes || 0} abonnés, environ ${a.vuesMois || 0} vues/mois, ${a.ventesMois || 0} vente(s)/mois.`);
  if (casParticulier === "VANITY_ALERT") {
    lignes.push("🚨 ALERTE VANITÉ — Tes vues prouvent que tu sais attirer l'attention. Elles ne prouvent pas que tu sais créer de la demande.");
  } else if (casParticulier === "ZERO_VENTE") {
    lignes.push("MODE ZERO VENTE ACTIVÉ — Zéro vente ne signifie pas automatiquement zéro demande. Le premier travail est de savoir si le problème vient de la demande, de l'offre ou de la conversion.");
  } else if (casParticulier === "PEPITE_CACHEE") {
    lignes.push("💎 PÉPITE CACHÉE — Ton système commercial semble fonctionner malgré une faible visibilité. Le levier prioritaire est probablement l'acquisition, pas l'offre.");
  } else if (casParticulier === "CLICS_SANS_VENTES") {
    lignes.push("Ton contenu arrive à faire cliquer. Le point de friction apparaît probablement après le clic (offre, confiance, friction de page).");
  } else if (casParticulier === "VISITES_SANS_CLICS") {
    lignes.push("Beaucoup de visites de profil, peu de clics vers ton offre. Le signal pointe vers ton profil, ton positionnement ou ton appel à l'action.");
  }
  return lignes;
}

function construireContentGap(repartition) {
  const trop = [], pasAssez = [];
  for (const cat in repartition) {
    if (repartition[cat] >= 30) trop.push(cat);
    if (repartition[cat] === 0) pasAssez.push(cat);
  }
  return { trop, pasAssez, repartition };
}

function construirePlan7Jours(principale, secondaire, state) {
  const jours = [
    { jour: 1, action: `Corrige ta promesse (${principale.libelle.toLowerCase()} en priorité).`, detail: TEMPLATES_FUITE[principale.cle].correction },
    { jour: 2, action: "Publie un contenu de reconnaissance du problème.", detail: "Nomme précisément la douleur que vit ton prospect avant de parler de solution." },
    { jour: 3, action: "Publie un contenu de désir.", detail: "Montre le contraste avant/après et rends la transformation désirable." },
    { jour: 4, action: "Traite une objection.", detail: "Prends l'objection la plus fréquente et réponds-y publiquement, sans qu'on te la pose." },
    { jour: 5, action: "Publie une preuve.", detail: "Un résultat, un témoignage ou une donnée concrète, même modeste." },
    { jour: 6, action: "Montre le coût de l'inaction.", detail: "Rends visible ce qu'il se passe si rien ne change dans 6 mois." },
    { jour: 7, action: "Fais une offre claire.", detail: "Une seule action possible, adaptée au niveau de conscience de ton audience." },
  ];
  return jours;
}

function construireThreadsPrets(principale, state) {
  const cible = state.business.cible || "ton audience";
  const offre = state.business.offre || "ton offre";
  const resultat = state.business.resultat || "le résultat que tu proposes";
  const base = [
    `Le problème n'est probablement pas ${cible.split(" ").slice(0,3).join(" ")}.\nLe vrai problème, c'est ce qui se passe si rien ne change dans 6 mois.\n\n${TEMPLATES_FUITE[principale.cle].mecanisme}`,
    `Tu peux continuer comme avant.\nMais voilà ce que ça te coûte, concrètement.\n\n${TEMPLATES_FUITE[principale.cle].correction}`,
    `${resultat} n'arrive jamais par accident.\nLa plupart des gens cherchent la bonne méthode, alors qu'ils devraient d'abord régler ${TEMPLATES_FUITE[principale.cle].titre.toLowerCase()}.\n\nC'est exactement ce que fait ${offre}.`,
  ];
  return base;
}

function construireCTA(state) {
  return [
    { niveau: 1, nom: "Curieux", type: "CTA découverte", exemple: "Dis-moi en commentaire si ça te parle." },
    { niveau: 2, nom: "Conscient", type: "CTA réflexion", exemple: "Pose-toi la question honnêtement cette semaine." },
    { niveau: 3, nom: "Problème reconnu", type: "CTA ressource", exemple: "Je t'ai préparé une ressource gratuite sur ce sujet, lien en bio." },
    { niveau: 4, nom: "Désir actif", type: "CTA offre", exemple: `Si tu veux ${(state.business.resultat || "ce résultat")}, regarde ce que propose ${(state.business.offre || "mon offre")}.` },
    { niveau: 5, nom: "Prêt à acheter", type: "CTA direct", exemple: "Réserve ta place maintenant, lien ci-dessous 👇🏼" },
  ];
}

function construireStealPhrases(principale, state) {
  const titre = TEMPLATES_FUITE[principale.cle].titre.toLowerCase();
  return [
    `Le problème n'est pas X. Le vrai problème est ${titre}.`,
    `Tu peux continuer à faire comme avant. Mais voilà ce que ça te coûte.`,
    `La plupart des gens cherchent la méthode parfaite, alors qu'ils devraient d'abord régler leur ${titre}.`,
    `Ce n'est pas que tu n'es pas assez visible. C'est que ton audience ne désire pas encore assez ce que tu proposes.`,
    `Ton contenu n'est pas mauvais. C'est presque pire : il est suffisamment bon pour créer de l'attention, pas encore assez pour créer de l'envie.`,
  ];
}

const PROGRAMMES = {
  attention: {
    nom: "L'INFILTRATION ZEIGARNIK™",
    accroche: "Ta fuite se situe avant même la lecture : c'est le programme qui t'apprend à ouvrir des boucles que le cerveau ne peut pas laisser fermées.",
  },
  attractionAcheteur: {
    nom: "LE CODE SECTAIRE™",
    accroche: "Ton audience est trop large pour être qualifiée : ce programme t'apprend à construire un cercle qui s'auto-sélectionne autour de ton offre.",
  },
  connexion: {
    nom: "LE CODE SECTAIRE™",
    accroche: "Ce qui manque, c'est le sentiment d'appartenance : ce programme t'apprend à transformer ton audience en cercle qui se reconnaît en toi.",
  },
  desir: {
    nom: "INCEPTION GAME™",
    accroche: "Ta fuite est la plus rentable à réparer : ce programme t'apprend à implanter un désir avant même de présenter ton offre.",
  },
  conviction: {
    nom: "PSYCHÉ CAPITAL™",
    accroche: "Le désir existe déjà, la preuve manque : ce programme t'apprend à construire un capital de crédibilité qui fait taire le doute.",
  },
  offre: {
    nom: "INGÉNIERIE DE L'EMPRISE™",
    accroche: "Le problème est structurel : ce programme t'apprend à construire une offre dont on a du mal à se détacher.",
  },
  conversion: {
    nom: "VIREMENT NOBLE™",
    accroche: "L'intérêt existe, l'action se dérobe : ce programme t'apprend à rendre le passage à l'achat évident et légitime.",
  },
};

if (typeof window !== "undefined") {
  window.CashRapport = { genererRapport, ANGLES_DESIR, genererAngleThread, TEMPLATES_FUITE, PROGRAMMES };
}
