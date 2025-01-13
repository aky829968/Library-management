import express from "express";
const router = express.Router();
import { payment } from "../controllers/paymentController.js";
import FeePayment from "../models/feeModel.js";

router.post("/payment", payment);
router.get("/status/:userId/:month", async (req, res) => {
  const { userId, month } = req.params;

  try {
    const payment = await FeePayment.findOne({ user: userId, month });
    if (!payment) {
      return res.status(404).json({ message: "Fee not paid for this month." });
    }

    res.json({ message: "Fee paid", payment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
