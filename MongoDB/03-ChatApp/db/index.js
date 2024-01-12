import mongoose from "mongoose";
import {Chat} from '../models/chat.models.js'

const connectDb = async () => {
    try {
        await mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);
        console.log(`\n MongoDB Connected !! DB Name: ${process.env.DB_NAME}`);
    } catch (error) {
        console.error("MongoDB Connection Failed:", error);
        process.exit(1)
        
    }
}
// const chatArray = [
//     {
//         from: 'Alice',
//         to: 'Bob',
//         message: 'Hey, how are you doing?',
//     },
//     {
//         from: 'Bob',
//         to: 'Alice',
//         message: 'Im doing well, thanks! How about you?',
//     },
//     {
//         from: 'Charlie',
//         to: 'David',
//         message: 'Lets catch up for coffee this weekend.',
//     },
//     {
//         from: 'David',
//         to: 'Charlie',
//         message: 'Sure, Im free on Saturday. What time works for you?',
//     },
//     {
//         from: 'Eva',
//         to: 'Frank',
//         message: 'Congratulations on your new job!',
//     },
//     {
//         from: 'Frank',
//         to: 'Eva',
//         message: 'Thanks! I am really excited about it.',
//     },
//     // Add more chat objects as needed
// ];


// Chat.insertMany(chatArray)
// .then((res) => { console.log(res)})
// .catch((err) => {console.log(err);})


export default connectDb;