import mongoose from "mongoose";

const deleteSchema = new mongoose.Schema({
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
  joinDate: {
    type: Date,
    default: Date.now,
  },
  seat: {
    type: Number,
  },
});


export default mongoose.model("delete", deleteSchema);
