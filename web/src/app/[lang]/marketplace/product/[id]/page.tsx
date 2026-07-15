import { Suspense } from "react";
import { ProductHero } from "../_components/ProductHero";
import { ServiceProvedor } from "../_components/ServiceProvedor";
import { ProductDescription } from "../_components/ProductDescription";
import { RelatedServices } from "../_components/RelatedServices";

// Mock de dados tipados simulando o retorno do Faker para focar em UX
const mockProduct = {
  id: "prod-101",
  name: "MacBook Pro M3 Max 36GB RAM 1TB SSD",
  banner: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80",
  videoUgc: "https://www.w3schools.com/html/mov_bbb.mp4",
  images: [
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80",
  ],
  price: 2500000,
  provider: {
    id: "prov-1",
    name: "Tech Store Angola",
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

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
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
              <ProductHero product={mockProduct as any} />
            </Suspense>

            <div className="flex flex-col gap-6 mt-4">
              <ServiceProvedor service={mockProduct as any} />
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
                <ProductDescription product={mockProduct as any} />
              </Suspense>
            </div>
          </div>
        </div>

        <RelatedServices id={id} />
      </main>
    </div>
  );
}
