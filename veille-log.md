# Journal de veille — Data Analysis

Journal tenu à jour chaque mois. Chaque entrée : source datée, résumé, évaluation selon les 6 critères de mon système de veille (qualité, biais, temps, reproductibilité, sécurité/conformité, sobriété), et décision éventuelle pour mes pratiques.

**Mots-clés suivis** : data quality tools · pandas vs polars · data validation python · data analyst méthodes · IA pour l'analyse de données

**Sources configurées** : Google Alerts (3 alertes hebdomadaires), Feedly (blogs Polars, Pandera, Great Expectations, Real Python), newsletters Data Elixir et Python Weekly, automatisation locale (revue mensuelle de ce journal).

---

## Semaine du 16/11/2026

### 1. Sortie de Polars 2.0 : moteur streaming par défaut

- **Source** : Polars (blog officiel), « Release of Polars 2.0 », 06/10/2026 — https://pola.rs/posts/release-polars-2/
- **Résumé** : la version majeure 2.0 rend le moteur streaming le défaut pour les requêtes lazy, active l'évacuation sur disque (spill to disk) et renforce la prise en charge SQL. Le comportement devient plus strict (erreurs levées tôt, `collect_schema()` pour valider les schémas sans matérialiser), ce qui est présenté comme un atout pour le développement assisté par IA.
- **Évaluation** : qualité — annonce officielle avec guide de migration publié ; biais — communication éditeur, mais les changements sont factuels et vérifiables ; temps — retenir uniquement les changements de défaut, pas les promesses de roadmap ; reproductibilité — attention : l'ordre des lignes n'est plus garanti sans `maintain_order=True` (à documenter dans mes pipelines) ; sécurité — neutre ; sobriété — le streaming réduit la consommation mémoire sur gros volumes.
- **Décision** : si je migre un jour vers Polars, fixer `maintain_order=True` dans les agrégations dont l'ordre alimente un rapport, et tester `collect_schema()` comme première étape de validation.

### 2. Premier benchmark indépendant pandas 3.0 vs Polars 2.0 vs DuckDB 1.5

- **Source** : Uvik Software, « Polars vs pandas vs DuckDB: 2026 Benchmark on 10 and 50 Million Rows », 02/11/2026 — https://uvik.net/blog/polars-vs-pandas/
- **Résumé** : premier benchmark public croisant pandas 3.0.6, Polars 2.0.0 et DuckDB 1.5.6 (10 et 50 millions de lignes, code et données publiés). Polars est 5,7× plus rapide que pandas sur les group-by et 3,75× sur les jointures ; à 50 M de lignes sous plafond mémoire de 5,84 GiB, pandas échoue au chargement, Polars termine 9 requêtes sur 10, DuckDB les 10 ; Parquet charge 2,6× plus vite que CSV dans tous les moteurs.
- **Évaluation** : qualité — méthodologie documentée, kit de benchmark téléchargeable, comparaison aux benchmarks existants ; biais — société de services sans part dans les trois moteurs, biais faible ; temps — lecture longue mais chiffrée, à garder comme référence ; reproductibilité — excellente (protocole et données publiés sous licences ouvertes) ; sécurité — neutre ; sobriété — Parquet réduit à la fois le stockage et la mémoire vive.
- **Décision** : adopter systématiquement Parquet plutôt que CSV dans mes projets pandas ; garder pandas pour les petits volumes et la visualisation, noter DuckDB comme option crédible dès qu'un fichier dépasse la RAM.

### 3. RIFT : une alternative déterministe à Isolation Forest pour la détection d'anomalies

- **Source** : arXiv, « RIFT: Relative Isolation From Trees For Anomaly Detection » (2610.12244), 08/10/2026 — https://arxiv.org/html/2610.12244v1
- **Résumé** : nouvelle méthode non supervisée inspirée d'Isolation Forest mais fondée sur des forêts d'arbres couvrants minimaux (MST) : le score devient quasi déterministe (variance relative dix fois plus faible que l'IF), sans hyperparamètres. Sur ADBench, les AUC moyennes sont statistiquement indiscernables de l'Isolation Forest (0,7634 vs 0,7632) ; l'implémentation exacte reste limitée aux jeux de données de taille modérée à cause du coût du MST.
- **Évaluation** : qualité — article avec étude numérique sur jeux synthétiques et ADBench ; biais — méthode proposée par ses auteurs (pas d'évaluation indépendante à ce jour), à lire comme un préprint ; temps — concepts (bagging, sous-échantillonnage) directement transférables pour comprendre les forêts d'isolation ; reproductibilité — c'est précisément son argument fort, pertinent quand un rapport doit être rejoué à l'identique ; sécurité — neutre ; sobriété — non applicable (recherche).
- **Décision** : pas de changement immédiat — Isolation Forest reste mon référentiel (P8) ; retenir RIFT comme piste si un livrable exige des scores strictement reproductibles d'un run à l'autre.

### 4. Actualités Python de novembre 2026 : pandas 3.1 s'inspire de Polars, correctifs de sécurité urgents

- **Source** : Real Python, « Python News: What's New From November 2026 », 02/11/2026 — https://realpython.com/python-news-november-2026/
- **Résumé** : revue mensuelle. Points saillants pour mes pratiques : pandas 3.1 ajoute `select()`, `filter()` et `pd.col()` inspirés de Polars, et Polars 2.0 est passé en version finale ; semaine de correctifs de sécurité (certificats eMudhra compromis, CVE-2026-115557) exigeant la mise à jour de `pip` et `certifi` dans tous les environnements ; Python 3.10 en fin de vie depuis le 01/10/2026.
- **Évaluation** : qualité — source éditoriale reconnue, faits sourcés (versions, dates, CVE) ; biais — faible, revue factuelle ; temps — 30 minutes mensuelles bien investies ; reproductibilité — les changements cités renvoient aux notes de version officielles ; sécurité — directement actionnable (mettre à jour pip/certifi/uv) ; sobriété — neutre.
- **Décision** : vérifier ce jour la version de `pip` et `certifi` de mes environnements et les mettre à jour ; surveiller la convergence syntaxique pandas/Polars (moins de friction à une migration éventuelle).

---

## Semaine du 09/11/2026

### 1. Panorama des outils de data quality open source en 2026

- **Source** : Atlan, « 14 Popular Open Source Data Quality Tools in 2026 », 06/01/2026 — https://atlan.com/know/technology/open-source-data-quality-tools/
- **Résumé** : état de l'art des outils open source de qualité de données (Great Expectations, Soda Core, Pandera, dbt tests…), avec les forces et limites de chacun.
- **Évaluation (6 critères)** : qualité — les outils cités sont matures et maintenus ; biais — article d'éditeur (Atlan vend une solution), à croiser avec d'autres sources ; temps — la mise en place d'un framework complet coûte plus cher qu'une validation légère ; reproductibilité — les validations déclaratives (schémas) se versionnent bien ; sécurité — tout reste en local, pas d'envoi de données ; sobriété — privilégier les outils légers sur petits volumes.
- **Décision** : confirme le choix Pandera (léger, déclaratif) pour mon échelle de projet ; Great Expectations reste pertinent pour des pipelines d'équipe.

### 2. Comparatif 2026 des outils de data quality : Pandera confirmé pour la validation Python

- **Source** : Bruin, « 9 Best Data Quality Tools in 2026 », 03/11/2026 — https://getbruin.com/blog/best-data-quality-tools/
- **Résumé** : comparatif à jour des outils 2026. Points notables : Pandera confirmé comme le meilleur choix pour valider des DataFrames en Python ; GX Core est passé sous l'égide de Fivetran et GX Cloud a été fermé au public le 01/06/2026 ; Soda Core v4 est passé en licence ELv2 (janvier 2026).
- **Évaluation** : qualité — comparatif récent et argumenté ; biais — article d'éditeur (Bruin est lui-même un outil), conclusions à pondérer ; temps — les changements de licence/gouvernance montrent qu'il faut réévaluer ses outils chaque année ; reproductibilité — Pandera s'intègre au code versionné ; sécurité — licence ELv2 de Soda à vérifier avant usage professionnel ; sobriété — Pandera reste l'option la plus légère.
- **Décision** : mon choix Pandera (P13, axe 1) est validé par une source indépendante récente ; à surveiller : la gouvernance de Great Expectations sous Fivetran.

### 3. Actualités Python de novembre 2026

- **Source** : Real Python, « Python News: What's New From October 2026 », 02/11/2026 — https://realpython.com/python-news-october-2026/
- **Résumé** : revue mensuelle des nouveautés du langage et de l'écosystème (versions, PEP, bibliothèques).
- **Évaluation** : qualité — source éditoriale reconnue, relecture technique ; biais — faible (revue factuelle) ; temps — lecture mensuelle de 15 minutes, bon rendement ; reproductibilité — les nouveautés citées sont documentées officiellement ; sécurité — neutre ; sobriété — neutre.
- **Décision** : conserver Real Python comme source mensuelle de fond.

### 4. Alternatives légères à Pandera à surveiller

- **Source** : toolsfordata.com, « Pandera Alternatives and Similar Tools », 15/12/2025 — https://toolsfordata.com/fr/tool/pandera/alternatives
- **Résumé** : liste d'alternatives récentes à Pandera : pointblank, dataframely, Patito (basé sur Polars), Validoopsie.
- **Évaluation** : qualité — liste utile mais peu argumentée, à creuser au cas par cas ; biais — agrégateur, peu de recul critique ; temps — évaluation complète reportée (pas de besoin actuel) ; reproductibilité — Patito intéressant si migration vers Polars un jour ; sécurité — neutre ; sobriété — ces outils sont tous légers.
- **Décision** : pas de changement ; Patito ajouté à la liste de surveillance si un projet Polars se présente.

---

## 01/12/2026

*(prochaine revue — automatisée)*
