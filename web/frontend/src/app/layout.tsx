import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--inter-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Qcena — Plataforma de Reservas de Serviços",
    template: "%s | Qcena",
  },
  description:
    "Qcena é uma plataforma de reservas de serviços construída com intenção, pensada para produção. NestJS, Next.js, DDD, Docker, e muito mais — desenvolvida na 42 Luanda.",
  keywords: [
    "Qcena",
    "reservas",
    "serviços",
    "NestJS",
    "Next.js",
    "42 Luanda",
    "DDD",
    "Docker",
    "plataforma",
    "booking",
    "Angola",
  ],
  authors: [{ name: "42 Luanda", url: "https://42luanda.com" }],
  creator: "42 Luanda",
  metadataBase: new URL("https://qcena.app"),
  openGraph: {
    type: "website",
    locale: "pt_AO",
    url: "https://qcena.app",
    siteName: "Qcena",
    title: "Qcena — Plataforma de Reservas de Serviços",
    description:
      "Plataforma de reservas de serviços construída com intenção e pensada para produção. Desenvolvida na 42 Luanda.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Qcena — Plataforma de Reservas de Serviços",
    description:
      "Plataforma de reservas de serviços construída com intenção e pensada para produção.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
