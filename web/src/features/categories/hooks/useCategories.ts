"use client";

import { useEffect, useState } from "react";
import { categoryService } from "../category.service";
import type { Category } from "../types";

export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function fetchCategories() {
            try {
                setIsLoading(true);
                setError(null);
                const data = await categoryService.getCategories();
                if (isMounted) {
                    setCategories(data);
                }
            } catch (err) {
                if (isMounted) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : "Erro ao carregar categorias."
                    );
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }

        fetchCategories();

        return () => {
            isMounted = false;
        };
    }, []);

    return { categories, isLoading, error };
}