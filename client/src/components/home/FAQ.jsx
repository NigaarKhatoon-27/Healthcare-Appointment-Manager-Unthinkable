import { useState } from "react";
import { ChevronDown } from "lucide-react";

import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import faq from "../../data/faq";

export default function FAQ() {
  const [activeId, setActiveId] = useState(null);

  const toggleFAQ = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="bg-white py-24">
      <Container>
        <SectionHeading
          badge="Frequently Asked Questions"
          title="Have Questions? We Have Answers"
          subtitle="Here are answers to some of the most common questions about our healthcare appointment platform."
        />

        <div className="mx-auto max-w-4xl space-y-4">
          {faq.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
            >
              <button
                onClick={() => toggleFAQ(item.id)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <span className="text-lg font-semibold text-slate-900">
                  {item.question}
                </span>

                <ChevronDown
                  className={`transition-transform duration-300 ${
                    activeId === item.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeId === item.id && (
                <div className="border-t border-slate-200 px-6 py-5 text-slate-600 leading-7">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}