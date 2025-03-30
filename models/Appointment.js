import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    appointmentTime: {
        type: Date,
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
    },
    appointmentFiles:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"File"
    },
})

export const Appointment = mongoose.model("Appointment", appointmentSchema)
