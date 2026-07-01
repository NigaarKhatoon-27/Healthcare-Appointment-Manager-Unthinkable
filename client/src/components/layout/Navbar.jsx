import { Link } from "react-router-dom";
import { HeartPulse } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <div className="rounded-xl bg-blue-600 p-2 text-white">
            <HeartPulse size={22} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-800">
              HealthCare
            </h1>

            <p className="text-xs text-slate-500">
              Appointment Manager
            </p>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="font-medium text-slate-700 transition hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="font-medium text-slate-700 transition hover:text-blue-600"
          >
            About
          </Link>

          <Link
            to="/doctors"
            className="font-medium text-slate-700 transition hover:text-blue-600"
          >
            Doctors
          </Link>

          <Link
            to="/contact"
            className="font-medium text-slate-700 transition hover:text-blue-600"
          >
            Contact
          </Link>
        </div>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-lg border border-blue-600 px-5 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}