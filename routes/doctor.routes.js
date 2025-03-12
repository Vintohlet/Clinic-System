import express from "express"
import DoctorController from "../controllers/doctor.controller.js"

const router = express.Router();


router.post("/",DoctorController.create);
router.get("/",DoctorController.getAllDoctors);
router.get("/:id",DoctorController.getDoctorsById)
router.delete("/:id",DoctorController.deleteDoctorById)
router.put("/:id",DoctorController.updateDoctorById)

export default router