import { Suspense } from "react";
import type { GetProductsParams } from "../../types";
import { SkeletonGrid } from "../product-grid";
import { ProductListContent } from "./product-list-content";

export function ProductList({ params = {} }: { params?: GetProductsParams }) {
  return (
    // key: quando os filtros/params mudam, o Suspense volta a mostrar o skeleton
    <Suspense key={JSON.stringify(params)} fallback={<SkeletonGrid />}>
      <ProductListContent params={params} />
    </Suspense>
  );
}
