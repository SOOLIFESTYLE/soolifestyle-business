# soolifestyle-business

## THREADYPRENEURS CASH SCANNER™

Outil de diagnostic psychologique et commercial pour les Threadypreneurs
(solopreneurs, freelances, créateurs de contenu et infopreneurs actifs sur Threads).

Le scanner analyse l'audience, le positionnement, l'offre et 5 Threads récents
pour identifier la fuite principale sur le parcours :

```
ATTENTION → INTÉRÊT → CONFIANCE → DÉSIR → CONVICTION → ACTION → ACHAT
```

Il en ressort un **Cash Report™** : score global, Indice de Fuite, autopsie de
l'offre, analyse des Threads, carte des objections, plan de réparation 7 jours,
angles de désir, Threads prêts à publier et prochaine action prioritaire.

### Lancer l'outil en local

C'est une application statique (HTML/CSS/JS vanilla, sans dépendances ni build).

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

### Fichiers

- `index.html` — le funnel (5 écrans) et le conteneur du rapport.
- `style.css` — le branding (noir / blanc / rouge `#DB0000`).
- `engine.js` — le moteur de scoring (7 scores, score global, Indice de Fuite,
  détection des cas particuliers, profil de vente).
- `rapport.js` — tous les textes du diagnostic, les 10 angles de désir, les
  phrases à voler, et les **ateliers de réparation** (un par fuite).
- `app.js` — l'interface : navigation du funnel, collecte des réponses,
  rendu du rapport, atelier, historique des scans (stockage local navigateur).

### L'atelier

Le rapport ne s'arrête pas au diagnostic. Le bouton final ouvre l'atelier
correspondant à la fuite détectée : 3 questions, puis un texte assemblé à
partir des réponses, prêt à publier (post, promesse reconstruite, appels à
l'action calibrés selon la fuite).

### Comment la fuite est choisie

Le moteur ne prend pas simplement le score le plus bas. Une fuite en amont
rend les suivantes illisibles — inutile de parler désir à quelqu'un que
personne ne lit. Un arbre de règles (`fuitePrioritaire` dans `engine.js`)
tranche dans l'ordre : offre cassée → audience hors-sujet → attention →
qualification → connexion → désir → conviction → offre → action.

### Principe directeur du moteur

> Les vues sont une métrique d'attention.
> Les ventes sont une métrique de désir + confiance + action.

Le moteur ne présente jamais une hypothèse comme une certitude : les
diagnostics sont formulés en « tes données suggèrent », « le signal le plus
probable », etc.
