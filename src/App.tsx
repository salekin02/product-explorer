import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { ProductListPage } from './components/ProductListPage';
import { ProductSearchPage } from './components/ProductSearchPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { ProductCategoriesPage } from './components/ProductCategoriesPage';

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/products" element={<ProductListPage />} />
      <Route path="/products/categories" element={<ProductCategoriesPage />} />
      <Route path="/products/search" element={<ProductSearchPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="*" element={<ProductListPage />} />
    </Routes>
  </BrowserRouter>
}

export default App;
