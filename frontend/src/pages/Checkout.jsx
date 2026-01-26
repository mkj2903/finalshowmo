import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { QrCode, CheckCircle, Copy, Package, Loader } from 'lucide-react';
import { createOrder } from '../utils/api';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { currentUser } = useAuth();
  
  const [address, setAddress] = useState({
    fullName: '',
    email: '',
    phone: '',
    houseFlat: '',
    street: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
    addressType: 'Home'
  });
  
  const [utr, setUtr] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [orderData, setOrderData] = useState(null);
  
  const [storeSettings, setStoreSettings] = useState({
    upiId: 'tvmerch@upi',
    qrCodeImage: null
  });
  
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    discount: 0,
    delivery: 0,
    total: 0
  });
  
  useEffect(() => {
    // Load store settings
    const loadStoreSettings = () => {
      try {
        const savedSettings = localStorage.getItem('storeSettings');
        const savedQrCode = localStorage.getItem('storeQrCode');
        const savedUpiId = localStorage.getItem('storeUpiId');
        
        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings);
          setStoreSettings(prev => ({
            ...prev,
            upiId: parsedSettings.upiId || savedUpiId || 'tvmerch@upi',
            qrCodeImage: parsedSettings.qrCodeImage || savedQrCode
          }));
        } else if (savedUpiId || savedQrCode) {
          setStoreSettings(prev => ({
            ...prev,
            upiId: savedUpiId || 'tvmerch@upi',
            qrCodeImage: savedQrCode
          }));
        }
      } catch (error) {
        // Silent error for settings load
      }
    };
    
    loadStoreSettings();
    
    if (!currentUser) {
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
    
    if (currentUser) {
      setAddress(prev => ({
        ...prev,
        fullName: currentUser.displayName || currentUser.email.split('@')[0],
        email: currentUser.email || '',
        phone: currentUser.phoneNumber || ''
      }));
    }
    
    calculateOrderSummary();
    
    window.addEventListener('storage', loadStoreSettings);
    
    return () => {
      window.removeEventListener('storage', loadStoreSettings);
    };
  }, [currentUser, navigate, cartItems]);
  
  const calculateOrderSummary = () => {
    const subtotal = getTotalPrice();
    const discount = 0;
    const delivery = subtotal >= 999 ? 0 : 49;
    const total = subtotal - discount + delivery;
    
    setOrderSummary({ subtotal, discount, delivery, total });
  };
  
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };
  
  const validateForm = () => {
    const required = ['fullName', 'email', 'phone', 'houseFlat', 'street', 'city', 'state', 'pincode'];
    for (const field of required) {
      if (!address[field]?.trim()) {
        setError(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    
    if (!address.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    
    const phoneDigits = address.phone.replace(/\D/g, '');
    if (!phoneDigits || phoneDigits.length < 10) {
      setError('Phone number must be at least 10 digits');
      return false;
    }
    
    if (!/^\d{6}$/.test(address.pincode)) {
      setError('Pincode must be 6 digits');
      return false;
    }
    
    if (cartItems.length === 0) {
      setError('Your cart is empty');
      return false;
    }
    
    if (!utr || utr.length !== 12) {
      setError('Please enter a valid 12-digit UTR number');
      return false;
    }
    
    if (!/^\d{12}$/.test(utr)) {
      setError('UTR must contain only 12 digits (0-9)');
      return false;
    }
    
    return true;
  };
  
  const handlePlaceOrder = async () => {
    if (!validateForm()) return;
    
    if (!currentUser) {
      setError('Please login to place order');
      navigate('/login');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const items = cartItems.map(item => ({
        product: item.product._id,
        name: item.product.name,
        quantity: item.quantity,
        size: item.size || 'M',
        price: item.product.price,
        image: item.product.images?.[0] || ''
      }));
      
      const orderDataToSend = {
        userEmail: currentUser.email,
        userName: address.fullName || currentUser.displayName || currentUser.email.split('@')[0],
        items: items,
        shippingAddress: {
          fullName: address.fullName,
          email: address.email,
          phone: address.phone,
          houseFlat: address.houseFlat,
          street: address.street,
          landmark: address.landmark || '',
          city: address.city,
          state: address.state,
          pincode: address.pincode,
          country: 'India'
        },
        totalAmount: orderSummary.total,
        paymentMethod: 'UPI',
        utrNumber: utr,
        status: 'payment_pending'
      };
      
      const response = await createOrder(orderDataToSend);
      
      if (response.success) {
        const order = response.order;
        setOrderData(order);
        setSuccess('Order placed successfully! Admin will verify your payment.');
        clearCart();
        
        localStorage.setItem('lastOrderId', order.orderId || order._id);
        localStorage.setItem('lastOrderEmail', currentUser.email);
        
        setTimeout(() => {
          navigate('/order-confirmation', {
            state: {
              orderId: order.orderId || order._id,
              email: currentUser.email,
              totalAmount: order.totalAmount,
              status: order.status
            }
          });
        }, 1500);
      } else {
        setError(response.message || 'Failed to create order. Please try again.');
      }
    } catch (err) {
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const upiInstructions = [
    'Open your UPI app (Google Pay, PhonePe, Paytm)',
    'Scan the QR code below',
    'Pay the exact amount shown',
    'Enter 12-digit UTR from payment receipt',
    'Click "Confirm & Place Order"'
  ];
  
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };
  
  const refreshStoreSettings = () => {
    try {
      const savedSettings = localStorage.getItem('storeSettings');
      const savedQrCode = localStorage.getItem('storeQrCode');
      const savedUpiId = localStorage.getItem('storeUpiId');
      
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        setStoreSettings(prev => ({
          ...prev,
          upiId: parsedSettings.upiId || savedUpiId || 'tvmerch@upi',
          qrCodeImage: parsedSettings.qrCodeImage || savedQrCode
        }));
      } else if (savedUpiId || savedQrCode) {
        setStoreSettings(prev => ({
          ...prev,
          upiId: savedUpiId || 'tvmerch@upi',
          qrCodeImage: savedQrCode
        }));
      }
    } catch (error) {
      // Silent error
    }
  };
  
  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 text-yellow-500 mx-auto mb-4 flex items-center justify-center">
          <Package className="w-12 h-12" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Login Required</h1>
        <p className="text-gray-600 mb-6">Please login to proceed with checkout</p>
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Go to Login
        </button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
      <p className="text-gray-600 mb-8">Complete your order with shipping and payment details</p>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0 w-5 h-5 text-red-600 mr-2">⚠</div>
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        </div>
      )}
      
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-green-700 font-medium">{success}</p>
              {orderData && (
                <div className="mt-3 bg-white p-3 rounded border">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Order ID:</p>
                      <p className="font-mono text-lg font-bold">{orderData.orderId || orderData._id}</p>
                    </div>
                    <button 
                      onClick={() => copyToClipboard(orderData.orderId || orderData._id)}
                      className="text-blue-600 hover:text-blue-700 p-2 rounded hover:bg-blue-50"
                      title="Copy Order ID"
                    >
                      <Copy className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Status: <span className="font-semibold text-yellow-600">Payment Pending</span>
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Redirecting to order confirmation...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Address</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={address.fullName}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={address.email}
                    onChange={handleAddressChange}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${currentUser?.email ? 'bg-gray-50' : ''}`}
                    placeholder="you@example.com"
                    required
                    readOnly={!!currentUser?.email}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={address.phone}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="9876543210"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">House/Flat No. *</label>
                  <input
                    type="text"
                    name="houseFlat"
                    value={address.houseFlat}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="House/Flat number"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Street *</label>
                  <input
                    type="text"
                    name="street"
                    value={address.street}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Street name"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Landmark (Optional)</label>
                <input
                  type="text"
                  name="landmark"
                  value={address.landmark}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nearby landmark"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="City"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                  <input
                    type="text"
                    name="state"
                    value={address.state}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="State"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={address.pincode}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="6-digit pincode"
                    maxLength={6}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address Type</label>
                  <select
                    name="addressType"
                    value={address.addressType}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Order Items ({cartItems.length})</h3>
              <span className="text-gray-600 text-sm">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
              </span>
            </div>
            
            {cartItems.length > 0 ? (
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <img 
                        src={item.product.images?.[0] || 'https://via.placeholder.com/150'} 
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <p className="font-medium text-gray-900">{item.product.name}</p>
                      <div className="flex items-center mt-1 text-sm text-gray-600">
                        <span className="mr-4">Size: {item.size || 'M'}</span>
                        <span>Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">₹{item.product.price}</p>
                      <p className="text-sm text-gray-600">
                        Total: ₹{item.product.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
                
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Cart Total</span>
                    <span>₹{getTotalPrice()}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">Your cart is empty</p>
                <button
                  onClick={() => navigate('/products')}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Continue Shopping →
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹{orderSummary.subtotal}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery</span>
                <span className={orderSummary.delivery === 0 ? 'text-green-600 font-medium' : 'font-medium'}>
                  {orderSummary.delivery === 0 ? 'FREE' : `₹${orderSummary.delivery}`}
                </span>
              </div>
            </div>
            
            <div className="border-t pt-4 mb-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount</span>
                <span className="text-blue-600">₹{orderSummary.total}</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">Inclusive of all taxes</p>
              {orderSummary.total < 999 && (
                <p className="text-sm text-yellow-600 mt-1">
                  Add ₹{999 - orderSummary.total} more for FREE delivery
                </p>
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <QrCode className="h-7 w-7 text-blue-600 mr-3" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">UPI Payment</h2>
                <p className="text-sm text-gray-600">Scan QR code and enter UTR</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-block p-4 border-2 border-gray-300 rounded-xl bg-white">
                  <div className="w-56 h-56 mx-auto mb-4 flex items-center justify-center bg-white border rounded-lg overflow-hidden">
                    {storeSettings.qrCodeImage ? (
                      <img 
                        src={storeSettings.qrCodeImage} 
                        alt="UPI QR Code" 
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                        <div className="text-center">
                          <div className="h-20 w-20 text-blue-500 mx-auto mb-3 flex items-center justify-center">
                            <QrCode className="h-16 w-16" />
                          </div>
                          <p className="text-sm font-medium text-gray-700">Scan to Pay</p>
                          <p className="text-xs text-gray-500 mt-1">{storeSettings.upiId}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <p className="text-sm font-medium text-gray-700 mb-1">Pay Exact Amount</p>
                    <p className="font-bold text-2xl text-blue-700">₹{orderSummary.total}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      UPI ID: {storeSettings.upiId}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Payment Steps:</h3>
                <ol className="space-y-2">
                  {upiInstructions.map((instruction, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  12-digit UTR Number *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={utr}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 12);
                      setUtr(value);
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-lg"
                    placeholder="Enter 12-digit UTR from payment"
                    maxLength={12}
                    required
                  />
                  {utr && (
                    <button
                      onClick={() => copyToClipboard(utr)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-700"
                      title="Copy UTR"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Enter the 12-digit UTR number from your UPI payment receipt
                </p>
              </div>
              
              <button
                onClick={handlePlaceOrder}
                disabled={loading || cartItems.length === 0}
                className={`w-full py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center shadow-md ${loading || cartItems.length === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg'}`}
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin h-6 w-6 mr-3" />
                    Processing Order...
                  </>
                ) : cartItems.length === 0 ? (
                  'Cart is Empty'
                ) : (
                  'Confirm & Place Order'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;