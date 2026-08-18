import mongoose from "mongoose";

const leadNoteSchema = new mongoose.Schema(
  {
    // ─── Student Reference ───
    selectedStudentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Student ID is required"],
      // ya jo bhi aapka student model hai
    },
    fullName: {
      type: String,
      trim: true,
    },
    studentPhone: {
      type: String,
      trim: true,
    },

    // ─── 1️⃣ Communication Information ───
    communicationType: {
      type: String,
      enum: [
        "Incoming Call",
        "Outgoing Call",
        "WhatsApp Chat",
        "Email",
        "Google Meet",
        "Office Visit",
        "Parent Meeting",
        "Document Collection",
      ],
      default: "Incoming Call",
    },
    callOutcome: {
      type: String,
      enum: [
        "Connected",
        "Not Connected",
        "Busy",
        "Switched Off",
        "Wrong Number",
        "Callback Requested",
        "Voicemail",
        "Cancelled",
      ],
      default: "Connected",
    },
    quickTags: {
      type: [String],
      default: [],
    },
    discussionSummary: {
      type: String,
      required: [true, "Discussion summary is required"],
      trim: true,
    },

    // ─── 2️⃣ Lead Status ───
    leadStatus: {
      type: String,
      enum: [
        "New Lead",
        "Attempted",
        "Connected",
        "Warm",
        "Hot",
        "Cold",
        "Counselling Done",
        "Documents Pending",
        "Payment Pending",
        "Admission Done",
        "Lost",
      ],
      default: "New Lead",
    },
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium",
    },
    leadScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    // ─── 3️⃣ Follow-up ───
    followUpDate: {
      type: Date,
    },
    followUpTime: {
      type: String,
      trim: true,
    },
    followUpType: {
      type: String,
      enum: ["Call", "WhatsApp", "Meeting", "Email", "Video Call", "Reminder"],
      default: "Call",
    },
    reminderBefore: {
      type: String,
      enum: ["15 Minutes", "30 Minutes", "1 Hour", "1 Day"],
      default: "15 Minutes",
    },

    // ─── 4️⃣ Student Interest ───
    interestedCourse: {
      type: String,
      trim: true,
    },
    preferredCollege: {
      type: String,
      trim: true,
    },
    preferredCity: {
      type: String,
      trim: true,
    },
    budget: {
      type: String,
      trim: true,
    },
    hostelRequired: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    scholarshipNeeded: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },

    // ─── 5️⃣ Parent Details ───
    parentName: {
      type: String,
      trim: true,
    },
    parentPhone: {
      type: String,
      trim: true,
    },
    parentDiscussion: {
      type: String,
      trim: true,
    },
    parentInterested: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    decisionMaker: {
      type: String,
      enum: ["Father", "Mother", "Student", "Guardian"],
      default: "Father",
    },

    // ─── 6️⃣ Documents Checklist ───
    documents: {
      type: Map,
      of: String,
      default: new Map(),
    },

    // ─── 7️⃣ Payment Information ───
    registrationFee: {
      type: Number,
      default: 0,
    },
    counsellingFee: {
      type: Number,
      default: 0,
    },
    advance: {
      type: Number,
      default: 0,
    },
    pendingAmount: {
      type: Number,
      default: 0,
    },

    // ─── 9️⃣ Internal Section ───
    consultantName: {
      type: String,
      default: "Admin / Counselor",
      trim: true,
    },
    department: {
      type: String,
      enum: ["Sales", "Admission", "Support"],
      default: "Sales",
    },
    source: {
      type: String,
      enum: [
        "Website",
        "Facebook",
        "Instagram",
        "WhatsApp",
        "Google Ads",
        "Referral",
        "Offline",
      ],
      default: "Website",
    },
    campaign: {
      type: String,
      trim: true,
    },

    // ─── AI / Smart Actions ───
    aiNotesPrompt: {
      type: String,
      trim: true,
    },
    conversationMood: {
      type: String,
      trim: true,
    },
    admissionProbability: {
      type: String,
      trim: true,
    },
    leadTemperature: {
      type: String,
      trim: true,
    },
    nextRecommendedAction: {
      type: String,
      trim: true,
    },

    // ─── 🔟 Attachments ───
    attachmentType: {
      type: String,
      enum: ["Screenshot", "Voice", "PDF", "Image", "Recording"],
    },
    attachmentFile: {
      type: String, // File path / URL store hoga
      trim: true,
    },
  },
  { timestamps: true }
);

const LeadNote = mongoose.model("LeadNote", leadNoteSchema);
export default LeadNote;