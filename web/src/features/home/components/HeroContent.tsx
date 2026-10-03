import { getHeroProducts } from "../actions";
import { HeroCarousel } from "./HeroCarousel";

export async function HeroContent() {
  const products = await getHeroProducts();
  return <HeroCarousel products={products} />;
}
