import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Eye,
  CheckCircle,
  CircleCheckBig,
} from "lucide-react";

import {
  getMyDoctorAppointments,
  updateAppointmentStatus,
} from "../../services/appointmentService";

export default function AppointmentTable() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      setLoading(true);

      const response = await getMyDoctorAppointments();

      setAppointments(response.appointments || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to load appointments."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (
    appointmentId,
    status
  ) => {
    try {
      await updateAppointmentStatus(
        appointmentId,
        status
      );

      toast.success("Appointment updated.");

      loadAppointments();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to update appointment."
      );
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700";

      case "completed":
        return "bg-blue-100 text-blue-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow">
        <p className="text-center">
          Loading appointments...
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-bold">
          Appointments
        </h2>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
          {appointments.length} Total
        </span>

      </div>

      {appointments.length === 0 ? (
        <div className="py-12 text-center">

          <h3 className="text-xl font-semibold">
            No Appointments
          </h3>

          <p className="mt-2 text-slate-500">
            You don't have any appointments.
          </p>

        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead>

              <tr className="border-b">

                <th className="py-3 text-left">
                  Patient
                </th>

                <th className="py-3 text-left">
                  Date
                </th>

                <th className="py-3 text-left">
                  Time
                </th>

                <th className="py-3 text-left">
                  Symptoms
                </th>

                <th className="py-3 text-left">
                  Status
                </th>

                <th className="py-3 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {appointments.map((appointment) => (

                <tr
                  key={appointment._id}
                  className="border-b hover:bg-slate-50"
                >

                  <td className="py-4">

                    <div>

                      <h3 className="font-semibold">
                        {appointment.patient?.fullName}
                      </h3>

                      <p className="text-sm text-slate-500">
                        {appointment.patient?.email}
                      </p>

                    </div>

                  </td>

                  <td>
                    {new Date(
                      appointment.appointmentDate
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    {appointment.slot?.startTime}
                    {" - "}
                    {appointment.slot?.endTime}
                  </td>

                  <td className="max-w-xs truncate">
                    {appointment.symptoms}
                  </td>

                  <td>

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(
                        appointment.status
                      )}`}
                    >
                      {appointment.status}
                    </span>

                  </td>

                  <td>

                    <div className="flex justify-center gap-2">

                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/doctor/consultation/${appointment._id}`
                          )
                        }
                        className="rounded-lg bg-slate-100 p-2 hover:bg-slate-200"
                        title="Consultation"
                      >
                        <Eye size={18} />
                      </button>

                      {appointment.status ===
                        "pending" && (
                        <button
                          onClick={() =>
                            handleStatusUpdate(
                              appointment._id,
                              "confirmed"
                            )
                          }
                          className="rounded-lg bg-green-500 p-2 text-white hover:bg-green-600"
                          title="Confirm"
                        >
                          <CheckCircle
                            size={18}
                          />
                        </button>
                      )}

                      {appointment.status ===
                        "confirmed" && (
                        <button
                          onClick={() =>
                            handleStatusUpdate(
                              appointment._id,
                              "completed"
                            )
                          }
                          className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
                          title="Complete"
                        >
                          <CircleCheckBig
                            size={18}
                          />
                        </button>
                      )}

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}