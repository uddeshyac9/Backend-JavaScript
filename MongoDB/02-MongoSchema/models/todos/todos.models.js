import mongoose from "mongoose";
import { User } from "./user.models";
import { subTodo } from "./subtodos.models";

const todosSchema = new mongoose.Schema({
title: {
    type:String,
    required:true,
},
complete: {
    type: Boolean,
    default:false,
},
createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
},
subTodos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'subTodo',
}]

},{timestamps:true});

export const Todo = mongoose.model('Todo', todosSchema);