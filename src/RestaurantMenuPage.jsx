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
    <div
      className="relative min-h-screen pt-28 px-4 sm:px-6 lg:px-12 pb-16 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920')",
      }}
    >
      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-md z-0"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Breadcrumbs */}
        <nav className="text-gray-600 text-sm mb-6 font-medium">
          <Link to="/" className="hover:underline text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/all-restaurants" className="hover:underline text-blue-600">All Restaurants</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{restaurant.name}</span>
        </nav>

        {/* Heading */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-800">{restaurant.name}</h1>
          <p className="text-gray-600 mt-2 max-w-xl mx-auto">{restaurant.description}</p>
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {menuItems.map((item, idx) => {
            const gst = +(item.price * 0.05).toFixed(2);
            const total = +(item.price + gst).toFixed(2);

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-300 overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-4">
  <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
  <p className="text-sm text-gray-600 mt-1">{item.description}</p>

  {/* Price + Rating */}
  <div className="mt-3 flex justify-between text-sm text-gray-700 font-medium">
    <span>₹{item.price}</span>
    <span>⭐ {item.rating}</span>
  </div>

  <button
    onClick={() => handleAddToCart(item)}
    className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-semibold transition"
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-md text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {addedItem.name} added to cart!
            </h2>
            <p className="text-gray-500 mb-4">You can continue browsing or go to your cart.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Continue
              </button>
              <Link
                to="/checkout"
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
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
