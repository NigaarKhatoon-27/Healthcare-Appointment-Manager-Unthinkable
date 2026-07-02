import express from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/authController.js";

import {
  registerValidation,
  loginValidation,
  validate,
} from "../validators/authValidator.js";

const router = express.Router();

/* Authentication Routes */

// Register
router.post(
  "/register",
  registerValidation,
  validate,
  registerUser
);

// Login
router.post(
  "/login",
  loginValidation,
  validate,
  loginUser
);

// Logout
router.post("/logout", logoutUser);

export default router;