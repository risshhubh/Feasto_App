// Programmatic generator for 100 unique, realistic food delivery restaurants.
// Exports `restaurantData` with premium food imagery, reviews, details, and categorised menus.

const cuisineDetails = {
  'North Indian': {
    tags: ['Biryani', 'Curry', 'Tandoor', 'Kebabs'],
    items: [
      { name: 'Chicken Dum Biryani', desc: 'Slow-cooked aromatic basmati rice with spiced chicken, mint, and saffron.', price: 299, isVeg: false, cat: 'Main Course', img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop' },
      { name: 'Butter Chicken', desc: 'Tender chicken tikka cooked in a velvety tomato and cashew butter gravy.', price: 349, isVeg: false, cat: 'Main Course', img: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=500&auto=format&fit=crop' },
      { name: 'Paneer Butter Masala', desc: 'Soft cottage cheese cubes in a creamy, rich tomato-butter sauce.', price: 279, isVeg: true, cat: 'Main Course', img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop' },
      { name: 'Tandoori Paneer Tikka', desc: 'Charcoal-grilled cottage cheese skewers marinated in mustard oil and spices.', price: 229, isVeg: true, cat: 'Starters', img: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500&auto=format&fit=crop' },
      { name: 'Dal Makhani', desc: 'Slow-cooked black lentils enriched with cream and homemade butter.', price: 219, isVeg: true, cat: 'Main Course', img: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500&auto=format&fit=crop' },
      { name: 'Garlic Butter Naan', desc: 'Traditional clay-oven flatbread brushed with fresh garlic and butter.', price: 59, isVeg: true, cat: 'Starters', img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&auto=format&fit=crop' },
      { name: 'Kesar Rasmalai', desc: 'Delicate cheese patties soaked in saffron-flavored sweet condensed milk.', price: 119, isVeg: true, cat: 'Desserts', img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop' },
      { name: 'Sweet Lassi', desc: 'Traditional churned yogurt drink flavored with cardamom and rose water.', price: 89, isVeg: true, cat: 'Beverages', img: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500&auto=format&fit=crop' }
    ]
  },
  'South Indian': {
    tags: ['Dosa', 'Idli', 'Sambar', 'Healthy'],
    items: [
      { name: 'Masala Dosa', desc: 'Crispy fermented rice crepe filled with spiced mashed potato bhaji.', price: 139, isVeg: true, cat: 'Main Course', img: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&auto=format&fit=crop' },
      { name: 'Steamed Idli (2 Pcs)', desc: 'Soft and fluffy steamed rice cakes served with sambar and coconut chutney.', price: 79, isVeg: true, cat: 'Starters', img: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&auto=format&fit=crop' },
      { name: 'Medu Vada (2 Pcs)', desc: 'Crispy fried lentil donuts seasoned with pepper, curry leaves, and ginger.', price: 89, isVeg: true, cat: 'Starters', img: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop' },
      { name: 'Onion Uttapam', desc: 'Thick savory pancake topped with chopped onions, green chilies, and coriander.', price: 119, isVeg: true, cat: 'Main Course', img: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&auto=format&fit=crop' },
      { name: 'Rava Masala Dosa', desc: 'Semolina-based lacey, crispy crepe loaded with spiced potatoes.', price: 149, isVeg: true, cat: 'Main Course', img: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&auto=format&fit=crop' },
      { name: 'Filter Coffee', desc: 'Authentic South Indian chicory-blend coffee frothed with boiling milk.', price: 69, isVeg: true, cat: 'Beverages', img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&auto=format&fit=crop' },
      { name: 'Payasam', desc: 'Sweet milk pudding with vermicelli, cardamom, and ghee-roasted nuts.', price: 99, isVeg: true, cat: 'Desserts', img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop' }
    ]
  },
  'Chinese': {
    tags: ['Noodles', 'Manchurian', 'Dimsum', 'Spicy'],
    items: [
      { name: 'Schezwan Hakka Noodles', desc: 'Stir-fried noodles tossed in home-style spicy Schezwan sauce with veggies.', price: 189, isVeg: true, cat: 'Main Course', img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop' },
      { name: 'Veg Manchurian Gravy', desc: 'Deep-fried vegetable balls in a tangy, spicy soy-garlic gravy.', price: 219, isVeg: true, cat: 'Main Course', img: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&auto=format&fit=crop' },
      { name: 'Chili Chicken Dry', desc: 'Crispy chicken cubes tossed with bell peppers, onions, and spicy green chilies.', price: 269, isVeg: false, cat: 'Starters', img: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&auto=format&fit=crop' },
      { name: 'Steamed Veg Momos (6 Pcs)', desc: 'Thin-wrapper dumplings filled with finely chopped garden fresh veggies.', price: 129, isVeg: true, cat: 'Starters', img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&auto=format&fit=crop' },
      { name: 'Spring Rolls (4 Pcs)', desc: 'Crispy rolls stuffed with seasoned shredded vegetables and glass noodles.', price: 139, isVeg: true, cat: 'Starters', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop' },
      { name: 'Sweet Corn Soup', desc: 'Comforting, creamy soup loaded with sweet corn kernels and mild spices.', price: 99, isVeg: true, cat: 'Starters', img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=500&auto=format&fit=crop' },
      { name: 'Iced Peach Tea', desc: 'Chilled brewed black tea infused with sweet peach syrup and mint.', price: 99, isVeg: true, cat: 'Beverages', img: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=500&auto=format&fit=crop' }
    ]
  },
  'Italian': {
    tags: ['Pizza', 'Pasta', 'Lasagna', 'Gourmet'],
    items: [
      { name: 'Margherita Gourmet Pizza', desc: 'San Marzano tomato sauce, fresh mozzarella, extra virgin olive oil, and fresh basil.', price: 299, isVeg: true, cat: 'Main Course', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop' },
      { name: 'Fettuccine Alfredo', desc: 'Creamy Parmesan sauce tossed with fettuccine pasta, mushrooms, and herbs.', price: 329, isVeg: true, cat: 'Main Course', img: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=500&auto=format&fit=crop' },
      { name: 'Lasagna Classico', desc: 'Baked pasta layers loaded with rich bolognese meat sauce, béchamel, and cheese.', price: 389, isVeg: false, cat: 'Main Course', img: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=500&auto=format&fit=crop' },
      { name: 'Penne Arrabiata', desc: 'Penne pasta tossed in spicy fire-roasted tomato sauce with black olives.', price: 299, isVeg: true, cat: 'Main Course', img: 'https://images.unsplash.com/photo-1563379971899-660589a01cf3?w=500&auto=format&fit=crop' },
      { name: 'Garlic Cheese Bread', desc: 'Toasted artisan baguette slices with garlic butter and melted mozzarella.', price: 149, isVeg: true, cat: 'Starters', img: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?w=500&auto=format&fit=crop' },
      { name: 'Tiramisu Cup', desc: 'Espresso-soaked ladyfingers layered with mascarpone custard and cocoa powder.', price: 199, isVeg: true, cat: 'Desserts', img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&auto=format&fit=crop' },
      { name: 'Fresh Lime Soda', desc: 'Bubbly club soda mixed with squeezed lime juice, mint, and choice of syrup.', price: 89, isVeg: true, cat: 'Beverages', img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop' }
    ]
  },
  'American': {
    tags: ['Burgers', 'Fries', 'Fast Food'],
    items: [
      { name: 'Classic Cheese Burger', desc: 'Grilled chicken patty with cheddar cheese, lettuce, tomato, pickles, and house sauce.', price: 189, isVeg: false, cat: 'Main Course', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop' },
      { name: 'Double Veggie Burger', desc: 'Gourmet mixed vegetable and potato double patty with cheese and chipotle mayo.', price: 169, isVeg: true, cat: 'Main Course', img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop' },
      { name: 'Loaded French Fries', desc: 'Golden fries topped with warm cheese sauce, jalapenos, and spring onions.', price: 149, isVeg: true, cat: 'Starters', img: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500&auto=format&fit=crop' },
      { name: 'Crispy Onion Rings', desc: 'Panko-breaded thick onion rings deep fried and served with ranch sauce.', price: 119, isVeg: true, cat: 'Starters', img: 'https://images.unsplash.com/photo-1639024471283-2bc7b3c6a267?w=500&auto=format&fit=crop' },
      { name: 'Chocolate Fudge Shake', desc: 'Thick and creamy double chocolate shake topped with whipped cream and fudge.', price: 149, isVeg: true, cat: 'Beverages', img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&auto=format&fit=crop' },
      { name: 'Warm Apple Pie', desc: 'Classic spiced apple filling baked in flaky pastry dough, served warm.', price: 139, isVeg: true, cat: 'Desserts', img: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=500&auto=format&fit=crop' }
    ]
  },
  'Japanese': {
    tags: ['Sushi', 'Ramen', 'Asian', 'Healthy'],
    items: [
      { name: 'California Roll (8 Pcs)', desc: 'Sushi rolls loaded with fresh crab meat, avocado, cucumber, and toasted sesame.', price: 399, isVeg: false, cat: 'Main Course', img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&auto=format&fit=crop' },
      { name: 'Spicy Avocado Sushi (8 Pcs)', desc: 'Seasoned sushi rice wrapped with ripe avocado, cucumber, and spicy sriracha mayo.', price: 349, isVeg: true, cat: 'Main Course', img: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=500&auto=format&fit=crop' },
      { name: 'Miso Ramen Bowl', desc: 'Warm wheat noodles in rich miso broth with egg, tofu, corn, green onions, and bamboo shoots.', price: 329, isVeg: true, cat: 'Main Course', img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&auto=format&fit=crop' },
      { name: 'Crispy Veg Tempura', desc: 'Assorted seasonal vegetables fried in light, airy traditional tempura batter.', price: 199, isVeg: true, cat: 'Starters', img: 'https://images.unsplash.com/photo-1581184953963-d1595297593b?w=500&auto=format&fit=crop' },
      { name: 'Matcha Mochi Ice Cream', desc: 'Sweet pounded sticky rice shell enclosing a scoop of creamy green tea ice cream.', price: 149, isVeg: true, cat: 'Desserts', img: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500&auto=format&fit=crop' }
    ]
  },
  'Mexican': {
    tags: ['Tacos', 'Burrito', 'Quesadilla', 'Spicy'],
    items: [
      { name: 'Loaded Veg Burrito', desc: 'Large flour tortilla packed with cilantro rice, black beans, salsa, cheese, and guac.', price: 219, isVeg: true, cat: 'Main Course', img: 'https://images.unsplash.com/photo-1626379616459-b2ce1d9decbc?w=500&auto=format&fit=crop' },
      { name: 'Crispy Shell Tacos (3 Pcs)', desc: 'Corn shells filled with spiced beans/chicken, lettuce, fresh pico de gallo, and cheese.', price: 189, isVeg: true, cat: 'Starters', img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&auto=format&fit=crop' },
      { name: 'Cheese & Corn Quesadilla', desc: 'Folded tortilla stuffed with sweet corn, jalapenos, and loaded pepper jack cheese.', price: 179, isVeg: true, cat: 'Main Course', img: 'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?w=500&auto=format&fit=crop' },
      { name: 'Tortilla Chips & Guacamole', desc: 'House-made crispy corn tortilla chips served with fresh mashed avocado guac.', price: 149, isVeg: true, cat: 'Starters', img: 'https://images.unsplash.com/photo-1579631542720-3a87824ffd8a?w=500&auto=format&fit=crop' },
      { name: 'Cinnamon Churros (4 Pcs)', desc: 'Fried pastry dough sticks dusted in sugar and cinnamon, served with hot chocolate dip.', price: 119, isVeg: true, cat: 'Desserts', img: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=500&auto=format&fit=crop' }
    ]
  },
  'Healthy & Salads': {
    tags: ['Salads', 'Keto', 'Diet', 'Low Carb'],
    items: [
      { name: 'Quinoa Avocado Salad Bowl', desc: 'Organic tri-color quinoa, baby spinach, cucumber, cherry tomatoes, and honey lemon dressing.', price: 249, isVeg: true, cat: 'Main Course', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop' },
      { name: 'Grilled Paneer Wrap', desc: 'Whole wheat flatbread rolled with grilled paneer blocks, mixed greens, and mint Greek yogurt.', price: 189, isVeg: true, cat: 'Main Course', img: 'https://images.unsplash.com/photo-1626700051175-6518c4793f4f?w=500&auto=format&fit=crop' },
      { name: 'High Protein Salad', desc: 'Boiled chickpeas, grilled tofu, sprouts, chopped bell peppers, and sunflower seeds.', price: 199, isVeg: true, cat: 'Main Course', img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop' },
      { name: 'Detox Green Smoothie', desc: 'Freshly blended spinach, green apples, cucumber, ginger, mint, and coconut water.', price: 129, isVeg: true, cat: 'Beverages', img: 'https://images.unsplash.com/photo-1610970881699-44a5587caaec?w=500&auto=format&fit=crop' },
      { name: 'Chia Seed Fruit Pudding', desc: 'Creamy almond milk chia seed mix topped with fresh strawberries, banana, and honey.', price: 149, isVeg: true, cat: 'Desserts', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop' }
    ]
  },
  'Desserts & Bakery': {
    tags: ['Bakery', 'Cakes', 'Waffles', 'Sweet'],
    items: [
      { name: 'Blueberry Cheesecake Slice', desc: 'Rich and velvety baked New York style cheesecake with sweet blueberry compote.', price: 179, isVeg: true, cat: 'Desserts', img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&auto=format&fit=crop' },
      { name: 'Hot Fudge Chocolate Waffle', desc: 'Fresh Belgian waffle topped with hot dark fudge sauce, chocolate chips, and ice cream.', price: 159, isVeg: true, cat: 'Desserts', img: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=500&auto=format&fit=crop' },
      { name: 'Red Velvet Cupcake', desc: 'Moist red velvet sponge topped with cream cheese frosting and chocolate crumbs.', price: 89, isVeg: true, cat: 'Desserts', img: 'https://images.unsplash.com/photo-1614707267537-b85acf00c4b8?w=500&auto=format&fit=crop' },
      { name: 'Double Chocolate Fudge Brownie', desc: 'Warm fudgy brownie loaded with chocolate chunks and served with chocolate syrup.', price: 99, isVeg: true, cat: 'Desserts', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop' },
      { name: 'Chilled Mango Milkshake', desc: 'Creamy milkshake made with fresh Alphonso mango pulp and vanilla ice cream.', price: 129, isVeg: true, cat: 'Beverages', img: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=500&auto=format&fit=crop' }
    ]
  },
  'Street Food': {
    tags: ['Chaat', 'Snacks', 'Local', 'Savory'],
    items: [
      { name: 'Bombay Pav Bhaji', desc: 'Spicy mashed mixed vegetable curry loaded with butter, served with two toasted soft buns.', price: 129, isVeg: true, cat: 'Main Course', img: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop' },
      { name: 'Dahi Puri Chat (6 Pcs)', desc: 'Crispy wheat shells filled with potatoes, yogurt, sweet tamarind, and spicy mint chutneys.', price: 99, isVeg: true, cat: 'Starters', img: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop' },
      { name: 'Samosa Chaat Platter', desc: 'Crushed potato samosas topped with spicy white chickpea gravy, yogurt, and fine sev.', price: 119, isVeg: true, cat: 'Starters', img: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop' },
      { name: 'Special Cheese Vada Pav', desc: 'Spiced potato fritter inside a soft bread roll with spicy dry garlic powder and cheese slice.', price: 79, isVeg: true, cat: 'Starters', img: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop' },
      { name: 'Hot Crispy Jalebi (100g)', desc: 'Traditional pretzel-shaped flour batter deep fried and soaked in cardamom sugar syrup.', price: 89, isVeg: true, cat: 'Desserts', img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop' },
      { name: 'Cold Nimbu Paani', desc: 'Refreshing fresh lemon squeeze water with black salt, cumin spice, and sugar.', price: 59, isVeg: true, cat: 'Beverages', img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop' }
    ]
  }
};

const restaurantNames = [
  // 1-10
  { name: 'The Italian Spoon', cuisine: 'Italian' },
  { name: 'Spicy Sichuan', cuisine: 'Chinese' },
  { name: 'Bombay Biryani House', cuisine: 'North Indian' },
  { name: 'Burger Bazaar', cuisine: 'American' },
  { name: 'Taco Fiesta', cuisine: 'Mexican' },
  { name: 'Sushi Central', cuisine: 'Japanese' },
  { name: 'The Golden Spoon', cuisine: 'North Indian' },
  { name: 'Spicy Sichuan Express', cuisine: 'Chinese' },
  { name: 'Royal Tandoor', cuisine: 'North Indian' },
  { name: 'Dosa Junction', cuisine: 'South Indian' },
  { name: 'Mama Mia Pizzeria', cuisine: 'Italian' },
  { name: 'Burger Bazaar Lounge', cuisine: 'American' },
  { name: 'Dragon Palace', cuisine: 'Chinese' },
  { name: 'Dakshin Aromas', cuisine: 'South Indian' },
  { name: 'Bella Italia', cuisine: 'Italian' },
  { name: 'The Hungry Cow', cuisine: 'American' },
  { name: 'Tokyo Bites', cuisine: 'Japanese' },
  { name: 'Cantina Mexicana', cuisine: 'Mexican' },
  { name: 'Green Garden Bistro', cuisine: 'Healthy & Salads' },
  { name: 'Glazed & Confused Cake Shop', cuisine: 'Desserts & Bakery' },
  { name: 'Chowpatty Chaat Hub', cuisine: 'Street Food' },
  // 21-30
  { name: 'Midnight Dhaba', cuisine: 'North Indian' },
  { name: 'Wok & Roll', cuisine: 'Chinese' },
  { name: 'Madras Cafe', cuisine: 'South Indian' },
  { name: 'Pazzo Pasta', cuisine: 'Italian' },
  { name: 'Gourmet Grill House', cuisine: 'American' },
  { name: 'Sakura Zen', cuisine: 'Japanese' },
  { name: 'El Paso Nacho Hub', cuisine: 'Mexican' },
  { name: 'Lean & Clean Kitchen', cuisine: 'Healthy & Salads' },
  { name: 'Sugar Rush Desserts', cuisine: 'Desserts & Bakery' },
  { name: 'Chandni Chowk Samosa Corner', cuisine: 'Street Food' },
  // 31-40
  { name: 'Kashmir Palace', cuisine: 'North Indian' },
  { name: 'Red Lantern Chinese', cuisine: 'Chinese' },
  { name: 'Udupi Sri Krishna Temple Diner', cuisine: 'South Indian' },
  { name: 'The Woodfired Oven', cuisine: 'Italian' },
  { name: 'Urban Burger Co.', cuisine: 'American' },
  { name: 'Kyoto Ramen Bar', cuisine: 'Japanese' },
  { name: 'Burrito Bandit', cuisine: 'Mexican' },
  { name: 'Fit Food Factory', cuisine: 'Healthy & Salads' },
  { name: 'Heavenly Crusts', cuisine: 'Desserts & Bakery' },
  { name: 'Delhi Heights Chaat', cuisine: 'Street Food' },
  // 41-50
  { name: 'Punjab Grill Express', cuisine: 'North Indian' },
  { name: 'Great Wall Dumplings', cuisine: 'Chinese' },
  { name: 'The Idli Shala', cuisine: 'South Indian' },
  { name: 'Naples Pizzeria', cuisine: 'Italian' },
  { name: 'Route 66 Diner', cuisine: 'American' },
  { name: 'Wasabi Japanese Kitchen', cuisine: 'Japanese' },
  { name: 'Chili Peppers Grill', cuisine: 'Mexican' },
  { name: 'The Green Fork', cuisine: 'Healthy & Salads' },
  { name: 'The Waffle Palace', cuisine: 'Desserts & Bakery' },
  { name: 'Gully Boy Pav Bhaji', cuisine: 'Street Food' },
  // 51-60
  { name: 'Biryani Badshah', cuisine: 'North Indian' },
  { name: 'Dim Sum Garden', cuisine: 'Chinese' },
  { name: 'Sambar & Co.', cuisine: 'South Indian' },
  { name: 'Luigi\'s Pasta Tavern', cuisine: 'Italian' },
  { name: 'Bun & Barrel', cuisine: 'American' },
  { name: 'Osaka Street Food', cuisine: 'Japanese' },
  { name: 'Tres Amigos', cuisine: 'Mexican' },
  { name: 'Healthy Heart Cafe', cuisine: 'Healthy & Salads' },
  { name: 'Crumbs & Cream', cuisine: 'Desserts & Bakery' },
  { name: 'The Chaat Bazaar', cuisine: 'Street Food' },
  // 61-70
  { name: 'Delhi Darbar', cuisine: 'North Indian' },
  { name: 'Golden Dragon Wok', cuisine: 'Chinese' },
  { name: 'Saravana Bhavan Delight', cuisine: 'South Indian' },
  { name: 'Venezia Trattoria', cuisine: 'Italian' },
  { name: 'Downtown Sliders', cuisine: 'American' },
  { name: 'Ninja Sushi', cuisine: 'Japanese' },
  { name: 'Taco Loco', cuisine: 'Mexican' },
  { name: 'Keto Kitchen', cuisine: 'Healthy & Salads' },
  { name: 'The Sweet Spot', cuisine: 'Desserts & Bakery' },
  { name: 'Lajpat Nagar Momos & Chaat', cuisine: 'Street Food' },
  // 71-80
  { name: 'Shahi Zaika', cuisine: 'North Indian' },
  { name: 'Sichuan Sizzlers', cuisine: 'Chinese' },
  { name: 'Annapoorna Mess', cuisine: 'South Indian' },
  { name: 'Tuscany Vine Pizza', cuisine: 'Italian' },
  { name: 'Grill & Chill Diner', cuisine: 'American' },
  { name: 'Shogun Ramen', cuisine: 'Japanese' },
  { name: 'Salsa & Spice', cuisine: 'Mexican' },
  { name: 'Superfood Salads', cuisine: 'Healthy & Salads' },
  { name: 'Choco Lava Bakery', cuisine: 'Desserts & Bakery' },
  { name: 'Metro Gappa Corner', cuisine: 'Street Food' },
  // 81-90
  { name: 'Grand Mughlai', cuisine: 'North Indian' },
  { name: 'Panda Express Hub', cuisine: 'Chinese' },
  { name: 'Aroma South Indian', cuisine: 'South Indian' },
  { name: 'Roma Pizzeria', cuisine: 'Italian' },
  { name: 'The Burger Club', cuisine: 'American' },
  { name: 'Sapporo Sushi House', cuisine: 'Japanese' },
  { name: 'Habanero Kitchen', cuisine: 'Mexican' },
  { name: 'Pure & Simple Vegans', cuisine: 'Healthy & Salads' },
  { name: 'Caked & Baked', cuisine: 'Desserts & Bakery' },
  { name: 'Chaat Chatore', cuisine: 'Street Food' },
  // 91-100
  { name: 'Lazeez Bhuna & Kebabs', cuisine: 'North Indian' },
  { name: 'Shanghai Street Food', cuisine: 'Chinese' },
  { name: 'Mysore Malgudi Cafe', cuisine: 'South Indian' },
  { name: 'Trattoria Bella', cuisine: 'Italian' },
  { name: 'Smokehouse Burgers', cuisine: 'American' },
  { name: 'Sumo Ramen & Bowls', cuisine: 'Japanese' },
  { name: 'Sombrero Mexican Diner', cuisine: 'Mexican' },
  { name: 'The Salad Project', cuisine: 'Healthy & Salads' },
  { name: 'Berry & Cream Confectionery', cuisine: 'Desserts & Bakery' },
  { name: 'Mumbai Local Street Diner', cuisine: 'Street Food' }
];

const restaurantImages = [
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600', // Pizza
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600', // Burger
  'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600', // Biryani
  'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600', // Sushi
  'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600', // Tacos
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600', // Salad
  'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600', // Brownie
  'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600', // Dim sums
  'https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=600', // Pasta
  'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600'  // Dosa
];

export const restaurantData = restaurantNames.map((rest, index) => {
  const cuisineInfo = cuisineDetails[rest.cuisine];
  const imageIndex = index % restaurantImages.length;
  const rating = Number((4.0 + (index % 10) * 0.1).toFixed(1)); // Ratings between 4.0 and 4.9
  const deliveryTime = 15 + (index % 7) * 5; // Delivery time between 15 and 45 mins
  const costForTwo = 200 + (index % 5) * 150; // Cost for two between 200 and 800
  const reviewCount = 50 + (index % 15) * 65; // Reviews count
  const isPureVeg = rest.cuisine === 'South Indian' || rest.cuisine === 'Healthy & Salads' || rest.cuisine === 'Street Food' || (index % 4 === 0);
  
  // Customise menus
  const menu = cuisineInfo.items.map((dish, dishIdx) => {
    // Modify properties slightly for uniqueness
    return {
      id: `dish-${index}-${dishIdx}`,
      name: dish.name,
      description: dish.desc,
      price: dish.price + (index % 3) * 10,
      rating: Number((4.1 + (dishIdx % 9) * 0.1).toFixed(1)),
      reviews: 12 + (index % 6) * 14 + dishIdx,
      isVeg: isPureVeg ? true : dish.isVeg,
      category: dish.cat,
      image: dish.img
    };
  });

  return {
    id: `rest-${index}`,
    name: rest.name,
    cuisine: rest.cuisine,
    categories: cuisineInfo.tags,
    image: restaurantImages[imageIndex],
    rating: rating,
    reviewsCount: reviewCount,
    deliveryTime: deliveryTime,
    costForTwo: costForTwo,
    pureVeg: isPureVeg,
    featured: index < 6, // First 6 are featured
    hours: '11:00 AM - 11:00 PM',
    address: `${10 + index * 4} Foodie Boulevard, City Centre`,
    description: `Indulge in authentic ${rest.cuisine} flavors prepared by our expert chefs using fresh ingredients daily.`,
    menu: menu
  };
});
