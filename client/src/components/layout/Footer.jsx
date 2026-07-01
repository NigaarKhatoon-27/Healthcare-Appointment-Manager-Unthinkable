import { Link } from "react-router-dom";
import {
  HeartPulse,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-gray-200 bg-slate-900 text-gray-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <div className="rounded-lg bg-blue-600 p-2 text-white">
              <HeartPulse size={22} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">
                HealthCare
              </h2>

              <p className="text-sm text-gray-400">
                Appointment Manager
              </p>
            </div>
          </div>

          <p className="leading-7 text-gray-400">
            A modern healthcare platform for
            appointment booking, AI-assisted
            consultations, medication reminders,
            and doctor management.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">
            Quick Links
          </h3>

          <ul className="space-y-3">
            <li>
              <Link
                to="/"
                className="hover:text-white"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className="hover:text-white"
              >
                About
              </Link>
            </li>

            <li>
              <Link
                to="/doctors"
                className="hover:text-white"
              >
                Doctors
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="hover:text-white"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">
            Contact
          </h3>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail size={18} />
              <span>support@healthcare.com</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={18} />
              <span>+91 98765 43210</span>
            </div>

            <div className="flex items-center gap-3">
              <MapPin size={18} />
              <span>Kanpur, Uttar Pradesh</span>
            </div>
          </div>
        </div>

        {/* Social */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">
            Follow Us
          </h3>

          <div className="flex gap-4">
            <a
              href="#"
              className="rounded-lg bg-slate-800 p-3 transition hover:bg-blue-600"
            >
              <FaGithub size={20} />
            </a>

            <a
              href="#"
              className="rounded-lg bg-slate-800 p-3 transition hover:bg-blue-600"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 py-6 text-center text-sm text-gray-400">
        © {currentYear} Healthcare Appointment &
        Follow-up Manager. All rights reserved By NigaarK.
      </div>
    </footer>
  );
}