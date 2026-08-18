import express from "express";
import { registerAdmin, login } from "./auth.controller.js";

const router = express.Router();

router.post("/register-admin", registerAdmin);
router.post("/login", login);


export default router;