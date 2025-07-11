import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapPin, Search, ShoppingCart, UserCircle, ChevronDown, ChevronRight } from 'lucide-react';
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
      <Header />
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
                className="px-5 py-2 rounded-full border text-sm font-medium transition-all duration-200 bg-white text-gray-700 border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-950"
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

const Header = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [locationText, setLocationText] = useState('Fetching...');
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('feastoUser');
    if (storedUser) setUser(JSON.parse(storedUser));

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          const { city, town, village, state, country } = data.address;
          const location = city || town || village || state || country;
          setLocationText(location || 'Unknown Location');
        } catch {
          setLocationText('Location Unavailable');
        }
      },
      () => setLocationText('Permission Denied')
    );
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('feastoUser');
    setUser(null);
    setDropdownOpen(false);
    navigate('/');
  };

  const handleMobileSearchClick = () => alert('Open mobile search input/modal here.');

  const handleCartClick = () => navigate('/checkout');

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 text-white transition-all duration-300 ${
        scrolled ? 'bg-black/80 shadow-md py-2 backdrop-blur-md' : 'bg-black/40 py-4 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 group-hover:scale-105 transition-transform duration-300">
            Feasto
          </div>
          <span className="text-2xl">🍴</span>
        </Link>

        <div className="hidden md:flex items-center space-x-1 hover:text-yellow-400 cursor-pointer text-sm ml-4">
          <MapPin size={18} />
          <span>Deliver to</span>
          <span className="font-medium text-yellow-300">{locationText}</span>
          <ChevronRight size={14} />
        </div>

        <div className="hidden md:flex flex-grow items-center bg-white/10 rounded-full px-4 py-2 max-w-xl mx-auto w-full">
          <Search className="text-white mr-3" size={18} />
          <input
            type="text"
            placeholder="Search for restaurants or dishes..."
            className="flex-grow bg-transparent outline-none text-sm text-white placeholder-white/70"
          />
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <button onClick={handleMobileSearchClick} className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors">
            <Search size={20} className="text-white" />
          </button>

          <button onClick={handleCartClick} className="p-2 rounded-full hover:bg-white/10 transition-colors relative">
            <ShoppingCart size={22} className="text-white" />
          </button>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2 text-white hover:text-yellow-300 transition">
                <UserCircle size={24} />
                <ChevronDown size={16} />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-50 text-black">
                  <div className="px-4 py-2 text-sm text-gray-600 border-b">{user.name}</div>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-yellow-100">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/signup"
              className="text-white bg-yellow-500 hover:bg-yellow-600 px-4 py-1.5 rounded text-sm font-medium"
            >
              Sign Up
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default FoodCategory;