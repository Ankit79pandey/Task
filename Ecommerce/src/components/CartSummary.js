import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const CartSummary = () => {
  const { cart } = useCart();
  
  // State for managing discount input
  const [fixedDiscount, setFixedDiscount] = useState(0);
  const [percentageDiscount, setPercentageDiscount] = useState(0);

  // Calculate the subtotal
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Calculate discounts
  const calculateDiscounts = () => {
    let discount = 0;

    // Fixed Discount (e.g., $10 off)
    discount += fixedDiscount;

    // Percentage Discount (e.g., 10% off)
    discount += (calculateSubtotal() * percentageDiscount) / 100;

    return discount;
  };

  // Calculate Final Price
  const calculateFinalPrice = () => {
    return calculateSubtotal() - calculateDiscounts();
  };

  useEffect(() => {
    // Optional: Handle side effects if discounts change
  }, [fixedDiscount, percentageDiscount, cart]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Cart Summary</h2>

      <div className="space-y-4">
        {/* Subtotal */}
        <div className="flex justify-between">
          <span className="font-semibold">Subtotal:</span>
          <span>${calculateSubtotal().toFixed(2)}</span>
        </div>

        {/* Discount Inputs */}
        <div className="space-y-2">
          <div>
            <label className="block">Fixed Discount ($)</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={fixedDiscount}
              onChange={(e) => setFixedDiscount(parseFloat(e.target.value))}
              placeholder="Enter fixed discount"
            />
          </div>

          <div>
            <label className="block">Percentage Discount (%)</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={percentageDiscount}
              onChange={(e) => setPercentageDiscount(parseFloat(e.target.value))}
              placeholder="Enter percentage discount"
            />
          </div>
        </div>

        {/* Final Price */}
        <div className="flex justify-between font-semibold text-xl">
          <span>Final Price:</span>
          <span>${calculateFinalPrice().toFixed(2)}</span>
        </div>

        {/* Checkout Button */}
        <div className="mt-6">
          <button
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => alert("Proceeding to checkout...")}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
