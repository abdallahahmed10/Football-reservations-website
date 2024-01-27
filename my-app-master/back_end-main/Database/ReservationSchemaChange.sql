-- Table structure for table `reservations`
DROP TABLE IF EXISTS `reservations`;

CREATE TABLE
    `reservations` (
        `ticket_number` INT AUTO_INCREMENT PRIMARY KEY,
        `user_username` varchar(255) NOT NULL,
        `match_home_team` varchar(255) NOT NULL,
        `match_date_and_time` datetime NOT NULL,
        `credit_card_number` varchar(16) NOT NULL,
        `pin_number` int NOT NULL,
        `row_no` int NOT NULL,
        `column_no` int NOT NULL,
        UNIQUE KEY `unique_reservation` (
            `user_username`,
            `match_home_team`,
            `match_date_and_time`,
            `row_no`,
            `column_no`
        ),
        KEY `reservations_ibfk_2` (`match_home_team`, `match_date_and_time`),
        CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`user_username`) REFERENCES `users` (`username`),
        CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`match_home_team`, `match_date_and_time`) REFERENCES `matches` (`home_team`, `date_and_time`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;