"use client";
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function UserDashboard() {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUserOrders = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`https://my-market-app-server.vercel.app/api/user-orders/${email}`);
      const data = await res.json();
      setOrders(data);
      if (data.length === 0) toast.error("No orders found for this email.");
    } catch (err) {
      toast.error("Failed to fetch orders.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-32 pb-16 px-6 max-w-5xl mx-auto text-black">
      <h1 className="text-4xl font-black mb-8">My Orders</h1>
      
      {/* Email Search */}
      <form onSubmit={fetchUserOrders} className="mb-12 flex gap-4 max-w-md">
        <input 
          required type="email" placeholder="Enter your order email" 
          className="flex-1 p-4 border rounded-xl outline-none focus:ring-2 focus:ring-blue-600"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="bg-black text-white px-8 py-4 rounded-xl font-bold">Track</button>
      </form>

      {loading ? <p>Loading orders...</p> : (
        <div className="space-y-6">
          {orders.map((order: any) => (
            <div key={order._id} className="border rounded-2xl p-6 bg-white shadow-sm flex flex-col md:flex-row justify-between gap-4">
              <div>
                <p className="text-xs text-blue-600 font-bold mb-1 uppercase tracking-widest">Order ID: {order._id.slice(-6)}</p>
                <h3 className="text-xl font-bold mb-2">Total Amount: ${order.totalAmount}</h3>
                <p className="text-sm text-gray-500">Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                <div className="flex gap-2 mt-4">
                  {order.items.map((item: any, i: number) => (
                    <img key={i} src={item.image} className="w-12 h-12 rounded-lg border object-cover" title={item.name} />
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <span className={`px-6 py-2 rounded-full text-sm font-bold ${
                  order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                  order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {order.status}
                </span>
                <p className="text-gray-500 text-sm mt-4">Status updated by Admin</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}