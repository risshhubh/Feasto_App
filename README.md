
# 🍽️ Feasto_App - Your Ultimate Food Delivery Experience

Feasto is a fully responsive, modern food delivery web application designed to elevate the dining experience for users and streamline the ordering process. With intuitive design, dynamic features, and smooth interactions, Feasto offers a seamless journey from craving to checkout.  

🚀 **Live Demo**: [Feasto Web App](https://risshhubh.github.io/Feasto_App/)

---

## 📸 Preview

![Feasto App Preview](https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg)

---

## ✨ Features

- 🔐 **Google Authentication** (Login / Signup with Firebase Auth)
- 📍 **Real-Time Location Access** to suggest nearby restaurants
- 🛍️ **Dynamic Cart System** with quantity control and item tracking
- 🍔 **Interactive Restaurant Menus** with ratings, pricing, and images
- 📦 **Category-wise Menu Filtering** (Pizza, Chinese, Burgers, etc.)
- 💳 **Razorpay Payment Gateway** Integration for real transactions
- 🌙 **Light & Dark Mode** Toggle
- 📱 **Fully Responsive Design** for mobile, tablet, and desktop
- 🔎 **Search Functionality** with live results from all menu items
- 🧭 **Sleek Navigation Bar** with animated scroll and category jump
- 💬 **Smooth Animations & Parallax Effects** throughout the site

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, Framer Motion  
- **State Management**: Redux Toolkit, Context API  
- **Backend**: Firebase (Auth, Hosting)  
- **Payment Integration**: Razorpay  
- **Maps & Location**: HTML Geolocation API  
- **Images**: Pexels API for menu items & Unsplash for hero sections

---

## 📂 Project Structure

Feasto_App/
├── public/
│   ├── index.html
│   └── favicon.ico
│
├── src/
│   ├── assets/                     # Images, icons, logos, etc.
│   │   └── background.jpg
│
│   ├── components/                # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── RestaurantCard.jsx
│   │   ├── MenuItemCard.jsx
│   │   ├── CartIcon.jsx
│   │   ├── SearchBar.jsx
│   │   └── ThemeToggle.jsx
│
│   ├── pages/                     # Full page components
│   │   ├── HomePage.jsx
│   │   ├── AllRestaurantsPage.jsx
│   │   ├── CategoryPage.jsx
│   │   ├── RestaurantDetailsPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── LoginPage.jsx
│   │   └── CheckoutPage.jsx
│
│   ├── redux/                     # Redux Toolkit store and slices
│   │   ├── store.js
│   │   ├── cartSlice.js
│   │   └── restaurantSlice.js
│
│   ├── context/                   # React Contexts (if used alongside Redux)
│   │   └── ThemeContext.jsx
│
│   ├── data/                      # Static restaurant/menu data
│   │   ├── restaurantData.js
│   │   └── menuData.js
│
│   ├── hooks/                     # Custom React hooks
│   │   └── useGeoLocation.js
│
│   ├── App.jsx                    # Root App component
│   ├── main.jsx                   # Entry point
│   ├── index.css                  # Global styles
│   └── firebase.js                # Firebase config
│
├── .env                           # Environment variables
├── .gitignore
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md

---

🔒 Environment Variables

Create a .env file in the root and add the following:

VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_RAZORPAY_KEY=your_razorpay_key


---

📌 Future Enhancements

🛵 Add real-time delivery tracking with Map APIs

📧 Order status notification via Email or SMS

⭐ Ratings and reviews system

🍽️ Admin dashboard for restaurant owners



---

🙌 Contributing

Contributions, suggestions, and forks are welcome!
Just fork the repo, make your changes, and submit a pull request 🚀


---

📄 License

MIT © Rishabh Srivastava


---

🔗 Connect with Me

🔗 LinkedIn

💼 Portfolio

📧 rishabhsrivastava921@gmail.com
