// src/AllRestaurants.jsx

import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { restaurantData as allRestaurants } from './restaurantData';

const AllRestaurants = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <section
      className="relative py-20 px-4 sm:px-6 lg:px-8 min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920')",
      }}
    >
      {/* Background Blur Overlay */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-md z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-gray-600 text-sm mb-6 font-medium">
          <Link to="/" className="hover:underline text-blue-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">All Restaurants</span>
        </nav>

        <h2
          className="text-4xl sm:text-5xl font-bold text-center text-gray-800 mb-14 animate-fade-in"
          aria-label="All Restaurants heading"
        >
          All Restaurants
        </h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {allRestaurants.map((restaurant, index) => (
            <Link
              to={`/restaurant/${encodeURIComponent(restaurant.name)}`}
              key={index}
              className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition duration-300 border border-gray-100 group"
            >
              <div className="overflow-hidden">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-1">
                  {restaurant.name}
                </h3>
                <p className="text-gray-500 text-sm">{restaurant.cuisine}</p>
                {/* Categories badges */}
                <div className="mt-2 flex flex-wrap gap-2">
                  {restaurant.categories?.map((cat, i) => (
                    <span
                      key={i}
                      className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllRestaurants;
