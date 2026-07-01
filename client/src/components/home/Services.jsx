import ServiceCard from "../common/ServiceCard";
import SectionHeading from "../common/SectionHeading";
import Container from "../common/Container";

import {
  Stethoscope,
  CalendarCheck,
  Pill,
  BrainCircuit,
  BellRing,
 ClipboardList,
} from "lucide-react";

const services = [
  {
    icon: CalendarCheck,
    title: "Appointment Booking",
    description:
      "Book appointments with doctors based on available time slots in real time.",
  },
  {
    icon: Stethoscope,
    title: "Doctor Consultation",
    description:
      "Consult experienced doctors online or in person with complete appointment management.",
  },
  {
    icon: BrainCircuit,
    title: "AI Symptom Analysis",
    description:
      "Generate AI-powered symptom summaries before consultations to help doctors prepare faster.",
  },
  {
    icon: Pill,
    title: "Medication Tracking",
    description:
      "Track prescriptions, medicines, and treatment progress from your dashboard.",
  },
  {
    icon: BellRing,
    title: "Smart Reminders",
    description:
      "Receive appointment and medication reminders via notifications and email.",
  },
  {
    icon: ClipboardList,
    title: "Medical Records",
    description:
      "Store and access appointment history, reports, prescriptions, and follow-up records securely.",
  },
];

export default function Services() {
  return (
    <section className="bg-white py-20">
      <Container>
        <SectionHeading
          badge="Healthcare Services"
          title="Everything You Need in One Platform"
          subtitle="Manage appointments, AI summaries, prescriptions, reminders, and healthcare records from one modern platform."
        />

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              {...service}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}