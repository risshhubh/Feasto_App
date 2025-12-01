// App.jsx
import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import HomePage from './HomePage';
const Login = lazy(() => import('./Login'));
const Signup = lazy(() => import('./SignUp'));
import RestaurantDetails from './RestaurantDetails';
import AllRestaurants from './AllRestaurant';
import CategoryPage from './CategoryPage';
import FeaturedRestaurantMenu from './FeaturedRestaurantMenu';
import CheckoutPage from './CheckoutPage';
import AboutUs from './AboutUs';
import Help from './Help';
import OrderIssues from './OrderIssues';
import { ReactLenis } from 'lenis/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchResults from './SearchResults';
import ProtectedRoute from './ProtectedRoute';
import { menuData } from './menuData'; // Adjust path if necessary

function App() {
  return (
    <ReactLenis root>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Suspense fallback={<div>Loading...</div>}><Login /></Suspense>} />
        <Route path="/signup" element={<Suspense fallback={<div>Loading...</div>}><Signup /></Suspense>} />
        <Route path="/restaurant/:name" element={<RestaurantDetails />} />
        <Route path="/all-restaurants" element={<AllRestaurants />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/featured/:name" element={<FeaturedRestaurantMenu />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/help" element={<Help />} />
        <Route
          path="/orders/issues"
          element={
            <ProtectedRoute>
              <OrderIssues />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </ReactLenis>
  );
}

export default App;
