import mongoose from "mongoose";
import { Category } from "./category.models";

const productSchema = new mongoose.Schema({
    description: {
        require:true,
        type: String,
    }, name: {
        type: String,
        required: true,
    },productImage: {
        type: String,
    }, price: {
        required: true,
        type: Number,
        default: 0,
    }, stock: {
        default:0,
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category',
    }, owner: {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
    }
},{timestamps:true})


export const Product = mongoose.model("Product", productSchema)