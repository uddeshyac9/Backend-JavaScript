import mongoose from "mongoose";


const chatSchema = new mongoose.Schema({
    from: {
        type: String,
        required : true,
    },    to: {
        type: String,
        required : true,
    },    message: {
        type: String,
        required : true,
        maxLength: 100,
    }
},{timestamps:true})

export const Chat = mongoose.model("Chat", chatSchema);