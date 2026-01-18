"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
  };

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b text-black">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <Link href="/" className="text-2xl font-black text-blue-600 tracking-tighter">NEXTMARKET</Link>
        
        <div className="flex items-center gap-6 font-bold text-sm">
          <Link href="/items" className="hover:text-blue-600">SHOP</Link>
          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/user-dashboard" className="text-blue-600">Hello, {user.name.split(' ')[0]}</Link>
              <button onClick={handleLogout} className="bg-red-50 text-red-600 px-4 py-2 rounded-lg">Logout</button>
            </div>
          ) : (
            <Link href="/login" className="bg-black text-white px-6 py-2 rounded-full">Login</Link>
          )}
          <Link href="/cart" className="text-xl">🛒</Link>
        </div>
      </div>
    </nav>
  );
}