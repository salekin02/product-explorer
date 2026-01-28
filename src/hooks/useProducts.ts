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
      
      // Use category API if category is present, otherwise use search API
      if (category) {
        return productsApi.getProductsByCategory(
          category,
          ITEMS_PER_PAGE,
          skip,
          sortBy,
          sortOrder
        );
      }
      
      return productsApi.searchProducts(
        query || '',
        ITEMS_PER_PAGE,
        skip,
        sortBy,
        sortOrder
      );
    },
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.limit;
      return nextSkip < lastPage.total ? nextSkip : undefined;
    },
    initialPageParam: 0,
    // Always enabled - empty query/category will fetch all products
  });
}