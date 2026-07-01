import { CalendarDays, Star } from "lucide-react";

export default function DoctorCard({
  image,
  name,
  specialization,
  experience,
  rating,
}) {
  return (
    <div className="group overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-6">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600">
          {specialization}
        </span>

        <h3 className="mt-4 text-2xl font-bold text-slate-900">
          {name}
        </h3>

        <p className="mt-2 text-slate-500">
          {experience} Years Experience
        </p>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star
              size={18}
              className="fill-yellow-400 text-yellow-400"
            />
            <span className="font-semibold">{rating}</span>
          </div>

          <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700">
            <CalendarDays size={18} />
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}