import express from "express";

import { getDoctorDashboard } from "../controllers/dashboardController.js";

import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

const router = express.Router();


  // Doctor Dashboard


router.get(
  "/doctor",
  protect,
  authorize("doctor"),
  getDoctorDashboard
);

export default router;