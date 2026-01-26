// frontend/src/pages/ShippingPolicy.jsx
import { Truck, Clock, Shield, Package, RefreshCw, MapPin } from 'lucide-react';
import AboutUs from './pages/AboutUs'
import FAQ from './pages/FAQ'
import PrivacyPolicy from './pages/PrivacyPolicy'
import ContactUs from './pages/ContactUs'
const ShippingPolicy = () => {
  const shippingInfo = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: 'Shipping Charges',
      content: 'Free shipping on all orders above ₹199. For orders below ₹199, a nominal shipping charge of ₹9 applies.',
      highlight: true
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Delivery Time',
      content: '7-14 business days. Some products may take longer depending on supplier location.'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Delivery Areas',
      content: 'We deliver across India including remote areas. International shipping available on request.'
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: 'Order Tracking',
      content: 'You will receive tracking information via email/SMS once your order is shipped.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Safe Delivery',
      content: 'All packages are securely packed and insured against damage during transit.'
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: 'Delivery Issues',
      content: 'Contact us within 48 hours if you face any delivery issues for immediate assistance.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Shipping Policy</h1>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 max-w-3xl">
            <div className="flex items-center mb-4">
              <Truck className="w-10 h-10 mr-4" />
              <div>
                <h2 className="text-2xl font-bold">Transparent & Affordable Shipping</h2>
                <p className="text-lg opacity-90">Know exactly what you're paying for</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-white/30 p-4 rounded-xl">
                <div className="text-3xl font-bold">₹199+</div>
                <div className="text-sm">FREE SHIPPING</div>
              </div>
              <div className="bg-white/30 p-4 rounded-xl">
                <div className="text-3xl font-bold">₹199↓</div>
                <div className="text-sm">ONLY ₹9 SHIPPING</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* Shipping Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {shippingInfo.map((item, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl shadow-md p-6 ${item.highlight ? 'ring-2 ring-green-500' : ''}`}
              >
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-full ${item.highlight ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'} flex items-center justify-center mr-4`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                </div>
                <p className="text-gray-600">{item.content}</p>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-8 text-center">Shipping FAQ</h3>
            
            <div className="space-y-6">
              <div className="border-b pb-6">
                <h4 className="text-lg font-semibold mb-2 flex items-center">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">Q</span>
                  Why does shipping take 7-14 days?
                </h4>
                <p className="text-gray-600 ml-9">
                  We work on a dropshipping model. Once you order, we process it with our suppliers who then ship directly to you. This eliminates warehouse costs but adds a few extra days for processing.
                </p>
              </div>

              <div className="border-b pb-6">
                <h4 className="text-lg font-semibold mb-2 flex items-center">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">Q</span>
                  Can I track my order?
                </h4>
                <p className="text-gray-600 ml-9">
                  Yes! Once your order is shipped, you'll receive tracking details via email and SMS. You can also track it from your "My Orders" page.
                </p>
              </div>

              <div className="border-b pb-6">
                <h4 className="text-lg font-semibold mb-2 flex items-center">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">Q</span>
                  What if my order is delayed?
                </h4>
                <p className="text-gray-600 ml-9">
                  Contact us immediately. We'll check with the supplier and keep you updated. In case of unreasonable delays, we offer full refunds.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2 flex items-center">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">Q</span>
                  Do you ship to remote locations?
                </h4>
                <p className="text-gray-600 ml-9">
                  Yes, we ship across India including remote areas. Additional delivery time may apply for certain locations.
                </p>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <h4 className="text-xl font-bold text-blue-800 mb-4">Important Notes:</h4>
            <ul className="space-y-3 text-blue-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                Shipping time is calculated in business days (Monday-Friday)
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                Delivery dates are estimates and not guaranteed
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                Please ensure your delivery address is correct during checkout
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                For urgent deliveries, contact us before ordering
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;