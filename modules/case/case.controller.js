import * as caseService from "./case.service.js";
import { logActivity } from "../Activiuy/activity.controller.js";

// Create
export const createCase = async (
  req,
  res,
  next
) => {
  try {

    const data =
      await caseService.createCase(
        req.body
      );

    // Dynamic Activity Log Trigger for new case registration
    const caseTitle = data?.title || req.body.title || "New Case";
    await logActivity(
      "Admin",
      `registered/created a new case file: ${caseTitle}`,
      "Cases"
    );

    res.status(201).json({
      success: true,
      data,
    });

  } catch (error) {
    next(error);
  }
};

// Get All
export const getCases = async (
  req,
  res,
  next
) => {
  try {

    const data =
      await caseService.getCases();

    res.status(200).json({
      success: true,
      data,
    });

  } catch (error) {
    next(error);
  }
};

// Update
export const updateCase = async (
  req,
  res,
  next
) => {
  try {

    const data =
      await caseService.updateCase(
        req.params.id,
        req.body
      );

    // Dynamic Activity Log Trigger for case modifications
    const caseTitle = data?.title || "a case file";
    await logActivity(
      "Admin",
      `updated parameters/status for case: ${caseTitle}`,
      "Cases"
    );

    res.status(200).json({
      success: true,
      data,
    });

  } catch (error) {
    next(error);
  }
};

// Delete
export const deleteCase = async (
  req,
  res,
  next
) => {
  try {
    // Optional context helper: Try reading case properties or handle safely before deleting
    let caseTitle = "Case File";
    try {
      if (caseService.getCaseById) {
        const existingCase = await caseService.getCaseById(req.params.id);
        if (existingCase?.title) caseTitle = existingCase.title;
      }
    } catch (e) {
      console.log("Pre-delete case fetch skipped or unavailable");
    }

    await caseService.deleteCase(
      req.params.id
    );

    // Dynamic Activity Log Trigger for record deletions
    await logActivity(
      "Admin",
      `permanently removed case entry: ${caseTitle}`,
      "Cases"
    );

    res.status(200).json({
      success: true,
      message:
        "Case deleted successfully",
    });

  } catch (error) {
    next(error);
  }
};

// Upload
export const uploadCaseFile =
  async (req, res, next) => {
    try {

      const data =
        await caseService.uploadFile(
          req.params.caseId,
          req.file
        );

      // Dynamic Activity Log Trigger for document attachments
      const fileName = req.file?.originalname || "a document";
      const caseTitle = data?.title || "Case";
      await logActivity(
        "Admin",
        `uploaded file/document '${fileName}' to case: ${caseTitle}`,
        "Cases"
      );

      res.status(200).json({
        success: true,
        data,
      });

    } catch (error) {
      next(error);
    }
  };

// Delete Case File
export const deleteCaseFile = 
async (req, res, next) => {
    try {

      const data =
        await caseService.deleteFile(
          req.params.caseId,
          req.params.fileId
        );

      // Dynamic Activity Log Trigger for document removals
      const caseTitle = data?.title || "Case";
      await logActivity(
        "Admin",
        `removed/deleted an attached document from case: ${caseTitle}`,
        "Cases"
      );

      res.status(200).json({
        success: true,
        data,
      });

    } catch (error) {
      next(error);
    }
  };