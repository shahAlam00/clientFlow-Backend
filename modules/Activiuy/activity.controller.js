import ActivityLog from "./activity.model.js";

// Helper function: Isko hum doosre modules (client, blog etc.) me import karke call karenge
export const logActivity = async (who, action, tag) => {
  try {
    await ActivityLog.create({ who, action, tag });
  } catch (error) {
    console.error("Failed to log activity:", error);
  }
};

// GET Controller: Dashboard par top 5 latest activities dikhane ke liye
export const getRecentActivities = async (req, res, next) => {
  try {
    const activities = await ActivityLog.find()
      .sort({ createdAt: -1 }) // Newest first
      .limit(5);
    
    res.status(200).json(activities);
  } catch (error) {
    next(error); // Aapka global error middleware handle karega
  }
};