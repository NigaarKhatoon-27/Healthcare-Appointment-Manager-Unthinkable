import axiosInstance from "../api/axios";

/* Register User */

export const registerUser = async (userData) => {
  const response = await axiosInstance.post(
    "/auth/register",
    userData
  );

  return response.data;
};

/* Login User */

export const loginUser = async (userData) => {
  const response = await axiosInstance.post(
    "/auth/login",
    userData
  );

  return response.data;
};

/* Logout User */

export const logoutUser = async () => {
  const response =
    await axiosInstance.post("/auth/logout");

  return response.data;
};