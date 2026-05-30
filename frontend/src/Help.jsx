import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  ChevronDown, 
  ChevronUp,
  ShoppingCart,
  CreditCard,
  Truck,
  User,
  Settings,
  Shield
} from 'lucide-react';

const Help = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How do I place an order?",
      answer: "Browse restaurants, select your favorite dishes, add them to cart, and proceed to checkout. You can pay using various payment methods including credit cards, digital wallets, and cash on delivery."
    },
    {
      id: 2,
      question: "What payment methods do you accept?",
      answer: "We accept credit/debit cards, digital wallets (PayPal, Apple Pay, Google Pay), and cash on delivery. All online payments are secured with SSL encryption."
    },
    {
      id: 3,
      question: "How long does delivery take?",
      answer: "Delivery times vary by restaurant and location. Typically, orders are delivered within 30-45 minutes. You can track your order in real-time through our app."
    },
    {
      id: 4,
      question: "Can I cancel my order?",
      answer: "You can cancel your order within 5 minutes of placing it. After that, please contact our customer support team for assistance."
    },
    {
      id: 5,
      question: "What if my food arrives cold or damaged?",
      answer: "If your food arrives in poor condition, please contact us immediately. We'll either replace your order or provide a full refund."
    },
    {
      id: 6,
      question: "Do you offer refunds?",
      answer: "Yes, we offer refunds for orders that arrive damaged, incorrect, or in poor condition. Refunds are processed within 3-5 business days."
    },
    {
      id: 7,
      question: "How do I track my order?",
      answer: "Once your order is confirmed, you'll receive a tracking link. You can also track your order through your account dashboard."
    },
    {
      id: 8,
      question: "Is there a minimum order amount?",
      answer: "Minimum order amounts vary by restaurant. You'll see the minimum order amount displayed on each restaurant's page."
    }
  ];

  const helpCategories = [
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: "Ordering",
      description: "Learn how to place and manage orders",
      link: "#ordering"
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Payments",
      description: "Payment methods and billing information",
      link: "#payments"
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Delivery",
      description: "Delivery times and tracking",
      link: "#delivery"
    },
    {
      icon: <User className="w-8 h-8" />,
      title: "Account",
      description: "Manage your account and preferences",
      link: "#account"
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Technical",
      description: "App and website troubleshooting",
      link: "#technical"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Safety",
      description: "Food safety and hygiene standards",
      link: "#safety"
    }
  ];

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28">
      {/* Hero Section */}
      <div className="bg-[#FF6B35] text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Help Center</h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8">
            Find answers to your questions and get the support you need
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help articles..."
                className="w-full px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="absolute right-2 top-2 p-2 bg-[#FF6B35] rounded-full hover:bg-[#FF8C42] transition-colors">
                <Search className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Contact */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-[#FF6B35]/10">
              <Phone className="w-12 h-12 text-[#FF6B35] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600 mb-2">+1 (555) 123-4567</p>
              <p className="text-sm text-gray-500">24/7 Support</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-[#FF8C42]/10">
              <Mail className="w-12 h-12 text-[#FF8C42] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-gray-600 mb-2">support@feasto.com</p>
              <p className="text-sm text-gray-500">Response within 2 hours</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-[#FF6B6B]/10">
              <MessageCircle className="w-12 h-12 text-[#FF6B6B] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-2">Chat with us online</p>
              <p className="text-sm text-gray-500">Available 9AM-9PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How Can We Help?</h2>
            <p className="text-gray-600">
              Choose a category to find the help you need
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpCategories.map((category, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-[#FF6B35] mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <Link 
                  to={category.link}
                  className="text-[#FF6B35] hover:text-[#FF8C42] font-medium"
                >
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">
              Find quick answers to common questions
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-800">{faq.question}</span>
                  {openFaq === faq.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {openFaq === faq.id && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Still Need Help?</h2>
            <p className="text-gray-600">
              Can't find what you're looking for? Send us a message and we'll get back to you.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400">
                  <option>Select a subject</option>
                  <option>Order Issue</option>
                  <option>Payment Problem</option>
                  <option>Delivery Issue</option>
                  <option>Account Problem</option>
                  <option>Technical Issue</option>
                  <option>Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Describe your issue or question..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-[#FF6B35] hover:bg-[#FF8C42] text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Customer Support Hours</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-gray-50">
              <Clock className="w-12 h-12 text-[#FF6B35] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Phone Support</h3>
              <p className="text-gray-600">24/7 Available</p>
            </div>
            <div className="p-6 rounded-lg bg-gray-50">
              <Clock className="w-12 h-12 text-[#FF8C42] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
              <p className="text-gray-600">9:00 AM - 9:00 PM</p>
            </div>
            <div className="p-6 rounded-lg bg-gray-50">
              <Clock className="w-12 h-12 text-[#FF6B6B] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email Support</h3>
              <p className="text-gray-600">Response within 2 hours</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Help; 