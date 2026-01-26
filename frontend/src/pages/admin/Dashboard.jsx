import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  Package,
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Clock,
  Star ,
  CheckCircle
} from 'lucide-react';
import { adminApi } from '../../utils/api';
import StatCard from '../../components/admin/StatCard';
import RecentOrdersTable from '../../components/admin/RecentOrdersTable';
import SalesChart from '../../components/admin/SalesChart';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await adminApi.getDashboardStats();
      if (response.success) {
        setStats(response);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Orders"
          value={stats?.stats.totalOrders || 0}
          icon={ShoppingBag}
          trend={"+12%"}
          color="blue"
        />
        <StatCard
          title="Pending Orders"
          value={stats?.stats.pendingOrders || 0}
          icon={Clock}
          trend={"+5%"}
          color="yellow"
        />
        <StatCard
          title="Total Revenue"
          value={`₹${stats?.stats.totalRevenue || 0}`}
          icon={DollarSign}
          trend={"+18%"}
          color="green"
        />
        <StatCard
          title="Low Stock"
          value={stats?.stats.lowStockProducts || 0}
          icon={AlertTriangle}
          trend={"-2%"}
          color="red"
        />
      </div>

      {/* Charts and Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Sales Overview</h2>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <SalesChart data={stats?.salesData || []} />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
            <Package className="w-5 h-5 text-blue-500" />
          </div>
          <RecentOrdersTable orders={stats?.recentOrders || []} />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow text-left">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Verify Payments</h3>
                <p className="text-sm text-gray-600">Check pending payments</p>
              </div>
            </div>
          </button>
          
          <button className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow text-left">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Add Product</h3>
                <p className="text-sm text-gray-600">Create new product listing</p>
              </div>
            </div>
          </button>
          
          <button className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow text-left">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Moderate Reviews</h3>
                <p className="text-sm text-gray-600">Approve/reject reviews</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;