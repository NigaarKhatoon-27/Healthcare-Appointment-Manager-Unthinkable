import { Link } from "react-router-dom";
import Container from "../common/Container";

import logo from "../../assets/images/logo/logo.png";

export default function AuthLayout({
  title,
  subtitle,
  children,
}) {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-100">

      <Container className="flex min-h-screen items-center justify-center">

        <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">

          {/* Left Side */}

          <div className="hidden flex-col justify-between bg-gradient-to-br from-blue-700 to-cyan-600 p-12 text-white lg:flex">

            <div>

              <Link
                to="/"
                className="flex items-center gap-4"
              >
                <img
                  src={logo}
                  alt="Healthcare Logo"
                  className="h-14 w-14 rounded-xl bg-white p-2"
                />

                <div>
                  <h2 className="text-2xl font-bold">
                    HealthCare
                  </h2>

                  <p className="text-blue-100">
                    Appointment Manager
                  </p>
                </div>
              </Link>

            </div>

            <div>

              <h1 className="text-5xl font-extrabold leading-tight">
                Smart Healthcare
                <br />
                Starts Here.
              </h1>

              <p className="mt-8 text-lg leading-8 text-blue-100">
                Manage appointments, connect with doctors,
                receive AI-powered symptom summaries,
                medication reminders,
                and follow-up care
                from one secure platform.
              </p>

            </div>

            <div>

              <p className="text-blue-100">
                © 2026 Healthcare Appointment Manager
              </p>

            </div>

          </div>

          {/* Right Side */}

          <div className="flex items-center justify-center p-10 md:p-14">

            <div className="w-full max-w-md">

              <h2 className="text-4xl font-bold text-slate-900">
                {title}
              </h2>

              <p className="mt-3 text-slate-500">
                {subtitle}
              </p>

              <div className="mt-10">

                {children}

              </div>

            </div>

          </div>

        </div>

      </Container>

    </section>
  );
}