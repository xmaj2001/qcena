import { useQuery } from "@tanstack/react-query";
import { productService } from "../products.service";
import { productCacheKeys } from "../cache.keys";

export function useProductDetail(id: string) {
    return useQuery({
        queryKey: productCacheKeys.detail(id),
        queryFn: () => productService.getProductById(id),
        enabled: Boolean(id),
    });
}