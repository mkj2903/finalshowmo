const API_BASE = 'http://localhost:5000/api';

// ========================
// AUTH API (for user authentication)
// ========================
const authAPI = {
  // Google login
  googleLogin: async (token) => {
    try {
      const response = await fetch(`${API_BASE}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });
      return await response.json();
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  // Get user by email
  getUserByEmail: async (email) => {
    try {
      const response = await fetch(`${API_BASE}/auth/user/${email}`);
      return await response.json();
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
};

// ========================
// PRODUCTS API (for product operations) - UPDATED
// ========================
const productAPI = {
  // Get all products
  getAllProducts: async (params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      console.log('Fetching all products with params:', params);
      
      const response = await fetch(`${API_BASE}/products?${queryString}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('All products response:', data);
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return { 
        success: false, 
        message: error.message || 'Failed to fetch products',
        products: [] 
      };
    }
  },

  // Get single product by ID
  getProductById: async (productId) => {
    try {
      const response = await fetch(`${API_BASE}/products/${productId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          return { 
            success: false, 
            message: 'Product not found' 
          };
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching product:', error);
      return { 
        success: false, 
        message: error.message || 'Failed to fetch product' 
      };
    }
  },

  // Search products
  searchProducts: async (query) => {
    try {
      const response = await fetch(`${API_BASE}/products/search/products?q=${encodeURIComponent(query)}`);
      return await response.json();
    } catch (error) {
      console.error('Error searching products:', error);
      return { 
        success: false, 
        message: error.message,
        products: [] 
      };
    }
  },

  // ✅ FIXED: Get products by category - Properly handle category
  getProductsByCategory: async (category) => {
    try {
      console.log('Fetching products by category:', category);
      
      // Try category endpoint first
      const response = await fetch(`${API_BASE}/products/category/${category}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Category endpoint response:', data);
        return data;
      }
      
      // Fallback to filter endpoint
      console.log('Category endpoint failed, trying filter...');
      const filterResponse = await fetch(`${API_BASE}/products?category=${encodeURIComponent(category)}`);
      const filterData = await filterResponse.json();
      
      if (filterResponse.ok) {
        console.log('Filter endpoint response:', filterData);
        return filterData;
      }
      
      // Last resort: get all and filter client-side
      console.log('Both endpoints failed, filtering client-side...');
      const allResponse = await fetch(`${API_BASE}/products`);
      const allData = await allResponse.json();
      
      if (allData.success && allData.products) {
        const filtered = allData.products.filter(p => 
          p.category?.toLowerCase() === category.toLowerCase()
        );
        return {
          success: true,
          products: filtered,
          count: filtered.length,
          message: 'Filtered client-side'
        };
      }
      
      throw new Error('Failed to fetch products by category');
      
    } catch (error) {
      console.error('Error fetching products by category:', error);
      return { 
        success: false, 
        message: error.message,
        products: [] 
      };
    }
  },

  // Get featured products
  getFeaturedProducts: async () => {
    try {
      const response = await fetch(`${API_BASE}/products/featured/products`);
      
      if (!response.ok) {
        // Fallback to all products
        const allResponse = await fetch(`${API_BASE}/products?limit=8`);
        const allData = await allResponse.json();
        
        if (allData.success) {
          const featured = allData.products.filter(p => p.featured).slice(0, 8) || 
                          allData.products.slice(0, 8);
          return { 
            success: true, 
            products: featured,
            message: 'Using fallback method'
          };
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching featured products:', error);
      
      // Fallback: Get all products and filter featured
      try {
        const allResponse = await fetch(`${API_BASE}/products?limit=8`);
        const allData = await allResponse.json();
        
        if (allData.success) {
          return { 
            success: true, 
            products: allData.products.slice(0, 8) || [],
            message: 'Using fallback after error'
          };
        }
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
      }
      
      return { 
        success: false, 
        message: error.message || 'Failed to fetch featured products',
        products: [] 
      };
    }
  }
};

// ========================
// ORDERS API (for order operations) - UPDATED
// ========================
const orderAPI = {
  // Create order (Public endpoint - No token required)
  createOrder: async (orderData) => {
    try {
      const response = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(orderData)
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        return { 
          success: false, 
          message: responseData.message || 'Failed to create order'
        };
      }
      
      return responseData;
    } catch (error) {
      return { 
        success: false, 
        message: error.message || 'Failed to create order. Please try again.'
      };
    }
  },

  // ✅ NEW: Get user orders by email (for MyOrders page)
  getUserOrdersByEmail: async (email) => {
    try {
      // Using track order endpoint to get single orders
      // For multiple orders, we need backend endpoint like /api/orders/user/:email
      // For now, we'll fetch all orders and filter by email
      const response = await fetch(`${API_BASE}/orders`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Filter orders by user email
          const userOrders = data.orders.filter(order => 
            order.userEmail === email
          );
          return {
            success: true,
            orders: userOrders,
            count: userOrders.length
          };
        }
      }
      
      return { 
        success: false, 
        message: 'Failed to fetch user orders',
        orders: [] 
      };
    } catch (error) {
      return { 
        success: false, 
        message: error.message,
        orders: [] 
      };
    }
  },

  // Get order by ID (Public)
  getOrderById: async (orderId) => {
    try {
      const response = await fetch(`${API_BASE}/orders/${orderId}`);
      return await response.json();
    } catch (error) {
      return { 
        success: false, 
        message: error.message 
      };
    }
  },

  // Track order (Public)
  trackOrder: async (orderId, email) => {
    try {
      const response = await fetch(`${API_BASE}/orders/track/${orderId}?email=${encodeURIComponent(email)}`);
      return await response.json();
    } catch (error) {
      return { 
        success: false, 
        message: error.message 
      };
    }
  },

  // ✅ NEW: Simple get all orders (without admin token)
  getAllOrders: async () => {
    try {
      const response = await fetch(`${API_BASE}/orders`);
      return await response.json();
    } catch (error) {
      return { 
        success: false, 
        message: error.message,
        orders: [] 
      };
    }
  }
};

// ========================
// ADMIN API (for admin panel) - SIMPLIFIED
// ========================
const adminApi = {
  // Admin login
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      
      const data = await response.json();
      
      if (data.success && data.token) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.user));
      }
      
      return data;
    } catch (error) {
      return { 
        success: false, 
        message: error.message || 'Network error during login' 
      };
    }
  },

  // Dashboard stats
  getDashboardStats: async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) return { success: false, message: 'Not authenticated' };
    
    try {
      const response = await fetch(`${API_BASE}/admin/dashboard`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return await response.json();
    } catch (error) {
      return { 
        success: false, 
        message: error.message,
        stats: {
          totalOrders: 0,
          totalRevenue: 0,
          totalProducts: 0,
          totalUsers: 0,
          pendingOrders: 0,
          recentOrders: []
        }
      };
    }
  },

  // Orders management
  getOrders: async (params = {}) => {
    const token = localStorage.getItem('adminToken');
    if (!token) return { success: false, message: 'Not authenticated', orders: [] };
    
    try {
      const query = new URLSearchParams(params).toString();
      const response = await fetch(`${API_BASE}/admin/orders?${query}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return await response.json();
    } catch (error) {
      return { 
        success: false, 
        message: error.message,
        orders: [] 
      };
    }
  },

  updateOrderStatus: async (orderId, data) => {
    const token = localStorage.getItem('adminToken');
    if (!token) return { success: false, message: 'Not authenticated' };
    
    try {
      const response = await fetch(`${API_BASE}/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      return await response.json();
    } catch (error) {
      return { 
        success: false, 
        message: error.message 
      };
    }
  },

  verifyPayment: async (orderId, data) => {
    const token = localStorage.getItem('adminToken');
    if (!token) return { success: false, message: 'Not authenticated' };
    
    try {
      const response = await fetch(`${API_BASE}/admin/orders/${orderId}/verify-payment`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      return await response.json();
    } catch (error) {
      return { 
        success: false, 
        message: error.message 
      };
    }
  },

  // Products management
  getProducts: async (params = {}) => {
    const token = localStorage.getItem('adminToken');
    if (!token) return { success: false, message: 'Not authenticated', products: [] };
    
    try {
      const query = new URLSearchParams(params).toString();
      const response = await fetch(`${API_BASE}/admin/products?${query}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return await response.json();
    } catch (error) {
      return { 
        success: false, 
        message: error.message,
        products: [] 
      };
    }
  },

  createProduct: async (productData) => {
    const token = localStorage.getItem('adminToken');
    if (!token) return { success: false, message: 'Not authenticated' };
    
    try {
      const response = await fetch(`${API_BASE}/admin/products`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      });
      return await response.json();
    } catch (error) {
      return { 
        success: false, 
        message: error.message 
      };
    }
  },

  updateProduct: async (productId, productData) => {
    const token = localStorage.getItem('adminToken');
    if (!token) return { success: false, message: 'Not authenticated' };
    
    try {
      const response = await fetch(`${API_BASE}/admin/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      });
      return await response.json();
    } catch (error) {
      return { 
        success: false, 
        message: error.message 
      };
    }
  },

  deleteProduct: async (productId) => {
    const token = localStorage.getItem('adminToken');
    if (!token) return { success: false, message: 'Not authenticated' };
    
    try {
      const response = await fetch(`${API_BASE}/admin/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return await response.json();
    } catch (error) {
      return { 
        success: false, 
        message: error.message 
      };
    }
  },

  // Users management
  getUsers: async (params = {}) => {
    const token = localStorage.getItem('adminToken');
    if (!token) return { success: false, message: 'Not authenticated', users: [] };
    
    try {
      const query = new URLSearchParams(params).toString();
      const response = await fetch(`${API_BASE}/admin/users?${query}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return await response.json();
    } catch (error) {
      return { 
        success: false, 
        message: error.message,
        users: [] 
      };
    }
  },

  // Reviews management
  getReviews: async (params = {}) => {
    const token = localStorage.getItem('adminToken');
    if (!token) return { success: false, message: 'Not authenticated', reviews: [] };
    
    try {
      const query = new URLSearchParams(params).toString();
      const response = await fetch(`${API_BASE}/admin/reviews?${query}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return await response.json();
    } catch (error) {
      return { 
        success: false, 
        message: error.message,
        reviews: [] 
      };
    }
  },

  // Settings management
  getSettings: async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) return { success: false, message: 'Not authenticated' };
    
    try {
      const response = await fetch(`${API_BASE}/admin/settings`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return await response.json();
    } catch (error) {
      return { 
        success: false, 
        message: error.message,
        settings: {} 
      };
    }
  },

  updateSettings: async (settingsData) => {
    const token = localStorage.getItem('adminToken');
    if (!token) return { success: false, message: 'Not authenticated' };
    
    try {
      const response = await fetch(`${API_BASE}/admin/settings`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(settingsData)
      });
      return await response.json();
    } catch (error) {
      return { 
        success: false, 
        message: error.message 
      };
    }
  }
};

// ========================
// UTILITY FUNCTIONS
// ========================

// Check if backend is running
const checkBackendStatus = async () => {
  try {
    const response = await fetch(`${API_BASE}/health`);
    return await response.json();
  } catch (error) {
    return { 
      success: false, 
      message: 'Backend server is not running',
      error: error.message 
    };
  }
};

// ========================
// INDIVIDUAL EXPORTS for easy imports
// ========================

// Create Order function (for Checkout.jsx)
export const createOrder = orderAPI.createOrder;

// Featured products function (for Home.jsx)
export const getFeaturedProducts = productAPI.getFeaturedProducts;

// Get user orders function (for MyOrders.jsx)
export const getUserOrdersByEmail = orderAPI.getUserOrdersByEmail;

// ========================
// EXPORT ALL APIs
// ========================
export { 
  authAPI, 
  productAPI, 
  orderAPI, 
  adminApi,
  checkBackendStatus
};

// Default export for backward compatibility
export default {
  auth: authAPI,
  products: productAPI,
  orders: orderAPI,
  admin: adminApi,
  utils: {
    checkBackendStatus
  }
};