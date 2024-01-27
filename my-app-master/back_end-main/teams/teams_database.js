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
export async function createTeam(team_name, team_logo_path) {

    const [result] = await pool.query(`
    INSERT INTO teams (team_name, team_logo_path)
    VALUES (?, ?)
    `, [team_name, team_logo_path]);
    //the return is an array where 1st element (which wes= set to result) is an object with many properties
    //one of dem is affected rows and another is the ID/primary key of row we added
    return result;
}

//Testing DONE
export async function getTeam(team_name) {

    const [rows] = await pool.query(`
    SELECT * 
    FROM teams
    WHERE team_name = ? 
    `, [team_name])
    return rows[0];
}

//Testing DONE
export async function getTeams() {

    const [rows] = await pool.query(`
    SELECT * 
    FROM teams`)
    return rows;
}


//Testing DONE
export async function updateTeam(team_name, team_logo_path) {

    const [result] = await pool.query(`
        UPDATE teams
        SET 
            team_logo_path = ?
        WHERE team_name = ?
    `, [team_logo_path, team_name]);
    return result;
}

//Testing DONE
export async function deleteTeam(team_name) {

    const [result] = await pool.query(`
        DELETE FROM teams
        WHERE team_name = ?
    `, [team_name]);

    return result;
}