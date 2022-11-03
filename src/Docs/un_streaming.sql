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
-- Table structure for table `un_streaming`
--

CREATE TABLE `un_streaming` (
  `id_streaming` int(11) NOT NULL,
  `nom_streaming` varchar(100) NOT NULL,
  `id_enseignant` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `un_streaming`
--

INSERT INTO `un_streaming` (`id_streaming`, `nom_streaming`, `id_enseignant`) VALUES
(391, '808b4a00-1ce6-11eb-ac9b-8d87961c84f7', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `un_streaming`
--
ALTER TABLE `un_streaming`
  ADD PRIMARY KEY (`id_streaming`),
  ADD KEY `id_enseignant` (`id_enseignant`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `un_streaming`
--
ALTER TABLE `un_streaming`
  MODIFY `id_streaming` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=392;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
