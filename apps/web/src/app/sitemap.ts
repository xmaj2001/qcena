import type { MetadataRoute } from "next";
import { env } from "@/env";
import { getProducts } from "@/features/products/queries";
import { i18n } from "@/i18n/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  const staticRoutes = ["", "/products"];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.flatMap((route) => {
    return i18n.locales.map((lang) => ({
      url: `${baseUrl}/${lang}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? ("daily" as const) : ("weekly" as const),
      priority: route === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          i18n.locales.map((locale) => [
            locale,
            `${baseUrl}/${locale}${route}`,
          ]),
        ),
      },
    }));
  });

  try {
    const { data } = await getProducts({ limit: "100" });
    const productItems = data?.items ?? [];

    const productEntries: MetadataRoute.Sitemap = productItems.flatMap(
      (product) => {
        return i18n.locales.map((lang) => ({
          url: `${baseUrl}/${lang}/products/${product.slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.7,
          alternates: {
            languages: Object.fromEntries(
              i18n.locales.map((locale) => [
                locale,
                `${baseUrl}/${locale}/products/${product.slug}`,
              ]),
            ),
          },
        }));
      },
    );

    return [...staticEntries, ...productEntries];
  } catch {
    return staticEntries;
  }
}
