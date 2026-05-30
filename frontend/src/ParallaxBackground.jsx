// src/components/BackgroundParallax.jsx
import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, TrendingUp, Users, Award } from 'lucide-react';
import './Parallax.css';

const BackgroundParallax = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const popularCuisines = [
    { name: 'Italian', icon: '🍕', color: 'from-[#FF6B35] to-[#FF8C42]' },
    { name: 'Chinese', icon: '🥡', color: 'from-[#FFD23F] to-[#FF6B35]' },
    { name: 'Indian', icon: '🍛', color: 'from-[#FF6B6B] to-[#FF8C42]' },
    { name: 'Mexican', icon: '🌮', color: 'from-[#FF8C42] to-[#FFD23F]' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#FFFBF0] via-[#FFF8E1] to-[#FFF5E6]">
      {/* Parallax Background - More Visible */}
      <div className="parallax-bg absolute inset-0 z-0 opacity-40" />

      {/* Even Translucent Overlay - Uniform Across Entire Page */}
      <div className="absolute inset-0 z-[1] bg-white/30 backdrop-blur-[1px]" />

      {/* Content - Split Layout */}
      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">
        {/* Left Side - Welcome Message */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-8 lg:px-12 py-20 lg:py-0 text-gray-800">
          <div className="max-w-xl space-y-5">
            {/* Welcome Badge - More Natural */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF6B35]/8 border border-[#FF6B35]/15 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span className="text-xs font-medium text-[#FF6B35]">Hey there! 👋</span>
            </div>

            {/* Main Heading - More Conversational */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-tight">
              <span className="block text-gray-800">What are you</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] mt-1">
                craving today?
              </span>
            </h1>

            {/* Description - More Human */}
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              We've got hundreds of restaurants ready to serve you. From comfort food to exotic flavors, find exactly what you're in the mood for.
            </p>

            {/* Quick Stats - More Natural */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-white/30 backdrop-blur-md rounded-lg p-3.5 border border-gray-200/50 hover:bg-white/40 transition-all">
                <div className="flex items-center gap-1.5 mb-1">
                  <TrendingUp className="w-4 h-4 text-[#FF6B35]" />
                  <span className="text-xl font-bold text-gray-800">500+</span>
                </div>
                <p className="text-xs text-gray-600">restaurants</p>
              </div>
              <div className="bg-white/30 backdrop-blur-md rounded-lg p-3.5 border border-gray-200/50 hover:bg-white/40 transition-all">
                <div className="flex items-center gap-1.5 mb-1">
                  <Users className="w-4 h-4 text-[#FF8C42]" />
                  <span className="text-xl font-bold text-gray-800">50K+</span>
                </div>
                <p className="text-xs text-gray-600">happy customers</p>
              </div>
            </div>

            {/* CTA - More Casual */}
            <div className="pt-3">
              <Link
                to="/all-restaurants"
                className="inline-flex items-center justify-center gap-2 bg-[#FF6B35] text-white font-semibold py-3.5 px-7 rounded-lg shadow-md hover:bg-[#FF8C42] hover:shadow-lg transform hover:scale-[1.01] transition-all duration-200 w-full sm:w-auto"
              >
                <span>See all restaurants</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side - Popular Cuisines Grid */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-8 lg:px-12 py-12 lg:py-0">
          <div className="max-w-xl mx-auto w-full">
            <div className="mb-5">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 flex items-center gap-2">
                <Award className="w-5 h-5 text-[#FF6B35]" />
                Popular picks
              </h2>
              <p className="text-gray-600 text-xs">What everyone's ordering</p>
            </div>

            {/* Cuisine Cards Grid - More Natural Spacing */}
            <div className="grid grid-cols-2 gap-3">
              {popularCuisines.map((cuisine, index) => (
                <Link
                  key={index}
                  to={`/category/${cuisine.name.toLowerCase()}`}
                  className="group relative overflow-hidden rounded-xl bg-white/40 backdrop-blur-md border border-gray-200/60 hover:border-[#FF6B35]/40 shadow-sm hover:shadow-lg transition-all duration-200 transform hover:scale-[1.03]"
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${cuisine.color} opacity-0 group-hover:opacity-8 transition-opacity duration-200`}></div>

                  {/* Content */}
                  <div className="relative p-5 text-center">
                    <div className="text-4xl mb-2 transform group-hover:scale-110 transition-transform duration-200">
                      {cuisine.icon}
                    </div>
                    <h3 className="text-base font-semibold text-gray-800">{cuisine.name}</h3>
                    <p className="text-xs text-gray-600 mt-0.5">view menu</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Quick Links - More Casual */}
            <div className="mt-6 space-y-2">
              <Link
                to="/category/pizza"
                className="block w-full bg-white/30 backdrop-blur-md rounded-lg p-3 border border-gray-200/50 hover:bg-white/50 hover:border-[#FF6B35]/25 hover:shadow-sm transition-all text-gray-800 text-center text-sm font-medium"
              >
                🍕 Pizza
              </Link>
              <Link
                to="/category/burger"
                className="block w-full bg-white/30 backdrop-blur-md rounded-lg p-3 border border-gray-200/50 hover:bg-white/50 hover:border-[#FF6B35]/25 hover:shadow-sm transition-all text-gray-800 text-center text-sm font-medium"
              >
                🍔 Burgers
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Hint - More Subtle */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden lg:block">
        <div className="flex flex-col items-center gap-1.5 text-gray-400">
          <span className="text-[10px] uppercase tracking-wide">scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-gray-300 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundParallax;
