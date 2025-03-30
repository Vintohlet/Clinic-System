const prescriptionSchema = new mongoose.Schema({
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },
    medications: [{
        name: String,
        dosage: String,
        instructions: String
    }],
    pdfUrl: {
        type: String,
        required: true
    },
    qrCodeUrl: {
        type: String,
        required: true
    }
});
export const Prescription = mongoose.model("Prescription", prescriptionSchema)