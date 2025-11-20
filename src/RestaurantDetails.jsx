import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { restaurantData } from './restaurantData';
import { useCart } from './CartContext';
import { Star } from 'lucide-react';

const sampleMenu = [
   {
    name: 'Margherita Pizza',
    description: 'Classic Italian pizza with fresh tomatoes, mozzarella, and basil.',
    image: '',
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
      <main className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen max-w-screen-xl mx-auto">
        {/* 🔖 Breadcrumb */}
        <div className="mb-4 text-sm text-gray-600">
          <Link to="/" className="hover:underline text-blue-600">Home</Link>
          <span className="mx-1">/</span>
          <Link to="/all-restaurants" className="hover:underline text-blue-600">All Restaurants</Link>
          <span className="mx-1">/</span>
          <span className="text-gray-800 font-medium">{restaurant.name}</span>
        </div>

        {/* 🏪 Restaurant Banner */}
        <section className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden mb-8">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-48 sm:h-64 object-cover"
          />
          <div className="p-4 sm:p-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{restaurant.name}</h2>
            <p className="text-gray-600 text-sm sm:text-base">{restaurant.description || 'Delicious dishes from this restaurant.'}</p>
          </div>
        </section>

        {/* 🔍 Filter + Sort Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search dishes..."
            className="border border-gray-300 rounded px-4 py-2 w-full sm:w-1/2"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded px-4 py-2 w-full sm:w-auto"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="rating">Sort by Rating</option>
            <option value="price">Sort by Price</option>
          </select>
        </div>

        {/* 🍽️ Menu Grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredMenu.map((item, idx) => {
            const itemId = `${restaurant.name}-${item.name}`;
            const quantity = getQuantity(itemId);
            return (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col sm:flex-row items-start gap-4 hover:shadow-md transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full sm:w-28 h-28 object-cover rounded-md"
                  loading="lazy"
                />
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-800 mb-1">{item.name}</h4>
                  <p className="text-sm text-gray-600 mb-1">{item.description}</p>
                  <p className="text-sm text-gray-800 font-medium">₹{item.price}</p>
                  <div className="text-sm text-yellow-500 font-medium flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4" />
                    {item.rating} ({item.reviews || 0} reviews)
                  </div>

                  {quantity === 0 ? (
                    <button
                      onClick={() =>
                        addToCart({ id: itemId, name: item.name, image: item.image, price: item.price })
                      }
                      className="text-sm bg-amber-600 text-white px-4 py-1 rounded hover:bg-orange-800"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                      onClick={() => removeFromCart({ id: itemId })}
                        className="bg-red-700 text-white px-2 py-0.5 rounded hover:bg-red-600"
                      >
                        −
                      </button>
                      <span className="font-medium text-gray-800">{quantity}</span>
                      <button
                        onClick={() =>
                          addToCart({ id: itemId, name: item.name, image: item.image, price: item.price })
                        }
                        className="bg-green-700 text-white px-2 py-0.5 rounded hover:bg-green-600"
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
      </main>
    </>
  );
};

export default RestaurantDetails;
