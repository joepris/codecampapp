//implementing a REST server using next.js
// code below is if we only want to see the data from SpeakerData file
//*****/
// import {data} from "../../../../codecampapp/src/SpeakerData";

// export default async function handler(req, res) {
//     res.status(200).send(JSON.stringify(data,null, 2));
// }
//*****/

import path from 'path';
import fs from "fs";

const {promisify} = require("util");
const readFile = promisify(fs.readFile);
//delay function to make it feel real world-like and to be able to give loading function a chance to show
const delay = (ms) => new Promise((resolve) => { setTimeout(resolve, ms)});

export default async function handler(req, res) {
    const jsonFile = path.resolve("./", "db.json");
    try {
        const readFileData = await readFile(jsonFile);
        await delay(1000);
        const speakers = JSON.parse(readFileData).speakers;
        if (!speakers){
            res.status(404).send("Error: Request failed (error code: 404)");
        }  else{
            res.setHeader("Content-Type", "application/json");
            res.status(200).send(JSON.stringify(speakers, null, 2));
            console.log("GET /api/speakers status: 200")
        }
    }   catch(e) {
        console.log( "api/speakers error", e );
        res.status(404).send("File not found");
    }
}