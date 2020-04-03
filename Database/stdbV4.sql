-- Tarkastetaan, onko kanta jo olemassa.
--
DROP DATABASE IF EXISTS stdb;

--
-- Luodaan kanta, jos sitä ei ole.
--
CREATE DATABASE IF NOT EXISTS stdb;

--
-- Otetaan kanta käyttöön, että tulevat toimenpiteet onnistuvat.
-- 
USE stdb;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+02:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `varasto`
--

-- --------------------------------------------------------

--
-- Rakenne taululle `luokat`
--
DROP TABLE IF EXISTS `luokat`;
CREATE TABLE IF NOT EXISTS `luokat` (
  `luokkaID` int(30) NOT NULL AUTO_INCREMENT,
  `nimi` varchar(50) NOT NULL,
  PRIMARY KEY (`luokkaID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Rakenne taululle `klistat`
--
DROP TABLE IF EXISTS `klistat`;
CREATE TABLE IF NOT EXISTS `klistat` (
  `klistaID` int(30) NOT NULL AUTO_INCREMENT,
  `tarvikeID` int(30) NOT NULL,
  -- `hinta` varchar(10) NOT NULL,
  -- `maara` int(4) NOT NULL,
  `pvm` datetime NOT NULL,
  PRIMARY KEY (`klistaID`)
  -- KEY `tarvikeID` (`tarvikeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Rakenne taululle `kayttajat`
--
DROP TABLE IF EXISTS `kayttajat`;
CREATE TABLE IF NOT EXISTS `kayttajat` (
  `kayttajaID` int(30) NOT NULL AUTO_INCREMENT,
  `luokkaID` int(30) NOT NULL,
  `kayttajatunnus` varchar(30) NOT NULL,
  `salasana` char(60) NOT NULL,
  `kayttoOikeus` int(11) NOT NULL,
  PRIMARY KEY (`kayttajaID`, `luokkaID`),
  UNIQUE KEY `kayttajatunnus` (`kayttajatunnus`)
  -- KEY `luokkaID` (`luokkaID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Rakenne taululle `ostoskori`
--
DROP TABLE IF EXISTS `ostoskori`;
CREATE TABLE IF NOT EXISTS `ostoskori` (
  `ostosID` int(30) NOT NULL AUTO_INCREMENT,
  `tarvikeID` int(30) NOT NULL,
  `kasittelija` varchar(30) NOT NULL,
  PRIMARY KEY (`ostosID`, `tarvikeID`)
  -- KEY `tarvikeID2` (`tarvikeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Rakenne taululle `tapahtumatyypit`
--
DROP TABLE IF EXISTS `tapahtumatyypit`;
CREATE TABLE IF NOT EXISTS `tapahtumatyypit` (
  `ttyyppiID` int(30) NOT NULL AUTO_INCREMENT,
  `nimi` varchar(50) NOT NULL,
  PRIMARY KEY (`ttyyppiID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Rakenne taululle `tarviketyypit`
--
DROP TABLE IF EXISTS `tarviketyypit`;
CREATE TABLE IF NOT EXISTS `tarviketyypit` (
  `tyyppiID` int(30) NOT NULL AUTO_INCREMENT,
  `nimi` varchar(30) NOT NULL,
  PRIMARY KEY (`tyyppiID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Rakenne taululle `varastot`
--

DROP TABLE IF EXISTS `varastot`;
CREATE TABLE IF NOT EXISTS `varastot` (
  `varastoID` int(30) NOT NULL AUTO_INCREMENT,
  `nimi` varchar(50) NOT NULL,
  PRIMARY KEY (`varastoID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Rakenne taululle `tarvikkeet`
--

DROP TABLE IF EXISTS `tarvikkeet`;
CREATE TABLE IF NOT EXISTS `tarvikkeet` (
  `tarvikeID` int(30) NOT NULL AUTO_INCREMENT,
  `tyyppiID` int(30) NOT NULL,
  `varastoID` int(30) NOT NULL,
  `yksikkoID` int(30) NOT NULL,
  `nimi` varchar(30) NOT NULL,
  `kuvaus` varchar(50) NOT NULL,
  `maara` int(4) NOT NULL,
  `hinta` varchar(10) NOT NULL,
  `hpaikka` varchar(50) NOT NULL,
  `rarvo` int(4) NOT NULL,
  PRIMARY KEY (`tarvikeID`, `tyyppiID`)
  -- KEY `tyyppiID` (`tyyppiID`),
  -- KEY `varastoID` (`varastoID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------



--
-- Rakenne taululle `varastotapahtumat`
--

DROP TABLE IF EXISTS `varastotapahtumat`;
CREATE TABLE IF NOT EXISTS `varastotapahtumat` (
  `tapahtumaID` int(30) NOT NULL AUTO_INCREMENT,
  `ttyyppinimi` varchar(50) NOT NULL,
  `luokkanimi` varchar(50) NOT NULL,
  `tarvikenimi` varchar(50) NOT NULL,
  `tarvikehpaikka` varchar(50) NOT NULL,
  `maara` int(4) NOT NULL,
  `yksikkonimi` varchar(50) NOT NULL,
  `kasittelija` varchar(30) NOT NULL,
  `pvm` datetime NOT NULL,
  PRIMARY KEY (`tapahtumaID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Rakenne taululle `yksikot`
--

DROP TABLE IF EXISTS `yksikot`;
CREATE TABLE IF NOT EXISTS `yksikot` (
  `yksikkoID` int(30) NOT NULL AUTO_INCREMENT,
  `nimi` varchar(30) NOT NULL,
  PRIMARY KEY (`yksikkoID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Rajoitteet vedostauluille
--

--
-- Rajoitteet taululle `kayttajat`
--
ALTER TABLE `kayttajat`
  ADD CONSTRAINT `luokat_kayttajat` FOREIGN KEY (`luokkaID`) REFERENCES `luokat` (`luokkaID`);

--
-- Rajoitteet taululle `klistat`
--
ALTER TABLE `klistat`
  ADD CONSTRAINT `tarvikkeet_klistat` FOREIGN KEY (`tarvikeID`) REFERENCES `tarvikkeet` (`tarvikeID`);

--
-- Rajoitteet taululle `ostoskori`
--
ALTER TABLE `ostoskori`
  ADD CONSTRAINT `tarvikkeet_ostoskori` FOREIGN KEY (`tarvikeID`) REFERENCES `tarvikkeet` (`tarvikeID`);

--
-- Rajoitteet taululle `tarvikkeet`
--
ALTER TABLE `tarvikkeet`
  ADD CONSTRAINT `tarviketyypit_tarvikkeet` FOREIGN KEY (`tyyppiID`) REFERENCES `tarviketyypit` (`tyyppiID`),
  ADD CONSTRAINT `varastot_tarvikkeet` FOREIGN KEY (`varastoID`) REFERENCES `varastot` (`varastoID`),
  ADD CONSTRAINT `yksikot_tarvikkeet` FOREIGN KEY (`yksikkoID`) REFERENCES `yksikot` (`yksikkoID`);

--
-- Rajoitteet taululle `varastotapahtumat`
--

  
--
-- Lisätään dataa luokat-tauluun.
--
INSERT INTO `luokat` (`luokkaID`, `nimi`) VALUES
(1, 'Ekaluokka'),
(2, 'Tokaluokka'),
(3, 'Kolmasluokka'),
(4, 'Neljäsluokka'),
(5, 'Viidesluokka'),
(6, 'Kuudesluokka'),
(7, 'Seiskaluokka'),
(8, 'Kasiluokka'),
(9, 'Ysiluokka');

--
-- Lisätään dataa tapahtumatyypit-tauluun.
--
INSERT INTO `tapahtumatyypit` (`ttyyppiID`, `nimi`) VALUES
(1, 'Otto'),
(2, 'Lisäys'),
(3, 'Korjaus');

--
-- Lisätään dataa tarviketyypit-tauluun.
--
INSERT INTO `tarviketyypit` (`tyyppiID`, `nimi`) VALUES
(1, 'Puutarvike'),
(2, 'Metallitarvike'),
(3, 'Työkalu'),
(4, 'Kemikaali'),
(5, 'Varaosa');

--
-- Lisätään dataa varastot-tauluun.
--
INSERT INTO `varastot` (`varastoID`, `nimi`) VALUES
(1, 'Riistaveden koulu'),
(2, 'Melalahden koulu'),
(3, 'Vehkalammin koulu');

--
-- Lisätään dataa yksikot-tauluun.
--
INSERT INTO `yksikot` (`yksikkoID`, `nimi`) VALUES
(1, 'm'),
(2, 'cm'),
(3, 'kpl'),
(4, 'pkt'),
(5, 'lava');

--
-- Lisätään dataa tarvikkeet-tauluun.
--
INSERT INTO `tarvikkeet` (`tarvikeID`, `tyyppiID`, `varastoID`, `yksikkoID`, `nimi`, `kuvaus`, `maara`, `rarvo`, `hinta`, `hpaikka`) VALUES
(1, 1, 1, 1, 'Lauta', 'Tavallinen puulauta', 15, 3, 15, 'Starkki'),
(2, 1, 1, 3, 'Vanerilevy', 'Tavallinen vanerilevy', 24, 4, 17, 'Kesko'),
(3, 2, 1, 1, 'Terästanko', 'Voi hitsata', 3, 5, 21, 'Starkki'),
(4, 4, 2, 4, 'WD-40', 'Voiteluun', 3, 5, 21, 'Starkki'),
(5, 5, 2, 3, 'Pistosahan metalliterä', 'Metalliosien sahaukseen', 10,  5, 21, 'Starkki');

--
-- Lisätään dataa klistat-tauluun.
--
-- INSERT INTO `klistat` (`klistaID`, `tarvikeID`, `hinta`, `maara`, `pvm`) VALUES
-- (1, 2, 4, 4, '2020-02-19 00:00:00'),
-- (2, 4, 3, 4, '2020-02-19 00:00:00'),
-- (3, 3, 71, 5, '2020-02-19 00:00:00'),
-- (4, 5, 82, 2, '2020-02-19 00:00:00'),
-- (5, 1, 69, 1, '2020-02-19 00:00:00');

INSERT INTO `klistat` (`klistaID`, `tarvikeID`, `pvm`) VALUES
(1, 2, '2020-02-19 00:00:00'),
(2, 4, '2020-02-19 00:00:00'),
(3, 3, '2020-02-19 00:00:00'),
(4, 5, '2020-02-19 00:00:00'),
(5, 1, '2020-02-19 00:00:00');



--
-- Lisätään dataa kayttajat-tauluun.
-- 
INSERT INTO `kayttajat` (`kayttajaID`, `luokkaID`, `kayttajatunnus`, `salasana`, `kayttoOikeus`) VALUES
(7, 1, 'opettaja', '$2b$10$QkE1Ebw2nfndh/scL5wIeuH1YSHVzjivtWVyTbBsVi4vlhaGzjs5q', 1),
(8, 1, 'oppilas', '$2b$10$4dSuD9xsVkkGbfdVckX6YelpbH90bPmuVVO1Y6gN5Ib5kIpBBUjRa', 2);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
