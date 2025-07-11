// App.jsx
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import HomePage from './HomePage';
import Login from './Login';
import Signup from './SignUp';
import RestaurantDetails from './RestaurantDetails';
import AllRestaurants from './AllRestaurant';
import CategoryPage from './CategoryPage';
import FeaturedRestaurantMenu from './FeaturedRestaurantMenu';
import CheckoutPage from './CheckoutPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchResults from './SearchResults';
import { menuData } from './menuData'; // Adjust path if necessary




function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/restaurant/:name" element={<RestaurantDetails />} />
        <Route path="/all-restaurants" element={<AllRestaurants />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/featured/:name" element={<FeaturedRestaurantMenu />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
