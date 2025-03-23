import mongoose from "mongoose";

export const connectDB = async () => {

  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("database is conncetion");
  } catch (error) {

    console.log("database is not connceting");
  }
};