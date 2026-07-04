import {
  body,
  validationResult,
} from "express-validator";


// Create / Update Prescription Validation


export const prescriptionValidation = [

  body("appointment")
    .notEmpty()
    .withMessage("Appointment is required"),

  body("diagnosis")
    .trim()
    .notEmpty()
    .withMessage("Diagnosis is required")
    .isLength({
      min: 5,
      max: 1000,
    }),

  body("medicines")
    .isArray({
      min: 1,
    })
    .withMessage(
      "At least one medicine is required."
    ),

  body("medicines.*.medicineName")
    .trim()
    .notEmpty()
    .withMessage("Medicine name is required"),

  body("medicines.*.dosage")
    .trim()
    .notEmpty()
    .withMessage("Dosage is required"),

  body("medicines.*.frequency")
    .trim()
    .notEmpty()
    .withMessage("Frequency is required"),

  body("medicines.*.duration")
    .trim()
    .notEmpty()
    .withMessage("Duration is required"),

  body("notes")
    .optional()
    .trim(),

  body("followUpDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid follow-up date"),
];


// Validation Result


export const validatePrescription = (
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