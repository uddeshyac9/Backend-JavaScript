import mongoose from "mongoose";
import { User } from "./user.models";

const subTodosSchema = new mongoose.Schema({
    content: {
        type:String,
        required:true,
    },
    complete: {
        type: Boolean,
        default: false,
    }, createdBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
   
});

export const subTodo = mongoose.model('subTodo');