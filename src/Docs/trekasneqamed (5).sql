-- phpMyAdmin SQL Dump
-- version OVH
-- https://www.phpmyadmin.net/
--
-- Host: trekasneqamed.mysql.db
-- Generation Time: Nov 03, 2020 at 03:42 PM
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
-- Table structure for table `un_documents`
--

CREATE TABLE `un_documents` (
  `id_documents` int(11) NOT NULL,
  `nom_documents` varchar(100) NOT NULL,
  `id_niveau` int(11) NOT NULL,
  `id_seance` int(11) NOT NULL,
  `id_matiere_enseignant` int(11) NOT NULL,
  `id_users` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `un_enseignant`
--

CREATE TABLE `un_enseignant` (
  `id_enseignant` int(11) NOT NULL,
  `nom_enseignant` varchar(100) NOT NULL,
  `prenom_enseignant` varchar(100) NOT NULL,
  `mail_enseignant` varchar(100) NOT NULL,
  `login_enseignant` varchar(100) NOT NULL,
  `pass_enseignant` varchar(100) NOT NULL,
  `status_enseignan` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `un_enseignant`
--

INSERT INTO `un_enseignant` (`id_enseignant`, `nom_enseignant`, `prenom_enseignant`, `mail_enseignant`, `login_enseignant`, `pass_enseignant`, `status_enseignan`) VALUES
(1, 'first', 'firstlastname', 'first@first.com', 'firstlogin', 'firstpass', 0);

-- --------------------------------------------------------

--
-- Table structure for table `un_enseignant_matiere_niveau`
--

CREATE TABLE `un_enseignant_matiere_niveau` (
  `id_enseignant_matiere_niveau` int(11) NOT NULL,
  `id_niveau` int(11) NOT NULL,
  `id_matiere_enseignant` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `un_enseignant_matiere_niveau`
--

INSERT INTO `un_enseignant_matiere_niveau` (`id_enseignant_matiere_niveau`, `id_niveau`, `id_matiere_enseignant`) VALUES
(1, 1, 1),
(2, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `un_etudiant`
--

CREATE TABLE `un_etudiant` (
  `id_etudiant` int(11) NOT NULL,
  `nom_etudiant` varchar(100) NOT NULL,
  `prenom_etudiant` varchar(100) NOT NULL,
  `mail_etudiant` varchar(100) NOT NULL,
  `login_etudiant` varchar(100) NOT NULL,
  `pass_etudiant` varchar(100) NOT NULL,
  `status_etudiant` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `un_etudiant`
--

INSERT INTO `un_etudiant` (`id_etudiant`, `nom_etudiant`, `prenom_etudiant`, `mail_etudiant`, `login_etudiant`, `pass_etudiant`, `status_etudiant`) VALUES
(1, 'test etud', 'test etud', 'testetud@ggg.com', 'test etud', '8a1782114253fb5e51d3a05422101b7c', 0),
(3, 'first_student', 'first_student', 'first_student@mail.com', 'first_studentlog', 'first_studentpass', 1);

-- --------------------------------------------------------

--
-- Table structure for table `un_matiere`
--

CREATE TABLE `un_matiere` (
  `id_matiere` int(11) NOT NULL,
  `nom_matiere` varchar(100) NOT NULL,
  `id_niveau_g` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `un_matiere`
--

INSERT INTO `un_matiere` (`id_matiere`, `nom_matiere`, `id_niveau_g`) VALUES
(1, 'JavaScript', 1),
(2, 'Nodejs', 1);

-- --------------------------------------------------------

--
-- Table structure for table `un_matiere_enseignant`
--

CREATE TABLE `un_matiere_enseignant` (
  `id_matiere_enseignant` int(11) NOT NULL,
  `id_matiere` int(11) NOT NULL,
  `id_enseignant` int(11) NOT NULL,
  `id_niveau` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `un_matiere_enseignant`
--

INSERT INTO `un_matiere_enseignant` (`id_matiere_enseignant`, `id_matiere`, `id_enseignant`, `id_niveau`) VALUES
(1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `un_messages`
--

CREATE TABLE `un_messages` (
  `id_messages` int(11) NOT NULL,
  `msg_messages` varchar(2000) NOT NULL,
  `id_seance` int(11) NOT NULL,
  `id_etudiant` int(11) NOT NULL,
  `id_enseignant` int(11) NOT NULL,
  `id_typemsg` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `un_messages`
--

INSERT INTO `un_messages` (`id_messages`, `msg_messages`, `id_seance`, `id_etudiant`, `id_enseignant`, `id_typemsg`) VALUES
(1, 'jkdhqshdkqskkldqskldklqjslkl', 0, 0, 0, 0),
(2, 'azersqklmlmqjdqsidqsnd', 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `un_mid`
--

CREATE TABLE `un_mid` (
  `id_mid` int(11) NOT NULL,
  `id_etudiant` int(11) NOT NULL,
  `id_streaming` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `un_niveau`
--

CREATE TABLE `un_niveau` (
  `id_niveau` int(11) NOT NULL,
  `annee` varchar(20) NOT NULL,
  `semestre` int(11) NOT NULL,
  `id_niveau_g` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `un_niveau`
--

INSERT INTO `un_niveau` (`id_niveau`, `annee`, `semestre`, `id_niveau_g`) VALUES
(1, '', 0, 0),
(2, '2020/2021', 1, 1),
(3, '2020/2021', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `un_niveau_etudiant`
--

CREATE TABLE `un_niveau_etudiant` (
  `id_niveau_etudiant` int(11) NOT NULL,
  `id_etudiant` int(11) NOT NULL,
  `id_niveau` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `un_niveau_etudiant`
--

INSERT INTO `un_niveau_etudiant` (`id_niveau_etudiant`, `id_etudiant`, `id_niveau`) VALUES
(1, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `un_niveau_g`
--

CREATE TABLE `un_niveau_g` (
  `id_niveau_g` int(11) NOT NULL,
  `order_niveau_g` int(11) NOT NULL,
  `nom_niveau_g` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `un_niveau_g`
--

INSERT INTO `un_niveau_g` (`id_niveau_g`, `order_niveau_g`, `nom_niveau_g`) VALUES
(1, 1, 'first'),
(2, 2, 'second');

-- --------------------------------------------------------

--
-- Table structure for table `un_periode_etude`
--

CREATE TABLE `un_periode_etude` (
  `id_periode_etude` int(11) NOT NULL,
  `dated_periode_etude` varchar(20) NOT NULL,
  `datef_periode_etude` varchar(20) NOT NULL,
  `id_niveau` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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

-- --------------------------------------------------------

--
-- Table structure for table `un_users`
--

CREATE TABLE `un_users` (
  `id_users` int(11) NOT NULL,
  `nom_users` varchar(100) NOT NULL,
  `prenom_users` varchar(100) NOT NULL,
  `cin_users` int(11) NOT NULL,
  `tel_users` int(11) NOT NULL,
  `mail_users` varchar(100) NOT NULL,
  `login_users` varchar(100) NOT NULL,
  `pass_users` varchar(100) NOT NULL,
  `status_users` int(11) NOT NULL,
  `rool_users` int(1) NOT NULL DEFAULT '2',
  `confierm_user` int(1) NOT NULL DEFAULT '0',
  `confierm_key_user` varchar(30) NOT NULL,
  `add_date_user` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `un_users`
--

INSERT INTO `un_users` (`id_users`, `nom_users`, `prenom_users`, `cin_users`, `tel_users`, `mail_users`, `login_users`, `pass_users`, `status_users`, `rool_users`, `confierm_user`, `confierm_key_user`, `add_date_user`) VALUES
(1, 'aaa', 'aa', 123456789, 258369, 'aaaa@FFF.COM', 'aaa', '', 0, 2, 0, '', '0000-00-00 00:00:00'),
(2, 'changed', 'aa', 123, 159, 'aaaa@FFF.COM', 'changed', '', 0, 1, 0, '', '0000-00-00 00:00:00'),
(3, 'changed', 'aa', 123456, 2147483647, 'aaaa@FFF.COM', 'changed', '', 0, 2, 0, '', '0000-00-00 00:00:00'),
(4, 'aaa', 'aa', 123456, 258369, 'aaaa@FFF.COMsdfdsf', 'changed', '', 0, 2, 0, '', '0000-00-00 00:00:00'),
(5, 'aaa', 'aa', 123456, 258369, 'aaaa@FFF.COMsdfdsf', 'AAAAdfgdfgdfg', '', 0, 2, 0, '', '0000-00-00 00:00:00'),
(6, 'aaa', 'aa', 123456, 258369, 'aaaa@FFF.COM', 'aaa', '', 0, 2, 0, '', '0000-00-00 00:00:00'),
(7, 'aaa', 'aa', 123456, 258369, 'changed@FFF.COM', 'changed', '', 0, 2, 0, '', '0000-00-00 00:00:00'),
(8, 'aaa', 'aa', 123456, 258369, 'aaaa@FFF.COM', 'aaa', '', 0, 2, 0, '', '0000-00-00 00:00:00'),
(10, 'Test', 'Test', 8785593, 155146254, 'firas.bouacida@gmail.com', 'Test', '75007cfe67fc986eaade92db99f3a60c', 0, 2, 0, 'PwU15QFdrcoILlmqTtJDvUQWMjWL9z', '2020-10-13 11:48:11'),
(11, 'Test', 'Test', 8785593, 155146254, 'firas.bouacida@gmail.com', 'Test', '81d6af06fe1c6a591fe58f1253b62b7b', 0, 2, 0, 'I2woa3BSTPA8rZ9ITrx6XSpb10tcgF', '2020-10-13 11:48:17'),
(12, 'Test', 'Test', 8785593, 155146254, 'firas.bouacida@gmail.com', 'Test', '65251fd9b3b38aac7bacfec4f3ff5587', 0, 2, 0, 'EqFs0LBP6RFoAYHFclTPWUrosWHunz', '2020-10-13 11:48:58'),
(13, 'Test', 'Test', 8785593, 155146254, 'firas.bouacida@gmail.com', 'Test', 'e51aeecbff321fdd1b6e46054f0b5077', 0, 2, 0, '5fIhASICLbMkXVJWbrzNTiy9qMdHtK', '2020-10-13 11:49:32'),
(14, 'Test', 'Test', 8785593, 155146254, 'firas.bouacida@gmail.com', 'Test', '7c4f0782930bae5b2efef079444919d2', 0, 2, 0, 'urqCPaV497tg5BHcNgGoXaTxWC2hMF', '2020-10-13 11:49:57'),
(15, 'Test', 'Test', 8785593, 155146254, 'firas.bouacida@gmail.com', 'Test', 'f0d0a23b11bd211eef72da6522b1096a', 0, 2, 0, 'SPyNtOBEor9sJcfPu0HxsWnETMqDfw', '2020-10-13 11:52:43'),
(16, 'Test', 'Test', 8785593, 155146254, 'firas.bouacida@gmail.com', 'Test', '6cfd61fb004e8e367d9efd746f456fcd', 0, 2, 0, '2SO1kbbDcmxVVaFwzdzzUvW9xl9VvS', '2020-10-13 11:53:41'),
(17, 'Test', 'Test', 8785593, 155146254, 'firas.bouacida@gmail.com', 'Test', '05e8a3377476a36e41ba531d95cfcb6c', 0, 2, 0, 'E6b2cUZRBdy5R6bqrQuEVRfmDJiFLS', '2020-10-13 11:53:48'),
(18, 'Test', 'Test', 8785593, 155146254, 'firas.bouacida@gmail.com', 'Test', 'eed40ee80b7087dbccc824734d56db4f', 0, 2, 0, 'cCgBmbJPbeNlfXfChnen9NSDxwQfGE', '2020-10-13 11:53:50'),
(19, 'Test', 'Test', 8785593, 155146254, 'firas.bouacida@gmail.com', 'Test', 'f6e52887d9b2dc983b237a2e53860926', 0, 2, 0, 'sUXcoWs5YmMU9H4ylUvM5kuqqkUOr3', '2020-10-13 11:54:13'),
(20, 'Test', 'Test', 8785593, 155146254, 'firas.bouacida@gmail.com', 'Test', '902749f121da466073b09afc1e4c0c9e', 0, 2, 0, 'aoyuQHOoyzIRwy3Is1fiF0JsS5oL5Q', '2020-10-13 11:56:36'),
(21, 'Test', 'Test', 8785593, 155146254, 'firas.bouacida@gmail.com', 'Test', '0f4a9f1624823fb8a199b07c098115c8', 0, 2, 0, 'ZZyvKv8FiPZL8mqVTQEiuQhM8tYZQ3', '2020-10-13 11:56:57'),
(22, 'Test', 'Test', 8785593, 155146254, 'firas.bouacida@gmail.com', 'Test', '86d4e1055e2cbc73c4f1421b9fde0c54', 0, 2, 0, 'GniD7REQNDF9U73qbJs3Newqrb6M0k', '2020-10-13 11:59:28'),
(23, 'Test', 'Test', 8785593, 155146254, 'firas.bouacida@gmail.com', 'Test', 'a2ab3b8dca2d298570316fb9fea7d2de', 0, 2, 0, '9ki1rayPdnFYWO49YjDQF7rzRHtdkE', '2020-10-13 12:02:06'),
(24, 'Test', 'Test', 8785593, 155146254, 'firas.bouacida@gmail.com', 'Test', 'ef59e4c34dc1905f99b7cbbb210922e8', 0, 2, 0, '1ztjnDiDiak7vyz7ESMyOb4kK0S6HM', '2020-10-13 12:02:47'),
(25, 'Test', 'Test', 8785593, 155146254, 'firas.bouacida@gmail.com', 'Test', '511abccaee0e2b689efdc4d8697e2231', 0, 2, 0, 'XoydnwCzMjKEa29PAiWhlHZyYNUpdK', '2020-10-13 12:04:48'),
(26, 'Test', 'Test', 8785593, 155146254, 'firas.bouacida@gmail.com', 'Test', '857948a1e636ef55f110e162f9a03a8c', 0, 2, 0, '6nmabgmhn98HNUpjBQrrm9g2iHIwPM', '2020-10-13 12:09:15'),
(27, 'Test', 'Test', 8785593, 155146254, 'firas.bouacida@gmail.com', 'Test', 'eed0cb9ae150a30d9d9e10e820be7487', 0, 2, 0, 'RlZTfSX3JMI1739sfgTpThUWXx19HX', '2020-10-13 12:10:45'),
(28, 'Test', 'Test', 8785593, 155146254, 'firas.bouacida@gmail.com', 'Test', 'dd66e206dc3ae4af54fe4864cc7f1644', 0, 2, 0, 'LPs3IQ6yOlTG1vEhPVy9eeF3POVRoQ', '2020-10-13 12:11:40'),
(29, 'Test', 'Test', 8785593, 155146254, 'firas.bouacida@gmail.com', 'Test', '1565ef0a65944d3bad459e5703e58bc5', 0, 2, 0, '5SPelVBsFiiZPT3I9GssK5yqearBOa', '2020-10-13 12:19:28'),
(30, 'Test', 'Test', 8785593, 155146254, 'firas.bouacida@gmail.com', 'Test1', '7ac1ef7447dff9eaa6580c17aa884907', 0, 2, 0, '9UehQuAYu4A8awjlFqg6yJNZtI9KgE', '2020-10-13 12:20:10'),
(32, 'Test', 'Test', 12785593, 155146254, 'itos.fakhri@gmail.com', 'Test F', '8a1782114253fb5e51d3a05422101b7c', 0, 2, 0, 'Y2tepUetnNKAzG9BIuaHRl8ADRYGnG', '2020-10-13 12:25:19'),
(33, 'Bouacida', 'Firas', 8785593, 155146254, 'firas.bouacida@gmail.com', 'Firas85', 'ab2b3af9342bd435d83efa7a605e073b', 0, 2, 0, '2EdaDSV9CXxovn3hgCLa5Y43pS9x0g', '2020-10-13 12:51:00'),
(34, 'Test', 'Test', 8785593, 155146254, 'firas.bouacida@gmail.com', 'Test', 'c1bd0c576a8de77cd4536c1e5e255590', 0, 2, 0, 'BDGNyZhvXkyuqvZOvY0gUEN69WF24O', '2020-10-13 12:51:14'),
(35, 'Test', 'Test', 8785593, 155146254, 'firas.bouacida@gmail.com', 'Firas85', '6e375d0e367af7aa6986ab655540dcae', 0, 2, 0, 'bx5xvuzELUHVpuzeuEeHuDrr85KitG', '2020-10-13 12:58:01'),
(36, 'Test', 'Test', 8785593, 155146254, 'firas.bouacida@gmail.com', 'Firas85', 'accc451dab8de2da9303e63efd80655e', 0, 2, 0, 'i6x8MR9ZUHn9fCCUk1GWEaassjYg1s', '2020-10-13 12:58:08'),
(37, 'aaa', 'Test', 12785593, 155146254, 'firas.bouacida@gmail.com', '124587', '7abd6033ced05515308e876634017eb9', 0, 2, 0, 'm4oUGviAoOX1a6DdJ7TdS0lPtqZHax', '2020-10-13 13:15:08'),
(38, 'Bouacida', 'Firas', 12785593, 155146254, 'firas.bouacida@gmail.com', 'b.haut', '45ca4d4caf6825df390c613cad25893f', 0, 2, 0, 'pbHTqPkwFkS4IefhG2zrKetBpSq1TT', '2020-10-13 13:17:49'),
(39, 'Test', 'Test', 12785593, 155146254, 'firas.bouacida@gmail.com', 'Firas85', '87f0c98de80c4a8141d51f5bed62f568', 0, 2, 0, 'pdEZsfjp0mkNzCY0OA7BScDJLnZWMu', '2020-10-13 13:18:31'),
(40, 'Test', 'Test', 8785593, 155146254, 'firas.bouacida@gmail.com', 'Firas85', '8148ed084855097395bd5462dd819e2e', 0, 2, 0, 'sp0oOClMZ7tKO0qcYp5JNXn1cyoG1V', '2020-10-13 13:20:40'),
(41, 'Bouacida', 'Firas', 8785593, 1, 'firas.bouacida444@gmail.com', '77415842', '569759b6cdc57943a99b0ee1fd4d54dc', 0, 2, 0, 'rbFNRRbb7ZJ9UuUfyG0HiWVOBQ52pL', '2020-10-13 13:20:50'),
(42, 'Bouacida', 'Firas', 12785593, 155146254, 'firas.bouacida@gmail.com', '77415842', '89843bc0dfefe409c9bb388cb5111b88', 0, 2, 0, 'cGR1N5HtTmW5YdUsJ23m7XPH5HcCPL', '2020-10-13 13:23:08'),
(43, 'Bouacida', 'Firas', 12785593, 1, 'firas.bouacida444@gmail.com', 'Firas85', '6ba72ced6f137009aa97061b6bb2cdc7', 0, 2, 0, 'aJfFS9UbTgesWLtTJiNNmQnFMDfIvc', '2020-10-13 13:23:17'),
(44, 'Test', 'Firas', 8785593, 155146254, 'it.open.sprite@gmail.com', 'b.haut', '028ccd3ce3475e191e35bcd92ac935a5', 0, 2, 0, '1WlRC0MKlKQ4oAeFaLpqBBWQDRoiLp', '2020-10-13 13:25:15'),
(45, 'Bouacida', 'Firas', 8785593, 155146254, 'firas.bouacida@gmail.com', 'boua.einstein@gmail.com', 'd780da2171562f71d77f85bfc82ee5da', 0, 2, 0, 'Fgdw4SzsleA01oYQ4JkXX9wh6fjDjt', '2020-10-13 13:25:21'),
(46, '$username', '$userprenom', 0, 0, '$useremail', '$userlogin', '6129294b85ee6ee80e1fb8d22e94ffa2', 0, 1, 0, 'iV4gJi3wvUtHesoN9xOdaStCTsyhXG', '2020-10-13 13:26:52'),
(47, 'Test', 'Test', 8785593, 155146254, 'firas.bouacida@gmail.com', 'boua.einstein@gmail.com', '716171cf0a6875b0561d45ded1ec824a', 0, 2, 0, 'GEucgFRuGCa6scVQWifcGl460aKyd5', '2020-10-13 13:27:01'),
(48, 'Test', 'Test', 8785593, 155146254, 'firas.bouacida@gmail.com', '', '083241e17f61237637c12914cee59e5d', 0, 2, 0, '5SkthMHm5JDuw6YT8G4ssTyvQEVj2A', '2020-10-13 13:27:08'),
(49, 'Test', 'Test', 0, 155146254, 'firas.bouacida@gmail.com', '', '0f5145254e50c1167fa3e8397560eb1d', 0, 2, 0, 'eBBG9qBQPVWfT5JvL3K3wLaw8MZYp7', '2020-10-13 13:28:40'),
(50, 'Bouacida', 'Firas', 8785593, 155146254, 'firas.bouacida@gmail.com', '77415842', '1e88fa50b35cf3bdfd2986cdf2593ee7', 0, 2, 0, 'WCRYuHvubHXO7YgsVo3c5bSwNtbzgn', '2020-10-13 13:31:56'),
(51, 'Test', 'Test', 0, 155146254, 'firas.bouacida@gmail.com', 'aaa', 'f9017b8733560b720bf52a5c12644f6a', 0, 2, 0, 'LKeJF39Pu99TzONbOUN3RuC412x2gy', '2020-10-13 13:32:12'),
(52, 'Test', 'Test', 0, 155146254, 'firas.bouacida@gmail.com', 'Firas85', '5d792923f32901f02d7bcf040b7562cc', 0, 2, 0, 'fezWgYZqSBQeGEiI2LODreztxWSb9m', '2020-10-11 13:49:08'),
(53, 'Test11', 'Test', 12785593, 155146254, 'firas.bouacida111@gmail.com', 'boua.einstein@gmail.com', '55d81611e2283a3cefc5664f7b31c933', 0, 1, 1, 'ejy9OltJ1ke5MepNXJfcvJg58aejrx', '2020-10-13 14:02:49'),
(54, 'new', 'new', 2147483647, 123456789, 'new@new.com', 'new', '', 0, 2, 0, '', '0000-00-00 00:00:00'),
(55, 'aloui', 'fakhreddine', 101010101, 54896036, 'falouix@gmail.com', 'fakhrifakhri', '201104c05511aa46a5de47c907e31f38', 0, 2, 0, 'tIX8jko1yDamDCkAaQBh5qKcpkDFM0', '2020-11-03 12:35:17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `un_documents`
--
ALTER TABLE `un_documents`
  ADD PRIMARY KEY (`id_documents`);

--
-- Indexes for table `un_enseignant`
--
ALTER TABLE `un_enseignant`
  ADD PRIMARY KEY (`id_enseignant`),
  ADD UNIQUE KEY `login_enseignant` (`login_enseignant`);

--
-- Indexes for table `un_enseignant_matiere_niveau`
--
ALTER TABLE `un_enseignant_matiere_niveau`
  ADD PRIMARY KEY (`id_enseignant_matiere_niveau`);

--
-- Indexes for table `un_etudiant`
--
ALTER TABLE `un_etudiant`
  ADD PRIMARY KEY (`id_etudiant`),
  ADD UNIQUE KEY `login_etudiant` (`login_etudiant`);

--
-- Indexes for table `un_matiere`
--
ALTER TABLE `un_matiere`
  ADD PRIMARY KEY (`id_matiere`);

--
-- Indexes for table `un_matiere_enseignant`
--
ALTER TABLE `un_matiere_enseignant`
  ADD PRIMARY KEY (`id_matiere_enseignant`);

--
-- Indexes for table `un_messages`
--
ALTER TABLE `un_messages`
  ADD PRIMARY KEY (`id_messages`);

--
-- Indexes for table `un_mid`
--
ALTER TABLE `un_mid`
  ADD PRIMARY KEY (`id_mid`),
  ADD KEY `id_etudiant` (`id_etudiant`),
  ADD KEY `id_streaming` (`id_streaming`);

--
-- Indexes for table `un_niveau`
--
ALTER TABLE `un_niveau`
  ADD PRIMARY KEY (`id_niveau`);

--
-- Indexes for table `un_niveau_etudiant`
--
ALTER TABLE `un_niveau_etudiant`
  ADD PRIMARY KEY (`id_niveau_etudiant`);

--
-- Indexes for table `un_niveau_g`
--
ALTER TABLE `un_niveau_g`
  ADD PRIMARY KEY (`id_niveau_g`);

--
-- Indexes for table `un_periode_etude`
--
ALTER TABLE `un_periode_etude`
  ADD PRIMARY KEY (`id_periode_etude`);

--
-- Indexes for table `un_seance`
--
ALTER TABLE `un_seance`
  ADD PRIMARY KEY (`id_seance`);

--
-- Indexes for table `un_streaming`
--
ALTER TABLE `un_streaming`
  ADD PRIMARY KEY (`id_streaming`),
  ADD KEY `id_enseignant` (`id_enseignant`);

--
-- Indexes for table `un_typemsg`
--
ALTER TABLE `un_typemsg`
  ADD PRIMARY KEY (`id_typemsg`);

--
-- Indexes for table `un_users`
--
ALTER TABLE `un_users`
  ADD PRIMARY KEY (`id_users`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `un_documents`
--
ALTER TABLE `un_documents`
  MODIFY `id_documents` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `un_enseignant`
--
ALTER TABLE `un_enseignant`
  MODIFY `id_enseignant` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `un_enseignant_matiere_niveau`
--
ALTER TABLE `un_enseignant_matiere_niveau`
  MODIFY `id_enseignant_matiere_niveau` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `un_etudiant`
--
ALTER TABLE `un_etudiant`
  MODIFY `id_etudiant` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `un_matiere`
--
ALTER TABLE `un_matiere`
  MODIFY `id_matiere` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `un_matiere_enseignant`
--
ALTER TABLE `un_matiere_enseignant`
  MODIFY `id_matiere_enseignant` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `un_messages`
--
ALTER TABLE `un_messages`
  MODIFY `id_messages` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `un_mid`
--
ALTER TABLE `un_mid`
  MODIFY `id_mid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `un_niveau`
--
ALTER TABLE `un_niveau`
  MODIFY `id_niveau` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `un_niveau_etudiant`
--
ALTER TABLE `un_niveau_etudiant`
  MODIFY `id_niveau_etudiant` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `un_niveau_g`
--
ALTER TABLE `un_niveau_g`
  MODIFY `id_niveau_g` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `un_periode_etude`
--
ALTER TABLE `un_periode_etude`
  MODIFY `id_periode_etude` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `un_seance`
--
ALTER TABLE `un_seance`
  MODIFY `id_seance` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `un_streaming`
--
ALTER TABLE `un_streaming`
  MODIFY `id_streaming` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=392;

--
-- AUTO_INCREMENT for table `un_typemsg`
--
ALTER TABLE `un_typemsg`
  MODIFY `id_typemsg` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `un_users`
--
ALTER TABLE `un_users`
  MODIFY `id_users` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
