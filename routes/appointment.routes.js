import express from "express"
import AppointmentController from "../controllers/appointment.controller.js"
import { authUser, checkIsManager } from "../middlewares/auth.middleware.js";
import { appointmentValidator } from "../validators/appointment.validator.js";
const router = express.Router();
router.post("/",authUser,appointmentValidator,AppointmentController.create);
router.get("/",authUser,checkIsManager, AppointmentController.getAllAppointment);
router.get("/:id",authUser,AppointmentController.getAppointmentById)
router.delete("/:id",authUser,AppointmentController.deleteAppointmentById)
router.put("/:id",authUser,appointmentValidator,AppointmentController.updateAppointmentById)

export default router