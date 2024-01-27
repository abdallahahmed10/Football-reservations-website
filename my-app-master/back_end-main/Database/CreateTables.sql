DONT FORGET TO ADJUST VARCHAR SIZE
--CHANGES:
-- 1- stadium JSON will include VIP/standard configuration
-- 2- Matches JSON will simply include a bunch of bool values to inidcate whether  seat has been reserved or not
-- 3- Added standard and vip ticket prices to matches table
-- 3- Altered User table to include a bool that indicates apporaval status (1 == accepted, 0 == rejected, null == pending)
--NOTES:
-- 1- role = 1 --> linesmen 
-- 2- role = 0 --> referee
-- 3- gender = 0 --> male
-- 4- gender = 1 --> female 
CREATE TABLE
    Users (
        Username VARCHAR(255) PRIMARY KEY NOT NULL,
        Password VARCHAR(255) NOT NULL,
        First_Name VARCHAR(255) NOT NULL,
        Last_Name VARCHAR(255) NOT NULL,
        Birth_Date DATE NOT NULL,
        Gender BOOL NOT NULL,
        City VARCHAR(255) NOT NULL,
        Address VARCHAR(255),
        Email_Address VARCHAR(255) NOT NULL,
        Fan BOOL NOT NULL
    );

CREATE TABLE
    Teams (
        Team_Name VARCHAR(255) PRIMARY KEY NOT NULL,
        Team_Logo_Path VARCHAR(255) NOT NULL
    );

-- role = 1 --> linesmen 
-- role = 0 --> referee
CREATE TABLE
    Persons (
        id INT AUTO_INCREMENT PRIMARY KEY,
        First_Name VARCHAR(255) NOT NULL,
        Last_Name VARCHAR(255) NOT NULL,
        Role ENUM ('0', '1', '2', '3', '4') NOT NULL
    );

-- stadmium JSON will include VIP/standard configuration
CREATE TABLE
    Stadium (
        Stadium_Name VARCHAR(255) PRIMARY KEY NOT NULL,
        Stadium_Size INT NOT NULL,
        Seat_Arrangement JSON CHECK (
            Seat_Arrangement IS NOT NULL
            AND JSON_LENGTH (Seat_Arrangement) > 0
        )
    );

-- Matches JSON will simply include a bunch of bool values to inidcate whether  seat has been reserved or not
CREATE TABLE
    Matches (
        Home_Team VARCHAR(255) NOT NULL,
        Away_Team VARCHAR(255) NOT NULL,
        Match_Venue VARCHAR(255) NOT NULL,
        Date_and_Time DATETIME NOT NULL,
        Seats JSON CHECK (JSON_LENGTH (Seats) > 0),
        Standard_Ticket_Price DECIMAL(6, 2) NOT NULL,
        VIP_Ticket_Price DECIMAL(8, 2) NOT NULL,
        Main_Referee INT NOT NULL,
        Linesmen_1 INT NOT NULL,
        Linesmen_2 INT NOT NULL,
        PRIMARY KEY (Home_Team, Date_and_Time),
        FOREIGN KEY (Home_Team) REFERENCES Teams (Team_Name),
        FOREIGN KEY (Away_Team) REFERENCES Teams (Team_Name),
        FOREIGN KEY (Match_Venue) REFERENCES Stadium (Stadium_Name),
        FOREIGN KEY (Main_Referee) REFERENCES Persons (id),
        FOREIGN KEY (Linesmen_1) REFERENCES Persons (id),
        FOREIGN KEY (Linesmen_2) REFERENCES Persons (id)
    );

CREATE TABLE
    Reservation (
        User_Username VARCHAR(255) NOT NULL,
        Match_Home_Team VARCHAR(255) NOT NULL,
        Match_Date_and_Time DATETIME NOT NULL,
        Seat_No INT NOT NULL,
        Credit_Card_Number VARCHAR(16) NOT NULL,
        PIN_Number INT NOT NULL,
        PRIMARY KEY (
            User_Username,
            Match_Home_Team,
            Match_Date_and_Time
        ),
        FOREIGN KEY (User_Username) REFERENCES Users (Username),
        FOREIGN KEY (Match_Home_Team, Match_Date_and_Time) REFERENCES Matches (Home_Team, Date_and_Time)
    );

-- Insert statements for Stadium table
INSERT INTO
    Stadium (Stadium_Name, Stadium_Size)
VALUES
    ('New Administrative Capital Stadium', NULL), -- Replace NULL with the actual size if available
    ('Borg El Arab Stadium', NULL),
    ('Cairo International Stadium', 75000),
    ('Egyptian Army Stadium', NULL),
    ('Arab Contractors Stadium', NULL),
    ('30 June Stadium', NULL),
    ('Al-Salam Stadium', NULL),
    ('Beni Ebeid Stadium', NULL),
    ('Ghazl el-Mahalla Stadium', NULL),
    ('Cairo Military Academy Stadium', NULL),
    ('Suez Stadium', NULL),
    ('El-Sekka el-Hadid Stadium', NULL);

-- Continue Insert statements for Teams table
INSERT INTO
    Teams (Team_Name, Team_Logo_Path)
VALUES
    ('Pyramids FC', '/path/to/pyramids-logo.png'),
    ('Ismaily SC', '/path/to/ismaily-logo.png'),
    ('El Zamalek SC', '/path/to/el-zamalek-logo.png'),
    ('Al Masry SC', '/path/to/al-masry-logo.png'),
    ('ENPPI SC', '/path/to/enppi-logo.png'),
    (
        'Al Ittihad Alexandria Club',
        '/path/to/al-ittihad-alexandria-logo.png'
    ),
    ('Smouha SC', '/path/to/smouha-logo.png'),
    (
        'Misr Lel Makkasa SC',
        '/path/to/misr-lel-makkasa-logo.png'
    ),
    (
        'Tala''ea El Gaish SC',
        '/path/to/talaea-el-gaish-logo.png'
    ),
    ('Wadi Degla SC', '/path/to/wadi-degla-logo.png'),
    (
        'Ceramica Cleopatra FC',
        '/path/to/ceramica-cleopatra-logo.png'
    ),
    ('Aswan SC', '/path/to/aswan-logo.png'),
    (
        'National Bank SC',
        '/path/to/national-bank-logo.png'
    ),
    ('Gouna FC', '/path/to/gouna-logo.png'),
    ('Nogoom FC', '/path/to/nogoom-logo.png'),
    ('El Geish SC', '/path/to/el-geish-logo.png'),
    (
        'Asyut Petroleum SC',
        '/path/to/asyut-petroleum-logo.png'
    );

-- Insert statements for Users table
INSERT INTO
    Users (
        Username,
        Password,
        First_Name,
        Last_Name,
        Birth_Date,
        Gender,
        City,
        Address,
        Email_Address,
        Fan
    )
VALUES
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
        1
    );

-- Insert statements for Persons table (Linesmen)
-- role = 1 --> linesmen 
INSERT INTO
    Persons (First_Name, Last_Name, Role)
VALUES
    ('Tyler Gregory', 'Okonma', '1'),
    ('Casey Joseph', 'Jones', '1'),
    ('Gerard Damien', 'Long', '1'),
    ('Matthew Robert', 'Martin', '1'),
    ('Davon Lamar', 'Wilson', '1'),
    ('Christopher Edwin', 'Breaux', '1'),
    ('Dominique Marquis', 'Cole', '1'),
    ('Sydney Loren', 'Bennett', '1'),
    ('Travis', 'Bennett', '1'),
    ('Thebe Neruda', 'Kgositsile', '1');

-- Insert statements for Persons table
-- role = 0 --> referee
INSERT INTO
    Persons (First_Name, Last_Name, Role)
VALUES
    ('Robert Fitzgerald', 'Diggs', '0'),
    ('Gary', 'Grice', '0'),
    ('Clifford', 'Smith, Jr.', '0'),
    ('Corey', 'Woods', '0'),
    ('Dennis David', 'Coles', '0'),
    ('Jason Richard', 'Hunter', '0'),
    ('Lamont Jody', 'Hawkins', '0'),
    ('Jamel', 'Irief', '0'),
    ('Russell Tyrone', 'Jones', '0');

-- Insert statements for Matches table
-- Note: Adjust Date_and_Time values based on actual match dates and times
INSERT INTO
    Matches (
        Home_Team,
        Away_Team,
        Match_Venue,
        Date_and_Time,
        Seats,
        Main_Referee,
        Linesmen_1,
        Linesmen_2
    )
VALUES
    (
        'Al Ahly SC',
        'Zamalek SC',
        'Cairo International Stadium',
        '2023-01-01 18:00:00',
        '{"A1": true, "A2": false}',
        1,
        2,
        3
    );

-- Add the remaining matches with similar INSERT statements
-- Insert statements for Reservation table
-- Note: Adjust Match_Date_and_Time values based on the actual match date and time
INSERT INTO
    Reservation (
        User_Username,
        Match_Home_Team,
        Match_Date_and_Time,
        Seat_No,
        Credit_Card_Number,
        PIN_Number
    )
VALUES
    (
        'user1',
        'Al Ahly SC',
        '2023-01-01 18:00:00',
        1,
        '1234567890123456',
        1234
    );

-- Add the remaining reservations with similar INSERT statements