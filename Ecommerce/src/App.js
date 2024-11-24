import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; 
import ProductList from './components/ProductList';
import Cart from './components/CartPage';
import Sidebar from './components/Sidebar'; 
import { useCart } from './context/CartContext'; 

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Sidebar />

        <div className="ml-64  h-screen overflow-y-auto">
      
          <header className="bg-blue-600 text-white shadow-lg sticky top-0 z-10 mb-4">
            <div className="container mx-auto flex justify-between items-center p-4">
              <Link to="/" className="text-2xl font-bold">E-Shop</Link>
              <nav>
                <Link to="/" className="px-4 py-2 hover:text-gray-200">Home</Link>
                <Link to="/cart" className="relative px-4 py-2 hover:text-gray-200">
                  Cart
                 
                  <CartCount />
                </Link>
              </nav>
            </div>
          </header>

        
          <div className="container mx-auto">
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
        </div>
      </Router>
    </CartProvider>
  );
};


const CartCount = () => {
  const { cart } = useCart(); 
  return cart.length > 0 && (
    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
      {cart.length}
    </span>
  );
};

export default App;
