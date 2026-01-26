// frontend/src/pages/Home.jsx - COMPLETE UPDATED
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, RefreshCw, Star, AlertCircle } from 'lucide-react';
import { productAPI } from '../utils/api';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState('');

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productAPI.getFeaturedProducts();
      
      console.log('Featured Products API Response:', response); // Debug ke liye
      
      if (response.success) {
        setFeaturedProducts(response.products || []);
        setLastUpdated(new Date().toLocaleTimeString());
      } else {
        setError(response.message || 'Failed to load featured products');
        setFeaturedProducts([]);
      }
    } catch (error) {
      console.error('Error fetching featured products:', error);
      setError('Network error. Please check your connection.');
      setFeaturedProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchFeaturedProducts();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    fetchFeaturedProducts();
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Wear Your Favorite <span className="text-yellow-300">TV Shows</span>
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Official merchandise from your favorite TV series. 
              Premium quality T-Shirts & Coffee Mugs for true fans.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/products?category=t-shirts"
                className="inline-flex items-center justify-center bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                View T-Shirts
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop By Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link
              to="/products?category=t-shirts"
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="h-64 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">👕</div>
                  <h3 className="text-2xl font-bold text-white mb-2">T-Shirts</h3>
                  <p className="text-blue-100">Show off your fandom in style</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </Link>
            
            <Link
              to="/products?category=mugs"
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="h-64 bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">☕</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Coffee Mugs</h3>
                  <p className="text-purple-100">Start your day with your favorite show</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </Link>
            
            <Link
              to="/products"
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="h-64 bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">🎁</div>
                  <h3 className="text-2xl font-bold text-white mb-2">All Products</h3>
                  <p className="text-green-100">Browse our complete collection</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </Link>
          </div>
          
          {/* Quick Category Links */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/products?category=t-shirts"
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              👕 T-Shirts
            </Link>
            <Link
              to="/products?category=mugs"
              className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
            >
              ☕ Coffee Mugs
            </Link>
            <Link
              to="/products"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              📦 All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
            <div className="mb-4 sm:mb-0">
              <h2 className="text-3xl font-bold">Featured Products</h2>
              <p className="text-gray-600 mt-2">Best selling merchandise from our collection</p>
            </div>
            <div className="flex items-center space-x-4">
              {lastUpdated && (
                <span className="text-sm text-gray-500">
                  Updated: {lastUpdated}
                </span>
              )}
              <button
                onClick={handleRefresh}
                className="flex items-center text-blue-600 hover:text-blue-700"
                title="Refresh"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <Link
                to="/products"
                className="text-blue-600 font-semibold hover:text-blue-700 flex items-center"
              >
                View All
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600">Loading featured products...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Products</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={handleRefresh}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          ) : featuredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              
              {featuredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">No featured products found</p>
                  <p className="text-sm text-gray-600">
                    Mark products as "Featured" in the admin panel to display them here
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No featured products available</p>
              <p className="text-sm text-gray-600 mb-6">
                Add products and mark them as "Featured" in the admin panel
              </p>
              <div className="flex justify-center space-x-4">
                <Link
                  to="/products"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Browse All Products
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free delivery on orders above ₹199</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">Premium quality products with 7-day return</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-600">Hassle-free returns within 7 days</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Fans Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Rahul Sharma', show: 'Breaking Bad Fan', text: 'The quality is amazing! My Walter White t-shirt gets compliments everywhere.' },
              { name: 'Priya Patel', show: 'Friends Collector', text: 'Best Friends merchandise I\'ve ever bought. The mugs are perfect!' },
              { name: 'Amit Kumar', show: 'Game of Thrones Fan', text: 'Great collection and fast delivery. Will definitely order again.' }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm">{testimonial.show}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Show Your Fandom?</h2>
          <p className="text-xl mb-8 opacity-90">
            Browse our exclusive collection of TV show merchandise
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/products"
              className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Shop All Products
            </Link>
            <Link
              to="/products?category=t-shirts"
              className="inline-flex items-center justify-center bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Shop T-Shirts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;