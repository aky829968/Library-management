import mongoose from "mongoose";

const connetion = () => {
  mongoose
    .connect("mongodb://localhost:27017/library")
    .then(() => {
      console.log("Connected to database");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connetion;
