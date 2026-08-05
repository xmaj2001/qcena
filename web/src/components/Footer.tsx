import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/utils";

/* Inline brand SVGs (lucide-react dropped brand icons) */
function IconInstagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
function IconTwitter({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
function IconFacebook({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const columns = [
  {
    title: "Explorar",
    links: [
      { label: "Novidades", href: "#" },
      { label: "Ofertas do Dia", href: "#" },
      { label: "Mais Vendidos", href: "#" },
      { label: "Todas as Categorias", href: "#" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre a Qcena", href: "#" },
      { label: "Como Funciona", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Carreiras", href: "#" },
    ],
  },
  {
    title: "Apoio",
    links: [
      { label: "Pontos de Entrega", href: "#" },
      { label: "Garantia Qcena", href: "#" },
      { label: "Política de Privacidade", href: "#" },
      { label: "Termos de Uso", href: "#" },
    ],
  },
];

interface FooterProps {
  dict?: any;
}

export function Footer({ dict }: FooterProps) {
  const shortBio =
    dict?.about?.short_bio ||
    "Divulgação e venda de produtos em Angola. Fala connosco no WhatsApp e combina a tua entrega num ponto seguro.";


  return (
    <footer className="mx-auto px-2 pb-2 sm:px-3" >
      <div className="rounded-3xl bg-muted px-8 py-16 sm:px-12">
        <div className="px-6 pt-14 pb-8 sm:px-12">
          <div className="mx-auto max-w-7xl">
            {/* Top: Logo + Bio + Social */}
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
              {/* Brand column */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Image src="/logo-white.png" alt="Qcena Logo" width={44} height={44} className="rounded-xl" />
                  <span className="text-2xl font-extrabold tracking-tight text-white">Qcena</span>
                </div>
                <p className="text-sm leading-relaxed text-white/70 max-w-xs">
                  {shortBio}
                </p>
                {/* WhatsApp CTA */}
                <a
                  href={waLink("")}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold text-white shadow-lg transition hover:brightness-110 active:scale-95"
                >
                  <MessageCircle className="h-4 w-4" />
                  Falar no WhatsApp
                </a>
                {/* Social */}
                <div className="flex items-center gap-3">
                  {[
                    { Icon: IconInstagram, label: "Instagram" },
                    { Icon: IconTwitter, label: "Twitter" },
                    { Icon: IconFacebook, label: "Facebook" },
                  ].map(({ Icon, label }) => (
                    <a
                      key={label}
                      href="#"
                      aria-label={label}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all hover:border-white/60 hover:text-white hover:bg-white/10"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Link columns */}
              {columns.map((col) => (
                <div key={col.title}>
                  <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-white/50">
                    {col.title}
                  </h4>
                  <ul className="space-y-2.5">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-sm text-white/70 transition-colors hover:text-white"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Divider + Copyright */}
            <div className="mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-white/40">
                © {new Date().getFullYear()} Qcena — Todos os direitos reservados.
              </p>
              <p className="text-xs text-white/30 italic">
                Qualquer Cena, Qualquer Necessidade.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}