import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    appointmentTime: {
        type: String,
        required: true,
        trim: true
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor"
    },
    patientId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient"
    }
})

export const Appointment = mongoose.model("Appointment", appointmentSchema)
