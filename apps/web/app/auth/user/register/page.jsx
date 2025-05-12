'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function UserRegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/api/auth/user/register', form);
      console.log('Register response:', response);
      if (response.status === 200) {
        router.push('/auth/user/login');
      } else {
        setError(response.data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred. Please try again.');
      
    }
  };

  return (
  <main className="max-w-md mx-auto mt-16 bg-gradient-to-b from-blue-50 to-white p-8 rounded-2xl shadow-lg border border-blue-100">
    <h1 className="text-3xl font-bold mb-6 text-blue-800 text-center">User Register</h1>
    
    {error && <p className="text-red-500 bg-red-50 p-3 rounded-lg mb-4 text-center font-medium">{error}</p>}
    
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="space-y-5">
        <div className="relative">
          <input 
            type="text" 
            name="name" 
            placeholder=" " 
            onChange={handleChange} 
            required 
            className="w-full px-4 py-3 rounded-xl bg-blue-50 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all peer pt-5 pb-2" 
          />
          <label className="absolute text-xs font-medium text-blue-600 top-2 left-4 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-blue-400 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-600">
            Full Name
          </label>
        </div>
    
        <div className="relative">
          <input 
            type="email" 
            name="email" 
            placeholder=" " 
            onChange={handleChange} 
            required 
            className="w-full px-4 py-3 rounded-xl bg-blue-50 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all peer pt-5 pb-2" 
          />
          <label className="absolute text-xs font-medium text-blue-600 top-2 left-4 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-blue-400 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-600">
            Email Address
          </label>
        </div>
    
        <div className="relative">
          <input 
            type="password" 
            name="password" 
            placeholder=" " 
            onChange={handleChange} 
            required 
            className="w-full px-4 py-3 rounded-xl bg-blue-50 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all peer pt-5 pb-2" 
          />
          <label className="absolute text-xs font-medium text-blue-600 top-2 left-4 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-blue-400 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-600">
            Password
          </label>
        </div>

        <div className="relative">
          <input 
            type="tel" 
            name="phoneNumber" 
            placeholder=" " 
            onChange={handleChange} 
            required 
            className="w-full px-4 py-3 rounded-xl bg-blue-50 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all peer pt-5 pb-2" 
          />
          <label className="absolute text-xs font-medium text-blue-600 top-2 left-4 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-blue-400 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-600">
            Phone Number
          </label>
        </div>

      </div>
      
      <button 
        type="submit" 
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all mt-6 transform hover:translate-y-px active:translate-y-0"
      >
        Create Account
      </button>
      
      <p className="text-sm text-center text-gray-600 mt-4">
        Already have an account? <a href="/auth/user/login" className="text-blue-600 hover:text-blue-800 underline font-medium">Login</a>
      </p>
    </form>
  </main>
);

}
