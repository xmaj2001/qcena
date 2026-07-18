import { Suspense } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ProductDetails } from "../_components/ProductDetails";
import { generateMockServices } from "@/lib/mockData";

// Mock de dados tipados simulando o retorno do Faker para focar em UX
const mockProduct = {
  id: "prod-101",
  name: "MacBook Pro M3 Max 36GB RAM 1TB SSD",
  banner: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80",
  video: "https://www.w3schools.com/html/mov_bbb.mp4",
  images: [
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80",
  ],
  price: 2500000,
  oldPrice: 2800000,
  stock: 5,
  badge: "Destaque",
  category: "Electrónicos",
  rating: 4.9,
  reviews: 28,
  description: "O portátil mais avançado da Apple para profissionais. Com o processador M3 Max, 36GB de RAM e 1TB de SSD. Perfeito para edição de vídeo 4K, modelagem 3D e desenvolvimento de software complexo.",
  specs: [
    { label: "Processador", value: "M3 Max" },
    { label: "RAM", value: "36GB" },
    { label: "Armazenamento", value: "1TB SSD" },
    { label: "Ecrã", value: "16.2\" Liquid Retina XDR" },
    { label: "Bateria", value: "Até 22 horas" },
    { label: "Sistema", value: "macOS Sonoma" },
  ]
};

interface ProductPageProps {
  params: Promise<{ id: string, lang: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { lang } = await params;

  // Usa o mockData para gerar produtos relacionados
  const related = generateMockServices(4);

  return (
    <div
      className="min-h-screen text-foreground relative bg-background"
      id="place"
    >

      {/* DETALHES DO PRODUTO */}
      <ProductDetails p={mockProduct} related={related} />
    </div>
  );
}
