import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  BrainCircuit,
  BellRing,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: CalendarCheck,
    title: "Easy Booking",
  },
  {
    icon: BrainCircuit,
    title: "AI Summaries",
  },
  {
    icon: BellRing,
    title: "Smart Reminders",
  },
  {
    icon: ShieldCheck,
    title: "Secure Platform",
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-blue-100">
      {/* Background Blur */}
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-blue-200 opacity-30 blur-3xl" />
      <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-cyan-200 opacity-30 blur-3xl" />

      <div className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-between gap-16 px-6 py-20 lg:flex-row">

        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            AI Powered Healthcare Platform
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight text-slate-900 md:text-7xl">
            Book Your
            <span className="block text-blue-600">
              Healthcare
            </span>
            Appointment Easily
          </h1>

          <p className="mt-8 text-lg leading-8 text-slate-600">
            Schedule appointments, receive AI-powered symptom
            summaries, medication reminders, and manage
            healthcare seamlessly with one secure platform.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/register"
              className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg transition hover:bg-blue-700"
            >
              Get Started
            </Link>

            <Link
              to="/about"
              className="rounded-xl border border-blue-600 px-8 py-4 font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              Learn More
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4">
            {features.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white p-5 text-center shadow-md"
              >
                <item.icon
                  size={32}
                  className="mx-auto mb-3 text-blue-600"
                />

                <h3 className="font-semibold text-slate-700">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Section */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex w-full max-w-md items-center justify-center"
        >
          <div className="rounded-3xl border border-white/40 bg-white/60 p-10 shadow-2xl backdrop-blur-xl">
            <div className="space-y-6">
              <div className="rounded-xl bg-blue-100 p-5">
                <h3 className="font-bold text-blue-700">
                  Today's Appointments
                </h3>

                <p className="mt-2 text-4xl font-extrabold text-slate-900">
                  28
                </p>
              </div>

              <div className="rounded-xl bg-green-100 p-5">
                <h3 className="font-bold text-green-700">
                  Patients Registered
                </h3>

                <p className="mt-2 text-4xl font-extrabold text-slate-900">
                  1,250+
                </p>
              </div>

              <div className="rounded-xl bg-purple-100 p-5">
                <h3 className="font-bold text-purple-700">
                  AI Reports Generated
                </h3>

                <p className="mt-2 text-4xl font-extrabold text-slate-900">
                  8,900+
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}