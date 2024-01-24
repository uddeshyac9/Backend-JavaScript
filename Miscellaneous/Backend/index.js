const express  = require("express");
const app = express()
const port = 8080;
 app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get("/register", (req,res) => {
    const {username} = req.query;
    res.send(`Standard Get responce Welcome ${username}`)
})
app.post("/register",(req,res) => {
    const {username} = req.body;
    res.send(`Standard Get responce Welcome ${username}`)
    console.log(username)
  
 
})

app.listen(port, ()=> {
    console.log(`listning on port ${port}`)
    
})