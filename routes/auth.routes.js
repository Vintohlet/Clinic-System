import express from "express";
import AuthController from "../controllers/auth.controller.js";
import {registerValidator, loginValidator} from "../validators/auth.validator.js";
import { doctorRegisterValidator } from "../validators/doctor.validator.js";
const router = express.Router();

router.post("/register/user", registerValidator, AuthController.userRegister);
router.post("/register/doctor", doctorRegisterValidator, AuthController.doctorRegister);
router.post("/logout", AuthController.logout);
router.post("/login", loginValidator, AuthController.login);

export default router;