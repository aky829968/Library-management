import express from "express";
import {
  deleteUser,
  DueFee,
  getAllUsers,
  register,
  seatsAllocated,
  sendfeeEmail,
  updateUsers,
} from "../controllers/userController.js";
import { adminMiddleware } from "../config/adminMiddleware.js";

const router = express.Router();

router.post("/register", adminMiddleware, register);
router.delete("/delete/:id", deleteUser);
router.get("/get/:month/:year", adminMiddleware, getAllUsers);
router.get("/getdue/:month/:year", adminMiddleware, DueFee);
router.post("/sendEmail/:month/:year", adminMiddleware, sendfeeEmail);
router.post("/update/:month/:year", adminMiddleware, updateUsers);
router.get("/getSeat/:month/:year/:shift", adminMiddleware, seatsAllocated);

export default router;
