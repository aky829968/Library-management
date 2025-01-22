import React, { useContext } from "react";
import UserContext from "../context/UserContext";
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
import { toast } from "sonner";

const FeeDuesUser = () => {
  const calculateDateDifference = (date) => {
    const currentDate = new Date(); // Current date
    const userDate = new Date(date); // User's date
    const timeDiff = Math.abs(currentDate - userDate); // Difference in milliseconds
    const diffInDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert to days
    return diffInDays;
  };
  let { dueUsers, monthData } = useContext(UserContext);
  const sendEmail = async (id) => {
    try {
      const response = await fetch(
        `https://library-management-25fd.onrender.com/user/sendEmail/${monthData.month}/${monthData.year}/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        toast.success("Email sent successfully");
      }
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const sendEmailReaminder = async (id) => {
    try {
      const response = await fetch(
        `https://library-management-25fd.onrender.com/user/sendEmailRemainder/${monthData.month}/${monthData.year}/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        toast.success("Email sent successfully");
      }
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const date = new Date();
  return (
    <div className="mt-20">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg text-black">S.No.</TableHead>
            <TableHead className="text-lg text-black">Name</TableHead>
            <TableHead className="text-lg text-black">FatherName</TableHead>
            <TableHead className="text-lg text-black">Aadhaar</TableHead>
            <TableHead className="text-lg text-black">Contact</TableHead>
            <TableHead className="text-lg text-black">Address</TableHead>
            <TableHead className="text-lg text-black">Gender</TableHead>
            <TableHead className="text-lg text-black">Shift</TableHead>
            <TableHead className="text-lg text-black">Joining</TableHead>
            <TableHead className="text-lg text-black">Days</TableHead>

            <TableHead className="text-lg text-black">Due Fees</TableHead>
            <TableHead className="text-lg text-black text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dueUsers?.map((user, idx) => {
            return (
              <TableRow key={user._id}>
                <TableCell className="text-md font-bold text-blue-800">
                  {idx + 1}
                </TableCell>
                <TableCell className="text-md text-red-700 font-semibold">
                  {user.name}
                </TableCell>
                <TableCell className="text-md text-red-700 font-semibold">
                  {user.fatherName}
                </TableCell>
                <TableCell className="text-md text-red-700 font-semibold">
                  {user.aadhar}
                </TableCell>
                <TableCell className="text-md text-red-700 font-semibold">
                  {user.contact}
                </TableCell>
                <TableCell className="text-md text-red-700 font-semibold">
                  {user.address}
                </TableCell>
                <TableCell className="text-md text-red-700 font-semibold">
                  {user.gender}
                </TableCell>
                <TableCell className="text-md text-red-700 font-semibold">
                  {user.shift}
                </TableCell>
                <TableCell className="text-md text-red-700 font-semibold">
                  {user.joinDate.slice(0, 10)}
                </TableCell>
                <TableCell className="text-md text-red-700 font-semibold">
                  {31 - calculateDateDifference(user.joinDate)}
                </TableCell>
                <TableCell className="text-md text-red-700 font-semibold">
                  ₹{user.fees - user.feeSubmit}
                </TableCell>
                <TableCell>
                  <div className=" flex flex-col">
                    <Button onClick={() => sendEmail(user._id)} className="">
                      Send Email Reaminder
                    </Button>
                    <Button
                      onClick={() => sendEmailReaminder(user._id)}
                      className="bg-green-600 hover:bg-green-800"
                    >
                      Send Email Due
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default FeeDuesUser;
