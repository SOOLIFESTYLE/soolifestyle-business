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

### 3. L'accroche grossit

74 px sur le premier mécanisme, 88 px sur le dernier. Le carrousel accélère
sans le dire. Personne ne le remarque, tout le monde le sent.

### La structure d'une slide-mécanisme

```
— NOM DU MÉCANISME        Jost, tiret rouge, capitales espacées
ACCROCHE EN CAPITALES     Playfair, dont UNE ligne surlignée en rouge
▬                         filet rouge
corps en Jost 300         une à trois lignes courtes
[LA BASCULE]              capitales rouges, seulement sur le rythme bascule
                          SUIVANT · <le prochain> ›››
```

Compteur `1/5` → `5/5` en haut à droite. La jauge du bas avance de `i/7`.

### La slide finale (7)

**Fond noir profond `#080808`. Toujours.** Seule slide sombre du carrousel :
la rupture signale la fin autant que le texte.

Pas de surligneur — le bouton rouge doit être la seule masse rouge.
Pas de flèche — il n'y a plus rien après.

Et surtout : **un bloc `DEMAIN`** qui annonce le sujet du prochain carrousel,
en italique, derrière un filet rouge vertical. C'est lui qui fait l'abonnement,
pas le bouton. « Abonne-toi » demande un service ; « demain, pourquoi tu dis oui
en pensant non » donne une raison.

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
