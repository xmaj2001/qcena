import { Check } from "lucide-react";

const panels = [
  {
    title: "Everything You Need to Build",
    description:
      "Complete toolkit for building modern e-commerce experiences with visual editing and automated content creation.",
    items: [
      "CMS with Visual Editor",
      "TS Props Auto-Create Content Schemas",
      "In-browser Web IDE",
      "One-Click Install Apps & Integrations",
      "Modern Stack",
    ],
    image: "https://assets.decocache.com/decocms/9430082d-7446-41d0-8324-402ba3bb5de6/CMS.png",
  },
  {
    title: "Evolve Your Business Continuously",
    description:
      "Advanced tools for optimization, testing, and business growth with real-time insights and collaboration.",
    items: [
      "Advanced SEO Settings",
      "A/B Test & Segmentation",
      "Realtime Analytics",
      "Design System Builder",
      "Real-time Collaboration & Revisions",
    ],
    image: "https://assets.decocache.com/decocms/cd755b5c-ded1-442f-9a1e-c8b19874320e/Instant-Rollback.png",
  },
  {
    title: "Scale Up Fast and Safely",
    description:
      "Enterprise-grade features for security, monitoring, and deployment with full control over your infrastructure.",
    items: [
      "Roles & Permissions",
      "Realtime Error Logging & Tracing",
      "Release Cycle Control & Instant Rollback",
      "Managed Infra or Self-Hosted",
      "deco.records",
    ],
    image: "https://assets.decocache.com/decocms/966d6820-18b8-4e70-ba2e-7bcbe9aaa345/Roles-approvals--tenancy.png",
  },
];

export function FeaturePanels() {
  return (
    <section className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-8">
      {panels.map((panel, i) => (
        <article
          key={panel.title}
          className="grid items-center gap-10 overflow-hidden rounded-3xl bg-forest-deep p-8 sm:p-12 lg:grid-cols-2"
        >
          <div className={i % 2 === 1 ? "lg:order-2" : ""}>
            <h3 className="text-3xl font-bold tracking-tight text-lime sm:text-4xl">
              {panel.title}
            </h3>
            <p className="mt-4 text-cream/80">{panel.description}</p>
            <ul className="mt-8 space-y-3">
              {panel.items.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm font-medium text-cream">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-lime">
                    <Check className="h-3 w-3 text-forest-deep" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className={i % 2 === 1 ? "lg:order-1" : ""}>
            <img
              src={panel.image}
              alt={panel.title}
              className="w-full rounded-2xl border border-cream/10 object-cover"
              loading="lazy"
            />
          </div>
        </article>
      ))}
    </section>
  );
}