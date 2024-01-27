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
export async function createPerson(first_name, middle_name, last_name, role) {

    const [result] = await pool.query(`
    INSERT INTO persons (first_name, middle_name, last_name, role)
    VALUES (?, ?, ?, ?)
    `, [first_name, middle_name, last_name, role]);
    //the return is an array where 1st element (which wes= set to result) is an object with many properties
    //one of dem is affected rows and another is the ID/primary key of row we added
    return result;
}

//Testing DONE
export async function getPerson(first_name, middle_name, last_name) {

    const [rows] = await pool.query(`
    SELECT * 
    FROM persons
    WHERE first_name = ? AND middle_name = ? AND last_name = ?
    `, [first_name, middle_name, last_name])
    return rows[0];
}


//Testing DONE
export async function getPersonWithId(personid) {

    const [rows] = await pool.query(`
    SELECT * 
    FROM persons
    WHERE id = ? 
    `, [personid])
    return rows[0];
}

//TODO:Do I need to implement this function?
// export async function getPersonId(First_Name, Middle_Name, Last_Name) {

//     const [rows] = await pool.query(`
//     SELECT id 
//     FROM persons
//     WHERE id = ? 
//     `, [personid])
//     return rows[0];
// }

//Testing DONE
export async function getPersons() {

    const [rows] = await pool.query(`
    SELECT * 
    FROM persons`)
    return rows;
}

//Testing DONE
export async function getReferees() {

    const [rows] = await pool.query(`
    SELECT * 
    FROM persons
    WHERE role = 0`)
    return rows;
}

//Testing DONE
export async function getLinesmen() {

    const [rows] = await pool.query(`
    SELECT * 
    FROM persons
    WHERE role = 1`)
    return rows;
}


//Testing DONE
export async function updatePerson(first_name, middle_name, last_name, role, personId) {

    //TODO: implement this function
    //TODO: Is it okay that I'm re-setting Primary Key value with update like so? P.S If it is bad don't forget to change it in the other files
    const [result] = await pool.query(`
        UPDATE persons
        SET 
            first_name = ?,
            middle_name = ?,
            last_name = ?,
            role = ?
        WHERE id = ?
    `, [first_name, middle_name, last_name, role, personId]);
    return result;
}

//Testing DONE
export async function deletePerson(personId) {

    const [result] = await pool.query(`
        DELETE FROM persons
        WHERE id = ?
    `, [personId]);

    return result;

}