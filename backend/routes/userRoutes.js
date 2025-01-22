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

router.post("/register", register);
router.delete("/delete/:id", deleteUser);
router.get("/get/:month/:year", getAllUsers);
router.get("/getdue/:month/:year", DueFee);
router.post("/sendEmail/:month/:year/:id", sendfeeEmail);
router.post(
  "/sendEmailRemainder/:month/:year/:id",

  sendfeeRemainder
);
router.post("/update/:id", update);
router.get("/getSeat/:month/:year/:shift", seatsAllocated);
router.get("/getAllDelete", getAllDeletedUsers);

export default router;
