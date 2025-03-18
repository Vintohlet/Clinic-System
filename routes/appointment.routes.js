import express from "express"
import AppointmentController from "../controllers/appointment.controller.js"
import { authUser, checkIsManager } from "../middlewares/auth.middleware.js";
const router = express.Router();
router.post("/",authUser,AppointmentController.create);
router.get("/",authUser,checkIsManager, AppointmentController.getAllAppointment);
router.get("/:id",authUser,AppointmentController.getAppointmentById)
router.delete("/:id",authUser,AppointmentController.deleteAppointmentById)
router.put("/:id",authUser,AppointmentController.updateAppointmentById)

export default router