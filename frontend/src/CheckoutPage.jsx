// src/pages/CheckoutPage.jsx
import React, { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import { useNavigate, Link } from "react-router-dom";
import { Check, Ticket, ChevronRight, MapPin, CreditCard, Shield, Clock, Phone, Bike, ShoppingBag, Plus, Minus } from "lucide-react";
import { toast } from "react-toastify";

const AVAILABLE_COUPONS = [
  { code: "FEAST50", description: "50% OFF up to ₹100", type: "percent", value: 50, max: 100 },
  { code: "FREEBACK", description: "FREE Delivery (Save ₹40)", type: "delivery", value: 40 },
  { code: "WELCOME30", description: "30% OFF up to ₹150", type: "percent", value: 30, max: 150 }
];

const CheckoutPage = () => {
  const { cartItems, clearCart, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  // Coupon states
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  // Address and payment selection
  const [address, setAddress] = useState("102, Green Meadows Apartment, Sector 4, HSR Layout, Bengaluru");
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  // Order Tracking States
  const [isTracking, setIsTracking] = useState(false);
  const [trackingStep, setTrackingStep] = useState(0); // 0: Accepted, 1: Preparing, 2: Out for Delivery, 3: Delivered

  // Subtotal & bill metrics
  const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const deliveryFee = appliedCoupon?.code === "FREEBACK" ? 0 : 40;
  const platformFee = 10;
  const gst = Math.round(subtotal * 0.05);

  // Calculate discount
  useEffect(() => {
    if (!appliedCoupon) {
      setDiscountAmount(0);
      return;
    }
    if (appliedCoupon.type === "delivery") {
      setDiscountAmount(40);
    } else if (appliedCoupon.type === "percent") {
      const computed = Math.round((subtotal * appliedCoupon.value) / 100);
      const finalDiscount = appliedCoupon.max ? Math.min(computed, appliedCoupon.max) : computed;
      setDiscountAmount(finalDiscount);
    }
  }, [appliedCoupon, subtotal]);

  const totalPayable = Math.max(0, subtotal + deliveryFee + platformFee + gst - discountAmount);

  // Handle coupon apply
  const applyCoupon = (code) => {
    const coupon = AVAILABLE_COUPONS.find(c => c.code.toUpperCase() === code.toUpperCase());
    if (coupon) {
      setAppliedCoupon(coupon);
      setCouponCode(coupon.code);
      toast.success(`Coupon ${coupon.code} applied successfully! 🎉`);
    } else {
      toast.error("Invalid Coupon Code");
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    toast.info("Coupon removed");
  };

  // Mock Order Tracking simulation
  useEffect(() => {
    if (!isTracking) return;

    const timer1 = setTimeout(() => setTrackingStep(1), 6000); // 6s to start preparing
    const timer2 = setTimeout(() => setTrackingStep(2), 15000); // 15s to out for delivery
    const timer3 = setTimeout(() => setTrackingStep(3), 26000); // 26s to deliver

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isTracking]);

  // Razorpay integration
  const handleRazorpayPayment = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      const options = {
        key: "rzp_test_I0TkSwrDjJ26jl", 
        amount: totalPayable * 100, // Amount in paise
        currency: "INR",
        name: "Feasto",
        description: "Order Payment",
        handler: function (response) {
          toast.success("Payment Received! Initializing delivery...");
          setIsTracking(true);
        },
        prefill: {
          name: "Feasto Customer",
          email: "customer@feasto.com",
          contact: "9876543210",
        },
        theme: {
          color: "#FF6B35",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    };
    script.onerror = () => {
      toast.error("Failed to load Razorpay SDK. Starting mock checkout instead.");
      // Fallback checkout
      setIsTracking(true);
    };
    document.body.appendChild(script);
  };

  const handleFinishTracking = () => {
    clearCart();
    setIsTracking(false);
    navigate("/");
  };

  // Order tracking screen
  if (isTracking) {
    const steps = [
      { title: "Order Accepted", desc: "Restaurant is verifying your order", icon: ShoppingBag, color: "text-[#FF6B35]" },
      { title: "Preparing Food", desc: "Chefs are crafting your fresh hot meal", icon: Clock, color: "text-amber-500" },
      { title: "Out for Delivery", desc: "Rohan has picked up your meal and is on the way", icon: Bike, color: "text-sky-500" },
      { title: "Delivered", desc: "Order delivered! Enjoy your meal!", icon: Check, color: "text-emerald-500" }
    ];

    return (
      <div className="min-h-screen pt-28 pb-16 px-4 bg-gradient-to-br from-[#FFFBF0] via-[#FFF8E1] to-[#FFF5E6] flex items-center justify-center">
        <div className="bg-white rounded-3xl border border-gray-150 p-8 shadow-2xl w-full max-w-xl text-center">
          <span className="text-5xl">🛵</span>
          <h2 className="text-3xl font-serif font-black text-gray-800 mt-4 mb-2">Live Order Tracker</h2>
          <p className="text-gray-500 text-sm mb-8">Order ID: #FST-{Math.floor(100000 + Math.random() * 900000)}</p>

          {/* Stepper tracker */}
          <div className="relative flex flex-col items-start gap-8 max-w-md mx-auto text-left mb-10">
            {/* Vertical Connector Line */}
            <div className="absolute left-[21px] top-4 bottom-4 w-0.5 bg-gray-200 z-0"></div>
            <div 
              className="absolute left-[21px] top-4 w-0.5 bg-[#FF6B35] z-0 transition-all duration-1000"
              style={{ height: `${(trackingStep / 3) * 100}%` }}
            ></div>

            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              const isDone = trackingStep >= idx;
              const isActive = trackingStep === idx;
              return (
                <div key={idx} className="flex gap-4 items-start relative z-10">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all ${
                    isDone 
                      ? "bg-[#FF6B35] border-[#FF6B35] text-white shadow-md shadow-[#FF6B35]/20" 
                      : "bg-white border-gray-200 text-gray-400"
                  }`}>
                    <StepIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={`font-extrabold text-base transition-colors ${
                      isActive ? "text-[#FF6B35]" : isDone ? "text-gray-800" : "text-gray-400"
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`text-xs mt-0.5 ${
                      isActive ? "text-gray-600" : isDone ? "text-gray-500" : "text-gray-400"
                    }`}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Delivery Rider Details */}
          {trackingStep >= 2 && (
            <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between border border-gray-150 max-w-md mx-auto mb-8 text-left">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-xl">
                  👨🏻‍🚀
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-gray-800">Rohan Kumar</h4>
                  <p className="text-xs text-gray-500 flex items-center gap-1">⭐ 4.9 (Delivery Valued Partner)</p>
                </div>
              </div>
              <a href="tel:9999999999" className="bg-[#FF6B35]/10 hover:bg-[#FF6B35]/20 text-[#FF6B35] p-2.5 rounded-xl transition-all">
                <Phone className="w-4 h-4" />
              </a>
            </div>
          )}

          {/* Completion Action */}
          <button
            onClick={handleFinishTracking}
            disabled={trackingStep < 3}
            className={`w-full max-w-sm py-4 rounded-2xl font-black text-sm transition-all shadow-md ${
              trackingStep === 3 
                ? "bg-[#FF6B35] text-white hover:bg-[#FF8C42] hover:shadow-lg" 
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {trackingStep === 3 ? "Order Completed - Enjoy!" : "Simulating Delivery..."}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFBF0] via-[#FFF8E1] to-[#FFF5E6] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Left column: Cart Items & Details */}
        <div className="w-full lg:w-2/3 flex flex-col gap-8">
          
          {/* Cart Block */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-white/50 p-6 sm:p-8 shadow-lg">
            <h2 className="text-2xl font-serif font-black text-gray-800 mb-6 flex items-center gap-2">
              <span>🛒</span> Your Cart ({cartItems.length} items)
            </h2>

            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-6 font-bold">Your cart is currently empty!</p>
                <Link
                  to="/all-restaurants"
                  className="inline-block bg-[#FF6B35] hover:bg-[#FF8C42] text-white font-extrabold px-6 py-3 rounded-2xl text-sm transition-all shadow-md"
                >
                  Explore Restaurants
                </Link>
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {cartItems.map((item, index) => (
                  <li key={index} className="py-4 flex justify-between items-center first:pt-0 last:pb-0 gap-4">
                    <div>
                      <h3 className="font-extrabold text-gray-800 text-base">{item.name}</h3>
                      <span className="text-sm font-bold text-[#FF6B35]">₹{item.price} each</span>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Counter */}
                      <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl border border-gray-100">
                        <button
                          onClick={() => removeFromCart({ id: item.id })}
                          className="hover:bg-gray-200 text-red-500 w-7 h-7 flex items-center justify-center rounded-lg transition-all"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-sm font-extrabold text-gray-700 min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => addToCart({ id: item.id })}
                          className="hover:bg-gray-200 text-[#FF6B35] w-7 h-7 flex items-center justify-center rounded-lg transition-all"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      
                      <span className="font-black text-gray-800 text-base min-w-[70px] text-right">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Delivery Address Block */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-white/50 p-6 sm:p-8 shadow-lg">
            <h3 className="text-xl font-serif font-black text-gray-800 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#FF6B35]" /> Delivery Address
            </h3>
            {isEditingAddress ? (
              <div className="flex flex-col gap-3">
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                  rows="3"
                />
                <button
                  onClick={() => setIsEditingAddress(false)}
                  className="bg-[#FF6B35] text-white px-4 py-2 rounded-xl text-xs font-bold self-start"
                >
                  Save Address
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-start gap-4">
                <p className="text-sm text-gray-600 leading-relaxed font-semibold">{address}</p>
                <button
                  onClick={() => setIsEditingAddress(true)}
                  className="text-xs text-[#FF6B35] font-black hover:underline shrink-0"
                >
                  EDIT
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right column: Billing and Coupons */}
        <div className="w-full lg:w-1/3 flex flex-col gap-8">
          
          {/* Coupon Code Selection Drawer */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-white/50 p-6 shadow-lg">
            <h3 className="text-lg font-serif font-black text-gray-800 mb-4 flex items-center gap-2">
              <Ticket className="w-5 h-5 text-[#FF6B35]" /> Apply Coupon
            </h3>
            
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="Enter coupon code..."
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                className="flex-grow px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
              />
              <button
                onClick={() => applyCoupon(couponCode)}
                className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2.5 rounded-xl text-xs font-black transition-all"
              >
                APPLY
              </button>
            </div>

            {/* List Recommended Coupons */}
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Available Coupons</span>
              {AVAILABLE_COUPONS.map((coupon, idx) => (
                <div
                  key={idx}
                  onClick={() => applyCoupon(coupon.code)}
                  className="border border-dashed border-gray-200 rounded-2xl p-3 flex justify-between items-center cursor-pointer hover:bg-gray-50/50 hover:border-[#FF6B35]/40 transition-all"
                >
                  <div>
                    <span className="bg-[#FF6B35]/10 text-[#FF6B35] text-xs font-black px-2 py-0.5 rounded border border-[#FF6B35]/25">
                      {coupon.code}
                    </span>
                    <p className="text-xs text-gray-500 mt-1 font-bold">{coupon.description}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Bill Breakdown */}
          {cartItems.length > 0 && (
            <div className="bg-white/85 backdrop-blur-md rounded-3xl border border-white/50 p-6 shadow-lg text-sm text-gray-700">
              <h3 className="text-lg font-serif font-black text-gray-800 mb-5 border-b border-gray-100 pb-3">
                Billing Details
              </h3>
              
              <div className="flex flex-col gap-3 font-semibold mb-5">
                <div className="flex justify-between">
                  <span className="text-gray-500">Item Subtotal</span>
                  <span className="font-extrabold text-gray-800">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery Partner Fee</span>
                  <span className="font-extrabold text-gray-800">
                    {deliveryFee > 0 ? `₹${deliveryFee}` : <span className="text-emerald-500">FREE</span>}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Platform Fee</span>
                  <span className="font-extrabold text-gray-800">₹{platformFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">GST and Restaurant Charges (5%)</span>
                  <span className="font-extrabold text-gray-800">₹{gst}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-600 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100/50">
                    <span className="flex items-center gap-1 text-xs">Applied: <strong>{appliedCoupon.code}</strong></span>
                    <button onClick={removeCoupon} className="text-[10px] text-red-500 font-bold underline ml-2">Remove</button>
                    <span className="font-extrabold text-xs ml-auto">- ₹{discountAmount}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between font-black text-lg border-t border-gray-150 pt-4 mb-6">
                <span className="text-gray-800">Total Payable</span>
                <span className="text-2xl text-[#FF6B35]">₹{totalPayable}</span>
              </div>

              {/* Secure Checkout Trust */}
              <div className="flex items-center gap-2 text-xs text-gray-400 font-bold mb-6 justify-center bg-gray-50 p-2.5 rounded-xl">
                <Shield className="w-4 h-4 text-emerald-500" />
                <span>100% Secure Checkout powered by Razorpay</span>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleRazorpayPayment}
                className="w-full bg-[#FF6B35] hover:bg-[#FF8C42] text-white py-4 rounded-2xl font-black text-sm shadow-md hover:shadow-lg transition-all"
              >
                Proceed to Payment (₹{totalPayable})
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
