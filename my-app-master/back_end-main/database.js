import mysql from 'mysql2'

import dotenv from 'dotenv'
import { createMatch, deleteMatch, getMatch, getMatchTime, getMatchForAwayTeam, getMatchForStadium, getUpcomingMatches, updateMatch, updateSeats } from "./matches/matches_database.js"
import { createStadium, deleteStadium, getStadium, getStadiums, updateStadium } from "./stadiums/stadiums_database.js"
import { createPerson, deletePerson, getLinesmen, getPerson, getPersonWithId, getPersons, getReferees, updatePerson } from "./persons/persons_database.js"
import { approveUser, createUser, getUsers, deleteUser, updateUser } from "./users/users_database.js"
import { createTeam, deleteTeam, getTeam, getTeams, updateTeam } from "./teams/teams_database.js"
import { createReservation, getReservation, getReservations, getReservationsForUser, updateReservation, deleteReservation } from "./reservations/reservations_database.js"
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST, //using environment variables insted of hardcoding 
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

//TESTBENCH BEGIN
let result = await pool.query("SELECT @@global.time_zone;");
//console.log(result);
// result = await getMatchForAwayTeam("Al Ahly SC", "2023-02-01 18:00:00");
// result = await getMatchForAwayTeam("El Zamalek SC", "2023-02-01");
// console.log(result);
// result = await getMatchForAwayTeam("Al Ahly SC", "2023-02-01");
// console.log(result);
//2024-03-10 19:45:00
// result = await getMatchForStadium("Cairo International Stadium test", "2024-03-10 10:45:00", "2024-03-10 22:45:00");
// console.log(result)
// console.log(result.length);

// result = await getUsers();
// console.log(result);

// // result = await createTeam("test team", "testpath");
// result = await updateTeam("test team", "updated test path");
// console.log(result)
// result = await getTeam("test team");
// console.log(result);
// result = await deleteTeam("test team");
// console.log(result)
// result = await getTeam("test team");
// console.log(result)

// result = await createStadium("test stadium 3", 7, 7);
// console.log(result);
// result = await getStadium("test stadium 3");
// console.log(result);
// console.log("BREAAAAAAAAAAAAAAK");
// result = await getStadiums();
// console.log(result)
// result = await deleteStadium("test stadium 3")
// console.log(result);
// result = await updateStadium("test stadium", 6, 6);
// console.log(result)

// result = await createReservation('user1', 'Al Ahly SC', '2024-07-10 20:45:00', '1234567890123456', '1234', '0', '0');
// console.log(result);
// result = await getReservation("user1", "Al Ahly SC", '2024-07-10 20:45:00');
// console.log(result);
// console.log("BREAAAAAAAAAAAAAAAAK")
// result = await getReservationsForUser("user1");
// console.log(result)
// console.log("BREAAAAAAAAAAAAAAAK")
// result = await getReservations();
// console.log(result);
// result = await updateReservation('user1', 'Al Ahly SC', '2024-06-10 20:45:00', '1234567892345777', '1234', '0', '0')
// console.log(result);
// result = await getReservation('user1', 'Al Ahly SC', '2024-06-10 20:45:00');
// console.log(result);
// result = await deleteReservation('user1', 'Al Ahly SC', '2024-07-10 20:45:00');
// console.log(result);






//result = await getMatchForStadium("30 June Stadium", "2022-02-10 19:43:00", "2024-03-10 19:45:00")
//console.log(result);
//result = await createUser("testuser2", "testpass", "testfirdt", "testlast", "1992-11-09 22:00:00.000", 0, "testvoty", "testaddy", "who@why")
//result = await updateUser("testuser", "testpass", "testfirdt", "testlast", "1992-11-09 22:00:00.000", 0, "testvoty", "testaddy2", "who@why");
//result = await approveUser("testuser");
//console.log(result);
//result = await getPendingUsers();
//console.log(result);
// result = await getPendingUsers();
//result = await createMatch("Al Ahly SC", "El Zamalek SC", "Cairo International Stadium test", "2025-12-27 2:00:00", JSON.stringify({ "A1": true, "A2": false }), 300.00, 800.00, 1, 2, 3);
//console.log(result);
//result = await getMatch("Al Ahly SC", "2025-12-27");
//console.log(result);
//result = await deleteMatch("Al Ahly SC", "2025-12-27 2:00:00")
//console.log(result);
// result = await getMatchTime("Al Masry SC", "2024-09-22 19:45:00");
// console.log(result);
//result = await getMatchForAwayTeam("El Zamalek SC", "2023-01-01")
//result = await getMatchForStadium("Cairo International Stadium", "2023-01-01")
// result = await updateMatch("Al Ahly SC", "El Zamalek SC", "Cairo International Stadium", "2028-02-01 18:00:00", JSON.stringify({ "A1": true, "A2": false }), 800.00, 1, 2, 3, "test path", "test path2 ", "Al Ahly SC", "2024-03-10 20:45:00");
// console.log(result);
// console.log("Databaaaasse");
// result = await getUpcomingMatches();
// console.log(result);
//result = await createStadium("test-stadium", 5, 3);
// result = await createPerson("ali", "mohamed", "mahmoud", 0);
// result = await deletePerson(21);
// console.log(result)
//result = await updatePerson("Robert", "Fitzgerald", "Diggs", 0, 11)
//console.log(result)
//result = await getPersonWithId(11);
//console.log(result)
//result = await updatePerson("Robert", "Fitzgerald", "Diggs", 1, 11)
//result = await getPersonWithId(11);


//console.log(result)
//Al Ahly SC, El Zamalek SC, Cairo International Stadium, 2023-01-01 18:00:00, {"A1": true, "A2": false}, 300.00, 800.00, 1, 2, 3

//console.log(result);
//console.log("testing nodemon");


//TESTBENCH END


//Input: If no pageNumber is provided, assumes user is requesting page 1.
//      Note: Pages start from page 1 NOT page 0
// async function getUpcomingMatches(pageNumber) {
//     if (typeof pageNumber === 'undefined') {
//         //If no page number provided, just return first "page"
//         const [rows] = await pool.query("SELECT * FROM matches WHERE Date_and_Time >= CURRENT_DATE ORDER BY Date_and_Time LIMIT 20; ");
//         const matches = rows;
//         return matches;
//     }
//     else {
//         //I'm assuming each page will contain 20 matches 
//         //Here I'll return the page specified in func param
//         const offset = (pageNumber - 1) * 20;
//         const [rows] = await pool.query("SELECT * FROM matches WHERE Date_and_Time >= CURRENT_DATE ORDER BY Date_and_Time LIMIT 20 OFFSET ?;", [offset]);
//         const matches = rows;
//         return matches;
//     }
//     //rn matches  is an array of 20 JSON each representing an SQL row from matches table

// }

async function getUser(username) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM users
    WHERE username = ?
    `, [username])
    return rows[0]
}

async function getPendingUsers() {
    const [rows] = await pool.query(`
    SELECT * 
    FROM users
    WHERE Approval IS NULL;
    `)
    return rows

}

export async function getAllnotes() {
    const [rows] = await pool.query("select * from notes") //returns array of arrays wjere first array is an array of records
    return rows
}

// const notes = await getAllnotes()
// console.log(notes)

export async function getNote(id) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM notes
    WHERE id = ?
    `, [id]) //instead of passing id inside SQL statement, we pass it as a seperate parameter to prevent SQL injections
    //this method of passing values is called prepared statmenet 
    return rows[0] //here rows is an array of records bas of length = 1 since we're only selecting one row
    //so instead of returning an array with 1 element, we'll just return that element instead
}

// const note = await getNote(3)
// console.log(note)

export async function createNote(title, contents) {

    const [result] = await pool.query(`
    INSERT INTO notes (title, contents)
    VALUES (?, ?)
    `, [title, contents])
    //the return is an array where 1st element (which wes= set to result) is an object with many properties
    //one of dem is affected rows and another is the ID/primary key of row we added
    const id = result.insertId
    //IMPORTNAT: Unfortunately insert doesnt return the created object
    //so iss standard to use primary key returned by INSERT call to query the object we just added and then return it
    return getNote(id)
}