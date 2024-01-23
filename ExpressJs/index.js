import express from "express";
const app = express();

// console.dir(app)
const port = 3000;

app.listen(port, ()=> {
    console.log(`Server Started at Port ${port}`);
})

// app.use((req,res) => {
//     console.log("Request Received");
//     console.log(req)
// })
// app.use((req,res) => {
//     console.log("Request Recived");
//     res.send("<h1>This is basic Responce</h1>")
    // res.send({
    //     name: "apple",
    //     color:"red",
    // })

// })

app.get("/", (req,res) => {
    res.send("Hello i am  Root ")
})



app.get("/:username/:id", (req,res) => {
 let {username, id} = req.params 
   console.log(req.params)
    res.send(`<h1>Hello Welcome to the page of ${username}</h1>`)
})

app.get("/search", (req,res) => {
    console.log(req.query);
    let {q} = req.query
    if(!q) {
        res.send("<h1>Nothing Searched</h1>")
    }

    res.send(`<h1>Serch Result for query: ${q}</h1>`)
})

// app.get("*", (req,res) => {
//     res.send("<h1>This Path does not exist</h1>")
// })
// app.post("/",(req,res) => {
//     res.send('You send a Post request to root')
// })