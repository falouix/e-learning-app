-- phpMyAdmin SQL Dump
-- version OVH
-- https://www.phpmyadmin.net/
--
-- Host: trekasneqamed.mysql.db
-- Generation Time: Nov 03, 2020 at 03:39 PM
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
-- Table structure for table `un_typemsg`
--

CREATE TABLE `un_typemsg` (
  `id_typemsg` int(11) NOT NULL,
  `type_typemsg` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `un_typemsg`
--

INSERT INTO `un_typemsg` (`id_typemsg`, `type_typemsg`) VALUES
(1, 'Question'),
(2, 'Raiponce');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `un_typemsg`
--
ALTER TABLE `un_typemsg`
  ADD PRIMARY KEY (`id_typemsg`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `un_typemsg`
--
ALTER TABLE `un_typemsg`
  MODIFY `id_typemsg` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
