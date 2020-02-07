--
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

