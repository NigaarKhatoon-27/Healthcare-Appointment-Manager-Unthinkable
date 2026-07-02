import User from "../models/User.js";

/* Register User */

export const registerUser = async (req, res, next) => {
  try {
    const {
      fullName,
      email,
      phone,
      password,
    } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }

    // Check if phone already exists
    const existingPhone = await User.findOne({
      phone,
    });

    if (existingPhone) {
      return res.status(400).json({
        success: false,
        message: "Phone number already exists.",
      });
    }

    // Create new patient account
    const user = await User.create({
      fullName,
      email,
      phone,
      password,
      role: "patient",
    });

    const token = user.generateToken();

    res.status(201).json({
      success: true,
      message: "Registration successful.",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

/* Login User */

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isMatch =
      await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    user.lastLogin = new Date();

    await user.save();

    const token = user.generateToken();

    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

/* Logout User */

export const logoutUser = async (
  req,
  res,
  next
) => {
  try {
    res.status(200).json({
      success: true,
      message: "Logout successful.",
    });
  } catch (error) {
    next(error);
  }
};