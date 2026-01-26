import React from 'react';
import { X, Package, User, Mail, MapPin, CreditCard } from 'lucide-react';

const OrderModal = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Order Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Order Information
                </h3>
                <p><span className="font-medium">Order ID:</span> #{order.orderId || order.id}</p>
                <p><span className="font-medium">Date:</span> {new Date(order.createdAt || order.date).toLocaleString()}</p>
                <p><span className="font-medium">Status:</span> <span className="capitalize">{order.status}</span></p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Customer Information
                </h3>
                <p>{order.user?.name || order.customer}</p>
                <p className="flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  {order.user?.email || order.email}
                </p>
              </div>
            </div>

            {/* Products */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Products</h3>
              <div className="space-y-4">
                {order.items?.map((item, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Package className="w-8 h-8 text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium text-gray-900">{item.product?.name || `Product ${index + 1}`}</h4>
                        <p className="text-sm text-gray-600">Size: {item.size || 'M'}, Qty: {item.quantity || 1}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">₹{item.price || 0}</p>
                      <p className="text-sm text-gray-600">Total: ₹{((item.price || 0) * (item.quantity || 1))}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment & Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Information
                </h3>
                <p><span className="font-medium">Method:</span> UPI</p>
                <p><span className="font-medium">Status:</span> {order.paymentStatus || 'pending'}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{order.subtotal || order.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>₹{order.shippingCharge || 0}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span>₹{order.totalAmount || order.amount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;