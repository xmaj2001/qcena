"use server";

import { z } from "zod";
import { searchProducts } from "./queries";

const productSearchQuerySchema = z.string().trim().min(2).max(100);

export async function searchProductsAction(query: string) {
	const parsedQuery = productSearchQuerySchema.safeParse(query);
	if (!parsedQuery.success) return null;

	try {
		return await searchProducts(parsedQuery.data, 6);
	} catch {
		return null;
	}
}
