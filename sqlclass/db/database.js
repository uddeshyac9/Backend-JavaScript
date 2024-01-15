import mysql from 'mysql2/promise'; // Import the promise-based version
//import { faker } from '@faker-js/faker';


async function dbconnect() {
    try {
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD
      });
      console.log("Database connection successful");
     return connection;
    } catch (err) {
        console.error("Database Connection Failed:", err);
        process.exit(1)
    }
    
  }

  export default dbconnect;















  

  // to generate and insert data in database 
      //    let query = "INSERT INTO user(id, username, email, password) VALUES ?";
    //    let users = [];
    //    for (let i = 1; i < 100; i++) {
    //     users.push(getRandomUser())
    //    }
      //  console.log(user)
    //   const [result] = await connection.query(query,[users]);
    //   console.log(result); 
  //function 
//   let getRandomUser = ()=> {
//     return [
  
//       faker.string.uuid(),
//       faker.internet.userName(),
//        faker.internet.email(),
//        faker.internet.password(),
      
//     ];
//   }
  