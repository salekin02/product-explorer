import { useProducts } from '../hooks/useProducts';
import { Table } from './common/Table';
import type { Column } from '../types/table';
import type { Product } from '../types/product';
import { StarIcon } from 'lucide-react';

export function ProductListPage() {
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useProducts();

  const allProducts = data?.pages.flatMap((page) => page.products) ?? [];

  const columns: Column<Product>[] = [
    {
      key: 'thumbnail',
      header: 'Image',
      className: 'w-20',
      render: (product) => (
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-12 h-12 object-cover rounded"
        />
      ),
    },
    {
      key: 'title',
      header: 'Product Name',
    },
    {
      key: 'category',
      header: 'Category',
      
    },
    {
      key: 'brand',
      header: 'Brand',
      className: 'hidden sm:table-cell',
    },
    {
      key: 'price',
      header: 'Price',
      sortable: true,
    },
    {
        key: 'discountPercentage',
        header: 'Discount',
        className: 'hidden md:table-cell',
        render: (product) => (
          <span>{product.discountPercentage.toFixed(2)}%</span>
        ),
    },
    {
      key: 'stock',
      header: 'Stock',
      className: 'hidden md:table-cell',
      render: (product) => (
        <span
          className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
            product.stock > 50
              ? 'bg-green-100 text-green-800'
              : product.stock > 10
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {product.stock}
        </span>
      ),
    },
    {
      key: 'rating',
      header: 'Rating',
      className: 'hidden lg:table-cell',
      render: (product) => (
        <div className="flex items-center gap-1">
          <span className="text-yellow-500"><StarIcon size={18} /></span>
          <span>{product.rating.toFixed(1)}</span>
        </div>
      ),
    },
  ];

  if (isError) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto text-center">
          <h2 className="text-lg font-semibold text-red-800 mb-2">{error instanceof Error ? error.message : 'An unexpected error occurred'}</h2>
          <p className="text-red-600 text-sm">
            Please try refreshing the page or come back later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <p className="text-gray-500 mt-1">
          {data?.pages[0]?.total && `Total ${data.pages[0].total} products`}
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <Table data={allProducts} columns={columns} loading={isLoading} />
      </div>

      {hasNextPage && (
        <div className="mt-6 text-center">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-6 py-2 bg-blue-600 text-white rounded"
          >
            {isFetchingNextPage ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}
