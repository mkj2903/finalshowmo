import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);

  if (!product) return null;

  const discount = product.mrp && product.price 
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation if inside Link
    e.stopPropagation();
    
    setAdding(true);
    
    // Default size for T-shirts is 'M', for mugs no size
    const size = product.category === 't-shirts' ? 'M' : 'One Size';
    
    addToCart(product, size, 1);
    
    // Show success feedback
    setTimeout(() => {
      setAdding(false);
    }, 500);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden group">
      <Link to={`/product/${product._id}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.images?.[0] || 'https://via.placeholder.com/300x300'}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {discount > 0 && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              {discount}% OFF
            </div>
          )}
          {product.quantity < 10 && product.quantity > 0 && (
            <div className="absolute top-3 right-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              Low Stock
            </div>
          )}
          {product.quantity === 0 && (
            <div className="absolute top-3 right-3 bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              Out of Stock
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
            {product.category === 't-shirts' ? 'T-Shirt' : 'Mug'}
          </span>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1">4.5</span>
          </div>
        </div>

        <Link to={`/product/${product._id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 hover:text-blue-600 line-clamp-1">
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-gray-900">
              ₹{product.price || 0}
            </p>
            {product.mrp && product.mrp > product.price && (
              <p className="text-sm text-gray-500 line-through">
                ₹{product.mrp}
              </p>
            )}
          </div>
          
          <button 
            onClick={handleAddToCart}
            disabled={product.quantity === 0 || adding}
            className={`flex items-center justify-center px-4 py-2 rounded-lg transition-colors ${
              product.quantity === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : adding
                ? 'bg-green-600 text-white'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            title={product.quantity === 0 ? 'Out of stock' : 'Add to cart'}
          >
            {adding ? (
              'Added!'
            ) : (
              <ShoppingBag className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;