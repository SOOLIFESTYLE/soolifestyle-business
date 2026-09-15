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
- `rapport.js` — la génération des 20 sections du diagnostic (textes,
  recommandations, plan d'action).
- `app.js` — l'interface : navigation du funnel, collecte des réponses,
  rendu du rapport, historique des scans (stockage local navigateur).

### Principe directeur du moteur

> Les vues sont une métrique d'attention.
> Les ventes sont une métrique de désir + confiance + action.

Le moteur ne présente jamais une hypothèse comme une certitude : les
diagnostics sont formulés en « tes données suggèrent », « le signal le plus
probable », etc.
