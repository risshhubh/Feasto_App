import {
  Search,
  MapPin,
  ShoppingCart,
  ChevronRight,
  ChevronDown,
  UserCircle,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useCart } from './CartContext';

const Header = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [locationText, setLocationText] = useState('Fetching...');
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef();
  const navigate = useNavigate();
  const { cartItems } = useCart();

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
    const storedUser = localStorage.getItem('feastoUser');
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, [localStorage.getItem('feastoUser')]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          if (data.address) {
            const { city, town, village, state, country } = data.address;
            const location = city || town || village || state || country;
            setLocationText(location || 'Unknown Location');
          } else {
            setLocationText('Location Unavailable');
          }
        } catch {
          setLocationText('Error Fetching Location');
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

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleMobileSearchClick = () => {
    alert('Open mobile search input/modal here.');
  };

  const handleCartClick = () => {
    navigate('/checkout');
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 text-white transition-all duration-300 ${
        scrolled
          ? 'bg-black/80 shadow-md py-2 backdrop-blur-md'
          : 'bg-black/40 py-4 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 group-hover:scale-105 transition-transform duration-300">
            Feasto
          </div>
          <span className="text-2xl">🍴</span>
        </Link>

        {/* Location */}
        <div className="hidden md:flex items-center space-x-1 hover:text-yellow-400 cursor-pointer text-sm ml-4">
          <MapPin size={18} />
          <span>Deliver to</span>
          <span className="font-medium text-yellow-300">{locationText}</span>
          <ChevronRight size={14} />
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-grow items-center bg-white/10 rounded-full px-4 py-2 max-w-xl mx-auto w-full">
          <input
            type="text"
            placeholder="Search for restaurants or dishes..."
            className="flex-grow bg-transparent outline-none text-sm text-white placeholder-white/70"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearchSubmit();
            }}
          />
          <button
            className="text-white ml-2"
            onClick={handleSearchSubmit}
          >
            <Search size={18} />
          </button>
        </div>

        {/* Cart & Auth */}
        <div className="flex items-center gap-4 ml-auto">
          <button
            onClick={handleMobileSearchClick}
            className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <Search size={20} className="text-white" />
          </button>

          <button
            onClick={handleCartClick}
            className="p-2 rounded-full hover:bg-white/10 transition-colors relative"
          >
            <ShoppingCart size={22} className="text-white" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-[10px] font-bold rounded-full px-1.5 py-0.5">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </button>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 text-white hover:text-yellow-300 transition"
              >
                <UserCircle size={24} />
                <ChevronDown size={16} />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-md shadow-lg z-50 text-black">
                  <div className="px-4 py-2 text-sm text-gray-600 border-b">{user.name}</div>
                  <Link to="/about" className="block px-4 py-2 text-sm hover:bg-yellow-100">About Us</Link>
                  <Link to="/help" className="block px-4 py-2 text-sm hover:bg-yellow-100">Help</Link>
                  <Link to="/orders/issues" className="block px-4 py-2 text-sm hover:bg-yellow-100">Order Related Issues</Link>
                  <div className="border-t" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-yellow-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-sm">
              <Link
                to="/login"
                className="text-white font-medium hover:text-yellow-300 transition"
              >
                Login
              </Link>
              <span className="text-white/50">|</span>
              <Link
                to="/signup"
                className="text-black bg-yellow-300 hover:bg-yellow-400 px-4 py-1.5 rounded-full font-semibold transition"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
