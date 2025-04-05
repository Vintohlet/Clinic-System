import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    appointmentId:{
         type: mongoose.Schema.Types.ObjectId,
            ref: "Appointment"
    },

    name :{
        type: String,
        required: true,
        trim: true
    },
    fileUrl:{
        type: String,
        required:true,
        trim: true
    }
})
export const File = mongoose.model("file", fileSchema)