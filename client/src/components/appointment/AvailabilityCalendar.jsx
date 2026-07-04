import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getDoctorAvailability } from "../../services/doctorService";

export default function AvailabilityCalendar({
  doctor,
  selectedDate,
  setSelectedDate,
}) {
  const [availability, setAvailability] = useState([]);

  useEffect(() => {
    if (doctor) {
      fetchAvailability();
    }
  }, [doctor]);

  const fetchAvailability = async () => {
    try {
      const response =
        await getDoctorAvailability(
          doctor._id
        );

      setAvailability(response.availability);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to fetch availability."
      );
    }
  };

  if (!doctor) return null;

  return (
    <div className="mt-8">
      <h2 className="mb-5 text-xl font-bold">
        Select Appointment Date
      </h2>

      <div className="flex flex-wrap gap-4">
        {availability.map((day) => (
          <button
            key={day._id}
            onClick={() =>
              setSelectedDate(day)
            }
            className={`rounded-xl border px-5 py-3 transition ${
              selectedDate?._id === day._id
                ? "bg-blue-600 text-white"
                : "bg-white hover:bg-blue-50"
            }`}
          >
            {new Date(day.date).toLocaleDateString()}
          </button>
        ))}
      </div>
    </div>
  );
}