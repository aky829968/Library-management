import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import monthModel from "../models/monthModel.js";
import nodemailer from "nodemailer";

export const register = async (req, res) => {
  let id = req.user;
  // console.log(id);
  // console.log(req.body);
  let {
    name,
    email,
    fatherName,
    contact,
    aadhar,
    gender,
    month,
    shift,
    fees,
    address,
    year,
    seat,
  } = await req.body;
  try {
    if (
      !name ||
      !email ||
      !fatherName ||
      !contact ||
      !aadhar ||
      !gender ||
      !month ||
      !year ||
      !shift ||
      !fees ||
      !address ||
      !seat
    ) {
      return res
        .status(200)
        .json({ message: "All feilds are required", success: false });
    }
    // const user = await userModel.findOne({ email,month,year });
    // if (user) {
    //   // console.log(user);

    //   return res.status(400).json({
    //     message: "User already registerd with this email",
    //     success: false,
    //   });
    // }
    let data = await userModel.create({
      name,
      email,
      fatherName,
      contact,
      aadhar,
      gender,
      shift,
      fees,
      month,
      seat,
      year,
      address,
      admin: [id],
    });
    let monthe = await monthModel.findOne({ month, year });
    if (!monthe) {
      monthe = await monthModel.create({
        month,
        year,
      });
    }
    await monthe.users.push(data._id);
    await monthe.save();

    return res
      .status(200)
      .json({ message: "User registered successfully", success: true });
  } catch (error) {
    return res.status(400).json({
      message: "Some error occured",
      success: false,
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res
        .status(200)
        .json({ message: "User not found", success: false });
    }
    await userModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "User deleted", success: true });
  } catch (error) {
    return res.status(400).json({
      message: "Some error occured",
      success: false,
      error: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { month, year } = req.params;
    const users = await monthModel.findOne({ month, year }).populate("users");
    if (!users) {
      return res.status(200).json({ message: "No user found", success: false });
    }
    let income = 0;
    users.users.forEach((user) => {
      income += user.feeSubmit;
    });
    return res.status(200).json({ users, success: true, income });
  } catch (error) {
    return res.status(400).json({
      message: "Some error occured",
      success: false,
      error: error.message,
    });
  }
};

export const DueFee = async (req, res) => {
  try {
    const { month, year } = req.params;
    const users = await monthModel.findOne({ month, year }).populate("users");
    if (!users) {
      return res.status(200).json({ message: "No user found", success: false });
    }

    let dueUsers = users.users.filter((user) => user.fees > user.feeSubmit);

    return res.status(200).json({ dueUsers, success: true });
  } catch (error) {
    return res.status(400).json({
      message: "Some error occured",
      success: false,
      error: error.message,
    });
  }
};

const sendEmail = async (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "adityakumar262003@gmail.com",
      pass: "kanr nahe xknu fcom",
    },
  });
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: "Krishna Library", // sender address
      to: `${email}`, // list of receivers
      subject: `${subject}`, // Subject line
      text: `${text} `, // plain text body
      html: `<b>${text}</b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }

  main().catch(console.error);
};

export const sendfeeEmail = async (req, res) => {
  try {
    const { month, year } = req.params;
    const users = await monthModel.findOne({ month, year }).populate("users");
    if (!users) {
      return res.status(200).json({ message: "No user found", success: false });
    }

    let dueUsers = users.users.filter((user) => user.fees > user.feeSubmit);
    dueUsers.forEach((user) => {
      sendEmail(
        user.email,
        "Fee Reminder",
        "Please submit your fee as soon as possible  "
      );
    });

    return res.status(200).json({ message: "Email sent", success: true });
  } catch (error) {
    return res.status(400).json({
      message: "Some error occured",
      success: false,
      error: error.message,
    });
  }
};

export const seatsAllocated = async (req, res) => {
  try {
    const { month, year, shift } = req.params;
    console.log(req.params);
    const users = await monthModel.findOne({ month, year }).populate("users");
    if (!users) {
      return res.status(200).json({ message: "No user found", success: false });
    }
    let seat = [];
    users.users.forEach((user) => {
      if (user.shift === shift) {
        seat.push(user.seat);
      }
    });
    console.log(seat);
    return res.status(200).json({ seat, success: true });
  } catch (error) {
    return res.status(400).json({
      message: "Some error occured",
      success: false,
      error: error.message,
    });
  }
};
const update = async (user, newmonth, newyear) => {
  let data = await userModel.create({
    name: user.name,
    email: "jjjkn",
    fatherName: user.fatherName,
    contact: user.contact,
    aadhar: user.aadhar,
    gender: user.gender,
    shift: user.shift,
    fees: user.fees,
    month: newmonth,
    seat: user.seat,
    year: newyear,
    address: user.address,
  });
  // console.log(newmonth);
  let monthe = await monthModel.findOne({ month: newmonth, year: newyear });
  // console.log(monthe);
  if (!monthe) {
    monthe = await monthModel.create({
      month: newmonth,
      year: newyear,
    });
  }
  await monthe.users.push(data._id);
  await monthe.save();
  // console.log(monthe);
};

export const updateUsers = async (req, res) => {
  try {
    const { month, year } = req.params;
    const { newmonth, newyear } = req.body;
    const users = await monthModel.findOne({ month, year }).populate("users");
    if (!users) {
      return res.status(200).json({ message: "No user found", success: false });
    }
    users.users.forEach(async (user) => {
      await update(user, newmonth, newyear);
    });
    return res.status(200).json({ message: "Users updated", success: true });
  } catch (error) {
    return res.status(400).json({
      message: "Some error occured",
      success: false,
      error: error.message,
    });
  }
};
