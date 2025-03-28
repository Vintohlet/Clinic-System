import express from "express";
import AuthController from "../controllers/auth.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
import {registerValidator, loginValidator} from "../validators/auth.validator.js";
const router = express.Router();

router.post("/register/user", registerValidator, AuthController.userRegister);
router.post("/register/doctor", registerValidator, AuthController.doctorRegister);
router.post("/login", loginValidator, AuthController.login);

export default router;