/* ================================================================
   Portfolio — Michelangelo Elli
   i18n (fr/en/it) · filtres bloc + outil · aperçu PDF/notebook/code
   v2 : résultats/limites par projet · projet 12 · section veille
   ================================================================ */

const LANGS = ['fr', 'en', 'it'];
let lang = localStorage.getItem('portfolio-lang') || 'fr';

/* ============ Chaînes UI ============ */
const T = {
  fr: {
    'nav.about': 'À propos', 'nav.skills': 'Compétences', 'nav.veille': 'Veille', 'nav.projects': 'Projets', 'nav.contact': 'Contact',
    'hero.kicker': 'Formation Data Analyst — OpenClassrooms',
    'hero.sub': 'Data Analyst',
    'hero.desc': "De l'extraction SQL aux tableaux de bord Power BI, en passant par le nettoyage de données avec Python et le machine learning : voici les <strong>12 projets professionnalisants</strong> réalisés dans le cadre du parcours <strong>Data Analyst</strong> d'OpenClassrooms (certification <strong>RNCP37837, niveau&nbsp;6</strong> — en partenariat avec l'ENSAE).",
    'hero.stat1': 'projets', 'hero.stat2': 'mois', 'hero.stat3': 'blocs de compétences', 'hero.stat4': 'Août 2025 → Novembre 2026',
    'hero.cta': 'Découvrir les projets ↓',
    'about.title': 'À propos',
    'about.p1': "Basé à Avignon (France), j'ai suivi le parcours <strong>Data Analyst</strong> d'OpenClassrooms, une formation de niveau Bac+3 construite autour de projets réels, en lien direct avec les missions du métier : collecter et structurer des données, les analyser avec des outils statistiques, puis les restituer sous forme de rapports et de dashboards utiles à la décision.",
    'about.p2': "Chaque projet ci-dessous répond à un brief professionnel complet — contexte client, livrables attendus, soutenance devant un mentor — et couvre l'un des <strong>blocs de compétences de la certification RNCP37837</strong>. Pour chacun : le contexte et le besoin métier, la démarche, les résultats et leur impact, puis les limites et les pistes d'amélioration.",
    'about.toolsTitle': 'Outils & technologies',
    'skills.title': 'Blocs de compétences — RNCP37837',
    'skills.intro': "La certification s'obtient par capitalisation de 5 blocs de compétences, validés par les projets :",
    'skills.note': "ℹ️ Ces blocs sont ceux de la certification officielle : le RGPD et la conduite de projet — présents transversalement dans tous les projets — sont regroupés dans le BC04, validé par le projet 12. Cliquez sur un bloc pour filtrer les projets.",
    'veille.title': 'Veille métier & technologique',
    'veille.intro': "Dans un métier qui évolue vite, je maintiens mes pratiques à jour grâce à une veille structurée. Voici le système mis en place — sources, critères, automatisation — et ses résultats concrets, appliqués de bout en bout dans le projet 12.",
    'projects.title': 'Les 12 projets',
    'projects.intro': 'Cliquez sur un projet pour voir sa présentation et consulter directement les livrables (présentations, notebooks, code SQL/Python, rapports Power BI…).',
    'projects.empty': 'Aucun projet ne correspond à ces filtres — essayez une autre combinaison.',
    'filter.all': 'Tous',
    'filter.bc01': 'BC01 · BDD', 'filter.bc02': 'BC02 · Analyse', 'filter.bc03': 'BC03 · Visualisation', 'filter.bc04': 'BC04 · Pilotage', 'filter.bc05': 'BC05 · Statistiques',
    'contact.title': 'Contact',
    'contact.text': 'Un projet data en vue ? N’hésitez pas à me contacter.',
    'contact.footnote': 'Portfolio réalisé dans le cadre du parcours Data Analyst OpenClassrooms · RNCP37837 niveau 6 · Avignon, France',
    'contact.llms': 'Lisible par les agents IA : ',
    'modal.presentation': 'Contexte & besoin métier',
    'modal.objectifs': 'Démarche',
    'modal.resultats': 'Résultats & impact',
    'modal.limites': 'Limites & pistes',
    'modal.livrables': 'Livrables — directement consultables',
    'modal.view': '👁 Voir',
    'modal.closePreview': '✕ Fermer l’aperçu',
    'modal.download': 'Télécharger',
    'card.more': 'Voir le détail →',
    'bloc.click': '→ cliquer pour filtrer',
    'bloc.none': 'validé par le projet 12',
    'preview.error': 'Impossible de charger ce fichier en aperçu.',
    'preview.truncated': '(aperçu tronqué — fichier volumineux)',
  },
  en: {
    'nav.about': 'About', 'nav.skills': 'Skills', 'nav.veille': 'Tech watch', 'nav.projects': 'Projects', 'nav.contact': 'Contact',
    'hero.kicker': 'Data Analyst Training — OpenClassrooms',
    'hero.sub': 'Data Analyst',
    'hero.desc': "From SQL querying to Power BI dashboards, from data cleaning in Python to machine learning: here are the <strong>13 professional projects</strong> I completed for the OpenClassrooms <strong>Data Analyst</strong> program (certification <strong>RNCP37837, level&nbsp;6</strong> — in partnership with ENSAE).",
    'hero.stat1': 'projects', 'hero.stat2': 'months', 'hero.stat3': 'skill blocks', 'hero.stat4': 'August 2025 → November 2026',
    'hero.cta': 'Explore the projects ↓',
    'about.title': 'About',
    'about.p1': "Based in Avignon (France), I completed the OpenClassrooms <strong>Data Analyst</strong> program, a bachelor's-level (Bac+3) training built around real-world projects, closely aligned with the job: collecting and structuring data, analyzing it with statistical tools, and turning it into reports and dashboards that support decision-making.",
    'about.p2': "Each project below answers a full professional brief — client context, deliverables, defense before a mentor — and covers one of the <strong>skill blocks of the RNCP37837 certification</strong>. For each one: business context and need, approach, results and impact, then limitations and next steps.",
    'about.toolsTitle': 'Tools & technologies',
    'skills.title': 'Skill blocks — RNCP37837',
    'skills.intro': 'The certification is awarded by accumulating 5 skill blocks, validated through the projects:',
    'skills.note': "ℹ️ These blocks come from the official certification: GDPR compliance and project management — present across all projects — are grouped in BC04, validated by project 12. Click a block to filter projects.",
    'veille.title': 'Business & technology watch',
    'veille.intro': "In a fast-moving profession, I keep my practices up to date through a structured watch system. Here is the setup — sources, criteria, automation — and its concrete results, applied end to end in project 12.",
    'projects.title': 'The 12 projects',
    'projects.intro': 'Click a project to see its presentation and browse the deliverables right here (presentations, notebooks, SQL/Python code, Power BI reports…).',
    'projects.empty': 'No project matches these filters — try another combination.',
    'filter.all': 'All',
    'filter.bc01': 'BC01 · DB', 'filter.bc02': 'BC02 · Analysis', 'filter.bc03': 'BC03 · Viz', 'filter.bc04': 'BC04 · Project mgmt', 'filter.bc05': 'BC05 · Statistics',
    'contact.title': 'Contact',
    'contact.text': 'Have a data project in mind? Feel free to reach out.',
    'contact.footnote': 'Portfolio built as part of the OpenClassrooms Data Analyst program · RNCP37837 level 6 · Avignon, France',
    'contact.llms': 'Readable by AI agents: ',
    'modal.presentation': 'Context & business need',
    'modal.objectifs': 'Approach',
    'modal.resultats': 'Results & impact',
    'modal.limites': 'Limitations & next steps',
    'modal.livrables': 'Deliverables — browsable on this page',
    'modal.view': '👁 View',
    'modal.closePreview': '✕ Close preview',
    'modal.download': 'Download',
    'card.more': 'See details →',
    'bloc.click': '→ click to filter',
    'bloc.none': 'validated by project 12',
    'preview.error': 'Could not load a preview of this file.',
    'preview.truncated': '(preview truncated — large file)',
  },
  it: {
    'nav.about': 'Chi sono', 'nav.skills': 'Competenze', 'nav.veille': 'Veille', 'nav.projects': 'Progetti', 'nav.contact': 'Contatto',
    'hero.kicker': 'Formazione Data Analyst — OpenClassrooms',
    'hero.sub': 'Data Analyst',
    'hero.desc': "Dalle query SQL alle dashboard Power BI, dal cleaning dei dati con Python al machine learning: ecco i <strong>12 progetti professionalizzanti</strong> realizzati nel percorso <strong>Data Analyst</strong> di OpenClassrooms (certificazione <strong>RNCP37837, livello&nbsp;6</strong> — in partnership con ENSAE).",
    'hero.stat1': 'progetti', 'hero.stat2': 'mesi', 'hero.stat3': 'blocchi di competenze', 'hero.stat4': 'Agosto 2025 → Novembre 2026',
    'hero.cta': 'Scopri i progetti ↓',
    'about.title': 'Chi sono',
    'about.p1': "Di base ad Avignone (Francia), ho seguito il percorso <strong>Data Analyst</strong> di OpenClassrooms, una formazione di livello Bac+3 costruita su progetti reali, in stretta connessione con il mestiere: raccogliere e strutturare i dati, analizzarli con strumenti statistici, poi restituirli in report e dashboard utili alla decisione.",
    'about.p2': "Ogni progetto qui sotto risponde a un brief professionale completo — contesto cliente, deliverable attesi, difesa davanti a un mentor — e copre uno dei <strong>blocchi di competenza della certificazione RNCP37837</strong>. Per ciascuno: contesto e bisogno di business, approccio, risultati e impatto, poi limiti e prossimi passi.",
    'about.toolsTitle': 'Strumenti & tecnologie',
    'skills.title': 'Blocchi di competenza — RNCP37837',
    'skills.intro': 'La certificazione si ottiene per capitalizzazione di 5 blocchi di competenza, validati dai progetti:',
    'skills.note': "ℹ️ Questi blocchi sono quelli della certificazione ufficiale: il rispetto del RGPD e la conduzione del progetto — presenti trasversalmente in tutti i progetti — sono raggruppati nel BC04, validato dal progetto 12. Clicca su un blocco per filtrare i progetti.",
    'veille.title': 'Veille métier & tecnologica',
    'veille.intro': "In un mestiere che evolve rapidamente, mantengo le mie pratiche aggiornate con una veille strutturata. Ecco il sistema messo in piedi — fonti, criteri, automazione — e i suoi risultati concreti, applicati dall'inizio alla fine nel progetto 12.",
    'projects.title': 'I 12 progetti',
    'projects.intro': 'Clicca su un progetto per vederne la presentazione e consultare direttamente i deliverable (presentazioni, notebook, codice SQL/Python, report Power BI…).',
    'projects.empty': 'Nessun progetto corrisponde a questi filtri — prova un’altra combinazione.',
    'filter.all': 'Tutti',
    'filter.bc01': 'BC01 · DB', 'filter.bc02': 'BC02 · Analisi', 'filter.bc03': 'BC03 · Visualizzazione', 'filter.bc04': 'BC04 · Pilotaggio', 'filter.bc05': 'BC05 · Statistica',
    'contact.title': 'Contatto',
    'contact.text': 'Hai un progetto data in mente? Contattami pure.',
    'contact.footnote': 'Portfolio realizzato nell’ambito del percorso Data Analyst OpenClassrooms · RNCP37837 livello 6 · Avignone, Francia',
    'contact.llms': 'Leggibile dagli agenti AI: ',
    'modal.presentation': 'Contesto & bisogno di business',
    'modal.objectifs': 'Approccio',
    'modal.resultats': 'Risultati & impatto',
    'modal.limites': 'Limiti & prossimi passi',
    'modal.livrables': 'Deliverable — consultabili direttamente',
    'modal.view': '👁 Vedi',
    'modal.closePreview': '✕ Chiudi anteprima',
    'modal.download': 'Scarica',
    'card.more': 'Vedi dettaglio →',
    'bloc.click': '→ clicca per filtrare',
    'bloc.none': 'validato dal progetto 12',
    'preview.error': 'Impossibile caricare l’anteprima di questo file.',
    'preview.truncated': '(anteprima troncata — file voluminoso)',
  }
};

/* ============ Blocs RNCP (contenu) ============ */
const BLOCS = [
  { id: 'BC01', h3: { fr: 'Structurer et gérer la base de données', en: 'Structure and manage the database', it: 'Strutturare e gestire il database' },
    p: { fr: 'Schéma relationnel, dictionnaire de données, requêtes SQL, chargement et mise à jour.', en: 'Relational schemas, data dictionaries, SQL queries, loading and updating.', it: 'Schemi relazionali, dizionario dei dati, query SQL, caricamento e aggiornamento.' },
    projets: '1 · 3 · 5' },
  { id: 'BC02', h3: { fr: 'Identifier, collecter et analyser les données', en: 'Identify, collect and analyze data', it: 'Identificare, raccogliere e analizzare i dati' },
    p: { fr: 'Collecte respectueuse du RGPD, préparation, nettoyage, pipelines de données (DBT).', en: 'GDPR-compliant collection, preparation, cleaning, data pipelines (DBT).', it: 'Raccolta conforme al RGPD, preparazione, pulizia, pipeline dati (DBT).' },
    projets: '4 · 6 · 8' },
  { id: 'BC03', h3: { fr: 'Visualiser des données et interpréter des résultats', en: 'Visualize data and interpret results', it: 'Visualizzare i dati e interpretare i risultati' },
    p: { fr: 'Graphiques adaptés, dashboards Power BI, synthèse à destination d’un client.', en: 'Fit-for-purpose charts, Power BI dashboards, client-ready reporting.', it: 'Grafici appropriati, dashboard Power BI, sintesi per il cliente.' },
    projets: '2 · 7 · 10' },
  { id: 'BC04', h3: { fr: 'Piloter un projet data en respectant la réglementation', en: 'Lead a data project in compliance with regulations', it: 'Gestire un progetto data nel rispetto della normativa' },
    p: { fr: 'Veille, méthodologie, RGPD, communication — compétences transversales validées par le projet 12.', en: 'Tech watch, methodology, GDPR, communication — cross-cutting skills validated by project 12.', it: 'Veille, metodologia, RGPD, comunicazione — competenze trasversali validate dal progetto 12.' },
    projets: '13' },
  { id: 'BC05', h3: { fr: 'Statistiques & modèles d’apprentissage', en: 'Statistics & machine learning models', it: 'Statistica e modelli di apprendimento' },
    p: { fr: 'Tests statistiques, analyses multivariées, apprentissage supervisé et non supervisé.', en: 'Statistical tests, multivariate analysis, supervised and unsupervised learning.', it: 'Test statistici, analisi multivariate, apprendimento supervisionato e non.' },
    projets: '9 · 11 · 12' },
];

/* Barre de filtres outils */
const TECHS = ['Python', 'SQL', 'Power BI', 'Excel', 'DBT'];

const TOOLS_CLOUD = ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'SciPy', 'scikit-learn', 'statsmodels',
  'SQL', 'MySQL', 'SQLite', 'PostgreSQL', 'Power BI', 'Power Query', 'DAX', 'DBT', 'Snowflake', 'Excel', 'Jupyter', 'GitHub',
  'Pandera', 'Polars', 'DuckDB'];

/* ============ Système de veille ============ */
const VEILLE = [
  { h3: { fr: 'Sources fiables et datées', en: 'Reliable, dated sources', it: 'Fonti affidabili e datate' },
    p: { fr: 'Documentations officielles (Polars, Pandera, Great Expectations, scikit-learn, DuckDB), comparatifs reconnus (Pyrastra 2026, StackBriefly, Python Data Bench) et blogs éditeurs. Chaque source est datée et citée dans la documentation du projet 12.',
         en: 'Official documentation (Polars, Pandera, Great Expectations, scikit-learn, DuckDB), recognized comparisons (Pyrastra 2026, StackBriefly, Python Data Bench) and vendor blogs. Every source is dated and cited in the project 12 documentation.',
         it: 'Documentazione ufficiale (Polars, Pandera, Great Expectations, scikit-learn, DuckDB), comparazioni riconosciute (Pyrastra 2026, StackBriefly, Python Data Bench) e blog degli editori. Ogni fonte è datata e citata nella documentazione del progetto 12.' } },
  { h3: { fr: 'Critères de comparaison', en: 'Comparison criteria', it: 'Criteri di confronto' },
    p: { fr: 'Qualité, biais méthodologique, temps d’exécution, reproductibilité, sécurité et conformité (RGPD, traitement 100 % local), sobriété numérique et adéquation au public cible.',
         en: 'Quality, methodological bias, execution time, reproducibility, security and compliance (GDPR, 100% local processing), digital sobriety and fit for the target audience.',
         it: 'Qualità, bias metodologico, tempi di esecuzione, riproducibilità, sicurezza e conformità (RGPD, trattamento 100% locale), sobrietà digitale e adeguatezza al pubblico.' } },
  { h3: { fr: 'Automatisation', en: 'Automation', it: 'Automazione' },
    p: { fr: 'Alertes Google et flux RSS sur les mots-clés suivis (data quality, détection d’anomalies, pandas/Polars), revue mensuelle automatisée et journal de veille public (veille-log.md) tenu à jour : chaque entrée est datée, sourcée et évaluée selon les 6 critères.',
         en: 'Google alerts and RSS feeds on tracked keywords (data quality, anomaly detection, pandas/Polars), an automated monthly review, and a public watch journal (veille-log.md) kept up to date: every entry is dated, sourced and assessed against the 6 criteria.',
         it: 'Google Alert e feed RSS sulle parole chiave seguite (data quality, rilevamento anomalie, pandas/Polars), revisione mensile automatizzata e diario di veille pubblico (veille-log.md) tenuto aggiornato: ogni voce è datata, con fonte e valutata secondo i 6 criteri.' } },
  { h3: { fr: 'Résultats concrets', en: 'Concrete results', it: 'Risultati concreti' },
    p: { fr: 'Appliquée dans le projet 12 : Pandera retenu face à Great Expectations (9,3 fois plus rapide sur le périmètre), IQR et Isolation Forest préférés au z-score seul, pandas conservé après benchmark réel. Des décisions mesurées, pas des effets de mode.',
         en: 'Applied in project 12: Pandera chosen over Great Expectations (9.3x faster on this scope), IQR and Isolation Forest preferred over z-score alone, pandas kept after a real benchmark. Measured decisions, not fashion.',
         it: 'Applicata nel progetto 12: Pandera scelto al posto di Great Expectations (9,3 volte più rapido sul perimetro), IQR e Isolation Forest preferiti al solo z-score, pandas mantenuto dopo un benchmark reale. Decisioni misurate, non mode.' } },
];

/* ============ Projets (contenu trilingue) ============ */
const PROJECTS = [
  {
    id: 1, bloc: 'BC03', techs: ['Excel'],
    periode: { fr: 'Septembre 2025', en: 'September 2025', it: 'Settembre 2025' },
    outils: ['Excel avancé', 'TCD', 'Google Sheets'],
    titre: { fr: 'Faites une analyse de ventes pour un e-commerce', en: 'Analyze sales for an e-commerce website', it: 'Analizza le vendite per un e-commerce' },
    contexte: {
      fr: 'Analyse complète des ventes d’un site e-commerce : évolution du chiffre d’affaires, comportement des visiteurs et panier moyen, puis création d’un tableau de bord de suivi des clients affiliés pour l’équipe marketing.',
      en: 'Full sales analysis for an e-commerce website: revenue trends, visitor behavior and average basket, then building a dashboard to track affiliate clients for the marketing team.',
      it: 'Analisi completa delle vendite di un sito e-commerce: andamento del fatturato, comportamento dei visitatori e carrello medio, poi creazione di una dashboard di monitoraggio dei clienti affiliati per il team marketing.'
    },
    objectifs: {
      fr: ['Choisir les graphiques adaptés à chaque type de donnée (courbes, barres, histogrammes, boxplots, nuages de points).', 'Produire un rapport mensuel marketing synthétique et exploitable.', 'Créer un tableau de bord Excel dynamique (tableaux croisés dynamiques, segments) et savoir l’interpréter.'],
      en: ['Choose the right chart for each data type (lines, bars, histograms, boxplots, scatter plots).', 'Produce a synthetic, actionable monthly marketing report.', 'Build a dynamic Excel dashboard (pivot tables, slicers) and know how to read it.'],
      it: ['Scegliere i grafici adatti a ogni tipo di dato (curve, barre, istogrammi, boxplot, scatter plot).', 'Produrre un rapporto mensile marketing sintetico e fruibile.', 'Creare una dashboard Excel dinamica (tabelle pivot, filtri) e saperla interpretare.']
    },
    resultats: {
      fr: ['Rapport mensuel marketing synthétique livré à l’équipe.', 'Tableau de bord Excel dynamique (TCD, segments) réutilisable à chaque nouvel export.'],
      en: ['A concise monthly marketing report delivered to the team.', 'A dynamic Excel dashboard (pivot tables, slicers) reusable with each new export.'],
      it: ['Rapporto mensile marketing sintetico consegnato al team.', 'Dashboard Excel dinamica (tabelle pivot, filtri) riutilizzabile a ogni nuovo export.']
    },
    limites: {
      fr: ['Dashboard non automatisé : la mise à jour reste manuelle, export par export.'],
      en: ['The dashboard is not automated: updates remain manual, export by export.'],
      it: ['Dashboard non automatizzata: l’aggiornamento resta manuale, export dopo export.']
    },
    livrables: [
      { label: { fr: 'Rapport mensuel marketing', en: 'Monthly marketing report', it: 'Rapporto mensile marketing' }, type: 'embed', url: 'livrables/p1/rapport-mensuel-marketing.pdf', view: 'livrables/p1/rapport-mensuel-marketing.pdf' },
      { label: { fr: 'Tableau de bord clients affiliés (présentation)', en: 'Affiliate clients dashboard (presentation)', it: 'Dashboard clienti affiliati (presentazione)' }, type: 'embed', url: 'livrables/p1/tableau-de-bord-clients-affilies.pdf', view: 'livrables/p1/tableau-de-bord-clients-affilies.pdf' },
      { label: { fr: 'Tableau de bord clients affiliés (Excel)', en: 'Affiliate clients dashboard (Excel)', it: 'Dashboard clienti affiliati (Excel)' }, type: 'dl', url: 'livrables/p1/tableau-de-bord-clients-affilies.xlsx' }
    ]
  },
  {
    id: 2, bloc: 'BC01', techs: ['SQL'],
    periode: { fr: 'Octobre 2025', en: 'October 2025', it: 'Ottobre 2025' },
    outils: ['SQL', 'SQLite', 'SQL Power Architect'],
    titre: { fr: 'Requêtez une base de données avec SQL', en: 'Query a database with SQL', it: 'Interroga un database con SQL' },
    contexte: {
      fr: 'Premiers pas en SQL : interrogation d’une base de données relationnelle (sélections, filtres, agrégations, jointures, sous-requêtes) pour répondre à des questions métier, puis présentation de la méthodologie d’exploitation.',
      en: 'First steps with SQL: querying a relational database (selects, filters, aggregations, joins, sub-queries) to answer business questions, then presenting the methodology.',
      it: 'Primi passi con SQL: interrogazione di un database relazionale (selezione, filtri, aggregazioni, join, sotto-query) per rispondere a domande di business, poi presentazione della metodologia.'
    },
    objectifs: {
      fr: ['Écrire des requêtes de sélection avec filtres, tri et limites.', 'Utiliser agrégations (GROUP BY, HAVING), jointures et sous-requêtes pour répondre à des questions métier.', 'Restituer la démarche et les résultats dans une présentation méthodologique.'],
      en: ['Write SELECT queries with filters, sorting and limits.', 'Use aggregations (GROUP BY, HAVING), joins and sub-queries to answer business questions.', 'Present the approach and results in a methodology deck.'],
      it: ['Scrivere query di selezione con filtri, ordinamenti e limiti.', 'Usare aggregazioni (GROUP BY, HAVING), join e sotto-query per rispondere a domande di business.', 'Restituire il percorso e i risultati in una presentazione metodologica.']
    },
    resultats: {
      fr: ['Ensemble des questions métier du brief couvertes par des requêtes testées.', 'Méthodologie d’exploitation restituée en présentation, réutilisable par l’équipe.'],
      en: ['All business questions in the brief covered by tested queries.', 'The operating methodology presented in a deck, reusable by the team.'],
      it: ['Tutte le domande di business del brief coperte da query testate.', 'Metodologia di utilizzo restituita in una presentazione, riutilizzabile dal team.']
    },
    limites: {
      fr: ['Base pédagogique de taille réduite : pas de contraintes de performance réelles (index, volumétrie).'],
      en: ['Small training database: no real performance constraints (indexes, volume).'],
      it: ['Database didattico di dimensioni ridotte: nessun vincolo reale di performance (indici, volumi).']
    },
    livrables: [
      { label: { fr: 'Présentation de la méthodologie', en: 'Methodology presentation', it: 'Presentazione della metodologia' }, type: 'embed', url: 'livrables/p2/presentation-methodologie.pdf', view: 'livrables/p2/presentation-methodologie.pdf' },
      { label: { fr: 'Script SQL complet — création, chargement et requêtes (MySQL)', en: 'Full SQL script — creation, data load and queries (MySQL)', it: 'Script SQL completo — creazione, caricamento e query (MySQL)' }, type: 'embed', url: 'livrables/p2/script-requetes-sql.html', view: 'livrables/p2/script-requetes-sql.html' },
      { label: { fr: 'Schéma relationnel de la base', en: 'Database relational schema', it: 'Schema relazionale del database' }, type: 'dl', url: 'livrables/p2/schema-relationnel.architect' }
    ]
  },
  {
    id: 3, bloc: 'BC02', techs: ['Python'],
    periode: { fr: 'Novembre 2025', en: 'November 2025', it: 'Novembre 2025' },
    outils: ['Python', 'Pandas', 'Matplotlib', 'Jupyter'],
    titre: { fr: 'Réalisez une étude de santé publique avec R ou Python', en: 'Carry out a public health study with R or Python', it: 'Realizza uno studio di salute pubblica con R o Python' },
    contexte: {
      fr: 'Mission au sein d’une équipe de chercheurs de la FAO : étude sur la sous-nutrition dans le monde à partir des données officielles de l’organisation — manipulation de données réelles, nettoyage et visualisations.',
      en: 'Assignment with a team of FAO researchers: a study of undernutrition worldwide based on the organization’s official data — hands-on data wrangling, cleaning and visualization.',
      it: 'Missione in un team di ricercatori della FAO: studio sulla sotto-nutrizione nel mondo a partire dai dati ufficiali dell’organizzazione — manipolazione di dati reali, pulizia e visualizzazioni.'
    },
    objectifs: {
      fr: ['Manipuler des DataFrames et préparer les données de la FAO (valeurs manquantes, formats).', 'Analyser l’évolution de la sous-nutrition et la disponibilité alimentaire mondiale.', 'Produire des visualisations pour orienter de futures recherches.'],
      en: ['Manipulate DataFrames and prepare FAO data (missing values, formats).', 'Analyze the evolution of undernutrition and global food availability.', 'Produce visualizations to guide future research.'],
      it: ['Manipolare DataFrame e preparare i dati FAO (valori mancanti, formati).', 'Analizzare l’evoluzione della sotto-nutrizione e la disponibilità alimentare mondiale.', 'Produrre visualizzazioni per orientare ricerche future.']
    },
    resultats: {
      fr: ['Jeu de données FAO nettoyé, documenté et exploitable.', 'Visualisations sur l’évolution de la sous-nutrition et la disponibilité alimentaire, prêtes pour orienter les recherches futures.'],
      en: ['A cleaned, documented and usable FAO dataset.', 'Visualizations on undernutrition trends and food availability, ready to guide future research.'],
      it: ['Dataset FAO pulito, documentato e fruibile.', 'Visualizzazioni sull’evoluzione della sotto-nutrizione e sulla disponibilità alimentare, pronte per orientare ricerche future.']
    },
    limites: {
      fr: ['Données manquantes ou datées pour certains pays : prudence sur les comparaisons internationales.'],
      en: ['Missing or dated data for some countries: caution needed for international comparisons.'],
      it: ['Dati mancanti o datati per alcuni paesi: prudenza nei confronti internazionali.']
    },
    livrables: [
      { label: { fr: 'Présentation de l’étude (diaporama)', en: 'Study presentation (slides)', it: 'Presentazione dello studio (diapositive)' }, type: 'embed', url: 'livrables/p3/presentation-etude-sante.pdf', view: 'livrables/p3/presentation-etude-sante.pdf' },
      { label: { fr: 'Notebook d’analyse (interactif)', en: 'Analysis notebook (interactive)', it: 'Notebook di analisi (interattivo)' }, type: 'embed', url: 'livrables/p3/notebook-etude-sante-publique.html', view: 'livrables/p3/notebook-etude-sante-publique.html' }
    ]
  },
  {
    id: 4, bloc: 'BC01', techs: ['SQL'],
    periode: { fr: 'Début 2026', en: 'Early 2026', it: 'Inizio 2026' },
    outils: ['SQL', 'MySQL', 'SQL Power Architect'],
    titre: { fr: 'Créez et utilisez une base de données immobilière avec SQL', en: 'Build and use a real-estate database with SQL', it: 'Crea e usa un database immobiliare con SQL' },
    contexte: {
      fr: 'Chez Laplace Immo, conception d’une base de données immobilière pour mieux prévoir les prix de vente : dictionnaire des données, schéma relationnel normalisé, création des tables et requêtes d’analyse sur les transactions DVF.',
      en: 'At Laplace Immo, designing a real-estate database to better predict sale prices: data dictionary, normalized relational schema, table creation and analysis queries on DVF transactions.',
      it: 'Da Laplace Immo, progettazione di un database immobiliare per prevedere meglio i prezzi di vendita: dizionario dei dati, schema relazionale normalizzato, creazione delle tabelle e query di analisi sulle transazioni DVF.'
    },
    objectifs: {
      fr: ['Créer le dictionnaire des données et le schéma relationnel normalisé (3NF).', 'Implémenter la base : création des tables et chargement des données.', 'Mettre à jour le catalogue et effectuer les requêtes SQL nécessaires aux analyses métier.'],
      en: ['Create the data dictionary and the normalized (3NF) relational schema.', 'Implement the database: table creation and data loading.', 'Update the catalog and run the SQL queries needed for business analysis.'],
      it: ['Creare il dizionario dei dati e lo schema relazionale normalizzato (3NF).', 'Implementare il database: creazione delle tabelle e caricamento dei dati.', 'Aggiornare il catalogo ed eseguire le query SQL necessarie alle analisi di business.']
    },
    resultats: {
      fr: ['Base normalisée (3NF) créée et chargée avec les transactions DVF.', 'Dictionnaire de données et requêtes d’analyse réutilisables par l’équipe.'],
      en: ['A normalized (3NF) database created and loaded with DVF transactions.', 'A data dictionary and analysis queries reusable by the team.'],
      it: ['Database normalizzato (3NF) creato e caricato con le transazioni DVF.', 'Dizionario dei dati e query di analisi riutilizzabili dal team.']
    },
    limites: {
      fr: ['Chargement non automatisé : pas de mise à jour incrémentale prévue à ce stade.'],
      en: ['Loading is not automated: no incremental updates planned at this stage.'],
      it: ['Caricamento non automatizzato: nessun aggiornamento incrementale previsto a questo stadio.']
    },
    livrables: [
      { label: { fr: 'Présentation du projet (diaporama)', en: 'Project presentation (slides)', it: 'Presentazione del progetto (diapositive)' }, type: 'embed', url: 'livrables/p4/presentation-base-immobiliere.pdf', view: 'livrables/p4/presentation-base-immobiliere.pdf' },
      { label: { fr: 'Schéma relationnel normalisé', en: 'Normalized relational schema', it: 'Schema relazionale normalizzato' }, type: 'dl', url: 'livrables/p4/schema-relationnel.architect' },
      { label: { fr: 'Dictionnaire des données', en: 'Data dictionary', it: 'Dizionario dei dati' }, type: 'dl', url: 'livrables/p4/dictionnaire-donnees.xlsx' },
      { label: { fr: 'Script de création des tables', en: 'Table creation script', it: 'Script di creazione delle tabelle' }, type: 'embed', url: 'livrables/p4/creation-tables-sql.html', view: 'livrables/p4/creation-tables-sql.html' },
      { label: { fr: 'Requêtes d’analyse', en: 'Analysis queries', it: 'Query di analisi' }, type: 'embed', url: 'livrables/p4/requetes-analyse-sql.html', view: 'livrables/p4/requetes-analyse-sql.html' }
    ]
  },
  {
    id: 5, bloc: 'BC02', techs: ['Python'],
    periode: { fr: 'Mars 2026', en: 'March 2026', it: 'Marzo 2026' },
    outils: ['Python', 'Pandas', 'NumPy', 'Jupyter'],
    titre: { fr: 'Optimisez la gestion des données d’une boutique avec R ou Python', en: 'Optimize a shop’s data management with R or Python', it: 'Ottimizza la gestione dei dati di un negozio con R o Python' },
    contexte: {
      fr: 'Mission freelance chez BottleNeck, marchand de vin : données éclatées entre ERP, site web et table de liaison à rapprocher et nettoyer, puis analyse du chiffre d’affaires et étude univariée des prix de vente.',
      en: 'Freelance mission at BottleNeck, a wine merchant: data scattered across ERP, website and a mapping table had to be reconciled and cleaned, then revenue analysis and a univariate study of sale prices.',
      it: 'Missione freelance da BottleNeck, venditore di vino: dati dispersi tra ERP, sito web e tabella di raccordo da riunire e pulire, poi analisi del fatturato e studio univariato dei prezzi di vendita.'
    },
    objectifs: {
      fr: ['Rapprocher les jeux de données (jointures) et gérer les erreurs et incohérences.', 'Calculer le chiffre d’affaires par produit et dans son ensemble.', 'Réaliser une analyse univariée des prix : tendance centrale, dispersion, valeurs aberrantes.'],
      en: ['Reconcile the datasets (joins) and handle errors and inconsistencies.', 'Compute revenue per product and in total.', 'Run a univariate analysis of prices: central tendency, dispersion, outliers.'],
      it: ['Rapprocciare i dataset (join) e gestire errori e incoerenze.', 'Calcolare il fatturato per prodotto e nel complesso.', 'Realizzare un’analisi univariata dei prezzi: tendenza centrale, dispersione, outlier.']
    },
    resultats: {
      fr: ['Chiffre d’affaires web consolidé : 153 748,10 € après rapprochement des trois sources.', '17 prix aberrants identifiés (z-score) — premières recommandations de vérification au métier.'],
      en: ['Consolidated web revenue: €153,748.10 after reconciling the three sources.', '17 outlier prices identified (z-score) — first verification recommendations for the business.'],
      it: ['Fatturato web consolidato: 153.748,10 € dopo il raccordo delle tre fonti.', '17 prezzi anomali identificati (z-score) — prime raccomandazioni di verifica per il business.']
    },
    limites: {
      fr: ['Nettoyage codé en dur et détection fragile : repris, robustifié et industrialisé dans le projet 12 (voir P12).'],
      en: ['Hard-coded cleaning and fragile detection: reworked, hardened and industrialized in project 12 (see P12).'],
      it: ['Pulizia hardcoded e rilevamento fragile: ripresi, resi robusti e industrializzati nel progetto 12 (vedi P12).']
    },
    livrables: [
      { label: { fr: 'Présentation des résultats', en: 'Results presentation', it: 'Presentazione dei risultati' }, type: 'embed', url: 'livrables/p5/presentation-gestion-boutique.pdf', view: 'livrables/p5/presentation-gestion-boutique.pdf' },
      { label: { fr: 'Notebook d’analyse (interactif)', en: 'Analysis notebook (interactive)', it: 'Notebook di analisi (interattivo)' }, type: 'embed', url: 'livrables/p5/notebook-gestion-boutique.html', view: 'livrables/p5/notebook-gestion-boutique.html' }
    ]
  },
  {
    id: 6, bloc: 'BC03', techs: ['Power BI'],
    periode: { fr: 'Avril 2026', en: 'April 2026', it: 'Aprile 2026' },
    outils: ['Power BI', 'Power Query', 'DAX'],
    titre: { fr: 'Créez un tableau de bord dynamique avec Power BI pour visualiser l’avancement de projets', en: 'Build a dynamic Power BI dashboard to track project progress', it: 'Crea una dashboard Power BI dinamica per visualizzare l’avanzamento dei progetti' },
    contexte: {
      fr: 'Chez Sanitorial, fabricant de produits d’hygiène : création d’un tableau de bord Power BI dynamique pour visualiser l’avancement des projets et éclairer la stratégie produit, appuyé par un Product Strategy Canvas.',
      en: 'At Sanitorial, a hygiene products manufacturer: building a dynamic Power BI dashboard to track project progress and inform product strategy, backed by a Product Strategy Canvas.',
      it: 'Da Sanitorial, produttore di prodotti per l’igiene: creazione di una dashboard Power BI dinamica per visualizzare l’avanzamento dei progetti e supportare la strategia prodotto, con Product Strategy Canvas.'
    },
    objectifs: {
      fr: ['Préparer et modéliser les données (Power Query, relations).', 'Construire un dashboard dynamique avec indicateurs de suivi pertinents.', 'Compléter un Product Strategy Canvas pour structurer l’analyse.'],
      en: ['Prepare and model the data (Power Query, relationships).', 'Build a dynamic dashboard with relevant tracking indicators.', 'Complete a Product Strategy Canvas to structure the analysis.'],
      it: ['Preparare e modellare i dati (Power Query, relazioni).', 'Costruire una dashboard dinamica con indicatori di monitoraggio pertinenti.', 'Compilare un Product Strategy Canvas per strutturare l’analisi.']
    },
    resultats: {
      fr: ['Dashboard dynamique de suivi des projets livré, avec indicateurs calculés en DAX.', 'Product Strategy Canvas complété pour cadrer la stratégie produit.'],
      en: ['A dynamic project-tracking dashboard delivered, with DAX calculated indicators.', 'A completed Product Strategy Canvas framing the product strategy.'],
      it: ['Dashboard dinamica di monitoraggio progetti consegnata, con indicatori calcolati in DAX.', 'Product Strategy Canvas compilato per inquadrare la strategia prodotto.']
    },
    limites: {
      fr: ['Actualisation manuelle des sources : pas de passerelle automatique vers les systèmes de gestion de projet.'],
      en: ['Manual data refresh: no automatic connector to the project management systems.'],
      it: ['Aggiornamento manuale delle fonti: nessun connettore automatico verso i sistemi di gestione progetti.']
    },
    livrables: [
      { label: { fr: 'Présentation du projet', en: 'Project presentation', it: 'Presentazione del progetto' }, type: 'embed', url: 'livrables/p6/presentation-powerbi-sanitorial.pdf', view: 'livrables/p6/presentation-powerbi-sanitorial.pdf' },
      { label: { fr: 'Tableau de bord Power BI (.pbix)', en: 'Power BI dashboard (.pbix)', it: 'Dashboard Power BI (.pbix)' }, type: 'dl', url: 'livrables/p6/tableau-de-bord-sanitorial.pbix' },
      { label: { fr: 'Product Strategy Canvas', en: 'Product Strategy Canvas', it: 'Product Strategy Canvas' }, type: 'dl', url: 'livrables/p6/product-strategy-canvas.docx' }
    ]
  },
  {
    id: 7, bloc: 'BC02', techs: ['DBT', 'SQL'],
    periode: { fr: 'Mai 2026', en: 'May 2026', it: 'Maggio 2026' },
    outils: ['DBT', 'Snowflake', 'SQL', 'GitHub'],
    titre: { fr: 'Analysez l’évolution de profils sociodémographiques avec DBT', en: 'Analyze the evolution of sociodemographic profiles with DBT', it: 'Analizza l’evoluzione dei profili sociodemografici con DBT' },
    contexte: {
      fr: 'Analyse de l’évolution des profils sociodémographiques d’étudiants (4 647 inscriptions) via un pipeline de données moderne : Snowflake + DBT (staging → marts), tests de qualité, et comparaison aux données de population INSEE par région et par âge.',
      en: 'Analysis of evolving student sociodemographic profiles (4,647 enrollments) through a modern data pipeline: Snowflake + DBT (staging → marts), data quality tests, and comparison with INSEE population data by region and age.',
      it: 'Analisi dell’evoluzione dei profili sociodemografici di studenti (4.647 iscrizioni) tramite una pipeline dati moderna: Snowflake + DBT (staging → marts), test di qualità, e confronto con i dati di popolazione INSEE per regione ed età.'
    },
    objectifs: {
      fr: ['Charger les données sur Snowflake et structurer le projet DBT (staging → marts).', 'Mettre en place des tests de qualité de données (valeurs nulles, catégories attendues).', 'Produire 5 tables d’analyse (marts) et les exporter pour restitution.'],
      en: ['Load data into Snowflake and structure the DBT project (staging → marts).', 'Set up data quality tests (null values, expected categories).', 'Produce 5 analysis tables (marts) and export them for reporting.'],
      it: ['Caricare i dati su Snowflake e strutturare il progetto DBT (staging → marts).', 'Implementare test di qualità dei dati (valori nulli, categorie attese).', 'Produrre 5 tabelle di analisi (marts) ed esportarle per la restituzione.']
    },
    resultats: {
      fr: ['Pipeline Snowflake + DBT opérationnel : staging vers 5 marts exportés.', 'Tests de qualité DBT en place (valeurs nulles, catégories attendues) et comparaison aux données INSEE par région et par âge.'],
      en: ['A working Snowflake + DBT pipeline: staging into 5 exported marts.', 'DBT data quality tests in place (nulls, expected categories) and comparison with INSEE data by region and age.'],
      it: ['Pipeline Snowflake + DBT operativa: staging verso 5 marts esportati.', 'Test di qualità DBT attivi (valori nulli, categorie attese) e confronto con i dati INSEE per regione ed età.']
    },
    limites: {
      fr: ['Périmètre limité aux inscriptions étudiantes ; pas d’historisation longue pour mesurer les évolutions fines.'],
      en: ['Scope limited to student enrollments; no long history to measure fine-grained trends.'],
      it: ['Perimetro limitato alle iscrizioni degli studenti; nessuna storicizzazione lunga per misurare evoluzioni fini.']
    },
    livrables: [
      { label: { fr: 'Présentation d’analyse complète', en: 'Full analysis presentation', it: 'Presentazione di analisi completa' }, type: 'embed', url: 'livrables/p7/presentation-analyse-dbt.pdf', view: 'livrables/p7/presentation-analyse-dbt.pdf' },
      { label: { fr: 'Description du workflow DBT', en: 'DBT workflow description', it: 'Descrizione del workflow DBT' }, type: 'embed', url: 'livrables/p7/rapport-dbt-sociodemographique.pdf', view: 'livrables/p7/rapport-dbt-sociodemographique.pdf' },
      { label: { fr: 'Dictionnaire des données', en: 'Data dictionary', it: 'Dizionario dei dati' }, type: 'embed', url: 'livrables/p7/dictionnaire-donnees.pdf', view: 'livrables/p7/dictionnaire-donnees.pdf' },
      { label: { fr: 'Mart — étudiants (tableau)', en: 'Mart — students (table)', it: 'Mart — studenti (tabella)' }, type: 'embed', url: 'livrables/p7/mart_students.html', view: 'livrables/p7/mart_students.html' },
      { label: { fr: 'Mart — par région (tableau)', en: 'Mart — by region (table)', it: 'Mart — per regione (tabella)' }, type: 'embed', url: 'livrables/p7/mart_by_region.html', view: 'livrables/p7/mart_by_region.html' },
      { label: { fr: 'Mart — par année (tableau)', en: 'Mart — by year (table)', it: 'Mart — per anno (tabella)' }, type: 'embed', url: 'livrables/p7/mart_by_year.html', view: 'livrables/p7/mart_by_year.html' },
      { label: { fr: 'Mart — comparaison INSEE par région (tableau)', en: 'Mart — INSEE comparison by region (table)', it: 'Mart — confronto INSEE per regione (tabella)' }, type: 'embed', url: 'livrables/p7/mart_comparison_region.html', view: 'livrables/p7/mart_comparison_region.html' },
      { label: { fr: 'Mart — comparaison INSEE par âge (tableau)', en: 'Mart — INSEE comparison by age (table)', it: 'Mart — confronto INSEE per età (tabella)' }, type: 'embed', url: 'livrables/p7/mart_comparison_age.html', view: 'livrables/p7/mart_comparison_age.html' }
    ],
    note: {
      fr: 'Le diaporama d’origine (93 Mo) a été compressé pour le web sans perte de lisibilité (3,4 Mo).',
      en: 'The original deck (93 MB) was compressed for the web with no loss of readability (3.4 MB).',
      it: 'La presentazione originale (93 MB) è stata compressa per il web senza perdita di leggibilità (3,4 MB).'
    }
  },
  {
    id: 8, bloc: 'BC05', techs: ['Python'],
    periode: { fr: 'Juillet 2026', en: 'July 2026', it: 'Luglio 2026' },
    outils: ['Python', 'Pandas', 'SciPy', 'statsmodels', 'Seaborn'],
    titre: { fr: 'Analysez les ventes d’une librairie avec R ou Python', en: 'Analyze a bookstore’s sales with R or Python', it: 'Analizza le vendite di una libreria con R o Python' },
    contexte: {
      fr: 'Chez Lapage, grande librairie en ligne : bilan après deux ans d’activité — analyse du chiffre d’affaires et de la saisonnalité, étude des comportements clients et tests statistiques (Chi², ANOVA, corrélations).',
      en: 'At Lapage, a large online bookstore: a two-year review — revenue and seasonality analysis, customer behavior study and statistical tests (Chi², ANOVA, correlations).',
      it: 'Da Lapage, grande libreria online: bilancio dopo due anni di attività — analisi del fatturato e della stagionalità, studio dei comportamenti dei clienti e test statistici (Chi², ANOVA, correlazioni).'
    },
    objectifs: {
      fr: ['Construire un jeu de données exploitable et analyser le chiffre d’affaires (tendances, saisonnalité).', 'Étudier les comportements clients : courbe de Lorenz, indice de Gini, segmentation.', 'Réaliser des analyses bivariées et des tests statistiques (Chi², ANOVA, corrélations).'],
      en: ['Build a usable dataset and analyze revenue (trends, seasonality).', 'Study customer behavior: Lorenz curve, Gini index, segmentation.', 'Run bivariate analyses and statistical tests (Chi², ANOVA, correlations).'],
      it: ['Costruire un dataset fruibile e analizzare il fatturato (tendenze, stagionalità).', 'Studiare i comportamenti dei clienti: curva di Lorenz, indice di Gini, segmentazione.', 'Realizzare analisi bivariate e test statistici (Chi², ANOVA, correlazioni).']
    },
    resultats: {
      fr: ['Bilan des deux ans d’activité : tendances et saisonnalité du chiffre d’affaires documentées.', 'Segmentation clients (Lorenz, Gini) et tests statistiques (Chi², ANOVA) livrés avec recommandations.'],
      en: ['Two-year review: revenue trends and seasonality documented.', 'Customer segmentation (Lorenz, Gini) and statistical tests (Chi², ANOVA) delivered with recommendations.'],
      it: ['Bilancio dei due anni di attività: tendenze e stagionalità del fatturato documentate.', 'Segmentazione clienti (Lorenz, Gini) e test statistici (Chi², ANOVA) consegnati con raccomandazioni.']
    },
    limites: {
      fr: ['Pas de données de marge disponibles : l’analyse reste centrée sur le chiffre d’affaires.'],
      en: ['No margin data available: the analysis stays focused on revenue.'],
      it: ['Nessun dato di margine disponibile: l’analisi resta centrata sul fatturato.']
    },
    livrables: [
      { label: { fr: 'Présentation des résultats', en: 'Results presentation', it: 'Presentazione dei risultati' }, type: 'embed', url: 'livrables/p8/presentation-librairie.pdf', view: 'livrables/p8/presentation-librairie.pdf' },
      { label: { fr: 'Notebook d’analyse (interactif)', en: 'Analysis notebook (interactive)', it: 'Notebook di analisi (interattivo)' }, type: 'embed', url: 'livrables/p8/notebook-librairie.html', view: 'livrables/p8/notebook-librairie.html' }
    ]
  },
  {
    id: 9, bloc: 'BC03', techs: ['Power BI'],
    periode: { fr: 'Août 2026', en: 'August 2026', it: 'Agosto 2026' },
    outils: ['Power BI', 'Power Query', 'DAX'],
    titre: { fr: 'Faites une étude sur l’eau potable', en: 'Study drinking water access', it: 'Realizza uno studio sull’acqua potabile' },
    contexte: {
      fr: 'Mission pour l’ONG DWFA (Drinking Water For All) : tableau de bord donnant une vue mondiale de l’accès à l’eau potable pour cibler les pays prioritaires — blueprint, mock-up et rapport Power BI de 3 pages.',
      en: 'Mission for the NGO DWFA (Drinking Water For All): a dashboard providing a global view of drinking water access to target priority countries — blueprint, mock-up and a 3-page Power BI report.',
      it: 'Missione per l’ONG DWFA (Drinking Water For All): dashboard con vista mondiale dell’accesso all’acqua potabile per individuare i paesi prioritari — blueprint, mock-up e report Power BI di 3 pagine.'
    },
    objectifs: {
      fr: ['Analyser le besoin client et formuler les questions analytiques.', 'Réaliser un blueprint et un mock-up avant développement.', 'Construire un rapport Power BI de 3 pages minimum (vues mondiale, continentale, nationale) avec filtres et champs calculés.'],
      en: ['Analyze the client’s needs and frame the analytical questions.', 'Produce a blueprint and mock-up before development.', 'Build a 3+ page Power BI report (world, continent and country views) with filters and calculated fields.'],
      it: ['Analizzare il bisogno del cliente e formulare le domande analitiche.', 'Realizzare blueprint e mock-up prima dello sviluppo.', 'Costruire un report Power BI di almeno 3 pagine (viste mondiale, continentale, nazionale) con filtri e campi calcolati.']
    },
    resultats: {
      fr: ['Rapport Power BI de 3 pages (monde / continent / pays) avec filtres et champs calculés.', 'Ciblage des pays prioritaires argumenté, blueprint et mock-up validés avant développement.'],
      en: ['A 3-page Power BI report (world / continent / country) with filters and calculated fields.', 'A reasoned targeting of priority countries, with blueprint and mock-up validated before development.'],
      it: ['Report Power BI di 3 pagine (mondo / continente / paese) con filtri e campi calcolati.', 'Individuazione motivata dei paesi prioritari, blueprint e mock-up validati prima dello sviluppo.']
    },
    limites: {
      fr: ['Granularité annuelle des indicateurs : pas de données infra-annuelles pour suivre les crises.'],
      en: ['Annual granularity of indicators: no sub-annual data to track crises.'],
      it: ['Granularità annuale degli indicatori: nessun dato infra-annuale per seguire le crisi.']
    },
    livrables: [
      { label: { fr: 'Présentation du projet', en: 'Project presentation', it: 'Presentazione del progetto' }, type: 'embed', url: 'livrables/p9/presentation-eau-potable.pdf', view: 'livrables/p9/presentation-eau-potable.pdf' },
      { label: { fr: 'Rapport Power BI (.pbix)', en: 'Power BI report (.pbix)', it: 'Report Power BI (.pbix)' }, type: 'dl', url: 'livrables/p9/rapport-eau-potable.pbix' },
      { label: { fr: 'Blueprint du rapport', en: 'Report blueprint', it: 'Blueprint del report' }, type: 'dl', url: 'livrables/p9/blueprint.docx' }
    ]
  },
  {
    id: 10, bloc: 'BC05', techs: ['Python'],
    periode: { fr: 'Septembre 2026', en: 'September 2026', it: 'Settembre 2026' },
    outils: ['Python', 'scikit-learn', 'SciPy', 'Jupyter'],
    titre: { fr: 'Produisez une étude de marché avec R ou Python', en: 'Produce a market study with R or Python', it: 'Produci uno studio di mercato con R o Python' },
    contexte: {
      fr: 'Pour La poule qui chante, entreprise française d’agroalimentaire qui souhaite s’implanter à l’international : étude de marché pour cibler les pays d’export — préparation des données FAO, ACP, classification hiérarchique et k-means.',
      en: 'For La poule qui chante, a French food company looking to expand abroad: a market study to target export countries — FAO data preparation, PCA, hierarchical clustering and k-means.',
      it: 'Per La poule qui chante, azienda francese agroalimentare che vuole espandersi all’estero: studio di mercato per individuare i paesi d’export — preparazione dei dati FAO, ACP, clustering gerarchico e k-means.'
    },
    objectifs: {
      fr: ['Préparer, nettoyer et explorer les données (indicateurs FAO) dans un premier notebook.', 'Réduire la dimension par ACP, puis classifier les pays (CAH et k-means).', 'Analyser les groupements et approfondir l’étude de marché dans un second notebook.'],
      en: ['Prepare, clean and explore the data (FAO indicators) in a first notebook.', 'Reduce dimensionality with PCA, then cluster countries (hierarchical clustering and k-means).', 'Analyze the clusters and deepen the market study in a second notebook.'],
      it: ['Preparare, pulire ed esplorare i dati (indicatori FAO) in un primo notebook.', 'Ridurre la dimensionalità con ACP, poi classificare i paesi (clustering gerarchico e k-means).', 'Analizzare i raggruppamenti e approfondire lo studio di mercato in un secondo notebook.']
    },
    resultats: {
      fr: ['Pays cibles regroupés en clusters interprétables (ACP, CAH, k-means).', 'Short-list de marchés d’export argumentée et présentée à la direction.'],
      en: ['Target countries grouped into interpretable clusters (PCA, hierarchical clustering, k-means).', 'A reasoned shortlist of export markets presented to management.'],
      it: ['Paesi target raggruppati in cluster interpretabili (ACP, clustering gerarchico, k-means).', 'Short-list di mercati d’export motivata e presentata alla direzione.']
    },
    limites: {
      fr: ['Indicateurs FAO partiels ou datés pour certains pays : la short-list doit être confirmée par des sources locales.'],
      en: ['FAO indicators are partial or dated for some countries: the shortlist should be confirmed with local sources.'],
      it: ['Indicatori FAO parziali o datati per alcuni paesi: la short-list va confermata con fonti locali.']
    },
    livrables: [
      { label: { fr: 'Présentation de l’étude de marché', en: 'Market study presentation', it: 'Presentazione dello studio di mercato' }, type: 'embed', url: 'livrables/p10/presentation-etude-marche.pdf', view: 'livrables/p10/presentation-etude-marche.pdf' },
      { label: { fr: 'Notebook 1 — préparation & nettoyage', en: 'Notebook 1 — preparation & cleaning', it: 'Notebook 1 — preparazione & pulizia' }, type: 'embed', url: 'livrables/p10/notebook-preparation.html', view: 'livrables/p10/notebook-preparation.html' },
      { label: { fr: 'Notebook 2 — ACP & clustering', en: 'Notebook 2 — PCA & clustering', it: 'Notebook 2 — ACP & clustering' }, type: 'embed', url: 'livrables/p10/notebook-acp-clustering.html', view: 'livrables/p10/notebook-acp-clustering.html' }
    ]
  },
  {
    id: 11, bloc: 'BC05', techs: ['Python'],
    periode: { fr: 'Octobre 2026', en: 'October 2026', it: 'Ottobre 2026' },
    outils: ['Python', 'scikit-learn', 'Pandas', 'Jupyter'],
    titre: { fr: 'Détectez des faux billets avec R ou Python', en: 'Detect counterfeit banknotes with R or Python', it: 'Rileva banconote false con R o Python' },
    contexte: {
      fr: 'Prestation pour l’ONCFM (Organisation nationale de lutte contre le faux-monnayage) : création d’un algorithme de détection de faux billets en euros à partir de leurs caractéristiques dimensionnelles — comparaison de modèles et application Python livrée.',
      en: 'Engagement for the ONCFM (French national anti-counterfeiting agency): building an algorithm to detect counterfeit euro banknotes from their dimensional features — model comparison and a delivered Python application.',
      it: 'Prestazione per l’ONCFM (Organisation nationale de lutte contre le faux-monnayage): creazione di un algoritmo per rilevare banconote false in euro dalle loro caratteristiche dimensionali — confronto di modelli e consegna di un’applicazione Python.'
    },
    objectifs: {
      fr: ['Réaliser la régression linéaire pour prédire une dimension manquante (margin_low).', 'Comparer les algorithmes de classification : régression logistique, k-means, kNN, forêt aléatoire.', 'Livrer un modèle optimisé (GridSearchCV, validation croisée) et une application Python de prédiction.'],
      en: ['Use linear regression to predict a missing dimension (margin_low).', 'Compare classification algorithms: logistic regression, k-means, kNN, random forest.', 'Deliver an optimized model (GridSearchCV, cross-validation) and a Python prediction app.'],
      it: ['Realizzare la regressione lineare per predire una dimensione mancante (margin_low).', 'Confrontare gli algoritmi di classificazione: regressione logistica, k-means, kNN, random forest.', 'Consegnare un modello ottimizzato (GridSearchCV, validazione incrociata) e un’applicazione Python di predizione.']
    },
    resultats: {
      fr: ['Modèle de détection sélectionné après comparaison de quatre algorithmes, optimisé par GridSearchCV et validation croisée.', 'Application Python de prédiction livrée avec sa notice d’utilisation.'],
      en: ['Detection model selected after comparing four algorithms, optimized with GridSearchCV and cross-validation.', 'A Python prediction application delivered with its user instructions.'],
      it: ['Modello di rilevamento selezionato dopo il confronto di quattro algoritmi, ottimizzato con GridSearchCV e validazione incrociata.', 'Applicazione Python di predizione consegnata con le istruzioni d’uso.']
    },
    limites: {
      fr: ['Jeu de données fourni figé : pas de gestion de la dérive des données (data drift) en production.'],
      en: ['The provided dataset is frozen: no data drift handling for production.'],
      it: ['Dataset fornito e congelato: nessuna gestione della deriva dei dati (data drift) in produzione.']
    },
    livrables: [
      { label: { fr: 'Présentation du projet', en: 'Project presentation', it: 'Presentazione del progetto' }, type: 'embed', url: 'livrables/p11/presentation-faux-billets.pdf', view: 'livrables/p11/presentation-faux-billets.pdf' },
      { label: { fr: 'Notebook de modélisation (interactif)', en: 'Modeling notebook (interactive)', it: 'Notebook di modellazione (interattivo)' }, type: 'embed', url: 'livrables/p11/notebook-faux-billets.html', view: 'livrables/p11/notebook-faux-billets.html' },
      { label: { fr: 'Application de détection (script Python)', en: 'Detection app (Python script)', it: 'Applicazione di rilevamento (script Python)' }, type: 'embed', url: 'livrables/p11/detection-billets-py.html', view: 'livrables/p11/detection-billets-py.html' },
      { label: { fr: 'Modèle entraîné (pickle)', en: 'Trained model (pickle)', it: 'Modello allenato (pickle)' }, type: 'dl', url: 'livrables/p11/modele-final.pkl' },
      { label: { fr: 'Notice d’utilisation', en: 'User instructions', it: 'Istruzioni d’uso' }, type: 'code', url: 'livrables/p11/instructions.txt', code: 'txt' }
    ]
  },
  {
    id: 12, bloc: 'BC04', techs: ['Python'],
    periode: { fr: 'Novembre 2026', en: 'November 2026', it: 'Novembre 2026' },
    outils: ['Pandera', 'Great Expectations', 'Isolation Forest', 'Polars', 'DuckDB', 'IA générative'],
    titre: { fr: 'Améliorez un livrable data avec l’IA et construisez votre portfolio', en: 'Improve a data deliverable with AI and build your portfolio', it: 'Migliora un deliverable data con l’IA e costruisci il tuo portfolio' },
    contexte: {
      fr: 'Dernier projet du parcours : amélioration critique et documentée de mon notebook du P5 (BottleNeck) à l’aide de l’IA, puis construction de ce portfolio. Veille méthodologique, cahier des charges fonctionnel, comparatifs mesurés et traçabilité complète des décisions.',
      en: 'Final project of the program: a critical, documented improvement of my P5 notebook (BottleNeck) using AI, then building this portfolio. Methodological watch, functional specifications, measured comparisons and full decision traceability.',
      it: 'Ultimo progetto del percorso: miglioramento critico e documentato del mio notebook del P5 (BottleNeck) con l’IA, poi costruzione di questo portfolio. Veille metodologica, capitolato funzionale, confronti misurati e tracciabilità completa delle decisioni.'
    },
    objectifs: {
      fr: ['Mener une veille métier et technologique sourcée et datée (validation de données, détection d’anomalies, moteurs de traitement).', 'Comparer au moins deux options par problème et justifier les choix par des mesures : qualité, biais, temps, reproductibilité, sobriété.', 'Documenter la démarche : cahier des charges, pilotage de projet, journal des essais IA et limites assumées.'],
      en: ['Run a sourced and dated business & technology watch (data validation, anomaly detection, processing engines).', 'Compare at least two options per problem and justify choices with measurements: quality, bias, time, reproducibility, sobriety.', 'Document the approach: functional specifications, project management, AI experiment log and acknowledged limitations.'],
      it: ['Condurre una veille métier e tecnologica con fonti datate (validazione dati, rilevamento anomalie, motori di trattamento).', 'Confrontare almeno due opzioni per problema e giustificare le scelte con misure: qualità, bias, tempi, riproducibilità, sobrietà.', 'Documentare il percorso: capitolato funzionale, gestione di progetto, diario degli esperimenti IA e limiti assunti.']
    },
    resultats: {
      fr: ['Contrat de données Pandera : 825 lignes validées en 0,44 s à chaque exécution — fini les corrections manuelles silencieuses.', 'Détection robuste des prix aberrants : IQR (36 outliers) complété par Isolation Forest (17 anomalies, dont une marge négative inédite).', 'Benchmark réel pandas / Polars / DuckDB : pandas conservé par sobriété ; le chiffre d’affaires de référence (153 748,10 €) est reproduit à l’euro près par le notebook v2.'],
      en: ['Pandera data contract: 825 rows validated in 0.44 s on every run — no more silent manual fixes.', 'Robust outlier detection: IQR (36 outliers) complemented by Isolation Forest (17 anomalies, including a previously unseen negative margin).', 'Real pandas / Polars / DuckDB benchmark: pandas kept for sobriety; the reference revenue (€153,748.10) is reproduced to the cent by notebook v2.'],
      it: ['Contratto dati Pandera: 825 righe validate in 0,44 s a ogni esecuzione — basta correzioni manuali silenziose.', 'Rilevamento robusto dei prezzi anomali: IQR (36 outlier) completato da Isolation Forest (17 anomalie, incluso un margine negativo inedito).', 'Benchmark reale pandas / Polars / DuckDB: pandas mantenuto per sobrietà; il fatturato di riferimento (153.748,10 €) è riprodotto all’euro dal notebook v2.']
    },
    limites: {
      fr: ['Seuils conventionnels (1,5 x IQR, contamination 2 %) : une relecture métier reste systématiquement nécessaire.'],
      en: ['Conventional thresholds (1.5 x IQR, 2% contamination): a business review remains systematically necessary.'],
      it: ['Soglie convenzionali (1,5 x IQR, contaminazione 2%): resta sempre necessaria una rilettura di business.']
    },
    livrables: [
      { label: { fr: 'Notebook amélioré v2 (interactif)', en: 'Improved notebook v2 (interactive)', it: 'Notebook migliorato v2 (interattivo)' }, type: 'embed', url: 'livrables/p12/notebook-bottleneck-v2.html', view: 'livrables/p12/notebook-bottleneck-v2.html' },
      { label: { fr: 'Documentation de la démarche (veille, CDC, POC, traçabilité IA)', en: 'Approach documentation (watch, specs, POCs, AI traceability)', it: 'Documentazione del percorso (veille, capitolato, POC, tracciabilità IA)' }, type: 'embed', url: 'livrables/p12/documentation-de-la-demarche.pdf', view: 'livrables/p12/documentation-de-la-demarche.pdf' },
      { label: { fr: 'Glossaire des concepts et sigles', en: 'Glossary of concepts and acronyms', it: 'Glossario dei concetti e delle sigle' }, type: 'embed', url: 'livrables/p12/glossaire-concepts.pdf', view: 'livrables/p12/glossaire-concepts.pdf' }
    ]
  }
];

/* ============ i18n helpers ============ */
const t = key => (T[lang] && T[lang][key]) || key;
const L = obj => (typeof obj === 'string' ? obj : (obj[lang] || obj.fr));
const projectWord = plural => lang === 'en' ? (plural ? 'Projects' : 'Project')
  : lang === 'it' ? (plural ? 'Progetti' : 'Progetto')
  : (plural ? 'Projets' : 'Projet');

function applyStaticTexts() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.innerHTML = t(el.dataset.i18n);
  });
}

/* ============ Langue ============ */
function setLang(l) {
  if (!LANGS.includes(l)) return;
  lang = l;
  localStorage.setItem('portfolio-lang', l);
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === l));
  applyStaticTexts();
  renderToolsCloud();
  renderBlocs();
  renderVeille();
  renderTechFilters();
  renderProjects();
  closeModal();
}

document.querySelectorAll('.lang-btn').forEach(b => {
  b.addEventListener('click', () => setLang(b.dataset.lang));
});

/* ============ Rendu : nuage d'outils ============ */
function renderToolsCloud() {
  document.getElementById('tools-cloud').innerHTML =
    TOOLS_CLOUD.map(o => `<span>${o}</span>`).join('');
}

/* ============ Rendu : blocs RNCP ============ */
function renderBlocs() {
  const grid = document.getElementById('bloc-grid');
  grid.innerHTML = '';
  BLOCS.forEach(b => {
    const card = document.createElement('article');
    const clickable = !!b.projets;
    card.className = 'bloc-card' + (clickable ? '' : ' bloc-static') +
      (clickable && state.bloc === b.id ? ' active' : '');
    if (clickable) card.dataset.blocfilter = b.id;
    card.innerHTML = `
      <span class="bloc-tag">${b.id}</span>
      <h3>${L(b.h3)}</h3>
      <p>${L(b.p)}</p>
      <p class="bloc-projets">${clickable
        ? `${projectWord(true)} ${b.projets} ${t('bloc.click')}`
        : t('bloc.none')}</p>`;
    if (clickable) {
      card.addEventListener('click', () => {
        state.bloc = b.id;
        renderBlocs();
        renderProjects();
        document.getElementById('projets').scrollIntoView({ behavior: 'smooth' });
      });
    }
    grid.appendChild(card);
  });
}

/* ============ Rendu : veille ============ */
function renderVeille() {
  const grid = document.getElementById('veille-grid');
  if (!grid) return;
  grid.innerHTML = '';
  VEILLE.forEach(v => {
    const card = document.createElement('article');
    card.className = 'bloc-card bloc-static';
    card.innerHTML = `<h3>${L(v.h3)}</h3><p>${L(v.p)}</p>`;
    grid.appendChild(card);
  });
}

/* ============ Filtres ============ */
const state = { bloc: 'all', tech: 'all' };

function renderTechFilters() {
  const bar = document.getElementById('filters-tech');
  bar.innerHTML = '';
  ['all', ...TECHS].forEach(tech => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn filter-tech' + (state.tech === tech ? ' active' : '');
    btn.textContent = tech === 'all' ? t('filter.all') : tech;
    btn.addEventListener('click', () => {
      state.tech = tech;
      renderTechFilters();
      renderProjects();
    });
    bar.appendChild(btn);
  });
}

/* barre de filtres "blocs" */
document.getElementById('filters').addEventListener('click', e => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  state.bloc = btn.dataset.filter;
  document.querySelectorAll('#filters .filter-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.filter === state.bloc));
  renderBlocs();
  renderProjects();
});

/* ============ Rendu : projets ============ */
const grid = document.getElementById('project-grid');

function renderProjects() {
  grid.innerHTML = '';
  const list = PROJECTS.filter(p =>
    (state.bloc === 'all' || p.bloc === state.bloc) &&
    (state.tech === 'all' || p.techs.includes(state.tech)));
  document.getElementById('empty-state').hidden = list.length > 0;
  list.forEach(p => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.innerHTML = `
      <div class="project-top">
        <span class="project-num">P${String(p.id).padStart(2, '0')}</span>
        <span class="project-bloc">${p.bloc}</span>
      </div>
      <h3 class="project-title">${L(p.titre)}</h3>
      <p class="project-context">${L(p.contexte)}</p>
      <div class="project-tools">${p.outils.map(o => `<span>${o}</span>`).join('')}</div>
      <span class="project-more">${t('card.more')}</span>
    `;
    card.addEventListener('click', () => openModal(p.id));
    grid.appendChild(card);
  });
}

/* ============ Coloration syntaxique minimaliste ============ */
function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function highlight(code, lang) {
  let out = escapeHtml(code);
  if (lang === 'sql') {
    out = out.replace(/\b(SELECT|FROM|WHERE|GROUP|BY|ORDER|HAVING|JOIN|LEFT|RIGHT|INNER|OUTER|CROSS|ON|AS|AND|OR|NOT|NULL|CREATE|TABLE|INSERT|INTO|VALUES|UPDATE|SET|DELETE|DROP|ALTER|ADD|PRIMARY|FOREIGN|KEY|REFERENCES|CONSTRAINT|DEFAULT|DISTINCT|COUNT|SUM|AVG|MIN|MAX|CASE|WHEN|THEN|ELSE|END|BETWEEN|IN|IS|LIKE|UNION|ALL|LIMIT|OFFSET|INT|INTEGER|VARCHAR|CHAR|TEXT|DATE|DATETIME|DECIMAL|FLOAT|DOUBLE|BOOLEAN|ENGINE|CHARSET|VIEW|INDEX|AUTO_INCREMENT|IF|EXISTS)\b/gi, '<span class="tok-k">$1</span>');
    out = out.replace(/(--[^\n]*)/g, '<span class="tok-c">$1</span>');
  } else if (lang === 'python') {
    out = out.replace(/\b(def|return|import|from|as|if|elif|else|for|while|in|not|and|or|None|True|False|with|try|except|finally|class|lambda|print|raise|pass|break|continue|input)\b/g, '<span class="tok-k">$1</span>');
    out = out.replace(/(#[^\n]*)/g, '<span class="tok-c">$1</span>');
  }
  return out;
}

async function showPreview(view, codeLang, label, preview, frame, codeBox, titleEl) {
  titleEl.textContent = label;
  preview.hidden = false;
  if (codeLang) {
    frame.style.display = 'none';
    codeBox.style.display = 'block';
    codeBox.innerHTML = '<p class="code-loading">…</p>';
    try {
      const res = await fetch(view);
      if (!res.ok) throw new Error();
      let text = await res.text();
      let truncated = false;
      if (text.length > 400000) { text = text.slice(0, 400000); truncated = true; }
      const lines = highlight(text, codeLang === 'csv' || codeLang === 'txt' ? 'plain' : codeLang)
        .split('\n').map(l => `<span class="cl">${l || ' '}</span>`).join('');
      codeBox.innerHTML = `<pre class="code-view">${lines}</pre>` +
        (truncated ? `<p class="code-note">${t('preview.truncated')}</p>` : '');
    } catch {
      codeBox.innerHTML = `<p class="code-note">${t('preview.error')}</p>`;
    }
  } else {
    codeBox.style.display = 'none';
    frame.style.display = 'block';
    frame.src = view;
  }
}

/* ============ Modal ============ */
const backdrop = document.getElementById('modal-backdrop');
const modalBody = document.getElementById('modal-body');

function livrableRow(l) {
  const voir = (l.type !== 'dl')
    ? `<button class="liv-view" data-view="${l.view || l.url}" data-code="${l.code || ''}">${t('modal.view')}</button>`
    : '';
  return `
    <li class="liv-row">
      <span class="liv-label">${L(l.label)}</span>
      <span class="liv-actions">${voir}<a class="liv-dl" href="${l.url}" target="_blank" rel="noopener" title="${t('modal.download')}" download>⬇</a></span>
    </li>`;
}

function openModal(id) {
  const p = PROJECTS.find(x => x.id === id);
  if (!p) return;
  modalBody.innerHTML = `
    <p class="modal-kicker">${projectWord(false)} ${String(p.id).padStart(2, '0')} · ${p.bloc} · ${L(p.periode)}</p>
    <h3 class="modal-title">${L(p.titre)}</h3>
    <div class="modal-meta">${p.outils.map(o => `<span>${o}</span>`).join('')}</div>
    <h4>${t('modal.presentation')}</h4>
    <p>${L(p.contexte)}</p>
    <h4>${t('modal.objectifs')}</h4>
    <ul>${L(p.objectifs).map(o => `<li>${o}</li>`).join('')}</ul>
    ${p.resultats ? `<h4>${t('modal.resultats')}</h4>
    <ul>${L(p.resultats).map(o => `<li>${o}</li>`).join('')}</ul>` : ''}
    ${p.limites ? `<h4>${t('modal.limites')}</h4>
    <ul>${L(p.limites).map(o => `<li>${o}</li>`).join('')}</ul>` : ''}
    <h4>${t('modal.livrables')}</h4>
    <ul class="livrables">${p.livrables.map(livrableRow).join('')}</ul>
    <div class="preview" id="preview" hidden>
      <div class="preview-bar">
        <span id="preview-title"></span>
        <button class="preview-close" id="preview-close">${t('modal.closePreview')}</button>
      </div>
      <iframe class="preview-frame" id="preview-frame" title="Preview"></iframe>
      <div class="preview-code" id="preview-code" hidden></div>
    </div>
    ${p.note ? `<p class="modal-note">${L(p.note)}</p>` : ''}
  `;

  const preview = modalBody.querySelector('#preview');
  const frame = modalBody.querySelector('#preview-frame');
  const codeBox = modalBody.querySelector('#preview-code');
  const titleEl = modalBody.querySelector('#preview-title');

  modalBody.querySelectorAll('.liv-view').forEach(btn => {
    btn.addEventListener('click', () => {
      showPreview(btn.dataset.view, btn.dataset.code || null,
        btn.closest('.liv-row').querySelector('.liv-label').textContent,
        preview, frame, codeBox, titleEl);
      modalBody.querySelectorAll('.liv-view').forEach(b => b.classList.remove('current'));
      btn.classList.add('current');
      preview.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });
  modalBody.querySelector('#preview-close').addEventListener('click', () => {
    preview.hidden = true;
    frame.src = 'about:blank';
    codeBox.innerHTML = '';
    modalBody.querySelectorAll('.liv-view').forEach(b => b.classList.remove('current'));
  });

  backdrop.hidden = false;
  document.body.style.overflow = 'hidden';
  history.replaceState(null, '', '#projet-' + p.id);
}

function closeModal() {
  if (backdrop.hidden) return;
  backdrop.hidden = true;
  document.body.style.overflow = '';
  history.replaceState(null, '', location.pathname);
}

document.getElementById('modal-close').addEventListener('click', closeModal);
backdrop.addEventListener('click', e => { if (e.target === backdrop) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !backdrop.hidden) closeModal(); });

window.addEventListener('load', () => {
  const m = location.hash.match(/^#projet-(\d+)$/);
  if (m) openModal(parseInt(m[1], 10));
});

/* ============ Init ============ */
document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
applyStaticTexts();
renderToolsCloud();
renderBlocs();
renderVeille();
renderTechFilters();
renderProjects();
