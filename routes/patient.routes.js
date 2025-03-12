import express from "express"
import PatientController from "../controllers/patient.controller.js"

const router = express.Router();

router.post("/",PatientController.create);
router.get("/",PatientController.getAllPatients)
router.get("/:id",PatientController.getPatientsById);
router.delete("/:id", PatientController.deletePatientById);
router.put("/:id",PatientController.updatePatientById)

export default router