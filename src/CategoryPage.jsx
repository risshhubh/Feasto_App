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
    <div
      className="min-h-screen pt-28 pb-10 px-4 sm:px-6 lg:px-12 relative bg-cover bg-center"
      style={{
        backgroundImage: 'url(https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg)',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover'
      }}
    >
      <div className="absolute inset-0 bg-white/70 backdrop-blur-md z-0"></div>
      <div className="relative z-10">
        <div className="mb-4 text-sm text-gray-500 space-x-1">
          <Link to="/" className="text-orange-600 hover:underline">Home</Link>
          <span>/</span>
          <span className="capitalize font-medium text-gray-700">{categoryName}</span>
        </div>

        <h1 className="text-4xl font-bold text-center mb-8 capitalize">
          Top {categoryName} Restaurants
        </h1>

        <div className="lg:grid lg:grid-cols-3 gap-6 flex flex-col-reverse">
          <div className="col-span-1 lg:overflow-y-auto lg:max-h-[70vh] flex lg:flex-col gap-4 pb-4 lg:pb-0 overflow-x-auto">
            <div className="flex lg:flex-col gap-4">
              {restaurants.map((r) => (
                <div
                  key={r.id}
                  onClick={() => { setSelected(r); setTab('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className={`min-w-[250px] lg:min-w-0 cursor-pointer bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition ${selected?.id === r.id ? 'ring-2 ring-orange-500' : ''}`}
                >
                  <img src={r.image} alt={r.name} className="w-full h-36 object-cover" />
                  <div className="p-3">
                    <h3 className="text-md font-semibold text-gray-800">{r.name}</h3>
                    <p className="text-sm text-gray-600">⭐ {r.rating} • 📍 {r.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-2 bg-white rounded-xl shadow-lg p-6 h-fit">
            {selected ? (
              <>
                <img
                  src={selected.image}
                  alt={selected.name}
                  className="w-full h-72 object-cover rounded-lg mb-4"
                />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{selected.name}</h2>
                <p className="text-sm text-gray-600 mb-2">⭐ {selected.rating} • 📍 {selected.location}</p>
                <p className="text-gray-700 leading-relaxed mb-4">{selected.description}</p>

                <div className="mb-4 flex gap-4 border-b border-gray-200">
                  <button
                    onClick={() => setTab('menu')}
                    className={`pb-2 ${tab === 'menu' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500'}`}
                  >
                    Menu
                  </button>
                  <button
                    onClick={() => setTab('reviews')}
                    className={`pb-2 ${tab === 'reviews' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500'}`}
                  >
                    Reviews
                  </button>
                </div>

                {tab === 'menu' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selected.menu.map((item, idx) => {
                      const qty = getItemQty(item.id);
                      return (
                        <div key={idx} className="flex flex-col sm:flex-row gap-4 items-start bg-gray-50 p-3 rounded-lg shadow-sm">
                          <img src={item.image} alt={item.name} className="w-full sm:w-20 h-20 rounded-md object-cover" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">{item.name}</h4>
                            <p className="text-sm text-gray-600">{item.description}</p>
                            <div className="flex justify-between mt-1 text-sm">
                              <span className="text-orange-600 font-medium">₹{item.price}</span>
                              <span className="text-gray-500">⭐ {item.rating}</span>
                            </div>

                            {qty === 0 ? (
                              <button
                                onClick={() => addToCart(item)}
                                className="mt-2 px-3 py-1 text-sm bg-orange-500 hover:bg-orange-600 text-white rounded"
                              >
                                Add to Cart
                              </button>
                            ) : (
                              <div className="flex items-center gap-2 mt-2">
                                <button
                                  onClick={() => removeFromCart(item)}
                                  className="px-2 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
                                >−</button>
                                <span>{qty}</span>
                                <button
                                  onClick={() => addToCart(item)}
                                  className="px-2 py-1 text-sm bg-orange-500 hover:bg-orange-600 text-white rounded"
                                >+</button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <ul className="space-y-2 text-gray-700">
                    {selected.reviews.map((review, idx) => <li key={idx}>
                      "{review}"
                    </li>)}
                  </ul>
                )}
              </>
            ) : (
              <p className="text-gray-500 italic">Select a restaurant to see details.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
