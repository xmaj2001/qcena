import Collections from "@/components/search/collections";

import { sorting } from "@/lib/constants";
import { Suspense } from "react";
import ChildrenWrapper from "./children-wrapper";
import { SearchNavbar } from "@/components/search/search-navbar";
import FilterList from "@/components/search/filter";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen text-white relative pt-20" id="search">
      <SearchNavbar />
      <div className="mx-auto flex max-w-(--breakpoint-xl) flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white">
        {/* Sidebar esquerda — fica colada no topo ao scrollar */}
        <div className="order-first w-full flex-none md:max-w-[125px] md:sticky md:top-24 md:self-start">
          <Collections />
        </div>

        {/* Centro — este é o único que rola */}
        <div className="order-last w-full md:order-none">
          <Suspense fallback={null}>
            <ChildrenWrapper>{children}</ChildrenWrapper>
          </Suspense>
        </div>

        {/* Sidebar direita — igual, fica colada no topo */}
        <div className="order-none flex-none md:order-last md:w-[125px] md:sticky md:top-24 md:self-start">
          <FilterList list={sorting} title="Ordenar por" />
        </div>
      </div>
    </div>
  );
}
