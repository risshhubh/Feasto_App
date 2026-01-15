// src/pages/CategoryPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from './CartContext';

const categoryImages = {
  pizza: [
    'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg',
    'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg',
    'https://images.pexels.com/photos/365459/pexels-photo-365459.jpeg',
    'https://images.pexels.com/photos/2233348/pexels-photo-2233348.jpeg',
    'https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg'
  ],
  burger: [
    'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg',
    'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg',
    'https://images.pexels.com/photos/750073/pexels-photo-750073.jpeg',
    'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg',
    'https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg'
  ],
  biryani: [
    'https://images.pexels.com/photos/16102781/pexels-photo-16102781.jpeg',
    'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg',
    'https://images.pexels.com/photos/6602820/pexels-photo-6602820.jpeg'
  ],
  noodles: [
    'https://images.pexels.com/photos/4198023/pexels-photo-4198023.jpeg',
    'https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg'
  ],
  dosa: [
    'https://images.pexels.com/photos/9927346/pexels-photo-9927346.jpeg',
    'https://images.pexels.com/photos/13226106/pexels-photo-13226106.jpeg'
  ],
  chinese: [
    'https://images.pexels.com/photos/12602917/pexels-photo-12602917.jpeg',
    'https://images.pexels.com/photos/6508342/pexels-photo-6508342.jpeg'
  ]
};

const generateMenuItems = (category, images) => {
  return Array.from({ length: 6 }, (_, idx) => ({
    id: `${category}-${idx}`,
    name: `${category} Special ${idx + 1}`,
    description: `Authentic ${category} recipe crafted with fresh ingredients and mouth-watering flavors.`,
    price: Math.floor(Math.random() * 300 + 150),
    rating: (Math.random() * 1.5 + 3.5).toFixed(1),
    image: images[idx % images.length]
  }));
};

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const [tab, setTab] = useState('menu');
  const [restaurants, setRestaurants] = useState([]);
  const { cartItems, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
    const lower = categoryName.toLowerCase();
    const images = categoryImages[lower] || [
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'
    ];
    const dummy = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      name: `${categoryName} Delight ${i + 1}`,
      image: images[i % images.length],
      rating: (Math.random() * 2 + 3).toFixed(1),
      location: 'Downtown Food Plaza',
      description: `Indulge in exquisite ${categoryName} dishes served with passion and perfection!`,
      menu: generateMenuItems(categoryName, images),
      reviews: ['Absolutely delicious!', 'Amazing flavor and service!', 'Will visit again.']
    }));
    setRestaurants(dummy);
    setSelected(dummy[0]);
  }, [categoryName]);

  const getItemQty = (itemId) => {
    const item = cartItems.find((i) => i.id === itemId);
    return item?.quantity || 0;
  };

  return (
    <div className="min-h-screen pt-28 pb-10 px-4 sm:px-6 lg:px-12 relative bg-gradient-to-br from-[#FFFBF0] via-[#FFF8E1] to-[#FFF5E6]">
      {/* Subtle Background */}
      <div 
        className="absolute inset-0 opacity-15 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg)',
        }}
      ></div>
      <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-[1]"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-6 text-sm text-gray-600">
          <Link to="/" className="hover:text-[#FF6B35] transition">Home</Link>
          <span className="mx-2">/</span>
          <span className="capitalize font-medium text-gray-800">{categoryName}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-center mb-10 capitalize text-gray-800">
          Top {categoryName} Restaurants
        </h1>

        <div className="lg:grid lg:grid-cols-3 gap-6 flex flex-col-reverse">
          {/* Restaurant List Sidebar */}
          <div className="col-span-1 lg:overflow-y-auto lg:max-h-[75vh] flex lg:flex-col gap-4 pb-4 lg:pb-0 overflow-x-auto">
            <div className="flex lg:flex-col gap-4">
              {restaurants.map((r) => (
                <div
                  key={r.id}
                  onClick={() => { setSelected(r); setTab('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className={`min-w-[250px] lg:min-w-0 cursor-pointer bg-white/60 backdrop-blur-sm rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border-2 ${selected?.id === r.id ? 'border-[#FF6B35] shadow-lg' : 'border-transparent'}`}
                >
                  <img src={r.image} alt={r.name} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{r.name}</h3>
                    <p className="text-sm text-gray-600">⭐ {r.rating} • 📍 {r.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Restaurant Details Panel */}
          <div className="col-span-2 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 lg:p-8 h-fit">
            {selected ? (
              <>
                <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden mb-6">
                  <img
                    src={selected.image}
                    alt={selected.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h2 className="text-3xl font-bold mb-2">{selected.name}</h2>
                    <p className="text-sm mb-1">⭐ {selected.rating} • 📍 {selected.location}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">{selected.description}</p>

                {/* Tabs */}
                <div className="mb-6 flex gap-6 border-b border-gray-200">
                  <button
                    onClick={() => setTab('menu')}
                    className={`pb-3 font-semibold transition-colors ${tab === 'menu' ? 'border-b-2 border-[#FF6B35] text-[#FF6B35]' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    Menu
                  </button>
                  <button
                    onClick={() => setTab('reviews')}
                    className={`pb-3 font-semibold transition-colors ${tab === 'reviews' ? 'border-b-2 border-[#FF6B35] text-[#FF6B35]' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    Reviews
                  </button>
                </div>

                {tab === 'menu' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selected.menu.map((item, idx) => {
                      const qty = getItemQty(item.id);
                      return (
                        <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 shadow-sm hover:shadow-md transition-all">
                          <div className="flex gap-4">
                            <img src={item.image} alt={item.name} className="w-24 h-24 rounded-lg object-cover shrink-0" />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-gray-800 mb-1">{item.name}</h4>
                              <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-lg font-bold text-[#FF6B35]">₹{item.price}</span>
                                <span className="text-xs text-gray-500">⭐ {item.rating}</span>
                              </div>

                              {qty === 0 ? (
                                <button
                                  onClick={() => addToCart(item)}
                                  className="w-full px-3 py-1.5 text-sm bg-[#FF6B35] hover:bg-[#FF8C42] text-white rounded-lg transition-all font-semibold"
                                >
                                  Add to Cart
                                </button>
                              ) : (
                                <div className="flex items-center justify-center gap-2 bg-gray-50 rounded-lg p-1.5">
                                  <button
                                    onClick={() => removeFromCart(item)}
                                    className="bg-[#FF6B6B] text-white w-7 h-7 rounded-lg hover:bg-[#FF8C8C] transition-all font-bold text-sm"
                                  >−</button>
                                  <span className="font-bold text-gray-800 min-w-[25px] text-center">{qty}</span>
                                  <button
                                    onClick={() => addToCart(item)}
                                    className="bg-[#FF6B35] text-white w-7 h-7 rounded-lg hover:bg-[#FF8C42] transition-all font-bold text-sm"
                                  >+</button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {selected.reviews.map((review, idx) => (
                      <div key={idx} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50">
                        <p className="text-gray-700 italic">"{review}"</p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 italic">Select a restaurant to see details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
