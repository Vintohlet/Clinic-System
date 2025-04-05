import express from "express"
import AppointmentController from "../controllers/appointment.controller.js"
import { authUser, checkIsManager } from "../middlewares/auth.middleware.js";
import { appointmentValidator } from "../validators/appointment.validator.js";
import appointmentController from "../controllers/appointment.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
const router = express.Router();
router.post("/",authUser,appointmentValidator,AppointmentController.create);
router.get("/",authUser,authenticateToken,checkIsManager, AppointmentController.getAllAppointments);
router.get("/:id", authUser, appointmentController.getAppointmentsByPatientId)
router.get("/:id", authUser, appointmentController.getAppointmentsByDoctorId)
router.get("/:id",authUser,AppointmentController.getAppointmentById)
router.delete("/:id",authUser,AppointmentController.deleteAppointmentById)
router.patch("/:id",authUser,appointmentValidator,AppointmentController.updateAppointmentById)

export default router