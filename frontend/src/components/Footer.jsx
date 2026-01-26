import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Shield, Truck, HelpCircle, Info, MessageCircle, CreditCard, Package, Users } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Shop',
      links: [
        { name: 'All Products', path: '/products' },
        { name: 'Featured Products', path: '/products?featured=true' },
        { name: "Men's Collection", path: '/products?category=T-Shirts&gender=men' },
        { name: "Women's Collection", path: '/products?category=T-Shirts&gender=women' },
        { name: 'Mugs', path: '/products?category=Mugs' },
        { name: 'Accessories', path: '/products?category=Accessories' },
      ]
    },
    {
      title: 'Customer Service',
      links: [
        { name: 'My Orders', path: '/my-orders' },
        { name: 'Track Order', path: '/track-order' },
        { name: 'Shipping Policy', path: '/shipping-policy', icon: <Truck className="w-4 h-4 inline mr-1" /> },
        { name: 'Returns & Refunds', path: '/returns' },
        { name: 'FAQ', path: '/faq', icon: <HelpCircle className="w-4 h-4 inline mr-1" /> },
        { name: 'Contact Us', path: '/contact', icon: <MessageCircle className="w-4 h-4 inline mr-1" /> },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about', icon: <Info className="w-4 h-4 inline mr-1" /> },
        { name: 'Privacy Policy', path: '/privacy-policy', icon: <Shield className="w-4 h-4 inline mr-1" /> },
        { name: 'Terms & Conditions', path: '/terms' },
        { name: 'Blog', path: '/blog' },
        { name: 'Careers', path: '/careers' },
        { name: 'Affiliate Program', path: '/affiliate' },
      ]
    },
    {
      title: 'Payment Methods',
      content: (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <span className="text-green-600 font-bold text-sm">UPI</span>
            </div>
            <span className="text-gray-400">UPI Payments Only</span>
          </div>
          <p className="text-sm text-gray-400">
            We accept all UPI apps: Google Pay, PhonePe, Paytm, and more
          </p>
          <div className="pt-2">
            <p className="text-sm font-medium text-white mb-1">Shipping Info:</p>
            <p className="text-sm text-green-400">✓ Free shipping on ₹199+</p>
            <p className="text-sm text-blue-400">✓ ₹9 only below ₹199</p>
          </div>
        </div>
      )
    }
  ];

  return (
    <footer className="bg-gray-900 text-white mt-20">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-2xl">TV</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">TV Merchandise</h2>
                <p className="text-gray-400">Official Fan Store</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Your premier destination for exclusive TV show merchandise. We connect you directly 
              with global suppliers through our unique dropshipping model, offering authentic 
              products at unbeatable prices.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4 mb-6">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <YouTubeIcon className="w-5 h-5" />
              </a>
            </div>

            {/* Newsletter */}
            <div className="mb-6">
              <p className="text-sm font-medium mb-2">Subscribe to our newsletter</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Other Columns */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                {section.title}
              </h3>
              {section.links ? (
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        to={link.path} 
                        className="text-gray-400 hover:text-white transition-colors flex items-center"
                      >
                        {link.icon && link.icon}
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                section.content
              )}
            </div>
          ))}
        </div>

        {/* Contact Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-900/30 rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">24/7 Support</p>
              <a 
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-medium hover:text-green-400"
              >
                +91 99999 99999
              </a>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-900/30 rounded-full flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Email Us</p>
              <a href="mailto:support@tvmerch.com" className="text-white font-medium hover:text-blue-400">
                support@tvmerch.com
              </a>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-900/30 rounded-full flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Shipping Policy</p>
              <Link to="/shipping-policy" className="text-white font-medium hover:text-blue-400">
                ₹199+ Free | Below ₹199: ₹9 only
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-400">
                © {currentYear} TV Merchandise. All rights reserved.
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Dropshipping excellence • Serving customers across India
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-white text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm">
                Terms of Service
              </Link>
              <Link to="/shipping-policy" className="text-gray-400 hover:text-white text-sm">
                Shipping Policy
              </Link>
              <Link to="/refund-policy" className="text-gray-400 hover:text-white text-sm">
                Refund Policy
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-white text-sm">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-gray-800 py-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center">
              <Shield className="w-8 h-8 text-green-400 mb-2" />
              <span className="text-sm font-medium">Secure Payments</span>
              <span className="text-xs text-gray-400">UPI Only</span>
            </div>
            <div className="flex flex-col items-center">
              <Truck className="w-8 h-8 text-blue-400 mb-2" />
              <span className="text-sm font-medium">Free Shipping</span>
              <span className="text-xs text-gray-400">On ₹199+</span>
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-8 h-8 text-purple-400 mb-2" />
              <span className="text-sm font-medium">24/7 Support</span>
              <span className="text-xs text-gray-400">WhatsApp</span>
            </div>
            <div className="flex flex-col items-center">
              <Package className="w-8 h-8 text-orange-400 mb-2" />
              <span className="text-sm font-medium">Easy Returns</span>
              <span className="text-xs text-gray-400">7 Days Policy</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// YouTube Icon component (since it's not in lucide-react by default)
const YouTubeIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
  </svg>
);

export default Footer;