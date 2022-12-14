

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

-- Database: `unbase`
--

-- --------------------------------------------------------

--
-- Table structure for table `un_documents`
--

CREATE TABLE `un_documents` (
  `id_documents` int(11) NOT NULL,
  `nom_documents` varchar(100) NOT NULL,
  `id_matiere` int(11) NOT NULL,
  `id_seance` int(11) NOT NULL,
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
  `pass_enseignant` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `id_niveau` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `un_matiere`
--

CREATE TABLE `un_matiere` (
  `id_matiere` int(11) NOT NULL,
  `nom_matiere` varchar(100) NOT NULL,
  `id_niveau` int(11) NOT NULL,
  `id_enseignant` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `un_messages`
--

CREATE TABLE `un_messages` (
  `id_messages` int(11) NOT NULL,
  `msg_messages` varchar(2000) NOT NULL,
  `id_etudiant` int(11) NOT NULL,
  `id_enseignant` int(11) NOT NULL,
  `id_seance` int(11) NOT NULL,
  `id_typemsg` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `nom_niveau` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `un_niveau`
--

INSERT INTO `un_niveau` (`id_niveau`, `nom_niveau`) VALUES
(1, 'test');

-- --------------------------------------------------------

--
-- Table structure for table `un_seance`
--

CREATE TABLE `un_seance` (
  `id_seance` int(11) NOT NULL,
  `id_streaming` int(11) NOT NULL,
  `id_users` int(11) NOT NULL,
  `id_matiere` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `un_streaming`
--

CREATE TABLE `un_streaming` (
  `id_streaming` int(11) NOT NULL,
  `nom_streaming` varchar(100) NOT NULL,
  `id_enseignant` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `un_typemsg`
--

CREATE TABLE `un_typemsg` (
  `id_typemsg` int(11) NOT NULL,
  `type_typemsg` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `un_users`
--

CREATE TABLE `un_users` (
  `id_users` int(11) NOT NULL,
  `nom_users` varchar(100) NOT NULL,
  `prenom_users` varchar(100) NOT NULL,
  `mail_users` varchar(100) NOT NULL,
  `login_users` varchar(100) NOT NULL,
  `pass_users` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `un_documents`
--
ALTER TABLE `un_documents`
  ADD PRIMARY KEY (`id_documents`),
  ADD KEY `id_matiere` (`id_matiere`),
  ADD KEY `id_users` (`id_users`),
  ADD KEY `id_seance` (`id_seance`);

--
-- Indexes for table `un_enseignant`
--
ALTER TABLE `un_enseignant`
  ADD PRIMARY KEY (`id_enseignant`),
  ADD UNIQUE KEY `login_enseignant` (`login_enseignant`);

--
-- Indexes for table `un_etudiant`
--
ALTER TABLE `un_etudiant`
  ADD PRIMARY KEY (`id_etudiant`),
  ADD UNIQUE KEY `login_etudiant` (`login_etudiant`),
  ADD KEY `id_niveau` (`id_niveau`);

--
-- Indexes for table `un_matiere`
--
ALTER TABLE `un_matiere`
  ADD PRIMARY KEY (`id_matiere`),
  ADD KEY `id_niveau` (`id_niveau`),
  ADD KEY `un_matiere_ibfk_1` (`id_enseignant`);

--
-- Indexes for table `un_messages`
--
ALTER TABLE `un_messages`
  ADD PRIMARY KEY (`id_messages`),
  ADD KEY `id_enseignant` (`id_enseignant`),
  ADD KEY `id_etudiant` (`id_etudiant`),
  ADD KEY `id_seance` (`id_seance`),
  ADD KEY `id_typemsg` (`id_typemsg`);

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
-- Indexes for table `un_seance`
--
ALTER TABLE `un_seance`
  ADD PRIMARY KEY (`id_seance`),
  ADD KEY `id_matiere` (`id_matiere`),
  ADD KEY `id_streaming` (`id_streaming`),
  ADD KEY `id_users` (`id_users`);

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
  MODIFY `id_enseignant` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `un_etudiant`
--
ALTER TABLE `un_etudiant`
  MODIFY `id_etudiant` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `un_matiere`
--
ALTER TABLE `un_matiere`
  MODIFY `id_matiere` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `un_messages`
--
ALTER TABLE `un_messages`
  MODIFY `id_messages` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `un_mid`
--
ALTER TABLE `un_mid`
  MODIFY `id_mid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `un_niveau`
--
ALTER TABLE `un_niveau`
  MODIFY `id_niveau` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `un_seance`
--
ALTER TABLE `un_seance`
  MODIFY `id_seance` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `un_streaming`
--
ALTER TABLE `un_streaming`
  MODIFY `id_streaming` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `un_typemsg`
--
ALTER TABLE `un_typemsg`
  MODIFY `id_typemsg` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `un_users`
--
ALTER TABLE `un_users`
  MODIFY `id_users` int(11) NOT NULL AUTO_INCREMENT;

--
