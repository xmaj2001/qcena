import { z } from "zod";

export const productsPageParamsSchema = z.object({
  cursor: z.string().optional(),
  cursorPublishedAt: z.string().optional(),
  limit: z.string().optional(),
  categoryId: z.string().optional(),
  storeId: z.string().optional(),
});

export type ProductsPageParams = z.infer<typeof productsPageParamsSchema>;
export type ProductFilters = Omit<
  ProductsPageParams,
  "cursor" | "cursorPublishedAt"
>;
