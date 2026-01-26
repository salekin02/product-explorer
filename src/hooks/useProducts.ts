import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import type { Product, ProductsResponse } from '../types/product';
import { productsApi } from '../api/products';

const ITEMS_PER_PAGE = 20;

export function useProducts() {
  return useInfiniteQuery<ProductsResponse>({
    queryKey: ['products'],
    queryFn: async ({ pageParam }) => {
      const skip = (pageParam as number) ?? 0;
      return productsApi.getProducts(ITEMS_PER_PAGE, skip);
    },
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.limit;
      return nextSkip < lastPage.total ? nextSkip : undefined;
    },
    initialPageParam: 0,
  });
}

export function useProduct(id: string) {
  return useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => productsApi.getProductById(id),
    enabled: !!id, // Only fetch if ID exists
  });
}

export function useProductSearch(query: string, enabled = true) {
  return useInfiniteQuery<ProductsResponse>({
    queryKey: ['products', 'search', query],
    queryFn: async ({ pageParam }) => {
      const skip = (pageParam as number) ?? 0;
      return productsApi.searchProducts(query, ITEMS_PER_PAGE, skip);
    },
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.limit;
      return nextSkip < lastPage.total ? nextSkip : undefined;
    },
    initialPageParam: 0,
    enabled: enabled && query.length > 0, // Only search if query exists
  });
}

export function useProductsByCategory(category: string) {
  return useInfiniteQuery<ProductsResponse>({
    queryKey: ['products', 'category', category],
    queryFn: async ({ pageParam }) => {
      const skip = (pageParam as number) ?? 0;
      return productsApi.getProductsByCategory(category, ITEMS_PER_PAGE, skip);
    },
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.limit;
      return nextSkip < lastPage.total ? nextSkip : undefined;
    },
    initialPageParam: 0,
    enabled: !!category,
  });
}