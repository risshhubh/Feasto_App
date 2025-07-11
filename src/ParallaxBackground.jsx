// src/components/BackgroundParallax.jsx
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Parallax.css';

const BackgroundParallax = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="relative h-[100vh] overflow-hidden">
      <div className="parallax-bg absolute inset-0 z-0" />

      <div className="relative z-10 flex flex-col items-center justify-center text-white text-center h-full px-4">
        <h1
          className="text-5xl font-bold mb-4 drop-shadow-lg"
          data-aos="fade-down"
        >
          Welcome to Feasto 🍽️
        </h1>
        <p
          className="text-xl max-w-2xl drop-shadow"
          data-aos="fade-up"
        >
          Explore top-rated restaurants, delicious meals, and your perfect food journey.
        </p>
      </div>
    </div>
  );
};

export default BackgroundParallax;
