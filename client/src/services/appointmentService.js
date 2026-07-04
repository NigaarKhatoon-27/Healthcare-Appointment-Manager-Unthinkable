import axiosInstance from "../api/axios";

/*
   Book Appointment
*/

export const bookAppointment = async (appointmentData) => {
  const response = await axiosInstance.post(
    "/appointments",
    appointmentData
  );

  return response.data;
};

/* 
   Patient - Get My Appointments
 */

export const getMyAppointments = async () => {
  const response = await axiosInstance.get(
    "/appointments/my"
  );

  return response.data;
};

/*
   Patient - Get Appointment Details
 */

export const getAppointmentById = async (
  appointmentId
) => {
  const response = await axiosInstance.get(
    `/appointments/${appointmentId}`
  );

  return response.data;
};

/* 
   Patient - Cancel Appointment
 */

export const cancelAppointment = async (
  appointmentId
) => {
  const response = await axiosInstance.put(
    `/appointments/${appointmentId}/cancel`
  );

  return response.data;
};

/*
   Doctor - Logged In Doctor Appointments
*/

export const getMyDoctorAppointments =
  async () => {
    const response =
      await axiosInstance.get(
        "/appointments/doctor/me"
      );

    return response.data;
  };

/* 
   Doctor - Get Appointments By Doctor ID
 */

export const getDoctorAppointments =
  async (doctorId) => {
    const response =
      await axiosInstance.get(
        `/appointments/doctor/${doctorId}`
      );

    return response.data;
  };

/*
   Doctor - Update Appointment Status
 */

export const updateAppointmentStatus =
  async (appointmentId, status) => {
    const response =
      await axiosInstance.put(
        `/appointments/${appointmentId}/status`,
        {
          status,
        }
      );

    return response.data;
  };