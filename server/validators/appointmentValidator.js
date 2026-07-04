import { body, validationResult } from "express-validator";

/* Book Appointment Validation */

export const appointmentValidation = [
  body("doctor")
    .notEmpty()
    .withMessage("Doctor is required"),

  body("appointmentDate")
    .notEmpty()
    .withMessage("Appointment date is required")
    .isISO8601()
    .withMessage("Invalid appointment date"),

  body("slot.startTime")
    .notEmpty()
    .withMessage("Start time is required"),

  body("slot.endTime")
    .notEmpty()
    .withMessage("End time is required"),

  body("symptoms")
    .trim()
    .notEmpty()
    .withMessage("Symptoms are required")
    .isLength({ min: 10, max: 1000 })
    .withMessage(
      "Symptoms should be between 10 and 1000 characters"
    ),

  body("meetingMode")
    .optional()
    .isIn(["online", "offline"])
    .withMessage(
      "Meeting mode must be online or offline"
    ),
];

/* Validation Result */

export const validateAppointment = (
  req,
  res,
  next
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed.",
      errors: errors.array(),
    });
  }

  next();
};