# BottleNeck — Notebook v2 (analyse des ventes et des stocks)

Version améliorée du livrable du projet 6, réalisée dans le cadre du projet 13.
Analyse des ventes en ligne, des prix aberrants et des stocks à partir de trois
fichiers sources, avec validation automatique de la qualité des données (Pandera),
détection d'anomalies robuste (IQR + Isolation Forest) et reproductibilité verrouillée.

## Contenu du dossier

| Élément | Rôle |
|---|---|
| `ELLI_Michelangelo_notebook_v2_112026.ipynb` | le notebook d'analyse (45 cellules) |
| `data/` | les trois fichiers bruts : `erp.csv`, `web.csv`, `liaison.csv` — **ne jamais les modifier** |
| `requirements.txt` | les versions exactes des bibliothèques utilisées |
| `sortie/` | les livrables régénérés à chaque exécution (créé automatiquement) |
| `P13_Documentation_de_la_demarche.pdf` | veille, cahier des charges, journal des essais IA et décisions |

## Prérequis

- Windows 10/11 avec Python 3.12 ou supérieur
- VS Code avec l'extension Jupyter, ou Jupyter Lab
- Les instructions ci-dessous utilisent PowerShell (Windows)

## Installation

Depuis ce dossier, dans un terminal PowerShell :

```powershell
# (recommandé) créer un environnement dédié
python -m venv .venv
.\.venv\Scripts\Activate.ps1

# installer les versions exactes utilisées pour développer le notebook
pip install -r requirements.txt
```

## Exécution

1. Ouvrir `ELLI_Michelangelo_notebook_v2_112026.ipynb` dans VS Code.
2. Vérifier que le kernel sélectionné (en haut à droite) correspond à l'environnement créé.
3. **Kernel → Restart Kernel and Run All Cells**.
4. Durée totale : moins d'une minute.

## Vérifications (ancres de validation)

À la fin de l'exécution, ces trois valeurs doivent être reproduites exactement :

- Chiffre d'affaires web : **153 748,10 €**
- Valorisation du stock : **298 627,66 €**
- Nombre total de produits en stock : **17 822 unités**

Si l'ancre du chiffre d'affaires ne tient pas, le pipeline est en écart avec la
version validée par la direction : ne pas utiliser les résultats sans investigation.

## Livrables régénérés (dossier `sortie/`)

| Fichier | Contenu |
|---|---|
| `dataset_final.csv` | le dataset fusionné et nettoyé (825 produits) |
| `outliers_prix_iqr.csv` | les 36 produits au prix atypique (méthode IQR) |
| `anomalies_isolation_forest.csv` | les 17 anomalies multivariées détectées |
| `check.csv` | produits à vérifier (anomalie ou marge négative) |
| `reorder.csv` | produits à réapprovisionner (risque de rupture) |
| `promo.csv` | produits au stock dormant (candidats promotion) |

## Règles d'usage

- Les fichiers de `data/` ne sont **jamais modifiés** : chaque correction est une
  règle documentée du notebook (R1 à R9), appliquée à l'exécution.
- La qualité des données est validée automatiquement par des contrats Pandera :
  un export anormal arrête le notebook avec la liste des lignes fautives.
- Les résultats sont identiques d'une exécution à l'autre (seed unique `SEED = 42`).
- La v1 du notebook reste la référence inchangée ; cette v2 est le livrable amélioré.
