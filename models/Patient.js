import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required:true,
        min: 0
    },
    email:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required:true
    },
    appointments:{
          type: [mongoose.Schema.Types.ObjectId],
          ref: "Appointment"
    }
})

export const Patient = mongoose.model("Patient", patientSchema)
