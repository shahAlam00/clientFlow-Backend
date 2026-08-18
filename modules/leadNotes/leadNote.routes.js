import express from "express";
import multer from "multer";
import path from "path";
import {
  getLeadNotes,
  createLeadNote,
  updateLeadNote,
  deleteLeadNote,
} from "./leadNote.controller.js";

const router = express.Router();

// ─── Multer Config for File Uploads ───
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/lead-notes/"); // is folder ko ensure karein ki exist karta ho
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|mp3|wav|webm|mp4/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error("Only images, PDFs, audio & video files allowed!"));
  },
});

// Create folder if not exists (simple check)
import fs from "fs";
const uploadDir = "uploads/lead-notes/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ─── Routes ───
router.route("/").get(getLeadNotes).post(upload.single("attachmentFile"), createLeadNote);

router.route("/:id").put(upload.single("attachmentFile"), updateLeadNote).delete(deleteLeadNote);

export default router;