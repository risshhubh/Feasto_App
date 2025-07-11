import React from 'react';
import { useLocation } from 'react-router-dom';
import { restaurantData } from './restaurantData';
import { useCart } from './CartContext';
import { Star } from 'lucide-react';
import Header from './Header';

const extractQuery = (search) => {
  const params = new URLSearchParams(search);
  return params.get('q') || '';
};

const SearchResults = () => {
  const location = useLocation();
  const query = extractQuery(location.search).toLowerCase();
  const { cartItems, addToCart, removeFromCart } = useCart();

  // Combine all menu items from all restaurants
  const allMenus = restaurantData.flatMap((restaurant) =>
    (restaurant.menu || []).map((item) => ({
      ...item,
      restaurantName: restaurant.name,
      id: `${restaurant.name}-${item.name}`,
    }))
  );

  const filteredItems = allMenus.filter((item) =>
    item.name.toLowerCase().includes(query)
  );

  const getQuantity = (itemId) => {
    const item = cartItems.find((i) => i.id === itemId);
    return item ? item.quantity : 0;
  };

  return (
    <>
      <Header />
      {/* Background */}
      <div
        className="relative min-h-screen pt-24 px-6 pb-16 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920')",
        }}
      >
        {/* Blur Overlay */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-0"></div>

        {/* Main Content */}
        <section className="relative z-10 max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800 text-center">
            Search Results for "{query}"
          </h2>

          {filteredItems.length === 0 ? (
            <p className="text-center text-gray-600">No matching dishes found.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map(
                ({ id, name, description, image, price, rating, reviews, restaurantName }) => {
                  const quantity = getQuantity(id);
                  return (
                    <div
                      key={id}
                      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 p-4 flex items-start gap-4 transition transform hover:-translate-y-1"
                    >
                      <img
                        src={image}
                        alt={name}
                        className="w-28 h-28 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-800">{name}</h4>
                        <p className="text-sm text-gray-600">{description}</p>
                        <p className="text-sm text-gray-900 font-medium mt-1">₹{price}</p>
                        <p className="text-xs text-gray-500 italic mb-1">From {restaurantName}</p>
                        <div className="text-sm text-yellow-500 font-medium flex items-center gap-1 mb-2">
                          <Star className="w-4 h-4" />
                          {rating} ({reviews || 0} reviews)
                        </div>

                        {quantity === 0 ? (
                          <button
                            onClick={() =>
                              addToCart({ id, name, image, price })
                            }
                            className="mt-1 text-sm bg-amber-600 text-white px-4 py-1 rounded hover:bg-orange-700 transition"
                          >
                            Add to Cart
                          </button>
                        ) : (
                          <div className="flex items-center gap-2 mt-1">
                            <button
                              onClick={() => removeFromCart(id)}
                              className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500"
                            >
                              −
                            </button>
                            <span className="font-medium text-gray-800">{quantity}</span>
                            <button
                              onClick={() =>
                                addToCart({ id, name, image, price })
                              }
                              className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-500"
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default SearchResults;
