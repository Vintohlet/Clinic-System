import express from "express"
import fileController from "../controllers/file.controller.js"
import { upload } from "../middlewares/multer.middleware.js";
import { checkIsDoctor, authUser} from "../middlewares/auth.middleware.js";
import { checkIsManager } from "../middlewares/auth.middleware.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/",authenticateToken, checkIsManager, fileController.getAll)
router.get("/files/by-appointment/:appointmentId",authUser, fileController.getByAppointmentId);
router.post("/",upload.single("file-doc"),authenticateToken, checkIsDoctor,fileController.create)

export default router