import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connetion from "./config/connectDb.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import feeRoutes from "./routes/feeRoutes.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 4000;
app.use(
  cors({
    origin: "https://library-management-six-pearl.vercel.app/",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/fee", feeRoutes);

app.listen(port, () => {
  console.log(`server running at ${port}`);
  connetion();
});
