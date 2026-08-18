import express from "express";
import { getRecentActivities } from "./activity.controller.js";

const router = express.Router();

router.get("/", getRecentActivities);

export default router;