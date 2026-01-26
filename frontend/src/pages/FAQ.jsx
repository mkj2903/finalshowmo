// frontend/src/pages/FAQ.jsx
import { ChevronDown, ChevronUp, HelpCircle, ShoppingBag, CreditCard, Package, RefreshCw, User } from 'lucide-react';
import { useState } from 'react';
import AboutUs from './pages/AboutUs'
import ShippingPolicy from './pages/ShippingPolicy'
import PrivacyPolicy from './pages/PrivacyPolicy'
import ContactUs from './pages/ContactUs'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqCategories = [
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      title: 'Ordering',
      faqs: [
        {
          q: 'How do I place an order?',
          a: 'Browse products, select size/quantity, add to cart, and proceed to checkout. You can pay via UPI for faster processing.'
        },
        {
          q: 'Can I modify or cancel my order?',
          a: 'Orders can be modified/cancelled within 1 hour of placement. Contact us immediately via WhatsApp for assistance.'
        },
        {
          q: 'Do you accept cash on delivery?',
          a: 'Currently we only accept UPI payments for faster order processing and better pricing.'
        }
      ]
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: 'Payments',
      faqs: [
        {
          q: 'What payment methods do you accept?',
          a: 'We accept UPI payments only (Google Pay, PhonePe, Paytm, etc.). Enter your 12-digit UTR after payment.'
        },
        {
          q: 'Is my payment information secure?',
          a: 'Yes! We use secure payment processing. We never store your UPI or bank details.'
        },
        {
          q: 'How do I know my payment was successful?',
          a: 'You will receive an order confirmation email. Admin will verify your UTR and update order status.'
        }
      ]
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: 'Shipping & Delivery',
      faqs: [
        {
          q: 'What are your shipping charges?',
          a: 'Free shipping on orders above ₹199. For orders below ₹199, shipping charge is only ₹9.'
        },
        {
          q: 'How long does delivery take?',
          a: 'Typically 7-14 business days. Some products may take longer as we ship directly from suppliers.'
        },
        {
          q: 'Can I track my order?',
          a: 'Yes! Tracking information will be sent via email/SMS once your order is shipped.'
        }
      ]
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: 'Returns & Refunds',
      faqs: [
        {
          q: 'What is your return policy?',
          a: 'We accept returns within 7 days of delivery if product is damaged, defective, or incorrect.'
        },
        {
          q: 'How long do refunds take?',
          a: 'Refunds are processed within 3-5 business days after we receive the returned item.'
        },
        {
          q: 'Who pays for return shipping?',
          a: 'We cover return shipping costs for damaged/defective items. For other returns, customer pays shipping.'
        }
      ]
    },
    {
      icon: <User className="w-6 h-6" />,
      title: 'Account & Support',
      faqs: [
        {
          q: 'How do I create an account?',
          a: 'Click "Login" and use Google Sign-In. No password needed - just use your Google account.'
        },
        {
          q: 'How can I contact customer support?',
          a: 'Click "Contact Us" page for WhatsApp support. We respond within 1 hour during business hours.'
        },
        {
          q: 'What are your support hours?',
          a: 'We\'re available 10 AM - 8 PM, Monday to Saturday. WhatsApp support is 24/7 for urgent issues.'
        }
      ]
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block p-4 bg-white/20 rounded-full mb-6">
            <HelpCircle className="w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Find quick answers to common questions about ordering, shipping, payments, and more
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for questions..."
              className="w-full p-4 pl-12 rounded-xl shadow-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <HelpCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          {faqCategories.map((category, catIndex) => (
            <div key={catIndex} className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mr-4">
                  {category.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{category.title}</h2>
              </div>

              <div className="space-y-4">
                {category.faqs.map((faq, faqIndex) => {
                  const index = `${catIndex}-${faqIndex}`;
                  const isOpen = openIndex === index;
                  
                  return (
                    <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50"
                      >
                        <span className="text-lg font-semibold text-gray-800">{faq.q}</span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-purple-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-6">
                          <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Still Have Questions */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Still Have Questions?</h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Can't find what you're looking for? Our team is ready to help you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Support
            </a>
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              WhatsApp Chat
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;