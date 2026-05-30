// src/Signup.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcGoogle } from 'react-icons/fc';
import { jwtDecode } from 'jwt-decode';
const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById('googleSignupBtn'),
        { theme: 'outline', size: 'large', width: '100%' }
      );
    };
  }, []);

  const handleGoogleResponse = (response) => {
    const userObject = jwtDecode(response.credential);
    const googleUser = {
      name: userObject.name,
      email: userObject.email,
    };
    localStorage.setItem('feastoUser', JSON.stringify(googleUser));
    toast.success(
      <div className="text-sm">
        <span className="font-semibold text-green-600">Welcome</span>, {userObject.name}! 🍽️
      </div>,
      { autoClose: 2500, hideProgressBar: false, closeOnClick: true }
    );
    navigate('/');
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const users = JSON.parse(localStorage.getItem('feastoUsers')) || [];
    const existing = users.find((u) => u.email === email);

    if (existing) {
      toast.warn('User already exists. Redirecting to login.');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('feastoUsers', JSON.stringify(users));
    localStorage.setItem('feastoUser', JSON.stringify(newUser));

    toast.success(
      <div className="text-sm">
        <span className="font-semibold text-green-600">Welcome</span>, {name}! 🎉
      </div>,
      { autoClose: 2500, hideProgressBar: false, closeOnClick: true }
    );
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#1A1A1A] via-[#2D2D2D] to-[#1A1A1A] px-4 py-8">
      {/* Food-themed background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-16 left-12 text-7xl animate-bounce" style={{ animationDuration: '3.5s' }}>🍕</div>
        <div className="absolute top-32 right-16 text-6xl animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.3s' }}>🍔</div>
        <div className="absolute top-1/2 left-1/4 text-8xl animate-pulse">🍽️</div>
        <div className="absolute bottom-40 right-1/4 text-6xl animate-bounce" style={{ animationDuration: '3.8s', animationDelay: '0.7s' }}>🍜</div>
        <div className="absolute bottom-24 left-1/3 text-7xl animate-bounce" style={{ animationDuration: '4.2s', animationDelay: '1.2s' }}>🍣</div>
        <div className="absolute top-2/3 right-1/3 text-5xl animate-bounce" style={{ animationDuration: '3.2s', animationDelay: '0.5s' }}>🌮</div>
      </div>

      {/* Decorative food icons floating */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/4 text-5xl opacity-20 animate-float">🥘</div>
        <div className="absolute bottom-32 left-1/4 text-4xl opacity-20 animate-float" style={{ animationDelay: '1.5s' }}>🍛</div>
        <div className="absolute top-1/4 left-10 text-4xl opacity-20 animate-float" style={{ animationDelay: '2.5s' }}>🍗</div>
        <div className="absolute bottom-16 right-10 text-5xl opacity-20 animate-float" style={{ animationDelay: '0.8s' }}>🥗</div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#FF6B35] rounded-full mb-4 shadow-lg animate-pulse">
              <span className="text-4xl">🍴</span>
            </div>
            <h1 className="text-4xl font-serif font-bold text-[#FF6B35] mb-2">Join Feasto</h1>
            <p className="text-gray-600 text-sm">Start your delicious journey today! 🎉</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <span className="inline-flex items-center gap-2">
                  👤 Full Name
                </span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="John Doe"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] bg-white transition-all outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <span className="inline-flex items-center gap-2">
                  📧 Email Address
                </span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] bg-white transition-all outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <span className="inline-flex items-center gap-2">
                  🔒 Password
                </span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Create a strong password"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] bg-white transition-all outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <span className="inline-flex items-center gap-2">
                  🔒 Confirm Password
                </span>
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Re-enter your password"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] bg-white transition-all outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#FF6B35] text-white py-3.5 rounded-xl font-bold text-lg hover:bg-[#FF8C42] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <span>🎉</span>
              <span>Create Account & Start Ordering</span>
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or sign up with</span>
            </div>
          </div>

          {/* Google Sign‑In button */}
          <div className="mb-6" id="googleSignupBtn"></div>

          {/* Login Link */}
          <p className="text-center text-gray-600 text-sm">
            Already have an account?{' '}
            <span
              onClick={() => navigate('/login')}
              className="text-[#FF6B35] font-semibold hover:underline cursor-pointer hover:text-[#FF8C42] transition"
            >
              Login Here 🍽️
            </span>
          </p>
        </div>

        {/* Food Quote */}
        <div className="mt-6 text-center">
          <p className="text-white/80 text-sm italic">
            "Life is too short for bad food" 🍕✨
          </p>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Signup;