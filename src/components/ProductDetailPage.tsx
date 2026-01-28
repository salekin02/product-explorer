import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';
import { StarIcon, ArrowLeft } from 'lucide-react';
import type { Review } from '../types/product';
import { LoadingSpinner } from './common/LoadingSpinner';
import { useCurrency } from '../context/useCurrency';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading, isError, error } = useProduct(id!);
  const { formatPrice } = useCurrency();

  if (isLoading) {
    return <LoadingSpinner fullPage message="Loading product details..." />;
  }

  if (isError || !product) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-lg font-semibold text-red-800 mb-2">
              {error instanceof Error ? error.message : 'Product not found'}
            </h2>
            <p className="text-red-600 text-sm mb-4">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <ArrowLeft size={16} />
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img
                src={product.images?.[0]}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Brand */}
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <Link to={`/products/search?category=${product.category}`} className="hover:text-blue-600">
                  {product.category}
                </Link>
                <span>•</span>
                <span className="font-medium text-gray-700">{product.brand}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <StarIcon className="text-yellow-500 fill-yellow-500" size={20} />
                  <span className="font-semibold">{product.rating?.toFixed(1)}</span>
                </div>
                <span className="text-gray-500 text-sm">({product.reviews?.length || 0} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="py-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold">{formatPrice(discountedPrice)}</span>
                {product.discountPercentage > 0 && (
                  <>
                    <span className="text-lg text-gray-400 line-through">{formatPrice(product.price)}</span>
                    <span className="text-sm text-red-600">
                      -{product.discountPercentage?.toFixed(0)}% off
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-gray-700">{product.description}</p>
            </div>

            {/* Product Details */}
            <div className="space-y-3 text-sm pt-4 border-t border-gray-400">
              <div className="flex gap-4">
                <span className="text-gray-500 w-24">Stock:</span>
                <span className="font-medium">{product.stock} available</span>
              </div>
              <div className="flex gap-4">
                <span className="text-gray-500 w-24">Brand:</span>
                <span className="font-medium">{product.brand}</span>
              </div>
              <div className="flex gap-4">
                <span className="text-gray-500 w-24">SKU:</span>
                <span className="font-medium">{product.sku}</span>
              </div>
              {product.warrantyInformation && (
                <div className="flex gap-4">
                  <span className="text-gray-500 w-24">Warranty:</span>
                  <span className="font-medium">{product.warrantyInformation}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-400">
            <h2 className="text-xl font-semibold mb-6">Reviews</h2>
            <div className="space-y-6">
              {product.reviews.map((review: Review, index: number) => (
                <div key={index} className="pb-6 border-b  border-gray-400 last:border-b-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">{review.reviewerName}</span>
                    <span className="text-gray-400">•</span>
                    <div className="flex items-center gap-1">
                      <StarIcon className="text-yellow-500 fill-yellow-500" size={14} />
                      <span className="text-sm">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2">{review.comment}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
