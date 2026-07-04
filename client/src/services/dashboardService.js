import axiosInstance from "../api/axios";


  // Doctor Dashboard


export const getDoctorDashboard = async () => {
  const response = await axiosInstance.get(
    "/dashboard/doctor"
  );

  return response.data;
};