"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('https://my-market-app-server.vercel.app/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      toast.success("Account created! Please login.");
      router.push('/login');
    } else {
      toast.error("Registration failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <form onSubmit={handleSignup} className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border">
        <h2 className="text-3xl font-black mb-6 text-black text-center">Create Account</h2>
        <div className="space-y-4 text-black">
          <input required type="text" placeholder="Full Name" className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-blue-600" 
            onChange={e => setForm({...form, name: e.target.value})} />
          <input required type="email" placeholder="Email Address" className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-blue-600" 
            onChange={e => setForm({...form, email: e.target.value})} />
          <input required type="password" placeholder="Password" className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-blue-600" 
            onChange={e => setForm({...form, password: e.target.value})} />
          <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition">Sign Up</button>
        </div>
        <p className="mt-6 text-center text-gray-600">Already have an account? <Link href="/login" className="text-blue-600 font-bold">Login</Link></p>
      </form>
    </div>
  );
}