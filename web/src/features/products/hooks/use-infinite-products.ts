import { useInfiniteQuery } from "@tanstack/react-query";
import { productService } from "../products.service";
import { productCacheKeys } from "../cache.keys";
import type { GetProductsQueryParams, Product } from "../types";
import type { ApiCursorEnvelope } from "@/features/core/api.types";

interface UseInfiniteProductsOptions extends Omit<GetProductsQueryParams, "cursor"> {
    initialData?: ApiCursorEnvelope<Product>;
}

export function useInfiniteProducts(options?: UseInfiniteProductsOptions) {
    const { initialData, ...params } = options || {};

    return useInfiniteQuery({
        queryKey: productCacheKeys.list(params),
        queryFn: ({ pageParam }) =>
            productService.getProducts({
                ...params,
                cursor: pageParam ? String(pageParam) : undefined,
            }),
        initialPageParam: undefined as string | undefined,
        // Se passares initialData, o React Query já usa a primeira página pré-carregada do servidor
        initialData: initialData
            ? {
                pages: [initialData],
                pageParams: [undefined],
            }
            : undefined,
        getNextPageParam: (lastPage) => {
            // Retorna o próximo cursor ou undefined para indicar fim da lista
            return lastPage?.nextCursor || undefined;
        },
    });
}