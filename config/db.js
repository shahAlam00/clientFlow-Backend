import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => { 
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000, // 30 seconds tak wait karega connection ke liye
      socketTimeoutMS: 45000,         // Close sockets after 45 seconds of inactivity
    });
    
    console.log(`✅ Database connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("❌ DB ERROR:", error.message);
    process.exit(1); // Agar DB connect na ho toh app ko rok do taaki galat state me na chale
  }
};

export default connectDB;