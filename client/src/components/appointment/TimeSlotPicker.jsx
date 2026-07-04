export default function TimeSlotPicker({
  selectedDate,
  selectedSlot,
  setSelectedSlot,
}) {
  if (!selectedDate) return null;

  return (
    <div className="mt-8">
      <h2 className="mb-5 text-xl font-bold">
        Select Time Slot
      </h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {selectedDate.slots.map((slot, index) => {
          const isSelected =
            selectedSlot?.startTime === slot.startTime &&
            selectedSlot?.endTime === slot.endTime;

          return (
            <button
              key={index}
              disabled={slot.isBooked}
              onClick={() => setSelectedSlot(slot)}
              className={`rounded-xl border px-4 py-3 font-medium transition-all ${
                slot.isBooked
                  ? "cursor-not-allowed border-red-200 bg-red-100 text-red-500"
                  : isSelected
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-300 bg-white hover:border-blue-500 hover:bg-blue-50"
              }`}
            >
              <div>{slot.startTime}</div>

              <div className="text-xs opacity-80">
                to
              </div>

              <div>{slot.endTime}</div>

              {slot.isBooked && (
                <p className="mt-2 text-xs">
                  Booked
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}