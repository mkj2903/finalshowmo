import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { Filter, Search, Package, RefreshCw } from 'lucide-react';
import { productAPI } from '../utils/api';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  // ✅ FIXED: Get category from URL query parameter - UPDATED with location dependency
  useEffect(() => {
    const category = searchParams.get('category');
    console.log('URL Category:', category, 'Full URL:', location.pathname + location.search);
    
    if (category && ['t-shirts', 'mugs', 'accessories'].includes(category)) {
      setSelectedCategory(category);
      console.log('Setting category from URL:', category);
    } else {
      setSelectedCategory('all');
    }
  }, [searchParams, location]);

  // ✅ FIXED: Fetch products with proper category filtering
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      console.log('Fetching products with category:', selectedCategory);
      
      let response;
      
      // Use specific category endpoint if category is selected
      if (selectedCategory !== 'all') {
        response = await productAPI.getProductsByCategory(selectedCategory);
      } else {
        // Get all products
        const params = { _t: lastUpdate };
        response = await productAPI.getAllProducts(params);
      }
      
      console.log('API Response:', response);
      
      if (response.success) {
        setProducts(response.products || []);
        setFilteredProducts(response.products || []);
      } else {
        setProducts([]);
        setFilteredProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, lastUpdate]);

  // Fetch products when category changes
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // ✅ FIXED: Handle category change - Update URL and state
  const handleCategoryChange = (category) => {
    console.log('Category changed to:', category);
    setSelectedCategory(category);
    
    // Update URL with category parameter
    const newSearchParams = new URLSearchParams(searchParams);
    if (category === 'all') {
      newSearchParams.delete('category');
    } else {
      newSearchParams.set('category', category);
    }
    setSearchParams(newSearchParams);
    
    // Force re-fetch
    setLastUpdate(Date.now());
  };

  // ✅ FIXED: Search filter
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter(product =>
      product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 't-shirts', label: 'T-Shirts' },
    { value: 'mugs', label: 'Coffee Mugs' },
    { value: 'accessories', label: 'Accessories' }
  ];

  const handleRefresh = () => {
    setLastUpdate(Date.now());
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop Merchandise</h1>
        <p className="text-gray-600">Official TV Show Merchandise Collection</p>
        <p className="text-sm text-gray-500 mt-1">
          Category: <span className="font-semibold">{selectedCategory === 'all' ? 'All Products' : selectedCategory}</span>
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>
        
        {/* Active Filters Display */}
        <div className="mt-4 flex flex-wrap gap-2">
          {selectedCategory !== 'all' && (
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              Category: {selectedCategory}
              <button 
                onClick={() => handleCategoryChange('all')}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                ✕
              </button>
            </span>
          )}
          {searchQuery && (
            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
              Search: "{searchQuery}"
              <button 
                onClick={() => setSearchQuery('')}
                className="ml-2 text-gray-600 hover:text-gray-800"
              >
                ✕
              </button>
            </span>
          )}
        </div>
      </div>

      {/* Category Navigation Tabs */}
      <div className="flex space-x-2 mb-6 overflow-x-auto">
        {categories.map(cat => (
          <button
            key={cat.value}
            onClick={() => handleCategoryChange(cat.value)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              selectedCategory === cat.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading {selectedCategory !== 'all' ? selectedCategory : ''} products...</span>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No {selectedCategory !== 'all' ? selectedCategory : ''} products found
          </h3>
          <p className="text-gray-600">
            {searchQuery 
              ? `No products match "${searchQuery}"`
              : `No products available in ${selectedCategory} category`}
          </p>
          {(searchQuery || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                handleCategoryChange('all');
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Show All Products
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600">
              Showing {filteredProducts.length} {selectedCategory !== 'all' ? selectedCategory : ''} product{filteredProducts.length !== 1 ? 's' : ''}
            </p>
            {filteredProducts.length > 0 && (
              <p className="text-sm text-gray-500">
                Total: ₹{filteredProducts.reduce((sum, p) => sum + (p.price || 0), 0).toLocaleString()}
              </p>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </>
      )}

     
    </div>
  );
};

export default Products;