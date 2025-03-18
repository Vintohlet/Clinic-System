import express from "express";
import AuthController from "../controllers/auth.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/register/patient", AuthController.userRegister)
router.post("/register/doctor", AuthController.doctorRegister)
router.post("/login/patient", AuthController.userLogin)
router.post("/login/doctor", AuthController.doctorLogin)

export default router;