'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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

    const res = await fetch('/api/auth/driver/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Login failed');
    } else {
      router.push('/dashboard/driver');
    }
  };

  return (
    <main className="max-w-md mx-auto mt-16">
      <h1 className="text-2xl font-bold mb-4">Driver Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Login
        </button>
        <p className="text-sm">
          Not registered yet? <a href="/auth/driver/register" className="text-green-600 underline">Register</a>
        </p>
      </form>
    </main>
  );
}
