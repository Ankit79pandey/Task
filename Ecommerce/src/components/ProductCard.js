import React from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-lg p-4 flex flex-col items-center">
      <img src={product.image} alt={product.name} className="w-32 h-32 object-cover mb-4" />
      <h2 className="font-bold text-center">{product.name}</h2>
      <p className="text-gray-500">${product.price.toFixed(2)}</p>
      <button
        className="bg-blue-500 text-white mt-2 px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
