import React, { useState } from "react";
import UserContext from "./UserContext";
import axios from "axios";

const UserState = (props) => {
  const [monthData, setMonthData] = useState({
    month: "",
    year: "",
  });
  const [income, setIncome] = useState("");
  const [allUser, setAllUser] = useState([]);
  const [dueUsers, setDueUsers] = useState([]);
  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/user/get/${monthData.month}/${monthData.year}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const data = response.data;
      if (data.success) {
        setAllUser(data.users.users);
        setIncome(data.income);
        console.log(data.users);
      }
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const dueFeesUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/user/getdue/${monthData.month}/${monthData.year}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const data = response.data;
      if (data.success) {
        console.log(data.dueUsers);
        setDueUsers(data.dueUsers);
      }
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <UserContext.Provider
      value={{
        monthData,
        setMonthData,
        allUser,
        income,
        setAllUser,
        getAllUsers,
        dueFeesUsers,
        dueUsers,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
