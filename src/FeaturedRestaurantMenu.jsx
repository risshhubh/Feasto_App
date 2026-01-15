import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from './CartContext'; // or correct relative path


const menuItemsData = {
  'The Italian Spoon': [
    { name: 'Spaghetti Carbonara', description: 'Creamy pasta with pancetta', image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg', price: 389 },
    { name: 'Margherita Pizza', description: 'Classic tomato, basil and mozzarella', image: 'https://images.pexels.com/photos/4109122/pexels-photo-4109122.jpeg', price: 299 },
    { name: 'Lasagna', description: 'Layered pasta with meat and cheese', image: 'https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg', price: 379 },
    { name: 'Bruschetta', description: 'Toasted bread with tomato and basil', image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg', price: 149 },
    { name: 'Fettuccine Alfredo', description: 'Pasta in rich Alfredo sauce', image: 'https://images.pexels.com/photos/803963/pexels-photo-803963.jpeg', price: 349 },
    { name: 'Risotto ai Funghi', description: 'Creamy mushroom risotto', image: 'https://images.pexels.com/photos/1306543/pexels-photo-1306543.jpeg', price: 399 },
    { name: 'Caprese Salad', description: 'Fresh tomatoes, mozzarella, and basil', image: 'https://images.pexels.com/photos/2233348/pexels-photo-2233348.jpeg', price: 249 },
    { name: 'Gnocchi Pomodoro', description: 'Potato dumplings with tomato sauce', image: 'https://images.pexels.com/photos/1460873/pexels-photo-1460873.jpeg', price: 329 },
    { name: 'Tiramisu', description: 'Coffee-flavored Italian dessert', image: 'https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg', price: 199 },
    { name: 'Panna Cotta', description: 'Creamy dessert with berry topping', image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg', price: 179 },
  ],
  'Spicy Sichuan': [
    { name: 'Mapo Tofu', description: 'Tofu in spicy Sichuan sauce', image: 'https://images.pexels.com/photos/4198023/pexels-photo-4198023.jpeg', price: 249 },
    { name: 'Kung Pao Chicken', description: 'Chicken with peanuts and chili', image: 'https://images.pexels.com/photos/4106485/pexels-photo-4106485.jpeg', price: 329 },
    { name: 'Dan Dan Noodles', description: 'Spicy noodles with minced pork', image: 'https://images.pexels.com/photos/1111304/pexels-photo-1111304.jpeg', price: 229 },
    { name: 'Twice Cooked Pork', description: 'Pork belly cooked twice for flavor', image: 'https://images.pexels.com/photos/699544/pexels-photo-699544.jpeg', price: 359 },
    { name: 'Sichuan Hot Pot', description: 'Spicy and flavorful broth pot', image: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg', price: 599 },
    { name: 'Chongqing Chicken', description: 'Crispy chili chicken', image: 'https://images.pexels.com/photos/792032/pexels-photo-792032.jpeg', price: 299 },
    { name: 'Dry-Fried Green Beans', description: 'Green beans stir-fried with garlic', image: 'https://images.pexels.com/photos/3641643/pexels-photo-3641643.jpeg', price: 189 },
    { name: 'Sichuan Eggplant', description: 'Braised eggplant in spicy sauce', image: 'https://images.pexels.com/photos/1715326/pexels-photo-1715326.jpeg', price: 199 },
    { name: 'Wontons in Chili Oil', description: 'Pork wontons in hot chili oil', image: 'https://images.pexels.com/photos/5409010/pexels-photo-5409010.jpeg', price: 229 },
    { name: 'Sichuan Cold Noodles', description: 'Chilled noodles with sesame sauce', image: 'https://images.pexels.com/photos/4144234/pexels-photo-4144234.jpeg', price: 199 },
  ],
  'Bombay Biryani House': [
    { name: 'Chicken Biryani', description: 'Spiced chicken layered with rice', image: 'https://images.pexels.com/photos/1117863/pexels-photo-1117863.jpeg', price: 299 },
    { name: 'Mutton Biryani', description: 'Tender lamb with saffron rice', image: 'https://images.pexels.com/photos/64775/pexels-photo-64775.jpeg', price: 379 },
    { name: 'Veg Biryani', description: 'Mixed vegetable biryani', image: 'https://images.pexels.com/photos/3681647/pexels-photo-3681647.jpeg', price: 249 },
    { name: 'Egg Biryani', description: 'Biryani with boiled eggs', image: 'https://images.pexels.com/photos/693749/pexels-photo-693749.jpeg', price: 199 },
    { name: 'Fish Biryani', description: 'Spicy fish with fragrant rice', image: 'https://images.pexels.com/photos/4125795/pexels-photo-4125795.jpeg', price: 349 },
    { name: 'Paneer Tikka Biryani', description: 'Paneer grilled and mixed with biryani', image: 'https://images.pexels.com/photos/3967282/pexels-photo-3967282.jpeg', price: 329 },
    { name: 'Hyderabadi Biryani', description: 'Authentic Hyderabadi-style biryani', image: 'https://images.pexels.com/photos/1291772/pexels-photo-1291772.jpeg', price: 399 },
    { name: 'Kolkata Biryani', description: 'Biryani with potatoes and egg', image: 'https://images.pexels.com/photos/4669264/pexels-photo-4669264.jpeg', price: 339 },
    { name: 'Raita', description: 'Yogurt side with cucumber and spices', image: 'https://images.pexels.com/photos/3535385/pexels-photo-3535385.jpeg', price: 89 },
    { name: 'Gulab Jamun', description: 'Soft syrupy sweet dessert', image: 'https://images.pexels.com/photos/4791260/pexels-photo-4791260.jpeg', price: 129 },
  ],
  'Burger Bazaar': [
    { name: 'Classic Cheeseburger', description: 'Beef patty with cheese', image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg', price: 249 },
    { name: 'Bacon Double', description: 'Double patties with crispy bacon', image: 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg', price: 349 },
    { name: 'Veggie Delight', description: 'Grilled veggie patty and toppings', image: 'https://images.pexels.com/photos/1435896/pexels-photo-1435896.jpeg', price: 219 },
    { name: 'Spicy Chicken Burger', description: 'Crispy spicy chicken patty', image: 'https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg', price: 259 },
    { name: 'BBQ Burger', description: 'Smoky BBQ sauce and onions', image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg', price: 279 },
    { name: 'Mushroom Swiss Burger', description: 'Mushrooms and Swiss cheese', image: 'https://images.pexels.com/photos/3758136/pexels-photo-3758136.jpeg', price: 289 },
    { name: 'Sliders', description: 'Mini burgers trio', image: 'https://images.pexels.com/photos/1335781/pexels-photo-1335781.jpeg', price: 199 },
    { name: 'Fries', description: 'Crispy golden fries', image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg', price: 99 },
    { name: 'Onion Rings', description: 'Crispy deep-fried rings', image: 'https://images.pexels.com/photos/2347312/pexels-photo-2347312.jpeg', price: 119 },
    { name: 'Milkshake', description: 'Thick and creamy shake', image: 'https://images.pexels.com/photos/302680/pexels-photo-302680.jpeg', price: 149 },
  ],
  'Taco Fiesta': [
    { name: 'Chicken Tacos', description: 'Grilled chicken in soft shell', image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg', price: 199 },
    { name: 'Beef Tacos', description: 'Seasoned beef and salsa', image: 'https://images.pexels.com/photos/461246/pexels-photo-461246.jpeg', price: 229 },
    { name: 'Fish Tacos', description: 'Crispy fish and slaw', image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg', price: 219 },
    { name: 'Veggie Tacos', description: 'Avocado, beans and corn', image: 'https://images.pexels.com/photos/1657222/pexels-photo-1657222.jpeg', price: 179 },
    { name: 'Carnitas', description: 'Slow-cooked pork tacos', image: 'https://images.pexels.com/photos/461246/pexels-photo-461246.jpeg', price: 249 },
    { name: 'Nachos', description: 'Loaded chips with cheese and salsa', image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg', price: 179 },
    { name: 'Guacamole', description: 'Creamy avocado dip', image: 'https://images.pexels.com/photos/461428/pexels-photo-461428.jpeg', price: 149 },
    { name: 'Quesadilla', description: 'Cheesy stuffed tortilla', image: 'https://images.pexels.com/photos/461428/pexels-photo-461428.jpeg', price: 189 },
    { name: 'Churros', description: 'Fried dough with cinnamon', image: 'https://images.pexels.com/photos/461428/pexels-photo-461428.jpeg', price: 99 },
    { name: 'Jarritos', description: 'Mexican fruit soda', image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg', price: 69 },
  ],
  'Sushi Central': [
    { name: 'California Roll', description: 'Crab, avocado, and cucumber', image: 'https://images.pexels.com/photos/3577566/pexels-photo-3577566.jpeg', price: 399 },
    { name: 'Spicy Tuna Roll', description: 'Tuna with spicy mayo', image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg', price: 429 },
    { name: 'Salmon Nigiri', description: 'Fresh salmon on rice', image: 'https://images.pexels.com/photos/3577566/pexels-photo-3577566.jpeg', price: 349 },
    { name: 'Eel Roll', description: 'Eel with sweet sauce', image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg', price: 419 },
    { name: 'Tempura Roll', description: 'Crispy shrimp tempura roll', image: 'https://images.pexels.com/photos/3577566/pexels-photo-3577566.jpeg', price: 379 },
    { name: 'Rainbow Roll', description: 'Colorful mix of fish', image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg', price: 459 },
    { name: 'Miso Soup', description: 'Savory broth with tofu and seaweed', image: 'https://images.pexels.com/photos/5409010/pexels-photo-5409010.jpeg', price: 89 },
    { name: 'Edamame', description: 'Steamed soybeans', image: 'https://images.pexels.com/photos/3577566/pexels-photo-3577566.jpeg', price: 99 },
    { name: 'Seaweed Salad', description: 'Seasoned seaweed with sesame', image: 'https://images.pexels.com/photos/5409010/pexels-photo-5409010.jpeg', price: 129 },
    { name: 'Green Tea Mochi', description: 'Sweet rice dessert with green tea flavor', image: 'https://images.pexels.com/photos/5409010/pexels-photo-5409010.jpeg', price: 139 },
  ]};
  
const FeaturedRestaurantMenu = () => {
  const { name } = useParams();
  const { cartItems, addToCart, removeFromCart } = useCart();

  const menuItems = menuItemsData[name] || [];

  const getItemQuantity = (itemName) => {
    const item = cartItems.find((i) => i.id === `${name}-${itemName}`);
    return item ? item.quantity : 0;
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#FFFBF0] via-[#FFF8E1] to-[#FFF5E6] pt-28 pb-16">
      {/* Subtle Background Pattern */}
      <div 
        className="absolute inset-0 opacity-20 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg')`,
        }}
      ></div>
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-[1]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-600">
          <Link to="/" className="hover:text-[#FF6B35] transition">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">{name}</span>
        </nav>

        {/* Restaurant Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-800 mb-3">{name}</h1>
          <p className="text-gray-600 text-lg">Explore our delicious menu</p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, idx) => {
            const id = `${name}-${item.name}`;
            const quantity = getItemQuantity(item.name);
            return (
              <div
                key={idx}
                className="group bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 overflow-hidden shadow-md hover:shadow-xl hover:border-[#FF6B35]/30 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold text-[#FF6B35]">₹{item.price}</span>
                  </div>

                  {quantity > 0 ? (
                    <div className="flex items-center justify-center gap-3 bg-gray-50 rounded-xl p-2">
                      <button
                        className="bg-[#FF6B6B] text-white w-8 h-8 rounded-lg hover:bg-[#FF8C8C] transition-all font-bold"
                        onClick={() => removeFromCart({ ...item, id })}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        −
                      </button>
                      <span className="font-bold text-gray-800 text-lg min-w-[30px] text-center">{quantity}</span>
                      <button
                        className="bg-[#FF6B35] text-white w-8 h-8 rounded-lg hover:bg-[#FF8C42] transition-all font-bold"
                        onClick={() => addToCart({ ...item, id })}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="w-full bg-[#FF6B35] text-white font-semibold py-2.5 px-4 rounded-xl hover:bg-[#FF8C42] transition-all shadow-md hover:shadow-lg"
                      onClick={() => addToCart({ ...item, id })}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeaturedRestaurantMenu;