import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="bg-blue-500 p-4 fixed top-0 left-0 w-full z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-lg font-bold">Library Management</div>
          <div className="hidden md:flex space-x-4">
            <Link
              to="/"
              className="text-white font-semibold hover:text-gray-300"
            >
              Home
            </Link>
            <Link
              to="/createuser"
              className="text-white font-semibold hover:text-gray-300"
            >
              Create User
            </Link>
            <Link
              to="/alluser"
              className="text-white font-semibold hover:text-gray-300"
            >
              All Users
            </Link>
            <Link
              to="/feesdue"
              className="text-white font-semibold hover:text-gray-300"
            >
              Fees Due
            </Link>
            <Link
              to="/seats"
              className="text-white font-semibold hover:text-gray-300"
            >
              Seats
            </Link>
            <Link
              to="/deleteUsers"
              className="text-white font-semibold hover:text-gray-300"
            >
              DeletedUsers
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div
          className={
            open
              ? "flex transition-all flex-col absolute w-full gap-1 left-0 top-16 p-2  bg-green-400"
              : "hidden"
          }
        >
          <Link
            onClick={() => setOpen(!open)}
            to="/"
            className="text-white font-semibold hover:text-gray-300"
          >
            Home
          </Link>
          <Link
            onClick={() => setOpen(!open)}
            to="/createuser"
            className="text-white font-semibold hover:text-gray-300"
          >
            Create User
          </Link>
          <Link
            onClick={() => setOpen(!open)}
            to="/alluser"
            className="text-white font-semibold hover:text-gray-300"
          >
            All Users
          </Link>
          <Link
            onClick={() => setOpen(!open)}
            to="/feesdue"
            className="text-white font-semibold hover:text-gray-300"
          >
            Fees Due
          </Link>
          <Link
            onClick={() => setOpen(!open)}
            to="/seats"
            className="text-white font-semibold hover:text-gray-300"
          >
            Seats
          </Link>
          <Link
            onClick={() => setOpen(!open)}
            to="/deleteUsers"
            className="text-white font-semibold hover:text-gray-300"
          >
            DeletedUsers
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
