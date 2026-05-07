import { Card } from "@heroui/react";

type StackItem = {
  tech: string;
  use: string;
};

type LayerCardProps = {
  icon: string;
  title: string;
  description: string;
  color: string;
  items: StackItem[];
};

const layers: LayerCardProps[] = [
  {
    icon: "⚙️",
    title: "Backend",
    description:
      "Arquitectura robusta com separação clara de responsabilidades",
    color: "oklch(0.65 0.18 260)",
    items: [
      { tech: "NestJS", use: "Framework principal" },
      { tech: "DDD", use: "Domain-Driven Design" },
      { tech: "Prisma", use: "ORM na camada de infra" },
      { tech: "PostgreSQL", use: "Base de dados principal" },
      { tech: "Redis + BullMQ", use: "Cache e jobs assíncronos" },
      { tech: "Socket.io", use: "Comunicação em tempo real" },
    ],
  },
  {
    icon: "🌐",
    title: "Frontend",
    description:
      "Interface moderna, tipada, com foco em experiência de utilizador",
    color: "oklch(0.65 0.18 200)",
    items: [
      { tech: "Next.js 16", use: "Framework web" },
      { tech: "HeroUI v3", use: "Sistema de componentes" },
      { tech: "React Query", use: "Cache e estado server" },
      { tech: "Tailwind CSS v4", use: "Estilização utilitária" },
      { tech: "TypeScript", use: "Tipagem estática" },
      { tech: "Biome", use: "Linter + formatter" },
    ],
  },
  {
    icon: "📱",
    title: "Mobile",
    description: "App nativa cross-platform com notificações em tempo real",
    color: "oklch(0.65 0.18 150)",
    items: [
      { tech: "React Native", use: "Framework mobile" },
      { tech: "Expo", use: "Toolchain e build" },
      { tech: "Socket.io Client", use: "Notificações RT" },
    ],
  },
  {
    icon: "🐳",
    title: "Infraestrutura",
    description: "Deploy profissional com zero downtime e observabilidade",
    color: "oklch(0.65 0.18 80)",
    items: [
      { tech: "Docker + Compose", use: "Containerização" },
      { tech: "NGINX", use: "Reverse proxy + Load Balancer" },
      { tech: "Blue-Green Deploy", use: "Zero downtime releases" },
      { tech: "Make", use: "Comandos unificados" },
      { tech: "Healthchecks", use: "Monitorização de saúde" },
    ],
  },
];

function LayerCard({ icon, title, description, color, items }: LayerCardProps) {
  return (
    <Card
      variant="secondary"
      className="feature-card h-full"
      role="article"
      aria-labelledby={`feature-title-${title.toLowerCase()}`}
    >
      <Card.Header>
        <div className="flex items-start gap-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
            style={{
              background: `color-mix(in oklab, ${color} 15%, transparent)`,
              border: `1px solid color-mix(in oklab, ${color} 30%, transparent)`,
            }}
            aria-hidden="true"
          >
            {icon}
          </div>
          <div>
            <Card.Title
              id={`feature-title-${title.toLowerCase()}`}
              className="text-lg font-semibold"
            >
              {title}
            </Card.Title>
            <Card.Description className="text-sm leading-snug mt-0.5">
              {description}
            </Card.Description>
          </div>
        </div>
      </Card.Header>
      <Card.Content>
        <ul className="flex flex-col gap-2" role="list">
          {items.map((item) => (
            <li
              key={item.tech}
              className="flex items-center justify-between gap-3"
            >
              <span className="stack-pill text-xs">{item.tech}</span>
              <span className="text-xs text-muted text-right">{item.use}</span>
            </li>
          ))}
        </ul>
      </Card.Content>
    </Card>
  );
}

export function Features() {
  return (
    <section
      id="funcionalidades"
      className="relative py-24 px-6"
      aria-labelledby="features-heading"
    >
      {/* Section header */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="stack-pill text-xs uppercase tracking-wide mb-4 inline-block">
            Arquitectura & Stack
          </span>
          <h2
            id="features-heading"
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          >
            Construído para <span className="text-gradient">produção real</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Cada camada escolhida com propósito. Tecnologias que escalam,
            padrões que facilitam manutenção e uma arquitectura que comunica
            intenção.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {layers.map((layer) => (
            <LayerCard key={layer.title} {...layer} />
          ))}
        </div>

        {/* Design principles row */}
        <div className="mt-12 gradient-border p-px">
          <div className="rounded-2xl bg-surface p-8">
            <h3 className="text-lg font-semibold mb-6 text-center">
              Princípios de Design
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  icon: "🏗️",
                  title: "Clean Architecture",
                  desc: "Separação rígida entre domínio, aplicação e infraestrutura. O domínio não conhece o ORM.",
                },
                {
                  icon: "🔒",
                  title: "Segurança First",
                  desc: "JWT + RefreshToken, HTTPS, rate limiting e validação estrita em todas as entradas.",
                },
                {
                  icon: "📊",
                  title: "Observabilidade",
                  desc: "Healthchecks, logs estruturados e monitorização activa para detectar problemas antes dos utilizadores.",
                },
              ].map((p) => (
                <div key={p.title} className="flex flex-col gap-2">
                  <div className="text-2xl" aria-hidden="true">
                    {p.icon}
                  </div>
                  <h4 className="font-semibold text-sm text-foreground">
                    {p.title}
                  </h4>
                  <p className="text-xs text-muted leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
