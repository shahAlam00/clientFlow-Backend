import express from "express";
import {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} from "./client.controller.js";
import { upload } from "../../middleware/multer.middleware.js"; // Multer middleware import karein

const router = express.Router();

router.route("/")
  .get(getClients)       // GET all clients
  .post(upload.single("profileImage"), createClient);    // POST new client with file upload

router.route("/:id")
  .get(getClientById)     // GET single client by ID
  .put(upload.single("profileImage"), updateClient)      // PUT / Update client details with optional file upload
  .delete(deleteClient);  // DELETE client

export default router;