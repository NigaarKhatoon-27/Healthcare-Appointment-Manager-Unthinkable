import { useState } from "react";

import DoctorList from "../../components/appointment/DoctorList";
import AvailabilityCalendar from "../../components/appointment/AvailabilityCalendar";
import TimeSlotPicker from "../../components/appointment/TimeSlotPicker";
import AppointmentForm from "../../components/appointment/AppointmentForm";

export default function BookAppointment() {
  const [selectedDoctor, setSelectedDoctor] =
    useState(null);

  const [selectedDate, setSelectedDate] =
    useState(null);

  const [selectedSlot, setSelectedSlot] =
    useState(null);

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);

    // Reset dependent selections
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);

    // Reset slot when date changes
    setSelectedSlot(null);
  };

  return (
    <div className="space-y-10">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold text-slate-800">
          Book Appointment
        </h1>

        <p className="mt-2 text-slate-500">
          Choose your preferred doctor, select an available
          date and time, then complete your appointment request.
        </p>

      </div>

      {/* Step 1 */}

      <DoctorList
        selectedDoctor={selectedDoctor}
        setSelectedDoctor={handleDoctorSelect}
      />

      {/* Step 2 */}

      {selectedDoctor && (
        <AvailabilityCalendar
          doctor={selectedDoctor}
          selectedDate={selectedDate}
          setSelectedDate={handleDateSelect}
        />
      )}

      {/* Step 3 */}

      {selectedDate && (
        <TimeSlotPicker
          doctor={selectedDoctor}
          selectedDate={selectedDate}
          selectedSlot={selectedSlot}
          setSelectedSlot={setSelectedSlot}
        />
      )}

      {/* Step 4 */}

      {selectedSlot && (
        <AppointmentForm
          selectedDoctor={selectedDoctor}
          selectedDate={selectedDate}
          selectedSlot={selectedSlot}
        />
      )}

    </div>
  );
}