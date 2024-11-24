import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCartIcon } from '@heroicons/react/outline';

const Header = () => {
  const { cart } = useCart();

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center sticky top-0 z-10 shadow-lg">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold">
        E-Commerce
      </Link>

      {/* Cart Icon with Badge */}
      <div className="relative">
        <Link to="/cart">
          <ShoppingCartIcon className="w-8 h-8 hover:text-gray-300 transition-colors" />
        </Link>

        {/* Cart Count Badge */}
        {cart.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {cart.reduce((total, item) => total + item.quantity, 0)}
          </span>
        )}
      </div>
    </header>
  );
};

export default Header;
