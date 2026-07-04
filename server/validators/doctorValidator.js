import { body, validationResult } from "express-validator";

/*  Create / Update Doctor Validation */

export const doctorValidation = [
  body("user")
    .notEmpty()
    .withMessage("User ID is required"),

  body("specialization")
    .trim()
    .notEmpty()
    .withMessage("Specialization is required"),

  body("qualification")
    .trim()
    .notEmpty()
    .withMessage("Qualification is required"),

  body("experience")
    .isInt({ min: 0 })
    .withMessage("Experience must be a positive number"),

  body("consultationFee")
    .isFloat({ min: 0 })
    .withMessage("Consultation fee must be a positive number"),

  body("hospital")
    .trim()
    .notEmpty()
    .withMessage("Hospital name is required"),

  body("department")
    .optional()
    .trim(),

  body("licenseNumber")
    .trim()
    .notEmpty()
    .withMessage("License number is required"),

  body("bio")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Bio cannot exceed 1000 characters"),

  body("languages")
    .optional()
    .isArray()
    .withMessage("Languages must be an array"),
];

/* Validation Result */

export const validateDoctor = (req, res, next) => {
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