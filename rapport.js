/* ============================================================
   THREADYPRENEURS CASH SCANNER™ — Ce que le scanner te dit
   Ton style : une idée par ligne. Pas de préambule. Pas de
   phrase lissée. On parle comme en terrasse, à voix basse.
   ============================================================ */

function pioche(liste, graine) {
  return liste[graine % liste.length];
}

function nombreFr(n) {
  return (n || 0).toLocaleString("fr-FR");
}

/* ============================================================
   LES 7 FUITES
   Plusieurs versions de chaque constat : deux business
   différents ne doivent pas lire le même diagnostic.
   ============================================================ */

const FUITES = {
  attention: {
    titre: "ATTENTION",
    constat: [
      `On ne te lit pas.\nCe n'est pas pareil que « on ne t'aime pas ».\n\nTes trois premiers mots ne promettent rien.\nDonc le pouce continue.\nEt tout le travail derrière, personne ne le verra jamais.`,
      `Ton problème arrive avant tout le reste.\nAvant l'offre. Avant le désir. Avant le prix.\n\nIl arrive à la première ligne.\nCelle que tu écris en dernier, vite fait, pour « lancer » le post.\nC'est pourtant la seule qui décide si le reste existe.`,
      `Tu publies dans le vide.\nPas parce que ton contenu est mauvais…\nParce qu'il commence trop lentement.\n\nLe temps que tu poses le contexte, on est déjà trois posts plus bas.`,
    ],
    mecanisme: [
      `Le cerveau fonctionne comme un videur.\nIl ne laisse entrer que ce qui crée un manque.\nUne info incomplète. Un chiffre qui dérange. Une contradiction.\n\nTout le reste : dehors.`,
      `Ce qui attire l'attention, ce n'est jamais la qualité.\nC'est l'écart.\nEntre ce qu'on croit savoir et ce que tu viens de dire.\n\nPas d'écart, pas d'arrêt.`,
    ],
    correction: `Écris ta première ligne en dernier.\nEt teste-la seule, sans le reste.\n\nSi elle ne tient pas debout toute seule, elle ne tiendra personne.`,
    arreter: [`Arrête de commencer par le contexte. Personne ne t'a demandé l'introduction.`,
              `Arrête les premières lignes qui expliquent. Commence par ce qui dérange.`],
    commencer: [`Commence par la phrase que tu dirais à voix basse, en te penchant vers quelqu'un.`,
                `Commence par un chiffre que tu n'as dit à personne.`],
    prochain: `Ne publie pas aujourd'hui.\nReprends tes 5 derniers posts, garde uniquement la première ligne de chacun.\nLis-les à la suite.\n\nTu vas voir le problème tout seul.`,
  },

  attractionAcheteur: {
    titre: "QUALIFICATION",
    constat: [
      `Tu remplis la salle.\nAvec les mauvaises personnes.\n\nDes gens qui aiment ce que tu dis, qui te suivent, qui commentent…\net qui n'achèteront jamais parce que ce n'est pas leur problème.\n\nTon audience grossit. Ta proximité avec l'argent, elle, diminue.`,
      `Ton contenu plaît trop.\nC'est un symptôme, pas un compliment.\n\nCe qui plaît à tout le monde n'appartient à personne.\nEt on n'achète qu'à quelqu'un qui semble parler de nous, précisément.`,
      `Il y a un décalage.\nEntre les sujets qui te font des vues…\net le problème que ton offre règle.\n\nTu nourris une audience. Ce n'est juste pas celle qui sort la carte.`,
    ],
    mecanisme: [
      `Quand tu parles large, chacun se dit « intéressant ».\nQuand tu parles précis, un seul se dit « c'est moi ».\n\nLe premier te like. Le second te paye.`,
      `On n'achète pas à celui qui a raison.\nOn achète à celui qui semble avoir vécu exactement notre situation.\nLa précision, c'est ça : une preuve d'appartenance.`,
    ],
    correction: `Resserre. Même si ça fait mal aux vues.\n\nParle d'un problème tellement précis que ceux à qui ça ne s'adresse pas décrochent.\nC'est le but.`,
    arreter: [`Arrête de viser large pour ne perdre personne. Tu perds les seuls qui comptent.`,
              `Arrête de mesurer un post aux vues. Mesure-le aux bonnes personnes qu'il attire.`],
    commencer: [`Commence à dire qui tu n'aides pas. À voix haute. Dans un post.`,
                `Commence tes posts par la situation précise de celui que tu veux, pas par le sujet.`],
    prochain: `Écris une phrase : « Ce truc ne sert à rien si tu… »\nEt publie-la.\n\nTu vas perdre des abonnés.\nCe sont exactement ceux qui faussaient tes chiffres.`,
  },

  connexion: {
    titre: "CONNEXION",
    constat: [
      `On te comprend.\nPersonne ne se sent compris.\n\nNuance énorme.\n\nTu donnes des informations justes, propres, utiles.\nEt personne ne se dit « elle parle de moi, là ».`,
      `Ton contenu est impeccable.\nC'est peut-être le problème.\n\nPas une hésitation, pas un doute, pas une fois où tu t'es planté.\nOn admire ça. On ne s'y attache pas.`,
      `Il manque le corps.\nLes détails. L'heure qu'il était. Ce que tu ressentais dans le ventre.\n\nSans ça, tu es une source d'information.\nIl y en a des milliers.`,
    ],
    mecanisme: [
      `L'identification passe avant la confiance.\nEt la confiance passe avant l'argent.\n\nSi on ne se reconnaît pas en toi, ton expertise reste un article de plus.`,
      `On ne s'attache pas à la compétence.\nOn s'attache à la faille.\n\nCelui qui n'a jamais raté quoi que ce soit n'a rien à nous apprendre sur comment s'en sortir.`,
    ],
    correction: `Raconte un moment précis. Avec l'heure.\nCe que tu as vu, ce que tu as eu envie de faire, ce que tu n'as pas dit.\n\nPas une leçon. Une scène.`,
    arreter: [`Arrête la posture. Personne n'achète à une statue.`,
              `Arrête les souvenirs flous. « Il y a quelques années » ne touche personne. « Un mardi de novembre, 23h12 » si.`],
    commencer: [`Commence à raconter ce que tu as raté, avant de raconter ce que tu sais.`,
                `Commence à écrire comme tu parlerais à une seule personne, pas à ton audience.`],
    prochain: `Publie un souvenir aujourd'hui. Pas un conseil.\n\nDate, heure, un objet, une phrase que quelqu'un t'a dite.\nZéro enseignement à la fin. Laisse-le nu.`,
  },

  desir: {
    titre: "DÉSIR",
    constat: [
      `Ton contenu n'est pas mauvais.\nC'est presque pire.\n\nIl est assez bon pour qu'on te lise.\nPas assez pour qu'on ait envie.\n\nEntre « c'est intéressant » et « il me le faut », il y a un gouffre.\nTu ne le fais pas traverser.`,
      `Tu expliques très bien.\nTrop bien, peut-être.\n\nÀ force de tout rendre clair, il ne reste plus rien à vouloir.\nL'information rassure. Elle ne fait pas acheter.`,
      `Tu nourris ton audience.\nTu ne lui donnes jamais faim.\n\nElle repart de chez toi rassasiée, contente, reconnaissante…\net sans aucune raison de sortir sa carte aujourd'hui.`,
    ],
    mecanisme: [
      `Personne n'a jamais payé pour une information.\nOn paye pour une sensation.\n\nCelle d'être déjà de l'autre côté du problème.`,
      `Le désir, ce n'est pas aimer ton offre.\nC'est ne plus supporter la situation actuelle.\n\nTant que le présent reste confortable, aucune offre ne se vend, même excellente.`,
      `Ce qui déclenche l'achat, c'est l'écart.\nEntre là où on est, et là où on se voit.\n\nSi tu ne montres jamais les deux, il n'y a pas d'écart. Donc pas de mouvement.`,
    ],
    correction: `Arrête de parler de ce que tu fais.\nParle de ce qu'il vit, lui, un mardi à 23h, quand il refresh ses stats pour la quatrième fois.\n\nPuis montre-lui le même mardi, six mois plus tard.\nL'écart entre les deux, c'est ton chiffre d'affaires.`,
    arreter: [`Arrête de décrire ton offre. Décris sa vie après.`,
              `Arrête de rassurer. Le confort ne fait acheter personne.`],
    commencer: [`Commence à montrer ce que ça coûte de ne rien faire. Avec un chiffre.`,
                `Commence à écrire la scène d'après. Précise. Banale. Réelle.`],
    prochain: `Ne publie pas un nouveau Thread aujourd'hui.\n\nÉcris deux scènes : sa vie maintenant, sa vie après.\nSi tu n'arrives pas à les écrire, ton prospect n'arrive pas à les imaginer.\nEt c'est exactement pour ça qu'il n'achète pas.`,
  },

  conviction: {
    titre: "CONVICTION",
    constat: [
      `On veut le résultat.\nOn doute que ce soit toi qui le livre.\n\nC'est une bonne nouvelle, au fond : le plus dur est fait.\nIl te manque juste des preuves, pas du talent.`,
      `Ta promesse est peut-être trop belle.\nEt dans un fil rempli de promesses trop belles, ça se retourne contre toi.\n\nPlus tu promets gros sans montrer, plus on recule.`,
      `Il n'y a pas de mécanisme.\nOn ne sait pas pourquoi ça marche chez toi et pas ailleurs.\n\nDu coup, on te range avec tous les autres.\nEt on attend. Éternellement.`,
    ],
    mecanisme: [
      `Avant de sortir de l'argent, le cerveau ne cherche pas des raisons d'y aller.\nIl cherche des raisons de ne pas se planter.\n\nChaque preuve enlève une de ces raisons.`,
      `Le doute ne se combat pas avec de l'enthousiasme.\nIl se combat avec du détail.\n\nUn chiffre précis passe mieux qu'un superlatif.`,
    ],
    correction: `Sors une preuve. N'importe laquelle.\nUn petit résultat, un message client, une capture, une durée exacte.\n\nEt nomme ton mécanisme. Donne-lui un nom.\nCe qui a un nom existe.`,
    arreter: [`Arrête de laisser tes objections dans le silence. Elles ne disparaissent pas, elles travaillent contre toi.`,
              `Arrête les promesses rondes. Les chiffres bancals sont plus crédibles que les chiffres ronds.`],
    commencer: [`Commence à publier le petit résultat vrai plutôt que le grand résultat vague.`,
                `Commence à répondre à l'objection avant qu'on te la pose.`],
    prochain: `Prends l'objection que tu redoutes le plus.\nCelle qui te fait mal parce qu'elle est un peu vraie.\n\nÉcris un post dessus. Aujourd'hui.\nDonne-lui raison, puis montre ce qu'elle rate.`,
  },

  offre: {
    titre: "OFFRE",
    constat: [
      `Le problème n'est pas dans tes posts.\nIl est dans ce que tu vends.\n\nTa promesse reste floue. On ne voit pas le résultat.\nEt on n'achète pas ce qu'on n'arrive pas à se représenter.`,
      `Ton offre veut plaire à trop de monde.\nDu coup elle n'attrape personne.\n\nUne offre large rassure celui qui la vend.\nElle angoisse celui qui doit l'acheter.`,
      `On ne comprend pas ce qui change après.\nNi en combien de temps. Ni pour qui.\n\nTant que ces trois trous sont là, même une audience parfaite ne convertira pas.`,
    ],
    mecanisme: [
      `Le cerveau n'achète pas un concept.\nIl achète une image.\n\nSi ta promesse ne produit pas d'image dans sa tête en trois secondes, elle ne produit pas de vente.`,
      `La différenciation n'est pas un luxe de marketeur.\nC'est ce qui permet de te comparer à rien.\n\nSans elle, on te compare au moins cher.`,
    ],
    correction: `Une seule promesse. Un seul résultat. Un seul délai.\n\nEt une phrase qui dit pourquoi chez toi c'est différent.\nSi tu ne peux pas l'écrire, tes clients ne peuvent pas la répéter.`,
    arreter: [`Arrête d'ajouter des bonus. Ça n'a jamais sauvé une promesse molle.`,
              `Arrête de vendre ta méthode. Vends ce qu'elle laisse derrière elle.`],
    commencer: [`Commence par écrire le résultat sans un seul adjectif.`,
                `Commence à nommer ton mécanisme. Un nom, c'est déjà une preuve.`],
    prochain: `Ne touche à rien d'autre.\nRéécris ta promesse en une phrase : pour qui, quel résultat, en combien de temps.\n\nSi la phrase fait trois lignes, l'offre n'est pas prête.`,
  },

  conversion: {
    titre: "ACTION",
    constat: [
      `Tout est là, sauf la dernière marche.\n\nOn te lit, on te croit, on a envie…\net on ne sait pas quoi faire en sortant.\nDonc on ne fait rien. Et « rien », ça ne revient pas.`,
      `Tes posts se terminent dans le vide.\nOu alors ils demandent trop, trop tôt.\n\nDemander un achat à quelqu'un qui découvre son problème, c'est demander un mariage au premier café.`,
      `Il y a de la friction quelque part.\nEntre ton post et ton offre, il se passe trop d'étapes, ou pas assez de raisons.\n\nL'intérêt s'évapore vite. Plus vite que tu ne crois.`,
    ],
    mecanisme: [
      `Sans direction claire au bon moment, même un convaincu reporte.\nEt reporter, en pratique, c'est refuser.`,
      `Un appel à l'action ne crée pas l'envie. Il la récolte.\nMal calibré, il détruit ce que le post vient de construire.`,
    ],
    correction: `Une seule action possible par post.\nEt calibre-la sur le niveau de celui qui lit, pas sur ton besoin de vendre.\n\nCurieux : fais-le parler. Conscient : donne-lui une ressource. Chaud : donne le lien.`,
    arreter: [`Arrête de finir tes posts sans rien. Le silence ne convertit pas.`,
              `Arrête de mettre trois appels à l'action. Trois options, c'est zéro décision.`],
    commencer: [`Commence à écrire l'appel à l'action avant le post. Tu verras, le post change.`,
                `Commence à regarder ce qui se passe après le clic. C'est peut-être là que tout meurt.`],
    prochain: `Reprends ton dernier post qui a bien tourné.\nRepublie-le avec une seule fin : une action, une phrase, un lien.\n\nTu n'as pas besoin de plus d'audience pour tester ça.`,
  },
};

/* ============================================================
   L'ATELIER — ce que tu fais MAINTENANT
   Une seule priorité, deux ou trois questions, un livrable.
   ============================================================ */

const ATELIERS = {
  attention: {
    titre: "Répare ta première ligne",
    intro: `On ne touche à rien d'autre aujourd'hui.\nNi l'offre, ni le prix, ni le reste.\n\nTrois questions. Puis tu repars avec trois accroches.`,
    questions: [
      { id: "a1", label: "La dernière chose que tu as apprise à tes dépens sur ton sujet.", placeholder: "Ex : que publier tous les jours ne sert à rien si on parle à personne" },
      { id: "a2", label: "Ce que tout le monde répète sur ton sujet et qui est faux selon toi.", placeholder: "Ex : qu'il faut 10 000 abonnés avant de vendre" },
      { id: "a3", label: "Un chiffre de ton parcours que tu n'as jamais publié.", placeholder: "Ex : 14 mois sans une seule vente" },
    ],
    assembler: (r) => ({
      titre: "Tes 3 accroches",
      blocs: [
        { etiquette: "L'aveu", texte: `${majuscule(r.a3) || "[ton chiffre]"}.\n\nJe ne l'avais dit à personne.` },
        { etiquette: "La contradiction", texte: `On te répète ça depuis le début :\n${minuscule(r.a2) || "[la croyance]"}.\n\nC'est faux.\nEt ça te coûte plus cher que tu ne crois.` },
        { etiquette: "La leçon chère", texte: `${majuscule(r.a1) || "[ta leçon]"}.\n\nJ'ai mis longtemps à l'accepter.\nEt ça m'a coûté cher, ce temps-là.` },
      ],
      conseil: `Teste chaque ligne seule, sans le post derrière.\nSi elle ne tient pas debout toute seule, elle ne tiendra personne.`,
    }),
  },

  attractionAcheteur: {
    titre: "Resserre qui tu attires",
    intro: `Ton audience n'est pas trop petite.\nElle est trop loin de ce que tu vends.\n\nOn va trier. Ça va faire mal aux vues. C'est fait pour.`,
    questions: [
      { id: "b1", label: "Qui tu n'aides pas ? Sois franc, sois méchant.", placeholder: "Ex : ceux qui veulent du résultat sans jamais publier" },
      { id: "b2", label: "La phrase exacte que ton meilleur client a dite avant d'acheter.", placeholder: "Ex : « j'en ai marre de bosser pour des clients qui négocient tout »" },
      { id: "b3", label: "Le problème précis qu'il vivait ce jour-là.", placeholder: "Ex : trois mois sans nouveau client malgré 5 posts par semaine" },
    ],
    assembler: (r) => ({
      titre: "Ton filtre à audience",
      blocs: [
        { etiquette: "Le post qui trie", texte: `${majuscule(r.b3) || "[le problème précis]"}.\n\nSi tu lis ça et que ça ne te parle pas : tant mieux, ce n'est pas pour toi.\nSi ça t'a serré quelque chose dans le ventre : reste.\n\nParce qu'il y a une chose que je ne sais pas régler :\n${minuscule(r.b1) || "[qui tu n'aides pas]"}.\n\nLe reste, si.` },
        { etiquette: "Ta phrase-aimant", texte: r.b2 ? `« ${r.b2} »\n\nC'est un client qui m'a dit ça.\nJe l'ai noté. Je l'ai relu cent fois.\nParce que c'est exactement le moment où quelqu'un décide que ça suffit.` : `[La phrase de ton client]` },
      ],
      conseil: `Publie celui qui trie en premier.\nTu vas perdre des abonnés. Ce sont ceux qui faussaient déjà tes chiffres.`,
    }),
  },

  connexion: {
    titre: "Remets-toi dedans",
    intro: `On te comprend. Personne ne se sent compris.\n\nOn va réparer ça avec une scène, pas avec un conseil.`,
    questions: [
      { id: "c1", label: "Un moment où tu étais exactement à la place de ton prospect. Donne la date, l'heure, le lieu.", placeholder: "Ex : mardi 12 novembre, 23h47, cuisine, café froid" },
      { id: "c2", label: "Ce que tu ressentais dans le corps à cet instant.", placeholder: "Ex : la gorge serrée, les mains moites, l'envie de tout fermer" },
      { id: "c3", label: "La phrase que tu t'es dite à toi-même ce soir-là.", placeholder: "Ex : « je suis peut-être juste pas fait pour ça »" },
    ],
    assembler: (r) => ({
      titre: "Ton post confession",
      blocs: [
        { etiquette: "À publier tel quel (ou presque)", texte: `${majuscule(r.c1) || "[la scène]"}.\n\n${majuscule(r.c2) || "[ce que tu ressentais]"}.\n\nEt cette phrase, en boucle :\n« ${r.c3 || "[ta phrase]"} »\n\nJe ne raconte pas ça pour la leçon.\nJe le raconte parce que si tu es là ce soir, tu es peut-être exactement à cet endroit.` },
      ],
      conseil: `Ne mets pas de morale à la fin. Laisse-le nu.\nC'est le vide qui fait répondre les gens.`,
    }),
  },

  desir: {
    titre: "Crée l'écart",
    intro: `Ton contenu explique. Il ne fait pas désirer.\n\nOn va écrire deux scènes.\nCelle d'avant, celle d'après.\nL'écart entre les deux, c'est ton chiffre d'affaires.`,
    questions: [
      { id: "d1", label: "Ton prospect, un mardi soir, quand le problème le rattrape. Il fait quoi exactement ?", placeholder: "Ex : il rafraîchit ses stats pour la 4e fois, 11 vues, il referme" },
      { id: "d2", label: "Le même, six mois plus tard, problème réglé. Ce mardi soir, il fait quoi ?", placeholder: "Ex : il ferme son ordi à 19h, deux appels de vente calés demain" },
      { id: "d3", label: "Ce que ça lui coûte de ne rien changer pendant ces six mois. En euros, en heures, en ce que tu veux.", placeholder: "Ex : 6 mois × 2 clients ratés × 800 € = 9 600 €" },
    ],
    assembler: (r) => ({
      titre: "Ton Thread avant/après",
      blocs: [
        { etiquette: "À publier", texte: `${majuscule(r.d1) || "[la scène d'avant]"}.\n\nTu connais ce moment.\n\nMaintenant regarde le même mardi, dans six mois.\n\n${majuscule(r.d2) || "[la scène d'après]"}.\n\nEntre les deux, il n'y a pas dix ans de travail.\nIl y a une décision.\n\nEt tant qu'elle n'est pas prise, voilà ce qu'elle coûte :\n${r.d3 || "[le coût de l'inaction]"}.` },
        { etiquette: "Ta promesse, reconstruite", texte: r.d2 ? `Aujourd'hui :\n${minuscule(tronquer(r.d1, 90)) || "…"}\n\nDans six mois :\n${minuscule(tronquer(r.d2, 90))}\n\nC'est ça que tu vends. Pas ta méthode.` : `Remplis les deux scènes, et ta promesse s'écrit toute seule ici.` },
      ],
      conseil: `Si tu n'arrives pas à écrire ces deux scènes, ton prospect n'arrive pas à les imaginer.\nEt c'est exactement pour ça qu'il n'achète pas.`,
    }),
  },

  conviction: {
    titre: "Sors une preuve",
    intro: `On veut ton résultat. On doute que ce soit toi qui le livre.\n\nPas besoin d'un gros témoignage.\nUn petit vrai suffit.`,
    questions: [
      { id: "e1", label: "Le plus petit résultat concret que tu as fait obtenir à quelqu'un. Avec un chiffre et une durée.", placeholder: "Ex : Karim, 3 semaines, premier client à 450 €" },
      { id: "e2", label: "Pourquoi ça marche chez toi et pas ailleurs ? Une phrase.", placeholder: "Ex : on réécrit l'offre avant de toucher au contenu" },
      { id: "e3", label: "L'objection que tu redoutes le plus. Celle qui est un peu vraie.", placeholder: "Ex : « ça marche pour toi parce que tu as déjà une audience »" },
    ],
    assembler: (r) => ({
      titre: "Ton post preuve",
      blocs: [
        { etiquette: "La preuve", texte: `${majuscule(r.e1) || "[ton résultat]"}.\n\nPas de quoi faire une story avec des confettis.\nMais c'est vrai, c'est daté, et ça se refait.\n\nPourquoi ça a marché :\n${minuscule(r.e2) || "[ton mécanisme]"}.` },
        { etiquette: "L'objection, traitée avant qu'on te la pose", texte: r.e3 ? `On va me dire ça :\n« ${r.e3} »\n\nEt honnêtement ? Il y a du vrai.\n\nSauf qu'il reste une chose qui ne dépend d'aucune audience, d'aucun budget, d'aucun timing :\n${minuscule(r.e2) || "[ton mécanisme]"}.\n\nC'est même par là qu'on commence, justement quand il n'y a encore personne.` : `Remplis l'objection que tu redoutes le plus, et je te la retourne ici.` },
      ],
      conseil: `Donne un nom à ton mécanisme.\nCe qui a un nom existe. Ce qui existe se compare à rien.`,
    }),
  },

  offre: {
    titre: "Réécris ta promesse",
    intro: `Ton contenu n'est pas le problème aujourd'hui.\nC'est ce qu'il y a au bout.\n\nTrois questions. Une phrase à la sortie.`,
    questions: [
      { id: "f1", label: "Pour qui exactement ? (une situation, pas un métier)", placeholder: "Ex : un coach qui publie déjà mais n'a jamais dépassé 2 clients par mois" },
      { id: "f2", label: "Quel résultat ? Sans un seul adjectif.", placeholder: "Ex : 5 clients par mois à 800 €" },
      { id: "f3", label: "En combien de temps ?", placeholder: "Ex : 90 jours" },
      { id: "f4", label: "Pourquoi chez toi c'est différent ? Une phrase.", placeholder: "Ex : on ne touche pas au contenu tant que l'offre n'est pas vendable" },
    ],
    assembler: (r) => ({
      titre: "Ta promesse reconstruite",
      blocs: [
        { etiquette: "La version courte", texte: `${majuscule(r.f1) || "[pour qui]"}.\n${majuscule(r.f2) || "[résultat]"}.\n${majuscule(r.f3) || "[délai]"}.` },
        { etiquette: "La version qui vend", texte: `C'est pour qui :\n${minuscule(r.f1) || "[pour qui]"}.\n\nCe que ça donne :\n${minuscule(r.f2) || "[résultat]"}.\n\nEn combien de temps :\n${minuscule(r.f3) || "[délai]"}.\n\nEt la différence est là :\n${minuscule(r.f4) || "[ton mécanisme]"}.` },
      ],
      conseil: `Lis la version courte à voix haute.\nSi tu dois reprendre ta respiration au milieu, c'est encore trop long.`,
    }),
  },

  conversion: {
    titre: "Répare ta sortie",
    intro: `On te lit, on te croit, on a envie.\nEt puis on referme, parce qu'on ne sait pas quoi faire.\n\nOn règle ça en deux questions.`,
    questions: [
      { id: "g1", label: "L'action unique que tu veux qu'on fasse cette semaine. Une seule.", placeholder: "Ex : s'inscrire à ma newsletter" },
      { id: "g2", label: "Qu'est-ce qu'on trouve juste après le clic ? Sois précis.", placeholder: "Ex : une page avec un guide de 12 pages sur la promesse" },
      { id: "g3", label: "Pourquoi le faire maintenant plutôt que dans trois mois ?", placeholder: "Ex : chaque mois sans offre claire, c'est 2 clients qui partent ailleurs" },
    ],
    assembler: (r) => ({
      titre: "Tes 3 sorties, calibrées",
      blocs: [
        { etiquette: "Pour le curieux (il découvre son problème)", texte: `Dis-moi juste en commentaire si tu vis ça aussi.\nJe lis tout.` },
        { etiquette: "Pour le conscient (il sait, il cherche)", texte: `${majuscule(r.g2) || "[ta ressource]"}.\nC'est gratuit, c'est en lien, prends-le.` },
        { etiquette: "Pour le chaud (il veut régler ça)", texte: `${majuscule(r.g1) || "[ton action]"}.\n\nEt si tu te demandes pourquoi maintenant plutôt que dans trois mois :\n${minuscule(r.g3) || "[ta raison]"}.` },
      ],
      conseil: `Une sortie par post. Pas trois.\nTrois options, c'est zéro décision.`,
    }),
  },
};

function majuscule(s) {
  if (!s) return "";
  const t = s.trim();
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function minuscule(s) {
  if (!s) return "";
  const t = s.trim();
  return t.charAt(0).toLowerCase() + t.slice(1);
}
function tronquer(s, n) {
  if (!s) return "";
  const t = s.trim();
  return t.length > n ? t.slice(0, n).trim() + "…" : t;
}

/* ============================================================
   LES 10 ANGLES DE DÉSIR
   Des exemples écrits, pas des phrases à trous.
   ============================================================ */

const ANGLES_DESIR = [
  {
    angle: "Argent",
    ressort: "La perte, pas le gain",
    pourquoi: `Un gain promis, on y croit à moitié. Une perte chiffrée, ça serre le ventre tout de suite.`,
    exemples: [
      `J'ai fait le calcul l'autre soir.\nPas pour me faire du mal. Juste pour voir.\n\n14 mois à publier. Zéro offre claire.\nÀ deux clients ratés par mois, au prix où je vends aujourd'hui…\n\nLe chiffre m'a retourné l'estomac.\n\nCe que tu ne vends pas ne disparaît pas.\nÇa s'accumule ailleurs.`,
      `Personne ne parle du prix de l'attente.\n\nPas le prix d'une formation. Pas le prix d'un accompagnement.\nLe prix des mois où tu as tout fait correctement, sauf la seule chose qui rapportait.\n\nCelui-là, tu ne le vois jamais passer sur ton compte.\nIl part quand même.`,
      `Un jour, un client m'a dit : « ça me paraît cher ».\n\nOn a sorti une feuille. On a écrit ce que lui coûtait son mois actuel.\nPuis on a écrit le prix.\n\nIl a arrêté de parler pendant dix secondes.\nPas parce que j'avais gagné. Parce qu'il venait de voir les deux chiffres côte à côte pour la première fois.`,
    ],
    pertinence: (c) => 30 + (/(€|euro|\d\s?k\b|\d{3,})/.test(c.cout) ? 35 : 0) + (c.prix >= 300 ? 15 : 0) + (/(coach|freelance|consultant|entrepre|business|vente|chiffre d'affaire|ca mensuel)/.test(c.tout) ? 10 : 0),
    terrain: (state) => (state.offre.coutInaction && /(€|euro|\d\s?k\b|\d{3,})/.test(state.offre.coutInaction))
      ? `Tu as déjà le chiffre, tu me l'as donné :\n${minuscule(state.offre.coutInaction)}\n\nIl est dans ce formulaire. Il n'est nulle part dans tes Threads.`
      : null,
  },
  {
    angle: "Temps",
    ressort: "Les heures qui ne reviennent pas",
    pourquoi: `Le temps perdu ne se rembourse jamais. C'est la seule perte qu'on ne peut pas rattraper en travaillant plus.`,
    exemples: [
      `Deux heures par jour à écrire des posts.\nCinq jours sur sept.\nDepuis un an et demi.\n\nFais le calcul, je te laisse.\n\nLe problème n'a jamais été la quantité.\nÇa fait un moment que je le sais. J'ai juste mis longtemps à l'admettre.`,
      `On m'a dit : « il faut poster tous les jours ».\n\nJ'ai posté tous les jours.\nPendant onze mois.\n\nCe qui a fini par changer les choses, je l'ai fait un dimanche après-midi.\nEn deux heures. Une seule fois.`,
      `Le pire calcul que j'ai fait cette année.\n\nPas l'argent. Les dimanches.\n\nCombien de dimanches soir j'ai passés à préparer une semaine de contenu qui n'a rien vendu.\n\nL'argent, tu peux le refaire.`,
    ],
    pertinence: (c) => 35 + (/(temps|charge|débord|deborde|jongl|épuis|epuis|surcharg|organis)/.test(c.tout) ? 40 : 0) + (/(salarié|salarie|parent|maman|papa|double)/.test(c.cible) ? 15 : 0),
    terrain: null,
  },
  {
    angle: "Liberté",
    ressort: "Ne plus dépendre",
    pourquoi: `On ne veut pas « être indépendant ». On veut pouvoir dire non sans faire le calcul.`,
    exemples: [
      `Le vrai luxe, ce n'est pas de gagner plus.\n\nC'est de raccrocher au bout de quatre minutes parce que le client te parle mal.\nSans faire le calcul dans ta tête pendant qu'il parle.\n\nTant que tu fais le calcul, tu n'es pas libre.\nTu es juste occupé.`,
      `J'ai refusé un client la semaine dernière.\n\nIl y a trois ans, j'aurais dit oui. J'aurais râlé pendant six mois, mais j'aurais dit oui.\n\nLa différence entre les deux versions de moi, ce n'est pas le talent.\nC'est le nombre de personnes qui attendaient derrière.`,
      `« Tu es à ton compte, tu fais ce que tu veux. »\n\nAlors ça, c'est la blague de l'année.\n\nÊtre à son compte sans demande, c'est juste avoir remplacé un patron par douze.\nLa liberté ne vient pas du statut. Elle vient du carnet plein.`,
    ],
    pertinence: (c) => 35 + (/(freelance|indépendant|independant|solo|à son compte|a son compte|agence|client)/.test(c.tout) ? 35 : 0) + (/(salarié|salarie|reconversion|quitter)/.test(c.cible) ? 20 : 0),
    terrain: null,
  },
  {
    angle: "Statut",
    ressort: "Le regard des autres",
    pourquoi: `Personne ne l'avoue. Tout le monde le ressent. C'est précisément pour ça que ça fonctionne aussi bien.`,
    exemples: [
      `Il y a un moment que personne ne raconte.\n\nCelui où quelqu'un de ton milieu — quelqu'un que tu regardais de loin — te répond.\nPas par politesse. Parce qu'il a besoin de savoir comment tu fais.\n\nCe jour-là tu ne gagnes pas d'argent.\nMais quelque chose bascule.`,
      `« Tu fais quoi, déjà ? »\n\nPendant deux ans, j'ai bafouillé à cette question.\nJ'expliquais. Je nuançais. Je voyais le regard partir.\n\nAujourd'hui je réponds en une phrase et on me demande le prix.\nLe travail n'a pas changé. La phrase, si.`,
      `On ne cherche pas la célébrité.\n\nOn cherche juste à ne plus avoir à se justifier au repas de famille.\n\nC'est un objectif minuscule, presque gênant à formuler.\nC'est aussi un des plus puissants que je connaisse.`,
    ],
    pertinence: (c) => 30 + (c.prix >= 500 ? 25 : 0) + (/(expert|consultant|autorité|autorite|visib|personal branding|reconnu|crédib|credib)/.test(c.tout) ? 30 : 0),
    terrain: null,
  },
  {
    angle: "Sécurité",
    ressort: "Dormir tranquille",
    pourquoi: `La peur de l'instabilité fait bouger plus vite que l'envie de croissance. Toujours.`,
    exemples: [
      `On parle beaucoup de scaler.\nOn parle rarement du 3 du mois.\n\nCe moment où tu ouvres ton appli bancaire avant le prélèvement, avec cette petite contraction.\n\nLa vraie ambition, au début, ce n'est pas 10k.\nC'est arrêter d'avoir cette contraction.`,
      `Mon meilleur mois ne m'a pas rassuré.\n\nParce qu'un bon mois qu'on ne sait pas reproduire, ce n'est pas un revenu.\nC'est un coup de chance avec une facture dedans.\n\nCe qui rassure, ce n'est jamais le montant.\nC'est de savoir d'où il vient.`,
      `La question que personne ne pose : « et le mois prochain ? »\n\nOn célèbre les pics. On ne regarde jamais ce qu'il y a entre.\n\nMoi, ce sont les creux qui m'ont appris quelque chose.\nParce qu'ils avaient tous exactement la même cause.`,
    ],
    pertinence: (c) => 30 + (c.ventes === 0 ? 30 : 0) + (/(instab|irrégul|irregul|incertain|stress|peur|stabilit|revenu)/.test(c.tout) ? 25 : 0) + (c.cas === "ZERO_VENTE" ? 15 : 0),
    terrain: null,
  },
  {
    angle: "Confort",
    ressort: "Moins d'effort, pas plus de performance",
    pourquoi: `Une solution simple bat une solution supérieure. L'effort perçu compte plus que le résultat promis.`,
    exemples: [
      `J'ai testé la méthode des 3 posts par jour.\nJ'ai tenu onze jours.\n\nCe qui a changé les choses ensuite tenait sur une feuille A5.\nUne promesse. Deux scènes. Une sortie.\n\nMoins de travail. Pas moins de résultat.\nC'est ça qui m'a vexé, d'ailleurs.`,
      `On te vend de la discipline.\n\nMais si la discipline suffisait, tout le monde aurait réussi — les gens sont beaucoup plus travailleurs qu'on ne le dit.\n\nCe qui manque, ce n'est presque jamais l'effort.\nC'est l'ordre dans lequel on le dépense.`,
      `La version qui a marché était plus courte que la version qui n'a pas marché.\n\nÀ chaque fois. Sans exception. Depuis deux ans.\n\nJ'ai arrêté de me battre avec ça.`,
    ],
    pertinence: (c) => 30 + (c.prix > 0 && c.prix < 150 ? 25 : 0) + (/(template|outil|méthode|methode|système|systeme|simplif|productiv|rapide|automat)/.test(c.tout) ? 30 : 0),
    terrain: null,
  },
  {
    angle: "Contrôle",
    ressort: "Reprendre la main",
    pourquoi: `Ne plus subir réduit l'angoisse. Et l'angoisse est le premier frein à l'achat, avant le prix.`,
    exemples: [
      `Le pire, ce n'est pas de ne pas vendre.\n\nC'est de ne pas savoir pourquoi.\nDe republier en espérant. De regarder les chiffres comme on regarde la météo.\n\nÀ partir du moment où tu sais exactement où ça casse,\ntu n'espères plus. Tu répares.`,
      `J'ai passé un an à croire que l'algorithme décidait de mes revenus.\n\nC'était pratique. Ça expliquait tout et ça n'engageait à rien.\n\nSauf que le mois où j'ai changé une seule ligne — pas mon rythme, pas mon format, une ligne — l'algorithme n'avait pas changé d'avis.\nMoi si.`,
      `« Ça dépend de la portée. »\n\nNon.\n\nJ'ai eu des posts à 200 000 vues qui n'ont rien rapporté, et des posts à 800 vues qui ont rempli un mois.\n\nCe n'est pas la météo. Il y a une mécanique. Et une mécanique, ça se démonte.`,
    ],
    pertinence: (c) => 35 + (c.cas === "VANITY_ALERT" ? 35 : 0) + (c.cas === "ZERO_VENTE" ? 20 : 0) + (/(algorithme|portée|portee|vues|visib|comprendre|pilot)/.test(c.tout) ? 15 : 0),
    terrain: (state) => (state.audience.vuesMois > 20000 && state.audience.ventesMois === 0)
      ? `Ton cas est exactement celui-là.\n\nDes vues, aucune vente : le genre de situation qui donne envie de tout mettre sur le dos de l'algorithme.\nC'est la seule explication qui n'aide en rien.`
      : null,
  },
  {
    angle: "Reconnaissance",
    ressort: "Être vu pour ce qu'on vaut",
    pourquoi: `Être validé par ses pairs verrouille une décision déjà prise à moitié.`,
    exemples: [
      `Le message qui m'a le plus marqué cette année faisait deux lignes.\n\n« J'ai utilisé ton truc. Ça a marché. Merci. »\n\nJe l'ai relu je ne sais pas combien de fois.\nCe n'est pas de la vanité. C'est la première preuve que ce que tu fais existe en dehors de ta tête.`,
      `On croit vouloir des clients.\n\nEn vrai, la première fois, on veut surtout une preuve.\nQue ce n'était pas une lubie. Que quelqu'un était prêt à payer pour ce truc dont tout le monde disait poliment « c'est intéressant ».\n\nLe premier client ne change pas ton chiffre. Il change ton statut à tes propres yeux.`,
      `Ce qui fait tenir, ce n'est pas la motivation.\n\nC'est le moment où quelqu'un cite ta phrase sans savoir que tu es derrière.\n\nÇa m'est arrivé une fois. Ça m'a tenu six mois.`,
    ],
    pertinence: (c) => 25 + (/(créateur|createur|artiste|auteur|coach|formation|communaut|audience)/.test(c.tout) ? 25 : 0) + (c.fuite === "connexion" ? 20 : 0),
    terrain: null,
  },
  {
    angle: "Transformation",
    ressort: "Devenir quelqu'un d'autre",
    pourquoi: `On n'achète pas un résultat. On achète la version de soi qui l'a déjà obtenu.`,
    exemples: [
      `Ce n'est pas le chiffre qui change quelqu'un.\n\nC'est le moment où il arrête de se présenter comme « je me lance »\net commence à dire « je bosse avec ».\n\nLes deux personnes n'écrivent pas pareil.\nNe vendent pas pareil.\nNe sont pas payées pareil.`,
      `Il y a la personne qui publie en espérant.\nEt il y a celle qui publie en sachant ce qu'elle déclenche.\n\nEntre les deux, ce n'est pas une question de temps passé.\nJ'ai vu des gens faire le trajet en trois semaines, et d'autres tourner trois ans.`,
      `On m'a demandé ce qui avait changé.\n\nJ'ai voulu répondre « ma méthode ». C'est faux.\n\nCe qui a changé, c'est que j'ai arrêté de demander la permission avant d'écrire.\nTout le reste en découle.`,
    ],
    pertinence: (c) => 40 + (c.fuite === "desir" ? 25 : 0) + (/(transform|devenir|passer de|niveau|évolu|evolu)/.test(c.tout) ? 20 : 0),
    terrain: (state) => state.business.resultat
      ? `Ton terrain à toi, c'est celui-ci :\n${minuscule(state.business.resultat)}\n\nÉcris la personne qui a ça, pas le résultat lui-même.`
      : null,
  },
  {
    angle: "Évitement de douleur",
    ressort: "Fuir, pas conquérir",
    pourquoi: `Éviter une perte motive environ deux fois plus que gagner l'équivalent. C'est le levier le plus sous-utilisé de la liste.`,
    exemples: [
      `Tu peux continuer exactement comme maintenant.\nSincèrement, c'est une option.\n\nDans six mois tu auras 180 posts de plus.\nUn peu plus d'abonnés. La même conversation avec toi-même le dimanche soir.\n\nCe n'est pas dramatique.\nC'est juste très, très cher.`,
      `Je ne vais pas te dire que tu vas rater ta vie.\n\nTu vas juste refaire cette année. À l'identique.\n\nEt la version de toi qui lira ce post dans douze mois aura exactement les mêmes chiffres, avec un an de moins pour les changer.`,
      `Le danger, ce n'est pas l'échec.\n\nL'échec, au moins, ça se voit. Ça oblige à bouger.\n\nLe danger, c'est le tiède. Un peu de vues, un peu de likes, un peu d'espoir.\nAssez pour continuer, jamais assez pour vivre.`,
    ],
    pertinence: (c) => 45 + (c.cout ? 25 : 0) + (c.fuite === "desir" ? 25 : 0),
    terrain: (state) => !state.offre.coutInaction
      ? `Tu as laissé la case « ce qu'il risque » vide dans le questionnaire.\n\nCe levier est le plus puissant de la liste, et c'est précisément celui que tu n'as pas armé.`
      : null,
  },
];

/* Les mêmes dix leviers pour tout le monde, ce serait une liste.
   On les classe selon ce qu'il vend, à qui, et où il fuit. */

function anglesPourLui(state, scores, cle, cas, graine) {
  const t = (s) => (s || "").toLowerCase();
  const ctx = {
    cible: t(state.business.cible),
    cout: t(state.offre.coutInaction),
    prix: state.business.prix || 0,
    ventes: state.audience.ventesMois || 0,
    fuite: cle,
    cas,
    tout: t([state.business.cible, state.business.offre, state.business.resultat,
      state.offre.probleme, state.offre.coutInaction, state.offre.promesse].join(" ")),
  };

  return ANGLES_DESIR
    .map((a, i) => ({
      angle: a.angle,
      ressort: a.ressort,
      pourquoi: a.pourquoi,
      exemple: a.exemples[(graine + i * 7) % a.exemples.length],
      terrain: a.terrain ? a.terrain(state) : null,
      poids: a.pertinence(ctx) + ((graine + i * 13) % 11) - 5,
    }))
    .sort((x, y) => y.poids - x.poids);
}

/* ============================================================
   OBJECTIONS
   ============================================================ */

/* Les objections qu'on entend vraiment. Chacune a son propre décodage,
   l'étape où elle se répare, et un post pour la désamorcer. */

const CATALOGUE_OBJECTIONS = [
  {
    id: "prix",
    phrase: "C'est trop cher",
    pointe: "desir",
    resistance: `Le prix n'est presque jamais le sujet.\nQuelqu'un qui veut vraiment trouve l'argent — tu l'as déjà fait toi-même, pour des choses moins utiles.\n\nCe que ça dit en vrai : « je ne vois pas encore ce que ça vaut ».\nUn prix ne se baisse pas. Une valeur se montre.`,
    repare: "Le désir, pas la page de vente",
    post: `On me dit souvent que c'est cher.\n\nJe comprends. Vraiment.\n\nMais personne ne m'a jamais dit combien coûtait l'autre option.\nCelle de ne rien changer, et de relire le même bilan dans un an.\n\nCelle-là, elle ne s'affiche nulle part.\nElle se paye quand même.`,
  },
  {
    id: "reflechir",
    phrase: "Je vais réfléchir",
    pointe: "desir",
    resistance: `Traduction : rien ne m'oblige à décider aujourd'hui.\n\nEt c'est vrai. Ne rien faire est gratuit, immédiat, et ça ne demande aucun courage.\nTant que ça reste le cas, l'inaction gagne à tous les coups.\n\nCe n'est pas une hésitation. C'est un refus poli avec une porte laissée ouverte.`,
    repare: "Le coût de l'inaction, rendu visible",
    post: `« Je vais réfléchir. »\n\nJ'ai dit ça des dizaines de fois dans ma vie.\n\nEt tu sais ce que j'ai remarqué ?\nJe n'ai jamais réfléchi. Pas une seule fois.\n\nJ'ai juste laissé le temps décider à ma place.\nCe qui est une décision aussi. Sauf qu'on ne la choisit pas.`,
  },
  {
    id: "seul",
    phrase: "Je peux le faire moi-même",
    pointe: "conviction",
    resistance: `Il ne doute pas de la méthode. Il doute de lui.\n\nIl a déjà trois formations non terminées sur son disque dur, et il le sait.\nCe qu'il achète ce n'est pas l'information — elle est gratuite, partout, il en a trop.\n\nC'est le fait de ne pas abandonner cette fois.`,
    repare: "Ton mécanisme, et ce qui fait tenir",
    post: `Tu peux tout faire seul.\nSincèrement. L'info est gratuite, elle est partout.\n\nLa vraie question n'est pas « est-ce que je peux ».\nC'est « est-ce que je l'ai fait ».\n\nParce que ça fait combien de temps que tu sais exactement ce que tu devrais faire ?`,
  },
  {
    id: "temps",
    phrase: "Je n'ai pas le temps",
    pointe: "desir",
    resistance: `Ce n'est jamais une question de temps.\nC'est une question de rang.\n\n« Je n'ai pas le temps » veut dire : ce n'est pas assez haut dans ma liste.\nEt ça, ce n'est pas un problème d'agenda. C'est un problème d'envie.\n\nPersonne ne manque de temps pour ce qui lui fait vraiment peur de rater.`,
    repare: "L'intensité du désir, pas la logistique",
    post: `« Je n'ai pas le temps. »\n\nOn s'est tous entendus dire ça.\n\nPourtant on trouve toujours deux heures pour ce qui nous obsède.\n\nDonc la vraie phrase, c'est : ce n'est pas encore assez important.\nEt honnêtement, c'est une réponse acceptable.\nÀ condition de savoir ce que ça coûte de la garder.`,
  },
  {
    id: "moncas",
    phrase: "Ça ne marchera pas dans mon cas",
    pointe: "connexion",
    resistance: `Il ne se reconnaît dans aucun de tes exemples.\n\nCe n'est pas ta méthode qu'il rejette. C'est le casting.\nTes preuves parlent de gens qui ne lui ressemblent pas : pas le même niveau, pas le même métier, pas la même galère.\n\nMontre-lui quelqu'un qui lui ressemble, et l'objection tombe toute seule.`,
    repare: "L'identification, avant la preuve",
    post: `« Ça ne marchera pas dans mon cas. »\n\nCelui qui m'a dit ça avait le profil le plus improbable que j'aie croisé.\n\nPas d'audience. Pas de temps. Pas d'envie de se montrer.\n\nJe raconte ce qu'on a fait, parce que si ça a marché là, la question du « cas particulier » se pose autrement.`,
  },
  {
    id: "dejaessaye",
    phrase: "J'ai déjà essayé, ça n'a rien donné",
    pointe: "conviction",
    resistance: `C'est l'objection la plus sérieuse. Et la meilleure nouvelle de la journée.\n\nIl a déjà sorti sa carte. Il achète, ce n'est pas le problème.\nIl s'est juste fait avoir une fois, et il ne veut pas raconter ça deux fois à sa femme.\n\nIl lui manque une raison nommée de croire que cette fois c'est différent. Nommée : pas « moi je suis sérieux ».`,
    repare: "Un mécanisme qui a un nom",
    post: `« J'ai déjà essayé. »\n\nTant mieux. Ça veut dire que tu sais déjà ce qui ne marche pas.\n\nLa plupart des méthodes échouent au même endroit, et ce n'est presque jamais l'endroit qu'on croit.\n\nCe n'est pas la discipline qui lâche.\nC'est l'ordre dans lequel on fait les choses.`,
  },
  {
    id: "confiance",
    phrase: "Je ne te connais pas assez",
    pointe: "connexion",
    resistance: `Il n'y a pas assez de traces.\n\nPas de visage, pas de continuité, pas de version de toi qui se plante.\nOn ne sait pas d'où tu parles, donc on ne sait pas si on peut te suivre.\n\nLa confiance, ce n'est pas de l'éloquence. C'est de la répétition — et un peu de casse assumée.`,
    repare: "Ta propre histoire, datée",
    post: `Tu ne me connais pas.\n\nNormal. Je passe mon temps à parler de toi, pas de moi.\n\nAlors voilà, une fois : d'où je parle, ce que j'ai raté avant, et pourquoi je me suis retrouvé à faire exactement ça.\n\nCe n'est pas une histoire de réussite. C'est une histoire de ras-le-bol.`,
  },
  {
    id: "parouco",
    phrase: "Je ne sais pas par où commencer",
    pointe: "offre",
    resistance: `Ce n'est pas un manque d'information. C'est l'inverse.\n\nIl en a trop. Quinze onglets ouverts, quatre méthodes contradictoires, zéro décision.\nLa surcharge paralyse exactement comme le vide.\n\nCe qu'il cherche, ce n'est pas un menu de plus.\nC'est quelqu'un qui tranche à sa place.`,
    repare: "La clarté de ton offre et une seule porte",
    post: `Si tu ne sais pas par où commencer, ce n'est pas que tu manques d'informations.\n\nC'est que tu en as trop.\n\nQuinze onglets ouverts. Quatre avis contradictoires. Aucune décision.\n\nAlors je vais trancher pour toi : une seule chose cette semaine.\nLa voilà.`,
  },
  {
    id: "moment",
    phrase: "Ce n'est pas le bon moment",
    pointe: "desir",
    resistance: `Le problème existe, mais il ne saigne pas encore.\nOu alors il saigne depuis si longtemps qu'on s'y est habitué — ce qui revient au même.\n\nTon travail n'est pas de pousser.\nC'est de rendre visible ce qui se dégrade pendant qu'il attend le bon moment.\n\nSpoiler : le bon moment, c'est une chose qui n'arrive jamais dans un agenda.`,
    repare: "Ce qui se dégrade pendant l'attente",
    post: `« Ce n'est pas le bon moment. »\n\nJ'ai attendu le bon moment pendant presque deux ans.\n\nIl n'est jamais venu. Évidemment.\n\nCe qui est venu, en revanche : les mêmes chiffres, douze mois plus tard, avec un an de moins pour les changer.`,
  },
];

/* Résolution des objections choisies, plus le cas « Autre » saisi à la main.
   Le texte libre est décodé par mots-clés ; s'il reste inconnu, chaque
   objection reçoit tout de même une lecture différente. */

const LECTURES_LIBRES = [
  {
    resistance: `Celle-là n'est dans aucun manuel, et c'est une bonne nouvelle : elle vient de ton terrain à toi.

Pose-lui une seule question : est-ce qu'on doute du résultat, ou est-ce qu'on doute de soi ?

Doute du résultat, ça se répare avec de la preuve.
Doute de soi, ça se répare en montrant ce qui fait tenir quand on lâche d'habitude.`,
    repare: "À trancher : preuve, ou accompagnement",
  },
  {
    resistance: `Note la phrase exacte, mot pour mot, la prochaine fois qu'on te la sort.

La formulation compte plus que le fond : « c'est cher » et « je ne peux pas me le permettre » ne se réparent pas au même endroit.
La première parle de valeur. La seconde parle de priorité.

Et en attendant, réponds-y publiquement. Une objection non traitée continue de travailler, en silence, chez tous ceux qui ne te l'ont pas dite.`,
    repare: "À publier avant qu'on te la repose",
  },
  {
    resistance: `Celle-ci t'appartient — elle vient de ton marché, pas d'une liste générique.

Regarde qui te la dit. Si ce sont toujours les mêmes profils, ce n'est pas une objection : c'est un signal de ciblage.
Tu parles peut-être à côté de ceux qui achètent.

Si elle vient de tout le monde, alors c'est ton offre qui la provoque.`,
    repare: "Un signal de ciblage, ou d'offre",
  },
];

function resoudreObjections(selectionnees, texteLibre, graine) {
  const sorties = [];
  (selectionnees || []).forEach(id => {
    const o = CATALOGUE_OBJECTIONS.find(x => x.id === id);
    if (o) sorties.push({ phrase: o.phrase, resistance: o.resistance, repare: o.repare, post: o.post, pointe: o.pointe });
  });

  const libre = (texteLibre || "").trim();
  if (libre) {
    const t = libre.toLowerCase();
    const indices = {
      prix: ["cher", "prix", "budget", "coûte", "moyens", "argent"],
      reflechir: ["réfléchir", "reflechir", "recontacte", "rappelle"],
      seul: ["moi-même", "moi meme", "seul", "gratuit", "youtube", "tout seul"],
      temps: ["temps", "occupé", "occupe", "charge", "dispo"],
      moncas: ["mon cas", "marchera pas", "pas pour moi", "mon secteur", "particulier"],
      dejaessaye: ["déjà essayé", "deja essaye", "rien donné", "arnaqué", "arnaque"],
      confiance: ["connais pas", "confiance", "sais pas qui", "sérieux"],
      parouco: ["par où", "par ou", "commencer", "perdu", "sais pas quoi"],
      moment: ["moment", "urgent", "plus tard", "un jour", "année prochaine", "rentrée", "rentree",
        "attendre", "septembre", "janvier", "cet été", "cet ete", "après les"],
    };
    let trouve = null;
    for (const id in indices) {
      if (indices[id].some(m => t.includes(m)) && !(selectionnees || []).includes(id)) { trouve = id; break; }
    }
    const modele = trouve ? CATALOGUE_OBJECTIONS.find(x => x.id === trouve) : null;
    if (modele) {
      sorties.push({ phrase: libre, resistance: modele.resistance, repare: modele.repare, post: modele.post, pointe: modele.pointe });
    } else {
      const lecture = LECTURES_LIBRES[graine % LECTURES_LIBRES.length];
      sorties.push({ phrase: libre, resistance: lecture.resistance, repare: lecture.repare, post: null, pointe: null });
    }
  }
  return sorties;
}

/* Est-ce que les objections choisies pointent toutes au même endroit ? */
function convergenceObjections(objections, fuitePrincipale, prenom) {
  const cibles = objections.map(o => o.pointe).filter(Boolean);
  if (cibles.length < 2) return null;
  const compte = {};
  cibles.forEach(c => { compte[c] = (compte[c] || 0) + 1; });
  const [cle, n] = Object.entries(compte).sort((a, b) => b[1] - a[1])[0];
  if (n < 2) {
    return `Tes objections ne pointent pas toutes au même endroit.
Celles-là se traitent une par une, pas en bloc.`;
  }
  const nom = FUITES[cle].titre.toLowerCase();
  const tete = prenom ? `${prenom}, regarde bien.` : `Regarde bien.`;
  if (cle === fuitePrincipale) {
    return `${tete}

Sur tes ${cibles.length} objections, ${n} se réparent exactement au même endroit : ${nom}.

Et c'est là que ton scan a trouvé ta fuite.

Ce n'est pas une coïncidence. Tes prospects te disent avec leurs mots ce que tes chiffres disent avec les leurs.`;
  }
  return `${tete}

Sur tes ${cibles.length} objections, ${n} se réparent au même endroit : ${nom}.

Ton scan, lui, pointe ailleurs.

Ça arrive souvent, et c'est intéressant : ce que les gens verbalisent n'est presque jamais ce qui les bloque vraiment. Traite ta fuite d'abord, puis regarde si ces objections ne tombent pas toutes seules.`;
}

/* ============================================================
   PHRASES À VOLER
   ============================================================ */

const PHRASES_A_VOLER = {
  attention: [
    `Je ne l'ai dit à personne. Et pourtant ça explique tout.`,
    `Ce post ne va pas te plaire. Il va te servir.`,
    `Il y a une phrase que je répète à mes clients et qui les vexe à chaque fois.`,
    `On m'a dit l'inverse pendant des années. On avait tort.`,
    `Le détail que personne ne regarde, c'est justement celui qui coûte le plus cher.`,
  ],
  attractionAcheteur: [
    `Si tu lis ça et que ça ne te parle pas : tant mieux. Ce n'est pas pour toi.`,
    `Je n'aide pas tout le monde. Et ça m'a pris trois ans à assumer.`,
    `Ce n'est pas un problème d'audience. C'est un problème de voisinage.`,
    `Tu n'as pas trop peu de monde. Tu as trop de gens qui n'achèteront jamais.`,
    `Le jour où j'ai perdu 400 abonnés, j'ai fait mon meilleur mois.`,
  ],
  connexion: [
    `Il était 23h47. Je m'en souviens parce que j'ai regardé l'heure avant de tout fermer.`,
    `Je ne raconte pas ça pour la leçon. Je le raconte parce que tu es peut-être exactement là ce soir.`,
    `J'ai eu honte de ce chiffre pendant deux ans.`,
    `On ne me croit jamais quand je raconte ce moment.`,
    `Ce n'est pas une histoire de réussite. C'est une histoire de ras-le-bol.`,
  ],
  desir: [
    `Ton contenu n'est pas mauvais. C'est presque pire.`,
    `Tu nourris ton audience. Tu ne lui donnes jamais faim.`,
    `Tu peux continuer exactement comme maintenant. Voilà juste ce que ça coûte.`,
    `Entre « c'est intéressant » et « il me le faut », il y a un gouffre. Personne ne le franchit tout seul.`,
    `Le problème n'est pas qu'on ne te comprend pas. C'est qu'on te comprend, et que ça ne change rien.`,
  ],
  conviction: [
    `Je ne vais pas te promettre le double. Je vais te montrer les trois semaines de Karim.`,
    `Ça marche. Pas partout, pas pour tout le monde, et voilà exactement quand ça ne marche pas.`,
    `On va me dire que c'est facile pour moi. Il y a du vrai.`,
    `Un chiffre bancal est plus crédible qu'un chiffre rond.`,
    `Ce n'est pas de la motivation. C'est un mécanisme. Il a même un nom.`,
  ],
  offre: [
    `Si je dois faire une phrase de trois lignes pour expliquer ce que je vends, c'est que je ne le sais pas encore.`,
    `J'ai enlevé la moitié de mon offre. Elle s'est vendue deux fois mieux.`,
    `Les bonus ne sauvent jamais une promesse molle.`,
    `On n'achète pas ta méthode. On achète ce qu'elle laisse derrière elle.`,
    `Une offre large rassure celui qui la vend et angoisse celui qui doit l'acheter.`,
  ],
  conversion: [
    `Une seule action à la fin. Trois options, c'est zéro décision.`,
    `Tu ne demandes pas un mariage au premier café. Arrête de le faire à tes lecteurs.`,
    `« Je vais réfléchir » veut dire : rien ne m'oblige à décider aujourd'hui.`,
    `Le silence en fin de post, ça ne convertit rien.`,
    `Ce n'est pas le trafic qui manque. C'est la porte.`,
  ],
};

/* ============================================================
   ASSEMBLAGE DU RAPPORT
   ============================================================ */

function genererRapport(state, scores) {
  const E = window.CashEngine;
  const fuites = E.indiceDeFuite(scores);
  const decision = E.fuitePrioritaire(scores, fuites, state);
  const principale = decision.fuite;
  const secondaire = fuites.find(f => f.cle !== principale.cle);
  const global = E.scoreGlobal(scores);
  const cas = E.detecterCasParticulier(state);
  const profils = E.profilDeVente(scores);
  const graine = E.empreinte((state.business.offre || "") + (state.business.cible || "") + (state.offre.promesse || ""));

  const F = FUITES[principale.cle];
  const F2 = FUITES[secondaire.cle];

  const prenom = (state.business.prenom || "").trim();
  const repartition = repartitionClassifications(scores.analysesThreads);
  const objections = resoudreObjections(state.offre.objectionsChoisies, state.offre.objectionAutre, graine);

  return {
    prenom,
    global,
    niveauGlobal: E.niveauScore(global),
    scores,
    fuites,
    fuitePrincipale: principale,
    deuxiemeFuite: secondaire,
    regleAppliquee: decision.regle,
    cas,
    profils,
    graine,
    repartition,
    objections,
    convergence: convergenceObjections(objections, principale.cle, prenom),
    profil: auditProfil(state, scores),
    angles: anglesPourLui(state, scores, principale.cle, cas, graine),
    threadsRemarquables: threadsRemarquables(scores.analysesThreads),
    ancrages: ancragesPersonnels(state, scores, principale.cle),
    gapDesir: Math.max(0, 70 - scores.desir),
    autopsie: autopsieOffre(state, scores),
    fuite: {
      titre: F.titre,
      constat: pioche(F.constat, graine),
      mecanisme: pioche(F.mecanisme, graine + 1),
      correction: F.correction,
      prochain: F.prochain,
    },
    arreter: [pioche(F.arreter, graine), pioche(F2.arreter, graine + 2), arretUniversel(state, graine)],
    commencer: [pioche(F.commencer, graine), pioche(F2.commencer, graine + 3), commenceUniversel(state, graine)],
    ouverture: ouverture(state, scores, principale, cas, prenom),
    lecture: lectureDesChiffres(state, scores),
    plan: plan7Jours(principale.cle, state),
    threadsPrets: threadsPrets(principale.cle, state, graine),
    phrases: PHRASES_A_VOLER[principale.cle],
    atelier: ATELIERS[principale.cle],
    programme: PROGRAMMES[principale.cle],
  };
}

/* Ce qu'il a écrit, relu et commenté ligne par ligne.
   C'est ce qui fait la différence entre un rapport et un horoscope. */

function threadsRemarquables(analyses) {
  if (!analyses || analyses.length < 2) return null;
  const indexes = analyses.map((a, i) => ({ ...a, num: i + 1 }));
  const tries = [...indexes].sort((a, b) => b.total - a.total);
  const meilleur = tries[0];
  const pire = tries[tries.length - 1];
  if (meilleur.num === pire.num) return null;

  return {
    meilleur: { num: meilleur.num, ligne: meilleur.premiereLigne, total: meilleur.total, mot: motSurThread(meilleur, true) },
    pire: { num: pire.num, ligne: pire.premiereLigne, total: pire.total, mot: motSurThread(pire, false) },
  };
}

function motSurThread(a, estLeMeilleur) {
  if (estLeMeilleur) {
    if (a.conversion >= 10) return `Celui-là fait le travail jusqu'au bout : il accroche et il indique une sortie. C'est ton modèle, garde-le sous le coude.`;
    if (a.connexion >= 12) return `Ce qui le sauve, c'est qu'on s'y reconnaît. Il manque juste une porte à la fin — ajoute-la et tu as ton meilleur post.`;
    if (a.desir >= 12) return `Il donne envie. C'est le plus dur, et tu l'as fait là. Reproduis cette structure, pas ce sujet.`;
    return `C'est ton meilleur, mais il est meilleur par défaut : il est simplement moins faible que les autres.`;
  }
  if (a.hook <= 6) return `Le problème commence à cette ligne : elle ne promet rien. Personne ne lira la deuxième.`;
  if (a.pertinence <= 5) return `Il est peut-être bon. Il ne parle juste pas du terrain de ton offre — donc il ne te ramènera jamais un client.`;
  if (a.conversion === 0 && a.desir <= 5) return `Ni envie, ni sortie. Ce post informe, et s'arrête là.`;
  return `Il n'est pas raté. Il est tiède — et le tiède ne déclenche rien du tout.`;
}

/* Le profil : la marche entre le Thread et l'offre.
   On ne peut pas aller le lire pour toi — mais mal réglée,
   cette marche annule tout ce qui se passe avant. */

function auditProfil(state, scores) {
  const bio = (state.audience.bio || "").trim();
  const handle = (state.audience.handle || "").replace(/^@/, "").trim();
  const destination = (state.audience.destination || "").trim();
  if (!bio && !destination) return null;

  const E = window.CashEngine;
  const b = bio.toLowerCase();
  const points = [];
  let score = 0;

  const parleAuLecteur = /\b(tu|ton|ta|tes|toi|vous|votre)\b/.test(b);
  const aUnChiffre = /\d/.test(bio);
  const nommeCible = E.occ(bio, (state.business.cible || "").toLowerCase().split(/\s+/).filter(w => w.length > 4)) > 0;
  const aUneDirection = /(↓|👇|en dessous|ci-dessous|lien|clique|télécharge|telecharge|guide|gratuit|réserve|reserve)/.test(b);
  const longueurOk = bio.length >= 25 && bio.length <= 180;

  if (parleAuLecteur) { score += 25; points.push({ ok: true, mot: `Tu t'adresses au lecteur. C'est la moitié du travail, et la plupart des bios l'oublient.` }); }
  else if (bio) points.push({ ok: false, mot: `Ta bio parle de toi, pas de lui.\n\nOn arrive sur ton profil avec une question en tête : « est-ce que ce type parle de mon problème ? »\nUne bio au « je » ne répond jamais à cette question.` });

  if (aUnChiffre) { score += 25; points.push({ ok: true, mot: `Il y a un chiffre. C'est ce qui rend une bio vérifiable au lieu de décorative.` }); }
  else if (bio) points.push({ ok: false, mot: `Aucun chiffre.\n\n« J'aide les coachs à développer leur activité » et « 5 clients par mois en 90 jours » ne déclenchent pas la même chose.\nLa première rassure. La seconde fait cliquer.` });

  if (nommeCible) { score += 20; points.push({ ok: true, mot: `Ta cible est nommée dans ta bio. Ceux qui ne sont pas concernés le voient tout de suite, et c'est très bien.` }); }
  else if (bio) points.push({ ok: false, mot: `On ne sait pas pour qui tu es là.\n\nUne bio qui ne trie personne fait rester tout le monde — y compris ceux qui n'achèteront jamais.` });

  if (aUneDirection) score += 15;
  else if (bio) points.push({ ok: false, mot: `Aucune direction vers ton lien.\n\nLe lien existe, mais rien ne dit pourquoi cliquer. Une flèche et une raison suffisent.` });

  if (longueurOk) score += 15;
  else if (bio && bio.length > 180) points.push({ ok: false, mot: `Ta bio est trop longue pour un profil qu'on scanne en deux secondes. Coupe la moitié : ce qui reste sera plus fort.` });
  else if (bio) points.push({ ok: false, mot: `Ta bio est trop courte pour dire quoi que ce soit d'utile. Il te manque au moins le pour-qui et le résultat.` });

  if (destination && !bio) score = 30;

  return {
    handle,
    bio,
    destination,
    score: E.clamp(score),
    points,
    verdictDestination: destination
      ? (/(gratuit|guide|newsletter|liste|pdf|checklist)/i.test(destination)
        ? `Derrière ton lien, tu proposes quelque chose de gratuit. C'est la bonne marche : on ne demande pas un achat à quelqu'un qui découvre ton profil.`
        : `Derrière ton lien, on tombe directement sur ton offre.\n\nÇa marche pour ceux qui sont déjà chauds. Pour tous les autres — la majorité — c'est trop tôt, et cette marche-là est trop haute.`)
      : null,
    bioReecrite: construireBio(state),
  };
}

function construireBio(state) {
  const cible = (state.business.cible || "").trim();
  const resultat = (state.business.resultat || "").trim();
  const preuve = (state.offre.differenciation || "").trim();
  if (!cible && !resultat) return null;

  const lignes = [];
  if (resultat && cible) lignes.push(`${majuscule(resultat)}.`);
  else if (resultat) lignes.push(`${majuscule(resultat)}.`);
  if (cible) lignes.push(`Pour ${minuscule(cible)}.`);
  if (preuve) lignes.push(majuscule(preuve).replace(/\.$/, "") + ".");
  lignes.push(`↓ La méthode, gratuitement`);
  return lignes.join("\n");
}

/* Ses propres mots, ressortis au moment où ça fait mal. */

function ancragesPersonnels(state, scores, cle) {
  const a = [];
  const promesse = (state.offre.promesse || "").trim();
  const cout = (state.offre.coutInaction || "").trim();
  const diff = (state.offre.differenciation || "").trim();
  const urgence = (state.offre.urgence || "").trim();

  if (promesse) {
    a.push({
      titre: "Ta promesse, telle que tu me l'as donnée",
      citation: promesse,
      mot: promesse.length < 30
        ? `Relis-la à voix haute.\nElle tient en un souffle, mais elle ne dit ni pour qui, ni en combien de temps.\nC'est une intention, pas encore une promesse.`
        : (/\d/.test(promesse)
          ? `Il y a un chiffre dedans. C'est déjà plus que la plupart.\nVérifie maintenant qu'un client saurait la répéter de mémoire — c'est le vrai test.`
          : `Aucun chiffre, aucun délai.\nDonc rien à vérifier. Donc rien à croire, et rien à comparer.`),
    });
  }
  if (cout) {
    a.push({
      titre: "Ce que tu dis qu'il risque",
      citation: cout,
      mot: /\d/.test(cout)
        ? `Tu as chiffré. Très bien.\nMaintenant la vraie question : est-ce que ce chiffre apparaît quelque part dans tes Threads ?\nParce que pour l'instant, il est dans ce formulaire. Pas dans la tête de ton prospect.`
        : `Tu le décris, tu ne le chiffres pas.\nUn risque flou ne fait pas bouger. Un risque chiffré, si.\nMets un nombre là-dedans, même approximatif.`,
    });
  } else {
    a.push({
      titre: "Ce que tu dis qu'il risque",
      citation: null,
      mot: `Tu as laissé cette case vide.\n\nC'est la case la plus lourde du questionnaire.\nSi tu ne sais pas ce qu'il perd à ne rien faire, lui non plus ne le sait pas.\nEt personne ne paye pour éviter un risque qu'il n'a jamais vu.`,
    });
  }
  if (diff && cle !== "offre") {
    a.push({
      titre: "Pourquoi toi",
      citation: diff,
      mot: `Garde cette phrase. Elle est plus utile dans tes Threads que sur ta page de vente — c'est avant le clic qu'on choisit, pas après.`,
    });
  }
  if (!urgence && cle === "desir") {
    a.push({
      titre: "Pourquoi maintenant",
      citation: null,
      mot: `Vide aussi.\n\nSans raison d'agir aujourd'hui, ton offre attend patiemment son tour derrière quinze autres priorités.\nEt ce tour n'arrive jamais.`,
    });
  }
  return a;
}

function ouverture(state, scores, principale, cas, prenom) {
  const a = state.audience;
  const lignes = [];
  const salut = prenom ? `Bon. ${prenom}.\n\n` : "";

  if (cas === "VANITY_ALERT") {
    lignes.push(`${nombreFr(a.vuesMois)} vues par mois. Zéro vente.`);
    lignes.push(`Tes vues prouvent une chose : tu sais attirer l'attention.\nElles ne prouvent rien d'autre.\n\nSurtout pas qu'il existe une demande pour ce que tu vends.`);
  } else if (cas === "ZERO_VENTE") {
    lignes.push(`${nombreFr(a.abonnes)} abonnés. Zéro vente ce mois-ci.`);
    lignes.push(`Zéro vente ne veut pas dire zéro demande.\nÇa veut dire qu'on ne sait pas encore où ça casse.\n\nC'est exactement ce qu'on cherche ici.`);
  } else if (cas === "PEPITE_CACHEE") {
    lignes.push(`Peu de vues. Et pourtant, des ventes.`);
    lignes.push(`Ne change surtout pas tout.\nTon système commercial fonctionne — il fonctionne dans une pièce presque vide.\n\nLe levier n'est pas l'offre. C'est le monde qui passe devant.`);
  } else if (cas === "CLICS_SANS_VENTES") {
    lignes.push(`${nombreFr(a.clicsOffre)} clics. Presque aucune vente derrière.`);
    lignes.push(`Ton contenu fait son travail : il fait cliquer.\nCe qui casse, ça casse après le clic.`);
  } else if (cas === "VISITES_SANS_CLICS") {
    lignes.push(`Du monde sur ton profil. Presque personne qui va plus loin.`);
    lignes.push(`On vient voir qui tu es. On repart sans rien.\nEntre les deux, il y a ta bio et ta première impression.`);
  } else {
    lignes.push(`${nombreFr(a.abonnes)} abonnés, ${nombreFr(a.vuesMois)} vues, ${nombreFr(a.ventesMois)} vente(s) par mois.`);
    lignes.push(`On ne va pas discuter de ces chiffres.\nOn va chercher l'endroit précis où ils arrêtent de se transformer en argent.`);
  }
  lignes[1] = salut + lignes[1];
  return lignes;
}

function lectureDesChiffres(state, scores) {
  const a = state.audience;
  const lignes = [];

  if (a.vuesMois > 0) {
    const p = window.CashEngine.paliersVues(a.vuesMois);
    lignes.push(`${nombreFr(a.vuesMois)} vues sur 30 jours — sur l'échelle Threads, c'est *${p.label}*.`);
  }
  if (a.abonnes > 0 && a.vuesMois > 0) {
    const ratio = a.vuesMois / a.abonnes;
    if (ratio > 4) lignes.push(`${ratio.toFixed(1)} vues par abonné : l'algorithme te sort de ton cercle. C'est rare, garde ça.`);
    else if (ratio < 1) lignes.push(`Moins d'une vue par abonné. Même ceux qui t'ont suivi ne te voient plus passer.`);
    else lignes.push(`${ratio.toFixed(1)} vue par abonné : tu tournes surtout dans ton propre cercle.`);
  }
  if (a.vuesMois > 0 && a.visitesProfil > 0) {
    const t = (a.visitesProfil / a.vuesMois) * 100;
    lignes.push(t < 1
      ? `${t.toFixed(1)} % des vues vont jusqu'à ton profil. On te lit sans jamais se demander qui tu es.`
      : `${t.toFixed(1)} % des vues passent par ton profil — la curiosité existe.`);
  }
  if (a.visitesProfil > 0 && a.clicsOffre > 0) {
    const t = (a.clicsOffre / a.visitesProfil) * 100;
    lignes.push(t < 5
      ? `Sur ton profil, ${t.toFixed(1)} % cliquent vers ton offre. Ta bio ne fait pas son travail.`
      : `${t.toFixed(1)} % de ton profil clique vers ton offre. C'est correct.`);
  }
  if (a.clicsOffre > 0) {
    const t = (a.ventesMois / a.clicsOffre) * 100;
    lignes.push(t === 0
      ? `${nombreFr(a.clicsOffre)} clics, aucune vente. Le trafic n'est pas ton problème.`
      : `${t.toFixed(1)} % des clics finissent en vente.`);
  }
  if (lignes.length === 0) lignes.push(`Tu n'as pas renseigné tes chiffres — le diagnostic s'appuie donc uniquement sur tes textes.`);
  return lignes;
}

function arretUniversel(state, graine) {
  return pioche([
    `Arrête de juger un post à ses vues. Un post à 200 vues peut te ramener un client, un post à 50 000 peut ne rien ramener du tout.`,
    `Arrête de publier pour tenir un rythme. Le rythme n'a jamais convaincu personne.`,
    `Arrête d'ajouter. Enlève d'abord.`,
  ], graine);
}
function commenceUniversel(state, graine) {
  return pioche([
    `Commence à noter, chaque semaine, le seul chiffre qui compte : combien de personnes sont passées à l'étape suivante.`,
    `Commence à relire tes posts à voix haute avant de publier. Ce qui sonne écrit ne se vend pas.`,
    `Commence à garder les phrases exactes de tes clients. Ce sont tes meilleurs hooks, et ils sont gratuits.`,
  ], graine);
}

function autopsieOffre(state, scores) {
  const E = window.CashEngine;
  const o = state.offre;
  const nDiff = E.occ(o.differenciation || "", E.Dico.differenciation);
  const preuves = (o.preuves || []).filter(p => p !== "aucune");
  return {
    promesse: { score: E.clamp(((o.promesse || "").length / 110) * 100, 8, 92),
      mot: (o.promesse || "").length < 25 ? `Trop courte pour dire quoi que ce soit, ou pas encore écrite.` : `Elle existe. Reste à savoir si on la répète après l'avoir lue une fois.` },
    specificite: { score: /\d/.test(o.promesse || "") || /\d/.test(state.business.resultat || "") ? 70 : 28,
      mot: /\d/.test(o.promesse || "") || /\d/.test(state.business.resultat || "") ? `Il y a un chiffre. C'est ce qui rend une promesse vérifiable.` : `Aucun chiffre nulle part. Donc rien à vérifier, donc rien à croire.` },
    desir: { score: scores.desir, mot: scores.desir < 50 ? `On comprend l'offre. On ne la veut pas encore.` : `L'envie existe. Ne la gâche pas avec une sortie molle.` },
    differenciation: { score: E.clamp(nDiff * 30 + ((o.differenciation || "").length / 120) * 45, 10, 90),
      mot: nDiff === 0 ? `Rien qui te distingue explicitement. Du coup, on te compare au moins cher.` : `Tu poses une différence. Vérifie qu'un client saurait la répéter.` },
    valeurPercue: { score: E.clamp(scores.offre * 0.6 + scores.conviction * 0.4),
      mot: state.business.prix >= 200 && preuves.length < 2 ? `À ce prix-là, il manque des preuves pour que la valeur tienne debout.` : `Le rapport prix / preuves tient à peu près.` },
    confiance: { score: scores.conviction,
      mot: preuves.length === 0 ? `Zéro preuve déclarée. C'est le premier chantier, avant tout le reste.` : `${preuves.length} type(s) de preuve. Sers-t'en dans le contenu, pas seulement sur ta page de vente.` },
  };
}

function repartitionClassifications(analyses) {
  const total = analyses.length || 1;
  const compte = {};
  analyses.forEach(a => { compte[a.classification] = (compte[a.classification] || 0) + 1; });
  const r = {};
  ["ATTIRER", "CONNECTER", "ÉDUQUER", "DÉSIRER", "CONVERTIR", "AUTORITÉ"].forEach(c => {
    r[c] = Math.round(((compte[c] || 0) / total) * 100);
  });
  return r;
}

function plan7Jours(cle, state) {
  const commun = [
    { jour: 2, action: `Nomme le problème`, detail: `Un post entier sur ce que vit ton prospect. Pas de solution dedans. Juste la scène.` },
    { jour: 3, action: `Montre l'écart`, detail: `Sa vie maintenant, sa vie après. Deux scènes, rien entre les deux.` },
    { jour: 4, action: `Prends l'objection de face`, detail: `Celle qui te dérange parce qu'elle est un peu vraie. Donne-lui raison, puis montre ce qu'elle rate.` },
    { jour: 5, action: `Sors une preuve`, detail: `Petite, datée, vraie. Un prénom, une durée, un chiffre.` },
    { jour: 6, action: `Chiffre l'inaction`, detail: `Ce que ça coûte d'attendre six mois de plus. En euros ou en heures.` },
    { jour: 7, action: `Fais une offre nette`, detail: `Une action. Une phrase. Un lien. Rien d'autre dans le post.` },
  ];
  const jour1 = {
    attention: { action: `Réécris tes 3 prochaines accroches`, detail: `Rien d'autre aujourd'hui. Les accroches seules, sans les posts.` },
    attractionAcheteur: { action: `Écris qui tu n'aides pas`, detail: `Publie-le. Assume de perdre des abonnés : ce sont ceux qui faussaient tes chiffres.` },
    connexion: { action: `Raconte un souvenir précis`, detail: `Date, heure, ce que tu ressentais. Zéro leçon à la fin.` },
    desir: { action: `Réécris ta promesse`, detail: `Avant de publier quoi que ce soit. Deux scènes : avant, après.` },
    conviction: { action: `Sors ta meilleure preuve`, detail: `La plus petite et la plus vraie. Avec un nom, une durée, un chiffre.` },
    offre: { action: `Reconstruis ton offre en une phrase`, detail: `Pour qui, quel résultat, en combien de temps. Si ça fait trois lignes, recommence.` },
    conversion: { action: `Choisis une seule action`, detail: `Une. Et vérifie ce qu'on trouve juste derrière le clic.` },
  }[cle];
  return [{ jour: 1, ...jour1 }, ...commun];
}

function threadsPrets(cle, state, graine) {
  const cible = state.business.cible || "";
  const resultat = state.business.resultat || "";
  const morceauCible = tronquer(minuscule(cible), 60);

  const universels = [
    {
      objectif: "Reconnaissance du problème",
      texte: `Il y a un moment que personne ne raconte.\n\nCelui où tu publies un truc dont tu es fier, où tu fermes l'appli, et où tu la rouvres douze minutes plus tard.\n\n11 vues.\n\nTu ne le dis à personne. Moi non plus je ne le disais pas.\n\nEt pourtant le problème n'était pas là où je le cherchais.`,
    },
    {
      objectif: "Désir",
      texte: `Tu peux continuer exactement comme maintenant.\nSincèrement, c'est une option.\n\nDans six mois tu auras cent quatre-vingts posts de plus.\nUn peu plus d'abonnés.\nLa même conversation avec toi-même le dimanche soir.\n\nCe n'est pas dramatique.\nC'est juste très cher.`,
    },
    {
      objectif: "Transition vers l'offre",
      texte: `On me demande souvent par où commencer.\n\nCe n'est pas par publier plus.\nCe n'est pas par un nouveau format.\n\nC'est par la seule question qui coûte de l'argent quand on l'évite :\nqu'est-ce que la personne en face gagne exactement, et en combien de temps ?\n\n${resultat ? `Chez moi la réponse tient en une ligne : ${minuscule(resultat)}.` : `Si tu ne peux pas répondre en une ligne, tu as trouvé ton chantier.`}`,
    },
  ];

  const specifiques = {
    attention: {
      objectif: "Accroche",
      texte: `J'ai relu mes 20 derniers posts hier soir.\nUniquement les premières lignes, à la suite.\n\nC'était un désastre.\n\nPas parce que c'était mal écrit.\nParce que pas une seule ne donnait envie de lire la deuxième.`,
    },
    attractionAcheteur: {
      objectif: "Tri d'audience",
      texte: `Ce post ne s'adresse pas à tout le monde.\n\n${morceauCible ? `Il s'adresse à une seule personne :\n${morceauCible}.` : `Il s'adresse à une personne très précise.`}\n\nSi ce n'est pas toi : aucun souci, tu peux passer.\nSi c'est toi, tu sais déjà de quoi je vais parler.`,
    },
    connexion: {
      objectif: "Confession",
      texte: `23h47.\n\nJe me souviens de l'heure parce que j'ai regardé l'écran avant de tout fermer.\n\nJ'avais passé la journée à écrire un truc dont j'étais content.\nEt cette phrase tournait en boucle : « je suis peut-être juste pas fait pour ça ».\n\nJe ne raconte pas ça pour la leçon.\nJe le raconte parce que tu es peut-être exactement là, ce soir.`,
    },
    desir: {
      objectif: "Création de désir",
      texte: `Ton contenu n'est pas mauvais.\n\nC'est presque pire.\n\nIl est assez bon pour qu'on te lise.\nPas assez pour qu'on ait envie.\n\nEntre « c'est intéressant » et « il me le faut », il y a un gouffre.\nEt personne ne le franchit tout seul.`,
    },
    conviction: {
      objectif: "Preuve",
      texte: `Je ne vais pas te promettre de doubler quoi que ce soit.\n\nJe vais te raconter trois semaines.\n\nCelles de quelqu'un qui publiait depuis huit mois sans jamais rien vendre, et qui a changé une seule chose avant de toucher à son contenu.\n\nLa suite tient en une ligne — et c'est justement ce qui rend le truc crédible.`,
    },
    offre: {
      objectif: "Clarté d'offre",
      texte: `« Tu fais quoi, déjà ? »\n\nPendant longtemps, j'ai bafouillé à cette question.\nJ'expliquais. Je nuançais. Je voyais le regard partir.\n\nAujourd'hui je réponds en une phrase.\nEt on me demande le prix.\n\nLe travail n'a pas changé. La phrase, si.`,
    },
    conversion: {
      objectif: "Passage à l'action",
      texte: `Tu n'as pas un problème de trafic.\n\nTu as un problème de porte.\n\nDes gens arrivent, lisent, hochent la tête… et repartent parce qu'il n'y a rien à pousser.\n\nUne seule action à la fin d'un post. Pas trois.\nTrois options, c'est zéro décision.`,
    },
  };

  return [specifiques[cle], universels[graine % universels.length], universels[(graine + 1) % universels.length]];
}

/* ============================================================
   LA SUITE — quel programme pour quelle fuite
   ============================================================ */

const PROGRAMMES = {
  attention: { nom: "L'INFILTRATION ZEIGARNIK™",
    pourquoi: `Ta fuite se situe avant la lecture.\nC'est exactement le terrain de l'Infiltration Zeigarnik : ouvrir des boucles que le cerveau ne supporte pas de laisser fermées.` },
  attractionAcheteur: { nom: "LE CODE SECTAIRE™",
    pourquoi: `Tu attires du monde. Pas ton monde.\nLe Code Sectaire, c'est l'art de construire un cercle qui se reconnaît, se trie tout seul, et reste.` },
  connexion: { nom: "LE CODE SECTAIRE™",
    pourquoi: `Il te manque l'appartenance.\nLe Code Sectaire travaille précisément ça : passer d'une audience qui t'écoute à un cercle qui se reconnaît en toi.` },
  desir: { nom: "INCEPTION GAME™",
    pourquoi: `C'est la fuite la plus rentable à réparer.\nInception Game, c'est implanter l'envie avant même de présenter quoi que ce soit.` },
  conviction: { nom: "PSYCHÉ CAPITAL™",
    pourquoi: `L'envie est là, la preuve manque.\nPsyché Capital, c'est construire le capital de crédibilité qui fait taire le doute sans jamais hausser le ton.` },
  offre: { nom: "INGÉNIERIE DE L'EMPRISE™",
    pourquoi: `Le problème est structurel, pas cosmétique.\nIngénierie de l'Emprise, c'est construire une offre dont on a du mal à se détacher.` },
  conversion: { nom: "VIREMENT NOBLE™",
    pourquoi: `Tout est prêt sauf la dernière marche.\nVirement Noble, c'est rendre le passage à l'achat évident — et légitime pour celui qui le fait.` },
};

if (typeof window !== "undefined") {
  window.CashRapport = { genererRapport, ANGLES_DESIR, anglesPourLui, FUITES, ATELIERS, PROGRAMMES, majuscule, minuscule };
}
