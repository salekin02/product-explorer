import { Link } from 'react-router-dom';
import { StarIcon } from 'lucide-react';
import type { Column } from '../types/table';
import type { Product } from '../types/product';

export const createProductColumns = (formatPrice: (price: number) => string): Column<Product>[] => [
  {
    key: 'thumbnail',
    header: 'Name',
    className: 'w-auto',
    render: (product) => (
      <div>
        <Link to={`/products/${product.id}`} className="flex items-center gap-2">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-12 h-12 object-cover rounded"
            loading='lazy'
          />
          <span className="truncate w-48" title={product.title}>
            {product.title}
          </span>
        </Link>
      </div>
    ),
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
    render: (product) => <span>{formatPrice(product.price)}</span>,
  },
  {
    key: 'discountPercentage',
    header: 'Discount',
    className: 'hidden md:table-cell',
    render: (product) => <span>{product.discountPercentage?.toFixed(2)}%</span>,
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
        <span className="text-yellow-500">
          <StarIcon size={18} />
        </span>
        <span>{product.rating?.toFixed(1)}</span>
      </div>
    ),
  },
];
