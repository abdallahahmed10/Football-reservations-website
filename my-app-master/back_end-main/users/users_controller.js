import express from 'express';
import { createUser, getUser, getPendingUsers, updateUser, approveUser, deleteUser, getUsers } from "./users_database.js"


//Route: http://localhost:8080/v1/usersconst router = express.Router();
const router = express();
router.use(express.json());
router.use(express.urlencoded({ extended: false }));






//Testing DONE
//func: Signup 
//Method: POST
//Route: http://localhost:8080/v1/users/signup
//Input From Front-end: A JSON object in the body with the values needed to create a user : (username, password, first_name, last_name, birth_date, gender, city, address, email_address). Note: gender should be "0" for males and "1" for females
//date value example:1992-11-09 22:00:00.000
//date value output example: 1989-12-31T22:00:00.000Z
//Output To Front-end If success: status code 201 and the user that was just created
//Output To Front-end If fail: Sends status code 400 with error message "user was not created sucessfully"
router.post("/signup", async (req, res) => {
    const { username, password, first_name, last_name, birth_date, gender, city, address, email_address, fan } = req.body;//modified , fan added
    // console.log(username);
    /**
     *  "username": "heba",
        "password": "heba123",
        "first_name": "heba",
        "last_name": "boudy",
        "birth_date": "2003-1-01T22:00:00.000Z",
        "gender": 1,
        "city": "cairo",
        "address": "zayed",
        "email_address": "habhoba@gmail.com",
        "fan": 0
     * 
     */
    // const user = getUser(username);

    // if (user) {
    //     console.log("inside controller "+user);
    //     res.status(400).send("User already exists")
    //     return;
    // }
    const result = await createUser(username, password, first_name, last_name, birth_date, gender, city, address, email_address, fan)
    if (result.affectedRows > 0) {
        //IMPORTNAT: Unfortunately insert doesnt return the created object
        //so its standard to use primary key returned by INSERT call to query the object we just added and then return it
        const user = await getUser(username);
        if (!user) {
            res.status(500).send("Incorrect user was inserted");
            return;
        }
        res.status(201).send(user);
        return;
    }
    else {
        res.status(400).send("User was not created sucessfully")
        return;
    }
})



//Testing DONE
//func: getPendingUsers 
//Method: GET
//Route: http://localhost:8080/v1/users/pending
//Input From Front-end: Nothing
//Output To Front-end: Status code 200 and list of users who haven't been approved yet
router.get("/pending", async (req, res) => {
    const users = await getPendingUsers();
    //console.log(users)
    // if (!users) {
    //     res.status(404).send("No pending users");
    //     return;
    // }
    //console.log(users);
    res.status(200).send(users)
})


//Testing DONE
//func: getUser 
//Method: GET
//Route: http://localhost:8080/v1/users/:username
//Input From Front-end: A JSON object in the body containing user: (username,password)
//Output To Front-end If success: Status code 200 and requested user object
//Output To Front-end If fail: Status code 404 with error message "Username not found"
router.get("/:username", async (req, res) => {
    const username = req.params.username;
    const user = await getUser(username);
    if (!user) {
        res.status(404).send("Username not found");
        return;
    }
    res.status(200).send(user)
})

//Testing DONE
//func: getUsers 
//Method: GET
//Route: http://localhost:8080/v1/users
//Input From Front-end: Nothing
//Output To Front-end: Status code 200 and list of users
router.get("/", async (req, res) => {
    const users = await getUsers();
    //console.log(users)
    // if (!users) {
    //     res.status(404).send("No pending users");
    //     return;
    // }
    //console.log(users);
    res.status(200).send(users)
})

//Testing DONE
//func: Login 
//Method: POST (to secure data)
//Route: http://localhost:8080/v1/users/login
//Input From Front-end: A JSON object in the body: (username,password)
//Output To Front-end If success: Status code200 and the username of the user
//Output To Front-end If fail: Sends status code 404 with error message clarifying if username or password was incorrect or Admin still hasn't approved user
//modified: 404 : usernot found at all:incorrect username or pass
//modified:201 : user found but yet pending 
//modified:200:user found and approved , sucess 
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    //console.log("BREAAAAAAAAAAAAAAAAAAAAK")
    //console.log(Username)
    const user = await getUser(username);
    //console.log("BREAAAAAAAAAAAAAAAAAAAAK")
    // console.log(user)
    if (!user) {
        res.status(404).send({ msg: "Incorrect Password" });
        return;
    }
    if (user.password === password) {
        if (user.approval) {
            //send back to front-end login successful and send username
            res.status(200).send(user) //modified
            return;
        }
        else {
            res.status(201).send(user);
            return;

        }

    }
    else {
        //send back to front-end login unsuccessful 
        res.status(404).send({ msg: "Incorrect Password" });
        return;

    }
})




//Testing DONE  
//func: updateUser
//Method: PUT
//Route: http://localhost:8080/v1/users
//Input From Front-end: A JSON object in body containing user with its modified values
//Output To Front-end If success: Status code 200 with the new updated user
//Output To Front-end If fail: If user wasnt found, sends status code 404. If user wasnt updated, sends status code 400.
router.put("/", async (req, res) => {
    const { username, password, first_name, last_name, birth_date, gender, city, address, fan } = req.body;
    let user = await getUser(username);
    if (!user) {
        res.status(404).send("Username doesn't exist");
        return;
    }
    //converting given string from UTC to local time zone then converting string to MYSQL datetime format
    const birth_date_time_as_obj = new Date(birth_date);
    birth_date_time_as_obj.setHours(birth_date_time_as_obj.getHours() + 2);
    let birth_date_time_as_string = birth_date_time_as_obj.toISOString();
    let birth_date_as_string = birth_date_time_as_string.slice(0, 10);
    const result = await updateUser(username, password, first_name, last_name, birth_date_as_string, gender, city, address, fan)
    // Check the affected rows to determine if the update was successful
    if (result.affectedRows > 0) {
        // If affectedRows is greater than 0, the update was successful
        //returning updated object
        user = await getUser(username);
        res.status(200).send(user);
        return;

    } else {
        // If affectedRows is 0, it means no rows were updated (user not found)
        res.status(400).send("User wasn't updated");
        return;
    }

})

//Testing DONE
//func: approveUser 
//Method: PUT
//Route: http://localhost:8080/v1/users/approve/:username
//Input From Front-end: The username of user to be approved as a route parameter
//Output To Front-end If success: User object containing approved user with status code 200
//Output To Front-end If fail: Sends status code 404 if user wasnt found. Status code 400 if user wasnt approved 
router.put("/approve/:username", async (req, res) => {
    const username = req.params.username;
    let user = await getUser(username);
    if (!user) {
        res.status(404).send("Username doesn't exist");
        return;
    }
    const result = await approveUser(username);
    // Check the affected rows to determine if the update was successful
    if (result.affectedRows > 0) {
        // If affectedRows is greater than 0, the update was successful
        //returning updated object
        user = await getUser(username);
        res.status(200).send(user);
        return;

    } else {
        // If affectedRows is 0, it means no rows were updated (user not found)
        res.status(400).send("User wasn't approved");
        return;
    }

})



//Testing DONE
//func: deleteUser 
//Method: DELETE
//Route: http://localhost:8080/v1/users/:username
//Input From Front-end: The username of user to be deleted as a route parameter
//Output To Front-end If success: Status code 200 with user object containing deleted user  
//Output To Front-end If fail: Sends status code 404 if user wasnt found. Status code 400 if user wasnt deleted
router.delete("/:username", async (req, res) => {
    const username = req.params.username;
    const user = await getUser(username);
    if (!user) {
        res.status(404).send("Username doesn't exist");
        return;
    }
    const result = await deleteUser(username);
    // Check the affected rows to determine if the delete was successful
    if (result.affectedRows > 0) {
        // If affectedRows is greater than 0, the delete was successful
        res.status(200).send(user);
        return;
    } else {
        // If affectedRows is 0, it means no rows were deleted
        res.status(400).send("User wss not deleted successfully")
        return;
    }
})

//exporting router object containing all user routes
const usersRouter = router;
export default usersRouter;

