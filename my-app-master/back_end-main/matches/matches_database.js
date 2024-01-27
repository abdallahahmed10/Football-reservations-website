import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST, //using environment variables insted of hardcoding 
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()


//Testing DONE
export async function createMatch(home_team, away_team, match_venue, date_and_time, seats, vip_ticket_price, main_referee, linesmen_1, linesmen_2, home_team_logo_path, away_team_logo_path) {
    const [result] = await pool.query(`
    INSERT INTO matches (home_team, away_team, match_venue, date_and_time, seats, vip_ticket_price, main_referee, linesmen_1, linesmen_2,home_team_logo_path,away_team_logo_path)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [home_team, away_team, match_venue, date_and_time, seats, vip_ticket_price, main_referee, linesmen_1, linesmen_2, home_team_logo_path, away_team_logo_path]);
    //the return is an array where 1st element (which wes= set to result) is an object with many properties
    //one of dem is affected rows and another is the ID/primary key of row we added
    console.log(result);
    return result;
}

//Testing DONE
export async function getMatch(home_team, date) {
    // Date+Time Format: YYYY-MM-DD HH(24H-format):MM:SS
    //dayPart = DD
    //console.log(date);
    //console.log("TRYING TO GET MATCH")
    //console.log(home_team)
    //console.log(date_and_time)
    // Convert dayPart to an integer to remove leading zeros (since Day() function in MYSQL removes leading zeros)
    //const dayPartInt = parseInt(dayPart, 10);
    //console.log(dayPartInt);
    //In WHERE clause specify that date day value in date_and_time COLUMN/ATTRIBUTE be equal to day value that is passed to the function
    // const [rows] = await pool.query(`
    // SELECT * 
    // FROM matches
    // WHERE home_team = ? AND DATE(date_and_time) = ?
    // `, [home_team, date])
    const [rows] = await pool.query(`
         SELECT * 
         FROM matches
         WHERE (away_team = ? OR home_team = ? )AND DATE(date_and_time) = ?
      `, [home_team, home_team, date]);
    return rows[0];
}

//Testing DONE
export async function getMatchUnique(home_team, date) {
    // Date+Time Format: YYYY-MM-DD HH(24H-format):MM:SS
    //dayPart = DD
    //console.log(date);
    //console.log("TRYING TO GET MATCH")
    //console.log(home_team)
    //console.log(date_and_time)
    // Convert dayPart to an integer to remove leading zeros (since Day() function in MYSQL removes leading zeros)
    //const dayPartInt = parseInt(dayPart, 10);
    //console.log(dayPartInt);
    //In WHERE clause specify that date day value in date_and_time COLUMN/ATTRIBUTE be equal to day value that is passed to the function
    // const [rows] = await pool.query(`
    // SELECT * 
    // FROM matches
    // WHERE home_team = ? AND DATE(date_and_time) = ?
    // `, [home_team, date])
    const [rows] = await pool.query(`
         SELECT * 
         FROM matches
         WHERE home_team = ? AND DATE(date_and_time) = ?
      `, [home_team, date]);
    return rows[0];
}

export async function getMatchTime(home_team, date) {
    // Date+Time Format: YYYY-MM-DD HH(24H-format):MM:SS
    //dayPart = DD
    //console.log(date);
    //console.log("TRYING TO GET MATCH")
    //console.log(home_team)
    //console.log(date_and_time)
    // Convert dayPart to an integer to remove leading zeros (since Day() function in MYSQL removes leading zeros)
    //const dayPartInt = parseInt(dayPart, 10);
    //console.log(dayPartInt);
    //In WHERE clause specify that date day value in date_and_time COLUMN/ATTRIBUTE be equal to day value that is passed to the function
    const [rows] = await pool.query(`
    SELECT * 
    FROM matches
    WHERE home_team = ? AND date_and_time = ?
    `, [home_team, date])
    return rows[0];
}

//Testing DONE
export async function getMatchForAwayTeam(away_team, date) {
    // Date+Time Format: YYYY-MM-DD HH(24H-format):MM:SS
    //dayPart = DD

    // Convert dayPart to an integer to remove leading zeros (since Day() function in MYSQL removes leading zeros)
    //const dayPartInt = parseInt(dayPart, 10);
    //In WHERE clause specify that date day value in date_and_time COLUMN/ATTRIBUTE be equal to day value that is passed to the function
    // const [rows] = await pool.query(`
    // SELECT * 
    // FROM matches
    // WHERE away_team = ? AND DATE(date_and_time) = ?
    // `, [away_team, date])
    const [rows] = await pool.query(`
         SELECT * 
         FROM matches
         WHERE (away_team = ? OR home_team = ? ) AND DATE(date_and_time) = ?
      `, [away_team, away_team, date]);
    return rows[0];
}

// //Testing DONE
// export async function getMatchForStadium(match_venue, date) {
//     // Date+Time Format: YYYY-MM-DD HH(24H-format):MM:SS
//     //dayPart = DD

//     // Convert dayPart to an integer to remove leading zeros (since Day() function in MYSQL removes leading zeros)
//     //parseInt takes base of numeric system we're parsing to as a 2nd param
//     //const dayPartInt = parseInt(dayPart, 10);
//     //In WHERE clause specify that date day value in date_and_time COLUMN/ATTRIBUTE be equal to day value that is passed to the function
//     const [rows] = await pool.query(`
//     SELECT * 
//     FROM matches
//     WHERE match_venue = ? AND DATE(date_and_time) = ?
//     `, [match_venue, date])
//     return rows[0];
// }

//Testing DONE
export async function getMatchForStadium(match_venue, dateLowerEnd, dateUpperEnd) {
    // console.log(match_venue);
    // console.log(dateLowerEnd)
    // console.log(dateUpperEnd)
    const [rows] = await pool.query(`
        SELECT * 
        FROM matches
        WHERE match_venue = ? AND date_and_time BETWEEN ? AND ?
    `, [match_venue, dateLowerEnd, dateUpperEnd]);
    return rows;
}

//Testing DONE
export async function getMatchForStadiumNew(match_venue, date) {
    // console.log(match_venue);
    // console.log(dateLowerEnd)
    // console.log(dateUpperEnd)
    const [rows] = await pool.query(`
        SELECT * 
        FROM matches
        WHERE match_venue = ? AND DATE(date_and_time) = ?
    `, [match_venue, date]);
    return rows;
}

export async function getMatchForReferee(main_refereeid, date) {
    // Date+Time Format: YYYY-MM-DD HH(24H-format):MM:SS
    //dayPart = DD

    // Convert dayPart to an integer to remove leading zeros (since Day() function in MYSQL removes leading zeros)
    //const dayPartInt = parseInt(dayPart, 10);
    //In WHERE clause specify that date day value in date_and_time COLUMN/ATTRIBUTE be equal to day value that is passed to the function
    const [rows] = await pool.query(`
    SELECT * 
    FROM matches
    WHERE main_referee = ? AND DATE(date_and_time) = ?
    `, [main_refereeid, date])
    return rows[0];
}
//just to commit 

export async function getMatchForLinesmen1(linesmen_1id, date) {
    // Date+Time Format: YYYY-MM-DD HH(24H-format):MM:SS
    //dayPart = DD

    // Convert dayPart to an integer to remove leading zeros (since Day() function in MYSQL removes leading zeros)
    //const dayPartInt = parseInt(dayPart, 10);
    //In WHERE clause specify that date day value in date_and_time COLUMN/ATTRIBUTE be equal to day value that is passed to the function
    const [rows] = await pool.query(`
    SELECT * 
    FROM matches
    WHERE (linesmen_1 = ? OR linesmen_2 = ?) AND DATE(date_and_time) = ?
    `, [linesmen_1id, linesmen_1id, date])
    return rows[0];
}

export async function getMatchForLinesmen2(linesmen_2id, date) {
    // Date+Time Format: YYYY-MM-DD HH(24H-format):MM:SS
    //dayPart = DD

    // Convert dayPart to an integer to remove leading zeros (since Day() function in MYSQL removes leading zeros)
    //const dayPartInt = parseInt(dayPart, 10);
    //In WHERE clause specify that date day value in date_and_time COLUMN/ATTRIBUTE be equal to day value that is passed to the function
    // const [rows] = await pool.query(`
    // SELECT * 
    // FROM matches
    // WHERE linesmen_2 = ? AND DATE(date_and_time) = ?
    // `, [linesmen_2id, date])
    const [rows] = await pool.query(`
    SELECT * 
    FROM matches
    WHERE (linesmen_1 = ? OR linesmen_2 = ? )AND DATE(date_and_time) = ?
    `, [linesmen_2id, linesmen_2id, date])
    return rows[0];
}



//Input: If no pageNumber is provided, assumes user is requesting page 1
//      Note: Pages start from page 1 NOT page 0
//Testing DONE
export async function getUpcomingMatches(pageNumber) {
    let matches;
    if (typeof pageNumber === 'undefined') {
        //If no page number provided, just return first "page"
        const [rows] = await pool.query("SELECT * FROM matches WHERE date_and_time >= NOW() ORDER BY date_and_time LIMIT 20; ");
        matches = rows;
    }
    else {
        //I'm assuming each page will contain 20 matches 
        //Here I'll return the page specified in func param
        const offset = (pageNumber - 1) * 20;
        const [rows] = await pool.query("SELECT * FROM matches WHERE date_and_time >= NOW() ORDER BY date_and_time LIMIT 20 OFFSET ?;", [offset]);
        matches = rows;
    }
    //rn matches  is an array of 20 JSON each representing an SQL row from matches table
    return matches;
}

//Testing DONE
export async function updateMatch(home_team, away_team, match_venue, date_and_time, seats, vip_ticket_price, main_referee, linesmen_1, linesmen_2, home_team_logo_path, away_team_logo_path, old_home_team, old_date_and_time) {

    const [result] = await pool.query(`
        UPDATE matches
        SET 
            home_team = ?,
            away_team = ?,
            match_venue = ?,
            date_and_time = ?,
            seats = ?,
            vip_ticket_price = ?,
            main_referee = ?,
            linesmen_1 = ?,
            linesmen_2 = ?,
            home_team_logo_path = ?,
            away_team_logo_path = ?
        WHERE home_team = ? AND date_and_time = ?
    `, [home_team, away_team, match_venue, date_and_time, seats, vip_ticket_price, main_referee, linesmen_1, linesmen_2, home_team_logo_path, away_team_logo_path, old_home_team, old_date_and_time]);
    return result;
}


//Testing DONE
export async function updateSeats(home_team, date_and_time, seats) {

    const [result] = await pool.query(`
        UPDATE matches
        SET 
            seats = ?
        WHERE home_team = ? AND date_and_time = ?
    `, [seats, home_team, date_and_time]);
    return result;
}

//Testing DONE
export async function deleteMatch(home_team, date_and_time) {

    const [result] = await pool.query(`
        DELETE FROM matches
        WHERE home_team = ? AND date_and_time = ?
    `, [home_team, date_and_time]);

    return result;
}
