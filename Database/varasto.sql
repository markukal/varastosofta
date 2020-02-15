-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: 11.02.2020 klo 13:50
-- Palvelimen versio: 5.7.26
-- PHP Version: 7.2.18

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
-- Rakenne taululle `kayttajat`
--

DROP TABLE IF EXISTS `kayttajat`;
CREATE TABLE IF NOT EXISTS `kayttajat` (
  `kayttajaID` int(30) NOT NULL AUTO_INCREMENT,
  `luokkaID` int(30) NOT NULL,
  `etunimi` varchar(30) NOT NULL,
  `sukunimi` varchar(50) NOT NULL,
  `kayttajatunnus` varchar(30) NOT NULL,
  `salasana` char(60) NOT NULL,
  `kayttoOikeus` int(11) NOT NULL,
  PRIMARY KEY (`kayttajaID`),
  KEY `luokkaID` (`luokkaID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `kayttajat`
--

INSERT INTO `kayttajat` (`kayttajaID`, `luokkaID`, `etunimi`, `sukunimi`, `kayttajatunnus`, `salasana`, `kayttoOikeus`) VALUES
(7, 1, 'etunimi1', 'sukunimi1', 'opettaja', '$2b$10$QkE1Ebw2nfndh/scL5wIeuH1YSHVzjivtWVyTbBsVi4vlhaGzjs5q', 1),
(8, 1, 'etunimi2', 'sukunimi2', 'oppilas', '$2b$10$4dSuD9xsVkkGbfdVckX6YelpbH90bPmuVVO1Y6gN5Ib5kIpBBUjRa', 2);

-- --------------------------------------------------------

--
-- Rakenne taululle `klistat`
--

DROP TABLE IF EXISTS `klistat`;
CREATE TABLE IF NOT EXISTS `klistat` (
  `klistaID` int(30) NOT NULL AUTO_INCREMENT,
  `tarvikeID` int(30) NOT NULL,
  `pvm` datetime NOT NULL,
  PRIMARY KEY (`klistaID`),
  KEY `tarvikeID` (`tarvikeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
-- Dumping data for table `luokat`
--

INSERT INTO `luokat` (`luokkaID`, `nimi`) VALUES
(1, 'Luokka1');

-- --------------------------------------------------------

--
-- Rakenne taululle `ostoskori`
--

DROP TABLE IF EXISTS `ostoskori`;
CREATE TABLE IF NOT EXISTS `ostoskori` (
  `ostosID` int(30) NOT NULL AUTO_INCREMENT,
  `tarvikeID` int(30) NOT NULL,
  `maara` int(4) NOT NULL,
  PRIMARY KEY (`ostosID`),
  KEY `tarvikeID2` (`tarvikeID`)
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
-- Rakenne taululle `tarvikkeet`
--

DROP TABLE IF EXISTS `tarvikkeet`;
CREATE TABLE IF NOT EXISTS `tarvikkeet` (
  `tarvikeID` int(30) NOT NULL AUTO_INCREMENT,
  `tyyppiID` int(30) NOT NULL,
  `varastoID` int(30) NOT NULL,
  `nimi` varchar(30) NOT NULL,
  `kuvaus` varchar(50) NOT NULL,
  `maara` varchar(4) NOT NULL,
  PRIMARY KEY (`tarvikeID`),
  KEY `tyyppiID` (`tyyppiID`),
  KEY `varastoID` (`varastoID`)
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
-- Rakenne taululle `varastotapahtumat`
--

DROP TABLE IF EXISTS `varastotapahtumat`;
CREATE TABLE IF NOT EXISTS `varastotapahtumat` (
  `tapahtumaID` int(30) NOT NULL AUTO_INCREMENT,
  `ttyyppiID` int(30) NOT NULL,
  `luokkaID` int(30) NOT NULL,
  `tarvikeID` int(30) NOT NULL,
  `tyyppi` varchar(30) NOT NULL,
  `maara` int(4) NOT NULL,
  `pvm` datetime NOT NULL,
  PRIMARY KEY (`tapahtumaID`),
  KEY `ttyyppiID` (`ttyyppiID`),
  KEY `luokkaID1` (`luokkaID`),
  KEY `tarvikeID1` (`tarvikeID`)
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
  ADD CONSTRAINT `luokkaID` FOREIGN KEY (`luokkaID`) REFERENCES `luokat` (`luokkaID`);

--
-- Rajoitteet taululle `klistat`
--
ALTER TABLE `klistat`
  ADD CONSTRAINT `tarvikeID` FOREIGN KEY (`tarvikeID`) REFERENCES `tarvikkeet` (`tarvikeID`);

--
-- Rajoitteet taululle `ostoskori`
--
ALTER TABLE `ostoskori`
  ADD CONSTRAINT `tarvikeID2` FOREIGN KEY (`tarvikeID`) REFERENCES `tarvikkeet` (`tarvikeID`);

--
-- Rajoitteet taululle `tarvikkeet`
--
ALTER TABLE `tarvikkeet`
  ADD CONSTRAINT `tyyppiID` FOREIGN KEY (`tyyppiID`) REFERENCES `tarviketyypit` (`tyyppiID`),
  ADD CONSTRAINT `varastoID` FOREIGN KEY (`varastoID`) REFERENCES `varastot` (`varastoID`);

--
-- Rajoitteet taululle `varastotapahtumat`
--
ALTER TABLE `varastotapahtumat`
  ADD CONSTRAINT `luokkaID1` FOREIGN KEY (`luokkaID`) REFERENCES `luokat` (`luokkaID`),
  ADD CONSTRAINT `tarvikeID1` FOREIGN KEY (`tarvikeID`) REFERENCES `tarvikkeet` (`tarvikeID`),
  ADD CONSTRAINT `ttyyppiID` FOREIGN KEY (`ttyyppiID`) REFERENCES `tapahtumatyypit` (`ttyyppiID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
