import express from "express"
import path from "path"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
// import Accdata from './data.json';


import fs from 'fs/promises';
const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = path.resolve(__dirname, 'data.json');
let Accdata; // Move the declaration outside the try block
app.set("views" , path.join(__dirname, "/views"))

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname,"/public")))
try {
  await fs.access(filePath);
  const jsonData = await fs.readFile(filePath, 'utf-8');
   Accdata = JSON.parse(jsonData);
  // console.log(Accdata)
  // Rest of your code...
} catch (err) {
  console.error('Error accessing or reading the file:', err);
}


const port = 3000;


app.get("/", (req,res)=> {
 res.render("index")
})
// app.get("/views", (req,res)=> {
//     res.render("index")
//    })
   app.get("/rolldice",(req,res)=> {
    let diceval = Math.floor(Math.random() * 6) + 1 
    res.render("rolldice",{diceval})
   })


   app.get("/ig/:username",(req,res) => {
    
  
    let {username} = req.params;
    let data = Accdata[username];
    if(data){
      res.render("insta",{data}) 
    } else {
      res.render("notfound")
    }
   })
app.listen(port,()=> {
    console.log(`Server listning on ${port}`);
} )