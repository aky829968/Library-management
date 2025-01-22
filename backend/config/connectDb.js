import mongoose from "mongoose";

const connetion = () => {
  mongoose
    .connect(
      "mongodb+srv://adityakumar262003:6JYzaBRKABPfd4Zw@cluster0.xw2sc.mongodb.net/"
    )
    .then(() => {
      console.log("Connected to database");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connetion;
