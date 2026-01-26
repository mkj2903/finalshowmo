import React from 'react';
import { TrendingUp } from 'lucide-react';

const SalesChart = ({ data }) => {
  // If no data, show placeholder
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <TrendingUp className="w-12 h-12 text-gray-300 mb-4" />
        <p className="text-lg font-medium">No sales data available</p>
        <p className="text-sm">Sales chart will appear here when data is available</p>
      </div>
    );
  }

  // Sample chart data structure for demo
  const chartData = [
    { month: 'Jan', sales: 65000 },
    { month: 'Feb', sales: 78000 },
    { month: 'Mar', sales: 92000 },
    { month: 'Apr', sales: 85000 },
    { month: 'May', sales: 101000 },
    { month: 'Jun', sales: 120000 },
  ];

  const maxSales = Math.max(...chartData.map(item => item.sales));

  return (
    <div className="h-64">
      <div className="flex items-end justify-between h-48 space-x-2 mt-4">
        {chartData.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="w-full flex flex-col items-center">
              <div
                className="w-3/4 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg transition-all duration-300 hover:opacity-80"
                style={{ height: `${(item.sales / maxSales) * 100}%` }}
              />
              <div className="text-xs text-gray-600 mt-2">{item.month}</div>
              <div className="text-xs font-medium text-gray-900">
                ₹{(item.sales / 1000).toFixed(0)}k
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-gray-600">Total Sales</span>
          </div>
          <div className="font-medium text-gray-900">
            ₹{chartData.reduce((sum, item) => sum + item.sales, 0).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;