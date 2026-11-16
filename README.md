# Portfolio Data Analyst — Michelangelo Elli

**Site en ligne : [michelangelo-elli.github.io/portfolio](https://michelangelo-elli.github.io/portfolio/)**

Portfolio des 12 projets réalisés dans le parcours **Data Analyst OpenClassrooms** (certification RNCP37837, niveau 6).

Site statique (HTML/CSS/JS, aucune dépendance) — publié sur GitHub Pages.

## Contenu

- `index.html` — page unique : hero, profil, blocs de compétences RNCP, **section veille** (sources, critères, automatisation, résultats), 12 cartes projet
- `assets/` — CSS et JavaScript (données des projets + fenêtre modale avec aperçu intégré)
- `veille-log.md` — journal de veille mensuel (sources datées, évaluées selon 6 critères)
- `llms.txt` + bloc JSON-LD dans `index.html` — version lisible par les agents IA (schema.org Person, liste des projets et livrables)
- `livrables/p1 … p12/` — livrables des projets :
  - PDF et notebooks **consultables directement** dans le site (les `.ipynb` ont été convertis en HTML)
  - fichiers Power BI (`.pbix`), Excel, Word, CSV, sources Python/SQL téléchargeables
  - `p12/` : notebook BottleNeck v2 amélioré, documentation de la démarche (veille, cahier des charges, POC, traçabilité IA), glossaire des concepts

Chaque carte projet suit la même narration : **contexte/besoin → démarche → résultats & impact → limites & prochaines pistes**, avec les livrables consultables.

## Mettre à jour le site (modifications rapides)

Le site est déjà publié et le PC est déjà connecté à GitHub : **aucune connexion ne sera demandée**.

### 1. Modifier le contenu

| Quoi modifier | Fichier |
|---|---|
| Textes d'un projet (titre, contexte, résultats, limites, liens) | `assets/app.js` — bloc du projet concerné, textes en `fr` / `en` / `it` |
| Section veille, contacts, textes d'accueil | `index.html` |
| Journal de veille | `veille-log.md` |
| Ajouter/remplacer un livrable | déposer le fichier dans `livrables/pN/`, puis ajouter une ligne dans la liste `livrables:` du projet dans `assets/app.js` (copier une ligne existante et changer label + url) |

### 2. Vérifier en local (facultatif)

```bash
cd portfolio-oc
python -m http.server 8321
# puis ouvrir http://localhost:8321
```

### 3. Publier les modifications

Dans un terminal, depuis le dossier `portfolio-oc` :

```bash
git add -A
git commit -m "Description courte de la modification"
git push
```

Après 1 à 2 minutes, la modification est en ligne sur
[michelangelo-elli.github.io/portfolio](https://michelangelo-elli.github.io/portfolio/).
(Si la page affiche encore l'ancienne version : **Ctrl+F5** pour vider le cache du navigateur.)

## Notes

- La présentation complète du P8 (89 Mo) n'est pas incluse pour des raisons de poids — disponible sur demande.
- La veille est automatisée : une revue mensuelle met à jour `veille-log.md` ; il suffit ensuite de publier avec les 3 commandes git ci-dessus.
