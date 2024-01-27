import express from 'express';
import { createStadium, getStadium, getStadiums, updateStadium, deleteStadium } from "./stadiums_database.js"
const router = express();
router.use(express.json());

//Testing DONE
//TODO: comments
//func: createStadium 
//Method: POST 
//Route: http://localhost:8080/v1/stadiums
//Input From Front-end: stadium object to create in request body
//Output To Front-end If success: Status code 201, The created stadium
//Output T Front-end If fail: Status code 400 with error message clarifying a duplicate stadium exists or another problem prevented stadium from being created
router.post("/", async (req, res) => {
    // const { Seat_Arrangement, Stadium_Name, Row_No, Seats_Per_Row } = req.body;
    const { stadium_name, row_no, seats_per_row } = req.body;
    let result = await getStadium(stadium_name);
    if (result) {
        res.status(400).send(`A stadium already exists with the name ${stadium_name}`);
        return;

    }
    result = await createStadium(stadium_name, row_no, seats_per_row);
    if (result.affectedRows > 0) {
        //IMPORTNAT: Unfortunately insert doesnt return the created object
        //so its standard to use primary key returned by INSERT call to query the object we just added and then return it
        const stadium = await getStadium(stadium_name);
        if (!stadium) {
            res.status(500).send("Incorrect stadium was inserted");
            return;
        }
        res.status(201).send(stadium);
        return;
    }
    else {
        res.status(400).send("Stadium was not created sucessfully")
        return;
    }
})

//Testing DONE
//TODO: comments
//TODO: Adjust routing
//TODO: Adjust response code
//func: getALLStadiums 
//Method: GET (cuz ben retrieve)
//Route: http://localhost:8080/v1/stadiums
//Input From Front-end: nothing
//Output To Front-end If success: Status code 201, ALL stadiums in the database
//Output T Front-end If fail: TODO:
router.get("/", async (req, res) => {
    const stadiums = await getStadiums();
    if (!stadiums) {
        res.status(404).send("No stadiums found");
        return;
    }
    res.status(200).send(stadiums)
})

//Testing DONE
//TODO: comments
//func: getStadium 
//Method: GET 
//Route: http://localhost:8080/v1/stadiums/:stadium_name
//Input From Front-end: stadium_name as route parameter. 
//Output To Front-end If success: Status code 201, the stadium with specified name
//Output To Front-end If fail: Status code 404 with error message clarifying stadium wasnt found
router.get("/:stadium_name", async (req, res) => {
    const stadium_name = req.params.stadium_name;
    const stadium = await getStadium(stadium_name);
    if (!stadium) {
        res.status(404).send("Stadium not found");
        return;
    }
    res.status(200).send(stadium)
})



//Testing DONE
//TODO: comments
//func: updateStadium 
//Method: PUT 
//Route: http://localhost:8080/v1/stadiums
//Input From Front-end: A stadium object containg ALL values (modifed and un-modified) of a stadium object
//Output To Front-end If success: Status code 200, The new modified stadium
//Output To Front-end If fail: Status code 404 if stadium doesnt exist. Status code 400 if stadium wasnt updated
router.put("/", async (req, res) => {
    // const { Seat_Arrangement, Stadium_Name, Row_No, Seats_Per_Row } = req.body;
    const { stadium_name, row_no, seats_per_row } = req.body;
    let stadium = await getStadium(stadium_name);
    if (!stadium) {
        res.status(404).send("Stadium doesn't exist");
        return;
    }
    const result = await updateStadium(stadium_name, row_no, seats_per_row);
    // Check the affected rows to determine if the update was successful
    if (result.affectedRows > 0) {
        // If affectedRows is greater than 0, the update was successful
        //returning updated object
        stadium = await getStadium(stadium_name);
        res.status(200).send(stadium);
        return;

    } else {
        // If affectedRows is 0, it means no rows were updated (user not found)
        res.status(400).send("Stadium wasn't updated");
        return;
    }

})

//Testing DONE
//TODO: comments
//TODO: error codes
//func: deleteStadium 
//Method: DELETE 
//Route: http://localhost:8080/v1/stadiums/:Stadium_name
//Input From Front-end: Stadium_Name as route parameter. 
//Output To Front-end If success: stadium object containing deleted stadium with status code 200
//Output To Front-end If fail: Status code 404 if stadium doesnt exist. Status code 400 if stadium wasnt deleted
router.delete("/:stadium_name", async (req, res) => {
    const stadium_name = req.params.stadium_name;
    const stadium = await getStadium(stadium_name);
    if (!stadium) {
        res.status(404).send("Stadium doesn't exist");
        return;
    }
    const result = await deleteStadium(stadium_name);
    // Check the affected rows to determine if the delete was successful
    if (result.affectedRows > 0) {
        // If affectedRows is greater than 0, the delete was successful
        res.status(200).send(stadium);
        return;
    } else {
        // If affectedRows is 0, it means no rows were deleted
        //TODO:error codes
        res.status(400).send("Stadium wss not deleted successfully")
        return null;
    }
})


//exporting router object containing all user routes
const stadiumsRouter = router;
export default stadiumsRouter;
