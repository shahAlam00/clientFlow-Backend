import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    fileName: String,
    fileUrl: String,
    fileId: String,
  },
  { _id: false }
);

const caseSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
    },

    caseNumber: String,

    files: [fileSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Case", caseSchema);