import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';
import productsData from '../data/products.json'; 
import { useCart } from '../context/CartContext';
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    // Fetch from API or use static data
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        console.log(response.data)
        setProducts(response.data);  // dynamic API fetch
      } catch (error) {
        setProducts(productsData);  // fall back to static data
      }
    };
    fetchProducts();
  }, []);


  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default ProductList;
