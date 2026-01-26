// frontend/src/pages/OrderConfirmation.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Copy, Package, Home, Truck } from 'lucide-react';

const OrderConfirmation = () => {
  const location = useLocation();
  const { orderId, email, totalAmount, status } = location.state || {};
  
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Order Placed Successfully!
          </h1>
          
          <p className="text-gray-600 mb-8">
            Thank you for your order. Your payment is being verified.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-left">
                <p className="text-sm text-gray-500">Order ID</p>
                <div className="flex items-center">
                  <p className="font-mono font-bold text-lg text-gray-900">
                    {orderId || 'ORD2024123456'}
                  </p>
                  {orderId && (
                    <button
                      onClick={() => copyToClipboard(orderId)}
                      className="ml-2 text-blue-600 hover:text-blue-700"
                      title="Copy Order ID"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="font-bold text-2xl text-blue-600">
                  ₹{totalAmount || '0'}
                </p>
              </div>
            </div>
            
            <div className="border-t pt-6">
              <p className="text-sm text-gray-500 mb-2">Order Status</p>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-100 text-yellow-800 font-medium">
                <Package className="h-4 w-4 mr-2" />
                Payment Pending Verification
              </div>
              <p className="text-sm text-gray-600 mt-3">
                Our admin will verify your UTR within 24 hours.
              </p>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              What's Next?
            </h3>
            <div className="space-y-3 text-left">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                  1
                </div>
                <div>
                  <p className="font-medium text-gray-900">Payment Verification</p>
                  <p className="text-sm text-gray-600">Admin verifies UTR within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                  2
                </div>
                <div>
                  <p className="font-medium text-gray-900">Order Processing</p>
                  <p className="text-sm text-gray-600">We prepare your items</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                  3
                </div>
                <div>
                  <p className="font-medium text-gray-900">Shipping</p>
                  <p className="text-sm text-gray-600">Order shipped with tracking</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              <Home className="h-5 w-5 mr-2" />
              Continue Shopping
            </Link>
            
            <Link
              to="/track-order"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              <Truck className="h-5 w-5 mr-2" />
              Track Your Order
            </Link>
          </div>
        </div>
        
        <div className="text-center text-sm text-gray-500">
          <p>Need help? Contact: <span className="font-medium">support@tvmerch.com</span></p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;