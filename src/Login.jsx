// src/Login.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcGoogle } from 'react-icons/fc';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
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
        document.getElementById('googleLoginBtn'),
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
    toast.success(`Welcome back, ${userObject.name}`);
    navigate('/');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('feastoUsers')) || [];
    const user = users.find((u) => u.email === email);

    if (!user) {
      toast.error('User not found. Please sign up.');
      navigate('/signup');
      return;
    }

    if (user.password !== password) {
      toast.error('Invalid password.');
      return;
    }

    localStorage.setItem('feastoUser', JSON.stringify(user));
    toast.success(`Welcome back, ${user.name}!`);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('https://images.pexels.com/photos/20408434/pexels-photo-20408434.jpeg')] bg-cover bg-center px-4">
      <div className="w-full max-w-md backdrop-blur-md bg-white/20 p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-white mb-6 drop-shadow">Login to Feasto</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="lock text-sm text-white font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-400 bg-white/70"
            />
          </div>
          <div>
            <label className="lock text-sm text-white font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-400 bg-white/70"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded-md font-semibold hover:bg-red-600 transition"
          >
            Login
          </button>
        </form>

        <div className="mt-5" id="googleLoginBtn"></div>

        <p className="text-sm text-center text-white mt-4">
          Don't have an account?{' '}
          <span onClick={() => navigate('/signup')} className="text-yellow-200 hover:underline cursor-pointer">
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
