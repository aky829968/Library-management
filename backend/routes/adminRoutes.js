import express from "express";
import { adminRegsiter, login } from "../controllers/adminController.js";
import { adminMiddleware } from "../config/adminMiddleware.js";
const router = express.Router();

router.post("/register",  adminRegsiter);
router.post("/login", login);

export default router;
