// src/Signup.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcGoogle } from 'react-icons/fc';
import { jwtDecode } from 'jwt-decode';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formVisible, setFormVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800 });

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: '90321054006-kethjo4aj6kl7q689qe9qdt5cvc0laj8.apps.googleusercontent.com',
        callback: handleGoogleResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById('googleSignupBtn'),
        { theme: 'outline', size: 'large', width: '100%' }
      );
    };

    // Trigger form blur fade-in
    setTimeout(() => setFormVisible(true), 100);
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
    <div className="min-h-screen flex items-center justify-center bg-[url('https://images.pexels.com/photos/5779926/pexels-photo-5779926.jpeg')] bg-cover bg-center px-4">
      <div
        className={`w-full max-w-md backdrop-blur-md bg-white/20 p-8 rounded-xl shadow-2xl transition-all duration-1000 ease-in-out transform ${
          formVisible ? 'opacity-100 blur-none scale-100' : 'opacity-0 blur-sm scale-95'
        }`}
      >
        <h2
          className="text-3xl font-bold text-center text-white mb-6 drop-shadow animate-fade-down"
          data-aos="fade-down"
        >
          Sign Up for Feasto
        </h2>
        <form onSubmit={handleSignup} className="space-y-5">
          <div data-aos="fade-right">
            <label className="block text-sm text-white font-medium">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-400 bg-white/55"
            />
          </div>
          <div data-aos="fade-left">
            <label className="block text-sm text-white font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-400 bg-white/55"
            />
          </div>
          <div data-aos="fade-right">
            <label className="block text-sm text-white font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-400 bg-white/55"
            />
          </div>
          <div data-aos="fade-left">
            <label className="block text-sm text-white font-medium">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-400 bg-white/55"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded-md font-semibold hover:bg-red-600 transition"
            data-aos="zoom-in"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-5" id="googleSignupBtn" data-aos="fade-up"></div>

        <p className="text-sm text-center text-white mt-4">
          Already have an account?{' '}
          <span onClick={() => navigate('/login')} className="text-yellow-200 hover:underline cursor-pointer">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;