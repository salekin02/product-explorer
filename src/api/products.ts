import type { ProductsResponse } from "../types/product";

const API_BASE_URL = "https://dummyjson.com";

export async function fetchProducts(
  skip: number = 0,
  limit: number = 20,
): Promise<ProductsResponse> {
  const params = new URLSearchParams({
    skip: skip.toString(),
    limit: limit.toString(),
  });

  const response = await fetch(`${API_BASE_URL}/products?${params}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }

  return response.json();
}
