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
  let { dueUsers, monthData } = useContext(UserContext);
  const sendEmail = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/user/sendEmail/${monthData.month}/${monthData.year}`,
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
  return (
    <div className="mt-20">
      <div className="mx-auto max-w-[200px] my-4">
        <Button onClick={sendEmail} className="">
          Send Email To All
        </Button>
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg text-black">Name</TableHead>
            <TableHead className="text-lg text-black">FatherName</TableHead>
            <TableHead className="text-lg text-black">Aadhaar</TableHead>
            <TableHead className="text-lg text-black">Contact</TableHead>
            <TableHead className="text-lg text-black">Address</TableHead>
            <TableHead className="text-lg text-black">Gender</TableHead>
            <TableHead className="text-lg text-black">Shift</TableHead>
            <TableHead className="text-lg text-black">Joining</TableHead>

            <TableHead className="text-lg text-black">Due Fees</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dueUsers?.map((user) => {
            return (
              <TableRow key={user._id}>
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
                  ₹{user.fees - user.feeSubmit}
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
