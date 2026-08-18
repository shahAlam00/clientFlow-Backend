import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
    
   
   {
     clientId: {
      type: String,
      unique: true,
      trim: true,
    },
    profileImage: {
      type: String, // URL or file path (optional)
      default: null,
    },
    companyName: {
      type: String,
      required: [true, "Company / Brand Name is required"],
      trim: true,
    },
    clientName: {
      type: String,
      required: [true, "Client / Contact Person Name is required"],
      trim: true,
    },
    personalPhone: {
      type: String,
      required: [true, "Personal Phone Number is required"],
      trim: true,
    },
    businessPhone: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },
    websiteUrl: {
      type: String,
      trim: true,
      default: "",
    },
    industryType: {
      type: String,
      trim: true,
      default: "",
    },
    primaryService: {
      type: String,
      required: [true, "Primary Service Requirement is required"],
      trim: true,
    },
    projectStatus: {
      type: String,
      enum: ["Hot Lead", "Warm Lead", "Proposal Shared", "Deal Closed", "On Hold"],
      default: "Warm Lead",
    },
    leadSource: {
      type: String,
      default: "Google Ads",
    },
    assignedAccountManager: {
      type: String,
      trim: true,
      default: "",
    },
    onboardingNotes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

export default mongoose.model("Client", clientSchema);