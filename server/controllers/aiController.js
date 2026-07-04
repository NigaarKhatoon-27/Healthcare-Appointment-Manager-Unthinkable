import { generateSymptomSummary } from "../services/aiService.js";

export const getSymptomSummary =
  async (req, res, next) => {
    try {
      const { symptoms } = req.body;

      if (!symptoms) {
        return res.status(400).json({
          success: false,
          message: "Symptoms are required.",
        });
      }

      const summary =
        await generateSymptomSummary(
          symptoms
        );

      res.status(200).json({
        success: true,
        summary,
      });
    } catch (error) {
      next(error);
    }
  };