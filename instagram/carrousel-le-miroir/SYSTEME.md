# Le système de couverture

Une DA qui tient cent carrousels, ce n'est pas une belle image.
C'est une liste de choses qu'on ne touche jamais, et une liste de choses qui tournent.

---

## Ce qu'on ne touche jamais

Ce sont les invariants. Ils sont dans le `CSS` de `build-covers.js`.
Si l'un d'eux change, ce n'est plus le même compte.

| | |
|---|---|
| Fond | `#f7f5f0` — blanc chaud, jamais pur |
| Encre | `#0c0c0c` |
| Rouge | `#db0000` — une seule et même valeur partout |
| Display | Playfair Display 600, capitales |
| Chute | Playfair Display 500 italique |
| Habillage | Jost, 19 px, interlettrage `.3em` |
| Format | 1080 × 1350 |
| Marge | 72 px |

**Les quatre coins**, identiques sur chaque post :
`SOOLIFESTYLE™` en haut à gauche · `PSYCHOLOGIE · INFLUENCE` en haut à droite ·
`›››` rouge en bas à droite · jauge de progression collée au bord bas.

**La structure**, identique sur chaque post :

```
trois lignes de capitales serif, dont UNE surlignée en rouge
une ligne en italique, petite
un mot en capitales rouges, grand
```

**La règle du rouge** : une seule masse rouge dans le titre, une seule dans la chute.
Jamais trois. Le rouge marque ce qui pique, pas ce qui est important.

---

## Ce qui tourne

### Le texte

Dans `posts.json`. Une entrée par carrousel.

```json
{
  "id": "disparu",
  "layout": "decalage",
  "size": 104,
  "lines": ["Il a dit oui.", "Puis il a", "disparu."],
  "hi": 2,
  "ital": "Ce n’est pas",
  "why": "Un hasard."
}
```

`hi` désigne la ligne surlignée (0, 1 ou 2).
Elle porte le mot qui pique — le plus souvent la dernière, parfois la première
quand c'est elle qui accroche.

`size` : 104 pour trois lignes courtes, 92 à 100 si une ligne dépasse 15 signes.
Au-delà de 17 signes, coupe autrement.

### Les gabarits

Six façons de casser la symétrie. C'est ce qui empêche le feed de devenir plat.

| Gabarit | Ce qu'il casse | À utiliser quand |
|---|---|---|
| `debord` | le mot de chute sort du cadre par les deux côtés | la chute fait 8 signes ou plus |
| `decalage` | fer à gauche, le surligneur sort par la gauche | par défaut, le plus tenable |
| `compression` | interlignage écrasé, aucun filet | le titre est long |
| `inclinaison` | le surligneur penche de 2,6° | le titre est court et net |
| `desequilibre` | tout tombe en bas, le haut reste vide | la chute est brève et sèche |
| `bande` | le surligneur traverse toute la largeur | une ligne entière est la punchline |

La taille du `debord` se calcule toute seule pour que le mot déborde quoi qu'il arrive.

---

## La règle de rotation

Jamais deux fois le même gabarit à la suite.
Jamais deux fois le même sur une ligne de trois dans la grille.

Sur un mois de publication, ça donne à peu près :
`decalage` 30 % · `debord` 20 % · `compression` 20 % ·
`inclinaison` 15 % · `desequilibre` 10 % · `bande` 5 %.

Le `bande` est le plus voyant, donc le plus vite lassant. Garde-le pour les posts
qui comptent.

---

## Fabriquer

Ajoute une entrée dans `posts.json`, puis :

```bash
node build-covers.js
```

Un PNG par entrée dans `export/couvertures/`, nommé `<id>-<gabarit>.png`.
`covers.html` est régénéré à chaque passage — ne l'édite pas à la main, il est écrasé.

---

## Faire évoluer sans casser

Quand le feed commencera à lasser — vers le quarantième post, pas avant —
n'ajoute pas une couleur et ne change pas la typo. Ajoute **un gabarit**.

Un gabarit se construit en répondant à une seule question :
*quelle règle du système est-ce que je casse ?*

Pistes non encore utilisées : le titre qui sort par le haut, deux surligneurs
sur la même ligne, le mot de chute retourné, la chute placée avant le titre,
le surligneur en filet plutôt qu'en aplat.

Chacune se code en une dizaine de lignes dans `LAYOUTS`, et se teste
en la posant dans la grille des neuf.
