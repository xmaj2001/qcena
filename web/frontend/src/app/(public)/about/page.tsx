import { About } from "@/components/about/about";
import { Features } from "@/components/about/features";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/about/hero";
import { Navigation } from "@/components/about/navigation";

export default function AboutPage() {
  return (
    <div className="flex flex-col flex-1">
      {/* <Navbar /> */}
      <Navigation />
      <main id="main-content">
        <Hero />
        <Features />
        <About />
      </main>
      <Footer />
    </div>
  );
}
