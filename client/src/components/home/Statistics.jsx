import { motion } from "framer-motion";
import {
  Users,
  UserRoundCheck,
  CalendarCheck,
  Star,
} from "lucide-react";

import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";

const stats = [
  {
    icon: Users,
    number: "10,000+",
    title: "Patients Served",
  },
  {
    icon: UserRoundCheck,
    number: "150+",
    title: "Experienced Doctors",
  },
  {
    icon: CalendarCheck,
    number: "50,000+",
    title: "Appointments Completed",
  },
  {
    icon: Star,
    number: "98%",
    title: "Patient Satisfaction",
  },
];

export default function Statistics() {
  return (
    <section className="bg-slate-50 py-20">
      <Container>
        <SectionHeading
          badge="Our Achievements"
          title="Trusted by Thousands of Patients"
          subtitle="We provide secure, efficient, and AI-powered healthcare services trusted by patients and healthcare professionals."
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2 xl:grid-cols-4"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-3xl bg-white p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Icon size={30} />
                </div>

                <h3 className="text-4xl font-extrabold text-slate-900">
                  {stat.number}
                </h3>

                <p className="mt-3 text-slate-600">
                  {stat.title}
                </p>
              </div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}