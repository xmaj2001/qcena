import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md border-b border-border/50 bg-background/70">
      {/* Logo */}
      <a
        href="#hero"
        id="navbar-logo"
        className="flex items-center gap-2 group"
        aria-label="Qcena — início"
      >
        <div className="relative w-8 h-8 rounded-lg bg-accent flex items-center justify-center shadow-lg">
          <span className="text-accent-foreground font-bold text-sm leading-none select-none">
            Q
          </span>
          <div className="absolute inset-0 rounded-lg bg-accent opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300" />
        </div>
        <span className="font-bold text-lg tracking-tight text-foreground group-hover:text-accent transition-colors duration-200">
          Qcena
        </span>
      </a>

      {/* Nav links */}
      <nav
        aria-label="Navegação principal"
        className="hidden md:flex items-center gap-6"
      >
        {[
          { href: "#sobre", label: "Sobre" },
          { href: "#funcionalidades", label: "Stack" },
          { href: "#roadmap", label: "Roadmap" },
        ].map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm text-muted hover:text-foreground transition-colors duration-200 hover:text-accent"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <a
          id="navbar-cta"
          href="https://42luanda.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-accent text-accent-foreground hover:opacity-90 transition-opacity duration-200"
        >
          42 Luanda
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
        </a>
      </div>
    </header>
  );
}
