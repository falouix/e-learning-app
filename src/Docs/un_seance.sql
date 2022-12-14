-- phpMyAdmin SQL Dump
-- version OVH
-- https://www.phpmyadmin.net/
--
-- Host: trekasneqamed.mysql.db
-- Generation Time: Nov 03, 2020 at 03:38 PM
-- Server version: 5.6.48-log
-- PHP Version: 7.3.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `trekasneqamed`
--

-- --------------------------------------------------------

--
-- Table structure for table `un_seance`
--

CREATE TABLE `un_seance` (
  `id_seance` int(11) NOT NULL,
  `id_matiere_enseignant` int(11) NOT NULL,
  `id_streaming` int(11) NOT NULL,
  `date_deb_seance` date NOT NULL,
  `date_fin_seance` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `un_seance`
--

INSERT INTO `un_seance` (`id_seance`, `id_matiere_enseignant`, `id_streaming`, `date_deb_seance`, `date_fin_seance`) VALUES
(1, 0, 391, '0000-00-00', '0000-00-00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `un_seance`
--
ALTER TABLE `un_seance`
  ADD PRIMARY KEY (`id_seance`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `un_seance`
--
ALTER TABLE `un_seance`
  MODIFY `id_seance` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
