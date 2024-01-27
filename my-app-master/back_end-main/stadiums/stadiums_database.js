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
export async function createStadium(stadium_name, row_no, seats_per_row) {

    const [result] = await pool.query(`
    INSERT INTO stadiums (stadium_name, row_no, seats_per_row)
    VALUES (?, ?, ?)
    `, [stadium_name, row_no, seats_per_row]);
    return result;
}

//Testing DONE
export async function getStadium(stadium_name) {

    const [rows] = await pool.query(`
    SELECT * 
    FROM stadiums
    WHERE stadium_name = ? 
    `, [stadium_name])
    return rows[0];
}

//Testing DONE
export async function getStadiums() {

    const [rows] = await pool.query(`
    SELECT * 
    FROM stadiums`)
    return rows;
}


//Testing DONE
export async function updateStadium(stadium_name, row_no, seats_per_row) {

    const Seat_Arrangement = {};
    //TODO: implement this function
    //TODO: Is it okay that I'm re-setting Primary Key value with update like so? P.S If it is bad don't forget to change it in the other files
    const [result] = await pool.query(`
        UPDATE stadiums
        SET 
            row_no = ?,
            seats_per_row = ?
        WHERE stadium_name = ?
    `, [row_no, seats_per_row, stadium_name]);
    return result;
}

//Testing DONE
export async function deleteStadium(stadium_name) {

    const [result] = await pool.query(`
        DELETE FROM stadiums
        WHERE stadium_name = ?
    `, [stadium_name]);

    return result;
}
