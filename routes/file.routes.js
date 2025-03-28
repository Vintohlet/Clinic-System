import express from "express"
import fileController from "../controllers/file.controller.js"
import { upload } from "../middlewares/multer.middleware.js";
const router = express.Router();

router.get("/", fileController.getAll)
router.post("/",upload.single("file-img"), fileController.create)

export default router