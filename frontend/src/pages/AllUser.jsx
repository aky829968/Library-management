import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import "./pop.css";
import jsPDF from "jspdf";
import axios from "axios";
import { toast } from "sonner";

const AllUser = () => {
  const { allUser, getAllUsers, monthData } = useContext(UserContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [feeAmount, setFeeAmount] = useState("");
  const [method, setMethod] = useState();

  const handleMethod = (e) => {
    setMethod(e.target.value);
  };
  const openPopup = (user) => {
    setSelectedUser(user);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedUser(null);
    setFeeAmount("");
  };
  const generatePdf = (user, amount) => {
    const doc = new jsPDF();

    // Header Section
    doc.setFontSize(20);
    doc.setTextColor("#000080");
    doc.text("Krishna Library", 105, 15, null, null, "center");
    doc.setFontSize(12);
    doc.text("MohanLalGanj, Lucknow", 105, 22, null, null, "center");
    doc.text("Contact: 6387899693", 105, 28, null, null, "center");

    // Fee Receipt Title
    doc.setFontSize(14);
    doc.setTextColor("#000");
    doc.text("FEE RECEIPT", 105, 38, null, null, "center");

    // Slip No and Date
    doc.setFontSize(12);
    doc.text(`Slip No: ${user._id}`, 20, 48);
    doc.text(
      `Date: ${new Date().toLocaleDateString()}`,
      160,
      48,
      null,
      null,
      "right"
    );

    // User Details
    const startX = 20;
    let currentY = 58;
    const lineHeight = 8;

    doc.setFontSize(12);
    doc.text(`Name: ${user.name}`, startX, currentY);
    currentY += lineHeight;
    doc.text(`Father's Name: ${user.fatherName}`, startX, currentY);
    currentY += lineHeight;
    doc.text(`Contact: ${user.contact}`, startX, currentY);
    currentY += lineHeight;
    doc.text(`Shift: ${user.shift}`, startX, currentY);
    currentY += lineHeight;

    doc.text(`Address: ${user.address}`, startX, currentY);
    currentY += lineHeight;
    doc.text(`Joining date: ${user.joinDate.slice(0, 10)}`, startX, currentY);
    currentY += lineHeight;
    doc.text(`Month: ${user.month} ${user.year}`, startX, currentY);
    currentY += lineHeight;
    doc.text(`Seat No. : ${user.seat}`, startX, currentY);
    currentY += lineHeight;
    doc.text(`Fees Method : ${method}`, startX, currentY);
    currentY += lineHeight;

    // Fee Details
    currentY += 10;
    doc.setFontSize(16);
    doc.setFont("bold");
    doc.text(`Rupees:`, startX, currentY);
    doc.setFont("normal");
    doc.text(`${amount} Only`, startX + 30, currentY);
    currentY += 10;

    // Total Amount Section
    doc.setDrawColor(0);
    doc.setFillColor(192, 192, 192); // Light gray background
    doc.rect(20, currentY, 170, 10, "F"); // Filled rectangle for styling
    doc.setFontSize(14);
    doc.setFont("bold");
    doc.setTextColor("#000");
    doc.text(`Rs. ${amount}/-`, 105, currentY + 8, null, null, "center");

    // Authorized Signature Section
    currentY += 20;
    doc.setFontSize(12);
    doc.setFont("normal");
    doc.text("Authorized Signature : Ashwani Pal", startX, currentY);

    // Save PDF
    doc.save(`${user.name}_Fee_Slip.pdf`);
    async function fee() {
      let { data } = await axios.post(
        "https://library-management-25fd.onrender.com/fee/payment",
        {
          userId: selectedUser._id,
          amount: amount,
          month: selectedUser.month,
          year: selectedUser.year,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (data.success) {
        getAllUsers();
        alert("Fee submitted successfully");
      } else {
        console.log(data);
      }
    }
    fee();
    closePopup();
  };
  const [pop, setPop] = useState(false);
  const [form, setForm] = useState({
    newmonth: "",
    newyear: "",
    joinDate: "",
  });
  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const updateUsers = async (id) => {
    console.log(form);
    console.log(monthData);
    try {
      const response = await axios.post(
        `https://library-management-25fd.onrender.com/user/update/${id}`,
        form,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const data = response.data;
      if (data.success) {
        toast.success(data.message);
        setForm({
          newmonth: "",
          newyear: "",
        });
      }
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDelete = async (id) => {
    const { data } = await axios.delete(
      `https://library-management-25fd.onrender.com/user/delete/${id}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    if (data.success) {
      toast.success(data.message);
      getAllUsers();
    } else {
      toast.error(data.message);
    }
  };
  return (
    <div className="mt-20">
      <div className="ml-4 my-2"></div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg text-red-700 ">Name</TableHead>
            <TableHead className="text-lg text-black">FatherName</TableHead>
            <TableHead className="text-lg text-black">Aadhaar</TableHead>
            <TableHead className="text-lg text-black">Contact</TableHead>
            <TableHead className="text-lg text-black">Address</TableHead>
            <TableHead className="text-lg text-black">Gender</TableHead>
            <TableHead className="text-lg text-black">Shift</TableHead>
            <TableHead className="text-lg text-black">Joining</TableHead>

            <TableHead className="text-lg text-black">Fees</TableHead>
            <TableHead className="text-lg text-black">Submitted Fee</TableHead>
            <TableHead className="text-lg text-black">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allUser?.map((user) => {
            return (
              <TableRow
                className="bg-slate-200 border-b-4 border-black"
                key={user._id}
              >
                <TableCell className="text-lg font-bold text-red-800">
                  {user.name}
                </TableCell>
                <TableCell className="text-md font-bold text-blue-800">
                  {user.fatherName}
                </TableCell>
                <TableCell className="text-md font-bold text-blue-800">
                  {user.aadhar}
                </TableCell>
                <TableCell className="text-md font-bold text-blue-800">
                  {user.contact}
                </TableCell>
                <TableCell className="text-md font-bold text-blue-800">
                  {user.address}
                </TableCell>
                <TableCell className="text-md font-bold text-blue-800">
                  {user.gender}
                </TableCell>
                <TableCell className="text-md font-bold text-blue-800">
                  {user.shift}
                </TableCell>
                <TableCell className="text-md font-bold text-blue-800">
                  {user.joinDate.slice(0, 10)}
                </TableCell>
                <TableCell className="text-md font-bold text-blue-800">
                  ₹{user.fees}
                </TableCell>
                <TableCell className="text-md font-bold text-blue-800">
                  ₹{user.feeSubmit}
                </TableCell>
                <TableCell className="flex gap-1 items-center">
                  <h2
                    onClick={() => setPop(true)}
                    variant="outline"
                    className="bg-blue-600 text-white cursor-pointer  rounded-md"
                  >
                    Update
                  </h2>
                  {pop && (
                    <div className="popup-overlay">
                      <div className="popup">
                        <h3>Enter Details</h3>
                        <div>
                          <label>Month : </label>
                          <input
                            type="text"
                            name="newmonth"
                            onChange={handleForm}
                            className="border border-green-600 rounded"
                          />
                        </div>
                        <div className="mt-3">
                          <label>Year : </label>
                          <input
                            type="number"
                            name="newyear"
                            onChange={handleForm}
                            className="border border-green-600 rounded"
                          />
                        </div>
                        <div className="mt-3">
                          <label>JoinDate : </label>
                          <input
                            type="date"
                            name="joinDate"
                            onChange={handleForm}
                            className="border border-green-600 rounded"
                          />
                        </div>
                        <div className="popup-actions">
                          <button
                            onClick={() => {
                              setPop(false);
                              updateUsers(user._id);
                            }}
                            className="bg-green-500 text-white p-2 rounded ml-2"
                          >
                            Submit
                          </button>
                          <button
                            onClick={() => setPop(false)}
                            className="bg-red-500 text-white p-2 rounded ml-2"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <h2
                    onClick={() => openPopup(user)}
                    className="  text-green-700 cursor-pointer font-bold text-lg "
                  >
                    Pay Fee
                  </h2>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className=" ml-2 text-lg font-bold cursor-pointer text-red-700 "
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Pay Fee for {selectedUser.name}</h3>
            <label>Fee Amount:</label>
            <input
              type="number"
              value={feeAmount}
              required="true"
              onChange={(e) => setFeeAmount(e.target.value)}
              className="fee-input"
            />
            <div className="flex gap-2 items-center">
              <label>Cash</label>
              <input
                onChange={handleMethod}
                type="radio"
                value="Cash"
                name="method"
              />
              <label>Online</label>
              <input
                onChange={handleMethod}
                type="radio"
                value="Online"
                name="method"
              />
            </div>
            <div className="popup-actions">
              <button
                onClick={() => generatePdf(selectedUser, feeAmount)}
                className="bg-green-600 hover:bg-green-400 text-white p-2 rounded"
              >
                Generate Fee Slip
              </button>
              <button
                onClick={closePopup}
                className="bg-red-500 text-white p-2 rounded ml-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUser;
