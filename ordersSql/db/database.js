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
