import mongoose from "mongoose";

let isConnected = false;

const startDb = async () => {
  if (isConnected) return;

  const url = process.env.MONGO_URI;
  if (!url) throw new Error("Missing environment variable 'MONGO_URI'");

  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(url);
      isConnected = true;
      console.log("Connected successfully to MongoDB");
    }
  } catch (error) {
    console.error("Failed to connect to MongoDB:", (error as Error).message);
    throw new Error(`MongoDB connection error: ${(error as Error).message}`);
  }
};

export default startDb;
