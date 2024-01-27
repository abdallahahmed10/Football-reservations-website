import express from 'express';
//import { getMatch, updateSeats } from 'C:/Users/alykh/Downloads/Computer Consultation/Project/back_end/matches/matches_database.js';
import { createReservation, getReservations, getReservationsForUser, getReservation, updateReservation, deleteReservation } from "./reservations_database.js"
import { getMatch, updateSeats } from '../matches/matches_database.js';
import { getStadium } from "../stadiums/stadiums_database.js"
const router = express();
router.use(express.json());


//Testing DONE
//TODO: Testing
//func: createReservations 
//Method: POST 
//Route: http://localhost:8080/v1/reservations
//Input From Front-end: reservations object to create in request body. Row_No and Column_No are zero indexed
//Output To Front-end If success: Status code 201, The created reservations
//Output T Front-end If fail: Status code 400 with error message clarifying a duplicate reservations exists or another problem prevented reservations from being created 
router.post("/", async (req, res) => {
    //Reminder: role = 0 --> referee role = 1 --> linesmen 
    const { user_username, match_home_team, match_date_and_time, credit_card_number, pin_number, row_no, column_no } = req.body;




    //converting given string from UTC to local time zone then converting string to MYSQL datetime format
    const match_date_and_time_as_obj = new Date(match_date_and_time);
    match_date_and_time_as_obj.setHours(match_date_and_time_as_obj.getHours() + 2);
    
    let timezoneOffset = match_date_and_time_as_obj.getTimezoneOffset()
    if (timezoneOffset < -120) {
        match_date_and_time_as_obj.setHours(match_date_and_time_as_obj.getHours() + 1);
    }
    console.log(match_date_and_time_as_obj);
    const match_date_and_time_as_string = match_date_and_time_as_obj.toISOString();
    let match_date_and_time_as_string_modified = match_date_and_time_as_string.slice(0, 10) + ' ' + match_date_and_time_as_string.slice(11, 19);

    // console.log(`corrected date is ${match_date_and_time_as_string_modified}`);
let result;

    // let result = await getReservation(user_username, match_home_team, match_date_and_time_as_string_modified);
    // console.log(`result is ${result}`);
    // console.log(`username is ${user_username}`);
    // console.log(`home team is ${match_home_team}`);
    // console.log(`date and time is ${match_date_and_time} `);

    // if (result) {
    //     res.status(400).send(`A reservation already exists for user: ${user_username} for ${match_home_team} at ${match_date_and_time}`);
    //     return;
    // }


    // Extracting only the date part from Date_and_Time
    let datePart = match_date_and_time.substring(0, 10);
    //retrieving match to retrieve currently reserved seats
    const match = await getMatch(match_home_team, datePart);
    let seats = match.seats;
    const stadium = await getStadium(match.match_venue);
    // console.log(`stadium is ${stadium}`);
    if (row_no >= stadium.row_no) {
        res.status(400).send(`Invalid row no. ${stadium.stadium_name} has ${stadium.row_no} rows`);
        return;
    }
    else if (column_no >= stadium.seats_per_row) {
        res.status(400).send(`Invalid column no. ${stadium.stadium_name} has ${stadium.seats_per_row} rows`);
        return;
    }

    // Check if the seat is already reserved
    if (seats.reservations[row_no][column_no] === 1) {
        res.status(400).send(`Seat at Row ${row_no} and Column ${column_no} is already reserved.`);
        return;
    }

    // Update the seat to reserved (set it to 1)
    seats.reservations[row_no][column_no] = 1;
    // console.log(seats);
    result = await updateSeats(match_home_team, match_date_and_time_as_string_modified, JSON.stringify(seats));

    if (result.affectedRows > 0) {
        // If affectedRows is greater than 0, the update was successful
    } else {
        // If affectedRows is 0, it means no rows were updated macth wasnt found
        res.status(400).send("Match seats were not updated successfully");
        return;
    }

    //TODO: replace this with web socket

    result = await createReservation(user_username, match_home_team, match_date_and_time_as_string_modified, credit_card_number, pin_number, row_no, column_no);
    if (result.affectedRows > 0) {

        //IMPORTNAT: Unfortunately insert doesnt return the created object
        //so its standard to use primary key returned by INSERT call to query the object we just added and then return it
        const reservation = await getReservation(user_username, match_home_team, match_date_and_time_as_string_modified);
        if (!reservation) {
            res.status(500).send("Incorrect reservation was inserted");
            return;
        }
        res.status(200).send(reservation);
        return;
    }
    else {
        res.status(400).send("Reservation was not created sucessfully")
        return;
    }
})

//Testing DONE
//TODO: comments
//TODO: Adjust routing
//TODO: Adjust response code
//func: getALLReservations 
//Method: GET 
//Route: http://localhost:8080/v1/reservations
//Input From Front-end: nothing
//Output To Front-end If success: Status code 201, ALL reservations in the database
//Output T Front-end If fail: TODO:
router.get("/", async (req, res) => {
    const reservations = await getReservations();
    res.status(200).send(reservations)
})


//Testing DONE
//TODO: Testing
//func: Get ALL upcoming reservations for a specific user
//Method: GET 
//Route: http://localhost:8080/v1/reservations/:user_username
//Input From Front-end: User's username as rout parameter
//Output To Front-end If success: Status code 201, ALL upcoming reservations by user in the database
//Output T Front-end If fail: TODO:
router.get("/:user_username", async (req, res) => {
    const user_username = req.params.user_username;
    const reservations = await getReservationsForUser(user_username);
    res.status(200).send(reservations)
})

//TODO: TESTING,comments
//func: getReservation
//Method: GET   
//Route: http://localhost:8080/v1/reservations/:User_Username/:Match_Home_Team/:Match_Date_and_Time
//Input From Front-end: User_Username, Match_Home_Team, Match_Date_and_Time_name as route parameters. 
//Output To Front-end If success: Status code 201, the reservation by specified user for specified match
//Output To Front-end If fail: Status code 404 with error message clarifying reservations wasnt found
router.get("/:user_username/:match_home_team/:match_date_and_time", async (req, res) => {
    const user_username = req.params.user_username;
    const match_home_team = req.params.match_home_team;
    const match_date_and_time = req.params.match_date_and_time;
    const match_date_and_time_as_obj = new Date(match_date_and_time);
    match_date_and_time_as_obj.setHours(match_date_and_time_as_obj.getHours() + 2);
    let timezoneOffset = match_date_and_time_as_obj.getTimezoneOffset()
    if (timezoneOffset < -120) {
        match_date_and_time_as_obj.setHours(match_date_and_time_as_obj.getHours() + 1);
    }
    // console.log(match_date_and_time_as_obj);
    const match_date_and_time_as_string = match_date_and_time_as_obj.toISOString();
    let match_date_and_time_as_string_modified = match_date_and_time_as_string.slice(0, 10) + ' ' + match_date_and_time_as_string.slice(11, 19);


    // // given date
    // let givenDate = match_date_and_time_as_obj; // UTC time;

    // Get the time zone offset in minutes for the given date
    //let timezoneOffset = temporaryDate.getTimezoneOffset();
    console.log(timezoneOffset);
    // Check if daylight saving time is in effect
    let isDstInEffect = timezoneOffset < -120; //normal offset is -120, daylight offset is -180

    if (isDstInEffect) {
        console.log("Daylight saving time is in effect for the given date.");
    } else {
        console.log("Daylight saving time is not in effect for the given date.");
    }



    const reservation = await getReservation(user_username, match_home_team, match_date_and_time_as_string_modified);
    if (!reservation) {
        res.status(404).send("Reservation not found");
        return;
    }
    res.status(200).send(reservation)
})





//Testing DONE
//TODO: comments
//func: updateReservation
//Method: PUT 
//Route: http://localhost:8080/v1/reservations
//Input From Front-end: A reservations object containg ALL values (modifed and un-modified) of a reservations object
//NOTE: cannot change user_username,match_home_team or match_date_and_timeor row_no or column_no
//Output To Front-end If success: Status code 200, The new modified reservations
//Output To Front-end If fail: Status code 404 if reservations doesnt exist. Status code 400 if reservations wasnt updated or role value was invalid
router.put("/", async (req, res) => {
    const { user_username, match_home_team, match_date_and_time, credit_card_number, pin_number, row_no, column_no } = req.body;
    //converting given string from UTC to local time zone then converting string to MYSQL datetime format
    const match_date_and_time_as_obj = new Date(match_date_and_time);
    match_date_and_time_as_obj.setHours(match_date_and_time_as_obj.getHours() + 2);
    // console.log(match_date_and_time_as_obj);
    const match_date_and_time_as_string = match_date_and_time_as_obj.toISOString();
    let match_date_and_time_as_string_modified = match_date_and_time_as_string.slice(0, 10) + ' ' + match_date_and_time_as_string.slice(11, 19);

    let reservation = await getReservation(user_username, match_home_team, match_date_and_time_as_string_modified);
    if (!reservation) {
        res.status(404).send("Reservation doesn't exist");
        return;
    }
    //TODO: how deep can I update a reservation? This only handles if I'm updating the seat number, if I wanna update the reservation to a different match this wont work, or if I wanna update a reservation to a different user this wont work

    // Extracting only the date part from Date_and_Time
    let datePart = match_date_and_time.substring(0, 10);
    //retrieving match to retrieve currently reserved seats
    const match = await getMatch(match_home_team, datePart);
    // let seats = match.seats;

    // const stadium = await getStadium(match.match_venue);
    // if (row_no >= stadium.row_no) {
    //     res.status(400).send(`Invalid row no. ${stadium.stadium_name} has ${stadium.row_no} rows`);
    //     return;
    // }
    // else if (column_no >= stadium.seats_per_row) {
    //     res.status(400).send(`Invalid column no. ${stadium.stadium_name} has ${stadium.seats_per_row} rows`);
    //     return;
    // }

    // // Check if the seat is already reserved
    // if (seats.reservations[row_no][column_no] === 1) {
    //     res.status(400).send(`Seat at Row ${row_no} and Column ${column_no} is already reserved.`);
    //     return;
    // }

    // // Update the seat to reserved (set it to 1)
    // seats.reservations[row_no][column_no] = 1;
    // result = await updateSeats(match_home_team, match_date_and_time_as_string_modified, JSON.stringify(seats));

    // if (result.affectedRows > 0) {
    //     // If affectedRows is greater than 0, the update was successful
    // } else {
    //     // If affectedRows is 0, it means no rows were updated macth wasnt found
    //     res.status(400).send("Match seats were not updated successfully");
    //     return;
    // }

    //TODO: replace this with web socket

    const result = await updateReservation(user_username, match_home_team, match_date_and_time_as_string_modified, credit_card_number, pin_number, row_no, column_no);
    // Check the affected rows to determine if the update was successful
    if (result.affectedRows > 0) {
        // If affectedRows is greater than 0, the update was successful
        //returning updated object
        reservation = await getReservation(user_username, match_home_team, match_date_and_time_as_string_modified);
        res.status(200).send(reservation);
        return;

    } else {
        // If affectedRows is 0, it means no rows were updated (user not found)
        res.status(400).send("Reservation wasn't updated");
        return;
    }

})


//TODO: Testing,comments
//TODO: error codes
//func: deleteReservations 
//Method: DELETE 
//Route: http://localhost:8080/v1/reservations/:user_username/:match_home_team/:match_date_and_time
//Input From Front-end: User_Username, Match_Home_Team, Match_Date_and_Time_name as route parameters. 
//Output To Front-end If success: reservations object containing deleted reservation with status code 200
//Output To Front-end If fail: Status code 404 if reservations doesnt exist. Status code 400 if reservations wasnt deleted
router.delete("/:user_username/:match_home_team/:match_date_and_time", async (req, res) => {
    const user_username = req.params.user_username;
    const match_home_team = req.params.match_home_team;
    const match_date_and_time = req.params.match_date_and_time;

    //converting given string from UTC to local time zone then converting string to MYSQL datetime format
    const match_date_and_time_as_obj = new Date(match_date_and_time);
    match_date_and_time_as_obj.setHours(match_date_and_time_as_obj.getHours() + 2);
    let timezoneOffset = match_date_and_time_as_obj.getTimezoneOffset()
    if (timezoneOffset < -120) {
        match_date_and_time_as_obj.setHours(match_date_and_time_as_obj.getHours() + 1);
    }
    //console.log(match_date_and_time_as_obj);
    const match_date_and_time_as_string = match_date_and_time_as_obj.toISOString();
    let match_date_and_time_as_string_modified = match_date_and_time_as_string.slice(0, 10) + ' ' + match_date_and_time_as_string.slice(11, 19);
    console.log("hi");
    console.log(match_date_and_time_as_string_modified);
    const reservation = await getReservation(user_username, match_home_team, match_date_and_time_as_string_modified);
    if (!reservation) {
        res.status(404).send("Reservation doesn't exist");
        return;
    }
    let datePart = match_date_and_time.substring(0, 10);
    const match = await getMatch(match_home_team, datePart);
    // console.log(match_home_team);
    // console.log(datePart);
    // console.log()
    let seats = match.seats;
    if (!match) {
        res.status(400);
        return;
    }

    //TODO: Does the following line make sense? Where I treat the "reservations" variable as an object and its properties are the table attributes
    let result = await deleteReservation(user_username, match_home_team, match_date_and_time_as_string_modified);
    // Check the affected rows to determine if the delete was successful
    if (result.affectedRows > 0) {
        // If affectedRows is greater than 0, the delete was successful
        // Extracting only the date part from Date_and_Time
        seats.reservations[reservation.row_no][reservation.column_no] = 0;
        result = await updateSeats(match_home_team, match_date_and_time_as_string_modified, JSON.stringify(seats))
        if (result.affectedRows > 0) {
            res.status(200).send(reservation);
            return;

        }
        else {
            res.status(500).send({ error: "reservation deleted but seats werent updated" });
        }

    } else {
        // If affectedRows is 0, it means no rows were deleted
        //TODO:error codes
        res.status(400).send("Reservation was not deleted successfully")
        return;
    }
})









//exporting router object containing all user routes
const reservationsRouter = router;
export default reservationsRouter;