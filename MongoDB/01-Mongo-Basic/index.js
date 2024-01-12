// Import necessary modules
import mongoose from "mongoose";
// import { User } from "./schema/userSchema.js";
import { Book } from "./schema/kindle/bookSchema.js";
// Function to connect to the MongoDB database
async function dbConnect() {
    // Connect to the MongoDB database at 'mongodb://127.0.0.1:27017/test'
    await mongoose.connect('mongodb://127.0.0.1:27017/amazon');

    // Use the following line if your database requires authentication
    // await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');
}

// Call the dbConnect function to establish a database connection
dbConnect()
    .then(() => {
        console.log("Db connection successfully");
    })
    .catch((err) => {
        console.log(err);
    });

// Commented out code for inserting a single user
// const user1 = new User({
//     name: 'Harshul',
//     email: 'harshul07@gmail.com',
//     age: 22,
//     password: 'Harshul07',
// });

// Save the single user to the database 
// user1.save()
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log('Error in Db inserting', err);
// });

// Commented out code for inserting multiple users using insertMany
// User.insertMany([{
//     name: "Qadar",
//     email: "qadar@gmail.com",
//     age: 22,
//     password: "qadar123",
// }, {
//     name: "Harshul",
//     email: "Harshul07@gmail.com",
//     age: 22,
//     password: "Harshul07",
// }, {
//     name: "Sarthak Tyagi",
//     email: "Sarthak199@gmail.com",
//     age: 24,
//     password: "Satvik44",
// }]).then((data) => {
//     console.log(data);
// });

// Commented out code for updating a user's age by ID
// const userId = '659ed08c6ace7e4efbc3c55e';
// User.findByIdAndUpdate(
//     userId,
//     { $set: { age: 23 } },
//     { new: true } // Set this option to true to get the updated document
// ).then((updatedUser) => {
//     console.log(updatedUser);
// }).catch((err) => {
//     console.log(err);
// });

// Commented out code for deleting a user with a specific age
// User.deleteOne({ age: 22 }).then((DeletedUser) => {
//     console.log(DeletedUser);
// }).catch((err) => {
//     console.log(err);
// });

// Commented out code for deleting a user by ID
// User.findByIdAndDelete('659f7f4ea01ac98ccc199006').then((DeletedUser) => {
//     console.log(DeletedUser);
// }).catch((err) => {
//     console.log(err);
// });
//inserting single book
// const book =    {
//       title: "Sambhog se Smadhi",
//       author: "Osho",
//       price: 0,
//       genre: ["Fiction", "Adventure","Sexual"],
//       category: "Spritual",
//     };

//     // Insert the single book into the MongoDB collection using create
//     Book.create(book)
//     .then((result) => {
//       console.log("Book inserted successfully:", result);
//     })
//     .catch((err) => {
//       console.log(err.errors.price.properties.message);
//     });
  
  







