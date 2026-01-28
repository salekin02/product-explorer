const BASE_URL = 'https://dummyjson.com';

export const productsApi = {
  getProducts: async (limit = 20, skip = 0) => {
    const response = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
    return response.json();
  },
  
  getProductById: async (id: string) => {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    return response.json();
  },
  
  searchProducts: async (query: string, limit = 20, skip = 0, category?: string, sortBy?: string, order?: 'asc' | 'desc' | null) => {
    const url = new URL(`${BASE_URL}/products/search`);
    url.searchParams.set('q', query);
    url.searchParams.set('limit', limit.toString());
    url.searchParams.set('skip', skip.toString());
    if (category) url.searchParams.set('category', category);
    if (sortBy) url.searchParams.set('sortBy', sortBy);
    if (order) url.searchParams.set('order', order);
    
    const response = await fetch(url.toString());
    return response.json();
  },
  
  getCategories: async () => {
    const response = await fetch(`${BASE_URL}/products/categories`);
    return response.json();
  },
};