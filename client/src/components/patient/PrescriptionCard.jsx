import { useRef, useState } from "react";
import {
  CalendarDays,
  Download,
  Eye,
  Printer,
  UserRound,
  Pill,
  X,
} from "lucide-react";

import PrescriptionPreview from "../doctor/PrescriptionPreview";
import { downloadPrescriptionPDF } from "../../utils/downloadPrescriptionPDF";

export default function PrescriptionCard({
  prescription,
}) {
  const [showPreview, setShowPreview] =
    useState(false);

  const previewRef = useRef(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    await downloadPrescriptionPDF(
      previewRef.current,
      `Prescription-${prescription._id}.pdf`
    );
  };

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg">

        <div className="flex flex-col justify-between gap-6 lg:flex-row">

          {/* Left */}

          <div className="space-y-5">

            <div className="flex items-center gap-3">

              <UserRound
                className="text-blue-600"
                size={24}
              />

              <div>

                <p className="text-sm text-slate-500">
                  Doctor
                </p>

                <h2 className="text-xl font-semibold">

                  {prescription.doctor?.user?.fullName ||
                    "Doctor"}

                </h2>

              </div>

            </div>

            <div>

              <p className="text-sm text-slate-500">
                Diagnosis
              </p>

              <h3 className="font-medium">

                {prescription.diagnosis}

              </h3>

            </div>

            <div className="flex items-center gap-3">

              <Pill
                size={20}
                className="text-green-600"
              />

              <div>

                <p className="text-sm text-slate-500">
                  Medicines
                </p>

                <h3 className="font-medium">

                  {
                    prescription.medicines
                      ?.length
                  }{" "}
                  Medicine(s)

                </h3>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <CalendarDays
                className="text-purple-600"
                size={20}
              />

              <div>

                <p className="text-sm text-slate-500">
                  Follow-up
                </p>

                <h3 className="font-medium">

                  {prescription.followUpDate
                    ? new Date(
                        prescription.followUpDate
                      ).toLocaleDateString()
                    : "Not Required"}

                </h3>

              </div>

            </div>

          </div>

          {/* Right */}

          <div className="flex flex-wrap items-start gap-3">

            <button
              onClick={() =>
                setShowPreview(true)
              }
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
            >
              <Eye size={18} />

              View

            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-2 hover:bg-slate-100"
            >
              <Printer size={18} />

              Print

            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-2 hover:bg-slate-100"
            >
              <Download size={18} />

              PDF

            </button>

          </div>

        </div>

      </div>

      {/* Preview Modal */}

      {showPreview && (

        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 p-8">

          <div className="mx-auto max-w-5xl rounded-2xl bg-white shadow-xl">

            <div className="flex items-center justify-between border-b p-5">

              <h2 className="text-2xl font-bold">
                Prescription Preview
              </h2>

              <button
                onClick={() =>
                  setShowPreview(false)
                }
                className="rounded-full p-2 hover:bg-slate-100"
              >
                <X size={22} />
              </button>

            </div>

            <div
              ref={previewRef}
              className="p-8"
            >

              <PrescriptionPreview
                patient={
                  prescription.patient
                }
                diagnosis={
                  prescription.diagnosis
                }
                medicines={
                  prescription.medicines
                }
                notes={
                  prescription.notes
                }
                followUpDate={
                  prescription.followUpDate
                }
              />

            </div>

          </div>

        </div>

      )}

    </>
  );
}