import FeePayment from "../models/feeModel.js";
import monthModel from "../models/monthModel.js";
import mongoose from "mongoose";
import userModel from "../models/userModel.js";

export const payment = async (req, res) => {
  let { userId, amount, month, year } = req.body;
  // console.log("req.body", req.body);
  amount = parseInt(amount);
  try {
    let user = await userModel.findById(userId);

    let remainingFees = user.feeSubmit + amount;
    // Update user fees directly in the `monthModel`
    await userModel.updateOne(
      { _id: userId, month: month, year: year },
      { $set: { feeSubmit: remainingFees } }
    );
    res.status(201).json({
      message: "Payment updated successfully.",
      success: true,
      // updatedFees: remainingAmount,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
