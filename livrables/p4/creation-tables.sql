CREATE TABLE REF_GEO (
                com_code VARCHAR(6) NOT NULL,
                com_nom_maj VARCHAR(50) NOT NULL,
                reg_nom VARCHAR(50) NOT NULL,
                dep_nom VARCHAR(50) NOT NULL,
                dep_code varchar(50) NOT NULL,
                PRIMARY KEY (com_code)
);


CREATE TABLE DONNEES_COMMUNES (
                com_code VARCHAR(6) NOT NULL,
                pmun INT NOT NULL,
                ptot INT NOT NULL,
                PRIMARY KEY (com_code)
);


CREATE TABLE VAL_FONCIERES (
    id_transaction VARCHAR(100) NOT NULL,
    com_code VARCHAR(10) NOT NULL,
    mutation_dt DATE, 
    valeur_fonciere VARCHAR(100), 
    type_local VARCHAR(100),
    reference_cadastrale VARCHAR(100),
    prix_m2_bati DECIMAL(15,2),
    Nombre_pieces_principales INT,
    surface_reelle_bati DECIMAL(10,2),
    PRIMARY KEY (id_transaction)
);


ALTER TABLE VAL_FONCIERES ADD CONSTRAINT ref_geo_val_foncieres_fk
FOREIGN KEY (com_code)
REFERENCES REF_GEO (com_code)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE DONNEES_COMMUNES ADD CONSTRAINT ref_geo_donnees_communes_fk
FOREIGN KEY (com_code)
REFERENCES REF_GEO (com_code)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

SET FOREIGN_KEY_CHECKS = 1;
SET SQL_SAFE_UPDATES = 0;
UPDATE VAL_FONCIERES 
SET valeur_fonciere = NULL 
WHERE valeur_fonciere = ''
;
ALTER TABLE VAL_FONCIERES MODIFY COLUMN valeur_fonciere DECIMAL(15,2);
SET SQL_SAFE_UPDATES = 1;

CREATE TABLE VAL_FONCIERES_CLEAN AS
SELECT 
    id_transaction,
    mutation_dt,
    valeur_fonciere,
    com_code,
    type_local,
    reference_cadastrale,
    Nombre_pieces_principales
    surface_clean,
    (valeur_fonciere / surface_clean) AS prix_m2
FROM VAL_FONCIERES
WHERE 
    type_local IN ('Appartement', 'Maison') 
    AND valeur_fonciere IS NOT NULL 
    AND surface_clean IS NOT NULL
    AND (valeur_fonciere / surface_clean) BETWEEN 1000 AND 40000
    AND surface_clean >= 15;




-- ============================================
-- Contraintes d'intégrité (clés étrangères)
-- ============================================

ALTER TABLE VAL_FONCIERES ADD CONSTRAINT ref_geo_val_foncieres_fk
FOREIGN KEY (com_code)
REFERENCES REF_GEO (com_code)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE DONNEES_COMMUNES ADD CONSTRAINT ref_geo_donnees_communes_fk
FOREIGN KEY (com_code)
REFERENCES REF_GEO (com_code)
ON DELETE NO ACTION
ON UPDATE NO ACTION;
