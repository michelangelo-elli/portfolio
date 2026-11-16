use ziopera;
CREATE TABLE Region (
    Code_dep_code_commune VARCHAR(10) NOT NULL,
    reg_code INT NOT NULL,
    reg_nom VARCHAR(50) NOT NULL,
    aca_nom VARCHAR(50) NOT NULL,
    dep_nom VARCHAR(50) NOT NULL,
    com_nom_maj_court VARCHAR(100) NOT NULL,
    dep_code VARCHAR(5) NOT NULL,
    dep_nom_num VARCHAR(50) NOT NULL,
    PRIMARY KEY (Code_dep_code_commune)
);
CREATE TABLE Contrat (
    Contrat_ID INT NOT NULL,
    Code_dep_code_commune VARCHAR(10) NOT NULL,
    No_voie INT NULL,
    B_T_Q VARCHAR(2) NULL,
    Type_de_voie VARCHAR(10) NULL,
    Voie VARCHAR(100) NOT NULL,
    Code_postal INT NOT NULL,
    Surface INT NOT NULL,
    Type_local VARCHAR(50) NOT NULL,
    Occupation VARCHAR(30) NOT NULL,
    Type_contrat VARCHAR(50) NOT NULL,
    Formule VARCHAR(30) NOT NULL,
    Valeur_declaree_biens VARCHAR(30) NOT NULL,
    Prix_cotisation_mensuel INT NOT NULL,
    PRIMARY KEY (Contrat_ID)
);
ALTER TABLE Contrat
ADD CONSTRAINT region_contrat_fk
FOREIGN KEY (Code_dep_code_commune)
REFERENCES Region (Code_dep_code_commune)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

SET foreign_key_checks = 0;

LOAD DATA INFILE "C:/ProgramData/MySQL/MySQL Server 9.4/Uploads/Region+(7)(2).csv"
INTO TABLE Region
FIELDS TERMINATED BY ';'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 9.4/Uploads/Contrat+(4)(2).csv'
INTO TABLE Contrat
FIELDS TERMINATED BY ';'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(@Contrat_ID, @No_voie, @B_T_Q, @Type_de_voie, @Voie, @Code_dep_code_commune, 
 @Code_postal, @Surface, @Type_local, @Occupation, @Type_contrat, 
 @Formule, @Valeur_declaree_biens, @Prix_cotisation_mensuel)
SET
  Contrat_ID = @Contrat_ID,
  No_voie = NULLIF(@No_voie, ''),
  B_T_Q = NULLIF(@B_T_Q, ''),
  Type_de_voie = NULLIF(@Type_de_voie, ''),
  Voie = @Voie,
  Code_dep_code_commune = @Code_dep_code_commune,
  Code_postal = @Code_postal,
  Surface = @Surface,
  Type_local = @Type_local,
  Occupation = @Occupation,
  Type_contrat = @Type_contrat,
  Formule = @Formule,
  Valeur_declaree_biens = @Valeur_declaree_biens,
  Prix_cotisation_mensuel = @Prix_cotisation_mensuel;

SET foreign_key_checks = 1;



select Contrat_ID, Surface
from Contrat
where Code_postal = '14000' ;

select Contrat_ID,Type_contrat, Formule, Code_postal
from Contrat
where Code_postal LIKE '71___';
SELECT DISTINCT reg_nom
FROM Region
ORDER BY reg_nom;

select Contrat_ID, Surface
from Contrat
Order by Surface DESC
Limit 5 ; 
select AVG (Prix_cotisation_mensuel)
From Contrat;

SELECT Valeur_declaree_biens, COUNT(*) AS TOTAL_CONTRAT
FROM Contrat
WHERE Valeur_declaree_biens = '0-25000'
OR Valeur_declaree_biens = '25000-50000'
OR Valeur_declaree_biens = '50000-100000'
OR Valeur_declaree_biens = '100000+'
GROUP BY Valeur_declaree_biens
ORDER BY TOTAL_CONTRAT DESC ;

select Formule, Count(*) as total_contrat_integral
From Contrat
where (Code_postal Like '44___'
or Code_postal LIKE '49___'
or Code_postal LIKE '53___'
or Code_postal LIKE '72___'
or Code_postal LIKE '85___')
and Formule = 'Integral'
Group by Formule ;

Select AVG(Contrat.Surface) As Moyenne_surface_contrats_Paris
From Contrat
Join Region ON Contrat.code_dep_code_commune=Region.code_dep_code_commune
Where Region.dep_code = '75' ; 


select Contrat_ID , Type_contrat , Formule, Code_postal
From Contrat
where Code_postal LIKE '71___';

SELECT 
    Region.dep_nom_num,
    AVG(Contrat.Prix_cotisation_mensuel) AS moyenne_dep
FROM Contrat
JOIN Region 
    ON Contrat.Code_dep_code_commune = Region.Code_dep_code_commune
GROUP BY Region.dep_nom_num
ORDER BY moyenne_dep DESC
LIMIT 10;

select region.reg_nom, count(Contrat.Contrat_ID) as totals_contrats
from Region
Join Contrat ON Contrat.code_dep_code_commune=Region.code_dep_code_commune
Group by Region.reg_nom;

select Region.com_nom_maj_court, Count(Contrat.Contrat_ID) as Total_contrats
From Region
Join Contrat ON Contrat.code_dep_code_commune=Region.code_dep_code_commune
Group by Region.com_nom_maj_court
having count(Contrat.Contrat_ID)>=150
Order by Total_contrats DESC;