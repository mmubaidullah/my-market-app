"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Item {
  _id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://my-market-app-server.vercel.app/api/items')
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  const categories = ["All", "Electronics", "Fashion", "Home", "Accessories"];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <div className="min-h-screen pt-32 text-center text-black font-bold">Loading Store...</div>;

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 max-w-7xl mx-auto bg-white text-black">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <h1 className="text-4xl font-black italic">SHOP</h1>
        <div className="flex w-full md:w-auto gap-4">
          <input 
            type="text" placeholder="Search..." 
            className="p-3 border rounded-xl flex-1 md:w-64 outline-none focus:ring-2 focus:ring-blue-600"
            onChange={(e) => setSearch(e.target.value)}
          />
          <select 
            className="p-3 border rounded-xl outline-none"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredItems.map((item) => (
          <div key={item._id} className="group border rounded-2xl overflow-hidden hover:shadow-xl transition-all">
            <Link href={`/items/${item._id}`}>
              <div className="h-60 overflow-hidden">
                <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition" />
              </div>
            </Link>
            <div className="p-5">
              <p className="text-xs text-blue-600 font-bold uppercase mb-1">{item.category || "General"}</p>
              <h3 className="font-bold text-lg mb-4 truncate">{item.name}</h3>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-black">${item.price}</span>
                <Link href={`/items/${item._id}`} className="bg-black text-white px-4 py-2 rounded-lg text-sm">Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}