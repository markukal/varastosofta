-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 18, 2020 at 03:07 PM
-- Server version: 5.7.26
-- PHP Version: 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `stdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `kayttajat`
--

DROP TABLE IF EXISTS `kayttajat`;
CREATE TABLE IF NOT EXISTS `kayttajat` (
  `kayttajaID` int(30) NOT NULL AUTO_INCREMENT,
  `luokkaID` int(30) NOT NULL,
  `kayttajatunnus` varchar(30) NOT NULL,
  `salasana` char(60) NOT NULL,
  `kayttoOikeus` int(11) NOT NULL,
  PRIMARY KEY (`kayttajaID`,`luokkaID`),
  UNIQUE KEY `kayttajatunnus` (`kayttajatunnus`),
  KEY `luokat_kayttajat` (`luokkaID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `kayttajat`
--

INSERT INTO `kayttajat` (`kayttajaID`, `luokkaID`, `kayttajatunnus`, `salasana`, `kayttoOikeus`) VALUES
(7, 1, 'opettaja', '$2b$10$QkE1Ebw2nfndh/scL5wIeuH1YSHVzjivtWVyTbBsVi4vlhaGzjs5q', 1),
(8, 1, 'oppilas', '$2b$10$4dSuD9xsVkkGbfdVckX6YelpbH90bPmuVVO1Y6gN5Ib5kIpBBUjRa', 2),
(9, 9, 'admin', '$2b$10$1HX0WseNNxaRYLHEtn0QLuhH9bxZQ6RUIXC5W/2j4K00UgV8o4.re', 1);

-- --------------------------------------------------------

--
-- Table structure for table `klistat`
--

DROP TABLE IF EXISTS `klistat`;
CREATE TABLE IF NOT EXISTS `klistat` (
  `klistaID` int(30) NOT NULL AUTO_INCREMENT,
  `tarvikeID` int(30) NOT NULL,
  PRIMARY KEY (`klistaID`),
  KEY `tarvikkeet_klistat` (`tarvikeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `luokat`
--

DROP TABLE IF EXISTS `luokat`;
CREATE TABLE IF NOT EXISTS `luokat` (
  `luokkaID` int(30) NOT NULL AUTO_INCREMENT,
  `nimi` varchar(50) NOT NULL,
  PRIMARY KEY (`luokkaID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `luokat`
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

-- --------------------------------------------------------

--
-- Table structure for table `ostoskori`
--

DROP TABLE IF EXISTS `ostoskori`;
CREATE TABLE IF NOT EXISTS `ostoskori` (
  `ostosID` int(30) NOT NULL AUTO_INCREMENT,
  `tarvikeID` int(30) NOT NULL,
  `kasittelija` varchar(30) NOT NULL,
  PRIMARY KEY (`ostosID`,`tarvikeID`),
  KEY `tarvikkeet_ostoskori` (`tarvikeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tapahtumatyypit`
--

DROP TABLE IF EXISTS `tapahtumatyypit`;
CREATE TABLE IF NOT EXISTS `tapahtumatyypit` (
  `ttyyppiID` int(30) NOT NULL AUTO_INCREMENT,
  `nimi` varchar(50) NOT NULL,
  PRIMARY KEY (`ttyyppiID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tapahtumatyypit`
--

INSERT INTO `tapahtumatyypit` (`ttyyppiID`, `nimi`) VALUES
(1, 'Lisäys'),
(2, 'Otto'),
(3, 'Poisto');

-- --------------------------------------------------------

--
-- Table structure for table `tarviketyypit`
--

DROP TABLE IF EXISTS `tarviketyypit`;
CREATE TABLE IF NOT EXISTS `tarviketyypit` (
  `tyyppiID` int(30) NOT NULL AUTO_INCREMENT,
  `nimi` varchar(30) NOT NULL,
  PRIMARY KEY (`tyyppiID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tarviketyypit`
--

INSERT INTO `tarviketyypit` (`tyyppiID`, `nimi`) VALUES
(1, 'Puutarvike'),
(2, 'Metallitarvike'),
(3, 'Työkalu'),
(4, 'Kemikaali'),
(5, 'Varaosa');

-- --------------------------------------------------------

--
-- Table structure for table `tarvikkeet`
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
  PRIMARY KEY (`tarvikeID`,`tyyppiID`),
  KEY `tarviketyypit_tarvikkeet` (`tyyppiID`),
  KEY `varastot_tarvikkeet` (`varastoID`),
  KEY `yksikot_tarvikkeet` (`yksikkoID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tarvikkeet`
--

INSERT INTO `tarvikkeet` (`tarvikeID`, `tyyppiID`, `varastoID`, `yksikkoID`, `nimi`, `kuvaus`, `maara`, `hinta`, `hpaikka`, `rarvo`) VALUES
(1, 1, 1, 1, 'Lauta', 'Tavallinen puulauta', 15, '15', 'Starkki', 3),
(2, 1, 1, 3, 'Vanerilevy', 'Tavallinen vanerilevy', 24, '17', 'Kesko', 4),
(3, 2, 1, 1, 'Terästanko', 'Voi hitsata', 3, '21', 'Starkki', 5),
(4, 4, 2, 4, 'WD-40', 'Voiteluun', 3, '21', 'Starkki', 5),
(5, 5, 2, 3, 'Pistosahan metalliterä', 'Metalliosien sahaukseen', 10, '21', 'Starkki', 5);

-- --------------------------------------------------------

--
-- Table structure for table `varastot`
--

DROP TABLE IF EXISTS `varastot`;
CREATE TABLE IF NOT EXISTS `varastot` (
  `varastoID` int(30) NOT NULL AUTO_INCREMENT,
  `nimi` varchar(50) NOT NULL,
  PRIMARY KEY (`varastoID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `varastot`
--

INSERT INTO `varastot` (`varastoID`, `nimi`) VALUES
(1, 'Riistaveden koulu'),
(2, 'Melalahden koulu'),
(3, 'Vehkalammin koulu');

-- --------------------------------------------------------

--
-- Table structure for table `varastotapahtumat`
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
-- Table structure for table `yksikot`
--

DROP TABLE IF EXISTS `yksikot`;
CREATE TABLE IF NOT EXISTS `yksikot` (
  `yksikkoID` int(30) NOT NULL AUTO_INCREMENT,
  `nimi` varchar(30) NOT NULL,
  PRIMARY KEY (`yksikkoID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `yksikot`
--

INSERT INTO `yksikot` (`yksikkoID`, `nimi`) VALUES
(1, 'm'),
(2, 'cm'),
(3, 'kpl'),
(4, 'pkt'),
(5, 'lava');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `kayttajat`
--
ALTER TABLE `kayttajat`
  ADD CONSTRAINT `luokat_kayttajat` FOREIGN KEY (`luokkaID`) REFERENCES `luokat` (`luokkaID`);

--
-- Constraints for table `klistat`
--
ALTER TABLE `klistat`
  ADD CONSTRAINT `tarvikkeet_klistat` FOREIGN KEY (`tarvikeID`) REFERENCES `tarvikkeet` (`tarvikeID`);

--
-- Constraints for table `ostoskori`
--
ALTER TABLE `ostoskori`
  ADD CONSTRAINT `tarvikkeet_ostoskori` FOREIGN KEY (`tarvikeID`) REFERENCES `tarvikkeet` (`tarvikeID`);

--
-- Constraints for table `tarvikkeet`
--
ALTER TABLE `tarvikkeet`
  ADD CONSTRAINT `tarviketyypit_tarvikkeet` FOREIGN KEY (`tyyppiID`) REFERENCES `tarviketyypit` (`tyyppiID`),
  ADD CONSTRAINT `varastot_tarvikkeet` FOREIGN KEY (`varastoID`) REFERENCES `varastot` (`varastoID`),
  ADD CONSTRAINT `yksikot_tarvikkeet` FOREIGN KEY (`yksikkoID`) REFERENCES `yksikot` (`yksikkoID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
