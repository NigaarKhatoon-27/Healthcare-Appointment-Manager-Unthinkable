import { motion } from "framer-motion";
import {
  UserPlus,
  CalendarCheck,
  BrainCircuit,
  Stethoscope,
} from "lucide-react";

import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";

const steps = [
  {
    icon: UserPlus,
    title: "Create Account",
    description:
      "Register as a patient in just a few seconds and access your healthcare dashboard.",
  },
  {
    icon: CalendarCheck,
    title: "Book Appointment",
    description:
      "Choose your preferred doctor, date, and available time slot.",
  },
  {
    icon: BrainCircuit,
    title: "AI Symptom Summary",
    description:
      "Describe your symptoms and let AI generate a concise summary for the doctor.",
  },
  {
    icon: Stethoscope,
    title: "Meet Your Doctor",
    description:
      "Attend your consultation with all relevant information already prepared.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-24">
      <Container>
        <SectionHeading
          badge="Simple Process"
          title="How It Works"
          subtitle="Our platform makes booking and managing healthcare appointments simple, fast, and intelligent."
        />

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                }}
                viewport={{ once: true }}
                className="relative rounded-3xl border border-slate-200 bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="absolute -top-4 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {index + 1}
                </div>

                <div className="mt-6 mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Icon size={30} />
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}