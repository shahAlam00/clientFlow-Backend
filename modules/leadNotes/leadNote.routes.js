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

// ─────────────────────────────────────────────
// Multer Config - Vercel Compatible
// ─────────────────────────────────────────────

const storage = multer.memoryStorage();

const upload = multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },

  fileFilter: (req, file, cb) => {
    const allowedExtensions =
      /\.(jpeg|jpg|png|gif|pdf|mp3|wav|webm|mp4)$/i;

    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "application/pdf",
      "audio/mpeg",
      "audio/wav",
      "audio/webm",
      "video/mp4",
    ];

    const extname = allowedExtensions.test(file.originalname);
    const mimetype = allowedMimeTypes.includes(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    }

    cb(
      new Error(
        "Only images, PDFs, audio & video files are allowed!"
      )
    );
  },
});

// ─────────────────────────────────────────────
// Routes
// ─────────────────────────────────────────────

router
  .route("/")
  .get(getLeadNotes)
  .post(upload.single("attachmentFile"), createLeadNote);

router
  .route("/:id")
  .put(upload.single("attachmentFile"), updateLeadNote)
  .delete(deleteLeadNote);

export default router;