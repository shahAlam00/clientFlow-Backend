import mongoose from "mongoose";
import LeadNote from "./leadNote.model.js";

const parseJsonField = (value, fallback) => {
  if (value === undefined || value === null || value === "") return fallback;

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return parsed ?? fallback;
    } catch {
      return fallback;
    }
  }

  return value;
};

const normalizeNumber = (value, fallback = 0) => {
  if (value === undefined || value === null || value === "") return fallback;
  const numericValue = Number(value);
  return Number.isNaN(numericValue) ? fallback : numericValue;
};

// @desc    Get all lead notes
// @route   GET /api/lead-notes
export const getLeadNotes = async (req, res) => {
  try {
    const studentId = req.query.studentId || req.query.leadId || req.query.selectedStudentId;
    const filter = studentId ? { selectedStudentId: studentId } : {};

    const notes = await LeadNote.find(filter)
      .populate("selectedStudentId", "fullName email mobileNumber")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new lead note
// @route   POST /api/lead-notes
export const createLeadNote = async (req, res) => {
  try {
    const studentId = req.body.selectedStudentId || req.body.leadId || req.body.studentId || req.body.id;
    const quickTags = parseJsonField(req.body.quickTags, []);
    const documents = parseJsonField(req.body.documents, {});

    if (!studentId || !req.body.discussionSummary) {
      return res.status(400).json({
        success: false,
        message: "Please provide student ID and discussion summary.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID format.",
      });
    }

    const attachmentFile = req.file ? req.file.path : req.body.attachmentFile || "";

    const newNote = await LeadNote.create({
      selectedStudentId: studentId,
      fullName: req.body.fullName,
      studentPhone: req.body.studentPhone,

      communicationType: req.body.communicationType,
      callOutcome: req.body.callOutcome,
      quickTags,
      discussionSummary: req.body.discussionSummary,

      leadStatus: req.body.leadStatus || req.body.status || "Warm",
      priority: req.body.priority,
      leadScore: normalizeNumber(req.body.leadScore, 0),

      followUpDate: req.body.followUpDate ? new Date(req.body.followUpDate) : null,
      followUpTime: req.body.followUpTime,
      followUpType: req.body.followUpType,
      reminderBefore: req.body.reminderBefore,

      interestedCourse: req.body.interestedCourse,
      preferredCollege: req.body.preferredCollege,
      preferredCity: req.body.preferredCity,
      budget: req.body.budget,
      hostelRequired: req.body.hostelRequired,
      scholarshipNeeded: req.body.scholarshipNeeded,

      parentName: req.body.parentName,
      parentPhone: req.body.parentPhone,
      parentDiscussion: req.body.parentDiscussion,
      parentInterested: req.body.parentInterested,
      decisionMaker: req.body.decisionMaker,

      documents,

      registrationFee: normalizeNumber(req.body.registrationFee, 0),
      counsellingFee: normalizeNumber(req.body.counsellingFee, 0),
      advance: normalizeNumber(req.body.advance, 0),
      pendingAmount: normalizeNumber(req.body.pendingAmount, 0),

      consultantName: req.body.consultantName,
      department: req.body.department,
      source: req.body.source,
      campaign: req.body.campaign,

      aiNotesPrompt: req.body.aiNotesPrompt,
      conversationMood: req.body.conversationMood,
      admissionProbability: req.body.admissionProbability,
      leadTemperature: req.body.leadTemperature,
      nextRecommendedAction: req.body.nextRecommendedAction,

      attachmentType: req.body.attachmentType,
      attachmentFile,
    });

    const populatedNote = await LeadNote.findById(newNote._id).populate(
      "selectedStudentId",
      "fullName email mobileNumber"
    );

    res.status(201).json({
      success: true,
      message: "Note saved successfully",
      data: populatedNote,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update an existing lead note
// @route   PUT /api/lead-notes/:id
export const updateLeadNote = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = { ...req.body };

    const studentId = updateData.selectedStudentId || updateData.leadId || updateData.studentId;
    if (studentId) {
      updateData.selectedStudentId = studentId;
    }

    if (updateData.quickTags !== undefined) {
      updateData.quickTags = parseJsonField(updateData.quickTags, []);
    }

    if (updateData.documents !== undefined) {
      updateData.documents = parseJsonField(updateData.documents, {});
    }

    if (updateData.parentInterested === undefined && updateData.parentInterested === "") {
      updateData.parentInterested = "No";
    }

    if (updateData.leadScore !== undefined) updateData.leadScore = normalizeNumber(updateData.leadScore, 0);
    if (updateData.registrationFee !== undefined) updateData.registrationFee = normalizeNumber(updateData.registrationFee, 0);
    if (updateData.counsellingFee !== undefined) updateData.counsellingFee = normalizeNumber(updateData.counsellingFee, 0);
    if (updateData.advance !== undefined) updateData.advance = normalizeNumber(updateData.advance, 0);
    if (updateData.pendingAmount !== undefined) updateData.pendingAmount = normalizeNumber(updateData.pendingAmount, 0);

    if (updateData.followUpDate) {
      updateData.followUpDate = new Date(updateData.followUpDate);
    }

    if (req.file) {
      updateData.attachmentFile = req.file.path;
    }

    if (updateData.status && !updateData.leadStatus) {
      updateData.leadStatus = updateData.status;
    }

    if (!updateData.quickTags) updateData.quickTags = [];
    if (!updateData.documents) updateData.documents = {};

    const updatedNote = await LeadNote.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate("selectedStudentId", "fullName email mobileNumber");

    if (!updatedNote) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: updatedNote,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a lead note
// @route   DELETE /api/lead-notes/:id
export const deleteLeadNote = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNote = await LeadNote.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};