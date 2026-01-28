import { create } from 'zustand';
import type { SortOrder } from '../types/product';

type FilterState = {
  searchQuery: string;
  category: string;
  sortOrder: SortOrder;
  filterType: 'search' | 'category';
  setSearchQuery: (query: string) => void;
  setCategory: (category: string) => void;
  setSortOrder: (order: SortOrder) => void;
  setFilterType: (type: 'search' | 'category') => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  searchQuery: '',
  category: '',
  sortOrder: null,
  filterType: 'search',
  // When setting search query, clear category (mutually exclusive)
  setSearchQuery: (query) => set({ searchQuery: query, category: '', filterType: 'search' }),
  // When setting category, clear search query (mutually exclusive)
  setCategory: (category) => set({ category, searchQuery: '', filterType: 'category' }),
  setSortOrder: (order) => set({ sortOrder: order }),
  setFilterType: (type) => set({ filterType: type }),
  clearFilters: () => set({ searchQuery: '', category: '', sortOrder: null, filterType: 'search' }),
}));
