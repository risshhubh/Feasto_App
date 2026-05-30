import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Parallax.css';

const categories = [
  'Pizza',
  'Pasta',
  'Noodles',
  'Dumplings',
  'Biryani',
  'Curry',
  'Burger',
  'Fries',
  'Tacos',
  'Nachos',
  'Sushi',
  'Ramen',
];

const FoodCategory = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.toLowerCase()}`);
  };

  return (
    <>
      <section
        id="categories"
        className="relative py-28 px-4 sm:px-6 lg:px-8 lg:mx-12 transition duration-500 bg-white/80 backdrop-blur-md rounded-xl overflow-hidden"
      >
        <div className="absolute inset-0 z-0 parallax-bg opacity-20 animate-pulse" />
        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-10">
            Browse by Category
          </h2>
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className="px-5 py-2 rounded-full border text-sm font-medium transition-all duration-200 bg-white text-gray-700 border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B35]"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FoodCategory;