import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AppointmentCard from "../../components/appointment/AppointmentCard";

import {
  getMyAppointments,
  cancelAppointment,
} from "../../services/appointmentService";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const response =
        await getMyAppointments();

      setAppointments(response.appointments);
    } catch (error) {
      toast.error("Unable to load appointments.");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleCancel = async (id) => {
    if (
      !window.confirm(
        "Cancel this appointment?"
      )
    ) {
      return;
    }

    try {
      await cancelAppointment(id);

      toast.success(
        "Appointment cancelled successfully."
      );

      fetchAppointments();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Cancellation failed."
      );
    }
  };

  return (
    <div>

      <h1 className="mb-8 text-3xl font-bold">
        My Appointments
      </h1>

      {appointments.length === 0 ? (
        <div className="rounded-xl bg-white p-10 text-center shadow">
          <h2 className="text-xl font-semibold">
            No Appointments Yet
          </h2>

          <p className="mt-2 text-slate-500">
            Book your first appointment.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment._id}
              appointment={appointment}
              onCancel={handleCancel}
            />
          ))}
        </div>
      )}

    </div>
  );
}