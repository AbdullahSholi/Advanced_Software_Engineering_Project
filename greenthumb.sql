-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 07, 2024 at 10:51 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `greenthumb`
--

-- --------------------------------------------------------

--
-- Table structure for table `exchange`
--

CREATE TABLE `exchange` (
  `ExchangeID` int(50) NOT NULL,
  `ResourceID` int(50) NOT NULL,
  `OfferUserID` int(50) NOT NULL,
  `RequestorUserID` int(50) NOT NULL,
  `Status` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `exchange_resource`
--

CREATE TABLE `exchange_resource` (
  `Exchange_Resource_ID` int(50) NOT NULL,
  `ExchangeID` int(50) NOT NULL,
  `ResourceID` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `garden`
--

CREATE TABLE `garden` (
  `GardenID` int(50) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Location` varchar(50) NOT NULL,
  `Description` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gardenplot`
--

CREATE TABLE `gardenplot` (
  `PlotID` int(50) NOT NULL,
  `GardenID` int(50) NOT NULL,
  `PlotSize` int(50) NOT NULL,
  `SunLight` varchar(500) NOT NULL,
  `SoilType` varchar(500) NOT NULL,
  `Available` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `guide`
--

CREATE TABLE `guide` (
  `GuideID` int(50) NOT NULL,
  `AuthorUserID` int(50) NOT NULL,
  `Title` varchar(500) NOT NULL,
  `Content` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `partnership`
--

CREATE TABLE `partnership` (
  `PartnershipID` int(50) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Type` varchar(50) NOT NULL,
  `ContactInfo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `planning activity`
--

CREATE TABLE `planning activity` (
  `ActivityID` int(50) NOT NULL,
  `UserID` int(50) NOT NULL,
  `PlotID` int(50) NOT NULL,
  `PlantDate` date NOT NULL,
  `HarvestDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `plant`
--

CREATE TABLE `plant` (
  `PlantID` int(50) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `GrowingSeason` varchar(50) NOT NULL,
  `Description` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `plantingactivity_plant`
--

CREATE TABLE `plantingactivity_plant` (
  `PlantingActivity_Plant_ID` int(50) NOT NULL,
  `ActivityID` int(50) NOT NULL,
  `PlantID` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `resource`
--

CREATE TABLE `resource` (
  `ResourceID` int(50) NOT NULL,
  `Type` varchar(50) NOT NULL,
  `Description` varchar(1000) NOT NULL,
  `AvailableQuantity` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `resource_partnership`
--

CREATE TABLE `resource_partnership` (
  `Resource_Partnership_ID` int(50) NOT NULL,
  `ResourceID` int(50) NOT NULL,
  `PartnershipID` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `UserID` int(50) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_garden`
--

CREATE TABLE `user_garden` (
  `UserGardenID` int(50) NOT NULL,
  `UserID` int(50) NOT NULL,
  `GardenID` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `volunteerevent`
--

CREATE TABLE `volunteerevent` (
  `EventID` int(50) NOT NULL,
  `GardenID` int(50) NOT NULL,
  `Date` date NOT NULL,
  `Description` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `exchange`
--
ALTER TABLE `exchange`
  ADD PRIMARY KEY (`ExchangeID`),
  ADD KEY `ResourceID` (`ResourceID`,`OfferUserID`),
  ADD KEY `RequestorUserID` (`RequestorUserID`),
  ADD KEY `OfferUserID` (`OfferUserID`);

--
-- Indexes for table `exchange_resource`
--
ALTER TABLE `exchange_resource`
  ADD PRIMARY KEY (`Exchange_Resource_ID`),
  ADD KEY `ExchangeID` (`ExchangeID`),
  ADD KEY `ResourceID` (`ResourceID`);

--
-- Indexes for table `garden`
--
ALTER TABLE `garden`
  ADD PRIMARY KEY (`GardenID`);

--
-- Indexes for table `gardenplot`
--
ALTER TABLE `gardenplot`
  ADD PRIMARY KEY (`PlotID`),
  ADD KEY `GardenID` (`GardenID`);

--
-- Indexes for table `guide`
--
ALTER TABLE `guide`
  ADD PRIMARY KEY (`GuideID`),
  ADD KEY `AuthorUserID` (`AuthorUserID`);

--
-- Indexes for table `partnership`
--
ALTER TABLE `partnership`
  ADD PRIMARY KEY (`PartnershipID`);

--
-- Indexes for table `planning activity`
--
ALTER TABLE `planning activity`
  ADD PRIMARY KEY (`ActivityID`),
  ADD KEY `UserID` (`UserID`,`PlotID`),
  ADD KEY `PlotID` (`PlotID`);

--
-- Indexes for table `plant`
--
ALTER TABLE `plant`
  ADD PRIMARY KEY (`PlantID`);

--
-- Indexes for table `plantingactivity_plant`
--
ALTER TABLE `plantingactivity_plant`
  ADD PRIMARY KEY (`PlantingActivity_Plant_ID`),
  ADD KEY `ActivityID` (`ActivityID`,`PlantID`),
  ADD KEY `PlantID` (`PlantID`);

--
-- Indexes for table `resource`
--
ALTER TABLE `resource`
  ADD PRIMARY KEY (`ResourceID`);

--
-- Indexes for table `resource_partnership`
--
ALTER TABLE `resource_partnership`
  ADD PRIMARY KEY (`Resource_Partnership_ID`),
  ADD KEY `ResourceID` (`ResourceID`,`PartnershipID`),
  ADD KEY `PartnershipID` (`PartnershipID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`UserID`);

--
-- Indexes for table `user_garden`
--
ALTER TABLE `user_garden`
  ADD PRIMARY KEY (`UserGardenID`),
  ADD KEY `UserID` (`UserID`,`GardenID`),
  ADD KEY `GardenID` (`GardenID`);

--
-- Indexes for table `volunteerevent`
--
ALTER TABLE `volunteerevent`
  ADD PRIMARY KEY (`EventID`),
  ADD KEY `GardenID` (`GardenID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `exchange`
--
ALTER TABLE `exchange`
  ADD CONSTRAINT `exchange_ibfk_1` FOREIGN KEY (`OfferUserID`) REFERENCES `user` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `exchange_resource`
--
ALTER TABLE `exchange_resource`
  ADD CONSTRAINT `exchange_resource_ibfk_1` FOREIGN KEY (`ResourceID`) REFERENCES `resource` (`ResourceID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `exchange_resource_ibfk_2` FOREIGN KEY (`ExchangeID`) REFERENCES `exchange` (`ExchangeID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `gardenplot`
--
ALTER TABLE `gardenplot`
  ADD CONSTRAINT `gardenplot_ibfk_1` FOREIGN KEY (`GardenID`) REFERENCES `garden` (`GardenID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `guide`
--
ALTER TABLE `guide`
  ADD CONSTRAINT `guide_ibfk_1` FOREIGN KEY (`AuthorUserID`) REFERENCES `user` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `planning activity`
--
ALTER TABLE `planning activity`
  ADD CONSTRAINT `planning activity_ibfk_1` FOREIGN KEY (`PlotID`) REFERENCES `gardenplot` (`PlotID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `planning activity_ibfk_3` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `plantingactivity_plant`
--
ALTER TABLE `plantingactivity_plant`
  ADD CONSTRAINT `plantingactivity_plant_ibfk_1` FOREIGN KEY (`ActivityID`) REFERENCES `planning activity` (`ActivityID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `plantingactivity_plant_ibfk_2` FOREIGN KEY (`PlantID`) REFERENCES `plant` (`PlantID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `resource_partnership`
--
ALTER TABLE `resource_partnership`
  ADD CONSTRAINT `resource_partnership_ibfk_1` FOREIGN KEY (`PartnershipID`) REFERENCES `partnership` (`PartnershipID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `resource_partnership_ibfk_2` FOREIGN KEY (`ResourceID`) REFERENCES `resource` (`ResourceID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_garden`
--
ALTER TABLE `user_garden`
  ADD CONSTRAINT `user_garden_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_garden_ibfk_2` FOREIGN KEY (`GardenID`) REFERENCES `garden` (`GardenID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `volunteerevent`
--
ALTER TABLE `volunteerevent`
  ADD CONSTRAINT `volunteerevent_ibfk_1` FOREIGN KEY (`GardenID`) REFERENCES `garden` (`GardenID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
