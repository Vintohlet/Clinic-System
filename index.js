import express from "express"
import mongoose from "mongoose"
import doctorRoutes from "./routes/doctor.routes.js"
import userRoutes from "./routes/user.routes.js"
import appointmentRoutes from "./routes/appointment.routes.js"
import authRoutes from "./routes/auth.routes.js"
import fileRoutes from "./routes/file.routes.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import { setupSwagger } from "./swagger.js"
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
app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true,               
}));
app.use(cookieParser())
app.use(express.json()) 
app.use("/doctor",doctorRoutes)
app.use("/user", userRoutes)
app.use("/appointment",appointmentRoutes )
app.use("/auth", authRoutes)
app.use("/files",fileRoutes)

app.listen(PORT, async () =>{
    await connectDB();
    setupSwagger(app)
    console.log(`Server on http://localhost:${PORT}`)
})