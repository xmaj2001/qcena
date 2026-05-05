export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative border-t border-border bg-surface/40 py-12 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-sm leading-none">Q</span>
              </div>
              <span className="font-bold text-lg tracking-tight">Qcena</span>
            </div>
            <p className="text-sm text-muted leading-relaxed max-w-xs">
              Plataforma de reservas de serviços — construída com intenção,
              pensada para produção.
            </p>
            <p className="text-xs text-muted/70">
              Feito com foco em{" "}
              <span className="text-accent">Luanda, Angola 🇦🇴</span>
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted/70 mb-1">
              Navegação
            </h3>
            {[
              { href: "#hero", label: "Início" },
              { href: "#sobre", label: "Sobre o Projecto" },
              { href: "#funcionalidades", label: "Stack Técnica" },
              { href: "#roadmap", label: "Roadmap" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted hover:text-accent transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* External */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted/70 mb-1">
              Links externos
            </h3>
            {[
              {
                href: "https://42luanda.com",
                label: "42 Luanda",
                desc: "Escola de programação",
              },
              {
                href: "https://github.com",
                label: "GitHub",
                desc: "Repositório do projecto",
              },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-0.5"
              >
                <span className="text-sm text-muted group-hover:text-accent transition-colors duration-200 flex items-center gap-1">
                  {link.label}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                </span>
                <span className="text-xs text-muted/50">{link.desc}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted/60">
            © {year} Qcena. Projecto pessoal · Todos os direitos reservados.
          </p>
          <p className="text-xs text-muted/40">
            Desenvolvido na{" "}
            <a
              href="https://42luanda.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors duration-200"
            >
              42 Luanda
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
