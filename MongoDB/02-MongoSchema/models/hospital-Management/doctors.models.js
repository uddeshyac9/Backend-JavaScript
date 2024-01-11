import mongoose from "mongoose";

const doctorsSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    }, qualification:{
       type:String,
       required:true,
    },  salary:{
        type:String,
        required:true,
    }, worksInhospital:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Hospital"
    }], experienceInYears: {
        type:Number,
        default:0,
    }

},{timestamps:true})

export const Doctors = mongoose.model('Doctors', doctorsSchema);