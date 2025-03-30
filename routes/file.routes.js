import express from "express"
import fileController from "../controllers/file.controller.js"
import { upload } from "../middlewares/multer.middleware.js";
import { checkIsDoctor } from "../middlewares/auth.middleware.js";
import { checkIsManager } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/", checkIsManager, fileController.getAll)
router.post("/",upload.single("file-doc"), checkIsDoctor,fileController.create)

export default router