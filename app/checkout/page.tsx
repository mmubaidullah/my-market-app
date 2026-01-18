"use client";
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const router = useRouter();
  const [form, setForm] = useState({ name: '', address: '', phone: '', email: '' });

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart') || '[]'));
  }, []);

  const total = cart.reduce((acc: number, item: any) => acc + item.price, 0);

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return toast.error("Cart is empty!");

    const orderData = {
      customerName: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      items: cart,
      totalAmount: total
    };

    const res = await fetch('https://my-market-app-server.vercel.app/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });

    if (res.ok) {
      toast.success("Order Placed! Tracking ID sent to email.");
      localStorage.removeItem('cart');
      router.push('/');
    } else {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-10 px-6 max-w-4xl mx-auto text-black">
      <div className="grid md:grid-cols-2 gap-12">
        <form onSubmit={handleOrder} className="space-y-4">
          <h2 className="text-2xl font-bold mb-6">Delivery Details</h2>
          <input required placeholder="Full Name" className="w-full p-4 border rounded-xl" onChange={e => setForm({...form, name: e.target.value})} />
          <input required type="email" placeholder="Email" className="w-full p-4 border rounded-xl" onChange={e => setForm({...form, email: e.target.value})} />
          <input required placeholder="Phone" className="w-full p-4 border rounded-xl" onChange={e => setForm({...form, phone: e.target.value})} />
          <textarea required placeholder="Address" className="w-full p-4 border rounded-xl h-24" onChange={e => setForm({...form, address: e.target.value})}></textarea>
          <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold">Place Order (Cash on Delivery)</button>
        </form>

        <div className="bg-gray-50 p-8 rounded-3xl border h-fit">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          {cart.map((item: any) => (
            <div key={item._id} className="flex justify-between mb-2">
              <span className="text-sm">{item.name}</span>
              <span className="font-bold">${item.price}</span>
            </div>
          ))}
          <div className="border-t mt-4 pt-4 flex justify-between text-xl font-black">
            <span>Total Payable</span>
            <span className="text-blue-600">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}