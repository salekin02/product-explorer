import { Search } from 'lucide-react';
import type { FilterBarProps } from '../../types/product';


export function FilterBar({ searchQuery, onSearchChange, category, onCategoryChange, sortOrder, onSortChange, categories, onClearFilters, showResults = false, resultsCount }: FilterBarProps) {
    const hasActiveFilters = searchQuery || category || sortOrder;

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <div className="space-y-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search products by title..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                </div>

                <div className="flex flex-wrap gap-3 items-center">
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

                    <button
                        onClick={onSortChange}
                        className={`px-3 py-2 border rounded-lg transition-colors ${sortOrder
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 bg-white hover:bg-gray-50'
                            }`}
                    >
                        Price: {sortOrder === 'asc' ? '↑ Low to High' : sortOrder === 'desc' ? '↓ High to Low' : 'Default'}
                    </button>

                    {hasActiveFilters && (
                        <button
                            onClick={onClearFilters}
                            className="px-3 py-2 text-red-600 hover:text-red-700 text-sm"
                        >
                            Clear all filters
                        </button>
                    )}
                </div>

                {(searchQuery || category) && (
                    <div className="flex flex-wrap gap-2">
                        {searchQuery && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                                Search: "{searchQuery}"
                            </span>
                        )}
                        {category && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                                Category: {category}
                            </span>
                        )}
                    </div>
                )}

                {showResults && resultsCount !== undefined && (
                    <p className="text-gray-500 text-sm">
                        Found {resultsCount} products
                    </p>
                )}
            </div>
        </div>
    );
}
