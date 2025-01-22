import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";

const Seats = () => {
  let seats = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
    60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78,
    79, 80,
  ];
  let { monthData } = useContext(UserContext);
  const [shift, setShift] = useState("");
  const [seatsAllocated, setSeatsAllocated] = useState([]);
  const getSeats = async () => {
    console.log(shift);
    try {
      const response = await fetch(
        `http://localhost:3000/user/getSeat/${monthData.month}/${monthData.year}/${shift}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setSeatsAllocated(data.seat);
        console.log(data.seat);
      }
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="px-4 mt-20">
      <div className="max-w-xl mx-auto my-3">
        <label htmlFor="shift" className="font-semibold">
          Select Shift
        </label>
        <select
          name="shift"
          id="shift"
          className="border p-2 rounded-lg"
          onChange={(e) => {
            setShift(e.target.value);
          }}
        >
          <option value="">Shift</option>
          <option value="morning">Morning</option>
          <option value="evening">Evening</option>
          <option value="fullday">Fullday</option>
        </select>
        <button
          onClick={getSeats}
          className="bg-green-500 text-white p-2 rounded-lg ml-2"
        >
          Get Seats
        </button>
      </div>
      <div className="grid grid-cols-5 md:grid-cols-10 gap-4">
        {seats.map((seat) =>
          seatsAllocated?.includes(seat) ? (
            <div
              className="bg-red-500 text-white text-center font-semibold p-4 rounded-lg"
              key={seat}
            >
              {seat}
            </div>
          ) : (
            <div
              className="bg-emerald-500 text-white font-semibold text-center p-4 rounded-lg"
              key={seat}
            >
              {seat}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Seats;
