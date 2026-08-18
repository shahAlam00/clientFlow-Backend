import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    who: { type: String, required: true },
    action: { type: String, required: true },
    tag: { 
      type: String, 
      enum: ["Appointment", "Blog", "Case", "Reels", "Client","Contact"], 
      required: true 
    }
  },
  { timestamps: true } // Isse createdAt aur updatedAt automatically mil jayega
);

const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);
export default ActivityLog;