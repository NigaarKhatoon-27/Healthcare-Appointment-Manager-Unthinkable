import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  ClipboardList,
  User,
  Bell,
  LogOut,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

export default function DashboardSidebar() {
  const { logout, user } = useAuth();

  return (
    <aside className="flex w-72 flex-col bg-white shadow-lg">

      {/* Logo */}

      <div className="border-b p-6">

        <h2 className="text-2xl font-bold text-blue-600">
          HealthCare
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          {user?.role?.toUpperCase()}
        </p>

      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 p-4">

        <NavLink
          to="/patient/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-3 transition
            ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-slate-700 hover:bg-blue-50"
            }`
          }
        >
          <LayoutDashboard size={20} />

          Dashboard
        </NavLink>

        <NavLink
          to="/patient/book-appointment"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-3 transition
            ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-slate-700 hover:bg-blue-50"
            }`
          }
        >
          <CalendarDays size={20} />

          Book Appointment
        </NavLink>

        <NavLink
          to="/patient/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-3 transition
            ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-slate-700 hover:bg-blue-50"
            }`
          }
        >
          <User size={20} />

          Profile
        </NavLink>

        <NavLink
          to="/patient/notifications"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-3 transition
            ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-slate-700 hover:bg-blue-50"
            }`
          }
        >
          <Bell size={20} />

          Notifications
        </NavLink>
        <NavLink
  to="/patient/appointments"
  className={({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-slate-700 hover:bg-blue-50"
    }`
  }
>
  <ClipboardList size={20} />
  My Appointments
</NavLink>

      </nav>

      {/* Logout */}

      <div className="border-t p-4">

        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl bg-red-500 px-4 py-3 text-white transition hover:bg-red-600"
        >
          <LogOut size={20} />

          Logout
        </button>

      </div>

    </aside>
  );
}