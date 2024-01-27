CREATE DATABASE  IF NOT EXISTS `egyptian_premier_league` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `egyptian_premier_league`;
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
  `home_team` varchar(255) NOT NULL,
  `away_team` varchar(255) NOT NULL,
  `match_venue` varchar(255) NOT NULL,
  `date_and_time` datetime NOT NULL,
  `seats` json DEFAULT NULL,
  `vip_ticket_price` decimal(8,2) NOT NULL,
  `main_referee` int NOT NULL,
  `linesmen_1` int NOT NULL,
  `linesmen_2` int NOT NULL,
  `home_team_logo_path` varchar(255) NOT NULL DEFAULT '1',
  `away_team_logo_path` varchar(255) NOT NULL DEFAULT '2',
  PRIMARY KEY (`home_team`,`date_and_time`),
  KEY `matches_ibfk_2` (`away_team`),
  KEY `matches_ibfk_3` (`match_venue`),
  KEY `matches_ibfk_4` (`main_referee`),
  KEY `matches_ibfk_5` (`linesmen_1`),
  KEY `matches_ibfk_6` (`linesmen_2`),
  CONSTRAINT `matches_ibfk_1` FOREIGN KEY (`home_team`) REFERENCES `teams` (`team_name`),
  CONSTRAINT `matches_ibfk_2` FOREIGN KEY (`away_team`) REFERENCES `teams` (`team_name`),
  CONSTRAINT `matches_ibfk_3` FOREIGN KEY (`match_venue`) REFERENCES `stadiums` (`stadium_name`),
  CONSTRAINT `matches_ibfk_4` FOREIGN KEY (`main_referee`) REFERENCES `persons` (`id`),
  CONSTRAINT `matches_ibfk_5` FOREIGN KEY (`linesmen_1`) REFERENCES `persons` (`id`),
  CONSTRAINT `matches_ibfk_6` FOREIGN KEY (`linesmen_2`) REFERENCES `persons` (`id`),
  CONSTRAINT `matches_chk_1` CHECK ((json_length(`seats`) > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matches`
--

LOCK TABLES `matches` WRITE;
/*!40000 ALTER TABLE `matches` DISABLE KEYS */;
INSERT INTO `matches` VALUES ('Al Ahly SC','El Zamalek SC','Cairo International Stadium','2023-01-01 18:00:00','{\"A1\": true, \"A2\": false}',800.00,1,2,3,'1','2'),('Al Ahly SC','El Zamalek SC','Cairo International Stadium','2023-02-01 18:00:00','{\"A1\": true, \"A2\": false}',800.00,1,2,3,'1','2'),('Al Ahly SC','Aswan SC','Cairo International Stadium test','2024-06-10 20:45:00','{\"reservations\": [[1, 0], [1, 0], [0, 0], [0, 0], [0, 0]]}',800.00,12,1,2,'1','2'),('Al Ahly SC','Aswan SC','Cairo International Stadium test','2024-07-10 20:45:00','{\"reservations\": [[0, 0], [1, 0], [0, 0], [0, 0], [0, 0]]}',800.00,12,1,2,'1','2'),('Al Ahly SC','Pyramids FC','Suez Stadium','2024-10-10 19:00:00','{\"A1\": true, \"A2\": false}',850.00,12,13,14,'1','2'),('Al Ahly SC','Aswan SC','Cairo International Stadium test','2024-12-10 20:45:00','{\"reservations\": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]}',800.00,12,1,2,'1','2'),('Al Ahly SC','Aswan SC','Cairo International Stadium test','2024-12-13 20:45:00','{\"reservations\": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]}',800.00,12,1,2,'1','2'),('Al Ahly SC','El Zamalek SC','Cairo International Stadium test','2025-12-27 04:00:00','{\"A1\": true, \"A2\": false}',800.00,1,2,3,'1','2'),('Al Ahly SC','El Zamalek SC','Cairo International Stadium','2028-02-01 18:00:00','{\"A1\": true, \"A2\": false}',800.00,1,2,3,'test path','test path2 '),('Al Ittihad Alexandria Club','Al Masry SC','Al-Salam Stadium','2023-12-15 20:30:00','{\"A1\": false, \"A2\": true}',700.00,4,5,6,'1','2'),('Al Ittihad Alexandria Club','El Zamalek SC','Ghazl el-Mahalla Stadium','2025-06-20 18:30:00','{\"A1\": true, \"A2\": false}',770.00,13,14,15,'1','2'),('Al Masry SC','Aswan SC','Cairo International Stadium','2023-06-01 18:00:00','{\"reservations\": [[0, 0], [0, 0], [0, 0]]}',800.00,12,1,2,'1','2'),('Al Masry SC','Aswan SC','Cairo International Stadium test','2023-07-01 18:00:00','{\"reservations\": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]}',800.00,12,1,2,'1','2'),('Al Masry SC','Aswan SC','Cairo International Stadium test','2023-08-01 18:00:00','{\"reservations\": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]}',800.00,12,1,2,'1','2'),('Al Masry SC','Aswan SC','Cairo International Stadium test','2023-09-01 18:00:00','{\"reservations\": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]}',800.00,12,1,2,'1','2'),('Al Masry SC','Aswan SC','Cairo International Stadium test','2023-10-01 18:00:00','{\"reservations\": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]}',800.00,12,1,2,'1','2'),('Al Masry SC','Aswan SC','Cairo International Stadium test','2023-10-02 18:00:00','{\"reservations\": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]}',800.00,12,1,2,'1','2'),('Al Masry SC','Aswan SC','Cairo International Stadium test','2024-03-10 19:45:00','{\"reservations\": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]}',900.00,19,8,10,'https://e7.pngegg.com/pngimages/474/784/png-clipart-al-masry-sc-egyptian-premier-league-tala-ea-el-gaish-sc-al-masry-club-stadium-smouha-sc-football.png','https://upload.wikimedia.org/wikipedia/ar/5/50/%D8%B4%D8%B9%D8%A7%D8%B1_%D9%86%D8%A7%D8%AF%D9%8A_%D8%A3%D8%B3%D9%88%D8%A7%D9%86.png'),('Al Masry SC','Aswan SC','Cairo International Stadium test','2024-03-16 19:45:00','{\"reservations\": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]}',800.00,12,1,2,'1','2'),('Al Masry SC','Aswan SC','Cairo International Stadium test','2024-09-23 19:45:00','{\"reservations\": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]}',800.00,12,1,2,'/path/to/al-masry-logo.png','/path/to/aswan-logo.png'),('Aswan SC','Ceramica Cleopatra FC','Suez Stadium','2025-07-15 19:00:00','{\"A1\": true, \"A2\": true}',850.00,16,17,18,'1','2'),('Asyut Petroleum SC','Smouha SC','New Administrative Capital Stadium','2024-11-25 17:30:00','{\"A1\": true, \"A2\": true}',770.00,15,16,17,'1','2'),('Ceramica Cleopatra FC','Wadi Degla SC','Cairo Military Academy Stadium','2024-04-15 18:30:00','{\"A1\": true, \"A2\": true}',750.00,13,14,15,'1','2'),('Ceramica Cleopatra FC','ENPPI SC','El-Sekka el-Hadid Stadium','2025-01-05 18:45:00','{\"A1\": false, \"A2\": false}',730.00,18,19,17,'1','2'),('El Geish SC','Gouna FC','Egyptian Army Stadium','2024-05-20 17:45:00','{\"A1\": false, \"A2\": true}',650.00,16,17,18,'1','2'),('El Zamalek SC','Misr Lel Makkasa SC','Cairo Military Academy Stadium','2025-09-05 18:45:00','{\"A1\": true, \"A2\": true}',820.00,2,3,4,'1','2'),('ENPPI SC','Gouna FC','El-Sekka el-Hadid Stadium','2025-08-10 20:15:00','{\"A1\": false, \"A2\": true}',730.00,19,18,1,'1','2'),('Gouna FC','Ismaily SC','Al-Salam Stadium','2025-02-20 20:15:00','{\"A1\": true, \"A2\": true}',820.00,1,2,3,'1','2'),('Ismaily SC','Misr Lel Makkasa SC','Beni Ebeid Stadium','2024-06-10 16:00:00','{\"A1\": true, \"A2\": false}',800.00,19,1,2,'1','2'),('Misr Lel Makkasa SC','National Bank SC','Borg El Arab Stadium','2025-03-15 19:30:00','{\"A1\": true, \"A2\": true}',890.00,4,5,6,'1','2'),('National Bank SC','Nogoom FC','Borg El Arab Stadium','2024-07-05 19:30:00','{\"A1\": true, \"A2\": true}',870.00,3,4,5,'1','2'),('National Bank SC','Pyramids FC','Borg El Arab Stadium','2025-10-02 19:30:00','{\"A1\": true, \"A2\": false}',890.00,5,6,7,'1','2'),('Pyramids FC','Smouha SC','30 June Stadium','2024-03-10 19:45:00','{\"reservations\": []}',900.00,12,1,2,'1','2'),('Pyramids FC','Smouha SC','30 June Stadium','2024-03-13 19:45:00','{\"reservations\": []}',900.00,12,1,2,'1','2'),('Pyramids FC','Tala\'ea El Gaish SC','Cairo International Stadium','2025-04-12 18:00:00','{\"A1\": true, \"A2\": true}',750.00,7,8,9,'1','2'),('Pyramids FC','Smouha SC','Cairo International Stadium test','2025-09-23 19:45:00','{\"reservations\": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]}',800.00,12,1,2,'/path/to/pyramids-logo.png','test path 3'),('Smouha SC','Wadi Degla SC','Arab Contractors Stadium','2025-05-08 17:15:00','{\"A1\": false, \"A2\": true}',720.00,10,11,12,'1','2'),('Tala\'ea El Gaish SC','Al Ittihad Alexandria Club','Arab Contractors Stadium','2024-08-15 20:00:00','{\"A1\": true, \"A2\": true}',720.00,6,7,8,'1','2'),('Tala\'ea El Gaish SC','Smouha SC','Cairo International Stadium','2025-11-15 18:00:00','{\"A1\": true, \"A2\": true}',750.00,8,9,10,'1','2'),('Wadi Degla SC','El Zamalek SC','Ghazl el-Mahalla Stadium','2024-09-02 18:15:00','{\"A1\": false, \"A2\": true}',700.00,9,10,11,'1','2'),('Wadi Degla SC','Al Ittihad Alexandria Club','Arab Contractors Stadium','2025-12-10 17:15:00','{\"A1\": false, \"A2\": true}',720.00,11,12,13,'1','2');
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
  `first_name` varchar(255) NOT NULL,
  `middle_name` varchar(45) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `role` int NOT NULL,
  PRIMARY KEY (`id`,`first_name`,`middle_name`,`last_name`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persons`
--

LOCK TABLES `persons` WRITE;
/*!40000 ALTER TABLE `persons` DISABLE KEYS */;
INSERT INTO `persons` VALUES (1,'Tyler','Gregory','Okonma',1),(2,'Casey','Joseph','Jones',1),(3,'Gerard','Damien','Long',1),(4,'Matthew','Robert','Martin',1),(5,'Davon','Lamar','Wilson',1),(6,'Christopher','Edwin','Breaux',1),(7,'Dominique','Marquis','Cole',1),(8,'Sydney','Loren','Bennett',1),(9,'Travis','Bennett','Bennett',1),(10,'Thebe','Neruda','Kgositsile',1),(11,'Robert','Fitzgerald','Diggs',1),(12,'Gary','Grice','Grice',0),(13,'Clifford','Smith','Smith',0),(14,'Corey','Woods','Woods',0),(15,'Dennis','David','Coles',0),(16,'Jason','Richard','Hunter',0),(17,'Lamont','Jody','Hawkins',0),(18,'Jamel','Irief','Irief',0),(19,'Russell','Tyrone','Jones',0),(22,'testfirst','testmiddle','testlast',0);
/*!40000 ALTER TABLE `persons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservations` (
  `user_username` varchar(255) NOT NULL,
  `match_home_team` varchar(255) NOT NULL,
  `match_date_and_time` datetime NOT NULL,
  `credit_card_number` varchar(16) NOT NULL,
  `pin_number` int NOT NULL,
  `row_no` int NOT NULL,
  `column_no` int NOT NULL,
  PRIMARY KEY (`user_username`,`match_home_team`,`match_date_and_time`,`row_no`,`column_no`),
  KEY `reservations_ibfk_2` (`match_home_team`,`match_date_and_time`),
  CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`user_username`) REFERENCES `users` (`username`),
  CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`match_home_team`, `match_date_and_time`) REFERENCES `matches` (`home_team`, `date_and_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` VALUES ('testuser','Al Ahly SC','2024-06-10 20:45:00','1234567890123456',1235,1,0),('user1','Al Ahly SC','2023-01-01 18:00:00','1234567890123456',1234,0,0),('user1','Al Ahly SC','2024-06-10 20:45:00','1234567892345777',1234,0,0),('user1','Al Ahly SC','2024-07-10 20:45:00','1234567890123456',1235,1,0);
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stadiums`
--

DROP TABLE IF EXISTS `stadiums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stadiums` (
  `stadium_name` varchar(255) NOT NULL,
  `row_no` int NOT NULL,
  `seats_per_row` int NOT NULL,
  PRIMARY KEY (`stadium_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stadiums`
--

LOCK TABLES `stadiums` WRITE;
/*!40000 ALTER TABLE `stadiums` DISABLE KEYS */;
INSERT INTO `stadiums` VALUES ('30 June Stadium',0,0),('Al-Salam Stadium',0,0),('Arab Contractors Stadium',0,0),('Beni Ebeid Stadium',0,0),('Borg El Arab Stadium',0,0),('Cairo International Stadium',3,2),('Cairo International Stadium test',5,2),('Cairo Military Academy Stadium',0,0),('Egyptian Army Stadium',0,0),('El-Sekka el-Hadid Stadium',0,0),('Ghazl el-Mahalla Stadium',0,0),('New Administrative Capital Stadium',0,0),('Suez Stadium',0,0),('test stadium',6,6),('test stadium 23',7,7),('test-stadium',5,3);
/*!40000 ALTER TABLE `stadiums` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teams` (
  `team_name` varchar(255) NOT NULL,
  `team_logo_path` varchar(255) NOT NULL,
  PRIMARY KEY (`team_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams`
--

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;
INSERT INTO `teams` VALUES ('Al Ahly SC','https://th.bing.com/th?id=OIP.MSfM6CToEXUCSoNSgU9kugHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2'),('Al Ittihad Alexandria Club','https://en.wikipedia.org/wiki/File:Al-Ittihad_Alexandria_Club_logo.png'),('Al Masry SC','https://e7.pngegg.com/pngimages/474/784/png-clipart-al-masry-sc-egyptian-premier-league-tala-ea-el-gaish-sc-al-masry-club-stadium-smouha-sc-football.png'),('Aswan SC','https://upload.wikimedia.org/wikipedia/ar/5/50/%D8%B4%D8%B9%D8%A7%D8%B1_%D9%86%D8%A7%D8%AF%D9%8A_%D8%A3%D8%B3%D9%88%D8%A7%D9%86.png'),('Asyut Petroleum SC','https://upload.wikimedia.org/wikipedia/commons/5/5c/Asyut_Petroleum.png'),('Ceramica Cleopatra FC','https://upload.wikimedia.org/wikipedia/en/9/94/Ceramica_Cleopatra_FC_logo.png'),('El Geish SC','https://upload.wikimedia.org/wikipedia/en/5/56/Tala%27ea_El_Gaish_Logo_2017.png'),('El Zamalek SC','https://www.pngegg.com/en/png-cjdpk'),('ENPPI SC','https://seeklogo.com/images/E/Enppi_Egyptian_Soccer_Club-logo-1219612C47-seeklogo.com.png'),('Gouna FC','https://seeklogo.com/images/E/el-gouna-football-club-logo-B00418C245-seeklogo.com.gif'),('Ismaily SC','https://www.pngegg.com/en/png-ilfon'),('Misr Lel Makkasa SC','https://www.footballkitarchive.com/static/logos/0JQUbuak61wuMSP/misr-lel-makkasa-sc-2021-logo.png'),('National Bank SC','https://upload.wikimedia.org/wikipedia/commons/8/8e/NBOEC.jpg'),('Nogoom FC','https://upload.wikimedia.org/wikipedia/commons/6/69/NOGOOM_FC.png'),('Pyramids FC','https://upload.wikimedia.org/wikipedia/ar/3/3f/Pyramids_F.C_%282018%29.png'),('Smouha SC','https://upload.wikimedia.org/wikipedia/ar/3/3f/Smouha_SC_logo.png'),('Tala\'ea El Gaish SC','https://upload.wikimedia.org/wikipedia/en/5/56/Tala%27ea_El_Gaish_Logo_2017.png'),('Wadi Degla SC','https://seeklogo.com/images/W/wadi-degla-fc-logo-5E4114CBC8-seeklogo.com.png');
/*!40000 ALTER TABLE `teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `birth_date` date NOT NULL,
  `gender` int NOT NULL,
  `city` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email_address` varchar(255) NOT NULL,
  `fan` tinyint(1) NOT NULL,
  `approval` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='																							';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('testuser','testpass','testfirdt','testlast','1992-11-09',0,'testvoty','testaddy2','who@why',0,1),('testuser2','testpass','testfirst','testlast','1992-11-09',0,'testvoty','testaddy','who@why',0,NULL),('testuser4','testpass','testfirdt','testlast','1992-11-09',0,'testvoty','testaddy','who@why',0,NULL),('user1','password1','First1','Last1','1990-01-01',1,'City1','Address1','user1@email.com',1,1),('user3','password3','First3','Last3','1988-07-20',1,'City3','Address3','user3@email.com',1,NULL),('user4','password4','First4','Last4','1992-11-10',0,'City4','Address4','user4@email.com',0,NULL);
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

-- Dump completed on 2024-01-02 19:21:55
