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
  const mobileMenuRef = useRef();
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

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!mobileOpen) return;
    const handleClickOutside = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileOpen]);

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
        scrolled 
          ? 'bg-[#1A1A1A] shadow-lg py-2 backdrop-blur-lg border-b border-white/5' 
          : 'bg-[#1A1A1A]/80 py-3 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link 
            to="/" 
            className="flex items-center gap-2 sm:gap-3 group focus:outline-none focus:ring-2 focus:ring-[#FF6B35] rounded-lg p-1 -ml-1" 
            aria-label="Feasto home"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-[#FF6B35] shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
              <span className="text-lg sm:text-xl">🍴</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-xl sm:text-2xl font-serif font-bold text-[#FF6B35] group-hover:scale-105 transition-transform duration-300 leading-tight">
                Feasto
              </div>
              <div className="text-[10px] sm:text-xs text-white/70 -mt-0.5 font-medium">
                Delicious food, delivered
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop: Location + Search Bar */}
        <div className="hidden lg:flex items-center gap-4 flex-1 max-w-4xl mx-6">
          {/* Location */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
            <MapPin size={18} className="text-[#FFD23F] group-hover:scale-110 transition-transform" />
            <div className="flex flex-col">
              <span className="text-[10px] text-white/60 uppercase tracking-wide">Deliver to</span>
              <span className="text-sm font-semibold text-[#FFD23F] leading-tight">{locationText}</span>
            </div>
            <ChevronRight size={14} className="text-white/40 group-hover:text-white/60 transition-colors" />
          </div>

          {/* Search Bar */}
          <div className="flex-1 relative">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 pl-4 flex items-center">
                <Search size={18} className="text-white/60" />
              </div>
              <input
                type="text"
                placeholder="Search restaurants, dishes or cuisines..."
                className="w-full pl-11 pr-12 py-2.5 rounded-full text-sm bg-white/10 backdrop-blur-sm border border-white/10 placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] focus:bg-white/15 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearchSubmit();
                }}
                aria-label="Search"
              />
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#FF6B35] text-white rounded-full p-2 hover:bg-[#FF8C42] active:scale-95 transition-all shadow-md hover:shadow-lg"
                onClick={handleSearchSubmit}
                aria-label="Execute search"
              >
                <Search size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile: Compact Search (shown when menu is closed) */}
        {!mobileOpen && (
          <div className="flex-1 lg:hidden mx-2 max-w-xs">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                <Search size={16} className="text-white/60" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-9 py-2 rounded-full text-sm bg-white/8 backdrop-blur-sm border border-white/10 placeholder-white/50 text-white outline-none focus:ring-2 focus:ring-[#FF6B35] focus:bg-white/12 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearchSubmit();
                }}
                aria-label="Mobile search"
              />
              {searchQuery && (
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-white/10 transition-colors"
                  onClick={handleSearchSubmit}
                  aria-label="Search"
                >
                  <Search size={14} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Cart Button */}
          <button
            onClick={handleCartClick}
            className="relative p-2.5 rounded-full hover:bg-white/10 active:scale-95 transition-all group"
            aria-label="Cart"
            title="View cart"
          >
            <ShoppingCart size={22} className="text-white group-hover:scale-110 transition-transform" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FF6B35] text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-lg animate-pulse">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </button>

          {/* Desktop: Auth / Profile */}
          {user ? (
            <div className="relative hidden sm:block" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors group"
                aria-label="User menu"
              >
                <UserCircle size={22} className="text-white group-hover:text-[#FFD23F] transition-colors" />
                <ChevronDown 
                  size={14} 
                  className={`text-white/60 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} 
                />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white">
                    <div className="text-sm font-semibold">{user.name}</div>
                    <div className="text-xs text-white/80 mt-0.5">{user.email}</div>
                  </div>
                  <div className="py-1">
                    <Link 
                      to="/about" 
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#FF6B35]/10 hover:text-[#FF6B35] transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      About Us
                    </Link>
                    <Link 
                      to="/help" 
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#FF6B35]/10 hover:text-[#FF6B35] transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Help
                    </Link>
                    <Link 
                      to="/orders/issues" 
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#FF6B35]/10 hover:text-[#FF6B35] transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Order Related Issues
                    </Link>
                  </div>
                  <div className="border-t border-gray-100" />
                  <button 
                    onClick={handleLogout} 
                    className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <Link 
                to="/login" 
                className="px-4 py-2 rounded-lg text-white font-medium hover:text-[#FFD23F] hover:bg-white/5 transition-all"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="px-4 py-2 rounded-lg bg-[#FF6B35] text-white font-semibold hover:bg-[#FF8C42] shadow-md hover:shadow-lg active:scale-95 transition-all"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden p-2.5 rounded-lg hover:bg-white/10 active:scale-95 transition-all"
            onClick={() => setMobileOpen((s) => !s)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X size={24} className="text-white" />
            ) : (
              <Menu size={24} className="text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div 
        ref={mobileMenuRef} 
        className={`sm:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          mobileOpen 
            ? 'max-h-[600px] opacity-100' 
            : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-6 pt-4 bg-[#1A1A1A] border-t border-white/10 backdrop-blur-lg">
          {/* Mobile Location */}
          <div className="mb-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5">
              <MapPin size={18} className="text-[#FFD23F]" />
              <div className="flex-1">
                <div className="text-[10px] text-white/60 uppercase tracking-wide">Deliver to</div>
                <div className="text-sm font-semibold text-[#FFD23F]">{locationText}</div>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <nav className="space-y-1">
            <Link 
              to="/all-restaurants" 
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 active:bg-white/15 transition-colors text-white font-medium"
              onClick={() => setMobileOpen(false)}
            >
              <span className="text-lg">🍽️</span>
              <span>All Restaurants</span>
            </Link>
            <Link 
              to="/featured/The%20Italian%20Spoon" 
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 active:bg-white/15 transition-colors text-white font-medium"
              onClick={() => setMobileOpen(false)}
            >
              <span className="text-lg">⭐</span>
              <span>Featured</span>
            </Link>
            <Link 
              to="/about" 
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 active:bg-white/15 transition-colors text-white font-medium"
              onClick={() => setMobileOpen(false)}
            >
              <span className="text-lg">ℹ️</span>
              <span>About</span>
            </Link>
            <Link 
              to="/help" 
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 active:bg-white/15 transition-colors text-white font-medium"
              onClick={() => setMobileOpen(false)}
            >
              <span className="text-lg">❓</span>
              <span>Help</span>
            </Link>
            <Link 
              to="/checkout" 
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 active:bg-white/15 transition-colors text-white font-medium"
              onClick={() => setMobileOpen(false)}
            >
              <span className="text-lg">🛒</span>
              <span>Cart</span>
              {cartItems.length > 0 && (
                <span className="ml-auto bg-[#FF6B35] text-white text-xs font-bold rounded-full px-2 py-0.5">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile Auth */}
          {user ? (
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="px-4 py-2 mb-2">
                <div className="text-sm font-semibold text-white">{user.name}</div>
                <div className="text-xs text-white/60">{user.email}</div>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileOpen(false);
                }}
                className="w-full px-4 py-3 rounded-lg bg-red-600/20 text-red-400 font-semibold hover:bg-red-600/30 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
              <Link
                to="/login"
                className="block px-4 py-3 rounded-lg bg-white/10 text-white text-center font-semibold hover:bg-white/15 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block px-4 py-3 rounded-lg bg-[#FF6B35] text-white text-center font-semibold hover:bg-[#FF8C42] transition-colors shadow-lg"
                onClick={() => setMobileOpen(false)}
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
