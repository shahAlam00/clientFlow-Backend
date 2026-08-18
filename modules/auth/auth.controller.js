import * as authService from "./auth.service.js";
import generateToken from "../../utils/generateToken.js";
import User from "../../modules/auth/auth.model.js"
// Admin Register (use only once)
import bcrypt from "bcryptjs";
export const registerAdmin = async (req, res, next) => {
  try {
    const user = await authService.registerAdmin(req.body);

    res.status(201).json({
      message: "Admin created",
      user,
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login attempt:", email);
    console.log("Password received:", password);

    const user = await User.findOne({ email });

    console.log("User found:", user ? user.role : "No user");

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ CORRECT RESPONSE
    res.json({
      message: "Login successful",
      user,
      token: generateToken(user._id),
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};