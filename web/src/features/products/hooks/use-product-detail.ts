import { useQuery } from "@tanstack/react-query";
import { productService } from "../products.service";
import { productCacheKeys } from "../cache.keys";

export function useProductDetail(slug: string) {
    return useQuery({
        queryKey: productCacheKeys.detail(slug),
        queryFn: () => productService.getProductBySlug(slug),
        enabled: Boolean(slug),
    });
}