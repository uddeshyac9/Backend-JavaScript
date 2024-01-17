import express from "express"
import path from "path"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import dbconnect from "./db/database.js";
import dotenv from 'dotenv';
import methodOverride from "method-override";



const app = express();
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
dotenv.config({
  path: ".env"
})
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.set("views" , path.join(__dirname, "/views"))
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"/public")))
dbconnect()
.then(()=> {
  app.on("error", (error) => {
      console.log("Error:", error);
      throw error
  })
  app.listen(process.env.PORT || 3000, () =>{
      console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
  })
  
}).catch((error) => {
  console.log("MONGO db connection failed !!! ", error);
})

const connection = await dbconnect(); // Establish the database connection
//home route
app.get('/', async (req, res) => {
  try {
    
    const [result] = await connection.query("SELECT COUNT(*) AS count FROM mobiles");
    // console.log("Query succesfull");
    // console.log(result);
    let userCount = result[0].count;
    res.render("home", {mobileCount});
     
    // connection.end();  Close the connection after executing the query
  } catch (err) {
    console.error("Error in home route:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get('/user', async (req,res) => {
   try {
   
    const [users] = await connection.query("SELECT * FROM user");
    // console.log(users);
    res.render('users', {users})

   } catch (error) {
    console.error("Error in home route:", err);
    res.status(500).send("Internal Server Error");
   }
  
});
app.get('/user/new', (req,res) => {
  res.render('createuser');
});

//add user
app.post("/user/new", async (req, res) => {
  try {
   
    let { username, email, password } = req.body;
 // Log the entire request body to check what's being received
    console.log('Received request body:', req.body);

    // Ensure that req.body exists and has the expected properties
    if (!req.body || !req.body.username || !req.body.email || !req.body.password) {
      return res.status(400).send('Bad Request: Missing required fields');
    }
   
    let query = "INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)";
    const [user] = await connection.query(query, [
      uuidv4(),
      username,
      email,
      password,
    ]);
    console.log(user);
    res.redirect("/");
    
  } catch (error) {
    console.error("Error in home route:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/user/:id/edit", async (req, res) => {
  try {
    let {id} = req.params; // Access the id parameter correctly
    let q = `SELECT * FROM user WHERE id = "${id}"`;
    const [result] = await connection.query(q);
    const user = result[0];
    res.render('edit', { user });
    console.log(user);
  } catch (err) {
    console.error("Error in edit route:", err);
    res.status(500).send("Internal Server Error");
  }
});


// edit form
app.patch("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username: formUsername, password: formPassword } = req.body;
    let q = `SELECT * FROM user WHERE id = "${id}"`;
    // Fetch user information from the database using promises
    const [result] = await connection.query(q);
    if (result.length === 0) {
      // Handle the case where the user with the specified id is not found
      res.status(404).send("User not found");
      return;
    }
    const user = result[0];

      
          // For example, you might have an UPDATE query here
    let q2 = `UPDATE user SET username = "${formUsername}" Where id = "${id}"`
    // Update user information in the database (you need to implement this)
    if (formPassword === user.password) {
     await connection.query(q2)
     res.redirect('/user');
     console.log(`Previous username : ${user.username} Updated username : ${formUsername}`);
    } else {
      res.status(401).send("Wrong Password");
    }

    // Send a response after updating the user information

    
  } catch (err) {
    console.error("Error in patch route:", err);
    res.status(500).send("Internal Server Error");
  }
});
// delete route
app.get("/user/:id/delete", async (req, res) => {
  try {
    let {id} = req.params; // Access the id parameter correctly
    let q = `SELECT * FROM user WHERE id = "${id}"`;
    const [result] = await connection.query(q);
    const user = result[0];
    res.render('delete', { user });
    console.log(user);
  } catch (err) {
    console.error("Error in edit route:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/user/:id", async (req,res) => {
try {
  const { id } = req.params;
  const { email: formEmail, password: formPassword } = req.body;
  let q = `SELECT * FROM user WHERE id = "${id}"`;
  // Fetch user information from the database using promises
  const [result] = await connection.query(q);
  const user = result[0];
  
  if (formEmail === user.email && formPassword === user.password) {
    let q2 = `DELETE FROM user WHERE id ="${id}"`
    await connection.query(q2);
    res.redirect('/user');
    console.log(`user deleted successfully ${user.username}`);
  }   else {
    res.status(401).send("Wrong Email or Password");
  }

} 

catch (err) {
  console.error("Error in Delete route:", err);
  res.status(500).send("Internal Server Error");
}

})







