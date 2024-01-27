ALTER TABLE `egyptian_premier_league`.`stadiums` CHANGE COLUMN `Stadium_Name` `stadium_name` VARCHAR(255) NOT NULL,
CHANGE COLUMN `Row_No` `row_no` INT NOT NULL,
CHANGE COLUMN `Seats_Per_Row` `seats_per_row` INT NOT NULL;

ALTER TABLE `egyptian_premier_league`.`reservations`
DROP FOREIGN KEY `reservations_ibfk_1`,
DROP FOREIGN KEY `reservations_ibfk_2`;

ALTER TABLE `egyptian_premier_league`.`reservations` CHANGE COLUMN `User_Username` `user_username` VARCHAR(255) NOT NULL,
CHANGE COLUMN `Match_Home_Team` `match_home_team` VARCHAR(255) NOT NULL,
CHANGE COLUMN `Match_Date_and_Time` `match_date_and_time` DATETIME NOT NULL,
CHANGE COLUMN `Credit_Card_Number` `credit_card_number` VARCHAR(16) NOT NULL,
CHANGE COLUMN `PIN_Number` `pin_number` INT NOT NULL,
CHANGE COLUMN `Row_No` `row_no` INT NOT NULL,
CHANGE COLUMN `Column_No` `column_no` INT NOT NULL;

ALTER TABLE `egyptian_premier_league`.`reservations` ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`user_username`) REFERENCES `egyptian_premier_league`.`users` (`username`),
ADD CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`match_home_team`, `match_date_and_time`) REFERENCES `egyptian_premier_league`.`matches` (`home_team`, `date_and_time`);