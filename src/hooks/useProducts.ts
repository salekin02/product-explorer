import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import type { Product, ProductsResponse, Category } from '../types/product';
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

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: () => productsApi.getCategories(),
  });
}

export function useProduct(id: string) {
  return useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => productsApi.getProductById(id),
    enabled: !!id, // Only fetch if ID exists
  });
}

export function useProductSearch(query?: string, category?: string, sortBy?: string, sortOrder?: 'asc' | 'desc' | null) {
  return useInfiniteQuery<ProductsResponse>({
    queryKey: ['products', 'search', query, category, sortBy, sortOrder],
    queryFn: async ({ pageParam }) => {
      const skip = (pageParam as number) ?? 0;
      return productsApi.searchProducts(
        query || '',
        ITEMS_PER_PAGE,
        skip,
        category,
        sortBy,
        sortOrder
      );
    },
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.limit;
      return nextSkip < lastPage.total ? nextSkip : undefined;
    },
    initialPageParam: 0,
    enabled: !!query || !!category || !!sortOrder, // only fetch if at least one filter is applied
  });
}