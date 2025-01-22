import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bussinessName: "",
    email: "",
    password: "",
    contact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    try {
      const { data } = await axios.post(
        "https://library-management-25fd.onrender.com/admin/register",
        formData
      );
      if (data.success) {
        toast.success("Signup successful");
        navigate("/login");
        // Redirect to login page
      } else {
        alert("Signup failed");
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }

    // if (data.success) {
    //   toast.success("Signup successful");
    //   navigate("/login");
    //   // Redirect to login page
    // } else {
    //   alert("Signup failed");
    //   console.log(data);
    // }
  };

  return (
    <div className="flex justify-center mt-10 items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4">Signup</h1>
        <div className="mb-4">
          <label className="block text-gray-700">Business Name</label>
          <input
            type="text"
            name="bussinessName"
            value={formData.bussinessName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Contact</label>
          <input
            type="number"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mt-4"
        >
          Signup
        </button>
        <h2>
          Already have an account?{" "}
          <Link to="/login" className="text-blue-700 font-semibold">
            Login
          </Link>
        </h2>
      </form>
    </div>
  );
};

export default Signup;
