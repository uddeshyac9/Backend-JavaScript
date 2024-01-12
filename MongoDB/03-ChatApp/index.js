import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDb from "./db/index.js";
import path from "path"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
// import {Chat} from './models/chat.models.js'

dotenv.config();

const app = express();
// ejs setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.set("views" , path.join(__dirname, "/views"))
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"/public")))



const PORT = process.env.PORT || 3000;

connectDb()
.then(()=> {
    app.on("error", (error) => {
        console.log("Error:", error);
        throw error
    })
    app.listen(PORT, () =>{
        console.log(`⚙️  Server is running at port : ${PORT}`);
        
    })
}).catch((error) => {
    console.log("MONGO db connection failed !!! ", error);
})

app.get('/', (req,res) => {
    res.send("this is root")
})





