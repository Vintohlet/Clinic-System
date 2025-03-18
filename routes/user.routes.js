import express from "express"
import UserController from "../controllers/user.controller.js"

const router = express.Router();

router.post("/",UserController.create);
router.get("/",UserController.getAllUsers)
router.get("/:id",UserController.getUserById);
router.delete("/:id", UserController.deleteUserById);
router.put("/:id",UserController.updateUserById)

export default router