import { CalendarDays, Clock, User, XCircle } from "lucide-react";

export default function AppointmentCard({
  appointment,
  onCancel,
}) {
  const doctor = appointment.doctor?.user;

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

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">

      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-xl font-semibold">
            {doctor?.fullName}
          </h2>

          <p className="text-slate-500">
            {appointment.doctor.specialization}
          </p>

        </div>

        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(
            appointment.status
          )}`}
        >
          {appointment.status}
        </span>

      </div>

      <div className="mt-6 space-y-3">

        <div className="flex items-center gap-3">

          <CalendarDays size={18} />

          {new Date(
            appointment.appointmentDate
          ).toLocaleDateString()}

        </div>

        <div className="flex items-center gap-3">

          <Clock size={18} />

          {appointment.slot.startTime} - {appointment.slot.endTime}

        </div>

        <div className="flex items-center gap-3">

          <User size={18} />

          {appointment.meetingMode}

        </div>

      </div>

      {appointment.status === "pending" && (
        <button
          onClick={() => onCancel(appointment._id)}
          className="mt-6 flex items-center gap-2 rounded-xl bg-red-500 px-5 py-2 text-white hover:bg-red-600"
        >
          <XCircle size={18} />

          Cancel Appointment

        </button>
      )}

    </div>
  );
}