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
export async function createReservation(user_username, match_home_team, match_date_and_time, credit_card_number, pin_number, row_no, column_no) {

    const [result] = await pool.query(`
    INSERT INTO reservations (user_username, match_home_team, match_date_and_time, credit_card_number, pin_number, row_no, column_no)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [user_username, match_home_team, match_date_and_time, credit_card_number, pin_number, row_no, column_no]);
    //the return is an array where 1st element (which wes= set to result) is an object with many properties
    //one of dem is affected rows and another is the ID/primary key of row we added
    return result;
}

//Testing DONE
export async function getReservation(user_username, match_home_team, match_date_and_time) {

    const [rows] = await pool.query(`
    SELECT * 
    FROM reservations
    WHERE user_username = ? AND match_home_team = ? AND match_date_and_time = ?
    `, [user_username, match_home_team, match_date_and_time])
    return rows[0];
}

//TODO: Testing
export async function getReservationsForUser(user_username) {

    const [rows] = await pool.query(`
    SELECT * 
    FROM reservations
    WHERE user_username = ? AND match_date_and_time >= CURRENT_DATE 
    `, [user_username])
    // console.log("In DB");
    // console.log(rows);
    // console.log("OUT DB");
    return rows;
}

//TODO:Do I need to implement this function?
// export async function getReservationsId(First_Name, Middle_Name, Last_Name) {

//     const [rows] = await pool.query(`
//     SELECT id 
//     FROM reservationss
//     WHERE id = ? 
//     `, [reservationsid])
//     return rows[0];
// }

//Testing DONE
export async function getReservations() {

    const [rows] = await pool.query(`
    SELECT * 
    FROM reservations`)
    return rows;
}


//Testing DONE
export async function updateReservation(user_username, match_home_team, match_date_and_time, credit_card_number, pin_number, row_no, column_no) {

    //TODO: implement this function
    //TODO: Is it okay that I'm re-setting Primary Key value with update like so? P.S If it is bad don't forget to change it in the other files
    const [result] = await pool.query(`
        UPDATE reservations
        SET 
            credit_card_number = ?,
            pin_number = ?,
            row_no = ?,
            column_no = ?
        WHERE user_username = ? AND match_date_and_time = ? AND match_home_team = ?
    `, [credit_card_number, pin_number, row_no, column_no, user_username, match_date_and_time, match_home_team]);
    return result;
    //TODO: handle in controller if no rows were affected
}

//Testing DONE
export async function deleteReservation(user_username, match_home_team, match_date_and_time) {

    const [result] = await pool.query(`
        DELETE FROM reservations
        WHERE user_username = ? AND match_home_team= ? AND match_date_and_time = ?
    `, [user_username, match_home_team, match_date_and_time]);
    return result;
}