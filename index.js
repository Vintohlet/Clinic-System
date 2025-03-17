import express from "express"
import mongoose from "mongoose"
import doctorRoutes from "./routes/doctor.routes.js"
import patientRoutes from "./routes/patient.routes.js"
import appointmentRoutes from "./routes/appointment.routes.js"
import authRoutes from "./routes/auth.routes.js"


import "dotenv/config";
const DB_PASSWORD = process.env.DB_PASSWORD;
const connectionString = `mongodb+srv://ruslan:${DB_PASSWORD}@cluster0.hpt8o.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0`

async function connectDB() {
    try {
         await mongoose.connect(connectionString)
         console.log("Connected to DB!")
    } catch (error) {
        console.log("Error to connect DB")
        console.log(error)
    }
}
const app = express();

const PORT = 7777;
app.use(express.json()) 
app.use("/doctor",doctorRoutes)
app.use("/patient", patientRoutes)
app.use("/appointment",appointmentRoutes )
app.use("/auth", authRoutes)

app.listen(PORT, async () =>{
    await connectDB()
    console.log(`Server on http://localhost:${PORT}`)
})