import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import ConsultationForm from "../../components/doctor/ConsultationForm";

export default function Consultation() {
  const navigate = useNavigate();

  const { appointmentId } = useParams();

  if (!appointmentId) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-md">
        <h2 className="text-2xl font-bold text-red-600">
          Invalid Appointment
        </h2>

        <p className="mt-3 text-slate-500">
          Appointment ID is missing.
        </p>

        <button
          onClick={() => navigate(-1)}
          className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Patient Consultation
          </h1>

          <p className="mt-2 text-slate-500">
            Review patient details, diagnose, prescribe medicines,
            and complete the consultation.
          </p>

        </div>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 hover:bg-slate-100"
        >
          <ArrowLeft size={18} />

          Back

        </button>

      </div>

      {/* Consultation Form */}

      <ConsultationForm
        appointmentId={appointmentId}
      />

    </div>
  );
}