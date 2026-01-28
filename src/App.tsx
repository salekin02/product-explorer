import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { ProductListPage } from './components/ProductListPage';
import { ProductSearchPage } from './components/ProductSearchPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { ProductCategoriesPage } from './components/ProductCategoriesPage';
import { SettingsPage } from './components/SettingsPage';
import { Header } from './components/common/Header';

function App() {
  return <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="/products" element={<ProductListPage />} />
      <Route path="/products/categories" element={<ProductCategoriesPage />} />
      <Route path="/products/search" element={<ProductSearchPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="*" element={<ProductListPage />} />
    </Routes>
  </BrowserRouter>
}

export default App;
