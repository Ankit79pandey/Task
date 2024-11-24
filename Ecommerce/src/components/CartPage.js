import React from 'react';
import CartSummary from './CartSummary'; 
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  if (cart.length === 0) {
    return <div className="p-6 text-center">Your cart is empty.</div>;
  }

  return (
    <div className="flex">
      {/* Cart Items */}
      <div className="flex-1 p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center">
            <div className="flex space-x-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                className="w-16 p-1 border border-gray-300 rounded-md"
                min="1"
              />
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="w-80 p-6 bg-gray-100">
        <CartSummary /> {/* Render the Cart Summary component here */}
      </div>
    </div>
  );
};

export default CartPage;
