CREATE DATABASE IF NOT EXISTS `egyptian_premier_league` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

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

CREATE TABLE
  `matches` (
    `home_team` varchar(255) NOT NULL,
    `away_team` varchar(255) NOT NULL,
    `match_venue` varchar(255) NOT NULL,
    `date_and_time` datetime NOT NULL,
    `seats` json DEFAULT NULL,
    `vip_ticket_price` decimal(8, 2) NOT NULL,
    `main_referee` int NOT NULL,
    `linesmen_1` int NOT NULL,
    `linesmen_2` int NOT NULL,
    PRIMARY KEY (`home_team`, `date_and_time`),
    KEY `matches_ibfk_2` (`away_team`),
    KEY `matches_ibfk_3` (`match_venue`),
    KEY `matches_ibfk_4` (`main_referee`),
    KEY `matches_ibfk_5` (`linesmen_1`),
    KEY `matches_ibfk_6` (`linesmen_2`),
    CONSTRAINT `matches_ibfk_1` FOREIGN KEY (`home_team`) REFERENCES `teams` (`Team_Name`),
    CONSTRAINT `matches_ibfk_2` FOREIGN KEY (`away_team`) REFERENCES `teams` (`Team_Name`),
    CONSTRAINT `matches_ibfk_3` FOREIGN KEY (`match_venue`) REFERENCES `stadiums` (`Stadium_Name`),
    CONSTRAINT `matches_ibfk_4` FOREIGN KEY (`main_referee`) REFERENCES `persons` (`id`),
    CONSTRAINT `matches_ibfk_5` FOREIGN KEY (`linesmen_1`) REFERENCES `persons` (`id`),
    CONSTRAINT `matches_ibfk_6` FOREIGN KEY (`linesmen_2`) REFERENCES `persons` (`id`),
    CONSTRAINT `matches_chk_1` CHECK ((json_length (`seats`) > 0))
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matches`
--
LOCK TABLES `matches` WRITE;

/*!40000 ALTER TABLE `matches` DISABLE KEYS */;

INSERT INTO
  `matches`
VALUES
  (
    'Al Ahly SC',
    'El Zamalek SC',
    'Cairo International Stadium',
    '2023-01-01 18:00:00',
    '{\"A1\": true, \"A2\": false}',
    800.00,
    1,
    2,
    3
  ),
  (
    'Al Ahly SC',
    'El Zamalek SC',
    'Cairo International Stadium',
    '2023-02-01 18:00:00',
    '{\"A1\": true, \"A2\": false}',
    800.00,
    1,
    2,
    3
  ),
  (
    'Al Ahly SC',
    'Aswan SC',
    'Cairo International Stadium test',
    '2024-03-10 20:45:00',
    '{\"reservations\": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]}',
    800.00,
    12,
    1,
    2
  ),
  (
    'Al Ahly SC',
    'Aswan SC',
    'Cairo International Stadium test',
    '2024-06-10 20:45:00',
    '{\"reservations\": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]}',
    800.00,
    12,
    1,
    2
  ),
  (
    'Al Ahly SC',
    'Aswan SC',
    'Cairo International Stadium test',
    '2024-07-10 20:45:00',
    '{\"reservations\": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]}',
    800.00,
    12,
    1,
    2
  ),
  (
    'Al Ahly SC',
    'Pyramids FC',
    'Suez Stadium',
    '2024-10-10 19:00:00',
    '{\"A1\": true, \"A2\": false}',
    850.00,
    12,
    13,
    14
  ),
  (
    'Al Ahly SC',
    'Aswan SC',
    'Cairo International Stadium test',
    '2024-12-10 20:45:00',
    '{\"reservations\": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]}',
    800.00,
    12,
    1,
    2
  ),
  (
    'Al Ahly SC',
    'Aswan SC',
    'Cairo International Stadium test',
    '2024-12-13 20:45:00',
    '{\"reservations\": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]}',
    800.00,
    12,
    1,
    2
  ),
  (
    'Al Ahly SC',
    'El Zamalek SC',
    'Cairo International Stadium test',
    '2025-12-27 04:00:00',
    '{\"A1\": true, \"A2\": false}',
    800.00,
    1,
    2,
    3
  ),
  (
    'Al Ittihad Alexandria Club',
    'Al Masry SC',
    'Al-Salam Stadium',
    '2023-12-15 20:30:00',
    '{\"A1\": false, \"A2\": true}',
    700.00,
    4,
    5,
    6
  ),
  (
    'Al Ittihad Alexandria Club',
    'El Zamalek SC',
    'Ghazl el-Mahalla Stadium',
    '2025-06-20 18:30:00',
    '{\"A1\": true, \"A2\": false}',
    770.00,
    13,
    14,
    15
  ),
  (
    'Al Masry SC',
    'Aswan SC',
    'Cairo International Stadium',
    '2023-06-01 18:00:00',
    '{\"reservations\": [[0, 0], [0, 0], [0, 0]]}',
    800.00,
    12,
    1,
    2
  ),
  (
    'Al Masry SC',
    'Aswan SC',
    'Cairo International Stadium test',
    '2023-07-01 18:00:00',
    '{\"reservations\": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]}',
    800.00,
    12,
    1,
    2
  ),
  (
    'Al Masry SC',
    'Aswan SC',
    'Cairo International Stadium test',
    '2023-08-01 18:00:00',
    '{\"reservations\": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]}',
    800.00,
    12,
    1,
    2
  ),
  (
    'Al Masry SC',
    'Aswan SC',
    'Cairo International Stadium test',
    '2023-09-01 18:00:00',
    '{\"reservations\": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]}',
    800.00,
    12,
    1,
    2
  ),
  (
    'Al Masry SC',
    'Aswan SC',
    'Cairo International Stadium test',
    '2023-10-01 18:00:00',
    '{\"reservations\": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]}',
    800.00,
    12,
    1,
    2
  ),
  (
    'Al Masry SC',
    'Aswan SC',
    'Cairo International Stadium test',
    '2023-10-02 18:00:00',
    '{\"reservations\": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]}',
    800.00,
    12,
    1,
    2
  ),
  (
    'Aswan SC',
    'Ceramica Cleopatra FC',
    'Suez Stadium',
    '2025-07-15 19:00:00',
    '{\"A1\": true, \"A2\": true}',
    850.00,
    16,
    17,
    18
  ),
  (
    'Asyut Petroleum SC',
    'Smouha SC',
    'New Administrative Capital Stadium',
    '2024-11-25 17:30:00',
    '{\"A1\": true, \"A2\": true}',
    770.00,
    15,
    16,
    17
  ),
  (
    'Ceramica Cleopatra FC',
    'Wadi Degla SC',
    'Cairo Military Academy Stadium',
    '2024-04-15 18:30:00',
    '{\"A1\": true, \"A2\": true}',
    750.00,
    13,
    14,
    15
  ),
  (
    'Ceramica Cleopatra FC',
    'ENPPI SC',
    'El-Sekka el-Hadid Stadium',
    '2025-01-05 18:45:00',
    '{\"A1\": false, \"A2\": false}',
    730.00,
    18,
    19,
    17
  ),
  (
    'El Geish SC',
    'Gouna FC',
    'Egyptian Army Stadium',
    '2024-05-20 17:45:00',
    '{\"A1\": false, \"A2\": true}',
    650.00,
    16,
    17,
    18
  ),
  (
    'El Zamalek SC',
    'Misr Lel Makkasa SC',
    'Cairo Military Academy Stadium',
    '2025-09-05 18:45:00',
    '{\"A1\": true, \"A2\": true}',
    820.00,
    2,
    3,
    4
  ),
  (
    'ENPPI SC',
    'Gouna FC',
    'El-Sekka el-Hadid Stadium',
    '2025-08-10 20:15:00',
    '{\"A1\": false, \"A2\": true}',
    730.00,
    19,
    18,
    1
  ),
  (
    'Gouna FC',
    'Ismaily SC',
    'Al-Salam Stadium',
    '2025-02-20 20:15:00',
    '{\"A1\": true, \"A2\": true}',
    820.00,
    1,
    2,
    3
  ),
  (
    'Ismaily SC',
    'Misr Lel Makkasa SC',
    'Beni Ebeid Stadium',
    '2024-06-10 16:00:00',
    '{\"A1\": true, \"A2\": false}',
    800.00,
    19,
    1,
    2
  ),
  (
    'Misr Lel Makkasa SC',
    'National Bank SC',
    'Borg El Arab Stadium',
    '2025-03-15 19:30:00',
    '{\"A1\": true, \"A2\": true}',
    890.00,
    4,
    5,
    6
  ),
  (
    'National Bank SC',
    'Nogoom FC',
    'Borg El Arab Stadium',
    '2024-07-05 19:30:00',
    '{\"A1\": true, \"A2\": true}',
    870.00,
    3,
    4,
    5
  ),
  (
    'National Bank SC',
    'Pyramids FC',
    'Borg El Arab Stadium',
    '2025-10-02 19:30:00',
    '{\"A1\": true, \"A2\": false}',
    890.00,
    5,
    6,
    7
  ),
  (
    'Pyramids FC',
    'Smouha SC',
    '30 June Stadium',
    '2024-03-10 19:45:00',
    '{\"reservations\": []}',
    900.00,
    12,
    1,
    2
  ),
  (
    'Pyramids FC',
    'Tala\'ea El Gaish SC',
    'Cairo International Stadium',
    '2025-04-12 18:00:00',
    '{\"A1\": true, \"A2\": true}',
    750.00,
    7,
    8,
    9
  ),
  (
    'Smouha SC',
    'Wadi Degla SC',
    'Arab Contractors Stadium',
    '2025-05-08 17:15:00',
    '{\"A1\": false, \"A2\": true}',
    720.00,
    10,
    11,
    12
  ),
  (
    'Tala\'ea El Gaish SC',
    'Al Ittihad Alexandria Club',
    'Arab Contractors Stadium',
    '2024-08-15 20:00:00',
    '{\"A1\": true, \"A2\": true}',
    720.00,
    6,
    7,
    8
  ),
  (
    'Tala\'ea El Gaish SC',
    'Smouha SC',
    'Cairo International Stadium',
    '2025-11-15 18:00:00',
    '{\"A1\": true, \"A2\": true}',
    750.00,
    8,
    9,
    10
  ),
  (
    'Wadi Degla SC',
    'El Zamalek SC',
    'Ghazl el-Mahalla Stadium',
    '2024-09-02 18:15:00',
    '{\"A1\": false, \"A2\": true}',
    700.00,
    9,
    10,
    11
  ),
  (
    'Wadi Degla SC',
    'Al Ittihad Alexandria Club',
    'Arab Contractors Stadium',
    '2025-12-10 17:15:00',
    '{\"A1\": false, \"A2\": true}',
    720.00,
    11,
    12,
    13
  );

/*!40000 ALTER TABLE `matches` ENABLE KEYS */;

UNLOCK TABLES;

--
-- Table structure for table `persons`
--
DROP TABLE IF EXISTS `persons`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE
  `persons` (
    `id` int NOT NULL AUTO_INCREMENT,
    `First_Name` varchar(255) NOT NULL,
    `Middle_Name` varchar(45) NOT NULL,
    `Last_Name` varchar(255) NOT NULL,
    `Role` int NOT NULL,
    PRIMARY KEY (`id`, `First_Name`, `Middle_Name`, `Last_Name`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 21 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persons`
--
LOCK TABLES `persons` WRITE;

/*!40000 ALTER TABLE `persons` DISABLE KEYS */;

INSERT INTO
  `persons`
VALUES
  (1, 'Tyler ', 'Gregory', 'Okonma', 1),
  (2, 'Casey ', 'Joseph', 'Jones', 1),
  (3, 'Gerard ', 'Damien', 'Long', 1),
  (4, 'Matthew ', 'Robert', 'Martin', 1),
  (5, 'Davon ', 'Lamar', 'Wilson', 1),
  (6, 'Christopher ', 'Edwin', 'Breaux', 1),
  (7, 'Dominique ', 'Marquis', 'Cole', 1),
  (8, 'Sydney ', 'Loren', 'Bennett', 1),
  (9, 'Travis', 'Bennett', 'Bennett', 1),
  (10, 'Thebe ', 'Neruda', 'Kgositsile', 1),
  (11, 'Robert', 'Fitzgerald', 'Diggs', 1),
  (12, 'Gary', 'Grice', 'Grice', 0),
  (13, 'Clifford', 'Smith', 'Smith, Jr.', 0),
  (14, 'Corey', 'Woods', 'Woods', 0),
  (15, 'Dennis ', 'David', 'Coles', 0),
  (16, 'Jason ', 'Richard', 'Hunter', 0),
  (17, 'Lamont', 'Jody', 'Hawkins', 0),
  (18, 'Jamel', 'Irief', 'Irief', 0),
  (19, 'Russell', 'Tyrone', 'Jones', 0);

/*!40000 ALTER TABLE `persons` ENABLE KEYS */;

UNLOCK TABLES;

--
-- Table structure for table `reservations`
--
DROP TABLE IF EXISTS `reservations`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE
  `reservations` (
    `User_Username` varchar(255) NOT NULL,
    `Match_Home_Team` varchar(255) NOT NULL,
    `Match_Date_and_Time` datetime NOT NULL,
    `Credit_Card_Number` varchar(16) NOT NULL,
    `PIN_Number` int NOT NULL,
    `Row_No` int NOT NULL,
    `Column_No` int NOT NULL,
    PRIMARY KEY (
      `User_Username`,
      `Match_Home_Team`,
      `Match_Date_and_Time`
    ),
    KEY `Match_Home_Team` (`Match_Home_Team`, `Match_Date_and_Time`),
    CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`User_Username`) REFERENCES `users` (`username`),
    CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`Match_Home_Team`, `Match_Date_and_Time`) REFERENCES `matches` (`home_team`, `date_and_time`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--
LOCK TABLES `reservations` WRITE;

/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;

INSERT INTO
  `reservations`
VALUES
  (
    'user1',
    'Al Ahly SC',
    '2023-01-01 18:00:00',
    '1234567890123456',
    1234,
    0,
    0
  );

/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;

UNLOCK TABLES;

--
-- Table structure for table `stadiums`
--
DROP TABLE IF EXISTS `stadiums`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE
  `stadiums` (
    `Stadium_Name` varchar(255) NOT NULL,
    `Row_No` int NOT NULL,
    `Seats_Per_Row` int NOT NULL,
    PRIMARY KEY (`Stadium_Name`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stadiums`
--
LOCK TABLES `stadiums` WRITE;

/*!40000 ALTER TABLE `stadiums` DISABLE KEYS */;

INSERT INTO
  `stadiums`
VALUES
  ('30 June Stadium', 0, 0),
  ('Al-Salam Stadium', 0, 0),
  ('Arab Contractors Stadium', 0, 0),
  ('Beni Ebeid Stadium', 0, 0),
  ('Borg El Arab Stadium', 0, 0),
  ('Cairo International Stadium', 3, 2),
  ('Cairo International Stadium test', 5, 2),
  ('Cairo Military Academy Stadium', 0, 0),
  ('Egyptian Army Stadium', 0, 0),
  ('El-Sekka el-Hadid Stadium', 0, 0),
  ('Ghazl el-Mahalla Stadium', 0, 0),
  ('New Administrative Capital Stadium', 0, 0),
  ('Suez Stadium', 0, 0),
  ('test-stadium', 5, 3);

/*!40000 ALTER TABLE `stadiums` ENABLE KEYS */;

UNLOCK TABLES;

--
-- Table structure for table `teams`
--
DROP TABLE IF EXISTS `teams`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE
  `teams` (
    `Team_Name` varchar(255) NOT NULL,
    `Team_Logo_Path` varchar(255) NOT NULL,
    PRIMARY KEY (`Team_Name`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams`
--
LOCK TABLES `teams` WRITE;

/*!40000 ALTER TABLE `teams` DISABLE KEYS */;

INSERT INTO
  `teams`
VALUES
  ('Al Ahly SC', '/path/to/al-ahly-logo.png'),
  (
    'Al Ittihad Alexandria Club',
    '/path/to/al-ittihad-alexandria-logo.png'
  ),
  ('Al Masry SC', '/path/to/al-masry-logo.png'),
  ('Aswan SC', '/path/to/aswan-logo.png'),
  (
    'Asyut Petroleum SC',
    '/path/to/asyut-petroleum-logo.png'
  ),
  (
    'Ceramica Cleopatra FC',
    '/path/to/ceramica-cleopatra-logo.png'
  ),
  ('El Geish SC', '/path/to/el-geish-logo.png'),
  ('El Zamalek SC', '/path/to/el-zamalek-logo.png'),
  ('ENPPI SC', '/path/to/enppi-logo.png'),
  ('Gouna FC', '/path/to/gouna-logo.png'),
  ('Ismaily SC', '/path/to/ismaily-logo.png'),
  (
    'Misr Lel Makkasa SC',
    '/path/to/misr-lel-makkasa-logo.png'
  ),
  (
    'National Bank SC',
    '/path/to/national-bank-logo.png'
  ),
  ('Nogoom FC', '/path/to/nogoom-logo.png'),
  ('Pyramids FC', '/path/to/pyramids-logo.png'),
  ('Smouha SC', '/path/to/smouha-logo.png'),
  (
    'Tala\'ea El Gaish SC',
    '/path/to/talaea-el-gaish-logo.png'
  ),
  ('Wadi Degla SC', '/path/to/wadi-degla-logo.png');

/*!40000 ALTER TABLE `teams` ENABLE KEYS */;

UNLOCK TABLES;

--
-- Table structure for table `users`
--
DROP TABLE IF EXISTS `users`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE
  `users` (
    `username` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `first_name` varchar(255) NOT NULL,
    `last_name` varchar(255) NOT NULL,
    `birth_date` date NOT NULL,
    `gender` int NOT NULL,
    `city` varchar(255) NOT NULL,
    `address` varchar(255) DEFAULT NULL,
    `email_address` varchar(255) NOT NULL,
    `fan` tinyint (1) NOT NULL,
    `approval` tinyint (1) DEFAULT NULL,
    PRIMARY KEY (`username`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '																							';

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--
LOCK TABLES `users` WRITE;

/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO
  `users`
VALUES
  (
    'testuser',
    'testpass',
    'testfirdt',
    'testlast',
    '1992-11-09',
    0,
    'testvoty',
    'testaddy2',
    'who@why',
    0,
    1
  ),
  (
    'testuser2',
    'testpass',
    'testfirst',
    'testlast',
    '1992-11-09',
    0,
    'testvoty',
    'testaddy',
    'who@why',
    0,
    NULL
  ),
  (
    'testuser4',
    'testpass',
    'testfirdt',
    'testlast',
    '1992-11-09',
    0,
    'testvoty',
    'testaddy',
    'who@why',
    0,
    NULL
  ),
  (
    'user1',
    'password1',
    'First1',
    'Last1',
    '1990-01-01',
    1,
    'City1',
    'Address1',
    'user1@email.com',
    1,
    1
  ),
  (
    'user3',
    'password3',
    'First3',
    'Last3',
    '1988-07-20',
    1,
    'City3',
    'Address3',
    'user3@email.com',
    1,
    NULL
  ),
  (
    'user4',
    'password4',
    'First4',
    'Last4',
    '1992-11-10',
    0,
    'City4',
    'Address4',
    'user4@email.com',
    0,
    NULL
  );

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

-- Dump completed on 2023-12-30 14:14:33