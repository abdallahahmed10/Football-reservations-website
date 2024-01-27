import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST, //using environment variables insted of hardcoding 
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()


//TODO: Testing
export async function createResource(Resource_Attributes) {

    const [result] = await pool.query(`
    INSERT INTO resources (Resource_Attributes)
    VALUES (?, ?, ?)
    `, [Resource_Attributes]);
    //the return is an array where 1st element (which wes= set to result) is an object with many properties
    //one of dem is affected rows and another is the ID/primary key of row we added
    return result;
    //Rest of code will be implemented by controller
    const id = result.insertId
    //IMPORTNAT: Unfortunately insert doesnt return the created object
    //so iss standard to use primary key returned by INSERT call to query the object we just added and then return it
    return getNote(id)
}

//TODO: Testing
export async function getResource(Resource_Id) {

    const [rows] = await pool.query(`
    SELECT * 
    FROM resources
    WHERE Resource_Id = ? 
    `, [Resource_Id])
    return rows[0];
}

export async function getResources() {

    const [rows] = await pool.query(`
    SELECT * 
    FROM resources`)
    return rows;
}


//TODO: Testing
export async function updateResource(Resource_Attributes) {

    //TODO: implement this function
    //TODO: Is it okay that I'm re-setting Primary Key value with update like so? P.S If it is bad don't forget to change it in the other files
    const [result] = await pool.query(`
        UPDATE resources
        SET 
            Seat_Arrangement = ?,
            Resource_Id = ?,
            Resource_Size = ?
        WHERE Resource_Id = ?
    `, [Resource_Attributes]);
    return result;
    //TODO: handle in controller if no rows were affected

    // Check the affected rows to determine if the update was successful
    if (result.affectedRows > 0) {
        // If affectedRows is greater than 0, the update was successful
        //returning updated object
        return getUser(username);
    } else {
        // If affectedRows is 0, it means no rows were updated (user not found)
        return null;
    }
}

//TODO: Testing
export async function deleteResource(Resource_Id) {

    const [result] = await pool.query(`
        DELETE FROM resources
        WHERE Resource_Id = ?
    `, [Resource_Id]);

    return result;
    //TODO: handle in controller if no rows were affected
}

