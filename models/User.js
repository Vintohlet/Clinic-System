import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
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
    },
})

export const User = mongoose.model("User", userSchema)
