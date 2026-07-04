import express from "express";

import {
  getAllDoctors,
  getDoctorById,
  getDoctorAvailability,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctorController.js";

import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

import {
  doctorValidation,
  validateDoctor,
} from "../validators/doctorValidator.js";

const router = express.Router();

/* Public Routes */

// Get All Doctors
router.get("/", getAllDoctors);

// Get Doctor Details
router.get("/:id", getDoctorById);

// Get Doctor Availability
router.get(
  "/:id/availability",
  getDoctorAvailability
);

/* Admin Routes */

// Create Doctor
router.post(
  "/",
  protect,
  authorize("admin"),
  doctorValidation,
  validateDoctor,
  createDoctor
);

// Update Doctor
router.put(
  "/:id",
  protect,
  authorize("admin"),
  doctorValidation,
  validateDoctor,
  updateDoctor
);

// Delete Doctor
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteDoctor
);

export default router;