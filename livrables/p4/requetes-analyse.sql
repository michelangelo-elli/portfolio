-- 1. Nombre total d’appartements vendus au 1er semestre 2020.
select type_local, count(*)
from val_foncieres_analysis
where type_local = 'appartement';

-- 2. Le nombre de ventes d’appartement par région pour le 1er semestre 2020.
select reg_nom, type_local, count(*)
from val_foncieres_analysis
Join ref_geo On val_foncieres_analysis.com_code = ref_geo.com_code
where type_local = 'appartement'
group by reg_nom;

-- 3. Proportion des ventes d’appartements par le nombre de pièces.
SELECT
  nombre_pieces_principales,
  nb_ventes,
  ROUND(nb_ventes * 100.0 / total_ventes, 2) AS proportion_pourcent
FROM (
  SELECT
    nombre_pieces_principales,
    COUNT(*) AS nb_ventes,
    (SELECT COUNT(*)
     FROM VAL_FONCIERES_ANALYSIS
     WHERE type_local = 'Appartement') AS total_ventes
  FROM VAL_FONCIERES_ANALYSIS
  WHERE type_local = 'Appartement'
  GROUP BY nombre_pieces_principales
) t
ORDER BY nombre_pieces_principales;


-- 4. Liste des 10 départements où le prix du mètre carré est le plus élevé. OK
SELECT 
    ref_geo.dep_nom, 
    round (AVG(val_foncieres_analysis.prix_m2), 2) AS prix_moy_m2
FROM val_foncieres_analysis
JOIN ref_geo ON val_foncieres_analysis.com_code = ref_geo.com_code
GROUP BY ref_geo.dep_nom
ORDER BY prix_moy_m2 DESC
LIMIT 10;

-- 5. Prix moyen du mètre carré d’une maison en Île-de-France. OK
select 
	round(avg(val_foncieres_analysis.prix_m2), 2) as "Prix moyen Maison en Île de France"
From val_foncieres_analysis
JOIN ref_geo ON val_foncieres_analysis.com_code = ref_geo.com_code
Where reg_nom = "Ile-de-France" and type_local = "Maison"
;

-- 6. Liste des 10 appartements les plus chers avec la région et le nombre de mètres carrés.
select valeur_fonciere, reg_nom, surface_clean
from val_foncieres_analysis
JOIN ref_geo ON val_foncieres_analysis.com_code = ref_geo.com_code
where type_local = "Appartement"
order by valeur_fonciere DESC
Limit 10;

-- 7 Taux d’évolution du nombre de ventes entre le premier et le second trimestre de 2020.
SELECT
  ROUND(
    (ventes_T2 - ventes_T1) / ventes_T1 * 100, 2
  ) AS taux_evolution_pourcent
FROM (
  SELECT
    SUM(CASE WHEN QUARTER(date_mutation) = 1 THEN 1 ELSE 0 END) AS ventes_T1,
    SUM(CASE WHEN QUARTER(date_mutation) = 2 THEN 1 ELSE 0 END) AS ventes_T2
  FROM VAL_FONCIERES_ANALYSIS
  WHERE YEAR(date_mutation) = 2020
) t;


-- 8. Le classement des régions par rapport au prix au mètre carré des appartement de plus de 4 pièces. ok
select reg_nom,
	round(Avg(val_foncieres_analysis.prix_M2),2) as Moyenne_Prix_par_région
from val_foncieres_analysis
JOIN ref_geo ON val_foncieres_analysis.com_code = ref_geo.com_code
where type_local = 'Appartement'
	and nombre_pieces_principales >4
group by reg_nom
order by Moyenne_Prix_par_région DESC;

-- 9. Liste des communes ayant eu au moins 50 ventes au 1er trimestre
select ref_geo.com_nom_maj, count(*) as numeros_de_ventes
from val_foncieres_analysis
JOIN ref_geo ON val_foncieres_analysis.com_code = ref_geo.com_code
where quarter(val_foncieres_analysis.date_mutation)=1
group by com_nom_maj
having numeros_de_ventes >=50
order by numeros_de_ventes ASC;

-- 10 Différence en pourcentage du prix au m2 pour nombre de pieces de 2 et 3 pieces    
SELECT
  moyenne_2p,
  moyenne_3p,
  ROUND(
    (moyenne_3p - moyenne_2p) / moyenne_2p * 100,
    2
  ) AS diff_pourcentage
FROM (
  SELECT
    round(AVG(CASE WHEN nombre_pieces_principales = 2 THEN prix_m2 END), 2) AS moyenne_2p,
    round(AVG(CASE WHEN nombre_pieces_principales = 3 THEN prix_m2 END), 2) AS moyenne_3p
  FROM VAL_FONCIERES_ANALYSIS
  WHERE type_local = 'Appartement'
) t;


-- 11. Les moyennes de valeurs foncières pour le top 3 des communes des départements 6, 13, 33, 59 et 69.
SELECT
  dep_code,
  com_nom_maj,
  moyenne_valeur
FROM (
  SELECT
    rg.dep_code,
    rg.com_nom_maj,
    round(AVG(vf.valeur_fonciere), 2) AS moyenne_valeur,
    ROW_NUMBER() OVER (
      PARTITION BY rg.dep_code
      ORDER BY AVG(vf.valeur_fonciere) DESC
    ) AS rang
  FROM VAL_FONCIERES_ANALYSIS vf
  JOIN ref_geo rg
    ON vf.com_code = rg.com_code
  WHERE rg.dep_code IN ('6', '13', '33', '59', '69')
  GROUP BY rg.dep_code, rg.com_nom_maj
) t
WHERE rang <= 3
ORDER BY dep_code, moyenne_valeur DESC;


-- 12. Les 20 communes avec le plus de transactions pour 1000 habitants pour les communes qui dépassent les 10 000 habitants.
SELECT
  rg.com_nom_maj AS commune,
  dc.ptot AS population,
  COUNT(vf.id_transaction_pk) AS nb_transactions,
  ROUND(
    COUNT(vf.id_transaction_pk) * 1000.0 / dc.ptot,
    2
  ) AS transactions_pour_1000_habitants
FROM VAL_FONCIERES_ANALYSIS vf
JOIN ref_geo rg
  ON vf.com_code = rg.com_code
JOIN Donnees_communes dc
  ON vf.com_code = dc.com_code
WHERE dc.ptot > 10000
GROUP BY rg.com_nom_maj, dc.ptot
ORDER BY transactions_pour_1000_habitants DESC
LIMIT 20;

select *
from val_foncieres_analysis
JOIN ref_geo rg
  ON val_foncieres_analysis.com_code = rg.com_code
where com_nom_maj = 'Nice'
;
