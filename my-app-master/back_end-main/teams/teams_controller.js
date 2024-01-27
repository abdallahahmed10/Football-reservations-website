import express from 'express';
import { createTeam, getTeams, getTeam, updateTeam, deleteTeam } from "./teams_database.js"
const router = express();
router.use(express.json());


//Testing DONE
//func: createTeam 
//Method: POST 
//Route: http://localhost:8080/v1/teams
//Input From Front-end: A JSON object in the body with the values needed to create a user : (team_name, team_logo_path )
//Output To Front-end If success: status code 201 and the team that was just created
//Output T Front-end If fail: Status code 400 with error message clarifying a duplicate team exists or another problem prevented team from being created
router.post("/", async (req, res) => {
    const { team_name, team_logo_path } = req.body;
    let result = await getTeam(team_name);
    if (result) {
        res.status(400).send(`A team already exists with the name ${team_name}`);
        return;

    }
    result = await createTeam(team_name, team_logo_path);
    if (result.affectedRows > 0) {
        //const Team_Name = result.insertId;
        //IMPORTNAT: Unfortunately insert doesnt return the created object
        //so its standard to use primary key returned by INSERT call to query the object we just added and then return it
        const team = await getTeam(team_name);
        if (!team) {
            res.status(500).send("Incorrect team was inserted");
            return;
        }
        res.status(201).send(team);
        return;
    }
    else {
        res.status(400).send("Team was not created sucessfully")
        return;
    }
})

//Testing DONE
//func: getTeams 
//Method: GET 
//Route: http://localhost:8080/v1/teams
//Input From Front-end: nothing
//Output To Front-end If success: all teams in the database with status code 200
router.get("/", async (req, res) => {
    const teams = await getTeams();
    res.status(200).send(teams)
})

//Testing DONE
//func: getTeam 
//Method: GET 
//Route: http://localhost:8080/v1/teams/:Team_name
//Input From Front-end: team_name as route parameter
//Output To Front-end If success: team with specified name with status code 200
//Output To Front-end If fail: Status code 404 with error message clarifying team wasnt found
router.get("/:team_name", async (req, res) => {
    const team_name = req.params.team_name;
    const team = await getTeam(team_name);
    console.log(team_name);
    if (!team) {
        res.status(404).send("Team not found");
        return;
    }
    res.status(200).send(team)
})




//Testing DONE
//func: updateTeam 
//Method: PUT 
//Route: http://localhost:8080/v1/teams
//Input From Front-end: A team object (team_name, team_logo_path)
//Output To Front-end If success: The new modified team with status code 200
//Output To Front-end If fail: Status code 404 if team doesnt exist. Status code 400 if team wasnt updated
router.put("/", async (req, res) => {
    const { team_name, team_logo_path } = req.body;
    console.log(team_name);
    let team = await getTeam(team_name);
    console.log(team);
    if (!team) {
        res.status(404).send("Team doesn't exist");
        return;
    }
    const result = await updateTeam(team_name, team_logo_path);
    // Check the affected rows to determine if the update was successful
    if (result.affectedRows > 0) {
        // If affectedRows is greater than 0, the update was successful
        //returning updated object
        team = await getTeam(team_name);
        res.status(200).send(team);
        return;

    } else {
        // If affectedRows is 0, it means no rows were updated (user not found)
        res.status(400).send("Team wasn't updated");
        return;
    }

})

//Testing DONE
//func: deleteTeam 
//Method: DELETE 
//Route: http://localhost:8080/v1/teams/:team_name
//Input From Front-end: team_name as route parameter. 
//Output To Front-end If success: team object containing deleted team with status code 200
//Output To Front-end If fail: Status code 404 if team doesnt exist. Status code 400 if team wasnt deleted
router.delete("/:team_name", async (req, res) => {
    const team_name = req.params.team_name;
    const team = await getTeam(team_name);
    if (!team) {
        res.status(404).send("Team doesn't exist");
        return;
    }
    const result = await deleteTeam(team_name);
    // Check the affected rows to determine if the delete was successful
    if (result.affectedRows > 0) {
        // If affectedRows is greater than 0, the delete was successful
        res.status(200).send(team);
        return;
    } else {
        // If affectedRows is 0, it means no rows were deleted
        //TODO:error codes
        res.status(400).send("Team was not deleted successfully")
        return null;
    }
})


//exporting router object containing all user routes
const teamsRouter = router;
export default teamsRouter;
