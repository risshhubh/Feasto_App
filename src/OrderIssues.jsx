import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  AlertTriangle, 
  Clock, 
  Truck, 
  CreditCard, 
  Package, 
  Phone, 
  Mail, 
  MessageCircle,
  CheckCircle,
  XCircle,
  RefreshCw,
  UserCheck
} from 'lucide-react';

const OrderIssues = () => {
  const [selectedIssue, setSelectedIssue] = useState(null);

  const commonIssues = [
    {
      id: 'delivery-delayed',
      title: 'Delivery is Delayed',
      icon: <Clock className="w-8 h-8" />,
      description: 'Your order is taking longer than expected',
      solutions: [
        'Check your order tracking for real-time updates',
        'Contact the restaurant directly for status updates',
        'Call our support team if delay exceeds 30 minutes',
        'Consider weather or traffic conditions in your area'
      ],
      contactInfo: {
        phone: '+1 (555) 123-4567',
        email: 'delivery@feasto.com',
        responseTime: 'Within 15 minutes'
      }
    },
    {
      id: 'wrong-order',
      title: 'Wrong Order Received',
      icon: <Package className="w-8 h-8" />,
      description: 'You received items you didn\'t order',
      solutions: [
        'Do not consume the incorrect items',
        'Take photos of the wrong order',
        'Contact us immediately for replacement',
        'We\'ll arrange for correct order delivery'
      ],
      contactInfo: {
        phone: '+1 (555) 123-4567',
        email: 'orders@feasto.com',
        responseTime: 'Within 10 minutes'
      }
    },
    {
      id: 'missing-items',
      title: 'Missing Items',
      icon: <Package className="w-8 h-8" />,
      description: 'Some items from your order are missing',
      solutions: [
        'Check your order receipt against delivered items',
        'Contact us with your order number',
        'We\'ll arrange for missing items delivery',
        'Full refund for missing items if replacement unavailable'
      ],
      contactInfo: {
        phone: '+1 (555) 123-4567',
        email: 'orders@feasto.com',
        responseTime: 'Within 10 minutes'
      }
    },
    {
      id: 'cold-food',
      title: 'Food Arrived Cold',
      icon: <AlertTriangle className="w-8 h-8" />,
      description: 'Your food arrived at incorrect temperature',
      solutions: [
        'Do not consume cold food for safety',
        'Take photos showing temperature issues',
        'Contact us immediately for replacement',
        'We\'ll ensure hot food delivery'
      ],
      contactInfo: {
        phone: '+1 (555) 123-4567',
        email: 'quality@feasto.com',
        responseTime: 'Within 5 minutes'
      }
    },
    {
      id: 'payment-issue',
      title: 'Payment Problem',
      icon: <CreditCard className="w-8 h-8" />,
      description: 'Issues with payment processing or billing',
      solutions: [
        'Check your payment method is valid',
        'Verify sufficient funds in your account',
        'Try alternative payment method',
        'Contact us for payment assistance'
      ],
      contactInfo: {
        phone: '+1 (555) 123-4567',
        email: 'billing@feasto.com',
        responseTime: 'Within 20 minutes'
      }
    },
    {
      id: 'damaged-package',
      title: 'Damaged Package',
      icon: <AlertTriangle className="w-8 h-8" />,
      description: 'Food packaging is damaged or leaking',
      solutions: [
        'Do not consume food from damaged packaging',
        'Take photos of the damage',
        'Contact us immediately for replacement',
        'We\'ll ensure safe food delivery'
      ],
      contactInfo: {
        phone: '+1 (555) 123-4567',
        email: 'quality@feasto.com',
        responseTime: 'Within 5 minutes'
      }
    }
  ];

  const issueStatuses = [
    {
      status: 'Order Confirmed',
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      description: 'Your order has been received and confirmed'
    },
    {
      status: 'Preparing',
      icon: <RefreshCw className="w-5 h-5 text-yellow-500" />,
      description: 'The restaurant is preparing your food'
    },
    {
      status: 'Out for Delivery',
      icon: <Truck className="w-5 h-5 text-blue-500" />,
      description: 'Your order is on its way to you'
    },
    {
      status: 'Delivered',
      icon: <UserCheck className="w-5 h-5 text-green-500" />,
      description: 'Your order has been delivered'
    },
    {
      status: 'Issue Reported',
      icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
      description: 'An issue has been reported with your order'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-28">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Order Issues</h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8">
            We're here to help resolve any issues with your order
          </p>
          <div className="flex justify-center space-x-4">
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Quick Resolution</span>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <section className="py-8 bg-red-50 border-b border-red-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-red-600 mb-2">Need Immediate Help?</h2>
                <p className="text-gray-600">Call our 24/7 support line for urgent issues</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-red-600">+1 (555) 123-4567</div>
                <div className="text-sm text-gray-500">Available 24/7</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Issues */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Common Order Issues</h2>
            <p className="text-gray-600">
              Select your issue to get immediate solutions and contact information
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commonIssues.map((issue) => (
              <div 
                key={issue.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedIssue(issue)}
              >
                <div className="text-red-500 mb-4">{issue.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{issue.title}</h3>
                <p className="text-gray-600 mb-4">{issue.description}</p>
                <button className="text-red-600 hover:text-red-700 font-medium">
                  Get Help →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Issue Details Modal */}
      {selectedIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-3">
                  <div className="text-red-500">{selectedIssue.icon}</div>
                  <h2 className="text-2xl font-bold">{selectedIssue.title}</h2>
                </div>
                <button 
                  onClick={() => setSelectedIssue(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              
              <p className="text-gray-600 mb-6">{selectedIssue.description}</p>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Solutions:</h3>
                <ul className="space-y-2">
                  {selectedIssue.solutions.map((solution, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Contact Information:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Phone className="w-4 h-4 text-red-500" />
                      <span className="font-medium">Phone:</span>
                    </div>
                    <p className="text-gray-700">{selectedIssue.contactInfo.phone}</p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Mail className="w-4 h-4 text-red-500" />
                      <span className="font-medium">Email:</span>
                    </div>
                    <p className="text-gray-700">{selectedIssue.contactInfo.email}</p>
                  </div>
                </div>
                <div className="mt-3 text-sm text-gray-600">
                  Expected response time: {selectedIssue.contactInfo.responseTime}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Status Guide */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Understanding Order Status</h2>
            <p className="text-gray-600">
              Track your order progress and know what each status means
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="space-y-6">
              {issueStatuses.map((status, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {status.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{status.status}</h3>
                    <p className="text-gray-600">{status.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Prevention Tips */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Preventing Order Issues</h2>
            <p className="text-gray-600">
              Follow these tips to ensure smooth order delivery
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-yellow-50">
              <CheckCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Verify Address</h3>
              <p className="text-gray-600">
                Double-check your delivery address before placing the order
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-orange-50">
              <Phone className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Keep Phone Handy</h3>
              <p className="text-gray-600">
                Ensure your phone is accessible for delivery updates
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-red-50">
              <Clock className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Check Timing</h3>
              <p className="text-gray-600">
                Order during restaurant operating hours for best service
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Multiple Ways to Contact Us</h2>
            <p className="text-gray-600">
              Choose the method that works best for you
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <Phone className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Phone Support</h3>
              <p className="text-gray-600 mb-4">24/7 available for urgent issues</p>
              <div className="text-2xl font-bold text-red-600">+1 (555) 123-4567</div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <Mail className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">For detailed issue reporting</p>
              <div className="text-lg font-semibold text-orange-600">orders@feasto.com</div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <MessageCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">Real-time assistance</p>
              <button className="bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition-colors">
                Start Chat
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">We're Here to Help!</h2>
          <p className="text-xl mb-8 opacity-90">
            Don't hesitate to reach out if you have any issues with your order. 
            Our customer support team is dedicated to resolving your concerns quickly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/help"
              className="inline-block bg-white text-red-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
            >
              Visit Help Center
            </Link>
            <a
              href="tel:+15551234567"
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-red-600 transition duration-300"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderIssues; 