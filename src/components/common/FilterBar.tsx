import { Search } from 'lucide-react';
import type { FilterBarProps } from '../../types/product';
import { useRef, useCallback } from 'react';

export function FilterBar({ searchQuery, onSearchChange, category, onCategoryChange, sortOrder, onSortChange, categories, onClearFilters, showResults = false, resultsCount, filterType, onFilterTypeChange }: FilterBarProps) {
    const hasActiveFilters = searchQuery || category || sortOrder;
    const debounceTimer = useRef<number | null>(null);

    const handleSearchChange = useCallback((value: string) => {
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }
        debounceTimer.current = setTimeout(() => {
            onSearchChange(value);
        }, 500);
    }, [onSearchChange]);

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <div className="space-y-4">
                {/* choose filter type */}
                <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="filterType"
                            value="search"
                            checked={filterType === 'search'}
                            onChange={() => onFilterTypeChange('search')}
                            className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm font-medium">Search by Title</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="filterType"
                            value="category"
                            checked={filterType === 'category'}
                            onChange={() => onFilterTypeChange('category')}
                            className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm font-medium">Filter by Category</span>
                    </label>
                </div>

                {filterType === 'search' && (
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            defaultValue={searchQuery}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            placeholder="Search products by title..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                    </div>
                )}

                <div className="flex flex-wrap gap-3 items-center">
                    {filterType === 'category' && categories && (
                        <select
                            value={category}
                            onChange={(e) => onCategoryChange(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="">All Categories</option>
                            {categories?.map((cat) => (
                                <option key={cat.slug} value={cat.slug}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    )}

                    <select
                        value={sortOrder || ''}
                        onChange={(e) => {
                            const value = e.target.value;
                            onSortChange(value === '' ? null : value as 'asc' | 'desc');
                        }}
                        className="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                        <option value="">Sort by Price</option>
                        <option value="asc">Price: Low to High</option>
                        <option value="desc">Price: High to Low</option>
                    </select>

                    {hasActiveFilters && (
                        <button
                            onClick={onClearFilters}
                            className="px-3 py-2 text-red-600 hover:text-red-700 text-sm"
                        >
                            Clear all filters
                        </button>
                    )}
                </div>

                {showResults && resultsCount !== undefined && (
                    <p className="text-gray-500 text-sm">
                        Found {resultsCount} products
                    </p>
                )}
            </div>
        </div>
    );
}
