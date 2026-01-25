import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/products';
import type { ProductsResponse } from '../types/product';

const ITEMS_PER_PAGE = 20;

export function useProducts() {
  return useInfiniteQuery<ProductsResponse>({
    queryKey: ['products'],
    queryFn: async ({ pageParam = 0 }) => {
      return fetchProducts(pageParam as number, ITEMS_PER_PAGE);
    },
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.limit;
      return nextSkip < lastPage.total ? nextSkip : undefined;
    },
    initialPageParam: 0,
  });
}
