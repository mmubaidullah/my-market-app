"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('https://my-market-app-server.vercel.app/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      toast.success(`Welcome back, ${data.user.name}!`);
      router.push('/');
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <form onSubmit={handleLogin} className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border">
        <h2 className="text-3xl font-black mb-6 text-black text-center">Welcome Back</h2>
        <div className="space-y-4 text-black">
          <input required type="email" placeholder="Email" className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-blue-600" 
            onChange={e => setForm({...form, email: e.target.value})} />
          <input required type="password" placeholder="Password" className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-blue-600" 
            onChange={e => setForm({...form, password: e.target.value})} />
          <button type="submit" className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition">Login</button>
        </div>
        <p className="mt-6 text-center text-gray-600">New here? <Link href="/signup" className="text-blue-600 font-bold">Create Account</Link></p>
      </form>
    </div>
  );
}