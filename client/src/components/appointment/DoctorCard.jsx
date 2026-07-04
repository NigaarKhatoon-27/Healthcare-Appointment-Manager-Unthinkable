import { MapPin, BriefcaseMedical, Star } from "lucide-react";

export default function DoctorCard({
  doctor,
  selected,
  onSelect,
}) {
  return (
    <div
      onClick={() => onSelect(doctor)}
      className={`cursor-pointer rounded-2xl border p-5 shadow-sm transition-all duration-300 hover:shadow-lg ${
        selected
          ? "border-blue-600 bg-blue-50"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-center gap-4">
        <img
          src={
            doctor.profileImage ||
            "https://ui-avatars.com/api/?name=Doctor"
          }
          alt={doctor.user.fullName}
          className="h-20 w-20 rounded-full object-cover"
        />

        <div className="flex-1">
          <h3 className="text-lg font-semibold">
            {doctor.user.fullName}
          </h3>

          <p className="mt-1 flex items-center gap-2 text-sm text-slate-600">
            <BriefcaseMedical size={16} />
            {doctor.specialization}
          </p>

          <p className="mt-1 flex items-center gap-2 text-sm text-slate-600">
            <MapPin size={16} />
            {doctor.hospital}
          </p>

          <div className="mt-2 flex items-center justify-between">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
              ₹{doctor.consultationFee}
            </span>

            <span className="flex items-center gap-1 text-yellow-500">
              <Star size={16} fill="currentColor" />
              {doctor.rating?.average?.toFixed(1) || "0.0"}
            </span>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            {doctor.experience} years experience
          </p>
        </div>
      </div>
    </div>
  );
}