import Link from "next/link";
import type { Dictionary } from "@/i18n/get-dictionary";
import { Logo } from "./Logo";

export function Footer({
  lang,
  dictionary,
}: {
  lang: string;
  dictionary: Dictionary["footer"];
}) {
  return (
    <footer className="relative overflow-hidden rounded-2xl mt-8">
      <div className="mx-auto max-w-7xl px-6 pt-16 lg:px-10">
        <div className="flex flex-col justify-between gap-8 border-b border-border pb-10 sm:flex-row sm:items-center">
          <Logo className="[&_svg]:fill-foreground" />
          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium">
            <Link href={`/${lang}#categories`} className="hover:underline">
              {dictionary.categories}
            </Link>
            <Link href={`/${lang}#new`} className="hover:underline">
              {dictionary.newProducts}
            </Link>
            <Link href={`/${lang}/products`} className="hover:underline">
              {dictionary.allProducts}
            </Link>
          </nav>
        </div>
        <div className="flex flex-col justify-between gap-3 py-6 text-xs sm:flex-row">
          <p className="eyebrow text-[0.58rem]">
            {dictionary.description}
          </p>
          <p>© {new Date().getFullYear()} Qcena</p>
        </div>
      </div>
    </footer>
  );
}
