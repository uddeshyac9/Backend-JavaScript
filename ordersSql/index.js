import express from "express"
import path from "path"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
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
      console.log(`⚙️  Server is running at port : http://localhost:${process.env.PORT}`);
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
    let mobileCount = result[0].count;
    res.render("home", {mobileCount});
     
    // connection.end();  Close the connection after executing the query
  } catch (err) {
    console.error("Error in home route:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get('/orders', async (req,res) => {
  try {
  
   const [orders] = await connection.query("SELECT * FROM mobiles");
    // console.log(orders);
   res.render('orders', {orders})

  } catch (error) {
   console.error("Error in home route:", err);
   res.status(500).send("Internal Server Error");
  }
 
});

app.get('/orders/new', (req,res) => {
  res.render('newOrder');
});
//edit page
app.get('/orders/:id/edit', async (req, res) => {
  try {
      const orderId = req.params.id;
      const [order] = await connection.query('SELECT * FROM mobiles WHERE id = ?', [orderId]);
      // console.log(order);
      res.render('edit', { order: order[0] });
  } catch (error) {
      console.error("Error fetching order for edit:", error);
      res.status(500).send("Internal Server Error");
  }
});





//post request for new orders
app.post('/submitOrder', async (req, res) => {
  try {
    const formData = req.body;

    // Create a new order object from form data
    const newOrder = {
      name: formData.name,
      price: formData.price,
      salePrice: formData.salePrice,
      cardName: formData.cardName,
      billGenerated: formData.billGenerated,
      delivered: formData.delivered,
      quantity: formData.quantity,
      color: formData.color,
      bill_paid: formData.bill_paid
    };

    // SQL query to insert the new order into the 'mobiles' table
    const query = "INSERT INTO mobiles (name, price, salePrice, cardName, billGenerated, delivered, quantity, color, bill_paid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    // Execute the query and handle the result
    const [result] = await connection.query(query, [
      newOrder.name,
      newOrder.price,
      newOrder.salePrice,
      newOrder.cardName,
      newOrder.billGenerated,
      newOrder.delivered,
      newOrder.quantity,
      newOrder.color,
      newOrder.bill_paid
    ]);

    console.log("New Order inserted:", result);

    // Handle success, redirect, or send a response accordingly
    res.redirect('/orders');
  } catch (error) {
    // Handle error, log the details, and send an error response
    console.error("Error inserting new order:", error);
    res.status(500).send("Internal Server Error");
  }
});

//delete order 
app.delete('/orders/:id', async (req, res) => {
  try {
    const orderId = req.params.id;

    // SQL query to delete the order from the 'mobiles' table by ID
    const query = "DELETE FROM mobiles WHERE id = ?";

    // Execute the query and handle the result
    const [result] = await connection.query(query, [orderId]);
     
    // Check if any rows were affected
    if (result.affectedRows > 0) {
      console.log(`Order with ID ${orderId} deleted successfully`);
      // Handle success, redirect, or send a success response accordingly
      // res.status(200).send("Order deleted successfully");
      res.redirect('/orders')
    } else {
      console.log(`Order with ID ${orderId} not found`);
      // Handle case where the order with the given ID was not found
      res.status(404).send("Order not found");
    }
  } catch (error) {
    // Handle error, log the details, and send an error response
    console.error("Error deleting order:", error);
    res.status(500).send("Internal Server Error");
  }
});

// edit patch request 
app.patch('/orders/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const updatedOrder = req.body;

    // SQL query to update all columns of the order in the 'mobiles' table
    const query = `
      UPDATE mobiles
      SET
        name = ?,
        price = ?,
        salePrice = ?,
        cardName = ?,
        billGenerated = ?,
        delivered = ?,
        quantity = ?,
        color = ?,
        bill_paid = ?,
        payment_received = ?
      WHERE id = ?
    `;

    // Execute the query and handle the result
    const [result] = await connection.query(query, [
      updatedOrder.name,
      updatedOrder.price,
      updatedOrder.salePrice,
      updatedOrder.cardName,
      updatedOrder.billGenerated,
      updatedOrder.delivered,
      updatedOrder.quantity,
      updatedOrder.color,
      updatedOrder.bill_paid,
      updatedOrder.payment_received,
      orderId
    ]);

    // Check if any rows were affected
    if (result.affectedRows > 0) {
      console.log(`Order with ID ${orderId} updated successfully`);
      // Handle success, redirect, or send a success response accordingly
      res.redirect('/orders');
    } else {
      console.log(`Order with ID ${orderId} not found`);
      // Handle case where the order with the given ID was not found
      res.status(404).send("Order not found");
    }
  } catch (error) {
    // Handle error, log the details, and send an error response
    console.error("Error updating order:", error);
    res.status(500).send("Internal Server Error");
  }
});

