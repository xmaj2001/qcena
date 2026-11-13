import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import enDict from "@/i18n/dictionaries/en.json";
import ptDict from "@/i18n/dictionaries/pt.json";
import "./globals.css";

export const metadata: Metadata = {
  title: `${ptDict.notFound.title} | ${ptDict.seo.siteName}`,
  description: ptDict.notFound.description,
  robots: {
    index: false,
    follow: true,
  },
};

interface NotFoundProps {
  params?: Promise<{ lang?: string }> | { lang?: string };
}

export default async function NotFound({ params }: NotFoundProps) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang === "en" ? "en" : "pt";
  const dict = lang === "en" ? enDict.notFound : ptDict.notFound;

  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden px-4 bg-white">
      {/* 3. Conteúdo centralizado */}
      <div className="relative z-20 max-w-md text-center">
        <div className="animate-fade-in flex flex-col items-center">
          {/* Componente da Logo Animada em CSS */}
          <div className="mb-4">
            <AnimatedLogo className="w-16 h-24 text-primary" />
          </div>

          <h1 className="text-7xl font-bold text-primary">404</h1>
          <h2 className="mt-4 text-xl font-semibold text-primary">
            {dict.title}
          </h2>
          <p className="mt-2 text-sm text-gray-600">{dict.description}</p>

          <div className="mt-6">
            <Link
              href={`/${lang}`}
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-primary/90"
            >
              {dict.button}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
