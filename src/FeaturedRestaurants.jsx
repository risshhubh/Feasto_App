import React from 'react';
import { Link } from 'react-router-dom';

const featuredData = [
  {
    name: 'The Italian Spoon',
    cuisine: 'Italian',
    image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg',
  },
  {
    name: 'Spicy Sichuan',
    cuisine: 'Chinese',
    image: 'https://images.pexels.com/photos/4198023/pexels-photo-4198023.jpeg',
  },
  {
    name: 'Bombay Biryani House',
    cuisine: 'Indian',
    image: 'https://b.zmtcdn.com/data/reviews_photos/708/76db9b7a265d87529b84228c0acf3708_1724488737.jpg',
  },
  {
    name: 'Burger Bazaar',
    cuisine: 'American',
    image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg',
  },
  {
    name: 'Taco Fiesta',
    cuisine: 'Mexican',
    image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg',
  },
  {
    name: 'Sushi Central',
    cuisine: 'Japanese',
    image: 'https://images.pexels.com/photos/3577566/pexels-photo-3577566.jpeg',
  },
];

const FeaturedRestaurants = () => {
  return (
    <div className="px-4 py-10 sm:px-8 md:px-12 lg:px-20">
      <h2 className="text-4xl font-bold mb-10 text-center">Featured Restaurants</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
        {featuredData.map((restaurant, index) => (
          <Link
            key={index}
            to={`/featured/${encodeURIComponent(restaurant.name)}`}
            className="w-full max-w-[300px] aspect-square border rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
          >
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-2/3 object-cover"
            />
            <div className="p-3 h-1/3 flex flex-col justify-center items-center text-center">
              <h3 className="text-lg font-semibold">{restaurant.name}</h3>
              <p className="text-sm text-gray-600">{restaurant.cuisine}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedRestaurants;
