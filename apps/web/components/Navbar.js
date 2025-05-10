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
    <nav className="w-full px-6 py-4 bg-gray-100 shadow-sm flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">RidePool</Link>

      <div className="flex gap-6 items-center">
        {role === 'user' && (
          <>
            <Link href="/dashboard/user">Dashboard</Link>
            <Link href="/dashboard/user/my-rides">My Rides</Link>
          </>
        )}

        {role === 'driver' && (
          <>
            <Link href="/dashboard/driver">Dashboard</Link>
            <Link href="/dashboard/driver/requests">Join Requests</Link>
          </>
        )}

        {role ? (
          <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
        ) : (
          <>
            <Link href="/auth/user/login">User Login</Link>
            <Link href="/auth/driver/login">Driver Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}
