-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 05. Aug 2021 um 15:05
-- Server-Version: 10.4.17-MariaDB
-- PHP-Version: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `kicker-ronny`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `gameplan`
--

CREATE TABLE `gameplan` (
  `id` int(11) NOT NULL,
  `first_team` varchar(255) NOT NULL,
  `second_team` varchar(255) NOT NULL,
  `first_team_score` int(11) NOT NULL,
  `second_team_score` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `gameplan`
--

INSERT INTO `gameplan` (`id`, `first_team`, `second_team`, `first_team_score`, `second_team_score`) VALUES
(1, 'Steven', 'Horst', 0, 0),
(2, 'Mario', 'Dieter', 0, 0),
(3, 'Tom', 'Klaus', 0, 0),
(4, 'Steven', 'Mario', 0, 0),
(5, 'Tom', 'Horst', 0, 0),
(6, 'Klaus', 'Dieter', 0, 0),
(7, 'Steven', 'Tom', 0, 0),
(8, 'Klaus', 'Mario', 0, 0),
(9, 'Dieter', 'Horst', 0, 0),
(10, 'Steven', 'Klaus', 0, 0),
(11, 'Dieter', 'Tom', 0, 0),
(12, 'Horst', 'Mario', 0, 0),
(13, 'Steven', 'Dieter', 0, 0),
(14, 'Horst', 'Klaus', 0, 0),
(15, 'Mario', 'Tom', 0, 0),
(16, 'Steven', 'Dieter', 0, 0),
(17, 'Horst', 'Klaus', 0, 0),
(18, 'Mario', 'Tom', 0, 0),
(19, 'Steven', 'Klaus', 0, 0),
(20, 'Dieter', 'Tom', 0, 0),
(21, 'Horst', 'Mario', 0, 0),
(22, 'Steven', 'Tom', 0, 0),
(23, 'Klaus', 'Mario', 0, 0),
(24, 'Dieter', 'Horst', 0, 0),
(25, 'Steven', 'Mario', 0, 0),
(26, 'Tom', 'Horst', 0, 0),
(27, 'Klaus', 'Dieter', 0, 0),
(28, 'Steven', 'Horst', 0, 0),
(29, 'Mario', 'Dieter', 0, 0),
(30, 'Tom', 'Klaus', 0, 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `players`
--

CREATE TABLE `players` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `icon` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `wins` tinyint(4) NOT NULL,
  `draws` tinyint(4) NOT NULL,
  `defeat` tinyint(4) NOT NULL,
  `goals` tinyint(4) NOT NULL,
  `countergoals` tinyint(4) NOT NULL,
  `score` smallint(6) NOT NULL,
  `games` tinyint(4) NOT NULL,
  `crank` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `players`
--

INSERT INTO `players` (`id`, `name`, `icon`, `color`, `wins`, `draws`, `defeat`, `goals`, `countergoals`, `score`, `games`, `crank`) VALUES
(1, 'Steven', 'rocket', '#3472a2', 0, 0, 0, 0, 0, 0, 0, 0),
(3, 'Mario', 'cat', '#000000', 0, 0, 0, 0, 0, 0, 0, 0),
(7, 'Tom', 'cat', '#c67b7b', 0, 0, 0, 0, 0, 0, 0, 0),
(14, 'Klaus', '', '#000000', 0, 0, 0, 0, 0, 0, 0, 0),
(16, 'Dieter', 'eye', '#db4d4d', 0, 0, 0, 0, 0, 0, 0, 0),
(17, 'Horst', 'cow', '#991a1a', 0, 0, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `mode` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `playtime` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `settings`
--

INSERT INTO `settings` (`id`, `mode`, `title`, `playtime`) VALUES
(1, 1, 'Kicker Ronny', 166),
(5, 1, 'Weihnachtsfeier 2021', 185),
(6, 1, 'Weihnachts Ronny 21', 210);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `gameplan`
--
ALTER TABLE `gameplan`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `gameplan`
--
ALTER TABLE `gameplan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT für Tabelle `players`
--
ALTER TABLE `players`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT für Tabelle `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
