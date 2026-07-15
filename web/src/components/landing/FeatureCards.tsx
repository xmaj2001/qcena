const features = [
  {
    tag: "Performance",
    title: "Fast loading & performance",
    description: "Improved performance for an improved user experience and better SEO",
    image: "https://decoims.com/image?fit=cover&width=425&height=322&src=decocms/1bdd6dd2-d614-47f7-9ecb-20a74ba01c79/performance.png",
  },
  {
    tag: "Blocks",
    title: "Pre-built & custom components",
    description: "Blocks optimized for conversion and boosting the user experience.",
    image: "https://decoims.com/image?fit=cover&width=425&height=322&src=decocms/41cbc9f3-dc2d-4f52-8010-b9ae07ff4888/blocks.png",
  },
  {
    tag: "Evolution",
    title: "AI Agents for continuous evolution",
    description: "Plug AI Agents to build, test, and improve your site. Every day, faster.",
    image: "https://decoims.com/image?fit=cover&width=425&height=322&src=decocms/04a09d0d-ad5f-4fb2-9b75-4a3572eb1a9d/design.png",
  },
];

export function FeatureCards() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-8">
      <h2 className="mx-auto max-w-2xl text-center text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        The all-in-one digital experience manager
      </h2>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <article
            key={feature.tag}
            className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card"
          >
            <div className="p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {feature.tag}
              </p>
              <h3 className="mt-3 text-2xl font-bold text-foreground">{feature.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{feature.description}</p>
            </div>
            <img
              src={feature.image}
              alt={feature.title}
              className="mt-auto w-full object-cover"
              loading="lazy"
            />
          </article>
        ))}
      </div>
    </section>
  );
}