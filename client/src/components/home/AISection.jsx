import { motion } from "framer-motion";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";

import {
  BrainCircuit,
  FileText,
  Stethoscope,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    icon: BrainCircuit,
    title: "Describe Symptoms",
    description:
      "Patients enter symptoms before booking an appointment.",
  },
  {
    icon: FileText,
    title: "AI Analysis",
    description:
      "AI creates a structured summary for doctors.",
  },
  {
    icon: Stethoscope,
    title: "Doctor Review",
    description:
      "Doctors review the summary before consultation.",
  },
  {
    icon: CheckCircle2,
    title: "Better Healthcare",
    description:
      "Faster diagnosis and improved patient care.",
  },
];

export default function AISection() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-20">
      <Container>
        <SectionHeading
          badge="Artificial Intelligence"
          title="AI Powered Healthcare Assistant"
          subtitle="Improve healthcare with AI-generated symptom summaries that help doctors prepare before consultations."
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
                className="rounded-3xl bg-white p-8 shadow-lg"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Icon size={30} />
                </div>

                <h3 className="text-2xl font-bold">
                  {step.title}
                </h3>

                <p className="mt-4 text-slate-600">
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