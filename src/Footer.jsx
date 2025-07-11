// src/Footer.jsx
import React from 'react';
import {
  Facebook,
  Twitter,
  Instagram
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-400 via-gray-950 to-gray-950 text-white pt-12 pb-8 px-4 sm:px-6 lg:px-8 mt-16 rounded-t-3xl shadow-inner">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Company Info */}
        <div>
          <h4 className="text-3xl font-bold text-yellow-400 mb-4">Feasto 🍴</h4>
          <p className="text-gray-400 text-sm leading-relaxed">
            Discover, order, and enjoy meals from top restaurants across the city. Feasto connects you to your cravings instantly.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-yellow-400 transition">About Us</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">How It Works</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Support</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Connect With Us</h4>
          <p className="text-sm text-gray-400 mb-2">Email: hello@feasto.com</p>
          <p className="text-sm text-gray-400 mb-4">Phone: +91 98765 43210</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-yellow-400"><Facebook size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-yellow-400"><Twitter size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-yellow-400"><Instagram size={20} /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} <span className="text-white font-medium">Feasto</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
