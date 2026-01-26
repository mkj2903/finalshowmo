import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { orderAPI } from '../utils/api'
import { 
  Package, CheckCircle, Clock, Truck, Home, Mail, Phone, 
  MapPin, Calendar, AlertCircle, Search, Copy, Filter, Eye,
  ChevronRight, CheckSquare, XCircle, RefreshCw, ExternalLink
} from 'lucide-react'

export default function MyOrders() {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [filter, setFilter] = useState('all') // all, pending, approved, rejected, delivered
  
  const statusIcons = {
    'payment_pending': { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Payment Pending' },
    'processing': { icon: Package, color: 'text-blue-600', bg: 'bg-blue-100', label: 'Processing' },
    'shipped': { icon: Truck, color: 'text-purple-600', bg: 'bg-purple-100', label: 'Shipped' },
    'delivered': { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', label: 'Delivered' },
    'cancelled': { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100', label: 'Cancelled' }
  }

  const paymentStatusIcons = {
    'pending': { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Pending' },
    'verified': { icon: CheckSquare, color: 'text-green-600', bg: 'bg-green-100', label: 'Approved' },
    'failed': { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100', label: 'Rejected' }
  }

  const fetchMyOrders = async () => {
    if (!currentUser?.email) {
      setError('Please login to view your orders')
      return
    }

    setLoading(true)
    setError('')
    setSelectedOrder(null)

    try {
      // Since we don't have getUserOrders API, we'll fetch all orders and filter by email
      // OR you can create backend endpoint: GET /api/orders/user/:email
      const response = await orderAPI.getAllOrders()
      
      if (response.success) {
        // Filter orders by current user's email
        const myOrders = response.orders.filter(order => 
          order.userEmail === currentUser.email
        )
        setOrders(myOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
      } else {
        setError('Failed to load orders')
      }
    } catch (err) {
      setError('Error loading orders. Please try again.')
      console.error('Fetch orders error:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await orderAPI.getOrderById(orderId)
      if (response.success) {
        setSelectedOrder(response.order)
      }
    } catch (error) {
      console.error('Error fetching order details:', error)
    }
  }

  useEffect(() => {
    if (currentUser) {
      fetchMyOrders()
    }
  }, [currentUser])

  useEffect(() => {
    // Auto-refresh orders every 30 seconds
    if (currentUser && !selectedOrder) {
      const interval = setInterval(fetchMyOrders, 30000)
      return () => clearInterval(interval)
    }
  }, [currentUser, selectedOrder])

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const getFilteredOrders = () => {
    if (filter === 'all') return orders
    
    if (filter === 'pending') {
      return orders.filter(order => 
        order.status === 'payment_pending' || 
        order.paymentStatus === 'pending'
      )
    }
    
    if (filter === 'approved') {
      return orders.filter(order => 
        order.paymentStatus === 'verified'
      )
    }
    
    if (filter === 'rejected') {
      return orders.filter(order => 
        order.paymentStatus === 'failed' || 
        order.status === 'cancelled'
      )
    }
    
    if (filter === 'delivered') {
      return orders.filter(order => 
        order.status === 'delivered'
      )
    }
    
    return orders
  }

  const filteredOrders = getFilteredOrders()

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-4">Login Required</h1>
        <p className="text-gray-600 mb-6">Please login to view your orders</p>
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Go to Login
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
            <p className="text-gray-600">
              View all your orders and track their status
            </p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <button
              onClick={fetchMyOrders}
              disabled={loading}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium flex items-center"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center"
            >
              <Package className="h-4 w-4 mr-2" />
              Shop More
            </button>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <p className="text-sm text-gray-600">Total Orders</p>
            <p className="text-2xl font-bold mt-1">{orders.length}</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-yellow-600 mt-1">
              {orders.filter(o => o.status === 'payment_pending' || o.paymentStatus === 'pending').length}
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <p className="text-sm text-gray-600">Approved</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {orders.filter(o => o.paymentStatus === 'verified').length}
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <p className="text-sm text-gray-600">Delivered</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {orders.filter(o => o.status === 'delivered').length}
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            All Orders
          </button>
          
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg font-medium ${filter === 'pending' ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Payment Pending
          </button>
          
          <button
            onClick={() => setFilter('approved')}
            className={`px-4 py-2 rounded-lg font-medium ${filter === 'approved' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Approved
          </button>
          
          <button
            onClick={() => setFilter('rejected')}
            className={`px-4 py-2 rounded-lg font-medium ${filter === 'rejected' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Rejected/Cancelled
          </button>
          
          <button
            onClick={() => setFilter('delivered')}
            className={`px-4 py-2 rounded-lg font-medium ${filter === 'delivered' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Delivered
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Orders List */}
      <div className="bg-white rounded-xl border overflow-hidden">
        {loading ? (
          <div className="py-16 text-center">
            <RefreshCw className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading your orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="py-16 text-center">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No orders found</h3>
            <p className="text-gray-600 mb-6">
              {filter === 'all' 
                ? 'You haven\'t placed any orders yet.' 
                : `No ${filter} orders found.`}
            </p>
            <button
              onClick={() => navigate('/products')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="divide-y">
            {filteredOrders.map((order) => {
              const statusIcon = statusIcons[order.status] || statusIcons.payment_pending
              const paymentIcon = paymentStatusIcons[order.paymentStatus] || paymentStatusIcons.pending
              const StatusIcon = statusIcon.icon
              const PaymentIcon = paymentIcon.icon
              
              return (
                <div 
                  key={order._id} 
                  className={`p-6 hover:bg-gray-50 cursor-pointer transition-colors ${selectedOrder?._id === order._id ? 'bg-blue-50' : ''}`}
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg ${statusIcon.bg} ${statusIcon.color}`}>
                        <StatusIcon className="h-6 w-6" />
                      </div>
                      
                      <div>
                        <div className="flex items-center flex-wrap gap-2 mb-2">
                          <h3 className="text-lg font-semibold">Order #{order.orderId || order._id.slice(-6)}</h3>
                          <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusIcon.bg} ${statusIcon.color}`}>
                              {statusIcon.label}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${paymentIcon.bg} ${paymentIcon.color}`}>
                              {paymentIcon.label}
                            </span>
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-600 space-y-1">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>Placed on {formatDate(order.createdAt)}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <Package className="h-4 w-4 mr-2" />
                            <span>
                              {order.items?.length || 0} item{order.items?.length !== 1 ? 's' : ''} • 
                              Total: {formatCurrency(order.totalAmount)}
                            </span>
                          </div>
                          
                          {order.utrNumber && (
                            <div className="flex items-center">
                              <div className="bg-gray-100 px-2 py-1 rounded text-xs font-mono mr-2">
                                UTR: {order.utrNumber}
                              </div>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation()
                                  copyToClipboard(order.utrNumber)
                                }}
                                className="text-blue-600 hover:text-blue-700"
                              >
                                <Copy className="h-3 w-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0 flex items-center space-x-3">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          {formatCurrency(order.totalAmount)}
                        </div>
                        <div className="text-sm text-gray-600">
                          {order.items?.reduce((sum, item) => sum + item.quantity, 0)} items
                        </div>
                      </div>
                      
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  
                  {/* Order Items Preview */}
                  <div className="mt-4 pl-16">
                    <div className="flex flex-wrap gap-3">
                      {order.items?.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                          <div className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center">
                            {item.image ? (
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-full h-full object-cover rounded"
                              />
                            ) : (
                              <Package className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium">{item.name}</p>
                            <p className="text-xs text-gray-600">
                              Qty: {item.quantity} • {formatCurrency(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      ))}
                      
                      {order.items?.length > 3 && (
                        <div className="bg-gray-50 px-4 py-2 rounded-lg flex items-center">
                          <span className="text-sm text-gray-600">
                            +{order.items.length - 3} more items
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Order Details</h2>
                <p className="text-gray-600">#{selectedOrder.orderId || selectedOrder._id.slice(-6)}</p>
              </div>
              
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Order Info */}
                <div>
                  {/* Status */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Order Status</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-lg mr-3 ${statusIcons[selectedOrder.status]?.bg || 'bg-gray-100'}`}>
                            {(() => {
                              const Icon = statusIcons[selectedOrder.status]?.icon || Package
                              return <Icon className={`h-5 w-5 ${statusIcons[selectedOrder.status]?.color || 'text-gray-600'}`} />
                            })()}
                          </div>
                          <div>
                            <p className="font-medium">Order Status</p>
                            <p className="text-sm text-gray-600">
                              {statusIcons[selectedOrder.status]?.label || selectedOrder.status}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Updated</p>
                          <p className="font-medium">
                            {selectedOrder.updatedAt ? formatDate(selectedOrder.updatedAt) : formatDate(selectedOrder.createdAt)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-lg mr-3 ${paymentStatusIcons[selectedOrder.paymentStatus]?.bg || 'bg-gray-100'}`}>
                            {(() => {
                              const Icon = paymentStatusIcons[selectedOrder.paymentStatus]?.icon || Clock
                              return <Icon className={`h-5 w-5 ${paymentStatusIcons[selectedOrder.paymentStatus]?.color || 'text-gray-600'}`} />
                            })()}
                          </div>
                          <div>
                            <p className="font-medium">Payment Status</p>
                            <p className="text-sm text-gray-600">
                              {paymentStatusIcons[selectedOrder.paymentStatus]?.label || selectedOrder.paymentStatus}
                            </p>
                          </div>
                        </div>
                        {selectedOrder.utrNumber && (
                          <div className="text-right">
                            <p className="text-sm text-gray-600">UTR</p>
                            <div className="flex items-center">
                              <code className="font-mono text-sm mr-2">{selectedOrder.utrNumber}</code>
                              <button 
                                onClick={() => copyToClipboard(selectedOrder.utrNumber)}
                                className="text-blue-600 hover:text-blue-700"
                              >
                                <Copy className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Items */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Order Items</h3>
                    <div className="space-y-3">
                      {selectedOrder.items?.map((item, idx) => (
                        <div key={idx} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0">
                            {item.image ? (
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <Package className="h-8 w-8 text-gray-400" />
                            )}
                          </div>
                          <div className="ml-4 flex-grow">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">
                              Size: {item.size || 'One Size'} • Qty: {item.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{formatCurrency(item.price)}</p>
                            <p className="text-sm text-gray-600">
                              Total: {formatCurrency(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Right Column - Shipping & Payment */}
                <div>
                  {/* Shipping Address */}
                  <div className="mb-6">
                    <div className="flex items-center mb-3">
                      <MapPin className="h-5 w-5 text-gray-600 mr-2" />
                      <h3 className="text-lg font-semibold">Shipping Address</h3>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium mb-2">{selectedOrder.shippingAddress?.fullName}</p>
                      <p className="text-gray-600">
                        {selectedOrder.shippingAddress?.address}
                      </p>
                      <p className="text-gray-600">
                        {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} - {selectedOrder.shippingAddress?.pincode}
                      </p>
                      <div className="mt-3 space-y-1">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-gray-700">{selectedOrder.shippingAddress?.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-gray-700">{selectedOrder.shippingAddress?.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Order Summary */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span>{formatCurrency(selectedOrder.totalAmount)}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Method</span>
                        <span className="font-medium">{selectedOrder.paymentMethod || 'UPI'}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">Order Date</span>
                        <span>{formatDate(selectedOrder.createdAt)}</span>
                      </div>
                      
                      <div className="pt-3 border-t">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total Amount</span>
                          <span className="text-blue-600">{formatCurrency(selectedOrder.totalAmount)}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        onClick={() => copyToClipboard(selectedOrder.orderId || selectedOrder._id)}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium flex items-center"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Order ID
                      </button>
                      
                      <button
                        onClick={() => {
                          // Share order link
                          const orderUrl = `${window.location.origin}/track-order/${selectedOrder.orderId || selectedOrder._id}`
                          navigator.clipboard.writeText(orderUrl)
                          alert('Order link copied!')
                        }}
                        className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg font-medium flex items-center"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Share Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}