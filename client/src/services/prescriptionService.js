import axiosInstance from "../api/axios";


  // Create Prescription


export const createPrescription = async (
  prescriptionData
) => {
  const response = await axiosInstance.post(
    "/prescriptions",
    prescriptionData
  );

  return response.data;
};


 //  Get Prescription By ID


export const getPrescriptionById = async (
  prescriptionId
) => {
  const response = await axiosInstance.get(
    `/prescriptions/${prescriptionId}`
  );

  return response.data;
};


 //  Get Prescription By Appointment


export const getPrescriptionByAppointment =
  async (appointmentId) => {
    const response =
      await axiosInstance.get(
        `/prescriptions/appointment/${appointmentId}`
      );

    return response.data;
  };


  // Patient Prescription History


export const getMyPatientPrescriptions =
  async () => {
    const response =
      await axiosInstance.get(
        "/prescriptions/patient/me"
      );

    return response.data;
  };

 //  Doctor Prescription History


export const getMyDoctorPrescriptions =
  async () => {
    const response =
      await axiosInstance.get(
        "/prescriptions/doctor/me"
      );

    return response.data;
  };

  // Update Prescription


export const updatePrescription =
  async (
    prescriptionId,
    prescriptionData
  ) => {
    const response =
      await axiosInstance.put(
        `/prescriptions/${prescriptionId}`,
        prescriptionData
      );

    return response.data;
  };


  // Delete Prescription


export const deletePrescription =
  async (prescriptionId) => {
    const response =
      await axiosInstance.delete(
        `/prescriptions/${prescriptionId}`
      );

    return response.data;
  };