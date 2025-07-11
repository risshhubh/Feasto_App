// src/pages/CheckoutPage.jsx
import React from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cartItems, clearCart, incrementItem, decrementItem } = useCart();
  const navigate = useNavigate();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const gst = +(subtotal * 0.05).toFixed(2);
  const totalPrice = +(subtotal + gst).toFixed(2);

  const handleMockPayment = () => {
    setTimeout(() => {
      alert("✅ Payment successful! Thank you for ordering from Feasto 🍽️");
      clearCart();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

        {cartItems.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600 text-lg mb-4">🛒 Your cart is empty!</p>
            <button
              onClick={() => navigate(-1)}
              className="text-white bg-yellow-400 hover:bg-yellow-500 px-5 py-2 rounded-full text-sm font-medium transition cursor-pointer"
            >
              Back to Previous Page
            </button>
          </div>
        ) : (
          <>
            <ul className="divide-y divide-gray-200 mb-6">
              {cartItems.map((item, index) => (
                <li key={index} className="py-4 flex justify-between items-center">
                  <div className="flex flex-col">
                    <h3 className="font-semibold">{item.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => decrementItem(item.id)}
                        className="bg-red-500 text-white rounded px-2 py-0.5 hover:bg-red-600"
                      >
                        −
                      </button>
                      <span className="text-sm font-medium text-gray-700">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => incrementItem(item.id)}
                        className="bg-green-500 text-white rounded px-2 py-0.5 hover:bg-green-600"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <span className="font-semibold">₹{item.price * item.quantity}</span>
                </li>
              ))}
            </ul>

            <div className="flex justify-between text-md mb-2">
              <span>Subtotal:</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-md mb-2">
              <span>GST (5%):</span>
              <span>₹{gst}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total:</span>
              <span>₹{totalPrice}</span>
            </div>

            <div className="mt-6 flex justify-between gap-4 flex-wrap">
              <button
                onClick={clearCart}
                className="bg-red-200 hover:bg-red-300 text-black px-6 py-2 rounded-full font-semibold transition cursor-pointer"
              >
                Clear Cart
              </button>
              <button
                onClick={() => navigate(-1)}
                className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded-full font-semibold transition cursor-pointer"
              >
                Back to Previous Page
              </button>
              <button
                onClick={handleMockPayment}
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-full font-semibold transition cursor-pointer"
              >
                Make Payment
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;