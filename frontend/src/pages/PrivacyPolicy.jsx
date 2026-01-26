// frontend/src/pages/PrivacyPolicy.jsx
import { Shield, Lock, Eye, Database, UserCheck, FileText } from 'lucide-react';
import AboutUs from './pages/AboutUs'
import ShippingPolicy from './pages/ShippingPolicy'
import FAQ from './pages/FAQ'

import ContactUs from './pages/ContactUs'

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: <Database className="w-6 h-6" />,
      title: 'Information We Collect',
      content: [
        'Personal information (name, email, phone number)',
        'Shipping and billing addresses',
        'Order history and preferences',
        'Payment details (we only store transaction IDs, not UPI/bank details)',
        'Device and browser information for analytics'
      ]
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'How We Use Your Information',
      content: [
        'Process and fulfill your orders',
        'Communicate order status and updates',
        'Improve our products and services',
        'Send promotional offers (only with consent)',
        'Prevent fraud and ensure security'
      ]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Data Security',
      content: [
        'SSL encryption for all data transmission',
        'Regular security audits and updates',
        'Limited employee access to personal data',
        'Secure payment processing partners',
        'Regular data backup and protection'
      ]
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: 'Your Rights',
      content: [
        'Access your personal data',
        'Correct inaccurate information',
        'Request data deletion',
        'Opt-out of marketing communications',
        'Download your data in readable format'
      ]
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'Third-Party Sharing',
      content: [
        'Shipping partners (for delivery only)',
        'Payment processors (for transaction handling)',
        'Suppliers (for order fulfillment)',
        'Analytics services (anonymous data only)',
        'Legal authorities (when required by law)'
      ]
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Cookies & Tracking',
      content: [
        'Essential cookies for website functionality',
        'Analytics cookies to improve user experience',
        'Marketing cookies (only with consent)',
        'Option to disable cookies in browser settings',
        'No cross-site tracking or data selling'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-6">
            <Shield className="w-12 h-12 mr-4" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
              <p className="text-xl opacity-90 mt-2">Last Updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
          <div className="max-w-3xl bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <p className="text-lg">
              We are committed to protecting your privacy. This policy explains how we collect, 
              use, and safeguard your information when you use our services.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {sections.map((section, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center mr-4">
                    {section.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{section.title}</h3>
                </div>
                <ul className="space-y-2">
                  {section.content.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Policy Details */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Detailed Policy Information</h3>
            
            <div className="space-y-8">
              <div>
                <h4 className="text-xl font-semibold mb-3 text-gray-800">Data Retention</h4>
                <p className="text-gray-600">
                  We retain your personal data only for as long as necessary to fulfill the purposes 
                  for which it was collected, including for the purposes of satisfying any legal, 
                  accounting, or reporting requirements. Typically, order data is retained for 5 years 
                  for tax and warranty purposes.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-3 text-gray-800">Children's Privacy</h4>
                <p className="text-gray-600">
                  Our services are not intended for individuals under the age of 16. We do not 
                  knowingly collect personal information from children. If you are a parent or guardian 
                  and believe your child has provided us with personal information, please contact us.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-3 text-gray-800">International Transfers</h4>
                <p className="text-gray-600">
                  Your information may be transferred to and processed in countries other than India, 
                  where our suppliers are located. We ensure appropriate safeguards are in place to 
                  protect your data in accordance with this privacy policy.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-3 text-gray-800">Policy Updates</h4>
                <p className="text-gray-600">
                  We may update this privacy policy from time to time. We will notify you of any 
                  changes by posting the new policy on this page and updating the "Last Updated" date. 
                  You are advised to review this policy periodically for any changes.
                </p>
              </div>
            </div>
          </div>

          {/* Contact for Privacy */}
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-8">
            <h4 className="text-2xl font-bold text-blue-800 mb-4">Contact Us About Privacy</h4>
            <p className="text-blue-700 mb-6">
              If you have any questions about this Privacy Policy or wish to exercise your rights, 
              please contact our Data Protection Officer:
            </p>
            <div className="space-y-4">
              <div>
                <strong className="text-blue-800">Email:</strong>
                <a href="mailto:privacy@tvmerch.com" className="text-blue-600 ml-2 hover:underline">
                  privacy@tvmerch.com
                </a>
              </div>
              <div>
                <strong className="text-blue-800">WhatsApp:</strong>
                <a 
                  href="https://wa.me/919999999999" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 ml-2 hover:underline"
                >
                  +91 99999 99999
                </a>
              </div>
              <div>
                <strong className="text-blue-800">Response Time:</strong>
                <span className="text-blue-600 ml-2">Within 48 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;