import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from './CartContext'; // or correct relative path


const menuItemsData = {
  'The Italian Spoon': [
    { name: 'Spaghetti Carbonara', description: 'Creamy pasta with pancetta', image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg', },
    { name: 'Margherita Pizza', description: 'Classic tomato, basil and mozzarella', image: 'https://images.pexels.com/photos/4109122/pexels-photo-4109122.jpeg' },
    { name: 'Lasagna', description: 'Layered pasta with meat and cheese', image: 'https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg' },
    { name: 'Bruschetta', description: 'Toasted bread with tomato and basil', image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg' },
    { name: 'Fettuccine Alfredo', description: 'Pasta in rich Alfredo sauce', image: 'https://images.pexels.com/photos/803963/pexels-photo-803963.jpeg' },
    { name: 'Risotto ai Funghi', description: 'Creamy mushroom risotto', image: 'https://images.pexels.com/photos/1306543/pexels-photo-1306543.jpeg' },
    { name: 'Caprese Salad', description: 'Fresh tomatoes, mozzarella, and basil', image: 'https://images.pexels.com/photos/2233348/pexels-photo-2233348.jpeg' },
    { name: 'Gnocchi Pomodoro', description: 'Potato dumplings with tomato sauce', image: 'https://images.pexels.com/photos/1460873/pexels-photo-1460873.jpeg' },
    { name: 'Tiramisu', description: 'Coffee-flavored Italian dessert', image: 'https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg' },
    { name: 'Panna Cotta', description: 'Creamy dessert with berry topping', image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg' },
  ],
  'Spicy Sichuan': [
    { name: 'Mapo Tofu', description: 'Tofu in spicy Sichuan sauce', image: 'https://images.pexels.com/photos/4198023/pexels-photo-4198023.jpeg' },
    { name: 'Kung Pao Chicken', description: 'Chicken with peanuts and chili', image: 'https://images.pexels.com/photos/4106485/pexels-photo-4106485.jpeg' },
    { name: 'Dan Dan Noodles', description: 'Spicy noodles with minced pork', image: 'https://images.pexels.com/photos/1111304/pexels-photo-1111304.jpeg' },
    { name: 'Twice Cooked Pork', description: 'Pork belly cooked twice for flavor', image: 'https://images.pexels.com/photos/699544/pexels-photo-699544.jpeg' },
    { name: 'Sichuan Hot Pot', description: 'Spicy and flavorful broth pot', image: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg' },
    { name: 'Chongqing Chicken', description: 'Crispy chili chicken', image: 'https://images.pexels.com/photos/792032/pexels-photo-792032.jpeg' },
    { name: 'Dry-Fried Green Beans', description: 'Green beans stir-fried with garlic', image: 'https://images.pexels.com/photos/3641643/pexels-photo-3641643.jpeg' },
    { name: 'Sichuan Eggplant', description: 'Braised eggplant in spicy sauce', image: 'https://images.pexels.com/photos/1715326/pexels-photo-1715326.jpeg' },
    { name: 'Wontons in Chili Oil', description: 'Pork wontons in hot chili oil', image: 'https://images.pexels.com/photos/5409010/pexels-photo-5409010.jpeg' },
    { name: 'Sichuan Cold Noodles', description: 'Chilled noodles with sesame sauce', image: 'https://images.pexels.com/photos/4144234/pexels-photo-4144234.jpeg' },
  ],
  'Bombay Biryani House': [
    { name: 'Chicken Biryani', description: 'Spiced chicken layered with rice', image: 'https://images.pexels.com/photos/1117863/pexels-photo-1117863.jpeg' },
    { name: 'Mutton Biryani', description: 'Tender lamb with saffron rice', image: 'https://images.pexels.com/photos/64775/pexels-photo-64775.jpeg' },
    { name: 'Veg Biryani', description: 'Mixed vegetable biryani', image: 'https://images.pexels.com/photos/3681647/pexels-photo-3681647.jpeg' },
    { name: 'Egg Biryani', description: 'Biryani with boiled eggs', image: 'https://images.pexels.com/photos/693749/pexels-photo-693749.jpeg' },
    { name: 'Fish Biryani', description: 'Spicy fish with fragrant rice', image: 'https://images.pexels.com/photos/4125795/pexels-photo-4125795.jpeg' },
    { name: 'Paneer Tikka Biryani', description: 'Paneer grilled and mixed with biryani', image: 'https://images.pexels.com/photos/3967282/pexels-photo-3967282.jpeg' },
    { name: 'Hyderabadi Biryani', description: 'Authentic Hyderabadi-style biryani', image: 'https://images.pexels.com/photos/1291772/pexels-photo-1291772.jpeg' },
    { name: 'Kolkata Biryani', description: 'Biryani with potatoes and egg', image: 'https://images.pexels.com/photos/4669264/pexels-photo-4669264.jpeg' },
    { name: 'Raita', description: 'Yogurt side with cucumber and spices', image: 'https://images.pexels.com/photos/3535385/pexels-photo-3535385.jpeg' },
    { name: 'Gulab Jamun', description: 'Soft syrupy sweet dessert', image: 'https://images.pexels.com/photos/4791260/pexels-photo-4791260.jpeg' },
  ],
  'Burger Bazaar': [
    { name: 'Classic Cheeseburger', description: 'Beef patty with cheese', image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg' },
    { name: 'Bacon Double', description: 'Double patties with crispy bacon', image: 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg' },
    { name: 'Veggie Delight', description: 'Grilled veggie patty and toppings', image: 'https://images.pexels.com/photos/1435896/pexels-photo-1435896.jpeg' },
    { name: 'Spicy Chicken Burger', description: 'Crispy spicy chicken patty', image: 'https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg' },
    { name: 'BBQ Burger', description: 'Smoky BBQ sauce and onions', image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg' },
    { name: 'Mushroom Swiss Burger', description: 'Mushrooms and Swiss cheese', image: 'https://images.pexels.com/photos/3758136/pexels-photo-3758136.jpeg' },
    { name: 'Sliders', description: 'Mini burgers trio', image: 'https://images.pexels.com/photos/1335781/pexels-photo-1335781.jpeg' },
    { name: 'Fries', description: 'Crispy golden fries', image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg' },
    { name: 'Onion Rings', description: 'Crispy deep-fried rings', image: 'https://images.pexels.com/photos/2347312/pexels-photo-2347312.jpeg' },
    { name: 'Milkshake', description: 'Thick and creamy shake', image: 'https://images.pexels.com/photos/302680/pexels-photo-302680.jpeg' },
  ],
  'Taco Fiesta': [
    { name: 'Chicken Tacos', description: 'Grilled chicken in soft shell', image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg' },
    { name: 'Beef Tacos', description: 'Seasoned beef and salsa', image: 'https://images.pexels.com/photos/461246/pexels-photo-461246.jpeg' },
    { name: 'Fish Tacos', description: 'Crispy fish and slaw', image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg' },
    { name: 'Veggie Tacos', description: 'Avocado, beans and corn', image: 'https://images.pexels.com/photos/1657222/pexels-photo-1657222.jpeg' },
    { name: 'Carnitas', description: 'Slow-cooked pork tacos', image: 'https://images.pexels.com/photos/461246/pexels-photo-461246.jpeg' },
    { name: 'Nachos', description: 'Loaded chips with cheese and salsa', image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg' },
    { name: 'Guacamole', description: 'Creamy avocado dip', image: 'https://images.pexels.com/photos/461428/pexels-photo-461428.jpeg' },
    { name: 'Quesadilla', description: 'Cheesy stuffed tortilla', image: 'https://images.pexels.com/photos/461428/pexels-photo-461428.jpeg' },
    { name: 'Churros', description: 'Fried dough with cinnamon', image: 'https://images.pexels.com/photos/461428/pexels-photo-461428.jpeg' },
    { name: 'Jarritos', description: 'Mexican fruit soda', image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg' },
  ],
  'Sushi Central': [
    { name: 'California Roll', description: 'Crab, avocado, and cucumber', image: 'https://images.pexels.com/photos/3577566/pexels-photo-3577566.jpeg' },
    { name: 'Spicy Tuna Roll', description: 'Tuna with spicy mayo', image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg' },
    { name: 'Salmon Nigiri', description: 'Fresh salmon on rice', image: 'https://images.pexels.com/photos/3577566/pexels-photo-3577566.jpeg' },
    { name: 'Eel Roll', description: 'Eel with sweet sauce', image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg' },
    { name: 'Tempura Roll', description: 'Crispy shrimp tempura roll', image: 'https://images.pexels.com/photos/3577566/pexels-photo-3577566.jpeg' },
    { name: 'Rainbow Roll', description: 'Colorful mix of fish', image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg' },
    { name: 'Miso Soup', description: 'Savory broth with tofu and seaweed', image: 'https://images.pexels.com/photos/5409010/pexels-photo-5409010.jpeg' },
    { name: 'Edamame', description: 'Steamed soybeans', image: 'https://images.pexels.com/photos/3577566/pexels-photo-3577566.jpeg' },
    { name: 'Seaweed Salad', description: 'Seasoned seaweed with sesame', image: 'https://images.pexels.com/photos/5409010/pexels-photo-5409010.jpeg' },
    { name: 'Green Tea Mochi', description: 'Sweet rice dessert with green tea flavor', image: 'https://images.pexels.com/photos/5409010/pexels-photo-5409010.jpeg' },
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
    <div
  className="relative min-h-screen bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: `url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg')`,
    backgroundAttachment: 'fixed',
  }}
>
  <div className="absolute inset-0 bg-white/70 backdrop-blur-md z-0"></div>

  {/* 👇 Add padding top to give space from header */}
  <div className="relative z-10 pt-28 px-6">
    {/* Breadcrumb */}
    <nav className="mb-6 text-sm text-gray-700 font-medium space-x-2">
      <Link to="/" className="text-orange-600 hover:underline">Home</Link>
      <span>/</span>
      <Link to="/restaurants" className="text-orange-600 hover:underline">Featured Restaurants</Link>
      <span>/</span>
      <span className="text-gray-800">{name}</span>
    </nav>

    <h2 className="text-3xl font-bold mb-6 text-center">{name} Menu</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, idx) => {
            const id = `${name}-${item.name}`;
            const quantity = getItemQuantity(item.name);
            return (
              <div
                key={idx}
                className="border rounded-xl p-4 bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-md mb-3"
                  loading="lazy"
                />
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>

                {quantity > 0 ? (
                  <div className="mt-3 flex items-center justify-between">
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded-l hover:bg-red-600"
                      onClick={() => removeFromCart({ ...item, id })}
                    >
                      −
                    </button>
                    <span className="px-4 font-semibold">{quantity}</span>
                    <button
                      className="px-3 py-1 bg-green-600 text-white rounded-r hover:bg-green-700"
                      onClick={() => addToCart({ ...item, id })}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    className="mt-3 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    onClick={() => addToCart({ ...item, id })}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeaturedRestaurantMenu;