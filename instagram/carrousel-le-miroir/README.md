# Carrousel Instagram — « Le miroir »

7 slides, 1080 × 1350 px, prêtes à poster.
Les PNG finaux sont dans `export/`, dans l'ordre de publication.

Le carrousel suit la DA du compte : celle de `LE JEU HUMAIN`.

## Direction artistique

| | |
|---|---|
| Rouge | `#db0000` |
| Noir | `#0c0c0c` |
| Ivoire (blanc chaud) | `#edebe6` |
| Display | Playfair Display (500 / 600, romain + italique) |
| Texte & habillage | Jost (300 / 400 / 500) |
| Marges | 88 px |

**Alternance stricte** : 1 noir, 2 ivoire, 3 noir, 4 ivoire, 5 noir, 6 ivoire, 7 noir.
Le carrousel ouvre et ferme dans le noir — les deux faces du miroir.

**Le rouge ne sert qu'à une chose par slide.** Un mot, un trait, un point. Jamais deux.

## Habillage — les quatre coins

Repris tel quel de la DA :

| Position | Contenu |
|---|---|
| Haut gauche | compteur `0/5` → `5/5`, le `/5` à 42 % d'opacité |
| Haut droite | `SOOLIFESTYLE™` |
| Bas gauche | `LE MIROIR™` (la série) |
| Bas droite | `→` |

## Structure d'une slide-mécanisme (2 à 6)

```
— NOM DU MÉCANISME        tiret rouge + sans, capitales espacées
Accroche en serif         2 lignes, la seconde en rouge italique
▬                         filet rouge, 72 px
Corps en sans léger       1 à 3 lignes courtes
```

Les slides 1 et 7 sortent du moule : serif en capitales pour la couverture,
composition centrée + bouton rouge pour la fin.

## Les décors

Aucune photo : tout est en SVG inline dans `slides.html`, sous le texte,
à basse opacité. Un motif par slide, qui dit le mécanisme sans l'illustrer.

| Slide | Motif |
|---|---|
| 1 | deux arcs symétriques et un axe rouge — le miroir |
| 2 | un trait de lumière oblique — ce qui attire l'œil |
| 3 | une porte entrouverte, fente rouge — la boucle ouverte |
| 4 | une sphère sombre à liseré rouge, en bascule — l'engagement |
| 5 | une mire : cercles et croix, point rouge au centre — la tache aveugle |
| 6 | des verticales qui se rapprochent — la simple exposition |
| 7 | halo rouge et arcs du miroir, en rappel de la couverture |

## Refabriquer les images

Toute modification se fait dans `slides.html` (un `<div class="slide">` par slide), puis :

```bash
node build.js
```

Les 7 PNG sont réécrits dans `export/`. Playwright + Chromium, capture par élément,
donc le cadrage 1080 × 1350 est garanti sans recadrage manuel.

Les polices sont versionnées dans `fonts/` (Google Fonts, licence OFL) : le rendu est
identique partout, sans connexion.

## Règles de fabrication respectées

- 1080 × 1350 sur les 7 slides.
- 25 mots maximum par slide, habillage non compris.
- Corps de texte à 39 px, accroches à 60-64 px : lisible sans zoomer.
- Aucune ligne orpheline — les césures sont posées à la main dans `slides.html`.
- Le décor ne passe jamais devant le texte (`z-index` : décor 0, texte 1, habillage 2).
