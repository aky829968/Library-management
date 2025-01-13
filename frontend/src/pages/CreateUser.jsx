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
        "http://localhost:3000/user/register",
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
          <div className="mb-4 flex gap-2">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="joiningDate"
              >
                Month
              </label>
              <input
                type="text"
                name="month"
                id="month"
                value={formData.month}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
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
          <div className="mb-4">
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
