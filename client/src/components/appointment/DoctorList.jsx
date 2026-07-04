import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DoctorCard from "./DoctorCard";
import { getDoctors } from "../../services/doctorService";

export default function DoctorList({
  selectedDoctor,
  setSelectedDoctor,
}) {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);

      const response = await getDoctors();

      setDoctors(response.doctors);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to load doctors."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-10 text-center">
        <p className="text-slate-500">
          Loading doctors...
        </p>
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow">
        <h2 className="text-xl font-semibold">
          No Doctors Found
        </h2>

        <p className="mt-2 text-slate-500">
          Please check again later.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">
        Choose Your Doctor
      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {doctors.map((doctor) => (
          <DoctorCard
            key={doctor._id}
            doctor={doctor}
            selected={
              selectedDoctor?._id === doctor._id
            }
            onSelect={setSelectedDoctor}
          />
        ))}
      </div>
    </div>
  );
}