import { useProducts } from '../hooks/useProducts';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll.tsx';
import { Table } from './common/Table';
import { InfiniteScrollLoader } from './common/InfiniteScrollLoader.tsx';
import { createProductColumns } from '../config/productColumns';
import { useCurrency } from '../context/useCurrency';

export function ProductListPage() {

  const { formatPrice } = useCurrency();
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useProducts();

  const observerTarget = useInfiniteScroll({
    onLoadMore: fetchNextPage,
    hasMore: hasNextPage ?? false,
    isLoading: isFetchingNextPage,
  });

  const allProducts = data?.pages.flatMap((page) => page.products) ?? [];
  const productColumns = createProductColumns(formatPrice);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <p className="text-gray-500 mt-1">
          {data?.pages[0]?.total && `Total ${data.pages[0].total} products`}
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <Table data={allProducts} columns={productColumns} loading={isLoading} isError={isError} error={error} />
      </div>

      <InfiniteScrollLoader
        observerRef={observerTarget}
        hasNextPage={hasNextPage ?? false}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
}
