# -*- coding: utf-8 -*-
"""
Application de détection de faux billets - ONCFM
=================================================

Ce script utilise le modèle final (régression logistique) entraîné sur
les 1 500 billets fournis par l'ONCFM pour prédire si un billet est
vrai ou faux, à partir de ses 6 dimensions géométriques.

Deux modes d'utilisation :
  1. Avec un fichier CSV contenant plusieurs billets :
         python detection_billets.py billets_production.csv
     Le fichier doit contenir les colonnes :
         diagonal, height_left, height_right, margin_low, margin_up, length
     (séparateur ";" ou ",")

  2. En mode interactif (saisie manuelle des dimensions d'un billet) :
         python detection_billets.py

Le résultat affiché est binaire : VRAI BILLET ou FAUX BILLET.
"""

import sys
import os
import numpy as np
import pandas as pd
import joblib

# Chargement du modèle entraîné (régression logistique + standardisation)
CHEMIN_MODELE = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                             "modele_final.pkl")
COLONNES = ["diagonal", "height_left", "height_right",
            "margin_low", "margin_up", "length"]


def charger_modele():
    """Charge le modèle, le scaler et l'outil d'imputation."""
    if not os.path.exists(CHEMIN_MODELE):
        sys.exit("Erreur : le fichier modele_final.pkl est introuvable. "
                 "Il faut d'abord entraîner le modèle.")
    return joblib.load(CHEMIN_MODELE)


def completer_donnees(donnees, outils):
    """
    Prépare les données avant la prédiction :
      - vérifie que toutes les colonnes sont présentes ;
      - si margin_low est manquant, on l'estime par la régression
        linéaire apprise pendant l'entraînement (même méthode que
        pour le fichier d'entraînement).
    """
    donnees = donnees.copy()
    manquantes = [c for c in COLONNES if c not in donnees.columns]
    if manquantes:
        sys.exit(f"Erreur : colonnes manquantes dans les données : {manquantes}")

    masque = donnees["margin_low"].isna()
    if masque.any():
        reg = outils["reg_imputation"]
        vars_exp = outils["variables_explicatives"]
        donnees.loc[masque, "margin_low"] = reg.predict(
            donnees.loc[masque, vars_exp])
    return donnees[COLONNES].astype(float)


def predire(donnees, outils):
    """
    Renvoie, pour chaque billet, une prédiction binaire
    (True = vrai billet, False = faux billet) et la probabilité
    associée donnée par la régression logistique.
    """
    X = completer_donnees(donnees, outils)
    X_std = outils["scaler"].transform(X)
    predictions = outils["modele"].predict(X_std)
    probabilites = outils["modele"].predict_proba(X_std)
    classes = list(outils["modele"].classes_)
    proba_vrai = probabilites[:, classes.index(True)]
    return predictions, proba_vrai


def mode_fichier(chemin_csv, outils):
    """Prédit la nature de tous les billets contenus dans un fichier CSV."""
    # On essaie le séparateur ";" puis ","
    donnees = pd.read_csv(chemin_csv, sep=";")
    if len(donnees.columns) == 1:
        donnees = pd.read_csv(chemin_csv, sep=",")

    predictions, proba_vrai = predire(donnees, outils)

    print(f"\nFichier analysé : {chemin_csv}")
    print(f"Nombre de billets : {len(donnees)}\n")
    for i, (pred, p) in enumerate(zip(predictions, proba_vrai), start=1):
        verdict = "VRAI BILLET" if pred else "FAUX BILLET"
        print(f"Billet n°{i:<4} -> {verdict:<12} "
              f"(probabilité d'être vrai : {p:.1%})")

    n_faux = int((~predictions).sum())
    print(f"\nRésumé : {int(predictions.sum())} vrais billets, "
          f"{n_faux} faux billets détectés.")

    # Sauvegarde d'un fichier de résultats
    resultats = donnees.copy()
    resultats["prediction_vrai"] = predictions
    nom_sortie = os.path.splitext(chemin_csv)[0] + "_resultats.csv"
    resultats.to_csv(nom_sortie, sep=";", index=False)
    print(f"Résultats sauvegardés dans : {nom_sortie}")


def mode_interactif(outils):
    """Demande les dimensions d'un billet et affiche la prédiction."""
    print("=== Détection de faux billets - ONCFM ===")
    print("Saisissez les dimensions du billet (en mm).")
    print("Laissez vide margin_low si elle n'est pas mesurée.\n")

    valeurs = {}
    for col in COLONNES:
        while True:
            saisie = input(f"{col} : ").strip().replace(",", ".")
            if saisie == "" and col == "margin_low":
                valeurs[col] = np.nan
                break
            try:
                valeurs[col] = float(saisie)
                break
            except ValueError:
                print("  Valeur invalide, veuillez saisir un nombre.")

    donnees = pd.DataFrame([valeurs])
    predictions, proba_vrai = predire(donnees, outils)
    pred, p = predictions[0], proba_vrai[0]

    print("\n--- Résultat ---")
    if pred:
        print(f"VRAI BILLET (probabilité : {p:.1%})")
    else:
        print(f"FAUX BILLET (probabilité d'être vrai : {p:.1%})")


def main():
    outils = charger_modele()
    if len(sys.argv) > 1:
        mode_fichier(sys.argv[1], outils)
    else:
        mode_interactif(outils)


if __name__ == "__main__":
    main()
