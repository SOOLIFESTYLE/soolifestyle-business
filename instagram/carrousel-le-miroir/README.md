# Carrousel Instagram — « Le miroir »

7 slides, 1080 × 1350 px, prêtes à poster.
Les PNG finaux sont dans `export/`, dans l'ordre de publication.

## Direction artistique

| | |
|---|---|
| Rouge | `#db0000` |
| Noir | `#0b0b0b` |
| Blanc | `#ffffff` |
| Display | Playfair Display (500 / 600, romain + italique) |
| Texte & habillage | Jost (300 / 400 / 500) |
| Marges | 100 px |

Rythme : slides 1 et 7 en noir (les deux faces du miroir), slides 2 à 6 en blanc.
Le rouge ne sert qu'à une chose par slide — un mot, une règle, un chiffre. Jamais deux.

## Habillage constant

- **Compteur** en haut à droite : `1 / 5` → `5 / 5`, chiffre courant en rouge.
  La couverture affiche `5 MÉCANISMES` (elle ouvre le compteur, elle ne le numérote pas).
- **Nom du mécanisme** en haut à gauche, rouge, petites capitales espacées.
- **Filigrane** `@soolifestyle` en bas à gauche, sur les 7 slides.
- **Jauge rouge** collée au bord bas : 0 % en couverture → 100 % à la fin.
  Elle fait le travail du compteur même quand l'œil ne lit pas le coin.
- `swipe →` en bas à droite, couverture uniquement.

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
- 25 mots maximum par slide.
- Corps de texte à 43 px, accroches à 70 px : lisible sans zoomer.
- Aucune ligne orpheline — les césures sont posées à la main dans `slides.html`.
