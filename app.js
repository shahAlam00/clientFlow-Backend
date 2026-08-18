import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import leadNoteRoutes from "./modules/leadNotes/leadNote.routes.js"
import clientRoutes from "./modules/clients/client.routes.js";
import activityRoutes from "./modules/Activiuy/activity.route.js";
import authRoutes from "./modules/auth/auth.routes.js";
import caseRoutes from
"./modules/case/case.route.js";
dotenv.config();
connectDB().catch((err) => console.error("DB connection failed:", err.message));

// Routes import




const app = express();

/* =======================
   CORS CONFIG
======================= */

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:8080",
  "http://localhost:8081",

  "https://advocate-frontend-blush.vercel.app",
  "https://advocate-admin-eosin.vercel.app",

  "https://ashishpanwar.com",
  "https://www.ashishpanwar.com",
  "https://admin.ashishpanwar.com",
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log("Incoming Origin =>", origin);

    if (
      !origin ||
      origin === "null" ||
      allowedOrigins.includes(origin)
    ) {
      return callback(null, true);
    }

    console.log("Blocked Origin =>", origin);

    return callback(new Error("CORS not allowed"));
  },
  credentials: true,
};



/* =======================
   APPLY CORS
======================= */

app.use(cors(corsOptions));

// Handle preflight requests
// app.options("*", cors(corsOptions));

/* =======================
   GLOBAL MIDDLEWARES
======================= */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));

/* =======================
   HEALTH CHECK
======================= */

app.get("/", (req, res) => {
  res.send("Welcome to Shah Alam API Brossssss | Services are up and running 🚀");
});

/* =======================
   API ROUTES
======================= */

app.use("/api/leads-notes", leadNoteRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/auth", authRoutes);
app.use(
  "/api/cases",
  caseRoutes
);
app.use("/api/activities", activityRoutes);
/* ===
====================
   404 ROUTE HANDLER
======================= */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});



/* =======================
   ERROR HANDLER
======================= */



export default app;