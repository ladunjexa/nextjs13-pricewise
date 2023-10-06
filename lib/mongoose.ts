import mongoose from "mongoose";

let isConnected: boolean = false; // Variable to track connection status

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI) {
    throw new Error("No MongoDB URI provided");
  }

  if (isConnected) {
    return console.log("=> using existing database connection");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);

    isConnected = true;

    console.log("=> using new database connection");
  } catch (error: any) {
    console.log("=> error connecting to database: ", error);
    throw new Error(error);
  }
};
