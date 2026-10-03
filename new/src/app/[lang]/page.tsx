import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../lib/dictionaries";
import { HeroSection } from "@/components/hero";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);

  return(
    <div className="min-h-screen bg-background pb-16 lg:pb-0">
      {/* <Navbar /> */}
      <main className="max-w-7xl mx-auto mt-20 mb-20 md:mb-0">
        <HeroSection />
      </main>
      {/* <Footer dict={dict} /> */}
      {/* <FloatingWhatsApp /> */}
    </div>
  );
}
