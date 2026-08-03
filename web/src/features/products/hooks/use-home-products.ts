import { useQuery } from "@tanstack/react-query";
import { productService } from "../products.service";
import { productCacheKeys } from "../cache.keys";

export function useHomeProducts() {
    return useQuery({
        queryKey: productCacheKeys.home(),
        queryFn: () => productService.getHomeProducts(),
    });
}