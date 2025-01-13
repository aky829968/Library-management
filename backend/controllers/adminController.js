import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import adminModel from "../models/adminPanel.js";

export const adminRegsiter = async (req, res) => {
  console.log(req.body);
  let { bussinessName, email, password, contact } = await req.body;
  try {
    if (!bussinessName || !email || !password || !contact) {
      return res
        .status(200)
        .json({ message: "All feilds are required", success: false });
    }
    const user = await adminModel.findOne({ email });
    if (user) {
      return res.status(200).json({
        message: "User already registerd with this email",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    adminModel.create({
      bussinessName,
      email,
      password: hashedPassword,
      contact,
    });
    return res
      .status(200)
      .json({ message: "User registered successfully", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  let { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(200)
        .json({ message: "All feilds are required", success: false });
    }
    const user = await adminModel.findOne({ email });
    if (!user) {
      return res
        .status(200)
        .json({ message: "User not found", success: false });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .json({ message: "Invalid credentials", success: false });
    }
    const token = jwt.sign({ id: user._id }, "secretkey");
    return res
      .status(200)
      .json({ message: "Login success", success: true, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
