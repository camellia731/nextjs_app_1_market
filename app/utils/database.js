import mongoose from "mongoose";

const connectDB = async() => {
  try {
    await mongoose.connect(
      "mongodb+srv://camelliam821:T5GFNTfi642nOvm3@cluster0.z3tzq.mongodb.net/nextAppDataBase?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Success: Connected to MongoDB");
  } catch {
    console.log("Failure: Unconnected to MongoDB");
    throw new Error();
  }
};

export default connectDB;
