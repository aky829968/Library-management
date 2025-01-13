import mongoose from "mongoose";
const feePaymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  amount: { type: Number, required: true },
  month: { type: String, required: true }, // Example: '2024-01'
  datePaid: { type: Date, default: Date.now },
});

export default mongoose.model("FeePayment", feePaymentSchema);
