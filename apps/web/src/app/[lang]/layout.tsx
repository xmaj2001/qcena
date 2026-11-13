import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { i18n, isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { AppProviders } from "@/providers/app-providers";
import "../globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}


export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    icons: {
      icon: "/favicon.ico",
    },
    metadataBase: new URL("https://qcena.vercel.app"),
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `https://qcena.vercel.app/${lang}`,
      siteName: "Qcena",
      images: [
        {
          url: "/banner.png",
          width: 1200,
          height: 630,
          alt: "Qcena - Marketplace de Serviços em Angola",
        },
      ],
      locale: lang,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: ["/banner.png"],
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {

  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang as Locale);
  return (
    <html
      lang={lang}
      suppressHydrationWarning
      // className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <TooltipProvider>
          <AppProviders networkDictionary={dict.network}>
            {children}
            <FloatingWhatsApp/>
          </AppProviders>
        </TooltipProvider>
      </body>
    </html>
  );
}
