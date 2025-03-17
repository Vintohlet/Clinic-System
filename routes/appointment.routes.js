import express from "express"
import AppointmentController from "../controllers/appointment.controller.js"
import { authUser } from "../middlewares/auth.middleware.js";
const router = express.Router();
router.post("/",authUser,AppointmentController.create);
router.get("/",authUser,AppointmentController.getAllAppointment);
router.get("/:id",authUser,AppointmentController.getAppointmentById)
router.delete("/:id",authUser,AppointmentController.deleteAppointmentById)
router.put("/:id",authUser,AppointmentController.updateAppointmentById)

export default routerg