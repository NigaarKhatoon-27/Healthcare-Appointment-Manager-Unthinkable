import axiosInstance from "../api/axios";

export const generateSummary = async (
  symptoms
) => {
  const response =
    await axiosInstance.post(
      "/ai/symptom-summary",
      {
        symptoms,
      }
    );

  return response.data;
};