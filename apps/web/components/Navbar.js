'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Try to decode the JWT from cookie (if exists)
    async function getRole() {
      try {
        const res = await fetch('/api/auth/me'); // You can implement this endpoint to return { role }
        const data = await res.json();
        if (res.ok) setRole(data.role);
      } catch (err) {
        setRole(null);
      }
    }

    getRole();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/';
  };

  return (
  <nav className="w-full px-8 py-2 bg-white shadow-sm border-b border-gray-200">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      {/* Logo */}
      <Link
        href="/"
        className="text-3xl font-bold text-blue-700 tracking-tight hover:opacity-90 transition duration-200"
      >
        RidePool
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center space-x-5 text-[15px] font-medium text-gray-800">
        {role === 'user' && (
          <>
            <Link
              href="/dashboard/user"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/user/my-rides"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              My Rides
            </Link>
          </>
        )}

        {role === 'driver' && (
          <>
            <Link
              href="/dashboard/driver"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/driver/requests"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Join Requests
            </Link>
          </>
        )}

        {/* Auth Buttons */}
        {role ? (
          <button
            onClick={handleLogout}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition-all duration-200"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              href="/auth/user/login"
              className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100 transition duration-200 shadow-sm"
            >
              User Login
            </Link>
            <Link
              href="/auth/driver/login"
              className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100 transition duration-200 shadow-sm"
            >
              Driver Login
            </Link>
          </>
        )}
      </div>
    </div>
  </nav>
);

}
