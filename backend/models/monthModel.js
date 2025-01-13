import mongoose from "mongoose";

const monthSchema = new mongoose.Schema({
  month: {
    type: String,
  },
  year: {
    type: Number,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

export default mongoose.model("month", monthSchema);
