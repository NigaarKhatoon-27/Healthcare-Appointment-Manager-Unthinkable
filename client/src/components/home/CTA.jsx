import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Container from "../common/Container";

export default function CTA() {
  return (
    <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-[32px] bg-white/10 p-12 text-center backdrop-blur-lg"
        >
          <h2 className="text-4xl font-extrabold text-white md:text-5xl">
            Ready to Transform Your Healthcare Experience?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-blue-100">
            Book appointments, connect with experienced doctors,
            receive AI-powered symptom summaries, manage prescriptions,
            and never miss a follow-up again.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5">
            <Link
              to="/register"
              className="rounded-xl bg-white px-8 py-4 font-semibold text-blue-700 shadow-lg transition hover:-translate-y-1"
            >
              Create Free Account
            </Link>

            <Link
              to="/contact"
              className="rounded-xl border border-white px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-blue-700"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}