import express from 'express';


//TODO: import not working for some reason
//Note: I think it is working now, problem was that I forgot to use export keyword in database file
import { createNote, getAllnotes, getNote, updateNote, deleteNote } from "./template_databse.js"
import { not } from 'joi';


//TODO: Add parent route 
//In Parent: specifty route as "/api/v1/notes"
const router = express();
router.use(express.json());

//TODO: Testing
//func: createResource 
//Method: POST 
//Route: https://localhost:8080/v1/resources
//Input From Front-end: resource object to create in request body
//Output To Front-end If success: Status code 201, The created resource
//Output T Front-end If fail: Status code 400 with error message clarifying a duplicate resource exists or another problem prevented resource from being created
router.post("/", async (req, res) => {
    const { Resource_Name, Resource_Logo_Path } = req.body;
    let result = await getResource(Resource_Name);
    if (result.affectedRows > 0) {
        res.status(400).send(`A resource already exists with the name ${Resource_Name}`);
        return;

    }
    result = await createResource(Resource_Name, Resource_Logo_Path);
    if (result.affectedRows > 0) {
        const Resource_Name = result.insertId;
        //IMPORTNAT: Unfortunately insert doesnt return the created object
        //so its standard to use primary key returned by INSERT call to query the object we just added and then return it
        const resource = await getResource(Resource_Name);
        res.status(201).send(resource);
        return;
    }
    else {
        res.status(400).send("Resource was not created sucessfully")
        return;
    }
})

//TODO: TESTING,comments
//TODO: Adjust routing
//TODO: Adjust response code
//func: getALLResources 
//Method: GET (cuz ben retrieve)
//Route: https://localhost:8080/v1/resources
//Input From Front-end: nothing
//Output To Front-end If success: Status code 201, ALL resources in the database
//Output T Front-end If fail: TODO:
router.get("/", async (req, res) => {
    const resources = await getResources();
    res.status(201).send(resources)
})

//TODO: TESTING,comments
//func: getResource 
//Method: GET 
//Route: https://localhost:8080/v1/resources/:Resource_name
//Input From Front-end: Resource_Name as route parameter. 
//Output To Front-end If success: Status code 201, the resource with specified name
//Output To Front-end If fail: Status code 404 with error message clarifying resource wasnt found
router.get("/:Resource_Name", async (req, res) => {
    const Resource_Name = req.params.Resource_Name;
    const resource = await getResource(Resource_Name);
    if (!resource) {
        res.status(404).send("Resource not found");
        return;
    }
    res.status(201).send(resource)
})




//TODO: Testing,comments
//func: updateResource 
//Method: PUT 
//Route: https://localhost:8080/v1/resources
//Input From Front-end: A resource object containg ALL values (modifed and un-modified) of a resource object
//Output To Front-end If success: Status code 200, The new modified resource
//Output To Front-end If fail: Status code 404 if resource doesnt exist. Status code 400 if resource wasnt updated
router.put("/", async (req, res) => {
    const { Resource_Name, Resource_Logo_Path } = req.body;
    let resource = await getResource(Resource_Name);
    if (!resource) {
        res.status(404).send("Resource doesn't exist");
        return;
    }
    const result = await updateResource(Resource_Name, Resource_Logo_Path);
    // Check the affected rows to determine if the update was successful
    if (result.affectedRows > 0) {
        // If affectedRows is greater than 0, the update was successful
        //returning updated object
        resource = await getResource(Resource_Name);
        res.send(200).send(resource);
        return;

    } else {
        // If affectedRows is 0, it means no rows were updated (user not found)
        res.status(400).send("Resource wasn't updated");
        return;
    }

})

//TODO: Testing,comments
//TODO: error codes
//func: deleteResource 
//Method: DELETE 
//Route: https://localhost:8080/v1/resources/:Resource_name
//Input From Front-end: Resource_Name as route parameter. 
//Output To Front-end If success: resource object containing deleted resource 
//Output To Front-end If fail: Status code 404 if resource doesnt exist. Status code ??? if resource wasnt deleted
router.delete("/:Resource_name", async (req, res) => {
    const Resource_Name = req.params.Resource_name;
    const resource = await getResource(Resource_Name);
    if (!resource) {
        res.status(404).send("Resource doesn't exist");
        return;
    }
    const result = await deleteResource(Resource_Name);
    // Check the affected rows to determine if the delete was successful
    if (result.affectedRows > 0) {
        // If affectedRows is greater than 0, the delete was successful
        res.send(resource);
        return;
    } else {
        // If affectedRows is 0, it means no rows were deleted
        //TODO:error codes
        res.send("Resource was not deleted successfully")
        return null;
    }
})


// //Custom middleware not entirely sure what this is
// app.use((err, req, res, next) => {
//     //apparently this handles error handling for async functions but I didn't rlly get this tbh
//     console.error(err.stack);
//     res.status(500).send("oopsieeee!Internal Server Errorrr");
// })

// app.listen(process.env.port, () => {

//     console.log(`Running on port ${process.env.port}`)
// })









//exporting router object containing all user routes
const templateRouter = router;
export default templateRouter;