import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/products' && location.pathname === '/products') return true;
    if (path !== '/products' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="border-b border-gray-200 shadow-sm sticky top-0 bg-white z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link to="/products" className="font-semibold">
            Product Explorer
          </Link>
            
          <nav className="flex items-center gap-6">
            <Link
              to="/products"
              className={`text-sm ${
                isActive('/products') && !location.pathname.includes('/search') && !location.pathname.includes('/categories')
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Products
            </Link>
            <Link
              to="/products/categories"
              className={`text-sm ${
                isActive('/products/categories')
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Categories
            </Link>
            <Link
              to="/products/search"
              className={`text-sm ${
                isActive('/products/search')
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Search
            </Link>
            <Link
              to="/settings"
              className={`text-sm ${
                isActive('/settings')
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Settings
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
