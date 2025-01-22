import axios from "axios";
import React, { useEffect, useState } from "react";
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

const DeletedUser = () => {
  const [allUsers, setallUsers] = useState([]);
  const getAllDeleteUsers = async () => {
    const { data } = await axios.get(
      `https://library-management-25fd.onrender.com/user/getAllDelete`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    if (data.success) {
      setallUsers(data.users);
    } else {
      toast.error(data.message);
    }
  };
  useEffect(() => {
    getAllDeleteUsers();
  }, []);
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

            <TableHead className="text-lg text-black">Fees</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allUsers?.map((user, idx) => {
            return (
              <TableRow key={user._id}>
                <TableCell className="text-md font-bold text-blue-800">
                  {idx + 1}
                </TableCell>
                <TableCell className="text-md font-bold text-blue-800">
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
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default DeletedUser;
