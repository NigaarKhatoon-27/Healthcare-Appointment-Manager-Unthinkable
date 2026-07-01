import {
  CalendarCheck,
  BrainCircuit,
  BellRing,
  ShieldCheck,
} from "lucide-react";

import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";

const features = [
  {
    title: "Easy Appointment Booking",
    description:
      "Book appointments with available doctors in just a few clicks.",
    icon: CalendarCheck,
  },
  {
    title: "AI Symptom Summary",
    description:
      "Generate concise AI-powered summaries of patient symptoms before consultation.",
    icon: BrainCircuit,
  },
  {
    title: "Medication Reminders",
    description:
      "Receive timely reminders for medicines and follow-up appointments.",
    icon: BellRing,
  },
  {
    title: "Secure Medical Records",
    description:
      "Protect patient data using secure authentication and encrypted storage.",
    icon: ShieldCheck,
  },
];

export default function Features() {
  return (
    <section className="bg-white py-20">
      <Container>
        <SectionHeading
          badge="Platform Features"
          title="Everything You Need For Better Healthcare"
          subtitle="Designed for patients, doctors, and administrators to simplify appointment management and improve healthcare experiences."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-6 inline-flex rounded-2xl bg-blue-100 p-4 text-blue-600">
                  <Icon size={32} />
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}