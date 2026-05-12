import { Navigation } from "@/components/about/navigation";
import { HeroFullCarousel } from "@/components/services/HeroFullCarousel";
import { AnimatedMarqueeHero } from "@/components/ui/hero-3";
import { getServices } from "@/server/services/features/get-services.feat";

export default async function Home() {
  const data = await getServices();
  const favoriteServices = data
    .sort((a, b) => b.totalFavorites - a.totalFavorites)
    .slice(0, 10);
  const images = favoriteServices.map((service) => service.images[0]?.src);

  return (
    <div className="flex flex-col flex-1">
      <Navigation />
      <main id="main-content" className="flex flex-col">
        <HeroFullCarousel services={favoriteServices} />
        <AnimatedMarqueeHero
          tagline={`Temos disponiveis mais de ${data.length} serviços que preparamos para si`}
          title={
            <>
              Vem explorar
              <br />
              os servicos que preparamos para si
            </>
          }
          description="A escolha certa para as suas necessidades de serviços"
          ctaText="Explore os serviços"
          images={images}
        />
      </main>
    </div>
  );
}
