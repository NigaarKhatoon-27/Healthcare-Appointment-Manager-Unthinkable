import express from "express";

import { getSymptomSummary } from "../controllers/aiController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/symptom-summary",
  protect,
  getSymptomSummary
);

export default router;