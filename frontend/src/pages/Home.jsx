import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    month: "",
    year: "",
  });
  const {
    setMonthData,
    monthData,
    allUser,
    getAllUsers,
    income,
    dueFeesUsers,
    dueUsers,
  } = useContext(UserContext);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);

    setMonthData(data);
    setData({
      month: "",
      year: "",
    });
  };
  useEffect(() => {
    getAllUsers();
    dueFeesUsers();
  }, [monthData]);

  return (
    <>
      <div className="h-[100vh]  flex flex-col justify-center items-center w-full bg-emerald-200">
        <div className="mt-24 flex flex-col gap-4 md:flex md:flex-row md:items-center md:gap-0 ">
          <select
            value={data.month}
            onChange={handleChange}
            name="month"
            className="text-xl rounded py-1"
          >
            <option value="">Select Month</option>
            <option value="january">January</option>
            <option value="feburary">Feburary</option>
            <option value="march">March</option>
            <option value="april">April</option>
            <option value="may">May</option>
            <option value="june">June</option>
            <option value="july">July</option>
            <option value="august">August</option>
            <option value="september">September</option>
            <option value="october">October</option>
            <option value="november">November</option>
            <option value="december">December</option>
          </select>
          <input
            name="year"
            onChange={handleChange}
            className="py-[6px] rounded-l px-1 ml-2"
            placeholder="year"
            type="number"
            value={data.year}
          />
          <Button onClick={handleSubmit} className=" rounded-l-none">
            Set
          </Button>
        </div>
        <div className="  p-10 flex flex-col justify-center items-center md:flex md:flex-row md:items-center h-full w-full gap-2 ">
          <div
            onClick={() => navigate("/alluser")}
            className="card cursor-pointer bg-blue-600 shadow-md rounded-lg p-6 w-full max-w-sm"
          >
            <h2 className="text-xl font-bold mb-2">Total Enrolled Students</h2>
            <p className="text-2xl">{allUser?.length}</p>
          </div>
          <div
            onClick={() => navigate("/feesdue")}
            className="card cursor-pointer bg-yellow-600 shadow-md rounded-lg p-6 w-full max-w-sm"
          >
            <h2 className="text-xl font-bold mb-2">Due Fees Students</h2>
            <p className="text-2xl">{dueUsers?.length}</p>
          </div>
          <div className="card bg-emerald-700 shadow-md rounded-lg p-6 w-full max-w-sm">
            <h2 className="text-xl font-bold mb-2">Total Income</h2>
            <p className="text-2xl">₹{income}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
