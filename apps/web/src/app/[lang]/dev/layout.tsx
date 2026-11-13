import { notFound } from "next/navigation";
import Link from "next/link";

interface DevLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function DevLayout({ children, params }: DevLayoutProps) {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const { lang } = await params;

  const navLinks = [
    { href: `/${lang}/dev`, label: "Dashboard" },
    { href: `/${lang}/dev/products`, label: "Produtos" },
    { href: `/${lang}/dev/featured`, label: "Destaques" },
    { href: `/${lang}/dev/categories`, label: "Categorias" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="border-b border-border bg-muted/40 sticky top-0 z-40 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="text-xs font-bold px-2 py-1 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 tracking-wider">
                DEV ONLY
              </span>
              <div className="flex items-center gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <Link
                href={`/${lang}`}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Voltar à Loja →
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-7xl">{children}</main>
    </div>
  );
}
