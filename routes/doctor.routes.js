import express from "express"
import DoctorController from "../controllers/doctor.controller.js"
import { authUser, checkIsManager } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/",authUser, checkIsManager,DoctorController.create);
router.get("/",authUser,DoctorController.getAllDoctors);
router.get("/:id",authUser,DoctorController.getDoctorsById)
router.delete("/:id",authUser, checkIsManager, DoctorController.deleteDoctorById)
router.patch("/:id",authUser, checkIsManager, DoctorController.updateDoctorById)

export default router