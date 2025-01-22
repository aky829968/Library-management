import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import monthModel from "../models/monthModel.js";
import nodemailer from "nodemailer";
import deleteModel from "../models/deleteModel.js";

export const register = async (req, res) => {
  // let id = req.user;
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

const sendEmail = async (email, month, name) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "palashwani29623@gmail.com",
      pass: "fvar pzys pedg vtpq",
    },
  });
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: "Krishna Library", // sender address
      to: `${email}`, // list of receivers
      subject: `Reminder: Upcoming Fee Submission Deadline`, // Subject line
      // plain text body
      html: `<h2>Dear ${name}</h2>,
<b>
This is a gentle reminder that the fee for  library membership of<span style="color: red;"> ${month} </span> month is expiring after some days. Kindly ensure the <span style="color: red;">payment</span> is made before the deadline to avoid any inconvenience.

If you have already submitted the fee, please disregard this message. Feel free to reach out if you have any questions or require assistance.
</b>
<br>
Best regards,
<h2>Krishna Library</h2> `, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }

  main().catch(console.error);
};

const sendEmailRemainder = async (email, month, name) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "palashwani29623@gmail.com",
      pass: "fvar pzys pedg vtpq",
    },
  });
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: "Krishna Library", // sender address
      to: `${email}`, // list of receivers
      subject: `Reminder: Fee Submission for ${month}`, // Subject line // plain text body
      html: `<h2>Dear ${name}</h2>
<b>
I hope this message finds you well. I am writing to kindly remind you that the fee for library membership for the month of<span style="color: red;"> ${month}</span> is due. Please Submit your fess as soon as possible.

Thank you for your assistance.
</b>
<br><br>
Regards,
<h2>Krishna Library</h2>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }

  main().catch(console.error);
};

export const sendfeeEmail = async (req, res) => {
  try {
    const { month, year, id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(200).json({ message: "No user found", success: false });
    }

    sendEmail(user.email, user.month, user.name);

    return res.status(200).json({ message: "Email sent", success: true });
  } catch (error) {
    return res.status(400).json({
      message: "Some error occured",
      success: false,
      error: error.message,
    });
  }
};
export const sendfeeRemainder = async (req, res) => {
  try {
    const { month, year, id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(200).json({ message: "No user found", success: false });
    }

    sendEmailRemainder(user.email, user.month, user.name);

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
export const update = async (req, res) => {
  const { id } = req.params;
  const { newmonth, newyear, joinDate } = req.body;
  const user = await userModel.findById(id);
  let monthe = await monthModel.findOne({ month: newmonth, year: newyear });
  // console.log(monthe);
  if (!monthe) {
    monthe = await monthModel.create({
      month: newmonth,
      year: newyear,
    });
  }
  let data = await userModel.create({
    name: user.name,
    email: user.email,
    fatherName: user.fatherName,
    contact: user.contact,
    aadhar: user.aadhar,
    gender: user.gender,
    shift: user.shift,
    fees: user.fees,
    month: newmonth,
    seat: user.seat,
    joinDate: joinDate,
    year: newyear,
    address: user.address,
  });
  // console.log(newmonth);

  await monthe.users.push(data._id);
  await monthe.save();
  return res.status(200).json({ message: "Users updated", success: true });
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

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    const deleteduser = await deleteModel.findOne({ email: user.email });
    if (!deleteduser) {
      await deleteModel.create({
        name: user.name,
        email: user.email,
        fatherName: user.fatherName,
        contact: user.contact,
        aadhar: user.aadhar,
        gender: user.gender,
        shift: user.shift,
        fees: user.fees,
        joindate: user.joinDate,
        seat: user.seat,
        address: user.address,
      });
    }

    await userModel.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "User Deleted successfully", success: true });
  } catch (error) {
    return res.status(400).json({
      message: "Some error occured",
      success: false,
      error: error.message,
    });
  }
};

export const getAllDeletedUsers = async (req, res) => {
  try {
    let users = await deleteModel.find();
    return res.status(200).json({ users, success: true });
  } catch (error) {
    return res.status(400).json({
      message: "Some error occured",
      success: false,
      error: error.message,
    });
  }
};
