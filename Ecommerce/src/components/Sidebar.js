import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; // Importing a shopping cart icon

const Sidebar = () => {
  return (
    <aside className="fixed top-0 left-0 w-64 bg-blue-600 text-white h-full p-6">
      {/* Logo/Brand Name */}
      <div className="flex items-center mb-8">
        <FaShoppingCart size={32} className="mr-2" />
        <span className="text-2xl font-semibold">E-Shop</span>
      </div>

      <nav>
        <ul className="space-y-6">
          <li>
            <Link
              to="/"
              className="flex items-center space-x-2 text-lg hover:text-blue-300 transition-all"
            >
              <span className="text-white">🏠</span>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="flex items-center space-x-2 text-lg hover:text-blue-300 transition-all"
            >
              <span className="text-white">🛒</span>
              <span>Cart</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
