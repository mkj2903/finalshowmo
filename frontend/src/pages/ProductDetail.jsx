import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingCart, Package, Truck, Shield, Star, Heart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { productAPI } from '../utils/api';  // ✅ IMPORT ADD KARNA

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        // ✅ ACTUAL API CALL KARNA
        const response = await productAPI.getProductById(id);
        
        if (response.success && response.product) {
          setProduct(response.product);
          // Agar product ke sizes hai toh default size set karna
          if (response.product.sizes && response.product.sizes.length > 0) {
            setSelectedSize(response.product.sizes[0]);
          }
          // Agar images hai toh first image set karna
          if (response.product.images && response.product.images.length > 0) {
            setSelectedImage(0);
          }
        } else {
          console.error('Product not found:', response);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);  // ✅ Jab bhi ID change ho, naya product fetch karo

  const handleAddToCart = () => {
    if (!product || product.quantity === 0) return;
    
    setAddingToCart(true);
    addToCart(product, selectedSize, quantity);
    
    setTimeout(() => {
      setAddingToCart(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
        <p className="text-gray-600">The product you're looking for doesn't exist.</p>
      </div>
    );
  }

  const discount = product.mrp && product.price 
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="rounded-xl overflow-hidden mb-4">
            <img
              src={product.images?.[selectedImage] || 'https://via.placeholder.com/600x600'}
              alt={product.name}
              className="w-full h-auto"
            />
          </div>
          
          {/* Thumbnail Images */}
          {product.images && product.images.length > 1 && (
            <div className="flex space-x-4">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`${product.name} ${index + 1}`} 
                    className="w-full h-full object-cover" 
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-4">
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              {product.category === 't-shirts' ? 'T-Shirt' : 
               product.category === 'mugs' ? 'Coffee Mug' : 
               product.category || 'Product'}
            </span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="ml-2 text-gray-600">(4.5) • 128 Reviews</span>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center space-x-4 mb-2">
              <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
              {product.mrp && product.mrp > product.price && (
                <>
                  <span className="text-xl text-gray-500 line-through">₹{product.mrp}</span>
                  <span className="text-lg font-bold text-red-600">{discount}% OFF</span>
                </>
              )}
            </div>
            
            {product.quantity > 0 ? (
              <div className="flex items-center text-green-600">
                <Package className="w-5 h-5 mr-2" />
                <span>In Stock ({product.quantity} available)</span>
              </div>
            ) : (
              <div className="text-red-600">Out of Stock</div>
            )}
          </div>
          
          <p className="text-gray-700 mb-8 leading-relaxed">{product.description}</p>
          
          {/* Size Selection (for T-Shirts) */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Select Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 border-2 rounded-lg font-medium transition-all ${
                      selectedSize === size
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Quantity */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Quantity</h3>
            <div className="flex items-center">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 border border-gray-300 rounded-l-lg hover:bg-gray-50"
              >
                -
              </button>
              <div className="px-6 py-2 border-t border-b border-gray-300">
                {quantity}
              </div>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 border border-gray-300 rounded-r-lg hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-4 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={product.quantity === 0 || addingToCart}
              className={`flex-1 py-4 rounded-lg font-semibold flex items-center justify-center transition-all ${
                product.quantity === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : addingToCart
                  ? 'bg-green-600 text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {addingToCart ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </>
              )}
            </button>
            <button className="px-6 py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50">
              <Heart className="w-5 h-5" />
            </button>
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center">
              <Truck className="w-6 h-6 text-blue-600 mr-3" />
              <div>
                <h4 className="font-semibold">Free Shipping</h4>
                <p className="text-sm text-gray-600">On orders above ₹199</p>
              </div>
            </div>
            <div className="flex items-center">
              <Shield className="w-6 h-6 text-green-600 mr-3" />
              <div>
                <h4 className="font-semibold">Quality Guarantee</h4>
                <p className="text-sm text-gray-600">7-day return policy</p>
              </div>
            </div>
          </div>
          
          {/* Product Details */}
          {product.details && product.details.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Product Details</h3>
              <ul className="space-y-2">
                {product.details.map((detail, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;