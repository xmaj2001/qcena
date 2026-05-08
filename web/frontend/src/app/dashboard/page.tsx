import type { Metadata } from "next";
import { DashboardPage } from "@/modules/dashboard/components/dashboard-page";

export const metadata: Metadata = {
  title: "Qcena — Catálogo de Serviços",
  description:
    "Descubra e reserve os melhores serviços na plataforma Qcena. Beleza, fitness, saúde, reparações e muito mais.",
};

export default function Dashboard() {
  return <DashboardPage />;
}
