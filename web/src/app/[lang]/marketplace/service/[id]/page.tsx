import { Suspense } from "react";
import { HeroService } from "../_components/HeroService";
import { ServiceProvedor } from "../_components/ServiceProvedor";
import { ServiceDescription } from "../_components/ServiceDescription";
import { RelatedServices } from "../_components/RelatedServices";

// Mock de dados tipados simulando o retorno do Faker para focar em UX
const mockService = {
  id: "srv-101",
  name: "Consultoria de UI/UX & Design System Premium",
  images: [
    "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1581291518655-9523c932dedf?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80",
  ],
  provider: {
    id: "prov-1",
    name: "Xavier Design Studio",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  },
  topClients: [
    { id: "c-1", name: "Alura Enterprise", totalReservations: 14, image: "" },
    {
      id: "c-2",
      name: "Deco Cloud",
      totalReservations: 9,
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
    },
    { id: "c-3", name: "Luanda Tech Lab", totalReservations: 5, image: "" },
  ],
};

const mockBookings = [
  {
    id: "b-1",
    createdAt: "2026-07-01T12:00:00.000Z",
    totalPrice: 45000,
    status: "CONFIRMED" as const,
  },
  {
    id: "b-2",
    createdAt: "2026-07-08T15:30:00.000Z",
    totalPrice: 28000,
    status: "PENDING" as const,
  },
];

interface ServicePageProps {
  params: Promise<{ id: string }>;
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { id } = await params;

  // UX Gates para visualização rápida no desenvolvimento
  const isProvider = true;
  const isClient = true;

  return (
    <div
      className="min-h-screen text-foreground relative bg-background"
      id="place"
    >
      <main className="mx-auto max-w-350 px-4 py-6">
        {/* Container principal unificado sem quebrar contraste no Light/Dark mode */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna da Esquerda (Hero e Dados Dinâmicos) */}
          <div className="lg:col-span-2 space-y-6">
            <Suspense
              fallback={
                <div className="h-[450px] w-full animate-pulse rounded-3xl bg-muted" />
              }
            >
              <HeroService service={mockService as any} />
            </Suspense>

            <div className="flex flex-col gap-6 mt-4">
              <ServiceProvedor service={mockService as any} />
            </div>
          </div>

          {/* Coluna da Direita (Painel de Ações e Checkout Sutil) */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-4">
              <Suspense
                fallback={
                  <div className="h-48 w-full animate-pulse bg-muted" />
                }
              >
                <ServiceDescription service={mockService as any} />
              </Suspense>
            </div>
          </div>
        </div>

        <RelatedServices id={id} />
      </main>
    </div>
  );
}
