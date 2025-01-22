import express from "express";
import {
  deleteUser,
  DueFee,
  getAllDeletedUsers,
  getAllUsers,
  register,
  seatsAllocated,
  sendfeeEmail,
  sendfeeRemainder,
  update,
  updateUsers,
} from "../controllers/userController.js";
import { adminMiddleware } from "../config/adminMiddleware.js";

const router = express.Router();

router.post("/register", adminMiddleware, register);
router.delete("/delete/:id", deleteUser);
router.get("/get/:month/:year", adminMiddleware, getAllUsers);
router.get("/getdue/:month/:year", adminMiddleware, DueFee);
router.post("/sendEmail/:month/:year/:id", adminMiddleware, sendfeeEmail);
router.post(
  "/sendEmailRemainder/:month/:year/:id",
  adminMiddleware,
  sendfeeRemainder
);
router.post("/update/:id", adminMiddleware, update);
router.get("/getSeat/:month/:year/:shift", adminMiddleware, seatsAllocated);
router.get("/getAllDelete", getAllDeletedUsers);

export default router;
