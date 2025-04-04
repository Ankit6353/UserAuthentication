import UserModel from "../models/userModel.js";
// import bcrypt from "bcrypt"; // Optional: Uncomment if using password hashing

// 🟢 Register User
export const registerUser = async (req, res) => {
  const { first_name, last_name, email, password, role } = req.body;

  if (!first_name || !last_name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existingUser = await UserModel.findOne({ email, role });
    if (existingUser) {
      return res.status(400).json({
        message: `${role.charAt(0).toUpperCase() + role.slice(1)} already exists with this email.`,
      });
    }

    // const hashedPassword = await bcrypt.hash(password, 10); // Optional

    const newUser = new UserModel({
      first_name,
      last_name,
      email,
      password, // Replace with hashedPassword if using bcrypt
      role,
    });

    await newUser.save();

    return res.status(201).json({
      message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully.`,
      user: {
        id: newUser._id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).json({ message: "Server error during registration." });
  }
};

// 🟢 Login User
export const loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: "Email, password, and role are required." });
  }

  try {
    const user = await UserModel.findOne({ email, role });

    if (!user /* || !(await bcrypt.compare(password, user.password)) */ || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials or role." });
    }

    return res.status(200).json({
      message: `${role.charAt(0).toUpperCase() + role.slice(1)} logged in successfully.`,
      user: {
        id: user._id,
        first_name: user.first_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error during login." });
  }
};

// 🟢 Logout User
export const logoutUser = (req, res) => {
  // Clear session or token here if using auth
  return res.status(200).json({ message: "Logout successful." });
};
