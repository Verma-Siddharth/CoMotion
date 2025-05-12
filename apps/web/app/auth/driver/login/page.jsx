'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
 
export default function DriverLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/api/auth/driver/login', form);
      console.log('Login response:', response);
      if (response.status === 200) {
        router.push('/dashboard/d');
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
    <h1 className="text-3xl font-bold mb-6 text-blue-800 text-center">Driver Login</h1>
    
    {error && <p className="text-red-500 bg-red-50 p-3 rounded-lg mb-4 text-center font-medium">{error}</p>}
    
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <input 
        type="email" 
        name="email" 
        placeholder="Email" 
        onChange={handleChange} 
        required 
        className="px-4 py-3 rounded-xl bg-blue-50 border border-blue-200 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
      />
      
      <input 
        type="password" 
        name="password" 
        placeholder="Password" 
        onChange={handleChange} 
        required 
        className="px-4 py-3 rounded-xl bg-blue-50 border border-blue-200 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
      />
      
      <button 
        type="submit" 
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all mt-2"
      >
        Login
      </button>
      
      <p className="text-sm text-center text-gray-600 mt-4">
        Not registered yet? <a href="/auth/driver/register" className="text-blue-600 hover:text-blue-800 underline font-medium">Register</a>
      </p>
    </form>
  </main>
);

}
