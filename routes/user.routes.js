import express from "express"
import UserController from "../controllers/user.controller.js"
import { authUser, checkIsManager, authenticateToken} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/",authUser,authenticateToken, checkIsManager,UserController.getAllUsers)
router.get("/me",authUser,UserController.getMe)
router.get("/:id",authUser,authenticateToken, checkIsManager,UserController.getUserById);
router.delete("/:id",authUser,authenticateToken, checkIsManager, UserController.deleteUserById);
router.put("/:id",authUser,UserController.updateUserById)

export default router