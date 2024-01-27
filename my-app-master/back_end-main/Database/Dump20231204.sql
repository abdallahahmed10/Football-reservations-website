-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: egyptian_premier_league
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `matches`
--

DROP TABLE IF EXISTS `matches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `matches` (
  `Home_Team` varchar(255) NOT NULL,
  `Away_Team` varchar(255) NOT NULL,
  `Match_Venue` varchar(255) NOT NULL,
  `Date_and_Time` datetime NOT NULL,
  `Seats` json DEFAULT NULL,
  `Standard_Ticket_Price` decimal(6,2) NOT NULL,
  `VIP_Ticket_Price` decimal(8,2) NOT NULL,
  `Main_Referee` int NOT NULL,
  `Linesmen_1` int NOT NULL,
  `Linesmen_2` int NOT NULL,
  PRIMARY KEY (`Home_Team`,`Date_and_Time`),
  KEY `Away_Team` (`Away_Team`),
  KEY `Match_Venue` (`Match_Venue`),
  KEY `Main_Referee` (`Main_Referee`),
  KEY `Linesmen_1` (`Linesmen_1`),
  KEY `Linesmen_2` (`Linesmen_2`),
  CONSTRAINT `matches_ibfk_1` FOREIGN KEY (`Home_Team`) REFERENCES `teams` (`Team_Name`),
  CONSTRAINT `matches_ibfk_2` FOREIGN KEY (`Away_Team`) REFERENCES `teams` (`Team_Name`),
  CONSTRAINT `matches_ibfk_3` FOREIGN KEY (`Match_Venue`) REFERENCES `stadium` (`Stadium_Name`),
  CONSTRAINT `matches_ibfk_4` FOREIGN KEY (`Main_Referee`) REFERENCES `persons` (`id`),
  CONSTRAINT `matches_ibfk_5` FOREIGN KEY (`Linesmen_1`) REFERENCES `persons` (`id`),
  CONSTRAINT `matches_ibfk_6` FOREIGN KEY (`Linesmen_2`) REFERENCES `persons` (`id`),
  CONSTRAINT `matches_chk_1` CHECK ((json_length(`Seats`) > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matches`
--

LOCK TABLES `matches` WRITE;
/*!40000 ALTER TABLE `matches` DISABLE KEYS */;
INSERT INTO `matches` VALUES ('Al Ahly SC','El Zamalek SC','Cairo International Stadium','2023-01-01 18:00:00','{\"A1\": true, \"A2\": false}',300.00,800.00,1,2,3);
/*!40000 ALTER TABLE `matches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persons`
--

DROP TABLE IF EXISTS `persons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `persons` (
  `id` int NOT NULL AUTO_INCREMENT,
  `First_Name` varchar(255) NOT NULL,
  `Last_Name` varchar(255) NOT NULL,
  `Role` enum('0','1','2','3','4') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persons`
--

LOCK TABLES `persons` WRITE;
/*!40000 ALTER TABLE `persons` DISABLE KEYS */;
INSERT INTO `persons` VALUES (1,'Tyler Gregory','Okonma','1'),(2,'Casey Joseph','Jones','1'),(3,'Gerard Damien','Long','1'),(4,'Matthew Robert','Martin','1'),(5,'Davon Lamar','Wilson','1'),(6,'Christopher Edwin','Breaux','1'),(7,'Dominique Marquis','Cole','1'),(8,'Sydney Loren','Bennett','1'),(9,'Travis','Bennett','1'),(10,'Thebe Neruda','Kgositsile','1'),(11,'Robert Fitzgerald','Diggs','0'),(12,'Gary','Grice','0'),(13,'Clifford','Smith, Jr.','0'),(14,'Corey','Woods','0'),(15,'Dennis David','Coles','0'),(16,'Jason Richard','Hunter','0'),(17,'Lamont Jody','Hawkins','0'),(18,'Jamel','Irief','0'),(19,'Russell Tyrone','Jones','0');
/*!40000 ALTER TABLE `persons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation` (
  `User_Username` varchar(255) NOT NULL,
  `Match_Home_Team` varchar(255) NOT NULL,
  `Match_Date_and_Time` datetime NOT NULL,
  `Seat_No` int NOT NULL,
  `Credit_Card_Number` varchar(16) NOT NULL,
  `PIN_Number` int NOT NULL,
  PRIMARY KEY (`User_Username`,`Match_Home_Team`,`Match_Date_and_Time`),
  KEY `Match_Home_Team` (`Match_Home_Team`,`Match_Date_and_Time`),
  CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`User_Username`) REFERENCES `users` (`Username`),
  CONSTRAINT `reservation_ibfk_2` FOREIGN KEY (`Match_Home_Team`, `Match_Date_and_Time`) REFERENCES `matches` (`Home_Team`, `Date_and_Time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation`
--

LOCK TABLES `reservation` WRITE;
/*!40000 ALTER TABLE `reservation` DISABLE KEYS */;
INSERT INTO `reservation` VALUES ('user1','Al Ahly SC','2023-01-01 18:00:00',1,'1234567890123456',1234);
/*!40000 ALTER TABLE `reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stadium`
--

DROP TABLE IF EXISTS `stadium`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stadium` (
  `Stadium_Name` varchar(255) NOT NULL,
  `Stadium_Size` int NOT NULL,
  `Seat_Arrangement` json DEFAULT NULL,
  PRIMARY KEY (`Stadium_Name`),
  CONSTRAINT `stadium_chk_1` CHECK (((`Seat_Arrangement` is not null) and (json_length(`Seat_Arrangement`) > 0)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stadium`
--

LOCK TABLES `stadium` WRITE;
/*!40000 ALTER TABLE `stadium` DISABLE KEYS */;
INSERT INTO `stadium` VALUES ('30 June Stadium',0,'[{\"rows\": 10, \"section\": \"E\", \"seats_per_row\": 20}]'),('Al-Salam Stadium',0,'[{\"rows\": 14, \"section\": \"F\", \"seats_per_row\": 15}]'),('Arab Contractors Stadium',0,'[{\"rows\": 8, \"section\": \"D\", \"seats_per_row\": 22}]'),('Beni Ebeid Stadium',0,'[{\"rows\": 12, \"section\": \"G\", \"seats_per_row\": 18}]'),('Borg El Arab Stadium',0,'[{\"rows\": 12, \"section\": \"B\", \"seats_per_row\": 18}]'),('Cairo International Stadium',75000,'[{\"rows\": 5, \"section\": \"VIP\", \"seats_per_row\": 10}]'),('Cairo Military Academy Stadium',0,'[{\"rows\": 16, \"section\": \"I\", \"seats_per_row\": 12}]'),('Egyptian Army Stadium',0,'[{\"rows\": 15, \"section\": \"C\", \"seats_per_row\": 16}]'),('El-Sekka el-Hadid Stadium',0,'[{\"rows\": 20, \"section\": \"K\", \"seats_per_row\": 8}]'),('Ghazl el-Mahalla Stadium',0,'[{\"rows\": 10, \"section\": \"H\", \"seats_per_row\": 20}]'),('New Administrative Capital Stadium',1,'[{\"rows\": 10, \"section\": \"A\", \"seats_per_row\": 20}]'),('Suez Stadium',0,'[{\"rows\": 18, \"section\": \"J\", \"seats_per_row\": 10}]');
/*!40000 ALTER TABLE `stadium` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teams` (
  `Team_Name` varchar(255) NOT NULL,
  `Team_Logo_Path` varchar(255) NOT NULL,
  PRIMARY KEY (`Team_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams`
--

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;
INSERT INTO `teams` VALUES ('Al Ahly SC','/path/to/al-ahly-logo.png'),('Al Ittihad Alexandria Club','/path/to/al-ittihad-alexandria-logo.png'),('Al Masry SC','/path/to/al-masry-logo.png'),('Aswan SC','/path/to/aswan-logo.png'),('Asyut Petroleum SC','/path/to/asyut-petroleum-logo.png'),('Ceramica Cleopatra FC','/path/to/ceramica-cleopatra-logo.png'),('El Geish SC','/path/to/el-geish-logo.png'),('El Zamalek SC','/path/to/el-zamalek-logo.png'),('ENPPI SC','/path/to/enppi-logo.png'),('Gouna FC','/path/to/gouna-logo.png'),('Ismaily SC','/path/to/ismaily-logo.png'),('Misr Lel Makkasa SC','/path/to/misr-lel-makkasa-logo.png'),('National Bank SC','/path/to/national-bank-logo.png'),('Nogoom FC','/path/to/nogoom-logo.png'),('Pyramids FC','/path/to/pyramids-logo.png'),('Smouha SC','/path/to/smouha-logo.png'),('Tala\'ea El Gaish SC','/path/to/talaea-el-gaish-logo.png'),('Wadi Degla SC','/path/to/wadi-degla-logo.png');
/*!40000 ALTER TABLE `teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `Username` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `First_Name` varchar(255) NOT NULL,
  `Last_Name` varchar(255) NOT NULL,
  `Birth_Date` date NOT NULL,
  `Gender` tinyint(1) NOT NULL,
  `City` varchar(255) NOT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Email_Address` varchar(255) NOT NULL,
  `Fan` tinyint(1) NOT NULL,
  `Approval` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('user1','password1','First1','Last1','1990-01-01',1,'City1','Address1','user1@email.com',1,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-04 22:33:54
