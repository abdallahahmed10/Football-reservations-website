import express from 'express';
import cors from 'cors';

import { getNote, getAllnotes, createNote } from "./database.js"
//import { not } from 'joi';

import dotenv from 'dotenv'

dotenv.config()

import matchesRouter from "./matches/matches_controller.js";
import personsRouter from "./persons/persons_controller.js";
import reservationsRouter from "./reservations/reservations_controller.js";
import stadiumsRouter from "./stadiums/stadiums_controller.js";
import teamsRouter from "./teams/teams_controller.js";
import usersRouter from "./users/users_controller.js";

import { getPendingUsers } from "./users/users_database.js"

const app = express();
app.use(cors()); // Enable CORS for all routes
app.options('*', cors()); // Enable preflight requests for all routes

// app.use(cors());
// // Enable CORS for all routes
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     // Allow preflight requests to cache for 24 hours
//     res.header('Access-Control-Max-Age', '86400');

//     // Handle preflight requests
//     if (req.method === 'OPTIONS') {
//         res.sendStatus(204);
//     } else {
//         next();
//     }
//     // next();
// });
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/v1/matches", matchesRouter);
app.use("/v1/persons", personsRouter);
app.use("/v1/reservations", reservationsRouter);
app.use("/v1/stadiums", stadiumsRouter);
app.use("/v1/teams", teamsRouter);
app.use("/v1/users", usersRouter);



// app.post("/notes", async (req, res) => {
//     const { title, content } = req.body;
//     const note = await createNote(title, content);
//     res.status(201).send(note);
// })

// app.get("/notes", async (req, res) => {
//     const notes = await getAllnotes();
//     res.send(notes)
// })

// app.get("/notes/:id", async (req, res) => {
//     const id = req.params.id;
//     const note = await getNote(id);
//     res.send(note)
// })

// app.put("/notes/:id", async (req, res) => {
//     const id = req.params.id;
//     const { title, contents } = req.body;
//     //const note = await updateNote(id,{ title, contents });
//     //const note = await createNote(title, contents);
//     res.status(201).send(note)
// })

// app.delete("/notes/:id", async (req, res) => {
//     const id = req.params.id;
//     const note = await getNote(id);
//     res.send(note)
// })

// app.get("/v1/users/pending", async (req, res) => {
//     console.log("Ya Shatta ya mewal3haaaaaa")
//     const users = await getPendingUsers();
//     res.send(users)
// })

//Custom middleware not entirely sure what this is
app.use((err, req, res, next) => {
    //apparently this handles error handling for async functions but I didn't rlly get this tbh
    console.error(err.stack);
    res.status(500).send("oopsieeee!Internal Server Errorrr");
})

app.listen(process.env.port, () => {

    console.log(`Running on port ${process.env.port}`)
})