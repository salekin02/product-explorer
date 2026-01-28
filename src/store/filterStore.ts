import { create } from 'zustand';
import type { FilterBarProps, SortOrder } from '../types/product';

type FilterState = Pick<FilterBarProps, 'searchQuery' | 'category' | 'sortOrder'> & {
  setSearchQuery: (query: string) => void;
  setCategory: (category: string) => void;
  setSortOrder: (order: SortOrder) => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  searchQuery: '',
  category: '',
  sortOrder: null,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setCategory: (category) => set({ category }),
  setSortOrder: (order) => set({ sortOrder: order }),
  clearFilters: () => set({ searchQuery: '', category: '', sortOrder: null }),
}));
