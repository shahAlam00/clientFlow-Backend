import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import leadNoteRoutes from "./modules/leadNotes/leadNote.routes.js";
import studentRoutes from "./modules/student/student.routes.js";
import activityRoutes from "./modules/Activiuy/activity.route.js";
import authRoutes from "./modules/auth/auth.routes.js";
import caseRoutes from "./modules/case/case.route.js";

dotenv.config();

const app = express();

/* =====================================================
   DATABASE
===================================================== */

connectDB().catch((err) => {
  console.error("❌ DB connection failed:", err.message);
});

/* =====================================================
   ALLOWED CORS ORIGINS
===================================================== */

const allowedOrigins = [
  // Local development
  "http://localhost:5173",
  "http://localhost:8080",
  "http://localhost:8081",

  // Current Production Admin
  "https://client-f-low-admin.vercel.app",

  // Old production domains - keep only if still needed
  "https://advocate-frontend-blush.vercel.app",
  "https://advocate-admin-eosin.vercel.app",

  // Main website domains - keep only if still needed
  "https://ashishpanwar.com",
  "https://www.ashishpanwar.com",
  "https://admin.ashishpanwar.com",
];

/* =====================================================
   CORS CONFIGURATION
===================================================== */

const corsOptions = {
  origin: function (origin, callback) {
    console.log("🌐 Incoming Origin:", origin);

    // Allow requests without an Origin
    // Example: Postman, server-to-server requests
    if (!origin) {
      return callback(null, true);
    }

    // Check allowed origins
    if (allowedOrigins.includes(origin)) {
      console.log("✅ CORS Allowed:", origin);
      return callback(null, true);
    }

    console.log("❌ CORS Blocked:", origin);

    return callback(
      new Error(`CORS not allowed for origin: ${origin}`)
    );
  },

  credentials: true,

  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
  ],

  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],

  optionsSuccessStatus: 204,
};

/* =====================================================
   APPLY CORS
===================================================== */

app.use(cors(corsOptions));

/*
   Explicitly handle OPTIONS / preflight requests.
*/


/* =====================================================
   GLOBAL MIDDLEWARES
===================================================== */

app.use(express.json({ limit: "25mb" }));

app.use(
  express.urlencoded({
    extended: true,
    limit: "25mb",
  })
);

app.use(cookieParser());

app.use(morgan("dev"));

/* =====================================================
   HEALTH CHECK
===================================================== */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "Welcome to Shah Alam API Brossssss | Services are up and running 🚀",
  });
});

/* =====================================================
   API ROUTES
===================================================== */

app.use("/api/leads-notes", leadNoteRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/students", studentRoutes);

app.use("/api/cases", caseRoutes);

app.use("/api/activities", activityRoutes);

/* =====================================================
   404 ROUTE
===================================================== */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});

/* =====================================================
   GLOBAL ERROR HANDLER
===================================================== */

app.use((err, req, res, next) => {
  console.error("❌ GLOBAL ERROR:", err);

  // CORS error
  if (err.message?.startsWith("CORS not allowed")) {
    return res.status(403).json({
      success: false,
      message: "CORS error",
      error: err.message,
    });
  }

  return res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;