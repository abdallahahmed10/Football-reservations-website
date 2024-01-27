import express from 'express';
import { createPerson, getPersons, getPerson, getPersonWithId, updatePerson, deletePerson, getReferees, getLinesmen } from "./persons_database.js"
const router = express();
router.use(express.json());


//Testing DONE
//func: createPerson 
//Method: POST 
//Route: http://localhost:8080/v1/persons
//Input From Front-end: person object to create in request body. NOTE: role must be either "referee" or "linesmen", all lowercase no uppercase
//Output To Front-end If success: Status code 201, The created person
//Output T Front-end If fail: Status code 400 with error message clarifying a duplicate person exists or role value is invalid or another problem prevented person from being created 
router.post("/", async (req, res) => {
    //Reminder: role = 0 --> referee role = 1 --> linesmen 
    const { first_name, middle_name, last_name, role } = req.body;
    let role_modified; //while role is either "referee" or "linesmen", role_modified is either 0 or 1 since in the database role attribute is of type "enum"
    //console.log(role);
    if (role === "referee") {
        role_modified = 0;
    }
    else if (role === "linesmen") {
        role_modified = 1;
    }
    else {
        res.status(400).send(`Invalid role value. Make sure value is in lowercase and is either "referee" or "linesmen".`);
        return;

    }
    let result = await getPerson(first_name, middle_name, last_name);
    if (result) {
        // console.log("iM in 32");
        res.status(400).send(`A person already exists with the name ${first_name} ${middle_name} ${last_name} `);
        return;

    }
    result = await createPerson(first_name, middle_name, last_name, role_modified);
    if (result.affectedRows > 0) {
        // console.log("Im in 39");
        const personid = result.insertId;
        //IMPORTNAT: Unfortunately insert doesnt return the created object
        //so its standard to use primary key returned by INSERT call to query the object we just added and then return it
        const person = await getPersonWithId(personid);
        res.status(201).send(person);
        return;
    }
    else {
        res.status(400).send("Person was not created sucessfully")
        return;
    }
})

//Testing DONE
//TODO: comments
//TODO: Adjust routing
//TODO: Adjust response code
//func: getALLPersons 
//Method: GET 
//Route: http://localhost:8080/v1/persons
//Input From Front-end: nothing
//Output To Front-end If success: Status code 201, ALL persons in the database
//Output T Front-end If fail: TODO:
router.get("/", async (req, res) => {
    const persons = await getPersons();
    res.status(200).send(persons)
})


//Testing DONE
//func: getALLReferees 
//Method: GET 
//Route: http://localhost:8080/v1/persons/referees
//Input From Front-end: nothing
//Output To Front-end If success: Status code 201, ALL referees in the database
//Output T Front-end If fail: TODO:
router.get("/referees", async (req, res) => {
    const persons = await getReferees();
    res.status(200).send(persons)
})

//Testing DONE
//func: getALLLinesmen 
//Method: GET 
//Route: http://localhost:8080/v1/persons/linesmen
//Input From Front-end: nothing
//Output To Front-end If success: Status code 201, ALL linesmen in the database
//Output T Front-end If fail: TODO:
router.get("/linesmen", async (req, res) => {
    const persons = await getLinesmen();
    res.status(200).send(persons)
})

//Testing DONE
//TODO: comments
//func: getPersonWithId 
//Method: GET 
//Route: http://localhost:8080/v1/persons/:personid
//Input From Front-end: personid as route parameter 
//Output To Front-end If success: Status code 201, the person with specified name
//Output To Front-end If fail: Status code 404 with error message clarifying person wasnt found
router.get("/:personid", async (req, res) => {
    const id = req.params.personid;
    const person = await getPersonWithId(id);
    if (!person) {
        res.status(404).send("Person not found");
        return;
    }
    res.status(200).send(person)
})


//Testing DONE
//TODO: comments
//func: getPerson 
//Method: GET 
//Route: http://localhost:8080/v1/persons/:first_name/:middle_name/:last_name
//Input From Front-end: First_Name, Middle_Name,Last_name as route parameters.  
//Output To Front-end If success: Status code 201, the person with specified name
//Output To Front-end If fail: Status code 404 with error message clarifying person wasnt found
router.get("/:first_name/:middle_name/:last_name", async (req, res) => {
    const first_name = req.params.first_name;
    const middle_name = req.params.middle_name;
    const last_name = req.params.last_name;
    const person = await getPerson(first_name, middle_name, last_name);
    if (!person) {
        res.status(404).send("Person not found");
        return;
    }
    res.status(200).send(person)
})



//Testing DONE
//TODO: Testing,comments
//func: updatePerson 
//Method: PUT 
//Route: http://localhost:8080/v1/persons
//Input From Front-end: A person object containg ALL values (modifed and un-modified) of a person object
//Output To Front-end If success: Status code 200, The new modified person
//Output To Front-end If fail: Status code 404 if person doesnt exist. Status code 400 if person wasnt updated or role value was invalid
router.put("/", async (req, res) => {
    const { old_first_name, old_middle_name, old_last_name, first_name, middle_name, last_name, role } = req.body;
    let person = await getPerson(old_first_name, old_middle_name, old_last_name);
    if (!person) {
        res.status(404).send("Person doesn't exist");
        return;
    }
    let role_modified; //while role is either "referee" or "linesmen", role_modified is either 0 or 1 since in the database role attribute is of type "enum"
    if (role === "referee") {
        role_modified = 0;
    }
    else if (role === "linesmen") {
        role_modified = 1;
    }
    else {
        res.status(400).send(`Invalid role value. Make sure value is in lowercase and is either "referee" or "linesmen".`);
        return;
    }
    //TODO: Does the following line make sense? Where I treat the "person" variable as an object and its properties are the table attributes
    const result = await updatePerson(first_name, middle_name, last_name, role_modified, person.id);
    // Check the affected rows to determine if the update was successful
    if (result.affectedRows > 0) {
        // If affectedRows is greater than 0, the update was successful
        //returning updated object
        person = await getPerson(first_name, middle_name, last_name);
        res.status(200).send(person);
        return;

    } else {
        // If affectedRows is 0, it means no rows were updated (person not found)
        res.status(400).send("Person wasn't updated");
        return;
    }

})

//Testing DONE
//TODO: comments
//TODO: error codes
//func: deletePerson 
//Method: DELETE 
//Route: http://localhost:8080/v1/persons/:First_Name/:Middle_Name/:Last_Name
//Input From Front-end: First_Name, Middle_Name,Last_name as route parameters. 
//Output To Front-end If success: person object containing deleted person with status code 200 
//Output To Front-end If fail: Status code 404 if person doesnt exist. Status code 400 if person wasnt deleted
router.delete("/:first_name/:middle_name/:last_name", async (req, res) => {
    const first_name = req.params.first_name;
    const middle_name = req.params.middle_name;
    const last_name = req.params.last_name;
    const person = await getPerson(first_name, middle_name, last_name);
    if (!person) {
        res.status(404).send("Person doesn't exist");
        return;
    }
    //TODO: Does the following line make sense? Where I treat the "person" variable as an object and its properties are the table attributes
    const result = await deletePerson(person.id);
    // Check the affected rows to determine if the delete was successful
    if (result.affectedRows > 0) {
        // If affectedRows is greater than 0, the delete was successful
        res.status(200).send(person);
        return;
    } else {
        // If affectedRows is 0, it means no rows were deleted
        res.status(400).send("Person was not deleted successfully")
        return null;
    }
})








//exporting router object containing all person routes
const personsRouter = router;
export default personsRouter
