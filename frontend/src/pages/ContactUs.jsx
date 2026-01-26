// frontend/src/pages/ContactUs.jsx
import { MessageCircle, Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import AboutUs from './pages/AboutUs'
import ShippingPolicy from './pages/ShippingPolicy'
import FAQ from './pages/FAQ'
import PrivacyPolicy from './pages/PrivacyPolicy'
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const contactMethods = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'WhatsApp Chat',
      details: '+91 99999 99999',
      action: 'https://wa.me/919999999999',
      color: 'bg-green-100 text-green-600',
      buttonColor: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Support',
      details: 'support@tvmerch.com',
      action: 'mailto:support@tvmerch.com',
      color: 'bg-blue-100 text-blue-600',
      buttonColor: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone Support',
      details: '+91 99999 99999',
      action: 'tel:+919999999999',
      color: 'bg-purple-100 text-purple-600',
      buttonColor: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, connect to backend API
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Have questions? We're here to help! Choose your preferred way to connect with us.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Contact Methods */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Quick Connect</h3>
                <div className="space-y-6">
                  {contactMethods.map((method, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-3">
                        <div className={`w-12 h-12 ${method.color} rounded-lg flex items-center justify-center mr-4`}>
                          {method.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{method.title}</h4>
                          <p className="text-sm text-gray-600">{method.details}</p>
                        </div>
                      </div>
                      <a
                        href={method.action}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block w-full ${method.buttonColor} text-white text-center py-2 rounded-lg font-medium transition-colors`}
                      >
                        Connect Now
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Clock className="w-6 h-6 text-orange-600 mr-3" />
                  <h4 className="text-xl font-bold text-gray-800">Business Hours</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-semibold">10:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-semibold">10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-semibold">Closed</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick Help */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
                <div className="flex items-center mb-4">
                  <MessageCircle className="w-8 h-8 mr-3" />
                  <div>
                    <h4 className="text-xl font-bold">24/7 WhatsApp Support</h4>
                    <p className="opacity-90">For urgent order issues</p>
                  </div>
                </div>
                <a
                  href="https://wa.me/919999999999?text=Hello%20TV%20Merch%20Support%2C%20I%20need%20help%20with%20my%20order"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-white text-green-600 text-center py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors mt-4"
                >
                  Start WhatsApp Chat
                </a>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-8">
                  <Send className="w-8 h-8 text-blue-600 mr-4" />
                  <div>
                    <h3 className="text-3xl font-bold text-gray-800">Send Us a Message</h3>
                    <p className="text-gray-600">We'll get back to you within 24 hours</p>
                  </div>
                </div>

                {submitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                    <div>
                      <p className="font-semibold text-green-800">Message Sent Successfully!</p>
                      <p className="text-green-600 text-sm">We'll contact you soon.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+91 99999 99999"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select a subject</option>
                        <option value="order">Order Issue</option>
                        <option value="shipping">Shipping & Delivery</option>
                        <option value="payment">Payment Problem</option>
                        <option value="product">Product Question</option>
                        <option value="return">Return & Refund</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Please describe your issue or question in detail..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all"
                  >
                    Send Message
                  </button>
                </form>

                {/* Response Time Info */}
                <div className="mt-8 p-4 bg-blue-50 rounded-xl">
                  <p className="text-blue-700 text-sm">
                    <strong>Response Time:</strong> We typically respond within 1-2 hours during 
                    business hours. For faster assistance, use WhatsApp for immediate help.
                  </p>
                </div>
              </div>

              {/* FAQ Quick Links */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                <a
                  href="/shipping-policy"
                  className="bg-white p-4 rounded-xl shadow text-center hover:shadow-md transition-shadow"
                >
                  <div className="text-blue-600 font-semibold">Shipping Info</div>
                </a>
                <a
                  href="/faq"
                  className="bg-white p-4 rounded-xl shadow text-center hover:shadow-md transition-shadow"
                >
                  <div className="text-blue-600 font-semibold">View FAQ</div>
                </a>
                <a
                  href="/products"
                  className="bg-white p-4 rounded-xl shadow text-center hover:shadow-md transition-shadow"
                >
                  <div className="text-blue-600 font-semibold">Shop Now</div>
                </a>
                <a
                  href="/my-orders"
                  className="bg-white p-4 rounded-xl shadow text-center hover:shadow-md transition-shadow"
                >
                  <div className="text-blue-600 font-semibold">Track Order</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map/Address Section */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <MapPin className="w-8 h-8 text-red-600 mr-4" />
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Our Location</h3>
                <p className="text-gray-600">Based in Delhi, serving customers across India</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800">Registered Address</h4>
                    <p className="text-gray-600">
                      TV Merchandise Pvt. Ltd.<br />
                      123 E-commerce Street<br />
                      Delhi - 110001<br />
                      India
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">GST Number</h4>
                    <p className="text-gray-600">07AABCT1337L1ZX</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-200 rounded-xl h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Map integration available in production</p>
                  <p className="text-sm text-gray-400">(Add Google Maps API key)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;