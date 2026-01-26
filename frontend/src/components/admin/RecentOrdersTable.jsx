import React from 'react';
import { Package, CheckCircle, Clock, Truck } from 'lucide-react';

const RecentOrdersTable = ({ orders }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'shipped': return <Truck className="w-4 h-4 text-blue-500" />;
      default: return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order ID
            </th>
            <th className="text-left py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="text-left py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="text-left py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.slice(0, 5).map((order) => (
            <tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3">
                <div className="flex items-center">
                  <Package className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-sm font-medium">#{order.orderId}</span>
                </div>
              </td>
              <td className="py-3">
                <div className="text-sm">
                  <div className="font-medium">{order.user?.name || 'Customer'}</div>
                  <div className="text-gray-500 truncate max-w-[150px]">
                    {order.user?.email || 'No email'}
                  </div>
                </div>
              </td>
              <td className="py-3">
                <div className="text-sm font-medium text-gray-900">
                  ₹{order.totalAmount}
                </div>
              </td>
              <td className="py-3">
                <div className="flex items-center">
                  {getStatusIcon(order.status)}
                  <span className="ml-2 text-sm capitalize">{order.status}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrdersTable;