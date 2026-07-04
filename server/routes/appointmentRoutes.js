import express from "express";

import {
  bookAppointment,
  getMyAppointments,
  getDoctorAppointments,
  getMyDoctorAppointments,
  getAppointmentById,
  updateAppointmentStatus,
  cancelAppointment,
} from "../controllers/appointmentController.js";

import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

import {
  appointmentValidation,
  validateAppointment,
} from "../validators/appointmentValidator.js";

const router = express.Router();

/* 
   Patient Routes
*/

// Book Appointment
router.post(
  "/",
  protect,
  authorize("patient"),
  appointmentValidation,
  validateAppointment,
  bookAppointment
);

// Logged-in Patient Appointments
router.get(
  "/my",
  protect,
  authorize("patient"),
  getMyAppointments
);

// Cancel Appointment
router.put(
  "/:id/cancel",
  protect,
  authorize("patient"),
  cancelAppointment
);

/* 
   Doctor Routes
 */

// Logged-in Doctor Appointments
router.get(
  "/doctor/me",
  protect,
  authorize("doctor"),
  getMyDoctorAppointments
);

// Doctor Appointments by Doctor ID
router.get(
  "/doctor/:doctorId",
  protect,
  authorize("doctor"),
  getDoctorAppointments
);

// Update Appointment Status
router.put(
  "/:id/status",
  protect,
  authorize("doctor"),
  updateAppointmentStatus
);

/* 
   Common Routes
 */

// Get Appointment Details
router.get(
  "/:id",
  protect,
  getAppointmentById
);

export default router;