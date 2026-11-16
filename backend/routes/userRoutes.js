import express from "express";
import {
  getUsers,
  getUserById,
  updateUserRole,
  deleteUser,
  updateProfile
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, admin, getUsers);
router.get("/:id", protect, admin, getUserById);
router.put("/:id/role", protect, admin, updateUserRole);
router.delete("/:id", protect, admin, deleteUser);
router.put("/me", protect, updateProfile);

export default router;
