import React from 'react';
import { useNavigate } from 'react-router-dom';
import { restaurantData } from './restaurantData';

const AllRestaurants = () => {
  const navigate = useNavigate();

  const handleRestaurantClick = (restaurantName) => {
    const slug = restaurantName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/restaurant/${slug}`);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-14">
          All Restaurants
        </h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {restaurantData.map((restaurant, index) => (
            <div
              key={index}
              onClick={() => handleRestaurantClick(restaurant.name)}
              className="cursor-pointer bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-[1.02] transition duration-300 border border-gray-100 group"
            >
              <div className="overflow-hidden">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-1">
                  {restaurant.name}
                </h3>
                <p className="text-gray-500 text-sm">{restaurant.cuisine}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllRestaurants;
