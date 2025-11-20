import {
  Search,
  MapPin,
  ShoppingCart,
  ChevronRight,
  ChevronDown,
  UserCircle,
  Menu,
  X,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useCart } from './CartContext';

const Header = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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
    navigator.geolocation?.getCurrentPosition(
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
      setMobileOpen(false);
    }
  };

  const handleCartClick = () => {
    navigate('/checkout');
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 text-white transition-all duration-300 ${
        scrolled ? 'bg-black/80 shadow-md py-2 backdrop-blur-md' : 'bg-black/40 py-4 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo: mark + wordmark */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3 group focus:outline-none" aria-label="Feasto home">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-tr from-yellow-400 via-orange-400 to-red-500 shadow-md">
              <span className="text-sm">🍴</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 group-hover:scale-105 transition-transform duration-300">Feasto</div>
              <div className="text-xs text-white/60 -mt-0.5">Delicious food, delivered</div>
            </div>
          </Link>
        </div>

        {/* Desktop: location + search (hidden on small) */}
        <div className="hidden md:flex items-center space-x-4 flex-1 mx-4">
          <div className="flex items-center space-x-1 hover:text-yellow-400 cursor-pointer text-sm">
            <MapPin size={18} />
            <span className="text-sm">Deliver to</span>
            <span className="font-medium text-yellow-300">{locationText}</span>
            <ChevronRight size={14} />
          </div>

          <div className="flex-grow">
            <div className="relative max-w-xl mx-auto w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center text-white/80">
                <Search size={16} />
              </div>
              <input
                type="text"
                placeholder="Search restaurants, dishes or cuisines"
                className="w-full pl-10 pr-10 py-2 rounded-full text-sm bg-white/8 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-shadow backdrop-blur-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearchSubmit();
                }}
                aria-label="Search"
              />
              <button
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-yellow-400 text-black rounded-full p-1.5 hover:bg-yellow-300 shadow-sm"
                onClick={handleSearchSubmit}
                aria-label="Execute search"
              >
                <Search size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile: compact search shown outside the hamburger */}
        <div className="flex-1 md:hidden mx-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search restaurants or dishes"
              className="w-full pl-4 pr-10 py-2 rounded-full text-sm bg-white/6 placeholder-white/60 text-white outline-none focus:ring-2 focus:ring-yellow-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearchSubmit();
              }}
              aria-label="Mobile quick search"
            />
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md hover:bg-white/10"
              onClick={handleSearchSubmit}
              aria-label="Search"
            >
              <Search size={16} />
            </button>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
            {/* Cart */}
          <button
            onClick={handleCartClick}
            className="p-2 rounded-full hover:bg-white/10 transition-colors relative"
            aria-label="Cart"
            title="View cart"
          >
            <ShoppingCart size={22} className="text-white" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-[11px] font-semibold rounded-full px-2 py-0.5 shadow">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </button>

          {/* Auth / Profile */}
          {user ? (
            <div className="relative hidden sm:block" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 text-white hover:text-yellow-300 transition"
                aria-label="User menu"
              >
                <UserCircle size={20} />
                <ChevronDown size={14} />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-50 text-black">
                  <div className="px-4 py-2 text-sm text-gray-600 border-b">{user.name}</div>
                  <Link to="/about" className="block px-4 py-2 text-sm hover:bg-yellow-100">About Us</Link>
                  <Link to="/help" className="block px-4 py-2 text-sm hover:bg-yellow-100">Help</Link>
                  <Link to="/orders/issues" className="block px-4 py-2 text-sm hover:bg-yellow-100">Order Related Issues</Link>
                  <div className="border-t" />
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-yellow-100">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center space-x-3 text-sm">
              <Link to="/login" className="text-white font-medium hover:text-yellow-300 transition">Login</Link>
              <Link to="/signup" className="inline-flex items-center gap-2 text-black bg-yellow-300 hover:bg-yellow-400 px-3 py-1 rounded-full font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-yellow-400">Sign Up</Link>
            </div>
          )}

          {/* Mobile menu button (moved to right) */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-white/10"
            onClick={() => setMobileOpen((s) => !s)}
            aria-label="Toggle menu"
            title="Open menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu panel */}
      </div>

        <div className={`md:hidden transition-all duration-300 ease-in-out ${mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <div className="px-4 pb-4 pt-2 bg-black/70 backdrop-blur-sm border-t border-white/5">
          <nav className="mt-1 space-y-2">
            <Link to="/all-restaurants" className="block px-3 py-2 rounded-md hover:bg-white/5">All Restaurants</Link>
            <Link to="/featured" className="block px-3 py-2 rounded-md hover:bg-white/5">Featured</Link>
            <Link to="/about" className="block px-3 py-2 rounded-md hover:bg-white/5">About</Link>
            <Link to="/help" className="block px-3 py-2 rounded-md hover:bg-white/5">Help</Link>
            <Link to="/checkout" className="block px-3 py-2 rounded-md hover:bg-white/5">Cart</Link>
            {!user && (
              <div className="pt-2">
                <Link to="/login" className="block px-3 py-2 rounded-md bg-yellow-300 text-black text-center font-semibold">Login / Sign Up</Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
