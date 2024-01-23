import  express from "express";
import dotenv from "dotenv";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import methodOverride from "method-override";



const app = express();
app.use(methodOverride("_method"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname,"/public")))
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extended:true}))



dotenv.config({
    path: ".env"
})

let posts = [{
   id : uuidv4(),
    name :"Uddeshya",
    username:"Uddeshyac9",
    content: "Learning Restful Api"
},{
   id : uuidv4(),
    name :"Shival",
    username: "Shival29",
    content: "Got the Internship in PW"
},{
   id : uuidv4(),
    name :"Shivay",
    username: "Shivayogi",
    content: "Hardwork is neccessory for success in life"
}]

const Port = process.env.PORT;
app.listen(Port,()=> {
    console.log(`Listing on Port ${Port}`);
})
app.get("/", (req,res) => {
  res.send("Server Running Fine")
})
app.get("/posts", (req,res) => {
    res.render("index",{posts})
  })
  app.get("/posts/new", (req,res) => {
    res.render("new")
  })
  



  app.get("/posts/:id",(req,res) => {
    let {id} = req.params;
   
 let post =  posts.find((p) => p.id === id);
//  console.log(post)
 res.render("specificpost",{post})
    
  })
  app.get("/posts/:id/edit", (req, res) => {
    // Retrieve the post by ID from your data source (e.g., database or array)
    let { id } = req.params;
    let post = posts.find((p) => p.id === id);
        res.render("edit.ejs", {post});
    
});

  
  app.post("/posts",(req,res) => {
    let {name, username, content} = req.body;
    posts.push({id : uuidv4(), name,username,content})
  res.redirect("/posts")
    
  })

  //PATCH REQUEST
  app.patch("/posts/:id", (req,res) => {
    let {id} = req.params;
    let {content} = req.body;
    let post = posts.find((p) => p.id === id);
   post.content = content;
    console.log(`Post edited - ${content}`);
    res.redirect("/posts")
   
  })

  app.delete("/posts/:id", (req, res) => {
    let {id} = req.params;
     posts = posts.filter((p) => p.id !== id);
    //  console.log(posts)
     res.redirect("/posts")
     console.log("Post deleted Succesfully")
  })
