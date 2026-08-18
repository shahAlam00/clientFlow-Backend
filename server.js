import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import  dns from  'dns';
// import {createAdmin} from "./utils/createAdmin.js";
dns.setDefaultResultOrder('ipv4first');
// import {createAdmin} from "./utils/createAdmin.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

// createAdmin();
const startServer = async () => {
  try {
    // DB connect
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.log("DB connection failed:", error.message);
    process.exit(1);
  }
};

startServer();