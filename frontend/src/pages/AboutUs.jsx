// frontend/src/pages/AboutUs.jsx
import { Package, Shield, Truck, Users, Globe, Zap } from 'lucide-react';
import ShippingPolicy from './pages/ShippingPolicy'
import FAQ from './pages/FAQ'
import PrivacyPolicy from './pages/PrivacyPolicy'
import ContactUs from './pages/ContactUs'
const AboutUs = () => {
  const features = [
    {
      icon: <Package className="w-8 h-8" />,
      title: 'Curated Collection',
      description: 'We handpick the best TV merchandise from global suppliers'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Network',
      description: 'Direct partnerships with manufacturers worldwide'
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Direct Shipping',
      description: 'Products shipped directly to your doorstep'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Quality Assurance',
      description: 'Every product goes through quality checks'
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Browse & Select',
      description: 'Choose from our curated collection of TV merchandise'
    },
    {
      step: '02',
      title: 'Place Order',
      description: 'Order through our secure checkout system'
    },
    {
      step: '03',
      title: 'We Process',
      description: 'We order directly from our partner suppliers'
    },
    {
      step: '04',
      title: 'Direct Delivery',
      description: 'Product ships straight to you from the supplier'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            We're not a traditional store - we're your personal shopping assistant 
            for exclusive TV merchandise from around the world
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              How Our Dropshipping Model Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We've eliminated the middleman to bring you better prices and faster delivery
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {processSteps.map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Why Choose Our Model?
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Zap className="w-6 h-6 text-green-500 mr-3 mt-1" />
                    <div>
                      <span className="font-semibold">Lower Prices:</span>
                      <p className="text-gray-600">No warehouse costs = Better prices for you</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Users className="w-6 h-6 text-green-500 mr-3 mt-1" />
                    <div>
                      <span className="font-semibold">Wider Selection:</span>
                      <p className="text-gray-600">Access to global inventory without stocking</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="text-lg font-semibold mb-4">Our Promise</h4>
                <p className="text-gray-600">
                  While we don't physically stock products, we handle everything from 
                  supplier coordination to quality checks and customer support. You get 
                  the convenience of local shopping with global variety.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 hover:shadow-lg transition-shadow rounded-xl">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Shop Smart?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers enjoying our unique shopping model
          </p>
          <a
            href="/products"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Start Shopping Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;