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
      className="min-h-screen pt-20"
 
    >
      <Navbar />
      <main className="mx-auto max-w-350 px-4 py-8 sm:px-8">
        {children}
      </main>
    </div>
  );
}