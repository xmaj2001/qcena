

const stats = [
  { value: "DDD", label: "Domain-Driven Design" },
  { value: "CI/CD", label: "Blue-Green Deploy" },
  { value: "RT", label: "Real-Time WebSockets" },
  { value: "42", label: "Luanda, Angola 🇦🇴" },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden"
      aria-label="Secção principal"
    >
      {/* Background effects */}
      <div className="absolute inset-0 hero-glow pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" aria-hidden="true" />

      {/* Floating orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "var(--accent)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full blur-3xl opacity-8 pointer-events-none"
        style={{ background: "var(--success)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Badge */}
        <div className="animate-fade-up mb-6">
          <span className="stack-pill text-xs tracking-wide uppercase">
            <span aria-hidden="true">🎭</span>
            Projecto Pessoal · 42 Luanda
          </span>
        </div>

        {/* Main heading */}
        <h1 className="animate-fade-up animate-fade-up-delay-1 text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
          <span className="text-foreground">A plataforma de</span>
          <br />
          <span className="text-gradient">reservas de serviços</span>
          <br />
          <span className="text-foreground">feita a sério.</span>
        </h1>

        {/* Subheading */}
        <p className="animate-fade-up animate-fade-up-delay-2 text-lg sm:text-xl text-muted leading-relaxed max-w-2xl mb-4">
          Construída com intenção, pensada para produção. Não é só fazer funcionar —
          é{" "}
          <em className="text-foreground not-italic font-medium">
            fazer bem feito
          </em>
          , como se houvesse utilizadores reais a depender disso.
        </p>

        <blockquote className="animate-fade-up animate-fade-up-delay-2 mb-10 px-4 border-l-2 border-accent/60 text-sm text-muted italic text-left max-w-lg">
          "Prefiro pagar o preço da complexidade hoje, do que pagar o preço de
          refactoring em produção amanhã."
        </blockquote>

        {/* CTA buttons */}
        <div className="animate-fade-up animate-fade-up-delay-3 flex flex-wrap gap-4 justify-center mb-16">
          <a
            id="hero-cta-primary"
            href="#funcionalidades"
            className="animate-pulse-glow inline-flex items-center justify-center px-8 py-3 rounded-xl text-base font-semibold tracking-wide bg-accent text-accent-foreground hover:opacity-90 transition-opacity duration-200 shadow-lg"
          >
            Explorar Stack
          </a>
          <a
            id="hero-cta-secondary"
            href="#roadmap"
            className="inline-flex items-center justify-center px-8 py-3 rounded-xl text-base font-semibold border border-border text-foreground hover:bg-surface hover:border-accent/50 transition-all duration-200"
          >
            Ver Roadmap
          </a>
        </div>

        {/* Stats row */}
        <div className="animate-fade-up animate-fade-up-delay-4 grid grid-cols-2 sm:grid-cols-4 gap-px w-full max-w-2xl rounded-2xl overflow-hidden border border-border bg-border">
          {stats.map((stat) => (
            <div
              key={stat.value}
              className="bg-surface flex flex-col items-center justify-center py-5 px-4 gap-1"
            >
              <span className="text-xl font-bold text-accent">{stat.value}</span>
              <span className="text-xs text-muted text-center leading-tight">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40" aria-hidden="true">
        <span className="text-xs text-muted tracking-widest uppercase">scroll</span>
        <div className="w-px h-8 bg-linear-to-b from-muted to-transparent" />
      </div>
    </section>
  );
}
