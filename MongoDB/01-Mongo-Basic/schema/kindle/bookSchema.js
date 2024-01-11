import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author :{
        type: String,
        
    },
    price : {
        type : Number,
        required: true,
        min:[0,"Price is Negative"],
    },
    discount: {
        type: Number,
        default: 0,
    },
    genre: [String],
    category: {
        type: String,
        enum: ['Spritual', 'Non Spritual']
    }
},{timestamps: true})

export const Book = mongoose.model("Book", bookSchema);