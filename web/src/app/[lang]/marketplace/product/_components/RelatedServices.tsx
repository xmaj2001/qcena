// app/marketplace/_components/RelatedServices.tsx
import Link from "next/link";
import { ArrowRight, Star, Layers } from "lucide-react";

// Componentes do Shadcn UI
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface RelatedServicesProps {
  id: string; // O ID do serviço atual para podermos filtrá-lo/excluí-lo da lista
}

// Mock estruturado simulando serviços relacionados da mesma categoria (ex: Desenvolvimento/Design)
const mockRelatedServices = [
  {
    id: "srv-202",
    name: "Desenvolvimento de Micro-Frontends com Next.js",
    price: 85000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80",
    provider: "Luanda Code Lab"
  },
  {
    id: "srv-203",
    name: "Auditoria de Performance Web e Otimização Core Web Vitals",
    price: 32000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
    provider: "Xavier Design Studio"
  },
  {
    id: "srv-204",
    name: "Arquitetura de API Escalável com NestJS e Docker",
    price: 120000,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=400&q=80",
    provider: "StackForge Angola"
  }
];

export function RelatedServices({ id }: RelatedServicesProps) {
  // Filtra o serviço atual caso ele apareça na lista de recomendados
  const filteredServices = mockRelatedServices.filter((service) => service.id !== id);

  if (filteredServices.length === 0) return null;

  return (
    <section className="mt-12 space-y-6 w-full">
      {/* Cabeçalho da Secção */}
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Layers className="h-4 w-4 text-[var(--brand)]" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--brand)]">Explorar Mais</h2>
          </div>
          <p className="text-lg font-bold tracking-tight text-foreground">
            Serviços semelhantes recomendados para ti
          </p>
        </div>
        
        <Button variant="ghost" size="sm" className="text-xs font-semibold gap-1 text-muted-foreground hover:text-foreground">
          <Link href="/marketplace">
            Ver marketplace completo <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>

      {/* Grid Responsiva de Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((item) => (
          <Card 
            key={item.id} 
            className="group flex flex-col justify-between overflow-hidden border border-border/50 bg-background/40 hover:bg-background/90 hover:border-border transition-all duration-300 rounded-2xl shadow-xs hover:shadow-md"
          >
            <div>
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/9] w-full bg-muted overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10 flex items-center gap-1 text-amber-400 text-[10px] font-bold">
                  <Star className="h-3 w-3 fill-amber-400" />
                  <span>{item.rating.toFixed(1)}</span>
                </div>
              </div>

              {/* Corpo do Card */}
              <CardHeader className="p-4 pb-2 space-y-1">
                <span className="text-[10px] font-medium text-muted-foreground tracking-tight">
                  por {item.provider}
                </span>
                <CardTitle className="text-sm font-bold leading-snug text-foreground tracking-tight line-clamp-2 min-h-[40px] group-hover:text-[var(--brand)] transition-colors">
                  {item.name}
                </CardTitle>
              </CardHeader>
            </div>

            {/* Footer com Preço e Ação */}
            <CardFooter className="p-4 pt-2 border-t border-border/10 flex items-center justify-between bg-neutral-50/20 dark:bg-neutral-900/10">
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">A partir de</span>
                <span className="text-sm font-black text-foreground">
                  {item.price.toLocaleString("pt-PT", { style: "currency", currency: "AOA" })}
                </span>
              </div>

              <Button 
                size="sm" 
                variant="outline"
                className="h-8 rounded-lg text-xs font-semibold border-border/60 hover:bg-[var(--brand)] hover:text-white hover:border-transparent transition-all gap-1"
              >
                <Link href={`/marketplace/${item.id}`}>
                  Ver Detalhes
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}