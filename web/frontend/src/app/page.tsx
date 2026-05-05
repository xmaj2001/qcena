import { Navbar } from "@/modules/landing/components/navbar";
import { Hero } from "@/modules/landing/components/hero";
import { Features } from "@/modules/landing/components/features";
import { About } from "@/modules/landing/components/about";
import { Footer } from "@/modules/landing/components/footer";
import { Navigation } from "@/modules/landing/components/navigation";

export default function Home() {
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
