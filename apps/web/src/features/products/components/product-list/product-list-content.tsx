import { getProducts } from "../../queries";
import type { GetProductsParams } from "../../types";
import { ProductListInfinite } from "./product-list-infinite";

export async function ProductListContent({
  params = {},
}: {
  params?: GetProductsParams;
}) {
  const { data } = await getProducts(params);
  return <ProductListInfinite params={params} initialPage={data} />;
}
