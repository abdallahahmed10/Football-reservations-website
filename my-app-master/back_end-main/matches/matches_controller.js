import express from 'express';
const router = express();


router.use(express.json());
import { createMatch, getMatch, getMatchForAwayTeam, getMatchForStadium, getUpcomingMatches, updateMatch, deleteMatch, getMatchForReferee, getMatchForLinesmen1, getMatchForLinesmen2, getMatchUnique, getMatchForStadiumNew } from "./matches_database.js"
import { getPerson } from "../persons/persons_database.js"
import { getStadium } from '../stadiums/stadiums_database.js';
import { getTeam } from "../teams/teams_database.js"
//import { getPerson } from "C:/Users/alykh/Downloads/Computer Consultation/Project/back_end/persons/persons_database.js"
//import { getStadium } from "C:/Users/alykh/Downloads/Computer Consultation/Project/back_end/stadiums/stadiums_database.js"


//Testing DONE
function create2DArray(rows, valuesPerRow) {
    // Initialize an empty 2D array
    let twoDArray = [];

    // Create the 2D array with "0" in each element
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < valuesPerRow; j++) {
            // Set each element to "0"
            row.push(0);
        }
        twoDArray.push(row);
    }

    // Create a JSON object with the 2D array
    let jsonObject = { reservations: twoDArray };

    return jsonObject;
}


//Testing DONE
//func: createMatch 
//Method: POST 
//Route: http://localhost:8080/v1/matches
//Input From Front-end: Match object to create in request body. 
// match object = {home_team, away_team, match_venue, date_and_time, vip_ticket_price, main_referee_first_name, main_referee_middle_name, main_referee_last_name, linesmen_1_first_name, linesmen_1_middle_name, linesmen_1_last_name, linesmen_2_first_name, linesmen_2_middle_name, linesmen_2_last_name }
//NOTE: Date_and_Time Format: YYYY-MM-DDTHH(24H-format):MM:SS.sssZ 
//NOTE2: Must provide names for the referee/linesmen in the following order "First_Name","Middle_Name","Last_Name"
//Example of Datetime 2024-03-10T18:45:00.000Z
//202: referee has match on same day 
//203: linesmen1 has match on same day
//204: linesmen2 has match on same day
//205: home_team has match on same day
//206: away_team has match on same day
//207: stadium used within 3 +/- hours
//Output To Front-end If success: The created match with status code 201
//Output To Front-end If fail: Status code 400 with error message clarifying a duplicate match exists or another problem prevented match from being created. If an incorrect match is created returns status code 500
router.post("/", async (req, res) => {
    const { home_team, away_team, match_venue, date_and_time, vip_ticket_price, main_referee_first_name, main_referee_middle_name, main_referee_last_name, linesmen_1_first_name, linesmen_1_middle_name, linesmen_1_last_name, linesmen_2_first_name, linesmen_2_middle_name, linesmen_2_last_name } = req.body;
    //TODO: if we end up using drop down list , remove these validations


    //getting ID of referee and linesmen, validating role of each on
    const main_referee_row = await getPerson(main_referee_first_name, main_referee_middle_name, main_referee_last_name);
    const linesmen_1_row = await getPerson(linesmen_1_first_name, linesmen_1_middle_name, linesmen_1_last_name);
    const linesmen_2_row = await getPerson(linesmen_2_first_name, linesmen_2_middle_name, linesmen_2_last_name);

    //console.log("BRESAAAAAAAAAAAAAAK")
    //console.log(main_referee_row);
    //console.log(linesmen_1_row);
    //console.log(linesmen_2_row);

    const main_referee = main_referee_row.id;
    const linesmen_1 = linesmen_1_row.id;
    const linesmen_2 = linesmen_2_row.id;
    //NOTE: I'm assuming the client will query list of valid referees/linesmen before selecting one so input must be valid kda kda
    // //TODO: Check accessing row attributes like so is valid 
    // if (!(Main_Referee_Row.role == 0)) {
    //     res.status(400).send(`Please enter name `);
    //     return;
    // }
    // Extracting only the date part from Date_and_Time
    let datePart = date_and_time.substring(0, 10);

    //validating referee doesnt have another match on the same day
    let result = await getMatchForReferee(main_referee, datePart)
    if (result) {
        // res.status(400).send({ error: `A match already exists for referee ${main_referee_first_name} ${main_referee_middle_name} ${main_referee_last_name} on day ${datePart}` });
        res.status(202).send({ error: `A match already exists for referee ${main_referee_first_name} ${main_referee_middle_name} ${main_referee_last_name} on day ${datePart}` });
        return;
    }

    //validating linesmen1 doesnt have another match on the same day
    result = await getMatchForLinesmen1(linesmen_1, datePart)
    if (result) {
        // res.status(400).send({ error: `A match already exists for linesmen ${linesmen_1_first_name} ${linesmen_1_middle_name} ${linesmen_1_last_name} on day ${datePart}` });
        res.status(203).send({ error: `A match already exists for linesmen ${linesmen_1_first_name} ${linesmen_1_middle_name} ${linesmen_1_last_name} on day ${datePart}` });
        return;

    }


    //validating linesmen2 doesnt have another match on the same day
    result = await getMatchForLinesmen2(linesmen_2, datePart)
    if (result) {
        // res.status(400).send({ error: `A match already exists for linesmen ${linesmen_2_first_name} ${linesmen_2_middle_name} ${linesmen_2_last_name} on day ${datePart}` });
        res.status(204).send({ error: `A match already exists for linesmen ${linesmen_2_first_name} ${linesmen_2_middle_name} ${linesmen_2_last_name} on day ${datePart}` });
        return;

    }

    //validating Home_Team doesn't have another match on the same day
    result = await getMatch(home_team, datePart);
    console.log(result);
    if (result) {
        console.log(result);
        // res.status(400).send({ error: `A match already exists for team ${home_team} on day ${datePart}` });
        res.status(205).send({ error: `A match already exists for team ${home_team} on day ${datePart}` });
        return;
    }

    //validating Away_Team doesn't have another match on the same day
    result = await getMatchForAwayTeam(away_team, datePart);
    if (result) {
        // res.status(400).send({ error: `A match already exists for team ${away_team} on day ${datePart}` });
        res.status(206).send({ error: `A match already exists for team ${away_team} on day ${datePart}` });
        return;
    }
    //converting given string from UTC to local time zone then converting string to MYSQL datetime format
    const time_zone_date_and_time = new Date(date_and_time);
    time_zone_date_and_time.setHours(time_zone_date_and_time.getHours() + 2);
    let timezoneOffset = time_zone_date_and_time.getTimezoneOffset()
    if (timezoneOffset < -120) {
        time_zone_date_and_time.setHours(time_zone_date_and_time.getHours() + 1);
    }
    const time_zone_date_and_time_as_string = time_zone_date_and_time.toISOString();
    let modifiedString = time_zone_date_and_time_as_string.slice(0, 10) + ' ' + time_zone_date_and_time_as_string.slice(11, 19);

    const time_zone_date_and_time_lower_end = new Date(time_zone_date_and_time);
    //console.log(time_zone_date_and_time_lower_end)
    time_zone_date_and_time_lower_end.setHours(time_zone_date_and_time.getHours() - 3)
    const time_zone_date_and_time_upper_end = new Date(time_zone_date_and_time);
    time_zone_date_and_time_upper_end.setHours(time_zone_date_and_time.getHours() + 3);
    const time_zone_date_and_time_as_string_lower = time_zone_date_and_time_lower_end.toISOString();
    const time_zone_date_and_time_as_string_upper = time_zone_date_and_time_upper_end.toISOString();
    // console.log(time_zone_date_and_time_lower_end);
    // console.log(time_zone_date_and_time);
    // console.log(time_zone_date_and_time_upper_end);
    let modifiedString_lower = time_zone_date_and_time_as_string_lower.slice(0, 10) + ' ' + time_zone_date_and_time_as_string_lower.slice(11, 19);
    let modifiedString_upper = time_zone_date_and_time_as_string_upper.slice(0, 10) + ' ' + time_zone_date_and_time_as_string_upper.slice(11, 19);

    result = await getMatchForStadiumNew(match_venue, datePart);

    if (result.length > 0) {
        console.log(result);
        console.log(result.length);
        // res.status(400).send({ error: `A match already exists in ${match_venue} 3 hours +/- ${date_and_time}` });
        res.status(207).send({ error: `A match already exists in ${match_venue} 3 hours +/- ${date_and_time}` });
        return;
    }

    // result = 

    //TODO: change column names hena
    //console.log("BRESAAAAAAAAAAAAAAK")
    //console.log(match_venue);
    const stadium = await getStadium(match_venue);
    //console.log(stadium);
    const row_no = stadium.row_no;
    const seats_per_row = stadium.seats_per_row;
    const seats = create2DArray(row_no, seats_per_row);
    //console.log(seats);

    //Getting team objects
    const home_team_db = await getTeam(home_team);
    const away_team_db = await getTeam(away_team);


    // console.log(home_team_db);
    // console.log('We break here');
    // console.log(away_team_db);

    result = await createMatch(home_team, away_team, match_venue, modifiedString, JSON.stringify(seats), vip_ticket_price, main_referee, linesmen_1, linesmen_2, home_team_db.team_logo_path, away_team_db.team_logo_path);
    if (result.affectedRows > 0) {
        //const matchID = result.insertId;
        //IMPORTNAT: Unfortunately insert doesnt return the created object
        //so its standard to use primary key returned by INSERT call to query the object we just added and then return it
        //Primary Key Solution
        //insert doesnt return the created object
        //standard to use primary key to query the object we just added and then return it
        const match = await getMatchUnique(home_team, datePart);
        //console.log("BRESAAAAAAAAAAAAAAK")
        //console.log(match);
        //console.log(home_team)
        //console.log(date_and_time)
        if (!match) {
            res.status(500).send({ error: "Incorrect match was inserted" });
            return;
        }
        console.log("I'm here");
        res.status(201).send(match);
        return;
    }
    else {
        res.status(400).send({ error: "Match was not created sucessfully" })
        return;
    }
})


//Testing DONE
//func: getUpcomingMatches 
//Method: GET 
//Route: http://localhost:8080/v1/matches
//Input From Front-end: nothing
//Output To Front-end If success: at most 20 of the upcoming matches with status code 200
router.get("/", async (req, res) => {
    //console.log("ana fe matches")
    const matches = await getUpcomingMatches();
    console.log(matches);

    res.status(200).send(matches)
})



//Testing DONE
//func: getUpcomingMatches of a certain page 
//Method: GET 
//Route: http://localhost:8080/v1/matches/:pageNumber
//Input From Front-end: Page number as route parameter. //Note: Pages start from page 1 NOT page 0
//Output To Front-end If success: at most 20 of the upcoming matches in the specified page with status code 200
router.get("/:pageNumber", async (req, res) => {
    const pageNumber = req.params.pageNumber;
    const matches = await getUpcomingMatches(pageNumber);
    res.status(200).send(matches)
})


//Testing DONE
//func: getMatch 
//Method: GET 
//Route: http://localhost:8080/v1/matches/:Home_Team/:Date_and_Time
//Input From Front-end: home_team and date_and_time of match as route parameter. 
//Output To Front-end If success: The match with specified home_team and DAY in Date_and_Time (since no 2 matches for the same home team exist on the day) with status code 200. 
//Output To Front-end If fail: Status code 404 with error message clarifying match wasnt found
router.get("/:home_team/:date_and_time", async (req, res) => {
    const home_team = req.params.home_team;
    const date_and_time = req.params.date_and_time;
    // Extracting only the date part from Date_and_Time
    let datePart = date_and_time.substring(0, 10);
    const match = await getMatchUnique(home_team, datePart);
    if (!match) {
        res.status(404).send("Match not found");
        return;
    }
    // let away_team = match.away_team;
    // home_team  = await ;
    res.status(200).send(match)
})


//Testing DONE
//func: updateMatch 
//Method: PUT 
//Route: http://localhost:8080/v1/matches
//Input From Front-end: A match object containg ALL values (modifed and un-modified) of a match object. 
// match object = {old_home_team, old_date_and_time, home_team, away_team, match_venue, date_and_time, vip_ticket_price, main_referee_first_name, main_referee_middle_Name, main_referee_last_name, linesmen_1_first_name, linesmen_1_middle_name, linesmen_1_last_name, linesmen_2_first_name, linesmen_2_middle_name, linesmen_2_last_name }
//202: referee has match on same day 
//203: linesmen1 has match on same day
//204: linesmen2 has match on same day
//205: home_team has match on same day
//206: away_team has match on same day
//207: stadium used within 3 +/- hours
//208: match we're trying to update doesnt exist
//In the match object must send old/previous home_team and date_and_time. Even if either of them remain unchanged, must still provide both old/previous and current home_team and date_and_time
//Output To Front-end If success: The new modified match with status code 200
//Output To Front-end If fail: Status code 404 if match doesnt exist. Status code 400 if match wasnt updated with error message clarifying why
router.put("/", async (req, res) => {
    const { old_home_team, old_date_and_time, home_team, away_team, match_venue, date_and_time, vip_ticket_price, main_referee_first_name, main_referee_middle_name, main_referee_last_name, linesmen_1_first_name, linesmen_1_middle_name, linesmen_1_last_name, linesmen_2_first_name, linesmen_2_middle_name, linesmen_2_last_name } = req.body;
    //TODO: if we end up using drop down list , remove these validations


    //getting ID of referee and linesmen, validating role of each on
    const main_referee_row = await getPerson(main_referee_first_name, main_referee_middle_name, main_referee_last_name);
    //console.log("I'M PRINTING MAIN REFEREE");
    //console.log(main_referee_row);
    const linesmen_1_row = await getPerson(linesmen_1_first_name, linesmen_1_middle_name, linesmen_1_last_name);
    //console.log("I'M PRINTING LINESMEN1");
    //console.log(linesmen_1_row);
    const linesmen_2_row = await getPerson(linesmen_2_first_name, linesmen_2_middle_name, linesmen_2_last_name);
    //console.log("I'M PRINTING LINESMEN2");
    //console.log(linesmen_2_row);
    const main_referee = main_referee_row.id;
    const linesmen_1 = linesmen_1_row.id;
    const linesmen_2 = linesmen_2_row.id;
    // Extracting only the date part from Date_and_Time
    let oldDatePart = old_date_and_time.substring(0, 10);

    //checking match we're updating exists in database
    let match = await getMatchUnique(old_home_team, oldDatePart);
    if (!match) {
        // res.status(404).send({ error: "Match doesn't exist" });
        res.status(208).send({ error: "Match doesn't exist" });
        return;
    }
    // Extracting only the date part from Date_and_Time
    let datePart = date_and_time.substring(0, 10);

    //validating referee doesnt have another match on the same day
    let result = await getMatchForReferee(main_referee, datePart)
    if (result) {
        if (!(result.home_team === old_home_team && result.date_and_time.toISOString() === old_date_and_time)) {
            // res.status(400).send({ error: `A match already exists for referee ${main_referee_first_name} ${main_referee_middle_name} ${main_referee_last_name} on day ${datePart}` });
            res.status(202).send({ error: `A match already exists for referee ${main_referee_first_name} ${main_referee_middle_name} ${main_referee_last_name} on day ${datePart}` });
            return;
        }
    }

    //validating linesmen1 doesnt have another match on the same day
    result = await getMatchForLinesmen1(linesmen_1, datePart)
    if (result) {
        if (!(result.home_team === old_home_team && result.date_and_time.toISOString() === old_date_and_time)) {
            // res.status(400).send({ error: `A match already exists for linesmen ${linesmen_1_first_name} ${linesmen_1_middle_name} ${linesmen_1_last_name} on day ${datePart}` });
            res.status(203).send({ error: `A match already exists for linesmen ${linesmen_1_first_name} ${linesmen_1_middle_name} ${linesmen_1_last_name} on day ${datePart}` });
            return;
        }

    }


    //validating linesmen2 doesnt have another match on the same day
    result = await getMatchForLinesmen2(linesmen_2, datePart)
    if (result) {
        if (!(result.home_team === old_home_team && result.date_and_time.toISOString() === old_date_and_time)) {
            // res.status(400).send({ error: `A match already exists for linesmen ${linesmen_2_first_name} ${linesmen_2_middle_name} ${linesmen_2_last_name} on day ${datePart}` });
            res.status(204).send({ error: `A match already exists for linesmen ${linesmen_2_first_name} ${linesmen_2_middle_name} ${linesmen_2_last_name} on day ${datePart}` });
            return;
        }

    }

    //validating Home_Team doesn't have another match on the same day
    result = await getMatch(home_team, datePart);
    if (result) {
        if (!(result.home_team === old_home_team && result.date_and_time.toISOString() === old_date_and_time)) {
            // res.status(400).send({ error: `A match already exists for team ${home_team} on day ${datePart}` });
            res.status(205).send({ error: `A match already exists for team ${home_team} on day ${datePart}` });
            return;
        }

    }

    //validating Away_Team doesn't have another match on the same day
    result = await getMatchForAwayTeam(away_team, datePart);
    if (result) {

        //if the result is match before updating then that is fine, else/! then send error.
        //problem is if result has length greater than 1, then I should output error anyways
        // if (result.length > 1) {
        //     res.status(206).send({ error: `A match already exists for team ${away_team} on day ${datePart}` });
        //     return;
        // }

        //console.log("BREAAAAAAAAAAAAAAAAK");
        //console.log(result);
        if (!(result.home_team === old_home_team && result.date_and_time.toISOString() === old_date_and_time)) {
            //console.log(`old home team is ${old_home_team} and old datetime is ${old_date_and_time}`);
            // res.status(400).send({ error: `A match already exists for team ${away_team} on day ${datePart}` });
            res.status(206).send({ error: `A match already exists for team ${away_team} on day ${datePart}` });
            //console.log(result.home_team == old_home_team);
            //console.log("BREAAAAAAAAAAAAAAAAK");
            //console.log(result.date_and_time.toISOString() == old_date_and_time)
            //console.log("BREAAAAAAAAAAAAAAAAK");
            //console.log(result.date_and_time);
            //console.log("BREAAAAAAAAAAAAAAAAK");
            //console.log(old_date_and_time);
            return;
        }
    }
    //converting given string from UTC to local time zone then converting string to MYSQL datetime format
    const time_zone_date_and_time = new Date(date_and_time);
    time_zone_date_and_time.setHours(time_zone_date_and_time.getHours() + 2);
    let timezoneOffset = time_zone_date_and_time.getTimezoneOffset()
    if (timezoneOffset < -120) {
        time_zone_date_and_time.setHours(time_zone_date_and_time.getHours() + 1);
    }
    let time_zone_date_and_time_as_string = time_zone_date_and_time.toISOString();
    let modifiedString = time_zone_date_and_time_as_string.slice(0, 10) + ' ' + time_zone_date_and_time_as_string.slice(11, 19);

    const time_zone_date_and_time_lower_end = new Date(time_zone_date_and_time);
    //console.log(time_zone_date_and_time_lower_end)
    time_zone_date_and_time_lower_end.setHours(time_zone_date_and_time.getHours() - 3)
    const time_zone_date_and_time_upper_end = new Date(time_zone_date_and_time);
    time_zone_date_and_time_upper_end.setHours(time_zone_date_and_time.getHours() + 3);
    const time_zone_date_and_time_as_string_lower = time_zone_date_and_time_lower_end.toISOString();
    const time_zone_date_and_time_as_string_upper = time_zone_date_and_time_upper_end.toISOString();
    // console.log(time_zone_date_and_time_lower_end);
    // console.log(time_zone_date_and_time);
    // console.log(time_zone_date_and_time_upper_end);
    let modifiedString_lower = time_zone_date_and_time_as_string_lower.slice(0, 10) + ' ' + time_zone_date_and_time_as_string_lower.slice(11, 19);
    let modifiedString_upper = time_zone_date_and_time_as_string_upper.slice(0, 10) + ' ' + time_zone_date_and_time_as_string_upper.slice(11, 19);

    result = await getMatchForStadiumNew(match_venue, datePart);

    if (result.length > 0) {
        console.log("result of query", result);
        //if the result is match before updating then that is fine, else/! then send error.
        //problem is if result has length greater than 1, then I should output error anyways
        if (result.length > 1) {
            console.log("new code");
            res.status(207).send({ error: `A match already exists in ${match_venue} 3 hours +/- ${date_and_time}` });
            return;
        }
        if (!(result.home_team === old_home_team && result.date_and_time.toISOString() === old_date_and_time)) {
            // res.status(400).send({ error: `A match already exists in ${match_venue} 3 hours +/- ${date_and_time}` });
            console.log("old code");
            console.log("mew date and time", date_and_time); //old = 19
            console.log(result); //result.date = 17
            console.log("old date and time", old_date_and_time);
            console.log("using ISO");
            console.log(result.date_and_time.toISOString())
            res.status(207).send({ error: `A match already exists in ${match_venue} 3 hours +/- ${date_and_time}` });
            return;
        }
    }

    //TODO: change column names hena
    //TODO: change column names hena
    const stadium = await getStadium(match_venue);
    const row_no = stadium.row_no;
    const seats_per_row = stadium.seats_per_row;
    const seats = create2DArray(row_no, seats_per_row);
    // console.log("I'M PRINTING SEATSSSSSS");
    // console.log(seats);


    //converting given string from UTC to local time zone then converting string to MYSQL datetime format
    const old_time_zone_date_and_time = new Date(old_date_and_time);
    old_time_zone_date_and_time.setHours(old_time_zone_date_and_time.getHours() + 2);
    if (timezoneOffset < -120) {
        old_time_zone_date_and_time.setHours(old_time_zone_date_and_time.getHours() + 1);
    }
    let old_time_zone_date_and_time_as_string = old_time_zone_date_and_time.toISOString();
    let old_modifiedString = old_time_zone_date_and_time_as_string.slice(0, 10) + ' ' + old_time_zone_date_and_time_as_string.slice(11, 19);


    //Getting team objects
    const home_team_db = await getTeam(home_team);
    const away_team_db = await getTeam(away_team);

    // console.log(old_modifiedString);
    // console.log(old_home_team);
    // const temp = await getMatch(old_home_team, old_modifiedString);
    // console.log(temp);
    console.log("this is home team", home_team);
    console.log("this is away team", away_team);
    result = await updateMatch(home_team, away_team, match_venue, modifiedString, JSON.stringify(seats), vip_ticket_price, main_referee, linesmen_1, linesmen_2, home_team_db.team_logo_path, away_team_db.team_logo_path, old_home_team, old_modifiedString);
    // console.log(result);
    // console.log(old_modifiedString);
    // console.log(old_home_team);
    // Check the affected rows to determine if the update was successful
    if (result.affectedRows > 0) {
        // If affectedRows is greater than 0, the update was successful
        //returning updated object
        match = await getMatchUnique(home_team, datePart);
        res.status(200).send(match);
        return;

    } else {
        // If affectedRows is 0, it means no rows were updated (user not found)
        res.status(400).send({ error: "Match wasn't updated" });
        return;
    }

})

//Testing DONE
//func: deleteMatch 
//Method: DELETE 
//Route: http://localhost:8080/v1/matches/:Home_Team/:Date_and_Time
//Input From Front-end: home_team and date_and_time of match as route parameter. 
//Output To Front-end If success: Match object containing deleted match with status code 200
//Output To Front-end If fail: Status code 404 if match doesnt exist. Status code 400 if match wasnt deleted
router.delete("/:home_team/:date_and_time", async (req, res) => {
    const home_team = req.params.home_team;
    const date_and_time = req.params.date_and_time;
    //converting given string from UTC to local time zone then converting string to MYSQL datetime format
    const time_zone_date_and_time = new Date(date_and_time);
    time_zone_date_and_time.setHours(time_zone_date_and_time.getHours() + 2);
    let timezoneOffset = time_zone_date_and_time.getTimezoneOffset()
    if (timezoneOffset < -120) {
        time_zone_date_and_time.setHours(time_zone_date_and_time.getHours() + 1);
    }
    let time_zone_date_and_time_as_string = time_zone_date_and_time.toISOString();
    let modifiedString = time_zone_date_and_time_as_string.slice(0, 10) + ' ' + time_zone_date_and_time_as_string.slice(11, 19);
    // Extracting only the date part from Date_and_Time
    let datePart = date_and_time.substring(0, 10);
    const match = await getMatchUnique(home_team, datePart);
    if (!match) {
        res.status(404).send("Match doesn't exist");
        return;
    }
    const result = await deleteMatch(home_team, modifiedString);
    // Check the affected rows to determine if the delete was successful
    if (result.affectedRows > 0) {
        // If affectedRows is greater than 0, the delete was successful
        res.status(200).send(match);
        return;
    } else {
        // If affectedRows is 0, it means no rows were deleted
        res.status(400).send("Match was not deleted successfully")
        return null;
    }
})

//exporting router object containing all user routes
const matchesRouter = router;
export default matchesRouter;


