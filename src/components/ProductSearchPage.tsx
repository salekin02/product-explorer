import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useProductSearch, useProductsByCategory } from '../hooks/useProducts.ts';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll.tsx';
import { useFilterStore } from '../store/filterStore.ts';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../api/products.ts';
import { Table } from './common/Table.tsx';
import { InfiniteScrollLoader } from './common/InfiniteScrollLoader.tsx';
import { productColumns } from '../config/productColumns';
import type { SortOrder } from '../types/product.ts';
import { FilterBar } from './common/FilterBar.tsx';

export function ProductSearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Zustand store for UI state
  const {
    searchQuery,
    category,
    sortOrder,
    setSearchQuery,
    setCategory,
    setSortOrder,
    clearFilters,
  } = useFilterStore();

  // Sync Zustand with URL on mount
  useEffect(() => {
    const urlQuery = searchParams.get('q') || '';
    const urlCategory = searchParams.get('category') || '';
    const urlSort = (searchParams.get('order') || null) as SortOrder;
    
    if (urlQuery !== searchQuery) setSearchQuery(urlQuery);
    if (urlCategory !== category) setCategory(urlCategory);
    if (urlSort !== sortOrder) setSortOrder(urlSort);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Sync URL with Zustand state
  useEffect(() => {
    const newParams = new URLSearchParams();
    if (searchQuery) newParams.set('q', searchQuery);
    if (category) newParams.set('category', category);
    if (sortOrder) newParams.set('order', sortOrder);
    setSearchParams(newParams, { replace: true });
  }, [searchQuery, category, sortOrder, setSearchParams]);

  // Fetch categories for filter
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: productsApi.getCategories,
  });

  // Use appropriate query based on filters
  const shouldSearch = searchQuery.length > 0;
  const shouldFilterByCategory = category.length > 0 && !searchQuery;

  const searchResults = useProductSearch(searchQuery, shouldSearch);
  const categoryResults = useProductsByCategory(category);
  
  // Select the appropriate query result
  const activeQuery = shouldSearch ? searchResults : shouldFilterByCategory ? categoryResults : null;
  
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = activeQuery || {
    data: undefined,
    isLoading: false,
    isError: false,
    error: null,
    fetchNextPage: () => {},
    hasNextPage: false,
    isFetchingNextPage: false,
  };

  // Infinite scroll
  const observerTarget = useInfiniteScroll({
    onLoadMore: fetchNextPage,
    hasMore: hasNextPage,
    isLoading: isFetchingNextPage,
  });

  const allProducts = data?.pages.flatMap((page) => page.products) ?? [];

  // Sort products client-side if sort params exist
  const sortedProducts = [...allProducts];
  if (sortOrder) {
    sortedProducts.sort((a, b) => {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    });
  }

  const handleSortChange = () => {
    if (!sortOrder) {
      setSortOrder('asc');
    } else if (sortOrder === 'asc') {
      setSortOrder('desc');
    } else {
      setSortOrder(null);
    }
  };

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
        onSortChange={handleSortChange}
        categories={categories}
        onClearFilters={clearFilters}
        showResults={!!(searchQuery || category)}
        resultsCount={data?.pages[0]?.total}
      />

      {/* Results Table */}
      {(searchQuery || category) ? (
        <>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            <Table data={sortedProducts} columns={productColumns} loading={isLoading} isError={isError} error={error} />
          </div>

          <InfiniteScrollLoader
            observerRef={observerTarget}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <p className="text-gray-500">Enter a search term or select a category to view products</p>
        </div>
      )}
    </div>
  );
}