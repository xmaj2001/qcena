import { Navbar } from "@/components/navbar";
import { getDictionary, Locale } from "../dictionaries";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/landing/WhatsAppButton";

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
  const dict = await getDictionary(lang as Locale);
  return (
    <div className="min-h-screen bg-background pb-16 lg:pb-0">
      <Navbar />
      <main className="max-w-7xl mx-auto mt-20 mb-20 md:mb-0">{children}</main>
      <Footer dict={dict} />
      <WhatsAppButton />
    </div>
  );
}
