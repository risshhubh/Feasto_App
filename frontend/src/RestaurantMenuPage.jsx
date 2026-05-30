// src/pages/RestaurantMenuPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { restaurantData } from '../restaurantData';
import { menuData } from '../menuData';
import { useCart } from '../CartContext';

const RestaurantMenuPage = () => {
  const { slug } = useParams();
  const restaurant = restaurantData.find(
    (r) => r.name.toLowerCase().replace(/\s+/g, '-') === slug
  );
  const menuItems = menuData[slug] || [];

  const { dispatch } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [addedItem, setAddedItem] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
    setAddedItem(item);
    setShowModal(true);
  };

  if (!restaurant) {
    return <div className="p-10 text-center text-2xl">Restaurant not found</div>;
  }

  return (
    <div className="relative min-h-screen pt-28 px-4 sm:px-6 lg:px-12 pb-16 bg-gradient-to-br from-[#FFFBF0] via-[#FFF8E1] to-[#FFF5E6]">
      {/* Subtle Background */}
      <div 
        className="absolute inset-0 opacity-15 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920')",
        }}
      ></div>
      <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-[1]"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="text-gray-600 text-sm mb-6">
          <Link to="/" className="hover:text-[#FF6B35] transition">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/all-restaurants" className="hover:text-[#FF6B35] transition">All Restaurants</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">{restaurant.name}</span>
        </nav>

        {/* Heading */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-800 mb-3">{restaurant.name}</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">{restaurant.description}</p>
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, idx) => {
            return (
              <div
                key={idx}
                className="group bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 overflow-hidden shadow-md hover:shadow-xl hover:border-[#FF6B35]/30 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.description}</p>

                  {/* Price + Rating */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold text-[#FF6B35]">₹{item.price}</span>
                    <span className="text-sm text-gray-500">⭐ {item.rating || '4.5'}</span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-[#FF6B35] hover:bg-[#FF8C42] text-white py-2.5 px-4 rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {showModal && addedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4">
          <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl w-full max-w-md text-center border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {addedItem.name} added to cart! 🎉
            </h2>
            <p className="text-gray-600 mb-6">You can continue browsing or go to your cart.</p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2.5 rounded-xl font-semibold transition-all"
              >
                Continue
              </button>
              <Link
                to="/checkout"
                className="bg-[#FF6B35] hover:bg-[#FF8C42] text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-md"
              >
                Go to Cart
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantMenuPage;
