import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  aadhar: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
    unique: false,
  },
  gender: {
    type: String,
  },
  shift: {
    type: String,
    enum: ["morning", "evening", "fullday"],
  },

  fees: {
    type: Number,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
  },
});

userSchema.add({
  month: {
    type: String,
  },
  year: {
    type: Number,
  },
  feeSubmit: {
    type: Number,
    default: 0,
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
  seat: {
    type: Number,
  },
});
export default mongoose.model("user", userSchema);
