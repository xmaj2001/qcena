import { useQuery } from "@tanstack/react-query";
import { productService } from "../products.service";
import { productCacheKeys } from "../cache.keys";
import type { GetProductsQueryParams } from "../types";

export function useProducts(params?: GetProductsQueryParams) {
    return useQuery({
        queryKey: productCacheKeys.list(params),
        queryFn: () => productService.getProducts(params),
    });
}