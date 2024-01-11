import mongoose from "mongoose";
 import { User } from "./schema/userSchema.js";



async function dbConnect() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
  
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  }
dbConnect()
.then(()=> {console.log("Db connection succesfully");})
.catch((err) => {console.log(err);})

// const user1 =  new User({
//   name: 'Harshul',
//   email: 'harshul07@gmail.com',
//   age: 22,
//   password: 'Harshul07',

// })
// user1.save()
// .then((res) => {console.log(res);})
// .catch((err) => {console.log('Error in Db inserting', err);})

//inserting multiple
// User.insertMany([{
//   name: "Qadar", 
//     email: "qadar@gmail.com",
//     age : 22,
//     password: "qadar123",
// }, {
//   name: "Harshul", 
//   email: "Harshul07@gmail.com",
//   age : 22,
//   password: "Harshul07",
// }, {
//   name: "Sarthak Tyagi", 
//   email: "Sarthak199@gmail.com",
//   age : 24,
//   password: "Satvik44",
// }

// ]).then((data) => {
//   console.log(data);
// })
// const userId = '659ed08c6ace7e4efbc3c55e';
// User.findByIdAndUpdate(
//    (userId),
//   { $set: { age: 23 } },
//    // Set this option to true to get the updated document
// )
//   .then((updatedUser) => {
//     console.log(updatedUser);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

  // User.deleteOne({age: 22}  ).then((DeletedUser) => {
  //   console.log(DeletedUser);
  // })
  // .catch((err) => {
  //   console.log(err);
  // });

  // User.findByIdAndDelete('659f7f4ea01ac98ccc199006' ).then((DeletedUser) => {
  //   console.log(DeletedUser);
  // })
  // .catch((err) => {
  //   console.log(err);
  // });