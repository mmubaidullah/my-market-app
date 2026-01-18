"use client";
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    fetch('https://my-market-app-server.vercel.app/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data));
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    const res = await fetch(`https://my-market-app-server.vercel.app/api/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      toast.success(`Order ${newStatus}`);
      fetchOrders();
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-10 px-6 max-w-7xl mx-auto text-black">
      <h1 className="text-3xl font-black mb-8">Manage Orders</h1>
      <div className="space-y-6">
        {orders.map((order: any) => (
          <div key={order._id} className="bg-white border rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p className="text-sm text-gray-500">Order ID: {order._id}</p>
              <h3 className="font-bold text-lg">{order.customerName} ({order.phone})</h3>
              <p className="text-sm text-gray-600">{order.address}</p>
              <div className="mt-2 flex gap-2">
                {order.items.map((item: any) => (
                  <span key={item._id} className="bg-gray-100 px-2 py-1 rounded text-xs">{item.name}</span>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-end gap-3">
              <span className={`px-4 py-1 rounded-full text-xs font-bold ${
                order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {order.status}
              </span>
              <div className="flex gap-2">
                <button onClick={() => updateStatus(order._id, 'Shipped')} className="text-xs bg-blue-600 text-white px-3 py-1 rounded-lg">Ship</button>
                <button onClick={() => updateStatus(order._id, 'Delivered')} className="text-xs bg-green-600 text-white px-3 py-1 rounded-lg">Deliver</button>
              </div>
              <p className="font-black text-xl">${order.totalAmount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}