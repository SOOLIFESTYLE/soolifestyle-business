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

**La règle de casse**, de la couverture au CTA :
**la ligne qui pose est en minuscules, la ligne qui pique est en capitales.**
Les capitales occupent toute la hauteur de capitale sur chaque lettre — à taille
égale le bloc pèse presque deux fois plus. On les descend donc à **0,92 fois**
la taille de base. Détail et contraintes de largeur plus bas.

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

`case` : `true` pour appliquer la règle de casse. Toujours, désormais.

`size` : les minuscules ont une hauteur d'x basse, il leur faut du corps.
104 à 116 sur une couverture, 88 à 112 à l'intérieur. La contrainte
qui décide, c'est la largeur de la ligne surlignée — voir le tableau
du contraste de casse.

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
| `filet` | le surligneur perd son aplat, il devient un contour | la ligne surlignée est longue, ou le feed a besoin d'air |

La taille du `debord` se calcule toute seule pour que le mot déborde quoi qu'il
arrive — plafonnée à 340 px, de quoi faire sortir du cadre un mot de six signes.

---

## La règle de rotation

Jamais deux fois le même gabarit à la suite.
Jamais deux fois le même sur une ligne de trois dans la grille.

Sur un mois de publication, ça donne à peu près :
`decalage` 25 % · `debord` 20 % · `compression` 20 % ·
`inclinaison` 15 % · `filet` 10 % · `desequilibre` 5 % · `bande` 5 %.

Le `bande` est le plus voyant, donc le plus vite lassant. Garde-le pour les posts
qui comptent.

---

## L'intérieur du carrousel

Sept slides : une couverture, cinq mécanismes, un CTA.

Le problème de l'intérieur n'est pas d'être lisible. **C'est d'être quitté.**
Cinq slides construites pareil, c'est cinq fois la même charge de lecture :
l'œil s'installe, puis décroche. Trois leviers tiennent le pouce.

### 1. Trois rythmes, alternés

| Rythme | Ce qu'il fait | Charge de lecture |
|---|---|---|
| `pose` | on pose le mécanisme et on l'explique | normale |
| `claque` | une phrase, énorme, presque rien autour | quasi nulle |
| `bascule` | on explique, puis une phrase retourne tout en capitales rouges | normale, fin brutale |

La `claque` est la respiration. Elle ne coûte rien à lire, donc le swipe
suivant est gratuit. Place-la au milieu, jamais en deuxième ni en dernière.

Alternance du carrousel « Le miroir » : pose · bascule · pose · **claque** · bascule.

### 2. Chaque slide annonce la suivante

En bas à droite, à la place de la flèche : `SUIVANT · LA BOUCLE OUVERTE ›››`.

On ne swipe pas vers du vide, on swipe vers un nom. C'est une boucle ouverte
par slide — le mécanisme même que le carrousel décrit.
La dernière mécanique annonce `LA DÉMONSTRATION` : le CTA devient un rendez-vous,
pas une interruption.

### 3. Le contraste de casse

Tout dans la même casse, c'est un seul poids : rien ne ressort.

**La ligne qui pose est en minuscules. La ligne qui pique est en capitales.**

```
Le dernier agit           minuscules, 96 px — ça raconte
APRÈS TA LECTURE.         capitales, 0,92× — surlignées, ça claque
```

Les capitales occupent toute la hauteur de capitale sur chaque lettre :
à taille égale, le bloc pèse presque deux fois plus que des minuscules.
On les descend donc à **0,92 fois** la taille de base — elles dominent
quand même, et sans écraser la ligne du dessus.

Même police, même ligne, deux textures. C'est le contraste le moins cher
du système : il ne coûte ni couleur, ni élément, ni place.

La bascule suit la même règle : elle pique, donc **capitales rouges**.

**Attention à la largeur.** En capitales, Playfair avance d'environ
0,58 em par signe. La ligne surlignée ne doit pas dépasser :

| Taille de base | Signes max sur la ligne surlignée |
|---|---|
| 88 px | 19 |
| 96 px | 17 |
| 112 px | 15 |

Au-delà, elle passe à la ligne et le surligneur devient un pavé.

### 4. Un horizon fixe

Le bloc ne flotte plus au milieu : il **pose** sur une ligne identique
d'une slide à l'autre. Quand on swipe, le texte ne saute pas.

### 5. L'accroche grossit

74 px sur le premier mécanisme, 88 px sur le dernier. Le carrousel accélère
sans le dire. Personne ne le remarque, tout le monde le sent.

### La structure d'une slide-mécanisme

```
— NOM DU MÉCANISME        Jost, tiret rouge, capitales espacées
La ligne qui pose         Playfair minuscules
LA LIGNE QUI PIQUE        Playfair capitales, 0,92×, surlignée en rouge
▬                         filet rouge
corps en Jost 300         une à trois lignes courtes
LA BASCULE                capitales rouges, rythme bascule seul
                          SUIVANT · <le prochain> ›››
```

Compteur `1/5` → `5/5` en haut à droite. La jauge du bas avance de `i/7`.

### La slide finale (7)

**Fond noir profond `#080808`. Toujours.** Seule slide sombre du carrousel :
la rupture signale la fin autant que le texte.

Pas de surligneur sur le titre. Pas de flèche — il n'y a plus rien après.
Pas de bouton non plus : le CTA demande deux gestes, enregistrer et
s'abonner, et un bouton n'en porte qu'un.

La promesse passe en capitales rouges — `DEMAIN, UNE RÈGLE DE PLUS.` —
et l'action suit en dessous, avec `@soolifestyle` surligné.
Le compte est la seule masse rouge de la ligne : l'œil tombe dessus,
c'est lui qu'on va chercher.

En haut à droite, la catégorie revient à la place du compteur.
Le carrousel se referme comme il s'est ouvert.

---

## Fabriquer

Un carrousel = un fichier dans `carrousels/`.

```bash
node build-carrousel.js le-miroir
```

Sept PNG dans `export/<id>/`, numérotés dans l'ordre de publication.

Pour tester des couvertures en série sans écrire les carrousels entiers,
`posts.json` + `node build-covers.js` sortent les vignettes dans
`export/couvertures/`.

### Où vit quoi

| Fichier | Rôle |
|---|---|
| `da.js` | **les invariants.** Palette, typo, habillage, jauge. Un seul endroit. |
| `layouts-couverture.js` | les six gabarits de tension de la couverture |
| `rythmes.js` | les trois rythmes de l'intérieur |
| `build-carrousel.js` | la slide finale et le rendu |
| `carrousels/*.json` | le texte d'un carrousel |
| `posts.json` | des couvertures seules, pour tester le feed |

Rien de graphique ne doit être écrit ailleurs que dans `da.js`.
Si tu te surprends à coller une couleur en dur dans un gabarit, c'est que
l'invariant manque — ajoute-le à `da.js`.

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
