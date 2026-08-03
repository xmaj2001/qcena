import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { BottomBar } from "@/components/layout/BottomBar";

import { getDictionary, Locale } from "./dictionaries";
import { QueryProvider } from "@/components/providers/query-provider";
import { MobileSidebar } from "@/components/layout/MobileSidebar";
import { Suspense } from "react";
import { MobileMenuProvider } from "@/components/contexts/MobileMenuContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <MobileMenuProvider>
              {children}

              <Suspense fallback={null}>
                <MobileSidebar lang={lang} />
              </Suspense>

              <BottomBar lang={lang} />
            </MobileMenuProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}