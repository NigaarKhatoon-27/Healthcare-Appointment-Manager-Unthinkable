import axiosInstance from "../api/axios";

/* Get All Doctors */

export const getDoctors = async (params = {}) => {
  const response = await axiosInstance.get(
    "/doctors",
    {
      params,
    }
  );

  return response.data;
};

/*  Get Doctor Details */

export const getDoctorById = async (doctorId) => {
  const response = await axiosInstance.get(
    `/doctors/${doctorId}`
  );

  return response.data;
};

/* Get Doctor Availability */

export const getDoctorAvailability = async (
  doctorId
) => {
  const response = await axiosInstance.get(
    `/doctors/${doctorId}/availability`
  );

  return response.data;
};