import React from 'react';
import { Link } from 'react-router-dom';
import { restaurantData } from './restaurantData';
import { Star, Clock, Flame } from 'lucide-react';

const FeaturedRestaurants = () => {
  // Get featured restaurants from the main dataset
  const featured = restaurantData.filter((r) => r.featured);

  return (
    <div className="px-4 py-16 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-serif font-black text-gray-800 flex items-center justify-center gap-3">
          <Flame className="w-8 h-8 text-[#FF6B35] animate-pulse" />
          Featured Restaurants
        </h2>
        <p className="text-gray-600 mt-3 text-lg">Specially curated top-tier dining spots with exceptional ratings and gourmet selections</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {featured.map((restaurant, index) => {
          const slug = restaurant.name.toLowerCase().replace(/\s+/g, '-');
          return (
            <Link
              key={index}
              to={`/restaurant/${slug}`}
              className="group relative flex flex-col bg-white/50 backdrop-blur-md rounded-3xl overflow-hidden border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-[#FF6B35]/30"
            >
              {/* Offers/PureVeg Badges */}
              <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                {restaurant.pureVeg && (
                  <span className="bg-emerald-500/90 backdrop-blur-sm text-white text-[10px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full shadow-md">
                    Pure Veg 🟢
                  </span>
                )}
                <span className="bg-[#FF6B35] text-white text-[10px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full shadow-md">
                  50% OFF UP TO ₹100
                </span>
              </div>

              {/* Card Image */}
              <div className="relative h-60 w-full overflow-hidden">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
              </div>

              {/* Details */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-extrabold text-gray-800 group-hover:text-[#FF6B35] transition-colors line-clamp-1">
                      {restaurant.name}
                    </h3>
                    <div className="flex items-center gap-1 bg-emerald-100 text-emerald-800 text-xs font-black px-2 py-1 rounded-lg">
                      <Star className="w-3.5 h-3.5 fill-emerald-800 text-emerald-800" />
                      {restaurant.rating}
                    </div>
                  </div>

                  <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-4">
                    {restaurant.cuisine} • {restaurant.categories.join(', ')}
                  </p>
                </div>

                {/* Micro-Details Footer */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-100 text-sm text-gray-600 font-medium">
                  <div className="flex items-center gap-1.5">
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
    </div>
  );
};

export default FeaturedRestaurants;
