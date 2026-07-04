import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import DoctorAppointments from "./pages/doctor/Appointments";

import {
  getMyDoctorAppointments,
} from "../../services/appointmentService";

export default function Appointments() {
  const [appointments, setAppointments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      setLoading(true);

      const response =
        await getMyDoctorAppointments();

      setAppointments(
        response.appointments || []
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to load appointments."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow">

        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

        <p className="mt-4 text-slate-600">
          Loading appointments...
        </p>

      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold text-slate-800">
          My Appointments
        </h1>

        <p className="mt-2 text-slate-500">
          Manage today's consultations and upcoming appointments.
        </p>

      </div>

      <div className="overflow-x-auto rounded-2xl bg-white shadow">

        <table className="min-w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-6 py-4 text-left">
                Patient
              </th>

              <th className="px-6 py-4 text-left">
                Date
              </th>

              <th className="px-6 py-4 text-left">
                Time
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

              <th className="px-6 py-4 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {appointments.length === 0 ? (

              <tr>

                <td
                  colSpan="5"
                  className="py-10 text-center text-slate-500"
                >
                  No appointments found.
                </td>

              </tr>

            ) : (

              appointments.map(
                (appointment) => (

                  <tr
                    key={appointment._id}
                    className="border-b"
                  >

                    <td className="px-6 py-4">

                      <div className="font-medium">

                        {
                          appointment.patient
                            ?.fullName
                        }

                      </div>

                      <div className="text-sm text-slate-500">

                        {
                          appointment.patient
                            ?.email
                        }

                      </div>

                    </td>

                    <td className="px-6 py-4">

                      {new Date(
                        appointment.appointmentDate
                      ).toLocaleDateString()}

                    </td>

                    <td className="px-6 py-4">

                      {
                        appointment.slot
                          ?.startTime
                      }{" "}
                      -
                      {
                        appointment.slot
                          ?.endTime
                      }

                    </td>

                    <td className="px-6 py-4">

                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">

                        {appointment.status}

                      </span>

                    </td>

                    <td className="px-6 py-4 text-center">

                      <Link
                        to={`/doctor/consultation/${appointment._id}`}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                      >
                        Consult
                      </Link>

                    </td>

                  </tr>

                )
              )

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}