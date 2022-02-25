// copy of index.js file from api/speakers
// with addition of POST, PUT, and DELETE methods

import path from 'path';
import fs from "fs";

const {promisify} = require("util");
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
//delay function to make it feel real world-like and to be able to give loading function a chance to show
const delay = (ms) => new Promise((resolve) => { setTimeout(resolve, ms)});

export default async function handler(req, res) {

    const method = req?.method;
    const id = parseInt(req?.query.id);
    const recordFromBody = req?.body;
    const jsonFile = path.resolve("./","db.json");
    switch (method) {
        case "POST":
            await postMethod();
            break;

        case "PUT":
            await putMethod();
            break;

        case "DELETE":
            await deleteMethod();
            break;
        default:
            res.status(501).send(`Method ${method} not implemented`);
            console.log(`Method ${method} not implemented`);
    }

//All from get method wrapped in put Method
async function putMethod() {
    const jsonFile = path.resolve("./", "db.json");
    try {
        const readFileData = await readFile(jsonFile);
        await delay(1000);
        const speakers = JSON.parse(readFileData).speakers;
        if (!speakers){
            res.status(404).send("Error: Request failed (error code: 404)");
        }   else{
            //this is to find that one record that needs updating and update it.
            const newSpeakersArray = speakers.map(function(rec) {
                return rec.id == id ? recordFromBody : rec;
            })
            //using fs writeFile, we write the new updated speakers array back
            writeFile(jsonFile, JSON.stringify({speakers: newSpeakersArray}, null, 2));
            res.setHeader("Content-Type", "application/json");
            // change speakers to recordFromBody as we send it back to client
            res.status(200).send(JSON.stringify(recordFromBody, null, 2)); 
            // finish up by logging in the console the PUT request into the console
            console.log(`PUT /api/speakers/${id}   status: 200`);
        }
    }   catch(e) {
        //** return error for PUT method */
        res.status(500).send(`PUT /api/speakers/${id}   status: 500 unexpected error`);
        console.log(`PUT api/speakers/${id} error  status: 200`, e);
        //** */
        }
    }

    //copy of put method changed to post with appropriate changes
    async function postMethod() {
        const jsonFile = path.resolve("./", "db.json");
        try {
            const readFileData = await readFile(jsonFile);
            await delay(1000);
            const speakers = JSON.parse(readFileData).speakers;
            if (!speakers){
                res.status(404).send("Error: Request failed (error code: 404)");
            }   else{
                // assume we have to create a new ID for speaker, since this is an insert method
                // use this to find all existing ID and find highest value and +1
                //** insert method +1 to ID */
                const idNew = speakers.reduce((accumulator, currentValue) => {
                    const idCurrent = parseInt(currentValue.id);
                    return idCurrent > accumulator ? idCurrent : accumulator;
                }, 0) + 1;

                const newSpeakerRec = {...recordFromBody, id: idNew.toString() };
                const newSpeakersArray = [newSpeakerRec, ...speakers];
                //** */
                writeFile(jsonFile, JSON.stringify({speakers: newSpeakersArray}, null, 2));
                res.setHeader("Content-Type", "application/json");
                //update what returns to client to newSpeakerRec
                res.status(200).send(JSON.stringify(newSpeakerRec, null, 2)); 
                //update logging to say POST
                console.log(`POST /api/speakers/${id}   status: 200`);
            }
        }   catch(e) {
            res.status(500).send(`POST /api/speakers/${id}   status: 500 unexpected error`);
            console.log( `POST api/speakers/${id} error  status: 200`, e );
        }
    }
    // copy of putMethod with changes for delete
    async function deleteMethod() {
        const jsonFile = path.resolve("./", "db.json");
        try {
            const readFileData = await readFile(jsonFile);
            await delay(1000);
            const speakers = JSON.parse(readFileData).speakers;
            if (!speakers){
                res.status(404).send("Error: Request failed (error code: 404)");
            }   else{
                //change map to filter, since we dont want to create an array of updated speaker list, 
                const newSpeakersArray = speakers.filter(function(rec) {
                    return rec.id != id;
                })
                //but to ONLY remove a speaker
                writeFile(jsonFile, JSON.stringify({speakers: newSpeakersArray}, null, 2));
                res.setHeader("Content-Type", "application/json");
                //use Find method to find the record we deleted
                res.status(200).send(JSON.stringify(speakers.find(rec=>rec.id == id), null, 2)); 
                //change log messeges to DELETE
                console.log(`DELETE /api/speakers/${id}   status: 200`);
            }
        }   catch(e) {
            res
            .status(500).send(`DELETE /api/speakers/${id}   status: 500 unexpected error`);
            console.log( `DELETE api/speakers/${id} error  status: 200`, e );
        }
    }

}