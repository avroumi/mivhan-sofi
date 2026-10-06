import { Router } from "express";
import {
  getAllUsersController,
  loginController,
  registerController,
  getCurrentUserController,
  deleteUserController,
} from "../controllers/usersControllers.js";
import {
  ValidLogin,
  ValidRegister,
  ValidUserId,
} from "../schema/userSchema.js";
import { validateMiddleware } from "../utils/validateMiddelware.js";
import { authMiddelware } from "../utils/authMiddelware.js";

const router = Router();

router.get("/me", authMiddelware, getCurrentUserController);
router.get("/users", authMiddelware, getAllUsersController);
router.post("/login", validateMiddleware(ValidLogin), loginController);
router.post(
  "/register",
  authMiddelware,
  validateMiddleware(ValidRegister),
  registerController,
);
router.delete(
  "/users/:id",
  authMiddelware,
  validateMiddleware(ValidUserId, "params"),
  deleteUserController,
);

export default router;
