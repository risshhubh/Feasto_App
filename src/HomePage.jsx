// src/HomePage.jsx
import React from 'react';
import Header from './Header.jsx';
import HeroSection from './Herosection.jsx';
import FoodCategory from './FoodCategory.jsx';
import FeaturedRestaurants from './FeaturedRestaurants.jsx';
import Footer from './Footer.jsx';
import ScrollToTopButton from './ScrollToTopButton.jsx';
import ParallaxBackground from './ParallaxBackground.jsx';
import ParallaxSections from './ParallaxSections';


const HomePage = () => {
  return (
    <div className="min-h-screen font-sans antialiased text-gray-800 relative overflow-x-hidden">
      <ParallaxBackground />
      <div className="relative z-10 ">
        <Header />
        <main>
          <HeroSection />
          <FoodCategory />
          <FeaturedRestaurants />
        </main>
        <Footer />
        <ScrollToTopButton />
      </div>
    </div>
  );
};

export default HomePage;
