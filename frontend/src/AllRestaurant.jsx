// src/AllRestaurants.jsx

import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { restaurantData as allRestaurants } from './restaurantData';
import { Star, Clock, Sparkles, Filter, Check } from 'lucide-react';

const categories = [
  { name: 'All', icon: '🍽️' },
  { name: 'North Indian', icon: '🥘' },
  { name: 'South Indian', icon: '🫓' },
  { name: 'Chinese', icon: '🥢' },
  { name: 'Italian', icon: '🍕' },
  { name: 'American', icon: '🍔' },
  { name: 'Japanese', icon: '🍣' },
  { name: 'Mexican', icon: '🌮' },
  { name: 'Healthy & Salads', icon: '🥗' },
  { name: 'Desserts & Bakery', icon: '🍰' },
  { name: 'Street Food', icon: '🥙' }
];

const AllRestaurants = () => {
  const location = useLocation();
  
  // Filter & Sort States
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [sortBy, setSortBy] = useState('relevance');
  const [filterPureVeg, setFilterPureVeg] = useState(false);
  const [filterTopRated, setFilterTopRated] = useState(false);
  const [filterFastDelivery, setFilterFastDelivery] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Apply Filters & Sorting
  let processedRestaurants = [...allRestaurants];

  // 1. Cuisine Filter
  if (selectedCuisine !== 'All') {
    processedRestaurants = processedRestaurants.filter(
      (r) => r.cuisine === selectedCuisine
    );
  }

  // 2. Search Query
  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase();
    processedRestaurants = processedRestaurants.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.cuisine.toLowerCase().includes(q) ||
        r.categories.some((c) => c.toLowerCase().includes(q))
    );
  }

  // 3. Veg Filter
  if (filterPureVeg) {
    processedRestaurants = processedRestaurants.filter((r) => r.pureVeg);
  }

  // 4. Rating Filter (4.0+)
  if (filterTopRated) {
    processedRestaurants = processedRestaurants.filter((r) => r.rating >= 4.4);
  }

  // 5. Fast Delivery (under 30 mins)
  if (filterFastDelivery) {
    processedRestaurants = processedRestaurants.filter((r) => r.deliveryTime <= 30);
  }

  // 6. Sorting
  if (sortBy === 'rating') {
    processedRestaurants.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'speed') {
    processedRestaurants.sort((a, b) => a.deliveryTime - b.deliveryTime);
  } else if (sortBy === 'costLow') {
    processedRestaurants.sort((a, b) => a.costForTwo - b.costForTwo);
  } else if (sortBy === 'costHigh') {
    processedRestaurants.sort((a, b) => b.costForTwo - a.costForTwo);
  }

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-br from-[#FFFBF0] via-[#FFF8E1] to-[#FFF5E6]">
      {/* Background Graphic */}
      <div 
        className="absolute inset-0 opacity-10 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg')",
        }}
      ></div>
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-[1]"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-gray-600 text-sm mb-6">
          <Link to="/" className="hover:text-[#FF6B35] transition">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">All Restaurants</span>
        </nav>

        {/* Heading */}
        <div className="mb-10">
          <h2 className="text-4xl sm:text-5xl font-serif font-black text-gray-800 mb-4 flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-[#FF6B35]" />
            Discover Restaurants
          </h2>
          <p className="text-gray-600 text-lg">Explore {allRestaurants.length} premium food spots delivering delicious meals right to your doorstep.</p>
        </div>

        {/* Horizontal Category / Cuisine Bar */}
        <div className="mb-8">
          <h3 className="text-sm font-extrabold text-gray-400 uppercase tracking-widest mb-4">What's on your mind?</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCuisine(cat.name)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-extrabold whitespace-nowrap shadow-sm border transition-all duration-300 ${
                  selectedCuisine === cat.name
                    ? 'bg-[#FF6B35] text-white border-[#FF6B35] scale-105 shadow-md shadow-[#FF6B35]/20'
                    : 'bg-white/70 hover:bg-white text-gray-700 border-gray-200/50 hover:border-gray-300'
                }`}
              >
                <span className="text-lg">{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Search, Sort and Filter Toolbar */}
        <div className="bg-white/60 backdrop-blur-md rounded-3xl border border-white/40 p-6 shadow-md mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          
          {/* Search Input */}
          <div className="relative flex-grow max-w-md">
            <input
              type="text"
              placeholder="Search by restaurant name or cuisine..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] bg-white transition-all text-sm font-semibold"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Quick Filters & Sorting */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Pure Veg */}
            <button
              onClick={() => setFilterPureVeg(!filterPureVeg)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-black transition-all ${
                filterPureVeg
                  ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm'
                  : 'bg-white/80 hover:bg-white text-gray-700 border-gray-200'
              }`}
            >
              {filterPureVeg && <Check className="w-3.5 h-3.5" />}
              Pure Veg 🟢
            </button>

            {/* Top Rated (4.4+) */}
            <button
              onClick={() => setFilterTopRated(!filterTopRated)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-black transition-all ${
                filterTopRated
                  ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                  : 'bg-white/80 hover:bg-white text-gray-700 border-gray-200'
              }`}
            >
              {filterTopRated && <Check className="w-3.5 h-3.5" />}
              Ratings 4.4+ ⭐
            </button>

            {/* Fast Delivery (< 30 min) */}
            <button
              onClick={() => setFilterFastDelivery(!filterFastDelivery)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-black transition-all ${
                filterFastDelivery
                  ? 'bg-sky-500 text-white border-sky-500 shadow-sm'
                  : 'bg-white/80 hover:bg-white text-gray-700 border-gray-200'
              }`}
            >
              {filterFastDelivery && <Check className="w-3.5 h-3.5" />}
              Fast Delivery 🚀
            </button>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 bg-white/80 px-3 py-2 rounded-xl border border-gray-200">
              <span className="text-xs font-extrabold text-gray-400 uppercase">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs font-black text-gray-700 focus:outline-none cursor-pointer"
              >
                <option value="relevance">Relevance</option>
                <option value="rating">Rating: High to Low</option>
                <option value="speed">Delivery: Fastest First</option>
                <option value="costLow">Cost: Low to High</option>
                <option value="costHigh">Cost: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6 text-sm text-gray-500 font-bold">
          Showing {processedRestaurants.length} restaurants matching your choices
        </div>

        {/* Restaurants Card Grid */}
        {processedRestaurants.length === 0 ? (
          <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-12 text-center border border-gray-200/50">
            <p className="text-xl font-bold text-gray-500 mb-2">No restaurants match your filters.</p>
            <p className="text-gray-400 text-sm">Try resetting your search query or adjusting filter settings.</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {processedRestaurants.map((restaurant, index) => {
              const slug = restaurant.name.toLowerCase().replace(/\s+/g, '-');
              return (
                <Link
                  to={`/restaurant/${slug}`}
                  key={index}
                  className="group bg-white/50 backdrop-blur-md rounded-3xl overflow-hidden border border-white/20 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Discount Badge */}
                    <div className="absolute top-4 left-4 z-10 flex flex-col gap-1">
                      {restaurant.pureVeg && (
                        <span className="bg-emerald-500 text-white text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full shadow">
                          Pure Veg 🟢
                        </span>
                      )}
                      <span className="bg-[#FF6B35] text-white text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full shadow">
                        50% OFF up to ₹100
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-extrabold text-gray-800 group-hover:text-[#FF6B35] transition-colors line-clamp-1">
                          {restaurant.name}
                        </h3>
                        <div className="flex items-center gap-1 bg-emerald-100 text-emerald-800 text-xs font-black px-2 py-0.5 rounded-lg">
                          <Star className="w-3 h-3 fill-emerald-800 text-emerald-800" />
                          {restaurant.rating}
                        </div>
                      </div>
                      <p className="text-gray-500 text-xs font-semibold mb-4">
                        {restaurant.cuisine} • {restaurant.categories.join(', ')}
                      </p>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-100 text-sm text-gray-600 font-medium">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-[#FF6B35]" />
                        <span>{restaurant.deliveryTime} mins</span>
                      </div>
                      <div>
                        <span>₹{restaurant.costForTwo} for two</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllRestaurants;
