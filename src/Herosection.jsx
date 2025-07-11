import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/all-restaurants');
  };

  return (
    <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white py-24 px-4 sm:px-6 lg:px-8 rounded-b-3xl overflow-hidden shadow-xl">
      <div className="relative max-w-5xl mx-auto text-center z-10">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight text-white">
          Dine Like Royalty
        </h2>
        <p className="text-lg sm:text-xl mb-10 text-gray-300 max-w-2xl mx-auto">
          Experience premium cuisine from top-rated restaurants — delivered with style and speed.
        </p>
        <div className="flex justify-center">
          <button
            onClick={handleExploreClick}
            className="bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full shadow-md hover:bg-yellow-300 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
          >
            Explore Restaurants
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
