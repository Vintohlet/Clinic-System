import mongoose from "mongoose";

const specializationSchema = new mongoose.Schema({
    speciality: {
        type: String,
        required: true,
    },
    experience:{
        type: Number,
        required: true,
        min: 0
    }
},{
    _id: false
})

const doctorSchema = new mongoose.Schema({
    doctorName: {
        type: String,
        required: true,
        trim: true
    },
    speciality:{
        type: specializationSchema,
        required: true
    }

})

export const Doctor = mongoose.model("Doctor", doctorSchema)
