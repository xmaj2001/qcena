const roadmap = [
  {
    phase: "🎨 Design (Figma)",
    status: "in-progress" as const,
    label: "Em curso",
    desc: "Layout e UX da app móvel — ecrãs, fluxos, e sistema de design.",
  },
  {
    phase: "⚙️ Backend",
    status: "in-progress" as const,
    label: "Em curso",
    desc: "NestJS com DDD, módulos de reservas, autenticação, e WebSockets.",
  },
  {
    phase: "🔀 NGINX & Deploy",
    status: "in-progress" as const,
    label: "Em curso",
    desc: "Load balancer, Blue-Green Deployment, e pipeline de deploy.",
  },
  {
    phase: "🐳 Infraestrutura",
    status: "done" as const,
    label: "Base pronta",
    desc: "Docker + Compose + Make + Healthchecks. Ambiente local e CI.",
  },
  {
    phase: "📱 Mobile",
    status: "next" as const,
    label: "A seguir",
    desc: "React Native + Expo. App cliente e prestador de serviços.",
  },
  {
    phase: "🚀 Produção",
    status: "next" as const,
    label: "Em breve",
    desc: "Deploy final, domínio, SSL, e primeiros utilizadores reais.",
  },
];

const statusClass = {
  done: "roadmap-badge-done",
  "in-progress": "roadmap-badge-in-progress",
  next: "roadmap-badge-next",
} as const;

export function About() {
  return (
    <>
      {/* ── About section ── */}
      <section
        id="sobre"
        className="relative py-24 px-6 bg-surface/40"
        aria-labelledby="about-heading"
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              <span className="stack-pill text-xs uppercase tracking-wide mb-6 inline-block">
                Sobre o Projecto
              </span>
              <h2
                id="about-heading"
                className="text-3xl sm:text-4xl font-bold tracking-tight mb-6 leading-snug"
              >
                Aprender fazendo —{" "}
                <span className="text-gradient">de forma honesta.</span>
              </h2>
              <div className="flex flex-col gap-4 text-muted leading-relaxed">
                <p>
                  A <strong className="text-foreground">Qcena</strong> nasceu como
                  projecto pessoal para aplicar, de forma prática e honesta, tudo o
                  que foi aprendido na{" "}
                  <a
                    href="https://42luanda.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:opacity-80 transition-opacity underline underline-offset-2"
                  >
                    42 Luanda
                  </a>
                  .
                </p>
                <p>
                  O objectivo não é só fazer funcionar. É fazer{" "}
                  <em className="text-foreground not-italic font-semibold">
                    bem feito
                  </em>
                  , como se fosse para produção real — sem a pressão de utilizadores
                  reais a descobrir os problemas.
                </p>
                <p>
                  Cada decisão técnica é tomada com intenção. Cada padrão aplicado
                  tem um porquê. Porque o melhor momento para aprender a fazer bem é{" "}
                  <em className="text-foreground not-italic font-medium">agora</em>,
                  não quando há clientes a depender disso.
                </p>
              </div>

              {/* Philosophy cards */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: "🎯", text: "Feito com foco e propósito" },
                  { icon: "📚", text: "Aprender sem pressão" },
                  { icon: "🔧", text: "Produção desde o início" },
                  { icon: "🇦🇴", text: "Luanda, Angola · 42 School" },
                ].map((item) => (
                  <div
                    key={item.text}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface border border-border text-sm"
                  >
                    <span aria-hidden="true">{item.icon}</span>
                    <span className="text-foreground/80">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Visual block */}
            <div className="relative">
              <div className="gradient-border">
                <div className="rounded-2xl bg-surface p-6 font-mono text-sm">
                  {/* Terminal header */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-danger/60" aria-hidden="true" />
                    <div className="w-3 h-3 rounded-full bg-warning/60" aria-hidden="true" />
                    <div className="w-3 h-3 rounded-full bg-success/60" aria-hidden="true" />
                    <span className="ml-2 text-xs text-muted">qcena — filosofia.md</span>
                  </div>
                  {/* Fake code */}
                  <div className="flex flex-col gap-1 text-xs leading-6">
                    <span className="text-muted"># Qcena Architecture</span>
                    <span className="text-foreground/70"> </span>
                    <span>
                      <span className="text-accent">domain</span>
                      <span className="text-muted"> → </span>
                      <span className="text-foreground">Entities + Value Objects</span>
                    </span>
                    <span>
                      <span className="text-accent">app</span>
                      <span className="text-muted">    → </span>
                      <span className="text-foreground">Use Cases + DTOs</span>
                    </span>
                    <span>
                      <span className="text-accent">infra</span>
                      <span className="text-muted">  → </span>
                      <span className="text-foreground">Prisma + Repositories</span>
                    </span>
                    <span className="text-foreground/70"> </span>
                    <span className="text-muted"># Stack</span>
                    <span>
                      <span className="text-success">backend</span>
                      <span className="text-muted">  → NestJS + DDD + PostgreSQL</span>
                    </span>
                    <span>
                      <span className="text-success">frontend</span>
                      <span className="text-muted"> → Next.js + HeroUI</span>
                    </span>
                    <span>
                      <span className="text-success">mobile</span>
                      <span className="text-muted">   → React Native + Expo</span>
                    </span>
                    <span>
                      <span className="text-success">infra</span>
                      <span className="text-muted">    → Docker + NGINX + Make</span>
                    </span>
                    <span className="text-foreground/70"> </span>
                    <span className="text-muted"># Princípio</span>
                    <span className="text-foreground/90 italic">
                      "fazer bem desde o início"
                    </span>
                    <span className="inline-flex items-center gap-1 mt-1">
                      <span className="text-accent animate-pulse">▋</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Roadmap section ── */}
      <section
        id="roadmap"
        className="relative py-24 px-6"
        aria-labelledby="roadmap-heading"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="stack-pill text-xs uppercase tracking-wide mb-4 inline-block">
              Progresso
            </span>
            <h2
              id="roadmap-heading"
              className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
            >
              Roadmap do Projecto
            </h2>
            <p className="text-muted text-lg max-w-xl mx-auto">
              Transparência total sobre o estado de desenvolvimento. Sem spin.
            </p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-6 top-0 bottom-0 w-px bg-linear-to-b from-accent via-border to-transparent"
              aria-hidden="true"
            />

            <ol className="flex flex-col gap-6">
              {roadmap.map((item, i) => (
                <li
                  key={item.phase}
                  className="relative flex items-start gap-6 pl-16"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  {/* Dot */}
                  <div
                    className="absolute left-4 top-1 w-4 h-4 rounded-full border-2 shrink-0 -translate-x-1/2"
                    style={{
                      borderColor:
                        item.status === "done"
                          ? "var(--success)"
                          : item.status === "in-progress"
                            ? "var(--accent)"
                            : "var(--muted)",
                      background:
                        item.status === "in-progress"
                          ? "var(--accent)"
                          : "var(--background)",
                    }}
                    aria-hidden="true"
                  />

                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 flex-1 min-w-0">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-semibold text-foreground text-sm">
                          {item.phase}
                        </span>
                        <span
                          className={`${statusClass[item.status]} text-xs px-2 py-0.5 rounded-full font-medium`}
                        >
                          {item.label}
                        </span>
                      </div>
                      <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
