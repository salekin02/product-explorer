import { useInfiniteQuery } from '@tanstack/react-query';
import { productsApi } from '../api/products';
import type { ProductsResponse } from '../types/product';

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
      // Only fetch more if there are more items
      return nextSkip < lastPage.total ? nextSkip : undefined;
    },
    initialPageParam: 0,
  });
}