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
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-br from-[#FFFBF0] via-[#FFF8E1] to-[#FFF5E6]">
      {/* Subtle Background */}
      <div 
        className="absolute inset-0 opacity-15 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920')",
        }}
      ></div>
      <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-[1]"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-gray-600 text-sm mb-8">
          <Link to="/" className="hover:text-[#FF6B35] transition">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">All Restaurants</span>
        </nav>

        <h2 className="text-4xl sm:text-5xl font-serif font-bold text-center text-gray-800 mb-12">
          All Restaurants
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allRestaurants.map((restaurant, index) => (
            <Link
              to={`/restaurant/${restaurant.name.toLowerCase().replace(/\s+/g, '-')}`}
              key={index}
              className="group bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 border border-gray-200/50 hover:border-[#FF6B35]/30"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-[#FF6B35] transition-colors">
                  {restaurant.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{restaurant.cuisine}</p>
                {/* Categories badges */}
                {restaurant.categories && restaurant.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {restaurant.categories.map((cat, i) => (
                      <span
                        key={i}
                        className="text-xs bg-[#FF6B35]/10 text-[#FF6B35] px-2.5 py-1 rounded-full font-medium border border-[#FF6B35]/20"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllRestaurants;
