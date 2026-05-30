import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, Star, Truck } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/all-restaurants');
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1A1A1A] via-[#2D2D2D] to-[#1A1A1A] pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Food Icons */}
        <div className="absolute top-20 left-10 text-6xl opacity-10 animate-float" style={{ animationDelay: '0s' }}>🍕</div>
        <div className="absolute top-40 right-20 text-7xl opacity-10 animate-float" style={{ animationDelay: '1s' }}>🍔</div>
        <div className="absolute bottom-32 left-1/4 text-8xl opacity-10 animate-float" style={{ animationDelay: '2s' }}>🍜</div>
        <div className="absolute bottom-20 right-1/3 text-6xl opacity-10 animate-float" style={{ animationDelay: '1.5s' }}>🍣</div>
        <div className="absolute top-1/2 left-1/2 text-9xl opacity-5 animate-pulse">🍽️</div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#FF6B35]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FFD23F]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto w-full z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6B35]/20 border border-[#FF6B35]/30 backdrop-blur-sm">
              <Star className="w-4 h-4 text-[#FFD23F] fill-[#FFD23F]" />
              <span className="text-sm font-semibold text-[#FFD23F]">Trusted by 50K+ Food Lovers</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold leading-tight">
              <span className="block text-white">Dine Like</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#FFD23F]">
                Royalty
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Experience premium cuisine from top-rated restaurants — delivered fresh to your doorstep with style and speed.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={handleExploreClick}
                className="group inline-flex items-center justify-center gap-2 bg-[#FF6B35] text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-[#FF8C42] hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
              >
                <span>Explore Restaurants</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/featured/The%20Italian%20Spoon')}
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white font-semibold py-4 px-8 rounded-xl border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300"
              >
                <Star className="w-5 h-5 text-[#FFD23F] fill-[#FFD23F]" />
                <span>Featured Restaurants</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div className="text-center lg:text-left">
                <div className="text-3xl sm:text-4xl font-bold text-[#FF6B35] mb-1">500+</div>
                <div className="text-sm text-gray-400">Restaurants</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl sm:text-4xl font-bold text-[#FF6B35] mb-1">30min</div>
                <div className="text-sm text-gray-400">Avg Delivery</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl sm:text-4xl font-bold text-[#FF6B35] mb-1">4.8★</div>
                <div className="text-sm text-gray-400">Rating</div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Elements */}
          <div className="relative hidden lg:block">
            {/* Food Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Card 1 */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-[#FF6B35]/50 transition-all transform hover:scale-105">
                  <div className="text-5xl mb-3">🍕</div>
                  <div className="text-white font-semibold mb-1">Italian</div>
                  <div className="text-sm text-gray-400">Authentic flavors</div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="relative group mt-8">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFD23F] to-[#FF6B35] rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-[#FFD23F]/50 transition-all transform hover:scale-105">
                  <div className="text-5xl mb-3">🍔</div>
                  <div className="text-white font-semibold mb-1">American</div>
                  <div className="text-sm text-gray-400">Classic comfort</div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B6B] to-[#FF6B35] rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-[#FF6B6B]/50 transition-all transform hover:scale-105">
                  <div className="text-5xl mb-3">🍜</div>
                  <div className="text-white font-semibold mb-1">Asian</div>
                  <div className="text-sm text-gray-400">Exotic tastes</div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="relative group mt-8">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF8C42] to-[#FFD23F] rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-[#FF8C42]/50 transition-all transform hover:scale-105">
                  <div className="text-5xl mb-3">🍣</div>
                  <div className="text-white font-semibold mb-1">Japanese</div>
                  <div className="text-sm text-gray-400">Fresh & premium</div>
                </div>
              </div>
            </div>

            {/* Floating Feature Badges */}
            <div className="absolute -top-4 -right-4 bg-[#FF6B35] text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-bounce" style={{ animationDuration: '2s' }}>
              <Clock className="w-4 h-4" />
              <span className="text-sm font-semibold">Fast Delivery</span>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-[#FFD23F] text-[#1A1A1A] px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
              <Truck className="w-4 h-4" />
              <span className="text-sm font-semibold">Free Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block">
        <div className="flex flex-col items-center gap-2 text-white/60 animate-bounce">
          <span className="text-sm">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
