import mongoose from "mongoose";

const medicalRecordsSchema = new mongoose.Schema({

    
}, {timestamps:true});


export const MedicalRecords = mongoose.model("MediacalRecords", medicalRecordsSchema)