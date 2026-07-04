import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  CalendarDays,
  Users,
  CircleCheckBig,
  Clock,
} from "lucide-react";

import { getDoctorDashboard } from "../../services/dashboardService";

export default function DoctorStats() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    todayAppointments: 0,
    totalPatients: 0,
    completedAppointments: 0,
    pendingAppointments: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const response = await getDoctorDashboard();

      const dashboard = response.dashboard || {};

      setStats({
        todayAppointments:
          dashboard.todayAppointments || 0,

        totalPatients:
          dashboard.totalPatients || 0,

        completedAppointments:
          dashboard.completedAppointments || 0,

        pendingAppointments:
          dashboard.pendingAppointments || 0,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to load dashboard statistics."
      );
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: "Today's Appointments",
      value: stats.todayAppointments,
      icon: CalendarDays,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Patients",
      value: stats.totalPatients,
      icon: Users,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Completed",
      value: stats.completedAppointments,
      icon: CircleCheckBig,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Pending",
      value: stats.pendingAppointments,
      icon: Clock,
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-2xl bg-slate-200"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div
              className={`mb-4 inline-flex rounded-full p-3 ${card.color}`}
            >
              <Icon size={24} />
            </div>

            <h3 className="text-sm font-medium text-slate-500">
              {card.title}
            </h3>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {card.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}