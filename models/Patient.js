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
    appointments:{
          type: [mongoose.Schema.Types.ObjectId],
          ref: "Appointment"
    }
})

export const Patient = mongoose.model("Patient", patientSchema)
