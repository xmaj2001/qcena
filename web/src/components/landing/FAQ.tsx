"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question:
      "What is deco.cx and how is it different from other e-commerce builders?",
    answer:
      "deco.cx is an AI-ready digital experience platform that combines visual editing, agent workflows, and full code control — so business teams and developers work on the same stack without friction.",
  },
  {
    question: "Do I need coding knowledge to use deco.cx?",
    answer:
      "No. The visual editor and pre-built blocks let non-technical teams create and update pages, while developers can extend everything with code when needed.",
  },
  {
    question: "How does deco.cx ensure fast performance?",
    answer:
      "Sites are rendered on the edge with optimized assets and performance-first blocks, delivering fast loading times, better user experience, and improved SEO.",
  },
  {
    question: "Can I integrate deco.cx with my existing tools?",
    answer:
      "Yes. One-click integrations connect deco.cx with commerce platforms, CRMs, analytics, and communication tools — no code and no friction.",
  },
  {
    question: "What kind of support and collaboration features are available?",
    answer:
      "Teams get real-time collaboration, revisions, roles and permissions, plus an active community and dedicated support channels.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl px-4 py-24 sm:px-8">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Frequently Asked Questions
      </p>
      <h2 className="mt-3 text-center text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        FAQs
      </h2>

      <div className="mt-12 divide-y divide-border rounded-2xl border border-border bg-card">
        {faqs.map((faq, i) => (
          <div key={faq.question}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-medium text-foreground"
            >
              {faq.question}
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open === i ? "rotate-180" : ""}`}
              />
            </button>
            {open === i && (
              <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
