import User from "./auth.model.js";
import bcrypt from "bcryptjs";

// ✅ Register Admin
export const registerAdmin = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });

  if (existing) {
    throw new Error("Admin already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "admin",
  });

  return user;
};

// ✅ Login Admin
// export const loginUser = async (req,res) => {
//   const { email, password } = req.body;
  
//   const user = await User.findOne({ email });
//   console.log("User found:", user.role); // Debug log
//   // 🔥 FIX 1: user exist check
//   if (!user) {
//     throw new Error("Invalid credentials");
//   }

//   // 🔥 FIX 2: only admin allowed
//   if (user.role !== "admin") {
//     throw new Error("Access denied (admin only)");
//   }

//    console.log(email, password); // Debug log
//   // 🔥 FIX 3: password compare
//   const isMatch = await bcrypt.compare(password, user.password);
  

//   if (!isMatch) {
//     throw new Error("Invalid credentials");
//   }

//   return user;
// };