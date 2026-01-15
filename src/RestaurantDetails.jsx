import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { restaurantData } from './restaurantData';
import { useCart } from './CartContext';
import { Star } from 'lucide-react';

const sampleMenu = [
  {
    name: 'Margherita Pizza',
    description: 'Classic Italian pizza with fresh tomatoes, mozzarella, and basil.',
    image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
    rating: 4.5,
    price: 299,
    reviews: 124,
  },
  {
    name: 'Schezwan Noodles',
    description: 'Spicy and tangy noodles with mixed vegetables and Schezwan sauce.',
    image: 'https://images.pexels.com/photos/4198023/pexels-photo-4198023.jpeg',
    rating: 4.2,
    price: 199,
    reviews: 87,
  },
  {
    name: 'Chicken Biryani',
    description: 'Aromatic rice cooked with spiced chicken and herbs.',
    image: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg',
    rating: 4.8,
    price: 349,
    reviews: 215,
  },
  {
    name: 'Butter Chicken',
    description: 'Creamy tomato-based curry with tender chicken pieces.',
    image: 'https://images.pexels.com/photos/16188982/pexels-photo-16188982.jpeg',
    rating: 4.7,
    price: 379,
    reviews: 192,
  },
  {
    name: 'Paneer Tikka',
    description: 'Grilled cottage cheese cubes marinated in spices.',
    image: 'https://images.pexels.com/photos/16164067/pexels-photo-16164067.jpeg',
    rating: 4.6,
    price: 259,
    reviews: 158,
  },
  {
    name: 'Masala Dosa',
    description: 'Crispy rice crepe filled with spicy mashed potatoes.',
    image: 'https://images.pexels.com/photos/9927346/pexels-photo-9927346.jpeg',
    rating: 4.4,
    price: 149,
    reviews: 102,
  },
  {
    name: 'Tandoori Chicken',
    description: 'Spiced chicken roasted in a traditional clay oven.',
    image: 'https://images.pexels.com/photos/16102781/pexels-photo-16102781.jpeg',
    rating: 4.7,
    price: 329,
    reviews: 175,
  },
  {
    name: 'Veg Manchurian',
    description: 'Fried vegetable balls in a tangy Indo-Chinese sauce.',
    image: 'https://images.pexels.com/photos/12602917/pexels-photo-12602917.jpeg',
    rating: 4.3,
    price: 229,
    reviews: 90,
  },
  {
    name: 'Gulab Jamun',
    description: 'Sweet milk-solid balls soaked in rose-flavored syrup.',
    image: 'https://images.pexels.com/photos/16157964/pexels-photo-16157964.jpeg',
    rating: 4.9,
    price: 99,
    reviews: 134,
  },
  {
    name: 'Pav Bhaji',
    description: 'Spicy mashed vegetable curry served with buttered buns.',
    image: 'https://images.pexels.com/photos/10084734/pexels-photo-10084734.jpeg',
    rating: 4.6,
    price: 149,
    reviews: 112,
  },
  {
    name: 'Spring Rolls',
    description: 'Crispy rolls filled with vegetables and served with sweet chili sauce.',
    image: 'https://images.pexels.com/photos/6508342/pexels-photo-6508342.jpeg',
    rating: 4.2,
    price: 189,
    reviews: 79,
  },
  {
    name: 'Fish Curry',
    description: 'Coastal-style fish curry in a tangy tamarind coconut gravy.',
    image: 'https://images.pexels.com/photos/16010284/pexels-photo-16010284.jpeg',
    rating: 4.5,
    price: 399,
    reviews: 98,
  },
  {
    name: 'Chocolate Brownie',
    description: 'Fudgy chocolate brownie topped with a scoop of vanilla ice cream.',
    image: 'https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg',
    rating: 4.9,
    price: 159,
    reviews: 143,
  },
];

const RestaurantDetails = () => {
  const { name } = useParams();
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const { cartItems, addToCart, removeFromCart } = useCart();

  const restaurant = restaurantData.find(
    (r) => r.name === decodeURIComponent(name)
  );

  if (!restaurant) {
    return (
      <div className="p-8 text-center">
        <p className="text-xl text-red-500 font-semibold">Restaurant not found.</p>
      </div>
    );
  }

  const filteredMenu = sampleMenu
    .filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => (sortBy === 'price' ? a.price - b.price : b.rating - a.rating));

  const getQuantity = (itemId) => {
    if (!Array.isArray(cartItems)) return 0;
    const item = cartItems.find((i) => i.id === itemId);
    return item ? item.quantity : 0;
  };

  return (
    <>
      <main className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-br from-[#FFFBF0] via-[#FFF8E1] to-[#FFF5E6]">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-gray-600">
            <Link to="/" className="hover:text-[#FF6B35] transition">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/all-restaurants" className="hover:text-[#FF6B35] transition">All Restaurants</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800 font-medium">{restaurant.name}</span>
          </nav>

          {/* Restaurant Banner */}
          <section className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden mb-8">
            <div className="relative h-64 sm:h-80">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-800 mb-2">{restaurant.name}</h2>
                <p className="text-gray-700 text-base sm:text-lg">{restaurant.description || 'Delicious dishes from this restaurant.'}</p>
              </div>
            </div>
          </section>

          {/* Filter + Sort Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
            <div className="relative w-full sm:w-1/2">
              <input
                type="text"
                placeholder="Search dishes..."
                className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-200 bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] transition-all"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <select
              className="px-4 py-3 rounded-xl border border-gray-200 bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] transition-all w-full sm:w-auto"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="rating">Sort by Rating</option>
              <option value="price">Sort by Price</option>
            </select>
          </div>

          {/* Menu Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMenu.map((item, idx) => {
              const itemId = `${restaurant.name}-${item.name}`;
              const quantity = getQuantity(itemId);
              return (
                <div
                  key={idx}
                  className="group bg-white/60 backdrop-blur-sm rounded-2xl shadow-md border border-gray-200/50 overflow-hidden hover:shadow-xl hover:border-[#FF6B35]/30 transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 text-xs font-semibold text-gray-800">
                      <Star className="w-3 h-3 fill-[#FFD23F] text-[#FFD23F]" />
                      {item.rating}
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="text-lg font-bold text-gray-800 mb-2">{item.name}</h4>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold text-[#FF6B35]">₹{item.price}</span>
                      <span className="text-xs text-gray-500">({item.reviews || 0} reviews)</span>
                    </div>

                    {quantity === 0 ? (
                      <button
                        onClick={() =>
                          addToCart({ id: itemId, name: item.name, image: item.image, price: item.price })
                        }
                        className="w-full bg-[#FF6B35] text-white font-semibold py-2.5 px-4 rounded-xl hover:bg-[#FF8C42] transition-all shadow-md hover:shadow-lg"
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <div className="flex items-center justify-center gap-3 bg-gray-50 rounded-xl p-2">
                        <button
                          onClick={() => removeFromCart({ id: itemId })}
                          className="bg-[#FF6B6B] text-white w-8 h-8 rounded-lg hover:bg-[#FF8C8C] transition-all font-bold"
                        >
                          −
                        </button>
                        <span className="font-bold text-gray-800 text-lg min-w-[30px] text-center">{quantity}</span>
                        <button
                          onClick={() =>
                            addToCart({ id: itemId, name: item.name, image: item.image, price: item.price })
                          }
                          className="bg-[#FF6B35] text-white w-8 h-8 rounded-lg hover:bg-[#FF8C42] transition-all font-bold"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
};

export default RestaurantDetails;
