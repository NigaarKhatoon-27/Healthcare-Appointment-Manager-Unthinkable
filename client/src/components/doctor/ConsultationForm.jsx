
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Button from "../common/Button";
import MedicineTable from "./MedicineTable";
import PrescriptionPreview from "./PrescriptionPreview";

import {
  createPrescription,
} from "../../services/prescriptionService";

import {
  getAppointmentById,
} from "../../services/appointmentService";

export default function ConsultationForm({
  appointmentId,
}) {
  const navigate = useNavigate();

  const [appointment, setAppointment] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [preview, setPreview] =
    useState(false);

  const [medicines, setMedicines] =
    useState([]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    defaultValues: {
      diagnosis: "",
      notes: "",
      followUpDate: "",
    },
  });

  useEffect(() => {
    if (appointmentId) {
      loadAppointment();
    }
  }, [appointmentId]);

  const loadAppointment = async () => {
    try {
      setLoading(true);

      const response =
        await getAppointmentById(
          appointmentId
        );

      setAppointment(
        response.appointment
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to load appointment."
      );
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    if (medicines.length === 0) {
      return toast.error(
        "Please add at least one medicine."
      );
    }

    try {
      await createPrescription({
        appointment: appointmentId,
        diagnosis: data.diagnosis,
        medicines,
        notes: data.notes,
        followUpDate:
          data.followUpDate || null,
      });

      toast.success(
        "Prescription created successfully."
      );

      reset();

      setMedicines([]);

      setPreview(false);

      navigate("/doctor/appointments");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to create prescription."
      );
    }
  };

  // Guard Clause for Loading State
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-10 shadow text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        <p className="mt-5 text-slate-600">
          Loading Appointment...
        </p>
      </div>
    );
  }

  // Guard Clause for Missing Appointment
  if (!appointment) {
    return (
      <div className="rounded-2xl bg-white p-10 shadow text-center">
        <h2 className="text-2xl font-bold text-red-600">
          Appointment Not Found
        </h2>
      </div>
    );
  }

  // Main Component UI Render
  return (
    <div className="space-y-8">
      
         // Patient Details
      
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">
            Patient Details
          </h2>
          <span
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              appointment.status === "completed"
                ? "bg-green-100 text-green-700"
                : appointment.status === "confirmed"
                ? "bg-blue-100 text-blue-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {appointment.status}
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500">
              Patient Name
            </p>
            <h3 className="text-lg font-semibold">
              {appointment.patient?.fullName}
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Email
            </p>
            <h3>
              {appointment.patient?.email}
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Appointment Date
            </p>
            <h3>
              {new Date(
                appointment.appointmentDate
              ).toLocaleDateString()}
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Appointment Time
            </p>
            <h3>
              {appointment.slot?.startTime}
              {" - "}
              {appointment.slot?.endTime}
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Meeting Mode
            </p>
            <h3 className="capitalize">
              {appointment.meetingMode}
            </h3>
          </div>
        </div>
      </div>

      
         // Symptoms
      
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold">
          Reported Symptoms
        </h2>
        <div className="rounded-xl bg-slate-50 p-5">
          <p className="leading-7 text-slate-700">
            {appointment.symptoms || "No symptoms provided."}
          </p>
        </div>
      </div>
{appointment.aiSummary && (
  <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">

    <h3 className="mb-3 text-lg font-semibold text-blue-700">
      🤖 AI Symptom Summary
    </h3>

    <div className="whitespace-pre-line text-slate-700">
      {appointment.aiSummary}
    </div>

    <p className="mt-3 text-xs text-slate-500">
      AI-generated summary for reference only.
      Final diagnosis should be made by the doctor.
    </p>

  </div>
)}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h2 className="text-2xl font-bold">
          Consultation Details
        </h2>
        
        <div>
          <label className="mb-2 block font-medium">
            Diagnosis
          </label>
          <textarea
            rows={5}
            placeholder="Enter diagnosis..."
            className="w-full rounded-xl border border-slate-300 p-4 focus:border-blue-500 focus:outline-none"
            {...register("diagnosis", {
              required: "Diagnosis is required",
              minLength: {
                value: 5,
                message: "Diagnosis should contain at least 5 characters.",
              },
            })}
          />
          {errors.diagnosis && (
            <p className="mt-2 text-sm text-red-500">
              {errors.diagnosis.message}
            </p>
          )}
        </div>

        
          //  Medicines
       
        <MedicineTable
          medicines={medicines}
          setMedicines={setMedicines}
        />

        
           // Consultation Notes
        
        <div>
          <label className="mb-2 block font-medium">
            Consultation Notes
          </label>
          <textarea
            rows={5}
            placeholder="Write consultation notes..."
            className="w-full rounded-xl border border-slate-300 p-4 focus:border-blue-500 focus:outline-none"
            {...register("notes")}
          />
        </div>

        
          //  Follow-up
        
        <div>
          <label className="mb-2 block font-medium">
            Follow-up Date
          </label>
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            className="w-full rounded-xl border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
            {...register("followUpDate")}
          />
        </div>


          //  Action Buttons
        
        <div className="flex flex-wrap gap-4">
          <Button
            type="button"
            variant="secondary"
            disabled={medicines.length === 0}
            onClick={() => setPreview(true)}
          >
            Preview Prescription
          </Button>

          <Button
            type="submit"
            loading={isSubmitting}
          >
            Save Prescription
          </Button>
        </div>
      </form>

      
         // Prescription Preview
  
      {preview && (
        <PrescriptionPreview
          patient={appointment.patient}
          diagnosis={watch("diagnosis")}
          medicines={medicines}
          notes={watch("notes")}
          followUpDate={watch("followUpDate")}
        />
      )}
    </div>
  );
}