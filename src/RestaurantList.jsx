import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import { restaurantData } from './restaurantData';
import { useCart } from './CartContext';
import { Star } from 'lucide-react';

const sampleMenu = [
  {
    name: 'Margherita Pizza',
    description: 'Classic Italian pizza with fresh tomatoes, mozzarella, and basil.',
    image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg',
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
    image: 'https://images.pexels.com/photos/9609844/pexels-photo-9609844.jpeg',
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
    image: 'https://images.pexels.com/photos/16577626/pexels-photo-16577626.jpeg',
    rating: 4.9,
    price: 99,
    reviews: 134,
  },
  {
    name: 'Pav Bhaji',
    description: 'Spicy mashed vegetable curry served with buttered buns.',
    image: 'https://images.pexels.com/photos/16560155/pexels-photo-16560155.jpeg',
    rating: 4.6,
    price: 149,
    reviews: 112,
  },
  {
    name: 'Spring Rolls',
    description: 'Crispy rolls filled with vegetables and served with sweet chili sauce.',
    image: 'https://images.pexels.com/photos/6995447/pexels-photo-6995447.jpeg',
    rating: 4.2,
    price: 189,
    reviews: 79,
  },
  {
    name: 'Fish Curry',
    description: 'Coastal-style fish curry in a tangy tamarind coconut gravy.',
    image: 'https://images.pexels.com/photos/5410406/pexels-photo-5410406.jpeg',
    rating: 4.5,
    price: 399,
    reviews: 98,
  },
  {
    name: 'Chocolate Brownie',
    description: 'Fudgy chocolate brownie topped with a scoop of vanilla ice cream.',
    image: 'https://images.pexels.com/photos/4109990/pexels-photo-4109990.jpeg',
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
    (r) =>
      r.name.toLowerCase().replace(/\s+/g, '-').trim() ===
      decodeURIComponent(name.toLowerCase())
  );

  if (!restaurant) {
    return (
      <div className="p-8 text-center">
        <p className="text-xl text-red-500 font-semibold">Restaurant not found.</p>
      </div>
    );
  }

  const filteredMenu = useMemo(() =>
    sampleMenu
      .filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()))
      .sort((a, b) => (sortBy === 'price' ? a.price - b.price : b.rating - a.rating))
  , [filter, sortBy]);

  const getQuantity = (itemId) => {
    const item = cartItems.find((i) => i.id === itemId);
    return item ? item.quantity : 0;
  };

  return (
    <>
      <Header />
      {/* Background Blur Image */}
      <div
        className="fixed top-0 left-0 w-full h-full -z-10"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(12px) brightness(0.8)',
        }}
      ></div>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg rounded-2xl max-w-6xl mx-auto relative">
        <div className="mb-6">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-64 object-cover rounded-xl shadow-md"
          />
          <h2 className="text-3xl font-bold mt-4 text-gray-800">{restaurant.name}</h2>
          <p className="text-gray-600">{restaurant.description || 'Delicious dishes from this restaurant.'}</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
          <input
            type="text"
            placeholder="Search dishes..."
            className="border border-gray-300 rounded px-4 py-2 w-full sm:w-1/2"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded px-4 py-2"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="rating">Sort by Rating</option>
            <option value="price">Sort by Price</option>
          </select>
        </div>

        {filteredMenu.length === 0 && (
          <p className="text-center text-gray-500">No dishes found matching "{filter}".</p>
        )}

        <div className="grid sm:grid-cols-2 gap-6">
          {filteredMenu.map(({ name: itemName, description, image, price, rating, reviews }) => {
            const itemId = `${restaurant.name}-${itemName}`;
            const quantity = getQuantity(itemId);
            return (
              <div
                key={itemId}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-start gap-4 hover:shadow-md transition"
              >
                <img
                  src={image}
                  alt={itemName}
                  className="w-28 h-28 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-800 mb-1">{itemName}</h4>
                  <p className="text-sm text-gray-600 mb-1">{description}</p>
                  <p className="text-sm text-gray-800 font-medium">₹{price}</p>
                  <div className="text-sm text-yellow-500 font-medium flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {rating} ({reviews || 0} reviews)
                  </div>

                  {quantity === 0 ? (
                    <button
                      onClick={() => addToCart({ id: itemId, name: itemName, image, price })}
                      className="mt-2 text-sm bg-amber-600 text-white px-4 py-1 rounded hover:bg-orange-800"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => removeFromCart(itemId)}
                        className="bg-red-700 text-white px-2 py-0.5 rounded hover:bg-red-600"
                      >
                        −
                      </button>
                      <span className="font-medium text-gray-800">{quantity}</span>
                      <button
                        onClick={() => addToCart({ id: itemId, name: itemName, image, price })}
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
      </section>
    </>
  );
};

export default RestaurantDetails;
