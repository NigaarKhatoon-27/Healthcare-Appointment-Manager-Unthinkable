import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import PrescriptionCard from "../../components/patient/PrescriptionCard";

import {
  getMyPatientPrescriptions,
} from "../../services/prescriptionService";

export default function Prescriptions() {
  const [prescriptions, setPrescriptions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadPrescriptions();
  }, []);

  const loadPrescriptions = async () => {
    try {
      setLoading(true);

      const response =
        await getMyPatientPrescriptions();

      setPrescriptions(
        response.prescriptions || []
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to load prescriptions."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-10 shadow text-center">

        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

        <p className="mt-5 text-slate-600">
          Loading prescriptions...
        </p>

      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          My Prescriptions
        </h1>

        <p className="mt-2 text-slate-500">
          View all prescriptions issued by your doctors.
        </p>

      </div>

      {prescriptions.length === 0 ? (

        <div className="rounded-2xl bg-white p-12 text-center shadow">

          <h2 className="text-2xl font-semibold">
            No Prescriptions Found
          </h2>

          <p className="mt-3 text-slate-500">
            Your prescriptions will appear here after a doctor completes your consultation.
          </p>

        </div>

      ) : (

        <div className="grid gap-6">

          {prescriptions.map((prescription) => (

            <PrescriptionCard
              key={prescription._id}
              prescription={prescription}
            />

          ))}

        </div>

      )}

    </div>
  );
}