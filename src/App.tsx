import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { ProductListPage } from './components/ProductListPage';

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/products" element={<ProductListPage />} />
      <Route path="*" element={<ProductListPage />} />
    </Routes>
  </BrowserRouter>
}

export default App;
