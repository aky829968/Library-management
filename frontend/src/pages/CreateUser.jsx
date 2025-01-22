import axios from "axios";
import React, { useState } from "react";
import { toast } from "sonner";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    aadhar: "",
    address: "",
    shift: "",
    month: "",
    contact: "",
    gender: "",
    fees: "",
    year: "",
    fatherName: "",
    seat: "",
    joinDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      let { data } = await axios.post(
        "https://library-management-25fd.onrender.com/user/register",
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      if (data.success) {
        // alert("User created successfully");
        setFormData({
          name: "",
          email: "",
          aadhar: "",
          address: "",
          shift: "",
          year: "",
          contact: "",
          fatherName: "",
          month: "",
          fees: "",
          seat: "",
        });
        console.log(data.message);
        toast.success("User created successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center mt-10 items-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 rounded-lg flex gap-2 shadow-lg w-full  max-w-4xl">
        <div className="w-1/2">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              FatherName
            </label>
            <input
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="aadhar"
            >
              Aadhar
            </label>
            <input
              type="number"
              name="aadhar"
              id="aadhar"
              value={formData.aadhar}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              value={formData.address}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4 flex  gap-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="shift"
            >
              Morning
            </label>
            <input
              type="radio"
              name="shift"
              id="shift"
              value="morning"
              checked={formData.shift === "morning"}
              onChange={handleChange}
              className=" text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="shift"
            >
              Evening
            </label>

            <input
              type="radio"
              name="shift"
              id="shift"
              value="evening"
              checked={formData.shift === "evening"}
              onChange={handleChange}
              className="text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="shift"
            >
              Fullday
            </label>
            <input
              type="radio"
              name="shift"
              id="shift"
              value="fullday"
              checked={formData.shift === "fullday"}
              onChange={handleChange}
              className=" text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <div className="w-1/2">
          <div className="mb-4 flex gap-2 items-center">
            <div>
              <select
                value={formData.month}
                onChange={handleChange}
                name="month"
                className="text-lg rounded  "
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
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="feeDueDate"
              >
                Year
              </label>
              <input
                type="number"
                name="year"
                id="year"
                value={formData.year}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="mb-4 flex items-center gap-3">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="contact"
              >
                Contact
              </label>
              <input
                type="number"
                name="contact"
                id="contact"
                value={formData.contact}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="contact"
              >
                Joining Date
              </label>
              <input
                type="date"
                name="joinDate"
                id="joinDate"
                value={formData.joinDate}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="my-9 flex gap-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="gender"
            >
              Female
            </label>
            <input
              type="radio"
              name="gender"
              id="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={handleChange}
              className="    text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="gender"
            >
              Male
            </label>
            <input
              type="radio"
              name="gender"
              id="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={handleChange}
              className="  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="fees"
            >
              Fees
            </label>
            <input
              type="number"
              name="fees"
              id="fees"
              value={formData.fees}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4"></div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="feeDueDate"
            >
              Seat No.
            </label>
            <input
              type="number"
              name="seat"
              id="seat"
              value={formData.seat}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 w-full  mt-8 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
