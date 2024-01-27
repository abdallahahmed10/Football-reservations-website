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
export async function createUser(username, password, first_name, last_name, birth_date, gender, city, address, email_address, fan) {
    const [result] = await pool.query(`
    INSERT INTO users (username, password, first_name, last_name, birth_date, gender, city, address, email_address,fan)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [username, password, first_name, last_name, birth_date, gender, city, address, email_address, fan])
    //the return is an array where 1st element (which we set to result) is an object with many properties
    //one of them is affected rows and another is the ID/primary key of row we added
    return result;
}

//Testing DONE
export async function getUsers() {
    const [rows] = await pool.query(`
    SELECT * 
    FROM users
    `)
    return rows
}

//Testing DONE
export async function getUser(username) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM users
    WHERE username = ?
    `, [username])
    return rows[0]
}

//Testing DONE
export async function getPendingUsers() {
    const [rows] = await pool.query(`
    SELECT * 
    FROM users
    WHERE approval IS NULL;
    `)
    return rows
}

//Testing DONE
export async function updateUser(username, password, first_name, last_name, birth_date, gender, city, address, fan) {
    const [result] = await pool.query(`
        UPDATE users
        SET 
            password = ?,
            first_name = ?,
            last_name = ?,
            birth_date = ?,
            gender = ?,
            city = ?,
            address = ?,
            fan = ?
        WHERE username = ?
    `, [password, first_name, last_name, birth_date, gender, city, address, fan, username]);
    return result;
}


//Testing DONE
export async function approveUser(username) {
    //Update the bool approval column to be true/1 in the row with username = username
    const [result] = await pool.query(`
        UPDATE users
        SET approval = 1
        WHERE username = ?
    `, [username]);
    return result;
}

//Testing DONE
export async function deleteUser(username) {
    const [result] = await pool.query(`
        DELETE FROM users
        WHERE username = ?
    `, [username]);
    return result;
}
