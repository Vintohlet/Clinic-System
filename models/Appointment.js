import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    appointmentTime: {
        type: String,
        required: true,
        trim: true
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor"
    },
    patient:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient"
    }
})

export const Appointment = mongoose.model("Appointment", appointmentSchema)
