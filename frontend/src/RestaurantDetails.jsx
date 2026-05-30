import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { restaurantData } from './restaurantData';
import { useCart } from './CartContext';
import { Star, Clock, Heart, Search, Utensils, Sparkles, Plus, Minus, X, Check } from 'lucide-react';

const RestaurantDetails = () => {
  const { name } = useParams();
  const [filter, setFilter] = useState('');
  const [showVeg, setShowVeg] = useState(false);
  const [showNonVeg, setShowNonVeg] = useState(false);
  const [activeCategory, setActiveCategory] = useState('');
  const { cartItems, addToCart, removeFromCart } = useCart();

  // Customizer Modal States
  const [customizerItem, setCustomizerItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState('Regular');
  const [selectedAddons, setSelectedAddons] = useState([]);

  const categoryRefs = useRef({});

  // Slug or Name matching
  const slug = name.toLowerCase().replace(/\s+/g, '-');
  const restaurant = restaurantData.find(
    (r) => r.name.toLowerCase().replace(/\s+/g, '-') === slug || r.name === name
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!restaurant) {
    return (
      <div className="p-16 text-center bg-[#FFFBF0] min-h-screen pt-32">
        <p className="text-2xl text-red-500 font-bold mb-4">Restaurant not found.</p>
        <Link to="/all-restaurants" className="text-[#FF6B35] font-extrabold hover:underline">
          Go back to All Restaurants
        </Link>
      </div>
    );
  }

  // Group Menu Items
  const menuCategories = ['Starters', 'Main Course', 'Desserts', 'Beverages'];
  
  // Filter menu items
  const getFilteredItems = (category) => {
    return restaurant.menu.filter((item) => {
      if (item.category !== category) return false;
      if (filter && !item.name.toLowerCase().includes(filter.toLowerCase())) return false;
      if (showVeg && !item.isVeg) return false;
      if (showNonVeg && item.isVeg) return false;
      return true;
    });
  };

  const getQuantity = (itemId) => {
    if (!Array.isArray(cartItems)) return 0;
    const item = cartItems.find((i) => i.id === itemId);
    return item ? item.quantity : 0;
  };

  // Scroll to Category
  const scrollToCategory = (category) => {
    setActiveCategory(category);
    const element = categoryRefs.current[category];
    if (element) {
      const headerOffset = 110;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Customizer Helper: Sizes & Addons config
  const sizes = [
    { name: 'Regular', price: 0 },
    { name: 'Medium', price: 60 },
    { name: 'Large', price: 120 }
  ];

  const addons = [
    { name: 'Extra Cheese', price: 40 },
    { name: 'Extra Topping/Meat', price: 70 },
    { name: 'Spicy Seasoning', price: 15 }
  ];

  const handleOpenCustomizer = (item) => {
    // Only customize Starters or Main Course, others added directly
    if (item.category === 'Main Course' || item.category === 'Starters') {
      setCustomizerItem(item);
      setSelectedSize('Regular');
      setSelectedAddons([]);
    } else {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        isVeg: item.isVeg
      });
    }
  };

  const handleAddonToggle = (addonName) => {
    if (selectedAddons.includes(addonName)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== addonName));
    } else {
      setSelectedAddons([...selectedAddons, addonName]);
    }
  };

  const handleAddCustomizedToCart = () => {
    const sizeObj = sizes.find((s) => s.name === selectedSize);
    const addonsObj = addons.filter((a) => selectedAddons.includes(a.name));
    
    const sizePrice = sizeObj ? sizeObj.price : 0;
    const addonsPrice = addonsObj.reduce((sum, a) => sum + a.price, 0);
    const finalPrice = customizerItem.price + sizePrice + addonsPrice;

    // Create unique ID for customized configuration
    const customId = `${customizerItem.id}-${selectedSize}-${selectedAddons.sort().join('-')}`;
    const customName = `${customizerItem.name} (${selectedSize})${
      selectedAddons.length > 0 ? ` + [${selectedAddons.join(', ')}]` : ''
    }`;

    addToCart({
      id: customId,
      name: customName,
      price: finalPrice,
      image: customizerItem.image,
      isVeg: customizerItem.isVeg
    });

    setCustomizerItem(null);
  };

  return (
    <main className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-br from-[#FFFBF0] via-[#FFF8E1] to-[#FFF5E6]">
      {/* Background Cover Overlay */}
      <div 
        className="absolute inset-0 opacity-10 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `url('${restaurant.image}')`,
        }}
      ></div>
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-[1] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-600 font-medium">
          <Link to="/" className="hover:text-[#FF6B35] transition">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/all-restaurants" className="hover:text-[#FF6B35] transition">All Restaurants</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-semibold">{restaurant.name}</span>
        </nav>

        {/* Restaurant Profile Banner */}
        <section className="bg-white/75 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 overflow-hidden mb-10 flex flex-col md:flex-row items-stretch">
          <div className="md:w-1/3 relative min-h-[250px] md:min-h-auto">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
            {restaurant.pureVeg && (
              <div className="absolute top-4 left-4 bg-emerald-500 text-white font-extrabold text-xs uppercase px-3 py-1.5 rounded-full shadow-md">
                Pure Veg 🟢
              </div>
            )}
          </div>
          <div className="p-8 md:w-2/3 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                <h1 className="text-3xl sm:text-4xl font-serif font-black text-gray-800">{restaurant.name}</h1>
                <div className="flex items-center gap-1.5 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-xl text-sm font-black shadow-sm">
                  <Star className="w-4 h-4 fill-emerald-800 text-emerald-800" />
                  {restaurant.rating}
                  <span className="text-xs font-semibold text-emerald-600">({restaurant.reviewsCount}+ ratings)</span>
                </div>
              </div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-3">
                {restaurant.cuisine} • {restaurant.categories.join(', ')}
              </p>
              <p className="text-gray-650 text-base leading-relaxed mb-6 max-w-2xl">{restaurant.description}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-gray-150 pt-5 text-gray-600 text-sm font-bold">
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <Clock className="w-5 h-5 text-[#FF6B35]" />
                <div className="text-center sm:text-left">
                  <span className="block text-xs text-gray-400">DELIVERY TIME</span>
                  <span>{restaurant.deliveryTime} mins</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2 border-x border-gray-200 px-4">
                <Utensils className="w-5 h-5 text-[#FF6B35]" />
                <div className="text-center sm:text-left">
                  <span className="block text-xs text-gray-400">COST FOR TWO</span>
                  <span>₹{restaurant.costForTwo}</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2 pl-2">
                <Sparkles className="w-5 h-5 text-[#FF6B35]" />
                <div className="text-center sm:text-left">
                  <span className="block text-xs text-gray-400">OFFER RATE</span>
                  <span>50% OFF</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Menu Section Grid (Sidebar Navigation + Menu List) */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Sidebar Nav */}
          <aside className="w-full lg:w-1/4 bg-white/70 backdrop-blur-md rounded-3xl p-6 border border-white/50 shadow-md sticky top-28 z-20">
            <h3 className="text-sm font-extrabold text-gray-400 uppercase tracking-widest mb-4">Categories</h3>
            <ul className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 pb-2 lg:pb-0">
              {menuCategories.map((cat, idx) => {
                const count = getFilteredItems(cat).length;
                return (
                  <li key={idx} className="whitespace-nowrap lg:w-full">
                    <button
                      onClick={() => scrollToCategory(cat)}
                      className={`flex justify-between items-center w-full px-4 py-3 rounded-xl text-sm font-bold text-left transition-all ${
                        activeCategory === cat
                          ? 'bg-[#FF6B35] text-white shadow-md'
                          : 'hover:bg-white text-gray-700 hover:text-[#FF6B35]'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ml-3 ${
                        activeCategory === cat ? 'bg-white text-[#FF6B35]' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {count}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Menu Filters */}
            <div className="border-t border-gray-150 pt-5 mt-5 hidden lg:block">
              <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-3">Preferences</h3>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={showVeg}
                    onChange={() => { setShowVeg(!showVeg); setShowNonVeg(false); }}
                    className="w-4 h-4 rounded text-[#FF6B35] focus:ring-[#FF6B35]"
                  />
                  <span>Veg Only 🟢</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-bold text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={showNonVeg}
                    onChange={() => { setShowNonVeg(!showNonVeg); setShowVeg(false); }}
                    className="w-4 h-4 rounded text-red-500 focus:ring-red-500"
                  />
                  <span>Non-Veg Only 🔴</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Menu Items Area */}
          <div className="w-full lg:w-3/4 flex flex-col gap-8">
            
            {/* Search Bar inside Menu */}
            <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 p-4 shadow-sm flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-grow w-full">
                <input
                  type="text"
                  placeholder="Search dishes inside menu..."
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] bg-white text-sm font-semibold"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              <div className="flex gap-2 w-full sm:w-auto lg:hidden">
                <button
                  onClick={() => { setShowVeg(!showVeg); setShowNonVeg(false); }}
                  className={`flex-grow px-3 py-2 rounded-xl border text-xs font-black transition-all ${
                    showVeg ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white text-gray-700 border-gray-200'
                  }`}
                >
                  Veg 🟢
                </button>
                <button
                  onClick={() => { setShowNonVeg(!showNonVeg); setShowVeg(false); }}
                  className={`flex-grow px-3 py-2 rounded-xl border text-xs font-black transition-all ${
                    showNonVeg ? 'bg-red-500 text-white border-red-500' : 'bg-white text-gray-700 border-gray-200'
                  }`}
                >
                  Non-Veg 🔴
                </button>
              </div>
            </div>

            {/* Render Category Blocks */}
            {menuCategories.map((category, catIdx) => {
              const items = getFilteredItems(category);
              if (items.length === 0) return null;
              return (
                <div
                  key={catIdx}
                  ref={(el) => (categoryRefs.current[category] = el)}
                  className="bg-white/60 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/40 shadow-md"
                >
                  <h2 className="text-2xl font-serif font-black text-gray-800 border-b border-gray-100 pb-4 mb-6">
                    {category}
                  </h2>
                  <div className="flex flex-col gap-6">
                    {items.map((item, idx) => {
                      const quantity = getQuantity(item.id);
                      return (
                        <div
                          key={idx}
                          className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-gray-100 last:border-b-0 last:pb-0 gap-4"
                        >
                          <div className="flex-grow max-w-xl">
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className={`w-4 h-4 flex items-center justify-center border text-[9px] font-bold ${
                                item.isVeg ? 'border-emerald-500 text-emerald-500' : 'border-red-500 text-red-500'
                              }`}>
                                {item.isVeg ? '🟢' : '🔴'}
                              </span>
                              <h4 className="text-lg font-extrabold text-gray-800">{item.name}</h4>
                            </div>
                            
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-sm font-black text-[#FF6B35]">₹{item.price}</span>
                              <div className="flex items-center gap-0.5 text-xs text-amber-500 font-bold bg-amber-50 px-1.5 py-0.5 rounded">
                                <Star className="w-3 h-3 fill-amber-500" />
                                {item.rating}
                              </div>
                            </div>
                            
                            <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{item.description}</p>
                          </div>

                          {/* Image & Buttons */}
                          <div className="relative w-full sm:w-32 h-28 rounded-2xl overflow-hidden shadow-sm flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/10"></div>
                            
                            {/* Quantity Controls */}
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 w-24">
                              {quantity === 0 ? (
                                <button
                                  onClick={() => handleOpenCustomizer(item)}
                                  className="w-full bg-[#FF6B35] hover:bg-[#FF8C42] text-white font-extrabold text-xs py-1.5 px-3 rounded-lg shadow-md transition-all flex items-center justify-center gap-1"
                                >
                                  <Plus className="w-3.5 h-3.5" /> ADD
                                </button>
                              ) : (
                                <div className="flex items-center justify-between bg-white text-gray-800 font-bold rounded-lg px-1 py-1 shadow-md border border-gray-100">
                                  <button
                                    onClick={() => removeFromCart({ id: item.id })}
                                    className="hover:bg-gray-100 text-red-500 w-6 h-6 flex items-center justify-center rounded"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="text-xs">{quantity}</span>
                                  <button
                                    onClick={() => handleOpenCustomizer(item)}
                                    className="hover:bg-gray-100 text-[#FF6B35] w-6 h-6 flex items-center justify-center rounded"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Customizer Modal */}
      {customizerItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-white/20 animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="relative h-44">
              <img
                src={customizerItem.image}
                alt={customizerItem.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent"></div>
              <button
                onClick={() => setCustomizerItem(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-all"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 text-white">
                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded mr-2 ${
                  customizerItem.isVeg ? 'bg-emerald-500' : 'bg-red-500'
                }`}>
                  {customizerItem.isVeg ? 'Veg' : 'Non-Veg'}
                </span>
                <h3 className="text-xl font-extrabold mt-1">{customizerItem.name}</h3>
                <p className="text-xs text-gray-300">Base Price: ₹{customizerItem.price}</p>
              </div>
            </div>

            {/* Customizations Body */}
            <div className="p-6 max-h-[300px] overflow-y-auto">
              
              {/* Sizes Selection */}
              <div className="mb-6">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Choose Size (Required)</h4>
                <div className="flex flex-col gap-2">
                  {sizes.map((s, idx) => (
                    <label
                      key={idx}
                      className={`flex justify-between items-center px-4 py-3 rounded-xl border cursor-pointer font-semibold text-sm transition-all ${
                        selectedSize === s.name
                          ? 'border-[#FF6B35] bg-[#FF6B35]/5 text-gray-800'
                          : 'border-gray-150 hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="size"
                          value={s.name}
                          checked={selectedSize === s.name}
                          onChange={() => setSelectedSize(s.name)}
                          className="w-4 h-4 text-[#FF6B35] focus:ring-[#FF6B35]"
                        />
                        <span>{s.name}</span>
                      </div>
                      <span className="text-xs text-gray-500 font-bold">
                        {s.price > 0 ? `+ ₹${s.price}` : 'Free'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Addons Selection */}
              <div>
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Add Extra Toppings</h4>
                <div className="flex flex-col gap-2">
                  {addons.map((addon, idx) => {
                    const checked = selectedAddons.includes(addon.name);
                    return (
                      <label
                        key={idx}
                        className={`flex justify-between items-center px-4 py-3 rounded-xl border cursor-pointer font-semibold text-sm transition-all ${
                          checked
                            ? 'border-emerald-500 bg-emerald-500/5 text-gray-800'
                            : 'border-gray-150 hover:bg-gray-50 text-gray-600'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => handleAddonToggle(addon.name)}
                            className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500"
                          />
                          <span>{addon.name}</span>
                        </div>
                        <span className="text-xs text-gray-500 font-bold">+ ₹{addon.price}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Total Footer */}
            <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-400 block font-bold">TOTAL PRICE</span>
                <span className="text-2xl font-black text-[#FF6B35]">
                  ₹
                  {customizerItem.price +
                    sizes.find((s) => s.name === selectedSize).price +
                    addons.filter((a) => selectedAddons.includes(a.name)).reduce((sum, a) => sum + a.price, 0)}
                </span>
              </div>
              <button
                onClick={handleAddCustomizedToCart}
                className="bg-[#FF6B35] hover:bg-[#FF8C42] text-white px-6 py-3 rounded-2xl font-extrabold text-sm shadow-md hover:shadow-lg transition-all"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default RestaurantDetails;
