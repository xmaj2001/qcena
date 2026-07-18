// app/marketplace/layout.tsx

import { Navbar } from "@/components/Navbar";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function MarketplaceLayout({
  children,
  params,
}: LayoutProps) {
  // Acessível se precisar de internacionalização futuramente
  const { lang } = await params;

  return (
    <div
      className="min-h-screen"

    >
      <Navbar />
      <main className="mx-auto max-w-350 sm:p-0 sm:w-full">
        {children}
      </main>
    </div>
  );
}