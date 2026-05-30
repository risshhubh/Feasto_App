import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Users, Award, Heart } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-28">
      {/* Hero Section */}
      <div className="bg-[#FF6B35] text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">About Feasto</h1>
          <p className="text-xl md:text-2xl opacity-90">
            Connecting food lovers with the best restaurants since 2024
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              At Feasto, we believe that great food has the power to bring people together. 
              Our mission is to connect food lovers with the finest restaurants, making 
              every dining experience memorable and convenient.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-[#FF6B35]/10">
              <Heart className="w-12 h-12 text-[#FF6B35] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Passion for Food</h3>
              <p className="text-gray-600">
                We're passionate about connecting you with the best culinary experiences.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-[#FF8C42]/10">
              <Users className="w-12 h-12 text-[#FF8C42] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community First</h3>
              <p className="text-gray-600">
                Building a community of food lovers and supporting local restaurants.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-[#FF6B6B]/10">
              <Award className="w-12 h-12 text-[#FF6B6B] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
              <p className="text-gray-600">
                Partnering only with the highest quality restaurants and vendors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Feasto was born from a simple idea: making great food accessible to everyone. 
                What started as a small project has grown into a platform that connects 
                thousands of food lovers with amazing restaurants.
              </p>
              <p className="text-gray-600 mb-4">
                We understand that food is more than just sustenance—it's an experience, 
                a way to connect with others, and a celebration of culture and tradition. 
                That's why we're committed to bringing you the best dining experiences.
              </p>
              <p className="text-gray-600">
                Today, Feasto serves customers across multiple cities, partnering with 
                hundreds of restaurants to deliver exceptional food experiences right to your doorstep.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <img 
                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg" 
                alt="Feasto Team" 
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Feasto by the Numbers</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#FF6B35] mb-2">500+</div>
              <div className="text-gray-600">Restaurant Partners</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#FF8C42] mb-2">50K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#FF6B6B] mb-2">100K+</div>
              <div className="text-gray-600">Orders Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-500 mb-2">15+</div>
              <div className="text-gray-600">Cities Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Get in Touch</h2>
            <p className="text-gray-600">
              Have questions or feedback? We'd love to hear from you!
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow">
              <MapPin className="w-8 h-8 text-[#FF6B35] mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-600">
                123 Food Street<br />
                Culinary District<br />
                Foodie City, FC 12345
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow">
              <Phone className="w-8 h-8 text-[#FF8C42] mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600">
                +1 (555) 123-4567<br />
                Mon-Fri: 9AM-6PM
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow">
              <Mail className="w-8 h-8 text-[#FF6B6B] mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-gray-600">
                hello@feasto.com<br />
                support@feasto.com
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Food Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of food lovers and discover amazing restaurants near you.
          </p>
          <Link
            to="/"
            className="inline-block bg-white text-[#FF6B35] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
          >
            Explore Restaurants
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutUs; 