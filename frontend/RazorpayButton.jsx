// src/components/RazorpayButton.jsx
import React from "react";

const RazorpayButton = ({ amount = 200 }) => {
  const loadRazorpay = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => openRazorpayPopup();
    script.onerror = () => alert("Failed to load Razorpay SDK");
    document.body.appendChild(script);
  };

  const openRazorpayPopup = () => {
    const options = {
      key: "rzp_test_XXXXXXXXXXXXXXXX", // Replace with your Key ID
      amount: amount * 100, // Amount in paise (₹200 = 20000)
      currency: "INR",
      name: "Feasto",
      description: "Test Transaction",
      handler: function (response) {
        alert("✅ Payment Successful!");
        console.log(response);
      },
      prefill: {
        name: "Test User",
        email: "testuser@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#10b981",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button
      onClick={loadRazorpay}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Pay ₹{amount}
    </button>
  );
};

export default RazorpayButton;
