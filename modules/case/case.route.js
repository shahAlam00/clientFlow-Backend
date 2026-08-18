import express from "express";
import { upload } from "../../middleware/multer.middleware.js";

import {
  createCase,
  getCases,
  updateCase,
  deleteCase,
  uploadCaseFile,
  deleteCaseFile,
} from "./case.controller.js";




const router =
  express.Router();



router.delete(
  "/:caseId/file/:fileId",
  deleteCaseFile
);
router.get(
  "/",
  getCases
);

router.post(
  "/",
  createCase
);

router.put(
  "/:id",
  updateCase
);

router.delete(
  "/:id",
  deleteCase
);

router.post(
  "/:caseId/upload",
  upload.single("file"),
  uploadCaseFile
);

export default router;