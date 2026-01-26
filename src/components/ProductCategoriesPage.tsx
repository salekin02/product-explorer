import { Link } from 'react-router-dom';
import { useCategories } from '../hooks/useProducts';
import { Table } from './common/Table';
import type { Column } from '../types/table';
import type { Category } from '../types/product';

const categoryColumns: Column<Category>[] = [
  {
    key: 'name',
    header: 'Category',
    render: (category) => (
      <Link
        to={`/products/search?category=${category.slug}`}
        className="font-medium text-blue-600 hover:text-blue-800 capitalize"
      >
        {category.name}
      </Link>
    ),
  },
  {
    key: 'url',
    header: 'API URL',
    render: (category) => (
      <span className="text-sm text-gray-500">{category.url}</span>
    ),
  },
];

export function ProductCategoriesPage() {
  const { data: categories, isLoading, isError, error } = useCategories();

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Product Categories</h1>
        
        <div className="bg-white rounded-lg shadow">
          <Table
            data={categories || []}
            columns={categoryColumns}
            loading={isLoading}
            isError={isError}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}
