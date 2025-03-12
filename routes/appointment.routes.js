import express from "express"
import AppointmentController from "../controllers/appointment.controller.js"

const router = express.Router();

router.post("/",AppointmentController.create);
router.get("/",AppointmentController.getAllAppointment);
router.get("/:id",AppointmentController.getAppointmentById)
router.delete("/:id",AppointmentController.deleteAppointmentById)
router.put("/:id",AppointmentController.updateAppointmentById)

export default router