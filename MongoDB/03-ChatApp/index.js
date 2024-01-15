import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDb from "./db/index.js";
import path from "path"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import {Chat} from './models/chat.models.js'
import methodOverride from "method-override";
import { log } from "console";

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
// Add body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


app.get('/', (req,res) => {
    res.send("this is root")
})

app.get('/chat', async (req,res) => {
    let chats = await Chat.find();
    res.render('chat',{chats})
})

app.get('/chat/new', (req,res) => {
    res.render('new')
})

app.post('/chats', async (req,res) => {
    let {from,message, to} = req.body;
     // Log the entire request body to check what's being received
     console.log('Received request body:', req.body);
    let newChat = {
        from,
        message,
        to,
    };       
     // Ensure that req.body exists and has the expected properties
     if (!req.body || !req.body.from || !req.body.message || !req.body.to) {
        return res.status(400).send('Bad Request: Missing required fields');
      } else {
       
        try {
            await Chat.create(newChat);
        } catch (error) {
            console.error('Error creating chat:', error);
            return res.status(500).send('Internal Server Error');
        }
        
      }

    res.redirect("/chat")
})

app.get('/chat/:id/edit', async (req,res) => {
    let {id} = req.params;
    try {
     let chat =    await Chat.findById(id);
     res.render('edit',{chat} );
    } catch (error) {
        console.error('Error creating chat:', error);
        return res.status(500).send('Internal Server Error');
    }
  
})
// edit message
app.put('/chat/:id', async (req, res) => {
    let {id} = req.params;
    let {message : formMsg} = req.body;
    try {
      let chat =   await Chat.findByIdAndUpdate(id, {$set: {message: formMsg}});
        res.redirect("/chat")
        console.log(chat);
        console.log(`Previous Message: ${chat.message}  and new message: ${formMsg}`);
    } catch (error) {
        console.error('Error creating chat:', error);
        return res.status(500).send('Internal Server Error');
    }
     

})

app.delete('/chat/:id', async (req,res) => {
    let {id} = req.params;
    try {
        let deleteChat = await Chat.findByIdAndDelete(id);
        console.log(deleteChat);
        res.redirect('/chat');
    } catch (error) {
        console.error('Error creating chat:', error);
        return res.status(500).send('Internal Server Error');
    }
})

