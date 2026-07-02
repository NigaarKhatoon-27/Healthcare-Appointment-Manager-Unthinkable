import {
  CalendarDays,
  ClipboardList,
  Bell,
  UserRound,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  const cards = [
    {
      title: "Upcoming Appointments",
      value: "2",
      icon: CalendarDays,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Completed Visits",
      value: "8",
      icon: ClipboardList,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Notifications",
      value: "5",
      icon: Bell,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Profile Completion",
      value: "80%",
      icon: UserRound,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}

      <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold">
          Welcome, {user?.fullName || "Patient"} 👋
        </h1>

        <p className="mt-2 text-blue-100">
          Manage your appointments, view prescriptions,
          and stay updated with your healthcare journey.
        </p>
      </div>

      {/* Dashboard Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div
                className={`mb-4 inline-flex rounded-full p-3 ${card.color}`}
              >
                <Icon size={24} />
              </div>

              <h3 className="text-lg font-semibold text-slate-700">
                {card.title}
              </h3>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {card.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}

      <div className="rounded-2xl bg-white p-6 shadow-md">
        <h2 className="mb-6 text-xl font-bold text-slate-800">
          Recent Activity
        </h2>

        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-700">
              Appointment Confirmed
            </h3>

            <p className="text-sm text-slate-500">
              Your appointment with Dr. Sharma has been
              confirmed for tomorrow at 10:00 AM.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-700">
              Prescription Available
            </h3>

            <p className="text-sm text-slate-500">
              Your latest prescription is now available
              for download.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-700">
              Medication Reminder
            </h3>

            <p className="text-sm text-slate-500">
              Don't forget to take your medication at
              8:00 PM today.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}