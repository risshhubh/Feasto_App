// src/pages/CategoryPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { restaurantData } from './restaurantData';
import { useCart } from './CartContext';
import { Star, Clock, MapPin, Search, ArrowLeft, Heart, Plus, Minus, Info } from 'lucide-react';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [menuFilter, setMenuFilter] = useState('');
  const { cartItems, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryName]);

  // Find matching restaurants from the real 100-restaurant dataset
  const targetCategory = categoryName.toLowerCase();
  const matchingRestaurants = restaurantData.filter((r) => {
    const matchesCuisine = r.cuisine.toLowerCase() === targetCategory;
    const matchesCategory = r.categories.some((c) => c.toLowerCase() === targetCategory);
    const matchesDish = r.menu.some((dish) => 
      dish.name.toLowerCase().includes(targetCategory) || 
      dish.category.toLowerCase().includes(targetCategory)
    );
    return matchesCuisine || matchesCategory || matchesDish;
  });

  // Set default selected restaurant
  useEffect(() => {
    if (matchingRestaurants.length > 0) {
      setSelectedRestaurant(matchingRestaurants[0]);
    } else {
      setSelectedRestaurant(null);
    }
  }, [categoryName, matchingRestaurants.length]);

  const getItemQty = (itemId) => {
    if (!Array.isArray(cartItems)) return 0;
    const item = cartItems.find((i) => i.id === itemId);
    return item ? item.quantity : 0;
  };

  // Filter the selected restaurant's menu items
  const getFilteredMenu = () => {
    if (!selectedRestaurant) return [];
    return selectedRestaurant.menu.filter((dish) => {
      // Show matching category items first, or filter by search query
      const matchesSearch = dish.name.toLowerCase().includes(menuFilter.toLowerCase()) ||
                            dish.description.toLowerCase().includes(menuFilter.toLowerCase());
      return matchesSearch;
    });
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-12 relative bg-gradient-to-br from-[#FFFBF0] via-[#FFF8E1] to-[#FFF5E6]">
      {/* Background Graphic */}
      <div 
        className="absolute inset-0 opacity-10 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1513104890138-7c749659a591')",
        }}
      ></div>
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-[1] pointer-events-none"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Navigation Breadcrumbs */}
        <div className="mb-6 text-sm text-gray-600 font-semibold flex items-center gap-2">
          <Link to="/" className="hover:text-[#FF6B35] transition">Home</Link>
          <span className="text-gray-400">/</span>
          <Link to="/all-restaurants" className="hover:text-[#FF6B35] transition">All Restaurants</Link>
          <span className="text-gray-400">/</span>
          <span className="capitalize text-gray-800 font-extrabold">{categoryName}</span>
        </div>

        {/* Category Header */}
        <div className="mb-10 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl font-serif font-black capitalize text-gray-800 mb-3">
            Top {categoryName} Spots
          </h1>
          <p className="text-gray-600 text-lg">
            Found {matchingRestaurants.length} premium restaurants serving delicious {categoryName} items.
          </p>
        </div>

        {matchingRestaurants.length === 0 ? (
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-12 text-center border border-gray-200/50">
            <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-xl font-bold text-gray-500 mb-2">No matching spots found.</p>
            <p className="text-gray-400 text-sm">We are expanding our network. Check back soon!</p>
            <Link to="/all-restaurants" className="mt-4 inline-block bg-[#FF6B35] text-white px-6 py-2.5 rounded-xl font-bold text-sm">
              View All Restaurants
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8">
            
            {/* Sidebar list of matching restaurants */}
            <div className="col-span-1 flex lg:flex-col gap-4 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-thin">
              {matchingRestaurants.map((r) => (
                <div
                  key={r.id}
                  onClick={() => {
                    setSelectedRestaurant(r);
                    setMenuFilter('');
                  }}
                  className={`min-w-[280px] lg:min-w-0 cursor-pointer bg-white/70 backdrop-blur-md rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border-2 flex flex-col sm:flex-row lg:flex-col ${
                    selectedRestaurant?.id === r.id
                      ? 'border-[#FF6B35] shadow-lg shadow-[#FF6B35]/5 scale-[1.01]'
                      : 'border-transparent hover:border-gray-200'
                  }`}
                >
                  <div className="relative w-full sm:w-36 lg:w-full h-32 sm:h-auto lg:h-44 shrink-0">
                    <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                    {r.pureVeg && (
                      <span className="absolute top-2 left-2 bg-emerald-500 text-white text-[8px] font-black uppercase px-2 py-0.5 rounded shadow">
                        VEG 🟢
                      </span>
                    )}
                  </div>
                  
                  <div className="p-4 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-extrabold text-gray-800 text-base line-clamp-1 group-hover:text-[#FF6B35] transition-colors mb-1">
                        {r.name}
                      </h3>
                      <p className="text-xs text-gray-500 font-bold mb-2 uppercase tracking-wide">
                        {r.cuisine}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-650 font-bold border-t border-gray-100 pt-2">
                      <span className="flex items-center gap-0.5 text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                        ★ {r.rating}
                      </span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#FF6B35]" /> {r.deliveryTime}m</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Split Pane Details Panel */}
            <div className="col-span-2 flex flex-col gap-6">
              {selectedRestaurant && (
                <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-white/50 p-6 sm:p-8 shadow-xl">
                  {/* Banner */}
                  <div className="relative h-56 sm:h-72 rounded-2xl overflow-hidden mb-6 shadow-sm">
                    <img
                      src={selectedRestaurant.image}
                      alt={selectedRestaurant.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <span className="bg-[#FF6B35] text-white text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider mb-2 inline-block">
                        Featured in {categoryName}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-serif font-black mb-1">{selectedRestaurant.name}</h2>
                      <p className="text-xs sm:text-sm text-gray-200 font-bold flex items-center gap-4">
                        <span className="flex items-center gap-0.5">★ {selectedRestaurant.rating} ({selectedRestaurant.reviewsCount}+ reviews)</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#FF6B35]" /> {selectedRestaurant.address}</span>
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6 font-semibold border-b border-gray-100 pb-4">
                    {selectedRestaurant.description}
                  </p>

                  {/* Menu search */}
                  <div className="mb-6 relative">
                    <input
                      type="text"
                      placeholder={`Search in ${selectedRestaurant.name}'s menu...`}
                      value={menuFilter}
                      onChange={(e) => setMenuFilter(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                  </div>

                  {/* Menu Grid */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    {getFilteredMenu().map((dish) => {
                      const qty = getItemQty(dish.id);
                      return (
                        <div
                          key={dish.id}
                          className="bg-white/95 rounded-2xl p-4 border border-gray-150 shadow-sm flex gap-4 hover:shadow-md transition-all duration-300 items-center justify-between"
                        >
                          <div className="flex-grow min-w-0">
                            <div className="flex items-center gap-1.5 mb-1">
                              <span className="text-xs">{dish.isVeg ? '🟢' : '🔴'}</span>
                              <h4 className="font-extrabold text-gray-800 text-sm line-clamp-1">{dish.name}</h4>
                            </div>
                            <p className="text-xs text-gray-500 mb-2 line-clamp-2">{dish.description}</p>
                            <span className="text-sm font-black text-[#FF6B35]">₹{dish.price}</span>
                          </div>

                          {/* Image & Plus controls */}
                          <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                            <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/10"></div>
                            
                            {/* Counter Add trigger */}
                            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-10 w-[68px]">
                              {qty === 0 ? (
                                <button
                                  onClick={() => addToCart({
                                    id: dish.id,
                                    name: dish.name,
                                    price: dish.price,
                                    image: dish.image,
                                    isVeg: dish.isVeg
                                  })}
                                  className="w-full bg-[#FF6B35] text-white font-extrabold text-[9px] py-1 rounded shadow-sm hover:bg-[#FF8C42] transition-all flex items-center justify-center gap-0.5"
                                >
                                  <Plus className="w-2.5 h-2.5" /> ADD
                                </button>
                              ) : (
                                <div className="flex items-center justify-between bg-white text-gray-800 font-extrabold rounded px-1 py-0.5 shadow border border-gray-100">
                                  <button
                                    onClick={() => removeFromCart({ id: dish.id })}
                                    className="hover:bg-gray-100 text-red-500 w-5 h-5 flex items-center justify-center rounded"
                                  >
                                    <Minus className="w-2.5 h-2.5" />
                                  </button>
                                  <span className="text-[10px]">{qty}</span>
                                  <button
                                    onClick={() => addToCart({ id: dish.id })}
                                    className="hover:bg-gray-100 text-[#FF6B35] w-5 h-5 flex items-center justify-center rounded"
                                  >
                                    <Plus className="w-2.5 h-2.5" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
