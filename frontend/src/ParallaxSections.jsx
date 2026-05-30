// src/components/ParallaxSections.jsx
import React from 'react';
import './Parallax.css';

const ParallaxSections = () => {
  return (
    <div className="parallax-wrapper">
      {/* 🍽️ Section 1 */}
      <section className="parallax parallax-hero">
        <div className="overlay">
          <h1 className="title">Delight Delivered</h1>
          <p className="subtitle">Your favorite meals at your doorstep</p>
        </div>
      </section>

      {/* 🍕 Section 2 */}
      <section className="content-section">
        <h2 className="section-heading">Explore Diverse Cuisines</h2>
        <p className="section-text">
          From spicy Indian curries to Italian pastas and sizzling Chinese noodles, we've got it all.
        </p>
      </section>

      {/* 🥗 Section 3 */}
      <section className="parallax parallax-flavors">
        <div className="overlay">
          <h1 className="title">Feel the Flavor</h1>
        </div>
      </section>

      {/* 🍰 Section 4 */}
      <section className="content-section">
        <h2 className="section-heading">Satisfy Your Sweet Cravings</h2>
        <p className="section-text">
          Treat yourself with decadent desserts, creamy shakes, and baked delights.
        </p>
      </section>

      {/* 🍔 Section 5 */}
      <section className="parallax parallax-burger">
        <div className="overlay">
          <h1 className="title">Bite into Happiness</h1>
        </div>
      </section>
    </div>
  );
};

export default ParallaxSections;
