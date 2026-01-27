import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll.tsx';
import { Table } from './common/Table';
import { InfiniteScrollLoader } from './common/InfiniteScrollLoader.tsx';
import { createProductColumns } from '../config/productColumns';
import { useCurrency } from '../context/useCurrency';
import { Search } from 'lucide-react';

export function ProductListPage() {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/products/search?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <p className="text-gray-500 mt-1">
          {data?.pages[0]?.total && `Total ${data.pages[0].total} products`}
        </p>
      </div>

      {/* Search Box */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search products by title..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Search
          </button>
        </div>
      </form>

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
