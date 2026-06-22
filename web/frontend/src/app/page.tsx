import { Navigation } from "@/components/about/navigation";
import { Footer } from "@/components/footer";
import { SearchNavbar } from "@/components/search/search-navbar";
import { HeroFullCarousel } from "@/components/services/HeroFullCarousel";
import { AnimatedMarqueeHero } from "@/components/ui/hero-3";
import { getFavoritesServices } from "@/server/services/features/get-favorites.feat";
import { ApiService } from "@/server/services/types/service.type";

export default async function Home() {
  let data: ApiService[] = [];
  try {
    data = await getFavoritesServices();
  } catch (error) {
    // console.error("Error fetching favorite services:", error);
  }
  const images = data? data.map((service) => service.images[0]) : [];

  return (
    <div className="flex flex-col flex-1">
      <SearchNavbar />
      <main id="main-content" className="flex flex-col">
        <HeroFullCarousel services={data} />
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
      <Footer />
    </div>
  );
}
