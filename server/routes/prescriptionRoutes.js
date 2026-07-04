import express from "express";

import {
  createPrescription,
  getPrescriptionById,
  getPrescriptionByAppointment,
  getMyPatientPrescriptions,
  getMyDoctorPrescriptions,
  updatePrescription,
  deletePrescription,
} from "../controllers/prescriptionController.js";

import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

import {
  prescriptionValidation,
  validatePrescription,
} from "../validators/prescriptionValidator.js";

const router = express.Router();


 //  Doctor Routes


// Create Prescription
router.post(
  "/",
  protect,
  authorize("doctor"),
  prescriptionValidation,
  validatePrescription,
  createPrescription
);

// Logged-in Doctor Prescription History
router.get(
  "/doctor/me",
  protect,
  authorize("doctor"),
  getMyDoctorPrescriptions
);

// Update Prescription
router.put(
  "/:id",
  protect,
  authorize("doctor"),
  prescriptionValidation,
  validatePrescription,
  updatePrescription
);

/* =====================================================
   Patient Routes
===================================================== */

// Logged-in Patient Prescription History
router.get(
  "/patient/me",
  protect,
  authorize("patient"),
  getMyPatientPrescriptions
);


  // Shared Routes


// Prescription by Appointment
router.get(
  "/appointment/:appointmentId",
  protect,
  getPrescriptionByAppointment
);

// Prescription Details
router.get(
  "/:id",
  protect,
  getPrescriptionById
);


// Admin Routes


router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deletePrescription
);

export default router;