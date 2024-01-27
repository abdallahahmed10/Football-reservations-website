ALTER TABLE `egyptian_premier_league`.`persons` CHANGE COLUMN `First_Name` `first_name` VARCHAR(255) NOT NULL,
CHANGE COLUMN `Middle_Name` `middle_name` VARCHAR(45) NOT NULL,
CHANGE COLUMN `Last_Name` `last_name` VARCHAR(255) NOT NULL;

ALTER TABLE `egyptian_premier_league`.`persons` CHANGE COLUMN `Role` `role` INT NOT NULL;