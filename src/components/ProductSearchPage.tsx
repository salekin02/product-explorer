import { useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useProductSearch, useCategories } from '../hooks/useProducts.ts';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll.tsx';
import { useFilterStore } from '../store/filterStore.ts';
import { Table } from './common/Table.tsx';
import { InfiniteScrollLoader } from './common/InfiniteScrollLoader.tsx';
import { createProductColumns } from '../config/productColumns';
import { useCurrency } from '../context/useCurrency';
import type { SortOrder } from '../types/product.ts';
import { FilterBar } from './common/FilterBar.tsx';

export function ProductSearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { formatPrice } = useCurrency();
  const isInitialMount = useRef(true);
  // Fetch categories list for filter
  const { data: categories } = useCategories();
  const { searchQuery, category, sortOrder, setSearchQuery, setCategory, setSortOrder, clearFilters, filterType, setFilterType } = useFilterStore();

  // initial mount
  useEffect(() => {
    if (isInitialMount.current) {
      const urlQuery = searchParams.get('q') || '';
      const urlCategory = searchParams.get('category') || '';
      const urlSort = (searchParams.get('order') || null) as SortOrder;

      setSearchQuery(urlQuery);
      setCategory(urlCategory);
      setSortOrder(urlSort);

      if (urlQuery) {
        setSearchQuery(urlQuery);
        setFilterType('search');
      } else if (urlCategory) {
        setCategory(urlCategory);
        setFilterType('category');
      }

      isInitialMount.current = false;
    }
  }, []);

  // url sync except initial mount
  useEffect(() => {
    if (!isInitialMount.current) {
      const newParams = new URLSearchParams();
      if (searchQuery) newParams.set('q', searchQuery);
      if (category) newParams.set('category', category);
      if (sortOrder) newParams.set('order', sortOrder);

      setSearchParams(newParams, { replace: true });
    }
  }, [searchQuery, category, sortOrder, setSearchParams]);



  // React Query automatically refetches when any parameter changes
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useProductSearch(
    searchQuery,
    category,
    'price',
    sortOrder
  );

  // Infinite scroll
  const observerTarget = useInfiniteScroll({
    onLoadMore: fetchNextPage,
    hasMore: hasNextPage,
    isLoading: isFetchingNextPage,
  });

  const allProducts = data?.pages.flatMap((page) => page.products) ?? [];

  const productColumns = createProductColumns(formatPrice);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Search Products</h1>
          <Link to="/products" className="text-blue-600 hover:underline mr-4">Back to Products</Link>
        </div>
        <p className="text-gray-500 mt-1 text-sm">
          Search by title, filter by category, and sort by price
        </p>
      </div>

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        category={category}
        onCategoryChange={setCategory}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
        categories={categories}
        onClearFilters={clearFilters}
        showResults={!!(searchQuery || category)}
        resultsCount={data?.pages[0]?.total}
        filterType={filterType}
        onFilterTypeChange={setFilterType}
      />
      <>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
          <Table data={allProducts} columns={productColumns} loading={isLoading} isError={isError} error={error} />
        </div>

        <InfiniteScrollLoader
          observerRef={observerTarget}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </>
    </div>
  );
}